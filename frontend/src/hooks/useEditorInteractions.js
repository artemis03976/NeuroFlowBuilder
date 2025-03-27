import { useCallback, useEffect } from "react";
import { useFlowStore } from "@/stores/useFlowStore";


export const useEditorInteractions = () => {
  // Element state
  const setSelectedElement = useFlowStore(state => state.setSelectedElement);
  const selectedElementId = useFlowStore(state => state.selectedElementId);
  const deleteNode = useFlowStore(state => state.deleteNode);
  const deleteEdge = useFlowStore(state => state.deleteEdge);

  // Handle Canvas click (Deselect)
  const handlePaneClick = useCallback((event) => {
    if (event.target.classList.contains('react-flow__pane')) {
      setSelectedElement(null);
    }
  }, [setSelectedElement]);

  // Handle element click
  const handleElementClick = useCallback((event, element) => {
    event.stopPropagation();
    setSelectedElement(element.id);
  }, [setSelectedElement]);

  // Handle delete
  const handleDelete = useCallback(() => {
    if (selectedElementId.startsWith('node')) {
      // Delete node and its corresponding edges
      const relatedEdges = useFlowStore.getState().edges.filter(edge =>
        edge.source === selectedElementId || edge.target === selectedElementId
      );
      relatedEdges.forEach(edge => deleteEdge(edge.id));
      deleteNode(selectedElementId);
    } else if (selectedElementId.startsWith('edge')) {
      deleteEdge(selectedElementId);
    }
  }, [selectedElementId, deleteNode, deleteEdge]);

  // Keyboard event listen
  useEffect(() => {
    const handler = (event) => {
      switch (event.key) {
        // deselect
        case 'Escape':
          setSelectedElement(null);
          break;
        // delete element
        case 'Delete':
          handleDelete();
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleDelete, setSelectedElement]);

  return { handlePaneClick, handleElementClick };
};