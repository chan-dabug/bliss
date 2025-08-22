import React from 'react';
import './StartMenu.css';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="start-menu-overlay" onClick={onClose}>
      <div className="start-menu" onClick={(e) => e.stopPropagation()}>
        <div className="start-menu-header">
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <div className="user-name">Chan Boswell</div>
          </div>
        </div>
        
        <div className="start-menu-content">
          <div className="menu-section">
            <div className="menu-item">
              <span className="menu-icon">📁</span>
              <span className="menu-text">My Documents</span>
            </div>
            <div className="menu-item">
              <span className="menu-icon">🖥️</span>
              <span className="menu-text">My Computer</span>
            </div>
            <div className="menu-item">
              <span className="menu-icon">🎵</span>
              <span className="menu-text">Music</span>
            </div>
            <div className="menu-item">
              <span className="menu-icon">🖼️</span>
              <span className="menu-text">Pictures</span>
            </div>
          </div>
          
          <div className="menu-section">
            <div className="menu-item">
              <span className="menu-icon">🌐</span>
              <span className="menu-text">Internet Explorer</span>
            </div>
            <div className="menu-item">
              <span className="menu-icon">📧</span>
              <span className="menu-text">Outlook Express</span>
            </div>
          </div>
          
          <div className="menu-section">
            <div className="menu-item">
              <span className="menu-icon">⚙️</span>
              <span className="menu-text">Control Panel</span>
            </div>
            <div className="menu-item">
              <span className="menu-icon">🔍</span>
              <span className="menu-text">Search</span>
            </div>
            <div className="menu-item">
              <span className="menu-icon">❓</span>
              <span className="menu-text">Help and Support</span>
            </div>
          </div>
        </div>
        
        <div className="start-menu-footer">
          <div className="menu-item">
            <span className="menu-icon">🚪</span>
            <span className="menu-text">Log Off</span>
          </div>
          <div className="menu-item">
            <span className="menu-icon">⏹️</span>
            <span className="menu-text">Turn Off Computer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
