// Hight-level Asynchronous Template
export const createAsyncAction = (name, asyncFn) => (set, get) => ({
  [`${name}Status`]: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed' | 'cancelled'
  [`${name}Data`]: null,
  [`${name}Error`]: null,
  [`${name}Abort`]: null,

  // Execute asycn action
  [`on${name.charAt(0).toUpperCase() + name.slice(1)}`]: async (params) => {
    const abortController = new AbortController();
    try {
      set({ 
        [`${name}Status`]: 'pending',
        [`${name}Abort`]: abortController 
      });
      
      const data = await asyncFn(params, abortController.signal);
      
      set({ 
        [`${name}Status`]: 'succeeded', 
        [`${name}Data`]: data 
      });

      return data;
    } catch (error) {
      if (error.name !== 'AbortError') {
        set({ 
          [`${name}Status`]: 'failed', 
          [`${name}Error`]: error.message 
        });
      }
      throw error;
    } finally {
      set({ [`${name}Abort`]: null });
    }
  },

  // Cancel action
  [`cancel${name.charAt(0).toUpperCase() + name.slice(1)}`]: () => {
    get()[`${name}Abort`]?.abort();
    set({ [`${name}Status`]: 'cancelled' });
  }
});

// Backend task management template
export const createTaskManager = (name) => (set, get) => ({
  tasks: [],
  activeTaskId: null,

  // add new task
  [`add${name}Task`]: (task) => set(state => ({
    tasks: [...state.tasks, {
      ...task,
      status: 'pending',
      progress: 0,
      startTime: new Date().toISOString(),
      endTime: null,
      error: null
    }],
    activeTaskId: task.id
  })),

  // Remove task
  [`remove${name}Task`]: (taskId, stopFn) => set(state => ({
    tasks: state.tasks.filter(task => {
      if (task.id === taskId && ['running', 'pending'].includes(task.status)) {
        // Stop first
        get()[`stop${name}Task`](taskId, stopFn); 
      }
      return task.id !== taskId;
    })
  })),

  // Update task status 
  [`update${name}Task`]: (taskId, updates) => set(state => ({
    tasks: state.tasks.map(task => {
      if (task.id !== taskId) return task;
      
      // 自动处理时间字段
      const finalUpdates = { ...updates };
      if (updates.status === 'completed') {
        finalUpdates.endTime = new Date().toISOString();
      }
      if (updates.progress !== undefined) {
        finalUpdates.progress = Math.min(100, Math.max(0, updates.progress));
      }
      
      return { ...task, ...finalUpdates };
    })
  })),

  // Stop task
  [`stop${name}Task`]: async (taskId, stopFn) => {
    try {
      await stopFn(taskId);
      get()[`update${name}Task`](taskId, {
        status: 'stopping',
        endTime: new Date().toISOString()
      });
    } catch (error) {
      console.log(error.message)
      get()[`update${name}Task`](taskId, {
        status: 'error',
        error: error.message,
        endTime: new Date().toISOString()
      });
    }
  },

  // Auto poll template
  [`poll${name}Task`]: async (taskId, checkFn, interval = 3000) => {
    const poll = async () => {
      try {
        const shouldContinue = await checkFn(taskId);
        if (!shouldContinue) {
          get()[`update${name}Task`](taskId, { 
            status: 'completed',
            progress: 100 
          });
        } else {
          setTimeout(poll, interval);
        }
      } catch (error) {
        get()[`update${name}Task`](taskId, {
          status: 'failed',
          error: error.message,
          endTime: new Date().toISOString()
        });
      }
    };
    poll();
  },
});
