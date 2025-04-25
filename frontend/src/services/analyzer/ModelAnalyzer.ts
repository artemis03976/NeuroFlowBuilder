import { DimensionCalculator } from './DimensionCalculator';
import { ParameterCalculator } from './ParameterCalculator';
import { ConnectionValidator } from './ConnectionValidator';
import type { FlowNode, FlowEdge } from '@/stores/useFlowStore';

export class ModelAnalyzer {
  private dimensionCalculator: DimensionCalculator;
  private connectionValidator: ConnectionValidator;
  private parameterCalculator: ParameterCalculator;
  
  constructor() {
    this.dimensionCalculator = new DimensionCalculator();
    this.connectionValidator = new ConnectionValidator();
    this.parameterCalculator = new ParameterCalculator();
  }
  
  analyze(nodes: FlowNode[], edges: FlowEdge[]) {
    // 计算维度
    this.dimensionCalculator.calculate(nodes, edges, this.connectionValidator, false);
    // 计算参数
    this.parameterCalculator.calculate(nodes);
  }
  
  getNodeDimension(nodeId: string) {
    return {
      input: this.dimensionCalculator.getInputDimension(nodeId),
      output: this.dimensionCalculator.getOutputDimension(nodeId)
    };
  }
  
  getValidationResult(nodeId: string) {
    return this.connectionValidator.getValidationResult(nodeId);
  }
  
  getAllValidationResults() {
    return this.connectionValidator.getAllValidationResults();
  }

  getParameterResults() {
    return this.parameterCalculator.getResult();
  }
}