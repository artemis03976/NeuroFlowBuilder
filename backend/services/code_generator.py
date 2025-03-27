from jinja2 import Environment, FileSystemLoader
from pathlib import Path


class PyTorchCodeGenerator:
    def __init__(self, template_dir: str = "./services/templates") -> None:
        self.env = Environment(
            loader=FileSystemLoader(template_dir),
            trim_blocks=True,
            lstrip_blocks=True
        )
        self.template = self.env.get_template("pytorch_model.py.j2")

    def generate_code(self, parsed_data, output_path='./generations/pytorch_model.py') -> str:
        # preprocess parsed raw data to template context
        context = self._prepare_context(parsed_data)

        # render the template
        code = self.template.render(context)

        # save built code
        if output_path:
            self._save_code(code, output_path)
        return code

    def _prepare_context(self, parsed_data):
        """
        Transform parsed data to template context
        """
        layers = {}
        type_counter = {}

        for node in parsed_data['layers']:
            layer_type = node['type'].lower()
            type_counter[layer_type] = type_counter.get(layer_type, 0) + 1

            layers[node['id']] = {
                "module_name": f"{layer_type}_{type_counter[layer_type]}",
                "class_name": node['config']['class_name'],
                "parameters": node['config']['parameters'],
                "forward_template": node['config']['forward_template'],
                "inputs": node['inputs'],
                "outputs": node['outputs'],
                "input_handles": list({i['target_handle'] for i in node['inputs'] if i['target_handle']}),
                "output_handles": list({o['source_handle'] for o in node['outputs'] if o['source_handle']})
            }

        return {
            "layers": layers,
            "execution_order": parsed_data['execution_order']
        }

    def _save_code(self, code, path) -> None:
        """
        Save built code
        """
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        with open(path, 'w') as f:
            f.write(code)
