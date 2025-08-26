import React from 'react';
import styled from 'styled-components';

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'email' | 'github' | 'linkedin' | 'other-projects';
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

const EmailContent = styled.div`
  text-align: center;
  
  h2 {
    color: #0066CC;
    margin-bottom: 20px;
  }
  
  .email-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .form-group {
    text-align: left;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #A0A0A0;
    border-radius: 3px;
    font-family: 'Tahoma', 'Segoe UI', 'Arial', sans-serif;
    font-size: 12px;
  }
  
  .form-group textarea {
    height: 100px;
    resize: vertical;
  }
  
  .send-button {
    background: #0066CC;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 3px;
    cursor: pointer;
    font-weight: bold;
    font-size: 12px;
    transition: background-color 0.1s ease;
    
    &:hover {
      background: #0052A3;
    }
  }
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
  }
  
  .github-links {
    margin-top: 20px;
  }
  
  .github-link {
    display: inline-block;
    background: #333;
    color: white;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 3px;
    margin: 5px;
    font-size: 12px;
    transition: background-color 0.1s ease;
    
    &:hover {
      background: #555;
    }
  }
`;

const LinkedInContent = styled.div`
  text-align: center;
  
  h2 {
    color: #0077B5;
    margin-bottom: 20px;
  }
  
  .profile-section {
    background: white;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 20px;
    text-align: left;
  }
  
  .profile-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .profile-avatar {
    width: 60px;
    height: 60px;
    background: #0077B5;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
  }
  
  .profile-info h3 {
    color: #333;
    margin-bottom: 5px;
  }
  
  .profile-info p {
    color: #666;
    font-size: 12px;
    margin: 0;
  }
  
  .skills-section {
    margin-top: 20px;
  }
  
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
    margin-top: 15px;
  }
  
  .skill-tag {
    background: #E8F4FD;
    color: #0077B5;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 11px;
    text-align: center;
    border: 1px solid #B3D9F2;
  }
  
  .connect-button {
    background: #0077B5;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 3px;
    cursor: pointer;
    font-weight: bold;
    font-size: 12px;
    margin-top: 20px;
    transition: background-color 0.1s ease;
    
    &:hover {
      background: #005885;
    }
  }
  
  .experience-item,
  .education-item {
    background: white;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .exp-header {
    margin-bottom: 10px;
  }
  
  .exp-title {
    font-size: 14px;
    font-weight: bold;
    color: #0077B5;
    margin-bottom: 4px;
  }
  
  .exp-company {
    font-size: 12px;
    color: #333;
    font-weight: 500;
    margin-bottom: 2px;
  }
  
  .exp-duration {
    font-size: 11px;
    color: #666;
    font-style: italic;
  }
  
  .exp-description {
    font-size: 11px;
    color: #555;
    line-height: 1.4;
  }
  
  .education-item {
    text-align: center;
  }
  
  .edu-degree {
    font-size: 13px;
    font-weight: bold;
    color: #0077B5;
    margin-bottom: 5px;
  }
  
  .edu-school {
    font-size: 12px;
    color: #333;
    margin-bottom: 3px;
  }
  
  .edu-year {
    font-size: 11px;
    color: #666;
    font-style: italic;
  }
`;

const OtherProjectsContent = styled.div`
  text-align: center;
  
  h2 {
    color: #2b579a;
    margin-bottom: 20px;
  }
  
  .projects-header {
    background: white;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .projects-header p {
    margin: 0;
    font-size: 12px;
    color: #333;
  }
  
  .projects-header a {
    color: #0066CC;
    text-decoration: none;
    font-weight: bold;
  }
  
  .projects-header a:hover {
    text-decoration: underline;
  }
  
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-top: 20px;
  }
  
  .project-item {
    background: white;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    padding: 15px;
    text-align: center;
    transition: transform 0.1s ease, box-shadow 0.1s ease;
    cursor: pointer;
  }
  
  .project-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
      case 'email':
        return (
          <EmailContent>
            <h2>📧 Send Email</h2>
            <div className="email-form">
              <div className="form-group">
                <label>From:</label>
                <input type="email" placeholder="your.email@example.com" />
              </div>
              <div className="form-group">
                <label>Subject:</label>
                <input type="text" placeholder="Message subject" />
              </div>
              <div className="form-group">
                <label>Message:</label>
                <textarea placeholder="Type your message here..."></textarea>
              </div>
              <button className="send-button">Send Email</button>
            </div>
          </EmailContent>
        );
      
      case 'github':
        return (
          <GitHubContent>
            <h2>🐙 GitHub Profile</h2>
            <div className="github-stats">
              <div className="stat-card">
                <div className="stat-number">42</div>
                <div className="stat-label">Repositories</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">1.2k</div>
                <div className="stat-label">Stars</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">156</div>
                <div className="stat-label">Followers</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">89</div>
                <div className="stat-label">Following</div>
              </div>
            </div>
            <div className="github-links">
              <a href="https://github.com/chanboswell" className="github-link" target="_blank" rel="noopener noreferrer">
                View Profile
              </a>
              <a href="https://github.com/chanboswell?tab=repositories" className="github-link" target="_blank" rel="noopener noreferrer">
                Repositories
              </a>
            </div>
          </GitHubContent>
        );
      
      case 'linkedin':
        return (
          <LinkedInContent>
            <h2>💼 LinkedIn Profile</h2>
            <div className="profile-section">
              <div className="profile-header">
                <div className="profile-avatar">👤</div>
                <div className="profile-info">
                  <h3>Chan Boswell</h3>
                  <p>Software Developer</p>
                  <p>San Francisco Bay Area</p>
                </div>
              </div>
              <div className="skills-section">
                <h4>Top Skills</h4>
                <div className="skills-grid">
                  <div className="skill-tag">React</div>
                  <div className="skill-tag">TypeScript</div>
                  <div className="skill-tag">Node.js</div>
                  <div className="skill-tag">Python</div>
                  <div className="skill-tag">AWS</div>
                  <div className="skill-tag">DevOps</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <h4>Professional Experience</h4>
              <div className="experience-item">
                <div className="exp-header">
                  <div className="exp-title">Software Developer</div>
                  <div className="exp-company">Tech Company Inc.</div>
                  <div className="exp-duration">2022 - Present</div>
                </div>
                <div className="exp-description">
                  Full-stack development with React, TypeScript, and Node.js. 
                  Building scalable web applications and contributing to open source projects.
                </div>
              </div>
              
              <div className="experience-item">
                <div className="exp-header">
                  <div className="exp-title">Junior Developer</div>
                  <div className="exp-company">StartupXYZ</div>
                  <div className="exp-duration">2020 - 2022</div>
                </div>
                <div className="exp-description">
                  Frontend development and UI/UX improvements. 
                  Collaborated with design team on user experience enhancements.
                </div>
              </div>
              
              <h4>Education</h4>
              <div className="education-item">
                <div className="edu-degree">Bachelor of Science in Computer Science</div>
                <div className="edu-school">University of Technology</div>
                <div className="edu-year">2016 - 2020</div>
              </div>
              
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <a 
                  href="https://www.linkedin.com/in/chnbzz/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="connect-button"
                  style={{ textDecoration: 'none', display: 'inline-block' }}
                >
                  View Full Profile on LinkedIn
                </a>
              </div>
            </div>
          </LinkedInContent>
        );
      
      case 'other-projects':
        return (
          <OtherProjectsContent>
            <h2>📁 Other Projects</h2>
            <div className="projects-header">
              <p>Here are some other things I've been working on! Notice a bug 🐛? <a href="https://google.com" target="_blank" rel="noopener noreferrer">File a ticket</a></p>
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
            {type === 'email' && '📧 Email'}
            {type === 'github' && '🐙 GitHub'}
            {type === 'linkedin' && '💼 LinkedIn'}
            {type === 'other-projects' && '📁 Other Projects'}
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
