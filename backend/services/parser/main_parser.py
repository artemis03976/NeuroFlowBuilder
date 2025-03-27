from collections import deque
from typing import Dict, List
import importlib
from pathlib import Path
from .registry import ParserRegistry


class NetworkParser(object):
    """
    Parser for graphic network sturcture from frontend
    """
    def __init__(self, network_data):
        self.raw_data = network_data
        self.nodes = network_data.nodes
        self.edges = network_data.edges

        # load layer parsers
        self._auto_load_parsers()

        # temporary data structure
        self.layer_config: Dict[str, dict] = {}
        self.adjacency_list: Dict[str, List[str]] = {}
        self.reverse_adjacency: Dict[str, List[str]] = {}

    def _auto_load_parsers(self) -> None:
        """
        Auto load all layer parsers in './layer_parsers'
        """
        layer_parser_dir = Path(__file__).parent / "layer_parsers"
        for file in layer_parser_dir.rglob("parser_*.py"):
            if file.name.startswith("__"):
                continue
            relative_path = file.relative_to(layer_parser_dir.parent)
            module_path = str(relative_path.with_suffix('')).replace('\\', '.')
            module_name = f"{__package__}.{module_path}"
            try:
                importlib.import_module(module_name)
            except Exception as e:
                print(f"Failed to import module {module_name}: {e}")

    def parse(self) -> dict:
        """
        Main entry for parsing network
        """
        # parse layer config
        self._build_layer_config()

        # parse forward path
        self._build_adjacency()
        execution_order = self._topological_sort()

        return {
            'metadata': {
                'version': self.raw_data.version,
                'created_at': self.raw_data.created_at
            },
            'execution_order': execution_order,
            'layers': [self.layer_config[layer_id] for layer_id in execution_order],
        }

    def _build_layer_config(self) -> None:
        """
        Parse and build layer config
        """
        for node in self.nodes:
            parser = ParserRegistry.get_parser(node['type'])

            layer_config = parser.parse(node['data'])

            self.layer_config[node['id']] = {
                'id': node['id'],
                'type': node['type'],
                'config': layer_config,
                'inputs': [],
                'outputs': []
            }

    def _build_adjacency(self) -> None:
        """
        Build an adjacency for topological sort
        """
        for edge in self.edges:
            source = edge['source']
            target = edge['target']

            self.adjacency_list.setdefault(source, []).append(target)
            self.reverse_adjacency.setdefault(target, []).append(source)

            self.layer_config[source]['outputs'].append({
                'target': target,
                'source_handle': edge.get('sourceHandle'),
                'target_handle': edge.get('targetHandle')
            })

            self.layer_config[target]['inputs'].append({
                'source': source,
                'source_handle': edge.get('sourceHandle'),
                'target_handle': edge.get('targetHandle')
            })

    def _topological_sort(self) -> List[str]:
        """
        Topological sort to determine foward propagation path
        """
        in_degree = {node['id']: 0 for node in self.nodes}
        for source in self.adjacency_list:
            for target in self.adjacency_list[source]:
                in_degree[target] += 1

        queue = deque([node_id for node_id, degree in in_degree.items() if degree == 0])
        sorted_order = []

        while queue:
            current = queue.popleft()
            sorted_order.append(current)

            for neighbor in self.adjacency_list.get(current, []):
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)

        if len(sorted_order) != len(self.nodes):
            raise ValueError("Network contains cycles or disconnected components")

        return sorted_order
