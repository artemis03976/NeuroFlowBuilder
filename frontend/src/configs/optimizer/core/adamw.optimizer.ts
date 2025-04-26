import { OPTIMIZER_TYPE } from '@optimizer-configs';
import type { BaseOptimizerConfig } from '@optimizer-configs';

const ADAMW_META: BaseOptimizerConfig<typeof OPTIMIZER_TYPE.ADAMW> = {
  type: OPTIMIZER_TYPE.ADAMW,
  label: 'AdamW',
  params: [
    {
      name: 'lr',
      label: '学习率',
      type: 'number',
      defaultValue: 0.001,
      min: 0.00001,
      step: 0.0001
    },
    {
      name: 'weight_decay',
      label: '权重衰减',
      type: 'number',
      defaultValue: 0.01,
      min: 0,
      max: 1,
      step: 0.001
    },
    {
      name: 'amsgrad',
      label: '使用AMSGrad',
      type: 'boolean',
      defaultValue: false
    }
  ]
};

export default ADAMW_META;