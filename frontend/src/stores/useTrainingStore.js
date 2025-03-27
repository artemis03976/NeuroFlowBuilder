import { create } from 'zustand';
import { createAsyncAction, createTaskManager } from '@/stores/async';
import { trainAPI } from "@/api/train";


const processTrainingConfig = (config) => {
  return {
    model_id: config.modelId,
    epochs: parseInt(config.epochs),
    batch_size: parseInt(config.batch_size),
    optimizer: {
      type: config.optimizer,
      params: Object.fromEntries(
        Object.entries(config.optimizer_params).map(([key, value]) => [key, parseFloat(value)])
      )
    },
    dataset: {
      type: config.dataset_type,
      ...(config.dataset_type === 'custom' && { path: config.dataset_path })
    },
    scheduler: config.scheduler,
    use_amp: config.use_amp,
    early_stopping: config.early_stopping,
  }
}

export const useTrainingStore = create((set, get) => ({
  ...createTaskManager('Training')(set, get),
  ...createAsyncAction('training', trainAPI.startTraining)(set, get),

  onStartTraining: async (trainingConfig) => {
    const processedConfig = processTrainingConfig(trainingConfig);
    try {
      // Submit training request
      const { task_id } = await get().onTraining(processedConfig);

      // Add task to state management
      get().addTrainingTask({
        id: task_id,
        config: processedConfig,
      });

      // Start poll to get task progress
      get().pollTrainingTask(task_id, async (id) => {
        const response = await trainAPI.getTaskStatus(id);
        
        get().updateTrainingTask(id, {
          status: response.status,
          progress: response.progress * 100
        });

        // Decide whether to continue polling based on API reponse
        return response.status === 'running';
      });

    } catch (error) {
      get().updateTrainingTask(task_id, { 
        status: 'failed',
        error: error.message,
        endTime: new Date().toISOString()
      });
      throw error;
    }
  },
}));