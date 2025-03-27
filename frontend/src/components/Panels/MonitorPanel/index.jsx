import React, { memo } from 'react';
import { useTrainingStore } from '@/stores/useTrainingStore';
import { trainAPI } from "@/api/train";

import './MonitorPanel.css'

const MonitorPanel = memo(() => {
  const { tasks, stopTrainingTask, removeTrainingTask } = useTrainingStore();

  return (
    <div className="monitor-panel">
      <h3>Training Task Monitor</h3>
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className={`task-item ${task.status}`}>
            <div className="task-header">
              <span>Task ID: {task.id.slice(0,8)}</span>
              <span className="status ${task.status}">
                {{
                    running: 'running',
                    pending: 'pending',
                    completed: 'completed',
                    stopped: 'stopped'
                  }[task.status]}
              </span>
            </div>

            <div className="progress-bar">
              <div className="progress-labels">
                  <span>Progress {Math.round(task.progress)}%</span>
              </div>
              <div
                className="progress-fill"
                style={{ width: `${task.progress}%` }}
              />
            </div>

            <div className="task-meta">
              <div className="meta-item">
                <span className="meta-label">Start at:</span>
                <time>{new Date(task.startTime).toLocaleTimeString()}</time>
              </div>
              {task.endTime && <div className="meta-item">
                <span className="meta-label">End at:</span> 
                <time>{new Date(task.endTime).toLocaleTimeString()}</time>
              </div>}
            </div>

            <div className="task-actions">
              {['running', 'pending'].includes(task.status) && (
                <button 
                  className="stop-btn"
                  onClick={() => stopTrainingTask(task.id, trainAPI.stopTraining)}
                >
                  Stop
                </button>
              )}
              <button
                className="remove-btn"
                onClick={() => removeTrainingTask(task.id, trainAPI.stopTraining)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default MonitorPanel;