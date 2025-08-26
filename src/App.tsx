import React, { useState, useCallback } from 'react';
import { WindowManagerProvider, useWindowManager } from './contexts/WindowManagerContext';
import { ClassTokenProvider } from './contexts/ClassTokenProvider';
import Desktop from './components/Desktop';
import DesktopIcon from './components/DesktopIcon';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import WindowLayer from './components/WindowLayer';
import { DesktopIcon as DesktopIconType } from './types';
import { ASSET_PATHS, APP_NAMES } from './constants';
import { createWindowContent } from './utils/windowContentFactory';
import './App.css';

const AppContent: React.FC = () => {
  const { open } = useWindowManager();
  const [desktopIcons, setDesktopIcons] = useState<DesktopIconType[]>([
    {
      id: 'my-linkedin',
      name: 'My LinkedIn',
      iconPath: ASSET_PATHS.ICONS.MY_PROFILE,
      x: 50,
      y: 50,
      type: 'folder'
    },
    {
      id: 'coders-playlist',
      name: "Coder's Playlist",
      iconPath: ASSET_PATHS.ICONS.AUDACITY,
      x: 50,
      y: 120,
      type: 'app'
    },
    {
      id: 'pinball',
      name: APP_NAMES.PINBALL,
      iconPath: ASSET_PATHS.ICONS.PINBALL,
      x: 50,
      y: 190,
      type: 'app'
    },
    {
      id: 'resume',
      name: APP_NAMES.RESUME,
      iconPath: ASSET_PATHS.ICONS.RESUME,
      x: 50,
      y: 260,
      type: 'file'
    },
    {
      id: 'other-projects',
      name: 'Other Projects',
      iconPath: ASSET_PATHS.ICONS.MY_PROFILE,
      x: 50,
      y: 330,
      type: 'folder'
    }
  ]);

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const handleIconMove = useCallback((iconId: string, x: number, y: number) => {
    setDesktopIcons(prev => prev.map(icon => 
      icon.id === iconId ? { ...icon, x, y } : icon
    ));
  }, []);

  const handleIconSelect = useCallback((iconId: string) => {
    setSelectedIcon(iconId);
  }, []);

  const handleIconClick = useCallback((icon: DesktopIconType) => {
    // Open window using the window manager
    const content = createWindowContent(icon);
    open(icon.id, icon.name, content);
  }, []); // Remove open dependency

  const handleStartClick = useCallback(() => {
    setIsStartMenuOpen(prev => !prev);
  }, []);

  const handleStartMenuIconClick = useCallback((icon: DesktopIconType) => {
    // Open window using the window manager
    const content = createWindowContent(icon);
    open(icon.id, icon.name, content);
  }, []); // Remove open dependency

  return (
    <div className="App">
      <Desktop>
        {/* Desktop Icons */}
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            onClick={() => handleIconClick(icon)}
            isSelected={selectedIcon === icon.id}
            onSelect={() => handleIconSelect(icon.id)}
            onMove={(x, y) => handleIconMove(icon.id, x, y)}
          />
        ))}

        {/* Window Layer */}
        <WindowLayer />

        {/* Taskbar */}
        <Taskbar
          onStartClick={handleStartClick}
        />

        {/* Start Menu */}
        <StartMenu 
          isOpen={isStartMenuOpen} 
          onClose={() => setIsStartMenuOpen(false)}
          desktopIcons={desktopIcons}
          onIconClick={handleStartMenuIconClick}
        />
      </Desktop>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ClassTokenProvider>
      <WindowManagerProvider>
        <AppContent />
      </WindowManagerProvider>
    </ClassTokenProvider>
  );
};

export default App;
