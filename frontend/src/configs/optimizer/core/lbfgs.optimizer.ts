import { OPTIMIZER_TYPE } from '@optimizer-configs';
import type { BaseOptimizerConfig } from '@optimizer-configs';

const LBFGS_META: BaseOptimizerConfig<typeof OPTIMIZER_TYPE.LBFGS> = {
  type: OPTIMIZER_TYPE.LBFGS,
  label: 'LBFGS',
  params: [
    {
      name: 'lr',
      label: '学习率',
      type: 'number',
      defaultValue: 1,
      min: 0.00001,
      step: 0.1
    },
    {
      name: 'max_iter',
      label: '最大迭代次数',
      type: 'number',
      defaultValue: 20,
      min: 1,
      step: 1
    },
    {
      name: 'history_size',
      label: '历史大小',
      type: 'number',
      defaultValue: 100,
      min: 1,
      step: 1
    }
  ]
};

export default LBFGS_META;