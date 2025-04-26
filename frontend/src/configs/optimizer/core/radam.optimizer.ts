import { OPTIMIZER_TYPE } from '@optimizer-configs';
import type { BaseOptimizerConfig } from '@optimizer-configs';

const RADAM_META: BaseOptimizerConfig<typeof OPTIMIZER_TYPE.RADAM> = {
  type: OPTIMIZER_TYPE.RADAM,
  label: 'RAdam',
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
      defaultValue: 0,
      min: 0,
      max: 1,
      step: 0.001
    }
  ]
};

export default RADAM_META;