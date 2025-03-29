
import { useState } from "react";
import { useToast } from "./use-toast";

type Notification = {
  id: string;
  title: string;
  description: string;
  read: boolean;
  timestamp: Date;
};

export function useNotifications() {
  // This would typically fetch from an API, but for now we'll use static data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Student Registered",
      description: "John Doe has registered for Web Development",
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
    {
      id: "2",
      title: "Low Attendance Alert",
      description: "Emma Johnson's attendance has dropped below 80%",
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 120) // 2 hours ago
    },
    {
      id: "3",
      title: "Weekly Report Available",
      description: "Your weekly attendance report is ready to view",
      read: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
    },
    {
      id: "4",
      title: "System Update Completed",
      description: "AI Recognition system has been updated to v2.5",
      read: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48) // 2 days ago
    },
    {
      id: "5",
      title: "New Course Added",
      description: "Machine Learning 101 has been added to the curriculum",
      read: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72) // 3 days ago
    }
  ]);

  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: "All notifications marked as read",
      description: "You have no new notifications",
      duration: 3000,
    });
  };

  const addNotification = (title: string, description: string) => {
    const newNotification: Notification = {
      id: String(Date.now()),
      title,
      description,
      read: false,
      timestamp: new Date()
    };
    
    setNotifications([newNotification, ...notifications]);
    
    toast({
      title: "New notification",
      description: title,
      duration: 3000,
    });
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification
  };
}
