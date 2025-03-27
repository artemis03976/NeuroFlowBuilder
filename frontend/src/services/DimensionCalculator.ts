import { NODE_META } from '@/configs/node';
import type { DimensionContext } from '@/configs/node/types';
import type { FlowNode, FlowEdge } from '@/stores/useFlowStore';

export class DimensionCalculator {
  // Store the dimension change pairs for each node
  private nodeDimensions = new Map<string, {
    in: number[][];
    out: number[];
  }>();
  // Store the predecessor for each node (targetId -> sourceIds)
  private predecessorMap = new Map<string, string[]>();

  // Calculate the changes of dimension during forward propagation
  calculate(nodes: FlowNode[], edges: FlowEdge[], stopOnError = false) {
    this.nodeDimensions.clear();

    this.buildMap(edges);
    
    // Do topological sort to ensure propagation path
    const sortedNodes = this.topologicalSort(nodes, edges);

    // for (const node of sortedNodes) {
    //   const validationResult = this.validateNode(node);
    //   this.validationResults.set(node.id, validationResult);
      
    //   if (!validationResult.isValid && stopOnError) {
    //     return this; // 出错时可选择停止计算
    //   }
    // }

    // Caculate dimension changes based on the sorted order
    sortedNodes.forEach(node => this.computeNodeDim(node));
    
    return this;
  }

  // Build map based on edge connections (for finding the predecessor)
  private buildMap(edges: FlowEdge[]) {
    this.predecessorMap.clear();
    edges.forEach(edge => {
      const sources = this.predecessorMap.get(edge.target) || [];
      sources.push(edge.source);
      this.predecessorMap.set(edge.target, sources);
    });
  }

  // Topological Sort Algorithm
  private topologicalSort(nodes: FlowNode[], edges: FlowEdge[]): FlowNode[] {
    const nodeMap = new Map<string, FlowNode>();
    nodes.forEach(node => nodeMap.set(node.id, node));
    
    // 构建邻接表
    const graph = new Map<string, string[]>();
    nodes.forEach(node => graph.set(node.id, []));
    edges.forEach(edge => {
      const targets = graph.get(edge.source) || [];
      targets.push(edge.target);
      graph.set(edge.source, targets);
    });
    
    // 计算入度
    const inDegree = new Map<string, number>();
    nodes.forEach(node => inDegree.set(node.id, 0));
    edges.forEach(edge => {
      inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
    });
    
    // BFS拓扑排序
    const queue: string[] = [];
    nodes.forEach(node => {
      if ((inDegree.get(node.id) || 0) === 0) {
        queue.push(node.id);
      }
    });
    
    const result: FlowNode[] = [];
    while (queue.length) {
      const current = queue.shift()!;
      const node = nodeMap.get(current);
      if (node) result.push(node);
      
      (graph.get(current) || []).forEach(neighbor => {
        inDegree.set(neighbor, (inDegree.get(neighbor) || 0) - 1);
        if ((inDegree.get(neighbor) || 0) === 0) {
          queue.push(neighbor);
        }
      });
    }
    
    return result;
  }

  // Compute the input dim and output dim of nodes
  computeNodeDim(node: FlowNode) {
    const nodeConfig = NODE_META[node.type as keyof typeof NODE_META];
    const rules = nodeConfig?.dimensionRules;
    if (!rules) return;

    const context = this.createContext(node);
    
    this.nodeDimensions.set(node.id, {
      in: context.inputs,
      out: rules.compute(context)
    });
  }

  // Create Dimension Calculation Context
  private createContext(node: FlowNode): DimensionContext<any> {
    // Get node data
    const params = node.data || {};
    
    // Get output dim of the predecessor nodes
    const inputs: number[][] = [];
    const sources = this.predecessorMap.get(node.id) || [];

    // Node without predecessor is the input node, leave it empty
    if (sources.length > 0) {
      sources.forEach(sourceId => {
        const sourceDim = this.getOutputDimension(sourceId);
        if (sourceDim.length > 0) {
          inputs.push(sourceDim);
        }
      });
    }
    
    return { params, inputs };
  }

  getInputDimension(nodeId: string) {
    return this.nodeDimensions.get(nodeId)?.in || [];
  }

  getOutputDimension(nodeId: string) {
    return this.nodeDimensions.get(nodeId)?.out || [];
  }
}