import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { DesktopIcon as DesktopIconType } from '../types';
import { DIMENSIONS } from '../constants';

interface DesktopIconProps {
  icon: DesktopIconType;
  onClick: () => void;
  isSelected: boolean;
  onSelect: () => void;
  onMove: (x: number, y: number) => void;
}

const IconContainer = styled.div<{ 
  isSelected: boolean; 
  isDragging: boolean; 
  x: number; 
  y: number;

}>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: ${DIMENSIONS.ICON_SIZE}px;
  height: ${DIMENSIONS.ICON_SIZE + 20}px;
  cursor: ${props => props.isDragging ? 'grabbing' : 'pointer'};
  z-index: ${props => props.isDragging ? 1000 : 'auto'};
  opacity: ${props => props.isDragging ? 0.8 : 1};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  user-select: none;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  ${props => props.isSelected && `
    background-color: rgba(0, 102, 204, 0.3);
    border: 1px solid rgba(0, 102, 204, 0.6);
  `}
`;

const IconImage = styled.div`
  width: ${DIMENSIONS.ICON_SIZE}px;
  height: ${DIMENSIONS.ICON_SIZE}px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const IconText = styled.div`
  font-size: 9px;
  color: white;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
  line-height: 1.2;
  word-wrap: break-word;
  max-width: ${DIMENSIONS.ICON_SIZE}px;
`;

const DesktopIcon: React.FC<DesktopIconProps> = ({ 
  icon, 
  onClick, 
  isSelected, 
  onSelect,
  onMove 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startX: 0, startY: 0, startIconX: 0, startIconY: 0 });

  // Load saved position from localStorage
  useEffect(() => {
    const savedPosition = globalThis.localStorage.getItem(`icon-position-${icon.id}`);
    if (savedPosition) {
      try {
        const { x, y } = JSON.parse(savedPosition);
        onMove(x, y);
      } catch (error) {
        console.error('Failed to load icon position:', error);
      }
    }
  }, [icon.id]); // Remove onMove dependency

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const desktopRect = document.querySelector('.desktop')?.getBoundingClientRect();
      if (!desktopRect) return;

      // Calculate new position
      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;
      
      const newX = dragRef.current.startIconX + deltaX;
      const newY = dragRef.current.startIconY + deltaY;

      // Constrain to desktop boundaries
      const constrainedX = Math.max(0, Math.min(newX, desktopRect.width - DIMENSIONS.ICON_SIZE));
      const constrainedY = Math.max(0, Math.min(newY, desktopRect.height - DIMENSIONS.ICON_SIZE - 30));

      onMove(constrainedX, constrainedY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      
      // Save position to localStorage
      const desktopRect = document.querySelector('.desktop')?.getBoundingClientRect();
      if (desktopRect && iconRef.current) {
        const rect = iconRef.current.getBoundingClientRect();
        const x = rect.left - desktopRect.left;
        const y = rect.top - desktopRect.top;
        globalThis.localStorage.setItem(`icon-position-${icon.id}`, JSON.stringify({ x, y }));
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, icon.id]); // Remove onMove dependency

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Store drag start information in ref to avoid closure issues
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startIconX: icon.x,
      startIconY: icon.y
    };
    
    setIsDragging(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      onSelect();
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isSelected) {
      onClick();
    }
  };

  return (
    <IconContainer
      ref={iconRef}
      isSelected={isSelected}
      isDragging={isDragging}
      x={icon.x}
      y={icon.y}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${icon.name} icon`}
    >
      <IconImage>
        <img 
          src={icon.iconPath} 
          alt={icon.name}
          draggable={false}
        />
      </IconImage>
      <IconText>
        {icon.name}
      </IconText>
    </IconContainer>
  );
};

export default DesktopIcon;
