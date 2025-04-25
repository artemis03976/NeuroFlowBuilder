import { NODE_META } from '@node-configs'
import type { FlowNode } from '@/stores/useFlowStore';

export interface ParameterCalculationResult {
  totalParams: number;
  totalFlops: number;
}

export class ParameterCalculator {
  private totalParams: number = 0;
  private totalFlops: number = 0;

  calculate(nodes: FlowNode[]): this {
    const result = nodes.reduce((acc, node) => {
      const calculator = NODE_META[node.type as keyof typeof NODE_META]?.parameterCalculator;
      if (!calculator) return acc;

      const { params, flops } = calculator(node.data);
      return {
        totalParams: acc.totalParams + (params || 0),
        totalFlops: acc.totalFlops + (flops || 0)
      };
    }, { totalParams: 0, totalFlops: 0 });

    this.totalParams = result.totalParams;
    this.totalFlops = result.totalFlops;
    
    return this;
  }

  getTotalParams(): number {
    return this.totalParams;
  }

  getTotalFlops(): number {
    return this.totalFlops;
  }

  getResult(): ParameterCalculationResult {
    return {
      totalParams: this.totalParams,
      totalFlops: this.totalFlops
    };
  }
}