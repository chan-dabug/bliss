import React, { useState } from 'react';
import styled from 'styled-components';
import { DesktopIcon as DesktopIconType } from '../types';
import LinkModal from './LinkModal';
import WelcomeModal from './WelcomeModal';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  desktopIcons: DesktopIconType[];
  onIconClick: (icon: DesktopIconType) => void;
}

const StartMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;

const StartMenuContainer = styled.div`
  position: fixed;
  bottom: 42px;
  left: 0;
  width: 400px;
  height: 500px;
  display: flex;
  border: 1px solid #A0A0A0;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-family: 'Tahoma', 'Segoe UI', 'Arial', sans-serif;
  z-index: 1000;
`;

const LeftPane = styled.div`
  width: 200px;
  background: white;
  border-right: 1px solid #A0A0A0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E0E0E0;
`;

const UserAvatar = styled.div`
  font-size: 32px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #000;
  margin-bottom: 4px;
`;

const UserTitle = styled.div`
  font-size: 11px;
  color: #666;
`;

const QuickLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const QuickLink = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  cursor: pointer;
  border-radius: 3px;
  transition: background-color 0.1s ease;
  
  &:hover {
    background-color: #E6F3FF;
  }
`;

const LinkIcon = styled.span`
  font-size: 16px;
`;

const LinkText = styled.span`
  font-size: 12px;
  color: #0066CC;
  font-weight: bold;
`;

const RightPane = styled.div`
  width: 200px;
  background: linear-gradient(to bottom, #0066CC 0%, #0052A3 50%, #003D7A 100%);
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const ProgramsHeader = styled.div`
  color: white;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const ProgramsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ProgramItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  cursor: pointer;
  border-radius: 3px;
  transition: background-color 0.1s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ProgramIcon = styled.span`
  font-size: 14px;
`;

const ProgramName = styled.span`
  color: white;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StartMenu: React.FC<StartMenuProps> = ({ 
  isOpen, 
  onClose, 
  desktopIcons, 
  onIconClick 
}) => {
  const [linkModalType, setLinkModalType] = useState<'email' | 'github' | 'linkedin' | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  if (!isOpen) return null;

  const handleIconClick = (icon: DesktopIconType) => {
    onIconClick(icon);
    onClose();
  };

  const handleLinkClick = (type: 'email' | 'github' | 'linkedin') => {
    setLinkModalType(type);
  };

  const handleCloseLinkModal = () => {
    setLinkModalType(null);
  };

  const handleWelcomeClick = () => {
    setShowWelcomeModal(true);
  };

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  return (
    <>
      <StartMenuOverlay onClick={onClose}>
        <StartMenuContainer onClick={(e) => e.stopPropagation()}>
          {/* Left Pane - White background with bio */}
          <LeftPane>
            <UserSection>
              <UserAvatar>👨🏿‍🔧</UserAvatar>
              <UserInfo>
                <UserName>Chan Boswell</UserName>
                <UserTitle>Software Developer</UserTitle>
              </UserInfo>
            </UserSection>
            
            <QuickLinks>
              <QuickLink onClick={handleWelcomeClick}>
                <LinkIcon>👋</LinkIcon>
                <LinkText>Welcome</LinkText>
              </QuickLink>
              <QuickLink onClick={() => handleLinkClick('email')}>
                <LinkIcon>📧</LinkIcon>
                <LinkText>Email</LinkText>
              </QuickLink>
            </QuickLinks>
          </LeftPane>

          {/* Right Pane - Blue background with program list */}
          <RightPane>
            <ProgramsHeader>Programs</ProgramsHeader>
            <ProgramsList>
              {desktopIcons.map((icon) => (
                <ProgramItem 
                  key={icon.id}
                  onClick={() => handleIconClick(icon)}
                >
                  <ProgramIcon>{icon.type === 'folder' ? '📁' : '⚙️'}</ProgramIcon>
                  <ProgramName>{icon.name}</ProgramName>
                </ProgramItem>
              ))}
            </ProgramsList>
          </RightPane>
        </StartMenuContainer>
      </StartMenuOverlay>

      {/* Link Modal */}
      <LinkModal 
        isOpen={linkModalType !== null}
        onClose={handleCloseLinkModal}
        type={linkModalType || 'email'}
      />

      {/* Welcome Modal */}
      <WelcomeModal 
        isOpen={showWelcomeModal}
        onClose={handleCloseWelcomeModal}
      />
    </>
  );
};

export default StartMenu;
