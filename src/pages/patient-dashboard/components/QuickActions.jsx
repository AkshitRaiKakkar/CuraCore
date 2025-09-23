import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      title: 'Book Appointment',
      description: 'Schedule your next therapy session',
      icon: 'Calendar',
      color: 'bg-primary',
      textColor: 'text-primary',
      bgColor: 'bg-primary/10',
      action: () => navigate('/appointment-booking')
    },
    {
      id: 2,
      title: 'Submit Feedback',
      description: 'Rate your recent session',
      icon: 'MessageSquare',
      color: 'bg-secondary',
      textColor: 'text-secondary',
      bgColor: 'bg-secondary/10',
      action: () => handleFeedback()
    },
    {
      id: 3,
      title: 'Message Therapist',
      description: 'Contact your care team',
      icon: 'MessageCircle',
      color: 'bg-accent',
      textColor: 'text-accent',
      bgColor: 'bg-accent/10',
      action: () => handleMessage()
    },
    {
      id: 4,
      title: 'View Profile',
      description: 'Update personal information',
      icon: 'User',
      color: 'bg-success',
      textColor: 'text-success',
      bgColor: 'bg-success/10',
      action: () => navigate('/patient-profile')
    }
  ];

  const handleFeedback = () => {
    // Mock feedback submission
    alert('Feedback form would open here');
  };

  const handleMessage = () => {
    // Mock messaging system
    alert('Messaging system would open here');
  };

  return (
    <div className="bg-card rounded-lg border p-6 shadow-soft">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <p className="text-sm text-muted-foreground">Access frequently used features</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions?.map((action) => (
          <div
            key={action?.id}
            className="group cursor-pointer border rounded-lg p-4 hover:shadow-soft transition-gentle bg-surface hover:bg-muted/50"
            onClick={action?.action}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg ${action?.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                <Icon 
                  name={action?.icon} 
                  size={20} 
                  color={`var(--color-${action?.color?.replace('bg-', '')})`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium ${action?.textColor} group-hover:${action?.textColor}/80 transition-colors`}>
                  {action?.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {action?.description}
                </p>
              </div>
              <Icon 
                name="ChevronRight" 
                size={16} 
                color="var(--color-muted-foreground)"
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>
        ))}
      </div>
      {/* Emergency Contact */}
      <div className="mt-6 pt-6 border-t">
        <div className="bg-error/5 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center">
              <Icon name="Phone" size={20} color="var(--color-error)" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-error">Emergency Contact</h4>
              <p className="text-sm text-muted-foreground">24/7 clinic support available</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('tel:+911234567890')}
              iconName="Phone"
              iconPosition="left"
              iconSize={16}
              className="border-error text-error hover:bg-error hover:text-error-foreground"
            >
              Call Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;