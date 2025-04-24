import { NODE_TYPE } from '@node-configs';
import type { BaseNodeConfig, DimensionRules, ParameterCalculator } from '@node-configs';

// Parameter Definition
type MergeOpsParams = {
  operation: 'cat' | 'stack';
  dim: number;
};

// Dimension Calculation Logic
const MergeOpsDimensionRules: DimensionRules<MergeOpsParams> = {
  validate: ({ inputs, params }) => {
    if (inputs.length < 2) {
      return { 
        isValid: false, 
        message: "合并操作需要至少两个输入连接" 
      };
    }
    
    // 检查所有输入的维度是否兼容
    const firstInput = inputs[0];
    const firstInputDims = firstInput.length;
    
    // 验证维度索引是否有效
    if (params.dim < -firstInputDims || params.dim >= firstInputDims) {
      return {
        isValid: false,
        message: `无效的维度索引: ${params.dim}，应该在 [${-firstInputDims}, ${firstInputDims - 1}] 范围内`,
        fixSuggestion: { dim: Math.min(Math.max(-firstInputDims, params.dim), firstInputDims - 1) }
      };
    }
    
    // 对于cat操作，检查除了合并维度外的其他维度是否相同
    if (params.operation === 'cat') {
      const normalizedDim = params.dim < 0 ? firstInputDims + params.dim : params.dim;
      
      for (let i = 1; i < inputs.length; i++) {
        const input = inputs[i];
        
        if (input.length !== firstInputDims) {
          return {
            isValid: false,
            message: `所有输入必须具有相同的维度数量，但输入 ${i} 的维度数量为 ${input.length}，而第一个输入的维度数量为 ${firstInputDims}`
          };
        }
        
        for (let d = 0; d < firstInputDims; d++) {
          if (d !== normalizedDim && input[d] !== firstInput[d]) {
            return {
              isValid: false,
              message: `在cat操作中，除了合并维度外的所有维度必须相同，但在维度 ${d} 上，输入 ${i} 的大小为 ${input[d]}，而第一个输入的大小为 ${firstInput[d]}`
            };
          }
        }
      }
    }
    
    // 对于stack操作，检查所有输入的形状是否完全相同
    if (params.operation === 'stack') {
      for (let i = 1; i < inputs.length; i++) {
        const input = inputs[i];
        
        if (input.length !== firstInputDims) {
          return {
            isValid: false,
            message: `在stack操作中，所有输入必须具有相同的维度数量，但输入 ${i} 的维度数量为 ${input.length}，而第一个输入的维度数量为 ${firstInputDims}`
          };
        }
        
        for (let d = 0; d < firstInputDims; d++) {
          if (input[d] !== firstInput[d]) {
            return {
              isValid: false,
              message: `在stack操作中，所有输入的形状必须完全相同，但在维度 ${d} 上，输入 ${i} 的大小为 ${input[d]}，而第一个输入的大小为 ${firstInput[d]}`
            };
          }
        }
      }
    }
    
    return { isValid: true };
  },
  
  compute: ({ inputs, params }) => {
    if (inputs.length < 2) {
      return [];
    }
    
    const firstInput = inputs[0];
    const normalizedDim = params.dim < 0 ? firstInput.length + params.dim : params.dim;
    
    switch(params.operation) {
      case 'cat': {
        // 计算合并后的形状
        const result = [...firstInput];
        // 在合并维度上，累加所有输入的大小
        result[normalizedDim] = inputs.reduce((sum, input) => sum + input[normalizedDim], 0);
        return result;
      }
      
      case 'stack': {
        // 在指定维度插入新的维度，其大小为输入的数量
        return [
          ...firstInput.slice(0, normalizedDim),
          inputs.length,
          ...firstInput.slice(normalizedDim)
        ];
      }
      
      default:
        return firstInput;
    }
  }
};

// Parameter Calculation Logic
const MergeOpsParameterCalculator: ParameterCalculator<MergeOpsParams> = (p) => ({
  params: 0,
  flops: 0
});

// Meta Config
const MERGE_OPS_META: BaseNodeConfig<typeof NODE_TYPE.MERGE_OPS, MergeOpsParams> = {
  type: NODE_TYPE.MERGE_OPS,
  label: (params) => `MergeOp(${params.operation})`,
  parameters: {
    operation: 'cat',
    dim: -1,
  },
  dimensionRules: MergeOpsDimensionRules,
  parameterCalculator: MergeOpsParameterCalculator,
  componentName: 'MergeOpsNode',
  configFormPath: 'MergeOpsNode/config_form_merge_ops',
};

export default MERGE_OPS_META;