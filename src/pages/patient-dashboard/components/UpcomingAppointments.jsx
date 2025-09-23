import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const UpcomingAppointments = () => {
  const navigate = useNavigate();

  const appointments = [
    {
      id: 1,
      date: '2024-03-22',
      time: '10:00 AM',
      therapist: 'Dr. Priya Sharma',
      treatment: 'Abhyanga Massage',
      type: 'therapy',
      status: 'confirmed',
      duration: '60 min',
      room: 'Room 3'
    },
    {
      id: 2,
      date: '2024-03-25',
      time: '2:30 PM',
      therapist: 'Dr. Rajesh Kumar',
      treatment: 'Shirodhara',
      type: 'therapy',
      status: 'confirmed',
      duration: '45 min',
      room: 'Room 1'
    },
    {
      id: 3,
      date: '2024-03-28',
      time: '11:15 AM',
      therapist: 'Dr. Priya Sharma',
      treatment: 'Follow-up Consultation',
      type: 'consultation',
      status: 'pending',
      duration: '30 min',
      room: 'Consultation Room'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'cancelled':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'therapy':
        return 'Sparkles';
      case 'consultation':
        return 'MessageCircle';
      default:
        return 'Calendar';
    }
  };

  const handleReschedule = (appointmentId) => {
    navigate('/appointment-booking', { state: { rescheduleId: appointmentId } });
  };

  const handleViewDetails = (appointmentId) => {
    // Navigate to appointment details or show modal
    console.log('View details for appointment:', appointmentId);
  };

  return (
    <div className="bg-card rounded-lg border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Upcoming Appointments</h3>
          <p className="text-sm text-muted-foreground">Your scheduled sessions and consultations</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/appointment-booking')}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          Book New
        </Button>
      </div>
      <div className="space-y-4">
        {appointments?.map((appointment) => (
          <div
            key={appointment?.id}
            className="border rounded-lg p-4 hover:shadow-soft transition-gentle bg-surface"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon 
                    name={getTypeIcon(appointment?.type)} 
                    size={18} 
                    color="var(--color-primary)" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground truncate">
                      {appointment?.treatment}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment?.status)}`}>
                      {appointment?.status?.charAt(0)?.toUpperCase() + appointment?.status?.slice(1)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Icon name="Calendar" size={14} className="mr-1" />
                      {new Date(appointment.date)?.toLocaleDateString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Icon name="Clock" size={14} className="mr-1" />
                      {appointment?.time} • {appointment?.duration}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Icon name="User" size={14} className="mr-1" />
                      {appointment?.therapist}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Icon name="MapPin" size={14} className="mr-1" />
                      {appointment?.room}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 ml-4">
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => handleViewDetails(appointment?.id)}
                  iconName="Eye"
                  iconSize={14}
                >
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => handleReschedule(appointment?.id)}
                  iconName="Calendar"
                  iconSize={14}
                >
                  Reschedule
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {appointments?.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Icon name="Calendar" size={24} color="var(--color-muted-foreground)" />
          </div>
          <h4 className="font-medium text-foreground mb-2">No Upcoming Appointments</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Schedule your next therapy session or consultation
          </p>
          <Button
            variant="default"
            onClick={() => navigate('/appointment-booking')}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Book Appointment
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;