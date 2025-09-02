import React from 'react';
import styled from 'styled-components';

interface DesktopProps {
  children: React.ReactNode;
}

const DesktopContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url('/r6g38aXSaQWtd1KxwJbQ-Fs5jtSVDxX3wtLHJEdqixw.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  font-family: 'Tahoma', 'Segoe UI', 'Arial', sans-serif;
`;

const Desktop: React.FC<DesktopProps> = ({ children }) => {
  const [backgroundLoaded, setBackgroundLoaded] = React.useState(false);

  React.useEffect(() => {
    const img = new Image();
    img.onload = () => setBackgroundLoaded(true);
    img.src = '/r6g38aXSaQWtd1KxwJbQ-Fs5jtSVDxX3wtLHJEdqixw.webp';
  }, []);

  return (
    <DesktopContainer 
      className="desktop"
      style={{
        backgroundColor: backgroundLoaded ? 'transparent' : '#4a90e2'
      }}
    >
      {children}
    </DesktopContainer>
  );
};

export default Desktop;
