import { OPTIMIZER_TYPE } from '@optimizer-configs';
import type { BaseOptimizerConfig } from '@optimizer-configs';

const ADAFACTOR_META: BaseOptimizerConfig<typeof OPTIMIZER_TYPE.ADAFACTOR> = {
  type: OPTIMIZER_TYPE.ADAFACTOR,
  label: 'Adafactor',
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
      name: 'decay_rate',
      label: '衰减率',
      type: 'number',
      defaultValue: -0.8,
      min: -1,
      max: 0,
      step: 0.1
    },
    {
      name: 'weight_decay',
      label: '权重衰减',
      type: 'number',
      defaultValue: 0.0,
      min: 0,
      max: 1,
      step: 0.001
    },
    {
      name: 'scale_parameter',
      label: '参数缩放',
      type: 'boolean',
      defaultValue: true
    },
    {
      name: 'relative_step',
      label: '相对步长',
      type: 'boolean',
      defaultValue: true
    }
  ]
};

export default ADAFACTOR_META;