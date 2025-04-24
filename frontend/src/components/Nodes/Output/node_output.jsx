import withNode from '../withNode';

// 使用高阶组件创建Output节点，只有输入连接点
export const NetworkOutputNode = withNode({
  n_inputs: 1,
  n_outputs: 0
});