import { useState } from "react";
import { Bell, Clock, CheckCircle, XCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface NotificationsPageProps {
  onBack: () => void;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  section: string;
}

const NotificationsPage = ({ onBack }: NotificationsPageProps) => {
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
    },
    {
      id: 3,
      title: "Treatment Completed",
      message: "Physical therapy session completed for Mike Davis",
      time: "1 hour ago",
      type: "success",
      read: true,
      section: "treatments"
    },
    {
      id: 4,
      title: "Staff Member Absent",
      message: "Dr. Taylor will be on leave from tomorrow",
      time: "2 hours ago",
      type: "warning",
      read: false,
      section: "staff"
    },
    {
      id: 5,
      title: "Equipment Maintenance",
      message: "Ultrasound equipment scheduled for maintenance",
      time: "3 hours ago",
      type: "warning",
      read: true,
      section: "treatments"
    },
    {
      id: 6,
      title: "Payment Received",
      message: "Payment received from John Anderson",
      time: "4 hours ago",
      type: "success",
      read: true,
      section: "patients"
    },
    {
      id: 7,
      title: "Appointment Cancelled",
      message: "Emma Wilson cancelled her appointment",
      time: "5 hours ago",
      type: "error",
      read: true,
      section: "appointments"
    }
  ]);

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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-warning" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Bell className="w-5 h-5 text-info" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'success':
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Success</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Warning</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary" className="bg-info/10 text-info border-info/20">Info</Badge>;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : "All notifications read"}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>All Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">{unreadCount}</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.map((notification, index) => (
            <div key={notification.id}>
              <div
                className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-200 cursor-pointer hover:bg-accent/50 ${
                  !notification.read ? 'bg-primary/5 border border-primary/20' : 'border border-transparent'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {getNotificationBadge(notification.type)}
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {notification.time}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {notification.section}
                    </Badge>
                  </div>
                </div>
              </div>
              {index < notifications.length - 1 && <Separator className="my-2" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;