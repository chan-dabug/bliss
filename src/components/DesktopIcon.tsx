import React, { useState, useRef } from 'react';
import { DesktopIcon as DesktopIconType } from '../types';
import { DIMENSIONS } from '../constants';
import './DesktopIcon.css';

interface DesktopIconProps {
  icon: DesktopIconType;
  onClick: () => void;
  isSelected: boolean;
  onMove: (x: number, y: number) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, onClick, isSelected, onMove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const iconRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    
    const rect = iconRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!iconRef.current) return;
      
      const desktopRect = document.querySelector('.desktop')?.getBoundingClientRect();
      if (desktopRect) {
        const newX = e.clientX - desktopRect.left - dragOffset.x;
        const newY = e.clientY - desktopRect.top - dragOffset.y;
        
        // Constrain to desktop boundaries
        const constrainedX = Math.max(0, Math.min(newX, desktopRect.width - DIMENSIONS.ICON_SIZE));
        const constrainedY = Math.max(0, Math.min(newY, desktopRect.height - DIMENSIONS.ICON_SIZE - 30)); // 30px for taskbar
        
        onMove(constrainedX, constrainedY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      onClick();
    }
  };

  return (
    <div
      ref={iconRef}
      className={`desktop-icon ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{
        left: icon.x,
        top: icon.y,
        width: DIMENSIONS.ICON_SIZE,
        height: DIMENSIONS.ICON_SIZE + 20, // Extra height for text
        position: 'absolute',
        cursor: isDragging ? 'grabbing' : 'pointer',
        zIndex: isDragging ? 1000 : 'auto',
        opacity: isDragging ? 0.8 : 1,
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <div className="icon-image">
        <img 
          src={icon.iconPath} 
          alt={icon.name}
          width={DIMENSIONS.ICON_SIZE}
          height={DIMENSIONS.ICON_SIZE}
          draggable={false}
        />
      </div>
      <div className="icon-text">
        {icon.name}
      </div>
    </div>
  );
};

export default DesktopIcon;
