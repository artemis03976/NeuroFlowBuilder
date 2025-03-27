from fastapi import APIRouter, BackgroundTasks
from app.schemas import TrainRequest
from services.train.manager import TrainingTaskManager
from services.train.trainer import Trainer


router = APIRouter()
task_manager = TrainingTaskManager()


@router.post("/start")
async def start_training(
        config: TrainRequest,
        background_tasks: BackgroundTasks
):
    """
    Schedule a training task
    """
    task = task_manager.create_task(config)
    print(f"{config.model_id} training task created")
    trainer = Trainer(config, task)
    background_tasks.add_task(trainer.run)

    return {
        "task_id": task.task_id,
        "status": task.status,
    }


@router.get("/status/{task_id}")
async def get_training_status(task_id: str):
    """
    Query the status of a training task
    """
    task = task_manager.get_task(task_id)
    if not task:
        return {"error": "Task not found"}
    
    return {
        "task_id": task_id,
        "status": task.status,
        "progress": task.progress,
    }


@router.post("/stop/{task_id}")
async def stop_training(task_id: str):
    """
    Manually stop a training task
    """
    task = task_manager.get_task(task_id)
    task_manager.stop_task(task_id)
    return {
        "task_id": task_id,
        "status": task.status,
    }
