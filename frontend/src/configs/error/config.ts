import { ERROR_TYPE, BaseErrorConfig, ErrorMeta } from './types';
import { createRegistry } from '@/configs/configRegistry';

// Create a error config registry
const {
  registry: errorRegistry,
  registerConfig: registerErrorConfig,
  importConfigs: importErrorConfigs,
  getConfigMeta: getErrorMeta
} = createRegistry<ERROR_TYPE, BaseErrorConfig<any, any>, ErrorMeta>();

// Auto-import error configs
const errorModules = import.meta.glob('./core/**/*.error.ts', { eager: true });
importErrorConfigs(errorModules);

export {
  errorRegistry,
  registerErrorConfig,
};

export const ERROR_META = getErrorMeta();