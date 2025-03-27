from .layer_parsers.base_parser import BaseLayerParser
from typing import Dict


class ParserRegistry:
    _layer_parsers: Dict[str, BaseLayerParser] = {}

    @classmethod
    def register(cls, layer_type: str):
        """
        Decorator for registering parser
        """
        def wrapper(parser_class: BaseLayerParser):
            cls._layer_parsers[layer_type] = parser_class
            return parser_class
        return wrapper

    @classmethod
    def get_parser(cls, layer_type: str) -> BaseLayerParser:
        """
        Get certain layer parser 
        """
        parser = cls._layer_parsers.get(layer_type)
        if not parser:
            raise ValueError(f"Unsupported layer type: {layer_type}")
        return parser
