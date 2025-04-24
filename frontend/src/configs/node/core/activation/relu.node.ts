import { NODE_TYPE } from '@node-configs';
import type { BaseNodeConfig, DimensionRules, ParameterCalculator } from '@node-configs';

// Parameter Definition
type ReluParams = {
  inplace: boolean;
};

// Dimension Calculation and Validation logic
const ReluDimensionRules: DimensionRules<ReluParams> = {
  validate: ({ inputs, params }) => {
    if (inputs.length === 0) {
      return { 
        isValid: false, 
        message: "No connection detected" 
      };
    }
    
    return { isValid: true };
  },
  
  compute: ({ inputs, params }) => {
    if (inputs.length === 0) {
      return [];
    }
    
    return [...inputs[0]];
  }
};

// Parameter Calculation Logic
const ReluParameterCalculator: ParameterCalculator<ReluParams> = (p) => ({
  params: 0,
  flops: 0
});

// Meta Config
export const RELU_META: BaseNodeConfig<typeof NODE_TYPE.RELU, ReluParams> = {
  type: NODE_TYPE.RELU,
  label: 'nn.ReLU',
  parameters: {
    inplace: false
  },
  dimensionRules: ReluDimensionRules,
  parameterCalculator: ReluParameterCalculator,
  componentName: 'ReluNode',
  configFormPath: 'Relu/config_form_relu',
};

export default RELU_META;