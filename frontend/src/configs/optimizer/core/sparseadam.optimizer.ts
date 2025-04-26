import { OPTIMIZER_TYPE } from '@optimizer-configs';
import type { BaseOptimizerConfig } from '@optimizer-configs';

const SPARSEADAM_META: BaseOptimizerConfig<typeof OPTIMIZER_TYPE.SPARSEADAM> = {
  type: OPTIMIZER_TYPE.SPARSEADAM,
  label: 'SparseAdam',
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
      name: 'eps',
      label: '数值稳定性项',
      type: 'number',
      defaultValue: 1e-8,
      min: 1e-10,
      step: 1e-9
    }
  ]
};

export default SPARSEADAM_META;