import React, { useState, useEffect } from 'react';
import { TaskbarItem } from '../types';
import Weather from './Weather';
import './Taskbar.css';
import { ASSET_PATHS } from '../constants';

interface TaskbarProps {
  openWindows: TaskbarItem[];
  onStartClick: () => void;
  onWindowClick: (id: string) => void;
}

const desktopClock = new Date().toLocaleTimeString('en-US', { 
  hour: '2-digit', 
  minute: '2-digit',
  hour12: true 
})

const Taskbar: React.FC<TaskbarProps> = ({ openWindows, onStartClick, onWindowClick }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [clock, setClock] = useState(desktopClock);

  useEffect(() => {
    // Initialize audio context
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
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

  return (
    <div className="taskbar">
      {/* Start Button */}
      <div className="start-button" onClick={onStartClick}>
        <div className="start-button-logo">
          <div className="windows-logo">
            <div className="window-pane pane-1"></div>
            <div className="window-pane pane-2"></div>
            <div className="window-pane pane-3"></div>
            <div className="window-pane pane-4"></div>
          </div>
        </div>
        <span className="start-text">Start</span>
      </div>

      {/* Quick Launch Icons */}
      <div className="quick-launch">
        <div className="quick-launch-icon" title="Internet Explorer">
          <div className="ie-icon">e</div>
        </div>
        <div className="quick-launch-icon" title="Windows Explorer">
          <div className="explorer-icon">📁</div>
        </div>
        <div className="quick-launch-icon" title="Outlook Express">
          <div className="outlook-icon">✉</div>
        </div>
      </div>

      {/* Open Windows */}
      <div className="open-windows">
        {openWindows.map((window) => (
          <div
            key={window.id}
            className={`taskbar-window ${window.isActive ? 'active' : ''} ${window.isMinimized ? 'minimized' : ''}`}
            onClick={() => onWindowClick(window.id)}
          >
            {window.title}
          </div>
        ))}
      </div>

      {/* System Tray */}
      <div className="system-tray">

        <div 
          className={`tray-icon speaker-icon ${isMuted ? 'muted' : ''}`} 
          title={isMuted ? 'Unmute' : 'Mute'}
          onClick={handleSpeakerClick}
        >
          <div className="speaker-icon">{isMuted ? '🔇' : '🔊'}</div>
        </div>
        <Weather />
        <div 
          className="tray-icon security-icon" 
          title="SANS Internet Storm Center - Security Threats"
          onClick={() => window.open('https://isc.sans.edu/index.html', '_blank')}
        >
          <div className="security-icon">
            <img style={{height: '15px', width: '15px'}} src={ASSET_PATHS.ICONS.CYBER_SECURITY} alt="Cyber Security" />
          </div>
        </div>
        <div className="clock">
          {clock}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
