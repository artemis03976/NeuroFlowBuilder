import { OPTIMIZER_TYPE } from '@optimizer-configs';
import type { BaseOptimizerConfig } from '@optimizer-configs';

const RPROP_META: BaseOptimizerConfig<typeof OPTIMIZER_TYPE.RPROP> = {
  type: OPTIMIZER_TYPE.RPROP,
  label: 'Rprop',
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
      name: 'etas',
      label: '步长调整因子',
      type: 'number',
      defaultValue: 0.5,
      min: 0,
      max: 2,
      step: 0.1
    },
    {
      name: 'step_sizes',
      label: '步长范围',
      type: 'number',
      defaultValue: 1e-6,
      min: 1e-10,
      step: 1e-7
    }
  ]
};

export default RPROP_META;