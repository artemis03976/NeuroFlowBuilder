import { NODE_META } from '@/configs/node'


export class DimensionManager {
  constructor() {
    this.nodeDimensions = new Map(); // {nodeId: {in: number[], out: number[]}}
  }

  updateNode(node) {
    const handler = NODE_META[node.type].dimensionRules;
    if (!handler) return;

    const dimensionContext = {
      params: node.data
    }

    this.nodeDimensions.set(node.id, {
      in: handler.input(dimensionContext),
      out: handler.output(dimensionContext)
    });
  }

  checkConnection(sourceId, targetId) {
    const sourceNode = this.nodeDimensions.get(sourceId);
    const targetNode = this.nodeDimensions.get(targetId);
    if (!sourceNode || !targetNode) return false;

    const sourceRules = sourceNode.dimensionRules
    const targetRules = targetNode.dimensionRules

    const dynamicMark = [
      sourceRules.dynamicMark ?? -1,
      targetRules.dynamicMark ?? -1,
    ]

    // 动态维度跳过检查
    return sourceNode.out.every((sDim, i) =>
      sDim === dynamicMark[0] || 
      targetIn[i] === dynamicMark[1] || 
      sDim === targetIn[i]
    );
  }
}