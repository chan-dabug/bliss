import React from 'react';
import { TaskbarItem } from '../types';
import './Taskbar.css';

interface TaskbarProps {
  openWindows: TaskbarItem[];
  onStartClick: () => void;
  onWindowClick: (id: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ openWindows, onStartClick, onWindowClick }) => {
  return (
    <div className="taskbar">
      {/* Start Button */}
      <div className="start-button" onClick={onStartClick}>
        <div className="start-button-logo">
          <div className="windows-logo">
            <div className="window-pane pane-1"></div>
            <div className="window-pane pane-2"></div>
            <div className="window-pane pane-3"></div>
            <div className="window-pane pane-4"></div>
          </div>
        </div>
        <span className="start-text">Start</span>
      </div>

      {/* Quick Launch Icons */}
      <div className="quick-launch">
        <div className="quick-launch-icon" title="Internet Explorer">
          <div className="ie-icon">e</div>
        </div>
        <div className="quick-launch-icon" title="Windows Explorer">
          <div className="explorer-icon">📁</div>
        </div>
        <div className="quick-launch-icon" title="Outlook Express">
          <div className="outlook-icon">✉</div>
        </div>
      </div>

      {/* Open Windows */}
      <div className="open-windows">
        {openWindows.map((window) => (
          <div
            key={window.id}
            className={`taskbar-window ${window.isActive ? 'active' : ''} ${window.isMinimized ? 'minimized' : ''}`}
            onClick={() => onWindowClick(window.id)}
          >
            {window.title}
          </div>
        ))}
      </div>

      {/* System Tray */}
      <div className="system-tray">
        <div className="tray-icon" title="Show hidden icons">
          <div className="arrow-up">▲</div>
        </div>
        <div className="tray-icon" title="Volume">
          <div className="speaker-icon">🔊</div>
        </div>
        <div className="tray-icon" title="Network">
          <div className="network-icon">🌐</div>
        </div>
        <div className="tray-icon" title="Security">
          <div className="security-icon">🛡</div>
        </div>
        <div className="clock">
          {new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          })}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
