export interface DesktopIcon {
  id: string;
  name: string;
  iconPath: string;
  x: number;
  y: number;
  type: 'app' | 'folder' | 'file';
  action?: () => void;
  meta?: {
    fileUrl?: string;   // e.g. "/ChanBoswellResume.pdf"
    mime?: string;      // e.g. "application/pdf"
  };
}

export interface WindowState {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  content: React.ReactNode;
}

export interface TaskbarItem {
  id: string;
  title: string;
  isActive: boolean;
  isMinimized: boolean;
  onClick: () => void;
}

export interface MenuItem {
  label: string;
  action?: () => void;
  disabled?: boolean;
}

export interface ToolbarButton {
  label: string;
  icon?: string;
  action: () => void;
  disabled?: boolean;
}
