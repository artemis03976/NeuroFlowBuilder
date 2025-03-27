import { NODE_TYPES } from '@node-configs/types';
import type { BaseNodeConfig, DimensionRules, ParameterCalculator } from '@node-configs/types';

// Parameter Definition
type MergeOpsParams = {
  operation: 'cat' | 'stack';
  dim: number;
};

// Dimension Calculation Logic
const MergeOpsDimensionRules: DimensionRules<MergeOpsParams> = {
  input: ({ prevDims }) => {
    if (!prevDims?.length) return [];
    return prevDims[0];
  },
  output: ({ params, prevDims = [] }) => {
    const baseDim = prevDims[0] || [];
    switch(params.operation) {
      case 'cat':
        return baseDim.map((d, i) => 
          i === params.dim ? d * prevDims.length : d
        );
      case 'stack':
        return [
          ...baseDim.slice(0, params.dim),
          prevDims.length,
          ...baseDim.slice(params.dim)
        ];
      default:
        return baseDim;
    }
  },
  dynamicMark: -1
};

// Parameter Calculation Logic
const MergeOpsParameterCalculator: ParameterCalculator<MergeOpsParams> = (p) => ({
  params: 0,
  flops: 0
});

// Meta Config
const MERGE_OPS_META: BaseNodeConfig<typeof NODE_TYPES.MERGE_OPS, MergeOpsParams> = {
  type: NODE_TYPES.MERGE_OPS,
  label: (params) => `MergeOp(${params.operation})`,
  parameters: {
    operation: 'cat',
    dim: -1,
  },
  dimensionRules: MergeOpsDimensionRules,
  parameterCalculator: MergeOpsParameterCalculator,
};

export default MERGE_OPS_META;