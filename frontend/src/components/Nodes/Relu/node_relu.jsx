import withNode from '../withNode';

// 使用高阶组件创建ReLU节点
export const ReluNode = withNode({
	n_inputs: 1,
	n_outputs: 1
});