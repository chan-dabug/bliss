import React, { useState, useRef, useEffect } from 'react';
import './OtherProjectsModal.css';

interface OtherProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}

const OtherProjectsModal: React.FC<OtherProjectsModalProps> = ({ 
  isOpen, 
  onClose, 
  onMinimize, 
  onMaximize 
}) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 600, height: 450 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeDirection, setResizeDirection] = useState<string>('');
  
  const modalRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, direction: string = '') => {
    e.preventDefault();
    
    if (direction) {
      // Resizing
      setIsResizing(true);
      setResizeDirection(direction);
    } else {
      // Dragging
      setIsDragging(true);
      const rect = modalRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Constrain to viewport
      const maxX = window.innerWidth - size.width;
      const maxY = window.innerHeight - size.height;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    } else if (isResizing) {
      const rect = modalRef.current?.getBoundingClientRect();
      if (rect) {
        let newWidth = size.width;
        let newHeight = size.height;
        let newX = position.x;
        let newY = position.y;

        if (resizeDirection.includes('e')) {
          newWidth = Math.max(400, e.clientX - rect.left);
        }
        if (resizeDirection.includes('w')) {
          const deltaX = rect.right - e.clientX;
          newWidth = Math.max(400, size.width + deltaX);
          newX = e.clientX;
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(300, e.clientY - rect.top);
        }
        if (resizeDirection.includes('n')) {
          const deltaY = rect.bottom - e.clientY;
          newHeight = Math.max(300, size.height + deltaY);
          newY = e.clientY;
        }

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection('');
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, position, size, dragOffset, resizeDirection]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div 
        ref={modalRef}
        className="modal-window"
        style={{
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
        }}
      >
        {/* Title Bar */}
        <div 
          ref={titleBarRef}
          className="modal-title-bar"
          onMouseDown={(e) => handleMouseDown(e)}
        >
          <div className="title-bar-left">
            <div className="modal-icon">📁</div>
            <span className="modal-title">Other Projects - Windows Explorer</span>
          </div>
          <div className="title-bar-right">
            <button className="title-bar-button minimize" onClick={onMinimize}>
              <span>─</span>
            </button>
            <button className="title-bar-button maximize" onClick={onMaximize}>
              <span>⬜</span>
            </button>
            <button className="title-bar-button close" onClick={onClose}>
              <span>✕</span>
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="modal-menu-bar">
          <div className="menu-item">Here are some other things I've been working on! Notice a bug 🐛? <a href="https://google.com" target="_blank" rel="noopener noreferrer">File a ticket</a></div>
        </div>

        {/* Address Bar */}
        <div className="modal-address-bar">
          <span className="address-label">Address</span>
          <div className="address-input">
            <span className="address-text">Other Projects</span>
          </div>
          <button className="go-button">Go</button>
        </div>

        {/* Content Area */}
        <div className="modal-content">
          <div className="projects-grid">
            <div className="project-item">
              <div className="project-icon">🌐</div>
              <div className="project-name">Portfolio Website</div>
              <div className="project-desc">React + TypeScript portfolio</div>
            </div>
            <div className="project-item">
              <div className="project-icon">🎮</div>
              <div className="project-name">Game Development</div>
              <div className="project-desc">Unity & C# projects</div>
            </div>
            <div className="project-item">
              <div className="project-icon">📱</div>
              <div className="project-name">Mobile Apps</div>
              <div className="project-desc">React Native & Flutter</div>
            </div>
            <div className="project-item">
              <div className="project-icon">🤖</div>
              <div className="project-name">AI/ML Projects</div>
              <div className="project-desc">Python & TensorFlow</div>
            </div>
            <div className="project-item">
              <div className="project-icon">💾</div>
              <div className="project-name">Backend Systems</div>
              <div className="project-desc">Node.js & Databases</div>
            </div>
            <div className="project-item">
              <div className="project-icon">🎨</div>
              <div className="project-name">UI/UX Design</div>
              <div className="project-desc">Figma & Prototyping</div>
            </div>
          </div>
        </div>

        {/* Resize Handles */}
        <div className="resize-handle n" onMouseDown={(e) => handleMouseDown(e, 'n')}></div>
        <div className="resize-handle s" onMouseDown={(e) => handleMouseDown(e, 's')}></div>
        <div className="resize-handle e" onMouseDown={(e) => handleMouseDown(e, 'e')}></div>
        <div className="resize-handle w" onMouseDown={(e) => handleMouseDown(e, 'w')}></div>
        <div className="resize-handle nw" onMouseDown={(e) => handleMouseDown(e, 'nw')}></div>
        <div className="resize-handle ne" onMouseDown={(e) => handleMouseDown(e, 'ne')}></div>
        <div className="resize-handle sw" onMouseDown={(e) => handleMouseDown(e, 'sw')}></div>
        <div className="resize-handle se" onMouseDown={(e) => handleMouseDown(e, 'se')}></div>
      </div>
    </div>
  );
};

export default OtherProjectsModal;
