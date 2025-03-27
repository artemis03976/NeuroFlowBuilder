import { NODE_TYPES, type BaseNodeConfig, type NodeMeta } from './types';

// Type-safe registry
const nodeRegistry = new Map<NODE_TYPES, BaseNodeConfig<any, any>>();

// General register method
export function registerNodeConfig<T extends NODE_TYPES>(config: BaseNodeConfig<T, any>) {
  if (nodeRegistry.has(config.type)) {
    throw new Error(`Duplicate node type registered: ${config.type}`);
  }
  nodeRegistry.set(config.type, config);
}

// Auto-import
const moduleMap = import.meta.glob('./core/**/*.node.ts', { eager: true });
Object.values(moduleMap).forEach(module => {
  const config = (module as { default?: BaseNodeConfig<any, any> }).default;
  if (config?.type) {
    registerNodeConfig(config);
  }
});

// Type-safe transfer
export const NODE_META = Object.fromEntries(
  Array.from(nodeRegistry.entries())
) as NodeMeta;