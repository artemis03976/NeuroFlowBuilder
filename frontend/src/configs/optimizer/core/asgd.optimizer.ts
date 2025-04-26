import { OPTIMIZER_TYPE } from '@optimizer-configs';
import type { BaseOptimizerConfig } from '@optimizer-configs';

const ASGD_META: BaseOptimizerConfig<typeof OPTIMIZER_TYPE.ASGD> = {
  type: OPTIMIZER_TYPE.ASGD,
  label: 'ASGD',
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
      name: 'lambd',
      label: '衰减项',
      type: 'number',
      defaultValue: 0.0001,
      min: 0,
      step: 0.0001
    },
    {
      name: 'alpha',
      label: '幂平均衰减',
      type: 'number',
      defaultValue: 0.75,
      min: 0,
      max: 1,
      step: 0.01
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

export default ASGD_META;