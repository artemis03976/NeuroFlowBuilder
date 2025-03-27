// import Icon from './icon.svg';
import { Handle, Position } from '@xyflow/react';

import "../nodes.css"

export const LinearNode = ({ data, selected }) => {
  return (
    <div className={`node ${selected ? 'selected' : ''}`}>
      {/*<img src={Icon} alt="linear" className="w-6 h-6" />*/}
      <div className="node-title">{data.label}</div>
      <div className="node-summary">{data.in_features} -&gt; {data.out_features}</div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};
