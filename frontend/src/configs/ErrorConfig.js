// Error type enums
export const ERROR_TYPES = {
  // Dimension Error
  DIMENSION: 'DimensionErrors',
  // Connection Error
  CONNECTION: 'ConnectionErrors',
  // System Error
  SYSTEM: 'SystemErrors',
  // Validation Error
  VALIDATION: 'ValidationErrors'
};

// Error level
export const ERROR_LEVELS = {
  CRITICAL: 3,
  WARNING: 2,
  INFO: 1
};

// Error Meta Config
export const ERROR_META = {
  [ERROR_TYPES.DIMENSION]: {
    title: "维度错误",
    defaultLevel: ERROR_LEVELS.WARNING,
    description: "神经网络层之间的维度不匹配"
  },
  [ERROR_TYPES.CONNECTION]: {
    title: "连接错误",
    defaultLevel: ERROR_LEVELS.CRITICAL,
    description: "节点之间的连接不符合拓扑规则"
  },
  [ERROR_TYPES.SYSTEM]: {
    title: "系统错误",
    defaultLevel: ERROR_LEVELS.CRITICAL,
    description: "运行时发生的意外异常"
  },
  [ERROR_TYPES.VALIDATION]: {
    title: "验证错误",
    defaultLevel: ERROR_LEVELS.WARNING,
    description: "模型配置参数校验未通过"
  }
};