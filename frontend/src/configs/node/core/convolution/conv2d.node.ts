import { NODE_TYPES } from '@node-configs/types';
import type { BaseNodeConfig, DimensionRules, ParameterCalculator } from '@node-configs/types';

// Parameter Definition
type Conv2dParams = {
  in_channels: number;
  out_channels: number;
  kernel_size: [number, number];
  stride?: number;
  padding?: number | 'same' | 'valid';
  bias: boolean;
};

// Dimension Calculation and Validation logic
const Conv2dDimensionRules: DimensionRules<Conv2dParams> = {
  validate: ({ inputs, params }) => {
    if (inputs.length === 0) {
      return { 
        isValid: false, 
        message: "No connection detected" 
      };
    }
    
    const input = inputs[0];
    
    // Validate input length
    if (input.length < 3) {
      return {
        isValid: false,
        message: `Conv2D need at least 3d input (channel, height, width)，but get ${input.length} dim`
      };
    }
    
    // Validate input channels
    const inputChannels = input[input.length - 3];
    if (inputChannels !== params.in_channels) {
      return {
        isValid: false,
        message: `Actual input channels ${inputChannels} doesn't match with current params (in_channels: ${params.in_channels})`,
        fixSuggestion: { in_channels: inputChannels }
      };
    }
    
    return { isValid: true };
  },
  
  compute: ({ inputs, params }) => {
    if (inputs.length === 0) {
      return [params.out_channels, -1, -1];
    }
    
    const input = inputs[0];
    
    if (input.length < 3) {
      return [params.out_channels, -1, -1];
    }
    
    // Calculate changes in H&W
    let outputHeight = -1;
    let outputWidth = -1;
    
    if (input[input.length - 2] > 0 && input[input.length - 1] > 0) {
      const stride = params.stride || 1;
      const padding = typeof params.padding === 'number' ? params.padding : 
                     (params.padding === 'same' ? Math.floor(params.kernel_size[0] / 2) : 0);
      
      outputHeight = Math.floor((input[1] - params.kernel_size[0] + 2 * padding) / stride + 1);
      outputWidth = Math.floor((input[2] - params.kernel_size[1] + 2 * padding) / stride + 1);
    }
    
    return [
      ...input.slice(0, -3), 
      params.out_channels, 
      outputHeight, 
      outputWidth
    ];
  }
};

// Parameter Calculation Logic
const Conv2dParameterCalculator: ParameterCalculator<Conv2dParams> = (p) => ({
  params: p.in_channels * p.out_channels * p.kernel_size[0] * p.kernel_size[1] + (p.bias ? p.out_channels : 0),
  flops: 2 * p.in_channels * p.out_channels * p.kernel_size[0] * p.kernel_size[1]
});

// Meta Config
const CONV2D_META: BaseNodeConfig<typeof NODE_TYPES.CONV2D, Conv2dParams> = {
  type: NODE_TYPES.CONV2D,
  label: 'nn.Conv2D',
  parameters: {
    in_channels: 3,
    out_channels: 16,
    kernel_size: [3, 3],
    stride: 1,
    padding: 0,
    bias: true,
  },
  dimensionRules: Conv2dDimensionRules,
  parameterCalculator: Conv2dParameterCalculator,
};

export default CONV2D_META;