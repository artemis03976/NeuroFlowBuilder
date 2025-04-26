import { OPTIMIZER_TYPE } from '@optimizer-configs';
import type { BaseOptimizerConfig } from '@optimizer-configs';

const ADADELTA_META: BaseOptimizerConfig<typeof OPTIMIZER_TYPE.ADADELTA> = {
  type: OPTIMIZER_TYPE.ADADELTA,
  label: 'Adadelta',
  params: [
    {
      name: 'lr',
      label: '学习率',
      type: 'number',
      defaultValue: 1.0,
      min: 0.00001,
      step: 0.01
    },
    {
      name: 'rho',
      label: '移动平均系数',
      type: 'number',
      defaultValue: 0.9,
      min: 0,
      max: 1,
      step: 0.01
    },
    {
      name: 'eps',
      label: '数值稳定性项',
      type: 'number',
      defaultValue: 1e-6,
      min: 1e-10,
      step: 1e-7
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

export default ADADELTA_META;