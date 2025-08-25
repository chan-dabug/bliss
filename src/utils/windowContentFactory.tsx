import React from 'react';
import { DesktopIcon as DesktopIconType } from '../types';

export const createWindowContent = (icon: DesktopIconType): React.ReactNode => {
  switch (icon.type) {
    case 'folder':
      return createFolderContent(icon);
    case 'file':
      return createFileContent(icon);
    case 'app':
      return createAppContent(icon);
    default:
      return createDefaultContent(icon);
  }
};

const createFolderContent = (icon: DesktopIconType): React.ReactNode => {
  if (icon.name === 'My LinkedIn') {
    return (
      <div className="folder-content">
        <div className="linkedin-content">
          <h1>My LinkedIn Profile</h1>
          <div className="profile-section">
            <h2>Chan Boswell</h2>
            <p className="title">Software Developer</p>
            <p className="location">📍 San Francisco Bay Area</p>
          </div>
          <div className="skills-section">
            <h3>Technical Skills</h3>
            <ul>
              <li>React & TypeScript</li>
              <li>Node.js & Express</li>
              <li>Python & Django</li>
              <li>Cloud Computing (AWS, GCP)</li>
              <li>DevOps & CI/CD</li>
            </ul>
          </div>
          <div className="experience-section">
            <h3>Experience</h3>
            <p>Building innovative web applications and creative digital experiences</p>
            <p>Specializing in full-stack development and modern web technologies</p>
          </div>
          <div className="contact-section">
            <h3>Connect With Me</h3>
            <p>📧 chan@example.com</p>
            <p>🐙 github.com/chanboswell</p>
            <p>💼 linkedin.com/in/chanboswell</p>
          </div>
        </div>
      </div>
    );
  }

  return (
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
      <div className="folder-info">
        <p>This is the {icon.name} folder.</p>
        <p>Double-click to open and explore its contents.</p>
      </div>
    </div>
  );
};

const createFileContent = (icon: DesktopIconType): React.ReactNode => {
  if (icon.name.toLowerCase().includes('resume')) {
    return (
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
        <div className="resume-section">
          <h3>Contact</h3>
          <p>Email: chan@example.com</p>
          <p>GitHub: github.com/chanboswell</p>
          <p>LinkedIn: linkedin.com/in/chanboswell</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="file-content">
      <h2>{icon.name}</h2>
      <p>This is a file document.</p>
      <p>File type: {icon.name.split('.').pop() || 'Unknown'}</p>
    </div>
  );
};

const createAppContent = (icon: DesktopIconType): React.ReactNode => {
  if (icon.name === "Coder's Playlist") {
    return (
      <div className="app-content">
        <h2>🎵 Coder's Playlist</h2>
        <p>Curated music for focused coding sessions</p>
        <div className="playlist-section">
          <h3>Current Playlist</h3>
          <div className="playlist-tracks">
            <div className="track">
              <span className="track-number">1.</span>
              <span className="track-title">Lofi Coding Beats</span>
              <span className="track-artist">Chillhop Music</span>
            </div>
            <div className="track">
              <span className="track-number">2.</span>
              <span className="track-title">Deep Focus</span>
              <span className="track-artist">Spotify</span>
            </div>
            <div className="track">
              <span className="track-number">3.</span>
              <span className="track-title">Programming Flow</span>
              <span className="track-artist">Brain.fm</span>
            </div>
            <div className="track">
              <span className="track-number">4.</span>
              <span className="track-title">Code & Coffee</span>
              <span className="track-artist">Jazz Vibes</span>
            </div>
          </div>
          <div className="playlist-controls">
            <button className="control-btn">▶️ Play</button>
            <button className="control-btn">⏸️ Pause</button>
            <button className="control-btn">⏭️ Next</button>
          </div>
        </div>
      </div>
    );
  }

  if (icon.name === 'Pinball') {
    return (
      <div className="app-content">
        <h2>🎮 Pinball</h2>
        <p>Classic Windows XP Pinball game</p>
        <div className="game-section">
          <div className="game-board">
            <div className="pinball-table">
              <div className="bumpers">
                <div className="bumper bumper-1">⚡</div>
                <div className="bumper bumper-2">⚡</div>
                <div className="bumper bumper-3">⚡</div>
              </div>
              <div className="flippers">
                <div className="flipper flipper-left">◀</div>
                <div className="flipper flipper-right">▶</div>
              </div>
              <div className="score">Score: 0</div>
            </div>
          </div>
          <div className="game-controls">
            <p>Use SPACEBAR to launch ball</p>
            <p>Use LEFT/RIGHT ARROWS for flippers</p>
            <button className="control-btn">🎯 New Game</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-content">
      <h2>{icon.name}</h2>
      <p>This is a placeholder for the {icon.name} application.</p>
      <p>In a real implementation, this could be a portfolio project showcase.</p>
      <div className="app-demo">
        <div className="app-header">
          <h3>Application Demo</h3>
        </div>
        <div className="app-body">
          <p>This would contain the actual application interface or project details.</p>
          <div className="app-features">
            <h4>Features:</h4>
            <ul>
              <li>Interactive demo</li>
              <li>Project documentation</li>
              <li>Source code links</li>
              <li>Live preview</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const createDefaultContent = (icon: DesktopIconType): React.ReactNode => {
  return (
    <div className="default-content">
      <h2>{icon.name}</h2>
      <p>This is a {icon.type} icon.</p>
      <p>Click to open or interact with this item.</p>
    </div>
  );
};
