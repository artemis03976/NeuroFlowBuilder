import torch
import lightning as L
from lightning.pytorch.callbacks import (
    EarlyStopping,
    ModelCheckpoint,
    LearningRateMonitor
)
from app.schemas import TrainRequest
from .training_task import TrainingTask
import importlib.util
from pathlib import Path
import torchvision
import torchvision.transforms as transforms
from torch.utils.data import random_split, DataLoader


def load_generated_model(model_id: str) -> torch.nn.Module:
    """
    Dynamically load generated models based on model IDs
    """
    model_path = Path(f"./generations/pytorch_model_{model_id}.py")

    if not model_path.exists():
        raise FileNotFoundError(f"Model {model_id} not found")

    # Dynamically load module
    spec = importlib.util.spec_from_file_location(f"pytorch_model_{model_id}", model_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)

    # Find model
    if not hasattr(module, "GeneratedModel"):
        raise AttributeError("GeneratedModel class not found in module")

    return module.GeneratedModel()


class LitModel(L.LightningModule):
    def __init__(self, model, optimizer, scheduler_config=None):
        super().__init__()
        self.model = model
        self.optimizer_cls = optimizer
        self.scheduler_config = scheduler_config

    def forward(self, x):
        return self.model(x)

    def training_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self(x)
        loss = torch.nn.functional.cross_entropy(y_hat, y)
        self.log("train_loss", loss, prog_bar=True)
        return loss

    def validation_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self(x)
        loss = torch.nn.functional.cross_entropy(y_hat, y)
        acc = (y_hat.argmax(dim=1) == y).float().mean()
        self.log("val_loss", loss, prog_bar=True)
        self.log("val_acc", acc, prog_bar=True)
        return loss

    def configure_optimizers(self):
        optimizer = self.optimizer_cls
        if self.scheduler_config:
            return {
                "optimizer": optimizer,
                "lr_scheduler": self.scheduler_config,
                "monitor": "val_loss"  # 如果使用ReduceLROnPlateau需要监控指标
            }
        return optimizer


class Trainer:
    def __init__(self, config: TrainRequest, task: TrainingTask) -> None:
        self.config = config
        self.task = task
        self._init_callbacks()

    def _init_callbacks(self) -> None:
        self.callbacks = []

        # 早停回调
        if self.config.early_stopping:
            self.callbacks.append(
                EarlyStopping(
                    monitor="val_loss",
                    patience=5,
                    mode="min"
                )
            )

        # 模型检查点
        # if checkpoint_cfg := self.config.checkpoint:
        #     self.callbacks.append(
        #         ModelCheckpoint(
        #             dirpath=checkpoint_cfg['dirpath'],
        #             monitor="val_acc",
        #             mode="max"
        #         )
        #     )

        # 学习率监控
        self.callbacks.append(LearningRateMonitor())

    def _prepare_data(self):
        dataset_type = self.config.dataset['type']
        batch_size = self.config.batch_size

        if dataset_type != 'custom':
            if dataset_type == 'mnist':
                transform = transforms.Compose([
                    transforms.ToTensor(),
                    transforms.Normalize((0.1307,), (0.3081,))
                ])
                dataset = torchvision.datasets.MNIST(
                    root='./data',
                    train=True,
                    transform=transform,
                    download=True
                )
                train_size = int(0.8 * len(dataset))
                val_size = len(dataset) - train_size
                train_dataset, val_dataset = random_split(dataset, [train_size, val_size])

                train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, num_workers=2)
                val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False, num_workers=2)
            
        return train_loader, val_loader

    def _build_trainer(self):
        return L.Trainer(
            max_epochs=self.config.epochs,
            accelerator='gpu' if torch.cuda.is_available() else 'cpu', 
            devices='auto',
            callbacks=self.callbacks,
            enable_progress_bar=True,
            logger=True,
            precision=16 if self.config.use_amp else 32
        )

    def run(self):
        self.task.status = "running"

        try:
            # Load generated model
            model = load_generated_model(self.config.model_id)
            print(f"{self.config.model_id} loaded")

            # prepare dataset
            train_loader, val_loader = self._prepare_data()
            print(f"{self.config.dataset["type"]} loaded")

            # Configure optimizer
            optimizer = getattr(torch.optim, self.config.optimizer['type'])(
                model.parameters(),
                **self.config.optimizer['params']
            )
            print("Optimizer set")

            # Configure learning rate scheduler
            scheduler_config = None
            # if self.config.scheduler:
            #     scheduler = getattr(torch.optim.lr_scheduler, self.config.scheduler)(
            #         optimizer,
            #         # **self.config.scheduler['params']
            #     )
            #     scheduler_config = {"scheduler": scheduler, "interval": "epoch"}

            # create Lightning module
            lit_model = LitModel(
                model,
                optimizer=optimizer,
                scheduler_config=scheduler_config,
            )
            print("Trainer created")

            # start training
            trainer = self._build_trainer()
            trainer.fit(lit_model, train_loader, val_loader)

            if self.task.should_stop():
                return

        except Exception as e:
            print(e)
            self.task.status = "failed"
