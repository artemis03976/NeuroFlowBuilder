import { exportNetwork } from '@/services/Exporter';
import { mainAPIClient } from '@/api/base';


export const buildAPI = {
  // Build Model
  buildModel: async (signal) => {
    return mainAPIClient.post('/build', exportNetwork(), {
      signal // abort signal
    });
  },

  // Get build status
  getBuildStatus: (buildId) => 
    mainAPIClient.get(`/build/status/${buildId}`),
  
  // Cancel build
  cancelBuild: (buildId) =>
    mainAPIClient.post(`/build/cancel/${buildId}`)
};
