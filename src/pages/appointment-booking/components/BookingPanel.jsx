import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Image from '../../../components/AppImage';

const BookingPanel = ({ 
  selectedDate, 
  selectedSlot, 
  onBookingConfirm, 
  onBookingCancel,
  patientData 
}) => {
  const [contactDetails, setContactDetails] = useState({
    phone: patientData?.phone || '',
    email: patientData?.email || '',
    emergencyContact: patientData?.emergencyContact || ''
  });
  
  const [preferences, setPreferences] = useState({
    smsReminders: true,
    emailReminders: true,
    whatsappReminders: false,
    googleCalendar: true
  });

  const [notes, setNotes] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const treatmentOptions = [
    { value: 'abhyanga', label: 'Abhyanga (Full Body Massage)', duration: '60 min', cost: 2500 },
    { value: 'shirodhara', label: 'Shirodhara (Oil Pouring)', duration: '45 min', cost: 3000 },
    { value: 'panchakarma', label: 'Panchakarma Package', duration: '90 min', cost: 5000 },
    { value: 'nasya', label: 'Nasya (Nasal Therapy)', duration: '30 min', cost: 1500 },
    { value: 'basti', label: 'Basti (Medicated Enema)', duration: '45 min', cost: 2000 }
  ];

  const [selectedTreatment, setSelectedTreatment] = useState(treatmentOptions?.[0]?.value);

  const getCurrentTreatment = () => {
    return treatmentOptions?.find(t => t?.value === selectedTreatment) || treatmentOptions?.[0];
  };

  const handleConfirmBooking = async () => {
    setIsConfirming(true);
    
    const bookingData = {
      date: selectedDate,
      slot: selectedSlot,
      treatment: getCurrentTreatment(),
      contactDetails,
      preferences,
      notes,
      totalCost: getCurrentTreatment()?.cost,
      bookingId: `APT-${Date.now()}`,
      status: 'confirmed'
    };

    // Simulate API call
    setTimeout(() => {
      setIsConfirming(false);
      if (onBookingConfirm) {
        onBookingConfirm(bookingData);
      }
    }, 2000);
  };

  if (!selectedDate || !selectedSlot) {
    return (
      <div className="bg-card rounded-lg border shadow-soft p-6">
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Select Date & Time</h3>
          <p className="text-muted-foreground">
            Choose a date and time slot to view booking details
          </p>
        </div>
      </div>
    );
  }

  const currentTreatment = getCurrentTreatment();

  return (
    <div className="bg-card rounded-lg border shadow-soft">
      {/* Header */}
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold mb-2">Booking Details</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Calendar" size={16} />
          <span>
            {selectedDate?.toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
          <span>•</span>
          <Icon name="Clock" size={16} />
          <span>{selectedSlot?.time}</span>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Therapist Information */}
        <div className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
          <Image
            src={selectedSlot?.therapistImage || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400"}
            alt={selectedSlot?.therapist}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h4 className="font-medium">{selectedSlot?.therapist}</h4>
            <p className="text-sm text-muted-foreground mb-2">{selectedSlot?.specialization}</p>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} className="text-warning fill-current" />
                <span>{selectedSlot?.rating || '4.8'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Award" size={12} />
                <span>{selectedSlot?.experience || '8+ years'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Treatment Selection */}
        <div>
          <Select
            label="Select Treatment"
            options={treatmentOptions?.map(treatment => ({
              value: treatment?.value,
              label: `${treatment?.label} - ₹${treatment?.cost?.toLocaleString('en-IN')}`,
              description: `Duration: ${treatment?.duration}`
            }))}
            value={selectedTreatment}
            onChange={setSelectedTreatment}
          />
        </div>

        {/* Cost Breakdown */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium mb-3">Cost Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>{currentTreatment?.label}</span>
              <span>₹{currentTreatment?.cost?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Duration</span>
              <span>{currentTreatment?.duration}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>GST (18%)</span>
              <span>₹{Math.round(currentTreatment?.cost * 0.18)?.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-medium">
              <span>Total Amount</span>
              <span>₹{Math.round(currentTreatment?.cost * 1.18)?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Contact Verification */}
        <div className="space-y-4">
          <h4 className="font-medium">Verify Contact Details</h4>
          <Input
            label="Phone Number"
            type="tel"
            value={contactDetails?.phone}
            onChange={(e) => setContactDetails(prev => ({ ...prev, phone: e?.target?.value }))}
            placeholder="+91 98765 43210"
            required
          />
          <Input
            label="Email Address"
            type="email"
            value={contactDetails?.email}
            onChange={(e) => setContactDetails(prev => ({ ...prev, email: e?.target?.value }))}
            placeholder="patient@example.com"
            required
          />
          <Input
            label="Emergency Contact"
            type="tel"
            value={contactDetails?.emergencyContact}
            onChange={(e) => setContactDetails(prev => ({ ...prev, emergencyContact: e?.target?.value }))}
            placeholder="+91 98765 43210"
          />
        </div>

        {/* Notification Preferences */}
        <div className="space-y-4">
          <h4 className="font-medium">Reminder Preferences</h4>
          <div className="space-y-3">
            <Checkbox
              label="SMS Reminders"
              description="Receive appointment reminders via SMS"
              checked={preferences?.smsReminders}
              onChange={(e) => setPreferences(prev => ({ ...prev, smsReminders: e?.target?.checked }))}
            />
            <Checkbox
              label="Email Reminders"
              description="Receive appointment reminders via email"
              checked={preferences?.emailReminders}
              onChange={(e) => setPreferences(prev => ({ ...prev, emailReminders: e?.target?.checked }))}
            />
            <Checkbox
              label="WhatsApp Notifications"
              description="Receive updates via WhatsApp"
              checked={preferences?.whatsappReminders}
              onChange={(e) => setPreferences(prev => ({ ...prev, whatsappReminders: e?.target?.checked }))}
            />
            <Checkbox
              label="Add to Google Calendar"
              description="Automatically add appointment to your calendar"
              checked={preferences?.googleCalendar}
              onChange={(e) => setPreferences(prev => ({ ...prev, googleCalendar: e?.target?.checked }))}
            />
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium mb-2">Additional Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e?.target?.value)}
            placeholder="Any specific requirements or health conditions to mention..."
            className="w-full p-3 border rounded-md resize-none h-20 text-sm"
            maxLength={500}
          />
          <div className="text-xs text-muted-foreground mt-1">
            {notes?.length}/500 characters
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <Button
            variant="outline"
            fullWidth
            onClick={onBookingCancel}
            iconName="X"
            iconPosition="left"
            disabled={isConfirming}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            fullWidth
            onClick={handleConfirmBooking}
            loading={isConfirming}
            iconName="Check"
            iconPosition="left"
          >
            {isConfirming ? 'Confirming...' : 'Confirm Booking'}
          </Button>
        </div>

        {/* Terms Notice */}
        <div className="text-xs text-muted-foreground text-center p-3 bg-muted/30 rounded">
          By confirming this booking, you agree to our{' '}
          <button className="text-primary hover:underline">Terms of Service</button>
          {' '}and{' '}
          <button className="text-primary hover:underline">Cancellation Policy</button>
        </div>
      </div>
    </div>
  );
};

export default BookingPanel;