import { create } from 'zustand';
import { ERROR_TYPE, ERROR_LEVEL, ERROR_META } from '@error-configs'
import type { ErrorInstance, ErrorContext } from '@error-configs'

interface ErrorStore {
  errors: Map<string, ErrorInstance>;
  
  // 添加错误
  addError: (type: ERROR_TYPE, entityId: string, options?: string | {
    message?: string;
    level?: ERROR_LEVEL;
    context?: ErrorContext;
  }) => void;
  
  // 移除特定错误
  removeError: (type: ERROR_TYPE, entityId: string) => void;
  
  // 清除特定类型的所有错误
  clearType: (type: ERROR_TYPE) => void;
  
  // 清除所有错误
  clearAllErrors: () => void;
  
  // 获取特定类型的错误
  getErrorsByType: (type: ERROR_TYPE) => ErrorInstance[];
  
  // 按级别筛选错误
  getErrorsByLevel: (level: ERROR_LEVEL) => ErrorInstance[];
  
  // 错误处理中间件
  withErrorHandling: <T extends (...args: any[]) => Promise<any>>(fn: T) => (...args: Parameters<T>) => Promise<ReturnType<T>>;
}

export const useErrorStore = create<ErrorStore>((set, get) => ({
  // Store all errors
  errors: new Map<string, ErrorInstance>(),

  // General method for adding errors
  addError: (type, entityId, options = {}) => {
    const errorConfig = ERROR_META[type as keyof typeof ERROR_META];
    const defaultLevel = errorConfig?.defaultLevel || ERROR_LEVEL.WARNING;
    
    const { 
      message = "", 
      level = defaultLevel,
      context = undefined 
    } = typeof options === 'string' ? { message: options } : options;
    
    set(state => {
      const newErrors = new Map(state.errors);
      const errorId = `${type}:${entityId}`;
      
      newErrors.set(errorId, { 
        id: errorId,
        type,
        message,
        level,
        timestamp: Date.now(),
        context
      });
      
      return { errors: newErrors };
    });
  },

  // Remove Specific error
  removeError: (type, entityId) =>
    set(state => {
      const newErrors = new Map(state.errors);
      newErrors.delete(`${type}:${entityId}`);
      return { errors: newErrors };
    }),

  // Remove certain type of errors
  clearType: (type) =>
    set(state => {
      const newErrors = new Map(state.errors);
      Array.from(newErrors.keys())
        .filter(key => key.startsWith(`${type}:`))
        .forEach(key => newErrors.delete(key));
      return { errors: newErrors };
    }),

  // Remove all errors
  clearAllErrors: () => set({ errors: new Map() }),

  // Get certain type of errors
  getErrorsByType: (type) => {
    return Array.from(get().errors.values())
      .filter(error => error.type === type);
  },

  // Filter errors by type
  getErrorsByLevel: (level) => {
    return Array.from(get().errors.values())
      .filter(error => error.level >= level);
  },

  // Error handling middleware
  withErrorHandling: (fn) => async (...args) => {
    try {
      return await fn(...args);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;

      get().addError(ERROR_TYPE.SYSTEM, 'global', {
        message: errorMessage,
        level: ERROR_LEVEL.ERROR,
        context: { 
          stack: errorStack,
          arguments: args 
        }
      });
      throw error;
    }
  },
}));
