import uuid
from typing import Dict, Optional
from .training_task import TrainingTask


class TrainingTaskManager:
    """
    Global training task manager
    """
    def __init__(self):
        self.active_tasks: Dict[str, TrainingTask] = {}

    def create_task(self, config) -> TrainingTask:
        task_id = str(uuid.uuid4())
        new_task = TrainingTask(task_id, config)
        self.active_tasks[task_id] = new_task
        return new_task

    def get_task(self, task_id: str) -> Optional[TrainingTask]:
        return self.active_tasks.get(task_id)

    def stop_task(self, task_id: str):
        if task := self.get_task(task_id):
            task.request_stop()
