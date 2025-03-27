import { create } from 'zustand';

import { buildAPI } from "@/api/build";
import { createAsyncAction } from '@/stores/async';

export const useExportStore = create((set, get) => ({
  ...createAsyncAction('build', async (params, signal) => {
    const data = await buildAPI.buildModel(params, signal);
    // Update model ID
    if (data?.model_id) {
      set({ modelId: data.model_id });
    }
    return data;
  })(set, get),

  modelId: null,

  reset: () => set({
    buildStatus: 'idle',
    buildData: null,
    buildError: null,
    modelId: null
  })
}));
