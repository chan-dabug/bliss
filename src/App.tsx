import React, { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import DesktopIcon from './components/DesktopIcon';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import { DesktopIcon as DesktopIconType, WindowState, TaskbarItem } from './types';
import { ASSET_PATHS, APP_NAMES } from './constants';
import './App.css';

const App: React.FC = () => {
  const [desktopIcons, setDesktopIcons] = useState<DesktopIconType[]>([
    {
      id: 'workplace',
      name: APP_NAMES.WORKPLACE,
      iconPath: ASSET_PATHS.ICONS.WORKPLACE,
      x: 50,
      y: 50,
      type: 'folder'
    },
    {
      id: 'my-documents',
      name: APP_NAMES.MY_DOCUMENTS,
      iconPath: ASSET_PATHS.ICONS.MY_PROFILE,
      x: 50,
      y: 120,
      type: 'folder'
    },
    {
      id: 'recycle-bin',
      name: APP_NAMES.RECYCLE_BIN,
      iconPath: ASSET_PATHS.ICONS.RECYCLE_BIN,
      x: 50,
      y: 190,
      type: 'folder'
    },
    {
      id: 'audacity',
      name: APP_NAMES.AUDACITY,
      iconPath: ASSET_PATHS.ICONS.AUDACITY,
      x: 50,
      y: 260,
      type: 'app'
    },
    {
      id: 'hd-adeck',
      name: APP_NAMES.HD_ADECK,
      iconPath: ASSET_PATHS.ICONS.HD_ADECK,
      x: 50,
      y: 330,
      type: 'app'
    },
    {
      id: 'logitech-webcam',
      name: APP_NAMES.LOGITECH_WEBCAM,
      iconPath: ASSET_PATHS.ICONS.LOGITECH_WEBCAM,
      x: 50,
      y: 400,
      type: 'app'
    },
    {
      id: 'intel-processor',
      name: APP_NAMES.INTEL_PROCESSOR,
      iconPath: ASSET_PATHS.ICONS.INTEL_PROCESSOR,
      x: 50,
      y: 470,
      type: 'app'
    },
    {
      id: 'pinball',
      name: APP_NAMES.PINBALL,
      iconPath: ASSET_PATHS.ICONS.PINBALL,
      x: 200,
      y: 50,
      type: 'app'
    },
    {
      id: 'resume',
      name: APP_NAMES.RESUME,
      iconPath: ASSET_PATHS.ICONS.RESUME,
      x: 200,
      y: 120,
      type: 'file'
    }
  ]);

  const [windows, setWindows] = useState<WindowState[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [nextWindowId, setNextWindowId] = useState(1);

  const handleIconClick = (iconId: string) => {
    setSelectedIcon(iconId);
    
    const icon = desktopIcons.find(i => i.id === iconId);
    if (!icon) return;

    // Handle different icon types
    switch (icon.type) {
      case 'folder':
        openFolderWindow(icon);
        break;
      case 'file':
        if (iconId === 'resume') {
          openResumeWindow(icon);
        }
        break;
      case 'app':
        openAppWindow(icon);
        break;
    }
  };

  const openFolderWindow = (icon: DesktopIconType) => {
    const newWindow: WindowState = {
      id: `window-${nextWindowId}`,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      x: 100 + (nextWindowId * 20),
      y: 100 + (nextWindowId * 20),
      width: 600,
      height: 400,
      title: icon.name,
      content: (
        <div className="folder-content">
          <div className="windows-logo-large">
            <div className="windows-logo-grid">
              <div className="window-pane-large pane-1"></div>
              <div className="window-pane-large pane-2"></div>
              <div className="window-pane-large pane-3"></div>
              <div className="window-pane-large pane-4"></div>
            </div>
          </div>
          <div className="windows-text">
            <div className="microsoft-text">Microsoft</div>
            <div className="windows-text-large">Windows</div>
            <div className="xp-text">xp</div>
          </div>
        </div>
      )
    };

    setWindows(prev => [...prev, newWindow]);
    setNextWindowId(prev => prev + 1);
  };

  const openResumeWindow = (icon: DesktopIconType) => {
    const newWindow: WindowState = {
      id: `window-${nextWindowId}`,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      x: 100 + (nextWindowId * 20),
      y: 100 + (nextWindowId * 20),
      width: 800,
      height: 600,
      title: `${icon.name} - Portfolio`,
      content: (
        <div className="resume-content">
          <h1>Chan Boswell</h1>
          <h2>Software Developer</h2>
          <p>Welcome to my Windows XP-themed portfolio!</p>
          <p>This is a creative way to showcase my skills in React, TypeScript, and CSS.</p>
          <div className="resume-section">
            <h3>Skills</h3>
            <ul>
              <li>React & TypeScript</li>
              <li>Node.js & Express</li>
              <li>CSS & Styling</li>
              <li>UI/UX Design</li>
            </ul>
          </div>
          <div className="resume-section">
            <h3>Experience</h3>
            <p>Building nostalgic and creative web experiences</p>
          </div>
        </div>
      )
    };

    setWindows(prev => [...prev, newWindow]);
    setNextWindowId(prev => prev + 1);
  };

  const openAppWindow = (icon: DesktopIconType) => {
    const newWindow: WindowState = {
      id: `window-${nextWindowId}`,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      x: 100 + (nextWindowId * 20),
      y: 100 + (nextWindowId * 20),
      width: 500,
      height: 300,
      title: icon.name,
      content: (
        <div className="app-content">
          <h2>{icon.name}</h2>
          <p>This is a placeholder for the {icon.name} application.</p>
          <p>In a real implementation, this could be a portfolio project showcase.</p>
        </div>
      )
    };

    setWindows(prev => [...prev, newWindow]);
    setNextWindowId(prev => prev + 1);
  };

  const closeWindow = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isOpen: false } : w
    ));
  };

  const minimizeWindow = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMinimized: !w.isMinimized } : w
    ));
  };

  const maximizeWindow = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const moveWindow = (windowId: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, x, y } : w
    ));
  };

  const resizeWindow = (windowId: string, width: number, height: number) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, width, height } : w
    ));
  };

  const getTaskbarItems = (): TaskbarItem[] => {
    return windows
      .filter(w => w.isOpen && !w.isMinimized)
      .map(w => ({
        id: w.id,
        title: w.title,
        isActive: true,
        isMinimized: false,
        onClick: () => minimizeWindow(w.id)
      }));
  };

  const handleStartClick = () => {
    // Could open a start menu here
    console.log('Start button clicked');
  };

  const handleWindowClick = (windowId: string) => {
    minimizeWindow(windowId);
  };

  return (
    <div className="App">
      <Desktop>
        {/* Desktop Icons */}
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            onClick={() => handleIconClick(icon.id)}
            isSelected={selectedIcon === icon.id}
          />
        ))}

        {/* Windows */}
        {windows.map((window) => (
          <Window
            key={window.id}
            window={window}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            onMove={(x, y) => moveWindow(window.id, x, y)}
            onResize={(width, height) => resizeWindow(window.id, width, height)}
          />
        ))}

        {/* Taskbar */}
        <Taskbar
          openWindows={getTaskbarItems()}
          onStartClick={handleStartClick}
          onWindowClick={handleWindowClick}
        />
      </Desktop>
    </div>
  );
};

export default App;
