from ..base_parser import BaseLayerParser
from ...registry import ParserRegistry


@ParserRegistry.register("linear")
class LinearLayerParser(BaseLayerParser):
    @classmethod
    def parse(cls, data: dict) -> dict:
        return {
            'class_name': 'nn.Linear',
            'parameters': {
                'in_features': data.get('in_features', None),
                'out_features': data.get('out_features', None),
                'bias': data.get('bias', True)
            },
            'forward_template': "x = self.{{ module_name }}({{ input_var }})  # Linear layer"
        }
