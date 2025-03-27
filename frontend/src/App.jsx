import React from 'react';
import { ReactFlowProvider } from "@xyflow/react";

import { ToolBar } from "@/components/ToolBar";
import { NodeEditor } from '@/components/NodeEditor';
import { PanelContainer } from "@/components/Panels/PanelContainer";
import { SettingsPanel } from '@/components/SettingsPanel';

import '@xyflow/react/dist/style.css';
import './App.css';


export default function App() {
  return (
    <ReactFlowProvider>
      <div className="app-container">
        {/* 顶部工具栏 */}
        <ToolBar />

        {/* 主内容区域 */}
        <div className="main-content">

          {/* 画布区域 */}
          <NodeEditor />

          {/* 右侧面板区域 */}
          <PanelContainer />

          {/* 节点配置置面板区域 */}
          <SettingsPanel />
        </div>
      </div>
    </ReactFlowProvider>
  );
}
