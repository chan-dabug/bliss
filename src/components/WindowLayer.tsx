import React from 'react';
import { useWindowManager } from '../contexts/WindowManagerContext';
import XpWindow from './XpWindow';

const WindowLayer: React.FC = () => {
  const { windows, close, minimize, focus } = useWindowManager();

  return (
    <>
      {windows.map((window) => (
        <XpWindow
          key={window.id}
          window={window}
          onClose={() => close(window.id)}
          onMinimize={() => minimize(window.id)}
          onFocus={() => focus(window.id)}
        />
      ))}
    </>
  );
};

export default WindowLayer;
