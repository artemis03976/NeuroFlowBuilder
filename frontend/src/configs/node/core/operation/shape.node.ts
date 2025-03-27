import { NODE_TYPES } from '@node-configs/types';
import type { BaseNodeConfig, DimensionRules, ParameterCalculator } from '@node-configs/types';

// Parameter Definition
type ShapeOpsParams = {
  operation: 'reshape' | 'view' | 'squeeze' | 'unsqueeze';
  targetShape?: number[]; // for reshape / view
  dim?: number; // for squeeze / unsqueeze
};

// Dimension Calculation and Validation logic
const ShapeOpsDimensionRules: DimensionRules<ShapeOpsParams> = {
  validate: ({ inputs, params }) => {
    if (inputs.length === 0) {
      return { 
        isValid: false, 
        message: "No connection detected" 
      };
    }
    
    const input = inputs[0];
    
    // Validate based on various operation
    switch(params.operation) {
      case 'reshape':
      case 'view':
        if (!params.targetShape || params.targetShape.length === 0) {
          return {
            isValid: false,
            message: "`reshape` operation requires a target shape"
          };
        }
        
        // Validate the total amount of elements
        const inputElements = input.reduce((a, b) => a * b, 1);
        const negativeIndices = params.targetShape.filter(d => d === -1).length;
        
        if (negativeIndices > 1) {
          return {
            isValid: false,
            message: "At most one -1 can be used"
          };
        }
        
        if (negativeIndices === 0) {
          const targetElements = params.targetShape.reduce((a, b) => a * b, 1);
          if (inputElements !== targetElements) {
            return {
              isValid: false,
              message: `Size mismatch between input shape ${inputElements} and target shape ${targetElements}`
            };
          }
        }
        break;
        
      case 'squeeze':
        // Validate the range of dim
        if (params.dim === undefined || params.dim < -input.length || params.dim >= input.length) {
          return {
            isValid: false,
            message: `Invalid dim: ${params.dim}，should be in: [${-input.length}, ${input.length - 1}]`,
            fixSuggestion: { dim: Math.min(Math.max(0, params.dim || 0), input.length - 1) }
          };
        }
        
        // Validate whether the dim can be compressed
        if (input[params.dim] !== 1 && input[params.dim] !== -1) {
          return {
            isValid: false,
            message: `Only dim of size 1 can be compressed, but the dim ${params.dim} has a size of ${input[params.dim]}`
          };
        }
        break;
        
      case 'unsqueeze':
        // Validate the range of dim
        if (params.dim === undefined || params.dim < -input.length || params.dim > input.length) {
          return {
            isValid: false,
            message: `Invalid dim: ${params.dim}，should be in: [${-input.length}, ${input.length - 1}]`,
            fixSuggestion: { dim: Math.min(Math.max(0, params.dim || 0), input.length - 1) }
          };
        }
        break;
        
      default:
        return {
          isValid: false,
          message: `Unknown shape operation: ${params.operation}`
        };
    }
    
    return { isValid: true };
  },
  
  compute: ({ inputs, params }) => {
    if (inputs.length === 0) {
      return [];
    }
    
    const input = inputs[0];
    
    switch(params.operation) {
      case 'reshape':
      case 'view': {
        if (!params.targetShape || params.targetShape.length === 0) {
          return input;
        }
        
        const negativeIndex = params.targetShape.findIndex(d => d === -1);
        
        if (negativeIndex === -1) {
          return [...params.targetShape];
        }
        
        // handle -1 placeholder
        const inputElements = input.reduce((a, b) => a * b, 1);
        const targetElements = params.targetShape
          .filter(d => d !== -1)
          .reduce((a, b) => a * Math.abs(b), 1);
        
        const missingDimension = Math.floor(inputElements / targetElements);
        
        return params.targetShape.map(d => d === -1 ? missingDimension : d);
      }
      
      case 'squeeze':
        return input.filter((_, i) => i !== params.dim);
        
      case 'unsqueeze':
        return [
          ...input.slice(0, params.dim),
          1,
          ...input.slice(params.dim)
        ];
        
      default:
        return input;
    }
  }
};

// Parameter Calculation Logic
const ShapeOpsParameterCalculator: ParameterCalculator<ShapeOpsParams> = (p) => ({
  params: 0,
  flops: 0
});

// Meta Config
const SHAPE_OPS_META: BaseNodeConfig<typeof NODE_TYPES.SHAPE_OPS, ShapeOpsParams> = {
  type: NODE_TYPES.SHAPE_OPS,
  label: (params) => `ShapeOp(${params.operation})`,
  parameters: {
    operation: 'reshape',
    targetShape: [],
    dim: -1,
  },
  dimensionRules: ShapeOpsDimensionRules,
  parameterCalculator: ShapeOpsParameterCalculator,
};

export default SHAPE_OPS_META;