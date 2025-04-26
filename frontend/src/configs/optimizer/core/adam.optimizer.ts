import { OPTIMIZER_TYPE } from '@optimizer-configs';
import type { BaseOptimizerConfig } from '@optimizer-configs';

const ADAM_META: BaseOptimizerConfig<typeof OPTIMIZER_TYPE.ADAM> = {
  type: OPTIMIZER_TYPE.ADAM,
  label: 'Adam',
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
      name: 'betas',
      label: 'Betas',
      type: 'number_array',
      defaultValue: [0.9, 0.999],
      min: [0, 0],
      max: [1, 1],
      step: [0.01, 0.001]
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
      name: 'amsgrad',
      label: 'AMSGrad',
      type: 'boolean',
      defaultValue: false
    }
  ]
};

export default ADAM_META;