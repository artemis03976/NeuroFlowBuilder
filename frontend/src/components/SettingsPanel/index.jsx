import { memo, useMemo, lazy, Suspense } from 'react';
import { useFlowStore } from '@/stores/useFlowStore';
import { NODE_META } from '@node-configs';

import './SettingsPanel.css'

export const SettingsPanel = memo(() => {
  const { nodes, selectedElementId } = useFlowStore();
  const selectedNode = useMemo(() =>
    nodes.find(node => node.id === selectedElementId),
    [nodes, selectedElementId]
  );
  
  // Lazy import to dynamically get Config Form
  const FormComponent = useMemo(() => {
    if (!selectedNode) return null;
    const type = selectedNode.type;
    const nodeMeta = NODE_META[type];
    if (!nodeMeta || !nodeMeta.configFormPath) return null;

    try {
      return lazy(
        () => import(/* @vite-ignore */`../Nodes/${nodeMeta.configFormPath}`)
      );
    } catch (error) {
      console.error(`Failed to load module ${type}:`, error);
      return null;
    }
  }, [selectedNode?.type]); // Reload only when node type changes

  return (
    <div className={`settings-panel ${selectedNode ? 'active' : ''}`}>
      {!selectedNode ? (
        // Show empty state when no selection
        <div className="empty-state">Select a node to set</div>
      ) : FormComponent ? (
        // Valid Config Form
        <Suspense 
          fallback={<div className="empty-state">Loading...</div>}
          key={selectedElementId} // Reload form for every node
        >
          <div className="settings">
            <FormComponent config={selectedNode.data} />
          </div>
        </Suspense>
      ) : (
        // Unsupport Note
        <div className="empty-state">Currently Unsupported</div>
      )}
    </div>
  );
});