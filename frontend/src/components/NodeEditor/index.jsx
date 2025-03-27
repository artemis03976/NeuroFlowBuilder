import React, { useCallback } from "react";
import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";

import { NODE_TYPES } from "@/configs/node"
import { useFlowStore } from "@/stores/useFlowStore";
import { useNodeDnD } from "@/hooks/useNodeDnD";
import { useEditorInteractions } from "@/hooks/useEditorInteractions";
import { useDimensionValidation } from "@/hooks/useDimensionValidation";

import { InfoPanel } from "@/components/InfoPanel";
import * as NodeComponents from "../Nodes";

import './NodeEditor.css';

// Node Types map
const nodeTypes = Object.entries(NodeComponents).reduce((acc, [componentName, component]) => {
  // Transform component names to type enums
  const typeName = componentName
    .replace('Node', '')  // Remove suffix
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .toUpperCase();
  
  acc[NODE_TYPES[typeName]] = component;
  return acc;
}, {});


export const NodeEditor = () => {
  // Node state management
  const nodes = useFlowStore(state => state.nodes);
  const onNodesChange = useFlowStore(state => state.onNodesChange);

  // Edge state management
  const edges = useFlowStore(state => state.edges);
  const onEdgesChange = useFlowStore(state => state.onEdgesChange);
  const addEdge = useFlowStore(state => state.addEdge);

  // Custom hooks
  const { onDrop, onDragOver } = useNodeDnD();
  const { handlePaneClick, handleElementClick } = useEditorInteractions();
  // useDimensionValidation();

  const onConnect = useCallback((connection) => {
    addEdge(connection)
  }, [addEdge]);

  return (
      <div className="reactflow-wrapper">
        {/* Main ReactFlow Canvas */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleElementClick}
          onEdgeClick={handleElementClick}
          onPaneClick={handlePaneClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Background variant="dots" gap={12} size={1} />
          <Controls />
          <MiniMap zoomable pannable />
        </ReactFlow>

        {/* Info Panel */}
        <InfoPanel />
      </div>
  );
};
