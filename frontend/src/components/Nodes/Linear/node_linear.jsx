// import Icon from './icon.svg';
import withNode from '@/components/Nodes/withNode';

// 使用高阶组件创建Linear节点
export const LinearNode = withNode({
	n_inputs: 1,
	n_outputs: 1
});
