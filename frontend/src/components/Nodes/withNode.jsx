import React from 'react';
import { Handle, Position } from '@xyflow/react';
import "./nodes.css";

/**
 * 节点高阶组件，用于封装节点的通用逻辑和UI
 * @param {Object} options - 配置选项
 * @param {boolean} options.hasInput - 是否有输入连接点
 * @param {boolean} options.hasOutput - 是否有输出连接点
 * @param {Function} options.getLabel - 获取节点标签的函数
 * @param {Function} options.renderContent - 自定义渲染节点内容的函数
 * @returns {React.ComponentType} - 增强后的节点组件
 */
const withNode = (options = {}) => {
  const {
    n_inputs = 1,
    n_outputs = 1,
    getLabel = (data) => data.label,
    renderContent = null,
  } = options;

  // 返回增强后的组件
  return (props) => {
    const { data, selected } = props;
    
    // 获取标签
    const label = typeof getLabel === 'function' 
      ? getLabel(data) 
      : (typeof data.label === 'function' ? data.label(data) : data.label);
    
    // 获取维度信息
    const inputDim = data.dimensions?.input || [];
    const outputDim = data.dimensions?.output || [];
    
    // 格式化维度显示
    const formatDim = (dim) => {
      if (!dim || dim.length === 0) return '?';

      // 确保所有维度都以数组形式显示
      if (Array.isArray(dim)) {
        // 如果是二维数组，每个元素都是一个输入/输出
        if (dim.some(Array.isArray)) {
          return dim.map(d => 
            Array.isArray(d) ? `[${d.join(', ')}]` : `[${d}]`
          ).join(', ');
        } 
        // 如果是一维数组，将其作为单个输入/输出的维度
        else {
          return `[${dim.join(', ')}]`;
        }
      }
      
      return `[${dim}]`;
    };

    // 处理输入连接点
    const renderInputHandles = () => {
      const inputCount = typeof n_inputs === 'number' ? n_inputs : n_inputs.length;
      const handles = [];
      
      if (inputCount <= 0) return null;
      
      // 计算连接点之间的间距
      const spacing = 1 / (inputCount + 1);
      
      for (let i = 0; i < inputCount; i++) {
        const inputConfig = Array.isArray(n_inputs) ? n_inputs[i] : {};
        const { id = `input_${i}`, label: handleLabel } = inputConfig;
        
        handles.push(
          <Handle 
            key={`input_${i}`}
            type="target" 
            position={Position.Top} 
            id={id}
            style={{ left: `${(i + 1) * spacing * 100}%` }}
          />
        );
      }
      
      return handles;
    };
    
    // 处理输出连接点
    const renderOutputHandles = () => {
      const outputCount = typeof n_outputs === 'number' ? n_outputs : n_outputs.length;
      const handles = [];
      
      if (outputCount <= 0) return null;
      
      // 计算连接点之间的间距
      const spacing = 1 / (outputCount + 1);
      
      for (let i = 0; i < outputCount; i++) {
        const outputConfig = Array.isArray(n_outputs) ? n_outputs[i] : {};
        const { id = `output_${i}`, label: handleLabel } = outputConfig;
        
        handles.push(
          <Handle 
            key={`output_${i}`}
            type="source" 
            position={Position.Bottom} 
            id={id}
            style={{ left: `${(i + 1) * spacing * 100}%` }}
          />
        );
      }
      
      return handles;
    };

    return (
      <div className={`node ${selected ? 'selected' : ''}`}>
        <div className="node-title">{label}</div>
        
        {/* 默认维度显示 */}
        {!renderContent ? (
          <div className="node-dimensions">
            {n_inputs > 0 && <span className="input-dim">{formatDim(inputDim)}</span>}
            {n_inputs > 0 && n_outputs > 0 && <span className="arrow">-&gt;</span>}
            {n_outputs > 0 && <span className="output-dim">{formatDim(outputDim)}</span>}
          </div>
        ) : (
          // 自定义内容渲染
          renderContent({ data, formatDim, inputDim, outputDim })
        )}
        
        {/* 连接点 */}
        {renderInputHandles()}
        {renderOutputHandles()}
      </div>
    );
  };
};

export default withNode;