import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PANEL_DEFAULT, PANEL_TYPE } from '@/configs/PanelConfig';


export const usePanelStore = create(persist((set) => ({
  // Default Panel
  activePanel: PANEL_TYPE.NODE,
  // Default width
  panelWidth: PANEL_DEFAULT.DEFAULT_WIDTH,
  // Default
  isCollapsed: false,

  // Set active panel
  setActivePanel: (panelName) => set({
    activePanel: panelName,
    isCollapsed: false
  }),

  // Set panel width
  setPanelWidth: (width) => set({ panelWidth: width }),

  // Set panel collapse
  toggleCollapsed: () => set(state => ({
    isCollapsed: !state.isCollapsed,
  })),
}), {
  name: 'panel-storage',
  partialize: (state) => ({
    activePanel: state.activePanel,
    panelWidth: state.panelWidth,
    isCollapsed: state.isCollapsed
  })
}));