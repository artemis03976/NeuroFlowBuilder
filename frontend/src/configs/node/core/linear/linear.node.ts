import { NODE_TYPES } from '@node-configs/types';
import type { BaseNodeConfig, DimensionRules, ParameterCalculator } from '@node-configs/types';

// Parameter Definition
type LinearParams = {
  in_features: number;
  out_features: number;
  bias: boolean;
};

// Dimension Calculation and Validation logic
const LinearDimensionRules: DimensionRules<LinearParams> = {
  validate: ({ inputs, params }) => {
    if (inputs.length === 0) {
      return { 
        isValid: false, 
        message: "No connection detected" 
      };
    }

    const input = inputs[0];

    // Check validation
    const inputFeatures = input[input.length - 1];
    if (inputFeatures!== params.in_features) {
      return {
        isValid: false,
        message: `Actual input dim ${inputFeatures} doesn't match with current params (in_features: ${params.in_features})`,
        fixSuggestion: { in_features: inputFeatures } // 建议修改in_features参数
      };
    }
    
    return { isValid: true };
  },
  
  compute: ({ inputs, params }) => {
    if (inputs.length === 0) {
      return [params.out_features];
    }
    return [
      ...inputs[0].slice(0, -1), 
      params.out_features
    ];
  }
};

// Parameter Calculation Logic
const LinearParameterCalculator: ParameterCalculator<LinearParams> = (p) => ({
  params: p.in_features * p.out_features + (p.bias ? p.out_features : 0),
  flops: 2 * p.in_features * p.out_features
});

// Meta Config
const LINEAR_META: BaseNodeConfig<typeof NODE_TYPES.LINEAR, LinearParams> = {
  type: NODE_TYPES.LINEAR,
  label: 'nn.Linear',
  parameters: {
    in_features: 64,
    out_features: 32,
    bias: true
  },
  dimensionRules: LinearDimensionRules,
  parameterCalculator: LinearParameterCalculator,
};

export default LINEAR_META;