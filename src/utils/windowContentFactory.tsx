import React from 'react';
import { DesktopIcon as DesktopIconType } from '../types';
import { SilentEmbedIframe } from '../components/SilentEmbed';

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
  if (icon.name === 'Projects') {
    return (
      <div className="folder-content">
        <div className="other-projects-content">
          <h1>📁 Other Projects</h1>
          <div className="projects-header">
            <p>Here are some other things I've been working on! Notice a bug 🐛? <a href="https://id.atlassian.com/invite/p/jira-software?id=WZKdkLmzQluvNQsttPZeCw" target="_blank" rel="noopener noreferrer">File a ticket</a></p>
          </div>
          <div className="projects-grid">
            <a href={'https://github.com/chan-dabug/bliss'}>
            <div className="project-item">
              <div className="project-name">Portfolio Website</div>
              <div className="project-desc">React + TypeScript portfolio</div>
              <br/>
            </div>
            </a>
            <a href={'https://github.com/chan-dabug/ck-broom-bot'}>
            <div className="project-item">
              <div className="project-name">CK the broom bot</div>
              <div className="project-desc">TypeScript, ts-morph, Node.js CLI, MongoDB, & GitHub automation </div>
            </div>
            </a>
            <a href={'https://www.npmjs.com/package/@chanbzz/my-style'}>
            <div className="project-item">
              <div className="project-name">My Style</div>
              <div className="project-desc">React & SCSS</div>
              <br/>
              <br/>
            </div>
            </a>
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
  // Check if this file should use the PDF viewer (any PDF or "resume" file)
  const isPdf = icon.meta?.mime === 'application/pdf'
    || (icon.meta?.fileUrl?.toLowerCase().endsWith('.pdf') ?? false);

  const looksLikeResume =
    icon.name.toLowerCase().includes('resume') ||
    icon.meta?.fileUrl?.toLowerCase().includes('resume') === true;

    if (isPdf || looksLikeResume) {
    // For resume/PDF files, we want to show them directly without the XP window wrapper
    // This will be handled specially in the App component
    return null;
  }

  // non-PDF files
  return (
    <div className="file-content">
      <h2>{icon.name}</h2>
      <p>This is a file document.</p>
      <p>File type: {icon.name.split('.').pop() || 'Unknown'}</p>
    </div>
  );
};

const createAppContent = (icon: DesktopIconType): React.ReactNode => {

if (icon.name === 'Pinball') {
  return (
    <SilentEmbedIframe
      src="https://98.js.org/programs/pinball/space-cadet.html"
      title="Space Cadet Pinball"
    />
  );
}

  if (icon.name === "Coder's Playlist") {
    return (
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#121212', 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px'
      }}>
        <h3 style={{ color: '#1DB954', margin: 0, fontSize: '18px' }}>Spotify</h3>
        <div style={{ 
          position: 'relative',
          width: '100%',
          height: '352px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <iframe 
            data-testid="embed-iframe" 
            style={{borderRadius: '12px'}} 
            src="https://open.spotify.com/embed/playlist/2ZROl955Vjwl1pZLJdJDbq?utm_source=generator" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            title="Coder's Playlist - Spotify"
            onError={(e) => console.error('Spotify iframe failed to load:', e)}
          />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#666',
            fontSize: '14px',
            display: 'none'
          }} id="spotify-loading">
            Loading Spotify playlist...
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
