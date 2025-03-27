import { create } from 'zustand';
import { ERROR_LEVELS } from '@/configs/ErrorConfig';


export const useErrorStore = create((set, get) => ({
  errors: new Map(),

  // General method for adding errors
  addError: (type, entityId, options = {}) => {
    const { 
      message = "", 
      level = ERROR_LEVELS.WARNING,
      context = null 
    } = typeof options === 'string' ? { message: options } : options;
    
    return set(state => {
      const newErrors = new Map(state.errors);
      newErrors.set(`${type}:${entityId}`, { 
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
    return Array.from(get().errors.entries())
      .filter(([key]) => key.startsWith(`${type}:`))
      .map(([key, value]) => ({
        id: key,
        type,
        ...value
      }));
  },

  // Filter errors by type
  getErrorsByLevel: (level) => {
    return Array.from(get().errors.entries())
      .filter(([, error]) => error.level >= level)
      .map(([key, value]) => ({
        id: key,
        type: key.split(':')[0],
        ...value
      }));
  },

  // Error handling middleware
  withErrorHandling: (fn) => async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      get().addError(ERROR_TYPES.SYSTEM, 'global', {
        message: error.message,
        level: ERROR_LEVELS.CRITICAL,
        context: { 
          stack: error.stack,
          arguments: args 
        }
      });
      throw error;
    }
  },
}));
