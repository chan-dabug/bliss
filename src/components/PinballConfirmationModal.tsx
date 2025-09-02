import React from 'react';
import styled from 'styled-components';

interface PinballConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
`;

const ModalContainer = styled.div`
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  border: 2px solid #4a90e2;
  border-radius: 8px;
  padding: 24px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const WarningIcon = styled.div`
  font-size: 24px;
  color: #ffd700;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: white;
`;

const ModalContent = styled.div`
  margin-bottom: 24px;
  line-height: 1.5;
`;

const WarningText = styled.p`
  margin: 0 0 16px 0;
  font-size: 14px;
  color: #e8f4fd;
`;

const InstructionsList = styled.ul`
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  color: #d1e7f7;
`;

const InstructionItem = styled.li`
  margin-bottom: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.variant === 'primary' ? `
    background-color: #4a90e2;
    color: white;
    
    &:hover {
      background-color: #357abd;
    }
    
    &:active {
      background-color: #2c5aa0;
    }
  ` : `
    background-color: transparent;
    color: #b8d4f0;
    border: 1px solid #4a90e2;
    
    &:hover {
      background-color: rgba(74, 144, 226, 0.1);
      color: white;
    }
    
    &:active {
      background-color: rgba(74, 144, 226, 0.2);
    }
  `}
`;

const PinballConfirmationModal: React.FC<PinballConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel
}) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  const handleKeyDown = React.useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  }, [onCancel]);

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <WarningIcon>⚠️</WarningIcon>
          <ModalTitle>Audio Warning</ModalTitle>
        </ModalHeader>
        
        <ModalContent>
          <WarningText>
            The Pinball game may play audio automatically. To avoid disturbing others:
          </WarningText>
          
          <InstructionsList>
            <InstructionItem>
              <strong>Mute your system</strong> using the speaker icon in the taskbar (🔊 → 🔇)
            </InstructionItem>
            <InstructionItem>
              <strong>Use headphones</strong> if you want to hear the game audio
            </InstructionItem>
            <InstructionItem>
              <strong>Close the game</strong> if audio starts unexpectedly
            </InstructionItem>
          </InstructionsList>
        </ModalContent>
        
        <ButtonContainer>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Open Pinball Game
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PinballConfirmationModal;
