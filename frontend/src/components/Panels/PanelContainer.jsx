import React, { lazy, Suspense, memo } from "react";
import { Resizable } from 'react-resizable';
import { usePanelStore } from '@/stores/usePanelStore';
import { PANEL_DEFAULT, PANEL_META } from '@/configs/PanelConfig';

import "react-resizable/css/styles.css";
import "./Panel.css"

const loadComponent = (componentName) => {
  try {
    return lazy(() => import(/* @vite-ignore */`${componentName}`));
  } catch (error) {
    console.error(`Failed to load module ${componentName}:`, error);
    return null;
  }
};

// 动态加载面板组件
const PanelComponents = {
  NodePanel: loadComponent('./NodePanel'),
  ValidationPanel: loadComponent('./ValidationPanel'),
  ExportPanel: loadComponent('./ExportPanel'),
  // ImportPanel: loadComponent('./ImportPanel'),
  TrainingPanel: loadComponent('./TrainingPanel'),
  // InferencePanel: loadComponent('./InferencePanel'),
  MonitorPanel: loadComponent('./MonitorPanel'),
};


export const PanelContainer = memo(() => {
  const { activePanel, panelWidth, isCollapsed, setPanelWidth } = usePanelStore();
  const CurrentPanel = PanelComponents[PANEL_META[activePanel]?.component];

  const onResize = (event, { size }) => {
    setPanelWidth(size.width);
    document.querySelector('.panel-container-wrapper')?.classList.add('resizing');
  };

  const onResizeStop = () => {
    document.querySelector('.panel-container-wrapper')?.classList.remove('resizing');
  };

  return (
    <Resizable
      width={panelWidth}
      height={0} // Only horizontal
      minConstraints={[PANEL_DEFAULT.MIN_WIDTH, 0]}
      maxConstraints={[PANEL_DEFAULT.MAX_WIDTH, 0]}
      onResize={onResize}
      onResizeStop={onResizeStop}
      axis="x"
      resizeHandles={['w']}
      handle={
        <div className="panel-drag-handle" onClick={(e) => e.stopPropagation()}>
          <div className="drag-bar" />
        </div>
      }
    >
      <div
        className={`panel-container-wrapper ${isCollapsed ? 'collapsed' : ''}`}
        style={{width: isCollapsed ? 0 : panelWidth}}
      >
        <div
          className="panel-container"
          // Totally invisible when collapsed
          style={{visibility: isCollapsed ? 'hidden' : 'visible'}}
        >
          <Suspense fallback={<div className="loading-panel">Loading...</div>}>
            {CurrentPanel ? (
              <CurrentPanel />
            ) : (
              <div className="empty-panel">Select a Panel to continue...</div>
            )}
          </Suspense>
        </div>
      </div>
     </Resizable>
  );
});