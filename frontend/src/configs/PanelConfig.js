// Panel default settings
export const PANEL_DEFAULT = {
  DEFAULT_WIDTH: 300,
  MIN_WIDTH: 200,
  MAX_WIDTH: 800,
}

// Panel type enums
export const PANEL_TYPE = {
  NODE: 'node-library',
  VALIDATION: 'validation',
  IMPORT: 'import',
  EXPORT: 'export',
  TRAINING: 'training',
  INFERENCE: 'inference',
  MONITOR: 'monitor',
}

// Panel Meta Config
export const PANEL_META = {
  [PANEL_TYPE.NODE]: {
    label: 'Node',
    component: 'NodePanel',
    hotkey: 'Ctrl+1'
  },
  [PANEL_TYPE.VALIDATION]: {
    label: 'Validation',
    component: 'ValidationPanel',
    hotkey: 'Ctrl+2'
  },
  [PANEL_TYPE.IMPORT]: {
    label: 'Import',
    component: 'ImportPanel',
    hotkey: 'Ctrl+3'
  },
  [PANEL_TYPE.EXPORT]: {
    label: 'Export',
    component: 'ExportPanel',
    hotkey: 'Ctrl+4'
  },
  [PANEL_TYPE.TRAINING]: {
    label: 'Train',
    component: 'TrainingPanel',
    hotkey: 'Ctrl+5'
  },
  [PANEL_TYPE.INFERENCE]: {
    label: 'Inference',
    component: 'InferencePanel',
    hotkey: 'Ctrl+6'
  },
  [PANEL_TYPE.MONITOR]: {
    label: 'Monitor',
    component: 'MonitorPanel',
    hotkey: 'Ctrl+7'
  }
}   
