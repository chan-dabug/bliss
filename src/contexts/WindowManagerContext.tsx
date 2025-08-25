import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface Window {
  id: string;
  title: string;
  content: ReactNode;
  minimized: boolean;
  z: number;
}

interface WindowManagerContextType {
  windows: Window[];
  open: (id: string, title: string, content: ReactNode) => void;
  close: (id: string) => void;
  minimize: (id: string) => void;
  focus: (id: string) => void;
  getFocusedWindow: () => Window | null;
}

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

export const useWindowManager = () => {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return context;
};

interface WindowManagerProviderProps {
  children: ReactNode;
}

export const WindowManagerProvider: React.FC<WindowManagerProviderProps> = ({ children }) => {
  const [windows, setWindows] = useState<Window[]>([]);
  const [zCounter, setZCounter] = useState(1);

  const open = useCallback((id: string, title: string, content: ReactNode) => {
    setWindows(prev => {
      // Close existing window if it exists
      const filtered = prev.filter(w => w.id !== id);
      
      // Add new window with highest z-order
      const newZ = zCounter + 1;
      setZCounter(newZ);
      
      return [...filtered, {
        id,
        title,
        content,
        minimized: false,
        z: newZ
      }];
    });
  }, [zCounter]);

  const close = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimize = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, minimized: !w.minimized } : w
    ));
  }, []);

  const focus = useCallback((id: string) => {
    setWindows(prev => {
      const newZ = zCounter + 1;
      setZCounter(newZ);
      
      return prev.map(w => 
        w.id === id ? { ...w, z: newZ, minimized: false } : w
      );
    });
  }, [zCounter]);

  const getFocusedWindow = useCallback(() => {
    if (windows.length === 0) return null;
    return windows.reduce((highest, current) => 
      current.z > highest.z ? current : highest
    );
  }, [windows]);

  const value: WindowManagerContextType = {
    windows,
    open,
    close,
    minimize,
    focus,
    getFocusedWindow
  };

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
};
