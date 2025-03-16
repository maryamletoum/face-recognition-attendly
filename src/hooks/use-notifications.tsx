
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

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead
  };
}
