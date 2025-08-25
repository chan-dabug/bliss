import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Window } from '../contexts/WindowManagerContext';

interface XpWindowProps {
  window: Window;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
}

const WindowContainer = styled.div<{ z: number }>`
  position: absolute;
  background: #F0F0F0;
  border: 2px solid #2b579a;
  border-radius: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-family: 'Tahoma', 'Segoe UI', 'Arial', sans-serif;
  width: 600px;
  height: 450px;
  overflow: hidden;
  cursor: default;
  z-index: ${props => props.z};
`;

const TitleBar = styled.div`
  background: linear-gradient(to bottom, #3f76c3 0%, #2b579a 100%);
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
  color: white;
  cursor: move;
  user-select: none;
`;

const TitleBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const WindowIcon = styled.div`
  font-size: 14px;
`;

const WindowTitle = styled.span`
  font-size: 12px;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
`;

const TitleBarRight = styled.div`
  display: flex;
  gap: 2px;
`;

const TitleBarButton = styled.button<{ variant?: 'close' }>`
  width: 20px;
  height: 18px;
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  border-radius: 2px;
  transition: background-color 0.1s ease;
  
  &:hover {
    background-color: ${props => props.variant === 'close' ? '#E81123' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const ContentArea = styled.div`
  background: white;
  flex: 1;
  padding: 20px;
  overflow: auto;
  height: calc(100% - 22px);
`;

const XpWindow: React.FC<XpWindowProps> = ({ 
  window, 
  onClose, 
  onMinimize, 
  onFocus 
}) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const windowRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    onFocus(); // Bring window to front when clicked
    
    if (e.target === titleBarRef.current || titleBarRef.current?.contains(e.target as Node)) {
      setIsDragging(true);
      const rect = windowRef.current?.getBoundingClientRect();
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
      
      // Constrain to viewport using global window object
      const maxX = globalThis.window.innerWidth - 400; // Minimum reasonable width
      const maxY = globalThis.window.innerHeight - 300; // Minimum reasonable height
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  if (window.minimized) return null;

  return (
    <WindowContainer 
      ref={windowRef}
      style={{
        left: position.x,
        top: position.y,
      }}
      z={window.z}
      onMouseDown={handleMouseDown}
    >
      {/* Title Bar */}
      <TitleBar ref={titleBarRef}>
        <TitleBarLeft>
          <WindowIcon>📁</WindowIcon>
          <WindowTitle>{window.title}</WindowTitle>
        </TitleBarLeft>
        <TitleBarRight>
          <TitleBarButton 
            onClick={onMinimize}
            aria-label="Minimize window"
          >
            <span>─</span>
          </TitleBarButton>
          <TitleBarButton aria-label="Maximize window">
            <span>⬜</span>
          </TitleBarButton>
          <TitleBarButton 
            variant="close"
            onClick={onClose}
            aria-label="Close window"
          >
            <span>✕</span>
          </TitleBarButton>
        </TitleBarRight>
      </TitleBar>

      {/* Content Area */}
      <ContentArea>
        {window.content}
      </ContentArea>
    </WindowContainer>
  );
};

export default XpWindow;
