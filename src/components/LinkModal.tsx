import React from 'react';
import styled from 'styled-components';

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'github' | 'linkedin' | 'other-projects';
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalContainer = styled.div`
  background: #F0F0F0;
  border: 2px solid #2b579a;
  border-radius: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 500px;
  max-height: 80vh;
  overflow: hidden;
  font-family: 'Tahoma', 'Segoe UI', 'Arial', sans-serif;
`;

const ModalTitleBar = styled.div`
  background: linear-gradient(to bottom, #3f76c3 0%, #2b579a 100%);
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  color: white;
  cursor: move;
  user-select: none;
`;

const TitleText = styled.span`
  font-size: 12px;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  width: 20px;
  height: 18px;
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  border-radius: 2px;
  transition: background-color 0.1s ease;
  
  &:hover {
    background-color: #E81123;
  }
`;

const ModalContent = styled.div`
  padding: 20px;
  max-height: calc(80vh - 22px);
  overflow-y: auto;
`;

const GitHubContent = styled.div`
  text-align: center;
  
  h2 {
    color: #333;
    margin-bottom: 20px;
  }
  
  .github-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 20px 0;
  }
  
  .stat-card {
    background: white;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    padding: 15px;
    text-align: center;
  }
  
  .stat-number {
    font-size: 24px;
    font-weight: bold;
    color: #0066CC;
    margin-bottom: 5px;
  }
  
  .stat-label {
    font-size: 12px;
    color: #666;
    line-height: 1.3;
  }
`;

const LinkedInContent = styled.div`
  text-align: center;
  
  h2 {
    color: #0077B5;
    margin-bottom: 20px;
  }
  
  .linkedin-info {
    background: white;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    padding: 20px;
    margin: 20px 0;
  }
  
  .profile-link {
    display: inline-block;
    background: #0077B5;
    color: white;
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 4px;
    font-weight: bold;
    margin-top: 15px;
    transition: background-color 0.1s ease;
    
    &:hover {
      background: #005885;
    }
  }
  
  .profile-description {
    color: #666;
    line-height: 1.3;
  }
`;

const OtherProjectsContent = styled.div`
  text-align: center;
  
  h2 {
    color: #2b579a;
    margin-bottom: 20px;
  }
  
  .projects-header {
    margin-bottom: 20px;
    
    p {
      color: #666;
      line-height: 1.3;
    }
    
    a {
      color: #0066CC;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .project-item {
    background: white;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    padding: 20px;
    text-align: center;
    transition: transform 0.1s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
  
  .project-icon {
    font-size: 32px;
    margin-bottom: 10px;
  }
  
  .project-name {
    font-size: 13px;
    font-weight: bold;
    color: #2b579a;
    margin-bottom: 5px;
  }
  
  .project-desc {
    font-size: 11px;
    color: #666;
    line-height: 1.3;
  }
`;

const LinkModal: React.FC<LinkModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (type) {
      case 'github':
        return (
          <GitHubContent>
            <h2>🐙 GitHub</h2>
            <div className="github-stats">
              <div className="stat-card">
                <div className="stat-number">50+</div>
                <div className="stat-label">Repositories</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100+</div>
                <div className="stat-label">Contributions</div>
              </div>
            </div>
            <a 
              href="https://github.com/chanboswell" 
              target="_blank" 
              rel="noopener noreferrer"
              className="profile-link"
            >
              View Profile
            </a>
          </GitHubContent>
        );
      
      case 'linkedin':
        return (
          <LinkedInContent>
            <h2>💼 LinkedIn</h2>
            <div className="linkedin-info">
              <p className="profile-description">
                Connect with me on LinkedIn to see my professional experience, 
                skills, and network with other developers and tech professionals.
              </p>
              <a 
                href="https://linkedin.com/in/chanboswell" 
                target="_blank" 
                rel="noopener noreferrer"
                className="profile-link"
              >
                Connect on LinkedIn
              </a>
            </div>
          </LinkedInContent>
        );
      
      case 'other-projects':
        return (
          <OtherProjectsContent>
            <h2>📁 Other Projects</h2>
            <div className="projects-header">
              <p>Here are some other things I've been working on! Notice a bug 🐛? <a href="https://id.atlassian.com/invite/p/jira-software?id=WZKdkLmzQluvNQsttPZeCw" target="_blank" rel="noopener noreferrer">File a ticket</a></p>
            </div>
            
            <div className="projects-grid">
              <div className="project-item">
                <div className="project-icon">🌐</div>
                <div className="project-name">Portfolio Website</div>
                <div className="project-desc">React + TypeScript portfolio</div>
              </div>
              <div className="project-item">
                <div className="project-icon">🎮</div>
                <div className="project-name">Game Development</div>
                <div className="project-desc">Unity & C# projects</div>
              </div>
              <div className="project-item">
                <div className="project-icon">📱</div>
                <div className="project-name">Mobile Apps</div>
                <div className="project-desc">React Native & Flutter</div>
              </div>
              <div className="project-item">
                <div className="project-icon">🤖</div>
                <div className="project-name">AI/ML Projects</div>
                <div className="project-desc">Python & TensorFlow</div>
              </div>
              <div className="project-item">
                <div className="project-icon">💾</div>
                <div className="project-name">Backend Systems</div>
                <div className="project-desc">Node.js & Databases</div>
              </div>
              <div className="project-item">
                <div className="project-icon">🎨</div>
                <div className="project-name">UI/UX Design</div>
                <div className="project-desc">Figma & Prototyping</div>
              </div>
            </div>
          </OtherProjectsContent>
        );
      
      default:
        return null;
    }
  };



  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalTitleBar>
          <TitleText>
            {type === 'github' && 'GitHub'}
            {type === 'linkedin' && 'LinkedIn'}
            {type === 'other-projects' && 'Other Projects'}
          </TitleText>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalTitleBar>
        <ModalContent>
          {renderContent()}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default LinkModal;
