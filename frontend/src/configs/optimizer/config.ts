import { OPTIMIZER_TYPE, type BaseOptimizerConfig, type OptimizerMeta } from './types';
import { createRegistry } from '../configRegistry';

// Create a optimizer config registry
const {
  registry: optimizerRegistry,
  registerConfig: registerOptimizerConfig,
  importConfigs: importOptimizerConfigs,
  getConfigMeta: getOptimizerMeta
} = createRegistry<OPTIMIZER_TYPE, BaseOptimizerConfig<any>, OptimizerMeta>();

// Auto-import node configs
const optimizerModules = import.meta.glob('./core/**/*.optimizer.ts', { eager: true });
importOptimizerConfigs(optimizerModules);

export {
  optimizerRegistry,
  registerOptimizerConfig
};

export const OPTIMIZER_META = getOptimizerMeta();