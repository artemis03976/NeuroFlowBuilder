// import Icon from './icon.svg';
import withNode from '../withNode';

// 使用高阶组件创建Conv2D节点
export const Conv2DNode = withNode({
	n_inputs: 1,
	n_outputs: 1
});