import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: 'Appointment Reminder',
      message: 'Your Abhyanga massage session is scheduled for tomorrow at 10:00 AM with Dr. Priya Sharma.',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'treatment',
      title: 'Treatment Update',
      message: 'Your treatment progress has been updated. You have completed 75% of your Panchakarma program.',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'feedback',
      title: 'Feedback Request',
      message: 'Please rate your recent Shirodhara session with Dr. Rajesh Kumar to help us improve our services.',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'announcement',
      title: 'Clinic Announcement',
      message: 'Our clinic will be closed on March 25th for Holi festival. Emergency services will be available.',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      read: true,
      priority: 'medium'
    },
    {
      id: 5,
      type: 'payment',
      title: 'Payment Confirmation',
      message: 'Your payment of ₹2,500 for the therapy session has been successfully processed.',
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      read: true,
      priority: 'low'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'appointment':
        return 'Calendar';
      case 'treatment':
        return 'Activity';
      case 'feedback':
        return 'MessageSquare';
      case 'announcement':
        return 'Megaphone';
      case 'payment':
        return 'CreditCard';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error bg-error/10 border-error/20';
    switch (type) {
      case 'appointment':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'treatment':
        return 'text-success bg-success/10 border-success/20';
      case 'feedback':
        return 'text-accent bg-accent/10 border-accent/20';
      case 'announcement':
        return 'text-secondary bg-secondary/10 border-secondary/20';
      case 'payment':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error text-error-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev?.map(notification =>
        notification?.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev?.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev?.filter(notification => notification?.id !== id));
  };

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'unread') return !notification?.read;
    if (filter === 'read') return notification?.read;
    return true;
  });

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-card rounded-lg border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          <p className="text-sm text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All notifications read'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              iconName="CheckCheck"
              iconPosition="left"
              iconSize={16}
            >
              Mark All Read
            </Button>
          )}
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-4 bg-muted rounded-lg p-1">
        {['all', 'unread', 'read']?.map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === filterType
                ? 'bg-card text-foreground shadow-soft'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {filterType?.charAt(0)?.toUpperCase() + filterType?.slice(1)}
            {filterType === 'unread' && unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Notifications List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications?.length > 0 ? (
          filteredNotifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`border rounded-lg p-4 transition-gentle ${
                notification?.read ? 'bg-surface' : 'bg-card shadow-soft'
              } ${getNotificationColor(notification?.type, notification?.priority)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    notification?.read ? 'opacity-60' : ''
                  }`}>
                    <Icon 
                      name={getNotificationIcon(notification?.type)} 
                      size={16} 
                      color="currentColor"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`font-medium ${notification?.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {notification?.title}
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityBadge(notification?.priority)}`}>
                        {notification?.priority}
                      </span>
                      {!notification?.read && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    <p className={`text-sm leading-relaxed ${
                      notification?.read ? 'text-muted-foreground' : 'text-foreground'
                    }`}>
                      {notification?.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(notification?.timestamp)}
                      </span>
                      <div className="flex items-center space-x-1">
                        {!notification?.read && (
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => markAsRead(notification?.id)}
                            iconName="Check"
                            iconSize={12}
                          >
                            Mark Read
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => deleteNotification(notification?.id)}
                          iconName="X"
                          iconSize={12}
                          className="text-error hover:text-error hover:bg-error/10"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Icon name="Bell" size={24} color="var(--color-muted-foreground)" />
            </div>
            <h4 className="font-medium text-foreground mb-2">No Notifications</h4>
            <p className="text-sm text-muted-foreground">
              {filter === 'unread' ? 'All notifications have been read' : 'You have no notifications'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;