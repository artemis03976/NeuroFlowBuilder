import { NODE_META } from '@/configs/node'


export class ParameterCalculator {
  static calculate(nodes) {
    return nodes.reduce((acc, node) => {
      const calculator = NODE_META[node.type]?.parameterCalculator;
      if (!calculator) return acc;

      const { params, flops } = calculator(node.data);
      return {
        totalParams: acc.totalParams + (params || 0),
        totalFlops: acc.totalFlops + (flops || 0)
      };
    }, { totalParams: 0, totalFlops: 0 });
  }
}