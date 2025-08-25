import React, { createContext, useContext, ReactNode } from 'react';

// Build-time salt for token generation
const BUILD_SALT = process.env.REACT_APP_BUILD_SALT || 'dev-salt';

interface ClassTokens {
  [componentName: string]: {
    [partName: string]: string;
  };
}

interface ClassTokenContextType {
  getToken: (componentName: string, partName: string) => string;
  tokens: ClassTokens;
}

const ClassTokenContext = createContext<ClassTokenContextType | undefined>(undefined);

export const useClassTokens = () => {
  const context = useContext(ClassTokenContext);
  if (!context) {
    throw new Error('useClassTokens must be used within a ClassTokenProvider');
  }
  return context;
};

// Generate tokens based on build environment
const generateTokens = (): ClassTokens => {
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    // Development: human-readable tokens
    return {
      Desktop: {
        root: 'Desktop__root',
        container: 'Desktop__container'
      },
      DesktopIcon: {
        root: 'DesktopIcon__root',
        container: 'DesktopIcon__container',
        image: 'DesktopIcon__image',
        text: 'DesktopIcon__text'
      },
      XpWindow: {
        root: 'XpWindow__root',
        titleBar: 'XpWindow__titleBar',
        content: 'XpWindow__content',
        controls: 'XpWindow__controls',
        closeBtn: 'XpWindow__closeBtn',
        minBtn: 'XpWindow__minBtn'
      },
      Taskbar: {
        root: 'Taskbar__root',
        startButton: 'Taskbar__startButton',
        taskButtons: 'Taskbar__taskButtons',
        tray: 'Taskbar__tray',
        clock: 'Taskbar__clock'
      },
      StartMenu: {
        root: 'StartMenu__root',
        leftPane: 'StartMenu__leftPane',
        rightPane: 'StartMenu__rightPane',
        listItem: 'StartMenu__listItem',
        avatar: 'StartMenu__avatar',
        bio: 'StartMenu__bio'
      },
      Weather: {
        root: 'Weather__root',
        icon: 'Weather__icon',
        details: 'Weather__details'
      }
    };
  } else {
    // Production: opaque tokens
    const hash = (str: string): string => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      return `c-${Math.abs(hash).toString(36).substring(0, 6)}`;
    };

    return {
      Desktop: {
        root: hash(`${BUILD_SALT}.Desktop.root`),
        container: hash(`${BUILD_SALT}.Desktop.container`)
      },
      DesktopIcon: {
        root: hash(`${BUILD_SALT}.DesktopIcon.root`),
        container: hash(`${BUILD_SALT}.DesktopIcon.container`),
        image: hash(`${BUILD_SALT}.DesktopIcon.image`),
        text: hash(`${BUILD_SALT}.DesktopIcon.text`)
      },
      XpWindow: {
        root: hash(`${BUILD_SALT}.XpWindow.root`),
        titleBar: hash(`${BUILD_SALT}.XpWindow.titleBar`),
        content: hash(`${BUILD_SALT}.XpWindow.content`),
        controls: hash(`${BUILD_SALT}.XpWindow.controls`),
        closeBtn: hash(`${BUILD_SALT}.XpWindow.closeBtn`),
        minBtn: hash(`${BUILD_SALT}.XpWindow.minBtn`)
      },
      Taskbar: {
        root: hash(`${BUILD_SALT}.Taskbar.root`),
        startButton: hash(`${BUILD_SALT}.Taskbar.startButton`),
        taskButtons: hash(`${BUILD_SALT}.Taskbar.taskButtons`),
        tray: hash(`${BUILD_SALT}.Taskbar.tray`),
        clock: hash(`${BUILD_SALT}.Taskbar.clock`)
      },
      StartMenu: {
        root: hash(`${BUILD_SALT}.StartMenu.root`),
        leftPane: hash(`${BUILD_SALT}.StartMenu.leftPane`),
        rightPane: hash(`${BUILD_SALT}.StartMenu.rightPane`),
        listItem: hash(`${BUILD_SALT}.StartMenu.listItem`),
        avatar: hash(`${BUILD_SALT}.StartMenu.avatar`),
        bio: hash(`${BUILD_SALT}.StartMenu.bio`)
      },
      Weather: {
        root: hash(`${BUILD_SALT}.Weather.root`),
        icon: hash(`${BUILD_SALT}.Weather.icon`),
        details: hash(`${BUILD_SALT}.Weather.details`)
      }
    };
  }
};

interface ClassTokenProviderProps {
  children: ReactNode;
}

export const ClassTokenProvider: React.FC<ClassTokenProviderProps> = ({ children }) => {
  const tokens = generateTokens();

  const getToken = (componentName: string, partName: string): string => {
    return tokens[componentName]?.[partName] || '';
  };

  const value: ClassTokenContextType = {
    getToken,
    tokens
  };

  return (
    <ClassTokenContext.Provider value={value}>
      {children}
    </ClassTokenContext.Provider>
  );
};
