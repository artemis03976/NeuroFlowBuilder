from pydantic import BaseModel


class TrainRequest(BaseModel):
    model_id: str
    epochs: int
    batch_size: int
    optimizer: dict
    dataset: dict
    scheduler: str
    use_amp: bool
    early_stopping: bool
