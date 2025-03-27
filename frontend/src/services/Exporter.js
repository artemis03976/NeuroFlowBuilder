import { useFlowStore } from '@/stores/useFlowStore';

export const exportNetwork = () => {
  // Get raw data
  const rawNodes = useFlowStore.getState().nodes;
  const rawEdges = useFlowStore.getState().edges;

  // Sanitize data
  const nodes = rawNodes.map(node => ({
    id: node.id,
    type: node.type,
    position: node.position,
    data: node.data
  }));

  const edges = rawEdges.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.sourceHandle,
    targetHandle: edge.targetHandle
  }));

  return {
    version: '1.0',
    created_at: new Date().toISOString(),
    nodes,
    edges
  };
};
