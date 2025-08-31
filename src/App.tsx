import React, { useState, useCallback, useEffect } from 'react';
import { WindowManagerProvider, useWindowManager } from './contexts/WindowManagerContext';
import { ClassTokenProvider } from './contexts/ClassTokenProvider';
import Desktop from './components/Desktop';
import DesktopIcon from './components/DesktopIcon';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import WelcomeModal from './components/WelcomeModal';
import WindowLayer from './components/WindowLayer';
import ContactModal from './components/ContactModal';
import { DesktopIcon as DesktopIconType } from './types';
import { ASSET_PATHS, APP_NAMES } from './constants';
import { createWindowContent } from './utils/windowContentFactory';
import './App.css';

const AppContent: React.FC = () => {
  const { open } = useWindowManager();
  const [desktopIcons, setDesktopIcons] = useState<DesktopIconType[]>([
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
      type: 'file',
      meta: { 
        fileUrl: '/ChanBoswellResume.pdf', 
        mime: 'application/pdf' 
      }
    },
    {
      id: 'other-projects',
      name: 'Projects',
      iconPath: ASSET_PATHS.ICONS.PROJECTS,
      x: 50,
      y: 330,
      type: 'folder'
    }
  ]);

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // Show welcome modal on initial load
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    
    // Check if the value is exactly 'true' (string comparison)
    if (hasSeenWelcome !== 'true') {
      setShowWelcomeModal(true);
      localStorage.setItem('hasSeenWelcome', 'true');
    }
  }, []);

  const handleIconMove = useCallback((iconId: string, x: number, y: number) => {
    setDesktopIcons(prev => prev.map(icon => 
      icon.id === iconId ? { ...icon, x, y } : icon
    ));
  }, []);

  const handleIconSelect = useCallback((iconId: string) => {
    setSelectedIcon(iconId);
  }, []);

  const handleIconClick = useCallback((icon: DesktopIconType) => {
    // Special handling for resume/PDF files - show modal-style PDF viewer
    if (icon.name.toLowerCase().includes('resume') || icon.meta?.mime === 'application/pdf') {
      const fileUrl = icon.meta?.fileUrl ?? '/ChanBoswellResume.pdf';
      
      // Create modal container
      const modalContainer = document.createElement('div');
      modalContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
      `;
      
      // Create PDF viewer container
      const pdfContainer = document.createElement('div');
      pdfContainer.style.cssText = `
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        width: 800px;
        height: 600px;
      `;
      
      // Create close button
      const closeButton = document.createElement('button');
      closeButton.innerHTML = '✕';
      closeButton.style.cssText = `
        position: absolute;
        top: -15px;
        right: -15px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: none;
        background-color: #E81123;
        color: white;
        font-size: 8px;
        cursor: pointer;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      `;
      
      // Create iframe
      const iframe = document.createElement('iframe');
      iframe.src = fileUrl;
      iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 8px;
      `;
      iframe.title = 'PDF Viewer';
      
      // Add close functionality
      closeButton.onclick = () => {
        document.body.removeChild(modalContainer);
      };
      
      // Close on background click
      modalContainer.onclick = (e) => {
        if (e.target === modalContainer) {
          document.body.removeChild(modalContainer);
        }
      };
      
      // Escape key to close
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          document.body.removeChild(modalContainer);
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);
      
      // Assemble the modal
      pdfContainer.appendChild(closeButton);
      pdfContainer.appendChild(iframe);
      modalContainer.appendChild(pdfContainer);
      document.body.appendChild(modalContainer);
      return;
    }
    
    // Regular handling for other icons - open window using the window manager
    const content = createWindowContent(icon);
    open(icon.id, icon.name, content);
  }, [open]);

  const handleStartClick = useCallback(() => {
    setIsStartMenuOpen(prev => !prev);
  }, []);

  const handleCloseWelcomeModal = useCallback(() => {
    setShowWelcomeModal(false);
  }, []);

  const handleContactClick = useCallback(() => {
    setShowContactModal(true);
  }, []);

  const handleCloseContactModal = useCallback(() => {
    setShowContactModal(false);
  }, []);



  const handleStartMenuIconClick = useCallback((icon: DesktopIconType) => {
    // Use the same logic as handleIconClick for consistency
    handleIconClick(icon);
  }, [handleIconClick]);

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
          onContactClick={handleContactClick}
        />
      </Desktop>

      {/* Welcome Modal - Outside Desktop component for proper overlay */}
      <WelcomeModal 
        isOpen={showWelcomeModal}
        onClose={handleCloseWelcomeModal}
      />

      {/* Contact Modal - Outside Desktop component for proper overlay */}
      <ContactModal 
        isOpen={showContactModal}
        onClose={handleCloseContactModal}
      />
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
