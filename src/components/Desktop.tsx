import React from 'react';
import { ASSET_PATHS } from '../constants';
import './Desktop.css';

interface DesktopProps {
  children: React.ReactNode;
}

const Desktop: React.FC<DesktopProps> = ({ children }) => {
  return (
    <div className="desktop">
      <div 
        className="desktop-background"
        style={{
          backgroundImage: `url(${ASSET_PATHS.BACKGROUND})`,
        }}
      />
      <div className="desktop-content">
        {children}
      </div>
    </div>
  );
};

export default Desktop;
