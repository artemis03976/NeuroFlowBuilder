import { Handle, Position } from '@xyflow/react';

import "../nodes.css"

export const ReluNode = ({ data, selected }) => {
  return (
    <div className={`node ${selected ? 'selected' : ''}`}>
      {/*<img src={Icon} alt="linear" className="w-6 h-6" />*/}
      <div className="node-title">{data.label}</div>
     
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};