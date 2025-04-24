import withNode from '../withNode';

// 使用高阶组件创建ShapeOps节点
export const ShapeOpsNode = withNode({
  n_inputs: 1,
  n_outputs: 1,
  getLabel: (data) => {
    return typeof data.label === 'function' 
      ? data.label(data) 
      : data.label;
  }
});