import withNode from '../withNode';

// 使用高阶组件创建MergeOps节点
export const MergeOpsNode = withNode({
  n_inputs: 2,  // 合并操作至少需要两个输入
  n_outputs: 1,
  dynamicInputs: true,  // 允许动态添加更多输入
  getLabel: (data) => {
    return typeof data.label === 'function' 
      ? data.label(data) 
      : data.label;
  }
});