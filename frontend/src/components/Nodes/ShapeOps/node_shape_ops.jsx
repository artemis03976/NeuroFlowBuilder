import { Handle, Position } from '@xyflow/react';

import "../nodes.css"

export const ShapeOpsNode = ({ data, selected }) => {
  const label = typeof data.label === 'function' 
    ? data.label(data) 
    : data.label;

  return (
    <div className={`node ${selected ? 'selected' : ''}`}>
      <div className="node-title">{label}</div>
      <div className="node-summary">
        {data.operation === 'reshape' || data.operation === 'view' ? (
          `Shape: [${data.targetShape?.join(', ') || ''}]`
        ) : (
          `Dim: ${data.dim ?? ''}`
        )}
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};