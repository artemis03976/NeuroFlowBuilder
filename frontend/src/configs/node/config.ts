import { NODE_TYPE, type BaseNodeConfig, type NodeMeta } from './types';
import { createRegistry } from '../configRegistry';

// Create a node config registry
const {
  registry: nodeRegistry,
  registerConfig: registerNodeConfig,
  importConfigs: importNodeConfigs,
  getConfigMeta: getNodeMeta
} = createRegistry<NODE_TYPE, BaseNodeConfig<any, any>, NodeMeta>();

// Auto-import node configs
const nodeModules = import.meta.glob('./core/**/*.node.ts', { eager: true });
importNodeConfigs(nodeModules);

export {
  nodeRegistry,
  registerNodeConfig
};

export const NODE_META = getNodeMeta();