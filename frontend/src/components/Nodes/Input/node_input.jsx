import withNode from '../withNode';

// 使用高阶组件创建Input节点，只有输出连接点
export const NetworkInputNode = withNode({
  n_inputs: 0,
  n_outputs: 1
});