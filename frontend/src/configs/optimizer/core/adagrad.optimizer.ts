import { OPTIMIZER_TYPE } from '@optimizer-configs';
import type { BaseOptimizerConfig } from '@optimizer-configs';

const ADAGRAD_META: BaseOptimizerConfig<typeof OPTIMIZER_TYPE.ADAGRAD> = {
  type: OPTIMIZER_TYPE.ADAGRAD,
  label: 'Adagrad',
  params: [
    {
      name: 'lr',
      label: '学习率',
      type: 'number',
      defaultValue: 0.01,
      min: 0.00001,
      step: 0.001
    },
    {
      name: 'lr_decay',
      label: '学习率衰减',
      type: 'number',
      defaultValue: 0,
      min: 0,
      step: 0.001
    },
    {
      name: 'weight_decay',
      label: '权重衰减',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 1,
      step: 0.001
    },
    {
      name: 'eps',
      label: '数值稳定性项',
      type: 'number',
      defaultValue: 1e-10,
      min: 1e-15,
      step: 1e-11
    }
  ]
};

export default ADAGRAD_META;