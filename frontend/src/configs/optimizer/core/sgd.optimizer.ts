import { OPTIMIZER_TYPE } from '@optimizer-configs';
import type { BaseOptimizerConfig } from '@optimizer-configs';

const SGD_META: BaseOptimizerConfig<typeof OPTIMIZER_TYPE.SGD> = {
  type: OPTIMIZER_TYPE.SGD,
  label: 'SGD',
  params: [
    {
      name: 'lr',
      label: 'Learning rate',
      type: 'number',
      defaultValue: 0.001,
      min: 0.00001,
      step: 0.0001
    },
    {
      name: 'momentum',
      label: 'Momentum',
      type: 'number',
      defaultValue: 0.9,
      min: 0,
      max: 1,
      step: 0.01
    },
    {
      name: 'dampening',
      label: 'Dampening',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 1,
      step: 0.01
    },
    {
      name: 'weight_decay',
      label: 'Weight Decay',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 1,
      step: 0.001
    },
    {
      name: 'nesterov',
      label: 'Nesterov',
      type: 'boolean',
      defaultValue: false
    }
  ]
};

export default SGD_META;