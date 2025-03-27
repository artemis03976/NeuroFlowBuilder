import { mainAPIClient } from '@/api/base';


export const trainAPI = {
  // Start training
  startTraining: (config) => 
    mainAPIClient.post('/train/start', config),
  
  // Get task status
  getTaskStatus: (taskId) => 
    mainAPIClient.get(`/train/status/${taskId}`),

  // stop training
  stopTraining: (taskId) => 
    mainAPIClient.post(`/train/stop/${taskId}`),
};