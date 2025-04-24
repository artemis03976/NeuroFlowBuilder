// 错误级别枚举
export enum ERROR_LEVEL {
  INFO = 1,
  WARNING = 2,
  ERROR = 3
}
  
// 错误类型枚举
export enum ERROR_TYPE {
  DIMENSION = 'dimension',
  CONNECTION = 'connection',
  PARAMETER = 'parameter',
  SYSTEM = 'system'
}
  
// 错误上下文接口
export interface ErrorContext {
  [key: string]: any;
}
  
// 错误配置接口
export interface BaseErrorConfig<T extends ERROR_TYPE, L extends ERROR_LEVEL> {
  type: T;
  title: string;
  defaultLevel: L;
  description: string;
}
  
// 错误实例接口
export interface ErrorInstance {
  id: string;
  type: ERROR_TYPE;
  message: string;
  level: ERROR_LEVEL;
  timestamp: number;
  context?: ErrorContext;
}

// 错误元数据类型
export type ErrorMeta = {
  [Type in ERROR_TYPE]: BaseErrorConfig<Type, ERROR_LEVEL>;
};
