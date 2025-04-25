import { useErrorStore } from "@/stores/useErrorStore";
import { ERROR_TYPE, ERROR_LEVEL, ERROR_META } from "@error-configs";

import "./ValidationPanel.css";


const ErrorConfig = {
  [ERROR_TYPE.DIMENSION]: {
    ...ERROR_META[ERROR_TYPE.DIMENSION],
    format: (error) => `节点 ${error.id.split(':')[1]}: ${error.message}`
  },
  [ERROR_TYPE.CONNECTION]: {
    ...ERROR_META[ERROR_TYPE.CONNECTION],
    format: (error) => `连接 ${error.id.split(':')[1]}: ${error.message}`
  },
};

const ValidationPanel = () => {
  const { getErrorsByLevel } = useErrorStore();
  const errors = getErrorsByLevel(ERROR_LEVEL.INFO);

  return (
    <div className="compile-panel">
      <h3>Model Validatoin</h3>
      {Object.entries(ErrorConfig).map(([type, config]) => {
        const typeErrors = errors.filter(e => e.type === type);
        
        return typeErrors.length > 0 && (
          <div key={type} className={`error-category level-${typeErrors[0].level}`}>
            <h4>
              {config.title} 
              <span className="count-badge">{typeErrors.length}</span>
            </h4>
            {typeErrors.map(error => (
              <div key={error.id} className="error-item">
                <div className="error-timestamp">
                  {new Date(error.timestamp).toLocaleTimeString()}
                </div>
                {config.format(error)}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ValidationPanel;