import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'patient_update',
      title: 'Patient Progress Update',
      message: 'Priya Sharma reported significant improvement in mobility after session 3',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      priority: 'medium',
      read: false,
      patientId: 'P002',
      patientName: 'Priya Sharma'
    },
    {
      id: 2,
      type: 'schedule_change',
      title: 'Schedule Change Request',
      message: 'Rajesh Kumar requested to reschedule tomorrow\'s 10:00 AM appointment to 2:00 PM',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      priority: 'high',
      read: false,
      patientId: 'P001',
      patientName: 'Rajesh Kumar'
    },
    {
      id: 3,
      type: 'admin_message',
      title: 'New Treatment Protocol',
      message: 'Updated Panchakarma guidelines have been added to the system. Please review before next session.',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      priority: 'medium',
      read: false,
      sender: 'Dr. Rajesh Gupta'
    },
    {
      id: 4,
      type: 'inventory_alert',
      title: 'Low Inventory Alert',
      message: 'Sesame oil stock is running low. Only 2 bottles remaining.',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      priority: 'high',
      read: true,
      category: 'inventory'
    },
    {
      id: 5,
      type: 'patient_feedback',
      title: 'New Patient Feedback',
      message: 'Amit Patel submitted feedback for yesterday\'s session with 5-star rating',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      priority: 'low',
      read: true,
      patientId: 'P003',
      patientName: 'Amit Patel'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    const iconMap = {
      patient_update: 'User',
      schedule_change: 'Calendar',
      admin_message: 'MessageSquare',
      inventory_alert: 'Package',
      patient_feedback: 'Star'
    };
    return iconMap?.[type] || 'Bell';
  };

  const getPriorityColor = (priority) => {
    const colorMap = {
      high: 'text-error',
      medium: 'text-warning',
      low: 'text-muted-foreground'
    };
    return colorMap?.[priority] || 'text-muted-foreground';
  };

  const getPriorityBg = (priority) => {
    const bgMap = {
      high: 'bg-error/10 border-error/20',
      medium: 'bg-warning/10 border-warning/20',
      low: 'bg-muted/10 border-border'
    };
    return bgMap?.[priority] || 'bg-muted/10 border-border';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev?.map(notif =>
        notif?.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev?.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev?.filter(notif => notif?.id !== id));
  };

  const filteredNotifications = notifications?.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif?.read;
    if (filter === 'high') return notif?.priority === 'high';
    return notif?.type === filter;
  });

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <div className="bg-card rounded-lg border shadow-soft">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative p-2 bg-primary/10 rounded-lg">
              <Icon name="Bell" size={20} color="var(--color-primary)" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
              <p className="text-sm text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} unread messages` : 'All caught up!'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                iconName="CheckCheck"
                iconSize={14}
              >
                Mark All Read
              </Button>
            )}
            <Button variant="ghost" size="sm" iconName="Settings" iconSize={16}>
              Settings
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All ({notifications?.length})
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </Button>
          <Button
            variant={filter === 'high' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('high')}
          >
            High Priority
          </Button>
          <Button
            variant={filter === 'patient_update' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('patient_update')}
          >
            Patient Updates
          </Button>
          <Button
            variant={filter === 'schedule_change' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('schedule_change')}
          >
            Schedule Changes
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredNotifications?.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Bell" size={24} color="var(--color-muted-foreground)" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                {filter === 'all' ? 'You\'re all caught up!' : `No ${filter} notifications found.`}
              </p>
            </div>
          ) : (
            filteredNotifications?.map((notification) => (
              <div
                key={notification?.id}
                className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-soft ${
                  notification?.read ? 'bg-muted/20' : 'bg-card'
                } ${getPriorityBg(notification?.priority)}`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${notification?.read ? 'bg-muted' : 'bg-primary/10'}`}>
                    <Icon 
                      name={getNotificationIcon(notification?.type)} 
                      size={16} 
                      color={notification?.read ? 'var(--color-muted-foreground)' : 'var(--color-primary)'} 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className={`font-medium ${notification?.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {notification?.title}
                      </h4>
                      <div className="flex items-center space-x-2 ml-2">
                        <span className={`text-xs ${getPriorityColor(notification?.priority)}`}>
                          {notification?.priority?.toUpperCase()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(notification?.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    <p className={`text-sm mb-3 ${notification?.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {notification?.message}
                    </p>
                    
                    {(notification?.patientName || notification?.sender) && (
                      <div className="flex items-center space-x-2 mb-3">
                        <Icon name="User" size={12} color="var(--color-muted-foreground)" />
                        <span className="text-xs text-muted-foreground">
                          {notification?.patientName || notification?.sender}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      {!notification?.read && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsRead(notification?.id)}
                          iconName="Check"
                          iconSize={12}
                        >
                          Mark Read
                        </Button>
                      )}
                      
                      {notification?.type === 'schedule_change' && (
                        <Button
                          variant="default"
                          size="sm"
                          iconName="Calendar"
                          iconSize={12}
                        >
                          View Schedule
                        </Button>
                      )}
                      
                      {notification?.patientId && (
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="User"
                          iconSize={12}
                        >
                          View Patient
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification?.id)}
                        iconName="Trash2"
                        iconSize={12}
                        className="text-error hover:bg-error/10"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;