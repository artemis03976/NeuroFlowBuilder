from ..base_parser import BaseLayerParser
from ...registry import ParserRegistry


@ParserRegistry.register("relu")
class ReluLayerParser(BaseLayerParser):
    @classmethod
    def parse(cls, data: dict) -> dict:
        return {
            'class_name': 'nn.ReLU',
            'parameters': {
                'bias': data.get('inplace', False)
            },
            'forward_template': "x = self.{{ module_name }}({{ input_var }})  # ReLU layer"
        }
