import React, { useCallback } from "react";
import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";

import { NODE_META } from "@/configs/node"
import { useFlowStore } from "@/stores/useFlowStore";
import { useNodeDnD } from "@/hooks/useNodeDnD";
import { useEditorInteractions } from "@/hooks/useEditorInteractions";
import { useModelAnalyzer } from "@/hooks/useModelAnalyzer";

import { InfoPanel } from "@/components/InfoPanel";
import * as NodeComponents from "../Nodes";

import './NodeEditor.css';

// Node Types map
const nodeTypes = Object.entries(NODE_META).reduce((acc, [type, meta]) => {
  // Transform component names to type enums
  if (meta.componentName && NodeComponents[meta.componentName]) {
    acc[type] = NodeComponents[meta.componentName];
  }
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
  useModelAnalyzer();

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
