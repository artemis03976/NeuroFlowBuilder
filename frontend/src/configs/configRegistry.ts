/**
 * General config registry tools
 * Unified management of registration, import and access of various configurations
 */

// General config interface
export interface BaseConfig<T extends string> {
  type: T;
  [key: string]: any;
}
  
// Create a config registry
export function createRegistry<
  T extends string,
  C extends BaseConfig<T>,
  M extends Record<T, C>
>() {
  // Config registry
  const registry = new Map<T, C>();

  // Register a config
  function registerConfig(config: C) {
    if (registry.has(config.type)) {
      throw new Error(`Duplicate config type registered: ${config.type}`);
    }
    registry.set(config.type, config);
  }

  // Auto-import configs
  async function importConfigs(moduleMap: Record<string, any>) {
    Object.values(moduleMap).forEach(module => {
      const config = (module as { default?: C }).default;
      if (config?.type) {
        registerConfig(config);
      }
    });
  }

  // Get config meta (all configs)
  function getConfigMeta(): M {
    return Object.fromEntries(
      Array.from(registry.entries())
    ) as unknown as M;
  }

  return {
    registry,
    registerConfig,
    importConfigs,
    getConfigMeta
  };
}