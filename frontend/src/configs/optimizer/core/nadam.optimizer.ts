import { OPTIMIZER_TYPE } from '@optimizer-configs';
import type { BaseOptimizerConfig } from '@optimizer-configs';

const NADAM_META: BaseOptimizerConfig<typeof OPTIMIZER_TYPE.NADAM> = {
  type: OPTIMIZER_TYPE.NADAM,
  label: 'NAdam',
  params: [
    {
      name: 'lr',
      label: '学习率',
      type: 'number',
      defaultValue: 0.002,
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
    },
    {
      name: 'momentum_decay',
      label: '动量衰减',
      type: 'number',
      defaultValue: 0.004,
      min: 0,
      max: 1,
      step: 0.001
    }
  ]
};

export default NADAM_META;