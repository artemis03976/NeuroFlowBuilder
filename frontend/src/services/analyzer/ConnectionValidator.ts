import { NODE_META } from '@node-configs';
import type { DimensionContext, ValidationResult } from '@node-configs';
import type { FlowNode } from '@/stores/useFlowStore'
import { useErrorStore } from '@/stores/useErrorStore';
import { ERROR_TYPE } from '@error-configs';

export class ConnectionValidator {
  private validationResults = new Map<string, ValidationResult>();
  
  private errorStore = useErrorStore.getState();

  // 验证节点输入
  validateNode(node: FlowNode, context: DimensionContext<any>): ValidationResult {
    const config = NODE_META[node.type as keyof typeof NODE_META];
    if (!config?.dimensionRules) {
      return { isValid: true };
    }
    
    // 使用节点的验证规则
    const result = config.dimensionRules.validate(context);
    
    // 存储验证结果
    this.validationResults.set(node.id, result);

    if (!result.isValid) {
      this.errorStore.addError(ERROR_TYPE.DIMENSION, node.id, {
        message: result.message || '验证失败',
        context: {
          nodeType: node.type,
          fixSuggestion: result.fixSuggestion
        }
      });
    } else {
      // 如果验证成功，移除可能存在的错误
      this.errorStore.removeError(ERROR_TYPE.DIMENSION, node.id);
    }
    
    return result;
  }
  
  // 获取验证结果
  getValidationResult(nodeId: string): ValidationResult | undefined {
    return this.validationResults.get(nodeId);
  }
  
  // 获取所有验证结果
  getAllValidationResults(): Map<string, ValidationResult> {
    return this.validationResults;
  }
  
  // 获取所有错误（筛选出失败的验证结果）
  getErrors(): Map<string, ValidationResult> {
    const errors = new Map<string, ValidationResult>();
    
    for (const [nodeId, result] of this.validationResults.entries()) {
      if (!result.isValid) {
        errors.set(nodeId, result);
      }
    }
    
    return errors;
  }
  
  // 检查是否有错误
  hasErrors(): boolean {
    return Array.from(this.validationResults.values())
      .some(result => !result.isValid);
  }
  
  // 清除所有验证结果
  clearErrors(): this {
    this.validationResults.clear();
    this.errorStore.clearType(ERROR_TYPE.DIMENSION);
    return this;
  }
}
