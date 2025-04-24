import { NODE_TYPE } from '@node-configs';
import type { BaseNodeConfig, DimensionRules, ParameterCalculator } from '@node-configs';

// Parameter Definition
type InputParams = {
  shape: number[];
  name: string;
};

// Dimension Calculation and Validation logic
const InputDimensionRules: DimensionRules<InputParams> = {
  validate: ({ inputs, params }) => {
    if (inputs.length > 0) {
      return { 
        isValid: false, 
        message: "输入节点不应有输入连接" 
      };
    }
    
    // Check validation
    if (!params.shape || params.shape.length === 0) {
      return {
        isValid: false,
        message: "请指定有效的输入形状"
      };
    }
    
    const invalidDim = params.shape.find(dim => dim <= 0);
    if (invalidDim !== undefined) {
      return {
        isValid: false,
        message: "输入形状的所有维度必须为正数"
      };
    }
    
    return { isValid: true };
  },
  
  compute: ({ params }) => {
    return [...params.shape];
  }
};

// Parameter Calculation Logic
const InputParameterCalculator: ParameterCalculator<InputParams> = (p) => ({
  params: 0,
  flops: 0
});

// Meta Config
const INPUT_META: BaseNodeConfig<typeof NODE_TYPE.INPUT, InputParams> = {
  type: NODE_TYPE.INPUT,
  label: 'Input',
  parameters: {
    shape: [2, 64],
    name: 'input'
  },
  dimensionRules: InputDimensionRules,
  parameterCalculator: InputParameterCalculator,
  componentName: 'NetworkInputNode',
  configFormPath: 'Input/config_form_input',
};

export default INPUT_META;