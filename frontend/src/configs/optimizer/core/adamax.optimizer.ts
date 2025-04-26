import { OPTIMIZER_TYPE } from '@optimizer-configs';
import type { BaseOptimizerConfig } from '@optimizer-configs';

const ADAMAX_META: BaseOptimizerConfig<typeof OPTIMIZER_TYPE.ADAMAX> = {
  type: OPTIMIZER_TYPE.ADAMAX,
  label: 'Adamax',
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
      name: 'eps',
      label: '数值稳定性项',
      type: 'number',
      defaultValue: 1e-8,
      min: 1e-10,
      step: 1e-9
    }
  ]
};

export default ADAMAX_META;