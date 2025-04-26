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
      name: 'weight_decay',
      label: 'Weight Decay',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 1,
      step: 0.001
    }
  ]
};

export default ADAM_META;