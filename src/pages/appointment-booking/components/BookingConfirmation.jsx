import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const BookingConfirmation = ({ bookingData, onClose, onViewDashboard }) => {
  if (!bookingData) return null;

  const { date, slot, treatment, contactDetails, totalCost, bookingId } = bookingData;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg shadow-elevated max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Success Header */}
        <div className="text-center p-6 border-b">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground">
            Your appointment has been successfully scheduled
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Booking ID */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-muted/50 px-4 py-2 rounded-lg">
              <Icon name="Hash" size={16} />
              <span className="font-mono text-sm font-medium">{bookingId}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Save this booking ID for your records
            </p>
          </div>

          {/* Appointment Details */}
          <div className="space-y-4">
            <h3 className="font-medium">Appointment Details</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={18} className="text-muted-foreground" />
                <div>
                  <div className="font-medium">
                    {date?.toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">{slot?.time}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Icon name="User" size={18} className="text-muted-foreground" />
                <div>
                  <div className="font-medium">{slot?.therapist}</div>
                  <div className="text-sm text-muted-foreground">{slot?.specialization}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Icon name="Activity" size={18} className="text-muted-foreground" />
                <div>
                  <div className="font-medium">{treatment?.label}</div>
                  <div className="text-sm text-muted-foreground">Duration: {treatment?.duration}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Icon name="IndianRupee" size={18} className="text-muted-foreground" />
                <div>
                  <div className="font-medium">₹{totalCost?.toLocaleString('en-IN')}</div>
                  <div className="text-sm text-muted-foreground">Including GST</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="font-medium">Contact Information</h3>
            <div className="bg-muted/30 p-3 rounded-lg space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={14} />
                <span>{contactDetails?.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={14} />
                <span>{contactDetails?.email}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-3">
            <h3 className="font-medium">What's Next?</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <Icon name="Bell" size={16} className="text-muted-foreground mt-0.5" />
                <span>You'll receive confirmation via SMS and email</span>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="Clock" size={16} className="text-muted-foreground mt-0.5" />
                <span>Reminder notifications will be sent 24 hours before</span>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground mt-0.5" />
                <span>Arrive 15 minutes early for check-in</span>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground mt-0.5" />
                <span>Event added to your Google Calendar</span>
              </div>
            </div>
          </div>

          {/* Clinic Information */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Ayursutra Panchakarma Clinic</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={14} />
                <span>123 Wellness Street, Health District, Mumbai - 400001</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={14} />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <Button
              variant="default"
              fullWidth
              onClick={onViewDashboard}
              iconName="LayoutDashboard"
              iconPosition="left"
            >
              View Dashboard
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={onClose}
              iconName="X"
              iconPosition="left"
            >
              Close
            </Button>
          </div>

          {/* Support Information */}
          <div className="text-center text-xs text-muted-foreground">
            Need help? Contact us at{' '}
            <button className="text-primary hover:underline">
              support@ayursutra.com
            </button>
            {' '}or call{' '}
            <button className="text-primary hover:underline">
              +91 98765 43210
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;