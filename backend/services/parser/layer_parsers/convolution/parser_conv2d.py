from ..base_parser import BaseLayerParser
from ...registry import ParserRegistry


@ParserRegistry.register("conv2d")
class Conv2dLayerParser(BaseLayerParser):
    @classmethod
    def parse(cls, data: dict) -> dict:
        return {
            'class_name': 'nn.Conv2d',
            'parameters': {
                'in_channels': data.get('in_channels', None),
                'out_channels': data.get('out_channels', None),
                'kernel_size': data.get('kernel_size', None),
                'stride': data.get('stride', None),
                'padding': data.get('padding', None),
                'bias': data.get('bias', True)
            },
            'forward_template': "x = self.{{ module_name }}({{ input_var }})  # Conv2D layer"
        }