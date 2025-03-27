import { usePanelStore } from '@/stores/usePanelStore';
import { PANEL_META } from '@/configs/PanelConfig';

import './ToolBar.css';


export const ToolBar = () => {
  const { activePanel, setActivePanel, isCollapsed, toggleCollapsed } = usePanelStore();

  const handleClick = (id) => {
    if (id === activePanel) {
      toggleCollapsed();
    } else {
      setActivePanel(id);
    }
  };

  return (
    <div className="toolbar-container">
      {Object.entries(PANEL_META).map(([id, { label }]) => (
        <button
          key={id}
          className={`toolbar-btn ${activePanel === id && !isCollapsed ? 'active' : ''}`}
          onClick={() => handleClick(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};