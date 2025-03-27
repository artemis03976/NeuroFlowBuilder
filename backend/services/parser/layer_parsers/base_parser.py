from abc import ABC, abstractmethod
from typing import Dict, Any


class BaseLayerParser(ABC):
    @classmethod
    @abstractmethod
    def parse(cls, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Abstract method of parsing config from data
        """
        raise NotImplementedError("Each parser must implement this method")
