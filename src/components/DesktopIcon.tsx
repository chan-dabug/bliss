import React from 'react';
import { DesktopIcon as DesktopIconType } from '../types';
import { DIMENSIONS } from '../constants';
import './DesktopIcon.css';

interface DesktopIconProps {
  icon: DesktopIconType;
  onClick: () => void;
  isSelected: boolean;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, onClick, isSelected }) => {
  return (
    <div
      className={`desktop-icon ${isSelected ? 'selected' : ''}`}
      style={{
        left: icon.x,
        top: icon.y,
        width: DIMENSIONS.ICON_SIZE,
        height: DIMENSIONS.ICON_SIZE + 20, // Extra height for text
      }}
      onClick={onClick}
    >
      <div className="icon-image">
        <img 
          src={icon.iconPath} 
          alt={icon.name}
          width={DIMENSIONS.ICON_SIZE}
          height={DIMENSIONS.ICON_SIZE}
        />
      </div>
      <div className="icon-text">
        {icon.name}
      </div>
    </div>
  );
};

export default DesktopIcon;
