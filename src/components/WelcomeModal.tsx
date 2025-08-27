import React from 'react';
import styled from 'styled-components';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
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
  z-index: 9999;
`;

const ModalContainer = styled.div`
  background: white;
  border: 2px solid #A0A0A0;
  border-radius: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 500px;
  max-height: 80vh;
  overflow: hidden;
  font-family: 'Tahoma', 'Segoe UI', 'Arial', sans-serif;
`;

const TitleBar = styled.div`
  background: linear-gradient(to bottom, #3f76c3 0%, #2b579a 100%);
  color: white;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: move;
  user-select: none;
  touch-action: none;
  -webkit-user-select: none;
`;

const TitleText = styled.span`
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  background: #C0C0C0;
  border: 1px solid #808080;
  border-radius: 0;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #000;
  
  &:hover {
    background-color: #E81123;
  }
`;

const ContentArea = styled.div`
  padding: 20px;
  max-height: calc(80vh - 40px);
  overflow-y: auto;
`;

const WelcomeImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  display: block;
  margin: 0 auto 20px auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const WelcomeTitle = styled.h1`
  font-size: 24px;
  color: #0066CC;
  margin-bottom: 16px;
  text-align: center;
  font-weight: bold;
`;

const WelcomeText = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 16px;
`;

const NoteBox = styled.div`
  background: #FFF3CD;
  border: 1px solid #FFEAA7;
  border-radius: 4px;
  padding: 12px;
  margin-top: 20px;
`;

const NoteTitle = styled.div`
  font-weight: bold;
  color: #856404;
  margin-bottom: 8px;
  font-size: 12px;
`;

const NoteText = styled.div`
  font-size: 12px;
  color: #856404;
  line-height: 1.4;
`;

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <TitleBar>
          <TitleText>Welcome to Bliss Portfolio</TitleText>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </TitleBar>
        
        <ContentArea>
          <WelcomeImage 
            src="/ItMe.png" 
            alt="Chan Boswell - Open to Work"
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          
          <WelcomeTitle>Hello World! Welcome to my web portfolio 🙂</WelcomeTitle>
          
          <WelcomeText>
            I had a lot of fun designing this page, inspired by the Windows XP (2001) that ran on my mom's HP Pavilion.
            Click around for little asides and to learn more about my background — enjoy!
          </WelcomeText>
          
          <NoteBox>
            <NoteTitle>Note:</NoteTitle>
            <NoteText>
              Mobile optimizations are still in progress. For the best experience, please navigate using the Start button for now.
            </NoteText>
          </NoteBox>
        </ContentArea>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default WelcomeModal;
