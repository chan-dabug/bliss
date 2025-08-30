import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useWindowManager } from '../contexts/WindowManagerContext';
import Weather from './Weather';
import { ASSET_PATHS } from '../constants';

interface TaskbarProps {
  onStartClick: () => void;
}

const desktopClock = new Date().toLocaleTimeString('en-US', { 
  hour: '2-digit', 
  minute: '2-digit',
  hour12: true 
})

const TaskbarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 42px;
  background: linear-gradient(to bottom, #0066CC 0%, #0052A3 50%, #003D7A 100%);
  border-top: 1px solid #A0A0A0;
  display: flex;
  align-items: center;
  padding: 0 4px;
  z-index: 1000;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.3);
`;

const StartButton = styled.div`
  background: linear-gradient(to bottom, #4CAF50 0%, #45A049 50%, #3D8B40 100%);
  border: 1px solid #2E7D32;
  border-radius: 4px 0 0 4px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  font-size: 12px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
  
  &:hover {
    background: linear-gradient(to bottom, #5CBF60 0%, #55B059 50%, #4D9B50 100%);
  }
  
  &:active {
    box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.2);
  }
`;

const StartButtonLogo = styled.div`
  display: flex;
  align-items: center;
`;

const WindowsLogo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1px;
  width: 16px;
  height: 16px;
`;

const WindowPane = styled.div<{ pane: number }>`
  background: white;
  border-radius: 1px;
  
  ${props => {
    switch (props.pane) {
      case 1: return 'grid-column: 1; grid-row: 1;';
      case 2: return 'grid-column: 2; grid-row: 1;';
      case 3: return 'grid-column: 1; grid-row: 2;';
      case 4: return 'grid-column: 2; grid-row: 2;';
      default: return '';
    }
  }}
`;

const StartText = styled.span`
  font-size: 12px;
  font-weight: bold;
`;

const QuickLaunch = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
`;





const OpenWindows = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: 8px;
  overflow-x: auto;
`;

const TaskbarWindow = styled.div<{ isActive: boolean; isMinimized: boolean }>`
  background: ${props => props.isActive 
    ? 'linear-gradient(to bottom, #4A90E2 0%, #357ABD 50%, #2E6AA8 100%)' 
    : 'linear-gradient(to bottom, #5A9AE2 0%, #458ABD 50%, #3E7AA8 100%)'
  };
  border: 1px solid ${props => props.isActive ? '#2E6AA8' : '#3E7AA8'};
  border-radius: 3px;
  padding: 4px 12px;
  cursor: pointer;
  color: white;
  font-size: 11px;
  white-space: nowrap;
  min-width: 80px;
  text-align: center;
  box-shadow: ${props => props.isActive 
    ? 'inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
    : 'none'
  };
  
  &:hover {
    background: ${props => props.isActive 
      ? 'linear-gradient(to bottom, #5AA0F2 0%, #458ACD 50%, #3E7AB8 100%)' 
      : 'linear-gradient(to bottom, #6AAAF2 0%, #559ACD 50%, #4E8AB8 100%)'
    };
  }
`;

const SystemTray = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
`;

const TrayIcon = styled.div<{ variant?: 'speaker' | 'security' }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 3px;
  transition: background-color 0.1s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  ${props => props.variant === 'speaker' && `
    &.muted .speaker-icon {
      opacity: 0.5;
    }
  `}
`;

const SpeakerIcon = styled.div`
  font-size: 16px;
`;

const SecurityIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Clock = styled.div`
  color: white;
  font-size: 11px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.1);
  min-width: 60px;
  text-align: center;
`;

const Taskbar: React.FC<TaskbarProps> = ({ onStartClick }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [clock, setClock] = useState(desktopClock);
  const { windows, minimize, focus } = useWindowManager();

  useEffect(() => {
    // Initialize audio context
    const context = new (globalThis.window.AudioContext || (globalThis.window as any).webkitAudioContext)();
    setAudioContext(context);

    return () => {
      if (context) {
        context.close();
      }
    };
  }, []);

  useEffect(() => {
    // Update clock every second
    const interval = setInterval(() => {
      setClock(new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSpeakerClick = () => {
    if (audioContext) {
      if (isMuted) {
        // Unmute - resume audio context
        audioContext.resume();
        setIsMuted(false);
      } else {
        // Mute - suspend audio context
        audioContext.suspend();
        setIsMuted(true);
      }
    }
  };

  const handleTaskbarWindowClick = (windowId: string) => {
    const window = windows.find(w => w.id === windowId);
    if (window) {
      if (window.minimized) {
        focus(windowId);
      } else {
        minimize(windowId);
      }
    }
  };

  return (
    <TaskbarContainer>
      {/* Start Button */}
      <StartButton onClick={onStartClick}>
        <StartButtonLogo>
          <WindowsLogo>
            <WindowPane pane={1} />
            <WindowPane pane={2} />
            <WindowPane pane={3} />
            <WindowPane pane={4} />
          </WindowsLogo>
        </StartButtonLogo>
        <StartText>Start</StartText>
      </StartButton>

      {/* Quick Launch Icons */}
      <QuickLaunch>
        {/* Other Projects moved to desktop */}
      </QuickLaunch>

      {/* Open Windows */}
      <OpenWindows>
        {windows.map((window) => (
          <TaskbarWindow
            key={window.id}
            isActive={!window.minimized}
            isMinimized={window.minimized}
            onClick={() => handleTaskbarWindowClick(window.id)}
          >
            {window.title}
          </TaskbarWindow>
        ))}
      </OpenWindows>

      {/* System Tray */}
      <SystemTray>
        <TrayIcon 
          variant="speaker"
          className={isMuted ? 'muted' : ''} 
          title={isMuted ? 'Unmute' : 'Mute'}
          onClick={handleSpeakerClick}
        >
          <SpeakerIcon>{isMuted ? '🔇' : '🔊'}</SpeakerIcon>
        </TrayIcon>
        <Weather />
        <TrayIcon 
          variant="security"
          title="SANS Internet Storm Center - Security Threats"
          onClick={() => globalThis.window.open('https://isc.sans.edu/index.html', '_blank')}
        >
          <SecurityIcon>
            <img style={{height: '15px', width: '15px'}} src={ASSET_PATHS.ICONS.CYBER_SECURITY} alt="Cyber Security" />
          </SecurityIcon>
        </TrayIcon>
        <Clock>
          {clock}
        </Clock>
      </SystemTray>
    </TaskbarContainer>
  );
};

export default Taskbar;
