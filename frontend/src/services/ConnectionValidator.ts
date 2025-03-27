import { NODE_META } from '@/configs/node';
import { DimensionCalculator } from './DimensionCalculator';

export class ConnectionValidator {
  private validationErrors = new Map<string, ValidationResult>();
  
  constructor(private calculator: DimensionCalculator) {}
  
  // 验证节点输入
  validateNodeInput(node: FlowNode): ValidationResult {
    const config = NODE_META[node.type as keyof typeof NODE_META];
    if (!config?.dimensionRules) {
      return { isValid: true };
    }
    
    // 获取预期输入维度
    const context = this.createValidationContext(node);
    const expectedInput = config.dimensionRules.input(context);
    
    // 获取实际输入维度
    const actualInputs = this.calculator.getActualInputDimensions(node.id);
    if (actualInputs.length === 0) {
      // 如果是没有输入的节点（例如输入层），视为有效
      return { isValid: true };
    }
    
    // 对于单输入节点
    if (actualInputs.length === 1) {
      const actualInput = actualInputs[0];
      
      // 如果节点定义了自定义验证规则，使用它
      if (config.dimensionRules.validateInput) {
        const result = config.dimensionRules.validateInput(
          actualInput, expectedInput, context
        );
        
        if (!result.isValid) {
          this.validationErrors.set(node.id, result);
        }
        
        return result;
      }
      
      // 默认验证规则
      return this.defaultValidation(actualInput, expectedInput, node.id);
    }
    
    // 多输入节点的验证逻辑...
    
    return { isValid: true };
  }
  
  // 创建验证上下文
  private createValidationContext(node: FlowNode) {
    // 实现验证上下文创建逻辑
  }
  
  // 默认验证规则
  private defaultValidation(actual: number[], expected: number[], nodeId: string): ValidationResult {
    const dynamicMark = -1; // 默认动态标记
    
    // 检查维度长度是否匹配
    if (actual.length !== expected.length) {
      return {
        isValid: false,
        message: `维度长度不匹配: 预期 ${expected.length}, 实际 ${actual.length}`,
        expectedShape: expected,
        actualShape: actual
      };
    }
    
    // 检查每个维度是否匹配（考虑动态标记）
    for (let i = 0; i < expected.length; i++) {
      if (expected[i] !== dynamicMark && actual[i] !== dynamicMark && expected[i] !== actual[i]) {
        return {
          isValid: false,
          message: `维度不匹配: 预期 ${expected.join('×')}, 实际 ${actual.join('×')}`,
          expectedShape: expected,
          actualShape: actual
        };
      }
    }
    
    return { isValid: true };
  }
  
  // 获取所有验证错误
  getAllErrors(): Map<string, ValidationResult> {
    return this.validationErrors;
  }
  
  // 清除所有错误
  clearErrors() {
    this.validationErrors.clear();
  }
}