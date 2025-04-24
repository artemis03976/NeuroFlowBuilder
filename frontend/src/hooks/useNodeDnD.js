import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { useFlowStore } from "@/stores/useFlowStore";
import { NODE_META } from '@node-configs';

export const useNodeDnD = () => {
  const { screenToFlowPosition } = useReactFlow();
  const addNode = useFlowStore(state => state.addNode);

  const onDrop = useCallback((event) => {
    event.preventDefault();

    // Get drag data（Node type）
    const type = event.dataTransfer.getData('application/reactflow');
    if (!type || !NODE_META[type]) return;

    // Get position on Canvas
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY
    });

    // Add node
    addNode({
      type,
      position,
      data: {
        // use default in Meta config
        ...NODE_META[type].parameters,
        label: NODE_META[type].label
      }
    });
  }, [screenToFlowPosition, addNode]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return { onDrop, onDragOver };
};
