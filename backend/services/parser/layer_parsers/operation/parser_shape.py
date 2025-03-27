from ..base_parser import BaseLayerParser
from ...registry import ParserRegistry


@ParserRegistry.register("shape_ops")
class ShapeOpsLayerParser(BaseLayerParser):
    @classmethod
    def parse(cls, data: dict) -> dict:
        operation = data.get('operation', None)

        if operation == 'reshape':
            target_shape = data.get('targetShape', None)
            forward_template = f'x = {{{{ input_var }}}}.reshape({target_shape})  # Reshape operation'
            class_name = 'function.reshape'

        elif operation == 'view':
            target_shape = data.get('targetShape', None)
            forward_template = f'x = {{{{ input_var }}}}.view({target_shape})  # View operation'
            class_name = 'function.view'
        
        elif operation == 'squeeze':
            target_dim = data.get('dim', None)
            forward_template = f'x = {{{{ input_var }}}}.squeeze(dim={target_dim})  # Squeeze operation'
            class_name = 'function.squeeze'
        
        elif operation == 'squeeze':
            target_dim = data.get('dim', None)
            forward_template = f'x = {{{{ input_var }}}}.squeeze(dim={target_dim})  # Unsqueeze operation'
            class_name = 'function.unsqueeze'
        
        return {
            'class_name': class_name,
            'parameters': {},
            'forward_template': forward_template
        }