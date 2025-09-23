import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const [inventoryAlerts, setInventoryAlerts] = useState(3);
  const [emergencyContacts] = useState([
    { name: 'Dr. Rajesh Gupta', role: 'Senior Physician', phone: '+91 98765 43210' },
    { name: 'Nurse Station', role: 'Emergency Care', phone: '+91 98765 43211' },
    { name: 'Clinic Manager', role: 'Administration', phone: '+91 98765 43212' }
  ]);

  const quickActionItems = [
    {
      id: 'start-session',
      title: 'Start Session',
      description: 'Begin new therapy session',
      icon: 'Play',
      color: 'success',
      action: () => console.log('Starting session')
    },
    {
      id: 'complete-session',
      title: 'Complete Session',
      description: 'Finish current session',
      icon: 'CheckCircle',
      color: 'primary',
      action: () => console.log('Completing session')
    },
    {
      id: 'emergency-contact',
      title: 'Emergency Contact',
      description: 'Quick access to emergency contacts',
      icon: 'Phone',
      color: 'error',
      action: () => console.log('Emergency contact')
    },
    {
      id: 'inventory-log',
      title: 'Log Inventory Usage',
      description: 'Record materials used',
      icon: 'Package',
      color: 'warning',
      badge: inventoryAlerts,
      action: () => console.log('Logging inventory')
    },
    {
      id: 'patient-notes',
      title: 'Quick Notes',
      description: 'Add patient observations',
      icon: 'FileText',
      color: 'secondary',
      action: () => console.log('Adding notes')
    },
    {
      id: 'schedule-followup',
      title: 'Schedule Follow-up',
      description: 'Book next appointment',
      icon: 'Calendar',
      color: 'accent',
      action: () => console.log('Scheduling follow-up')
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      success: 'bg-success/10 text-success hover:bg-success/20 border-success/20',
      primary: 'bg-primary/10 text-primary hover:bg-primary/20 border-primary/20',
      error: 'bg-error/10 text-error hover:bg-error/20 border-error/20',
      warning: 'bg-warning/10 text-warning hover:bg-warning/20 border-warning/20',
      secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20 border-secondary/20',
      accent: 'bg-accent/10 text-accent hover:bg-accent/20 border-accent/20'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const handleEmergencyContact = (contact) => {
    console.log('Calling emergency contact:', contact);
    // In a real app, this would initiate a call or show contact details
  };

  return (
    <div className="bg-card rounded-lg border shadow-soft">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Zap" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
              <p className="text-sm text-muted-foreground">Efficient clinical workflow tools</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="Settings" iconSize={16}>
            Customize
          </Button>
        </div>
      </div>
      <div className="p-6">
        {/* Quick Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {quickActionItems?.map((item) => (
            <div
              key={item?.id}
              className={`relative p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-soft ${getColorClasses(item?.color)}`}
              onClick={item?.action}
            >
              {item?.badge && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center text-xs font-medium">
                  {item?.badge}
                </div>
              )}
              
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-card rounded-lg">
                  <Icon name={item?.icon} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground mb-1">{item?.title}</h3>
                  <p className="text-sm text-muted-foreground">{item?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Contacts Section */}
        <div className="border-t pt-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="AlertTriangle" size={18} color="var(--color-error)" />
            <h3 className="font-medium text-foreground">Emergency Contacts</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {emergencyContacts?.map((contact, index) => (
              <div
                key={index}
                className="p-3 bg-error/5 border border-error/20 rounded-lg hover:bg-error/10 transition-colors cursor-pointer"
                onClick={() => handleEmergencyContact(contact)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground text-sm">{contact?.name}</div>
                    <div className="text-xs text-muted-foreground">{contact?.role}</div>
                    <div className="text-xs text-error font-mono mt-1">{contact?.phone}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-error hover:bg-error/20"
                    iconName="Phone"
                    iconSize={14}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Alerts */}
        {inventoryAlerts > 0 && (
          <div className="border-t pt-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="Package" size={18} color="var(--color-warning)" />
                <h3 className="font-medium text-foreground">Inventory Alerts</h3>
                <span className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
                  {inventoryAlerts} items
                </span>
              </div>
              <Button variant="outline" size="sm" iconName="Eye" iconSize={14}>
                View All
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-warning/5 border border-warning/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="AlertCircle" size={16} color="var(--color-warning)" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Sesame Oil</div>
                    <div className="text-xs text-muted-foreground">Low stock - 2 bottles remaining</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" iconName="Plus" iconSize={14}>
                  Reorder
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-warning/5 border border-warning/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="AlertCircle" size={16} color="var(--color-warning)" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Cotton Towels</div>
                    <div className="text-xs text-muted-foreground">Need replacement - 5 pieces left</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" iconName="Plus" iconSize={14}>
                  Reorder
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickActions;