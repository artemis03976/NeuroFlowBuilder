class TrainingTask:
    """
    State container for single training task
    """
    def __init__(self, task_id: str, config):
        self.task_id = task_id
        self.config = config
        self.status = "pending"  # pending / running / stopped / completed
        self.progress = 0.0
        self._stop_requested = False

    def request_stop(self):
        self._stop_requested = True
        self.status = "stopped"

    def update_progress(self, value: float):
        self.progress = min(max(value, 0.0), 1.0)

    def should_stop(self):
        return self._stop_requested
