// contexts/NotificationContext.tsx - Global notification management
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  section: string;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read'>) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  getUnreadCount: () => number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  console.log('useNotifications called, context:', context);
  if (!context) {
    console.error('useNotifications must be used within a NotificationProvider');
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  console.log('NotificationProvider rendering with children:', !!children);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New Patient Registration",
      message: "Sarah Johnson has registered as a new patient",
      time: "2 mins ago",
      type: "success",
      read: false,
      section: "patients"
    },
    {
      id: 2,
      title: "Appointment Scheduled",
      message: "New appointment scheduled for tomorrow at 10:00 AM",
      time: "15 mins ago",
      type: "info",
      read: false,
      section: "appointments"
    }
  ]);

  const addNotification = (notificationData: Omit<Notification, 'id' | 'time' | 'read'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now() + Math.random(), // Simple ID generation
      time: 'Just now',
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getUnreadCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  const value: NotificationContextType = {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    getUnreadCount
  };

  console.log('NotificationProvider providing value:', value);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};