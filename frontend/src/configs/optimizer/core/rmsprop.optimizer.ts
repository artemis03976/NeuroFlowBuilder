import { OPTIMIZER_TYPE } from '@optimizer-configs';
import type { BaseOptimizerConfig } from '@optimizer-configs';

const RMSPROP_META: BaseOptimizerConfig<typeof OPTIMIZER_TYPE.RMSPROP> = {
  type: OPTIMIZER_TYPE.RMSPROP,
  label: 'RMSprop',
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
      name: 'alpha',
      label: 'Alpha',
      type: 'number',
      defaultValue: 0.99,
      min: 0,
      max: 1,
      step: 0.01
    },
    {
      name: 'eps',
      label: 'Epsilon',
      type: 'number',
      defaultValue: 1e-8,
      min: 1e-10,
      max: 1e-5,
      step: 1e-9
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
      name: 'momentum',
      label: 'Momentum',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 1,
      step: 0.01
    },
    {
      name: 'centered',
      label: 'Centered',
      type: 'boolean',
      defaultValue: false
    }
  ]
};

export default RMSPROP_META;