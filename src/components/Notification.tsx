'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

interface NotificationState {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
}

type NotificationContextType = {
  showNotification: (message: string, type?: 'success' | 'error') => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationState>({
    message: '',
    type: 'success',
    visible: false,
  });

  const showNotification = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }));
    }, 3000); // Hide after 3 seconds
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification message={notification.message} type={notification.type} visible={notification.visible} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// The actual Notification component
interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
}

const Notification = ({ message, type, visible }: NotificationProps) => {
  const baseStyle: React.CSSProperties = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '15px 20px',
    borderRadius: '5px',
    color: 'white',
    zIndex: 1050,
    transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
    transform: visible ? 'translateX(0)' : 'translateX(120%)',
    opacity: visible ? 1 : 0,
  };

  const style = {
    ...baseStyle,
    backgroundColor: type === 'success' ? '#28a745' : '#dc3545', // Green for success, Red for error
  };

  return (
    <div style={style}>
      {message}
    </div>
  );
};
