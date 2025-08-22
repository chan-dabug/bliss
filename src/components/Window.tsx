import React, { useState } from 'react';
import { WindowState } from '../types';
import { COLORS, MENU_ITEMS, TOOLBAR_BUTTONS } from '../constants';
import './Window.css';

interface WindowProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (width: number, height: number) => void;
}

const Window: React.FC<WindowProps> = ({ 
  window, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onMove, 
  onResize 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - window.x,
        y: e.clientY - window.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      onMove(
        e.clientX - dragOffset.x,
        e.clientY - dragOffset.y
      );
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!window.isOpen) return null;

  return (
    <div
      className={`window ${window.isMaximized ? 'maximized' : ''}`}
      style={{
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height,
        zIndex: window.isMinimized ? 1 : 100,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Title Bar */}
      <div className="window-title-bar">
        <div className="title-bar-left">
          <div className="window-icon">📁</div>
          <span className="window-title">{window.title}</span>
        </div>
        <div className="title-bar-right">
          <button className="title-bar-button minimize" onClick={onMinimize}>
            <span>─</span>
          </button>
          <button className="title-bar-button maximize" onClick={onMaximize}>
            <span>{window.isMaximized ? '❐' : '⬜'}</span>
          </button>
          <button className="title-bar-button close" onClick={onClose}>
            <span>✕</span>
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="window-menu-bar">
        {Object.values(MENU_ITEMS).map((item) => (
          <div key={item} className="menu-item">
            {item}
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="window-toolbar">
        {Object.values(TOOLBAR_BUTTONS).map((button) => (
          <button key={button} className="toolbar-button">
            {button}
          </button>
        ))}
      </div>

      {/* Address Bar */}
      <div className="window-address-bar">
        <span className="address-label">Address</span>
        <div className="address-input">
          <span className="address-text">{window.title}</span>
        </div>
        <button className="go-button">Go</button>
      </div>

      {/* Content Area */}
      <div className="window-content">
        {window.content}
      </div>
    </div>
  );
};

export default Window;
