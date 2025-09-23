import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TodaySchedule = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const todayAppointments = [
    {
      id: 1,
      patientName: "Rajesh Kumar",
      treatmentType: "Abhyanga",
      time: "09:00 AM",
      duration: "60 min",
      status: "upcoming",
      preparationNotes: "Patient prefers warm oil, avoid head massage",
      patientId: "P001",
      sessionNumber: 5,
      totalSessions: 14
    },
    {
      id: 2,
      patientName: "Priya Sharma",
      treatmentType: "Shirodhara",
      time: "10:30 AM",
      duration: "45 min",
      status: "in-progress",
      preparationNotes: "First session, explain procedure thoroughly",
      patientId: "P002",
      sessionNumber: 1,
      totalSessions: 7
    },
    {
      id: 3,
      patientName: "Amit Patel",
      treatmentType: "Panchakarma Detox",
      time: "12:00 PM",
      duration: "90 min",
      status: "upcoming",
      preparationNotes: "Continue with current oil blend, monitor BP",
      patientId: "P003",
      sessionNumber: 8,
      totalSessions: 21
    },
    {
      id: 4,
      patientName: "Sunita Reddy",
      treatmentType: "Udvartana",
      time: "02:00 PM",
      duration: "75 min",
      status: "upcoming",
      preparationNotes: "Sensitive skin, use gentle pressure",
      patientId: "P004",
      sessionNumber: 3,
      totalSessions: 10
    },
    {
      id: 5,
      patientName: "Vikram Singh",
      treatmentType: "Nasya",
      time: "03:30 PM",
      duration: "30 min",
      status: "completed",
      preparationNotes: "Regular patient, standard procedure",
      patientId: "P005",
      sessionNumber: 12,
      totalSessions: 14
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'in-progress':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'upcoming':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'upcoming':
        return 'Calendar';
      default:
        return 'Circle';
    }
  };

  const handleStartSession = (appointment) => {
    console.log('Starting session for:', appointment?.patientName);
  };

  const handleViewHistory = (patientId) => {
    console.log('Viewing history for patient:', patientId);
  };

  return (
    <div className="bg-card rounded-lg border shadow-soft">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Calendar" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Today's Schedule</h2>
              <p className="text-sm text-muted-foreground">
                {new Date()?.toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {todayAppointments?.length} appointments
            </span>
            <Button variant="outline" size="sm" iconName="RefreshCw" iconSize={16}>
              Refresh
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {todayAppointments?.map((appointment) => (
            <div
              key={appointment?.id}
              className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-soft ${
                selectedAppointment?.id === appointment?.id ? 'ring-2 ring-primary/20 border-primary/30' : ''
              }`}
              onClick={() => setSelectedAppointment(appointment)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-foreground">{appointment?.patientName}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(appointment?.status)}`}>
                      <Icon name={getStatusIcon(appointment?.status)} size={12} className="inline mr-1" />
                      {appointment?.status?.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Clock" size={14} />
                      <span>{appointment?.time} ({appointment?.duration})</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Activity" size={14} />
                      <span>{appointment?.treatmentType}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="BarChart3" size={14} />
                      <span>Session {appointment?.sessionNumber}/{appointment?.totalSessions}</span>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-3 rounded-md mb-3">
                    <div className="flex items-start space-x-2">
                      <Icon name="FileText" size={14} className="mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Preparation Notes:</p>
                        <p className="text-sm text-foreground">{appointment?.preparationNotes}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {appointment?.status === 'upcoming' && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleStartSession(appointment)}
                        iconName="Play"
                        iconPosition="left"
                        iconSize={14}
                      >
                        Start Session
                      </Button>
                    )}
                    {appointment?.status === 'in-progress' && (
                      <Button
                        variant="warning"
                        size="sm"
                        iconName="Pause"
                        iconPosition="left"
                        iconSize={14}
                      >
                        In Progress
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewHistory(appointment?.patientId)}
                      iconName="History"
                      iconPosition="left"
                      iconSize={14}
                    >
                      History
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MessageSquare"
                      iconSize={14}
                    >
                      Notes
                    </Button>
                  </div>
                </div>

                <div className="ml-4 flex flex-col items-end space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {appointment?.patientName?.split(' ')?.map(n => n?.[0])?.join('')}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    ID: {appointment?.patientId}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {todayAppointments?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Calendar" size={24} color="var(--color-muted-foreground)" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No appointments today</h3>
            <p className="text-muted-foreground mb-4">You have a free day ahead!</p>
            <Button variant="outline" iconName="Plus" iconPosition="left">
              Schedule Appointment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaySchedule;