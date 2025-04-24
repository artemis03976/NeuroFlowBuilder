import { NODE_TYPE } from '@node-configs';
import type { BaseNodeConfig, DimensionRules, ParameterCalculator } from '@node-configs';

// Parameter Definition
type OutputParams = {
  name: string;  // 输出名称，方便用户标识
};

// Dimension Calculation and Validation logic
const OutputDimensionRules: DimensionRules<OutputParams> = {
  validate: ({ inputs, params }) => {
    // Check validation
    if (inputs.length === 0) {
      return { 
        isValid: false, 
        message: "输出节点需要一个输入连接" 
      };
    }
    
    if (inputs.length > 1) {
      return {
        isValid: false,
        message: "输出节点只能有一个输入连接"
      };
    }
    
    return { isValid: true };
  },
  
  compute: ({ inputs }) => {
    if (inputs.length === 0) {
      return [];
    }
    
    return [...inputs[0]];
  }
};

// Parameter Calculation Logic
const OutputParameterCalculator: ParameterCalculator<OutputParams> = (p) => ({
  params: 0,
  flops: 0
});

// Meta Config
const OUTPUT_META: BaseNodeConfig<typeof NODE_TYPE.OUTPUT, OutputParams> = {
  type: NODE_TYPE.OUTPUT,
  label: 'Output',
  parameters: {
    name: 'output'
  },
  dimensionRules: OutputDimensionRules,
  parameterCalculator: OutputParameterCalculator,
  componentName: 'NetworkOutputNode',
  configFormPath: 'Output/config_form_output',
};

export default OUTPUT_META;