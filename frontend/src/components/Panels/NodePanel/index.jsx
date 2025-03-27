import { NodeItem } from './NodeItem';
import { NODE_TYPES } from '@/configs/node';

import './NodePanel.css';


const NodePanel = () => {
  return (
    <div className="node-panel">
      <h3>Node Library</h3>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="node-list">
        {Object.values(NODE_TYPES).map((nodeType) => (
          <NodeItem key={nodeType} type={nodeType} />
        ))}
      </div>
    </div>
  );
};

export default NodePanel;