import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CalendarView from './components/CalendarView';
import BookingPanel from './components/BookingPanel';
import FilterPanel from './components/FilterPanel';
import BookingConfirmation from './components/BookingConfirmation';

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Mock user data
  const patientData = {
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    email: "rahul.sharma@email.com",
    emergencyContact: "+91 98765 43211"
  };

  // Filter state
  const [filters, setFilters] = useState({
    therapist: 'all',
    treatment: 'all',
    timeSlot: 'all',
    duration: 'all',
    priceRange: 'all',
    specializations: [],
    availableOnly: true,
    todayOnly: false,
    thisWeek: false,
    onlineConsultation: false,
    sameDayBooking: false,
    weekendAvailability: false
  });

  // Mock available slots data
  const availableSlots = {
    '2025-01-22': [
      {
        id: 'slot-1',
        time: '9:00 AM',
        therapist: 'Dr. Priya Sharma',
        therapistImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
        specialization: 'Panchakarma Specialist',
        available: true,
        rating: 4.9,
        experience: '12+ years'
      },
      {
        id: 'slot-2',
        time: '10:30 AM',
        therapist: 'Dr. Rajesh Patel',
        therapistImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
        specialization: 'Pain Management Expert',
        available: true,
        rating: 4.8,
        experience: '10+ years'
      },
      {
        id: 'slot-3',
        time: '2:00 PM',
        therapist: 'Dr. Meera Singh',
        therapistImage: 'https://images.unsplash.com/photo-1594824475317-d8b0b4b4b0b0?w=400',
        specialization: 'Stress Relief Therapist',
        available: false,
        rating: 4.7,
        experience: '8+ years'
      },
      {
        id: 'slot-4',
        time: '4:30 PM',
        therapist: 'Dr. Anil Kumar',
        therapistImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400',
        specialization: 'Detoxification Expert',
        available: true,
        rating: 4.8,
        experience: '15+ years'
      }
    ],
    '2025-01-23': [
      {
        id: 'slot-5',
        time: '8:30 AM',
        therapist: 'Dr. Priya Sharma',
        therapistImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
        specialization: 'Panchakarma Specialist',
        available: true,
        rating: 4.9,
        experience: '12+ years'
      },
      {
        id: 'slot-6',
        time: '11:00 AM',
        therapist: 'Dr. Meera Singh',
        therapistImage: 'https://images.unsplash.com/photo-1594824475317-d8b0b4b4b0b0?w=400',
        specialization: 'Stress Relief Therapist',
        available: true,
        rating: 4.7,
        experience: '8+ years'
      }
    ],
    '2025-01-24': [
      {
        id: 'slot-7',
        time: '9:30 AM',
        therapist: 'Dr. Rajesh Patel',
        therapistImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
        specialization: 'Pain Management Expert',
        available: true,
        rating: 4.8,
        experience: '10+ years'
      },
      {
        id: 'slot-8',
        time: '3:00 PM',
        therapist: 'Dr. Anil Kumar',
        therapistImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400',
        specialization: 'Detoxification Expert',
        available: true,
        rating: 4.8,
        experience: '15+ years'
      }
    ]
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBookingConfirm = (bookingData) => {
    setConfirmedBooking(bookingData);
    setShowConfirmation(true);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const handleBookingCancel = () => {
    setSelectedSlot(null);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      therapist: 'all',
      treatment: 'all',
      timeSlot: 'all',
      duration: 'all',
      priceRange: 'all',
      specializations: [],
      availableOnly: true,
      todayOnly: false,
      thisWeek: false,
      onlineConsultation: false,
      sameDayBooking: false,
      weekendAvailability: false
    });
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setConfirmedBooking(null);
  };

  const handleViewDashboard = () => {
    setShowConfirmation(false);
    setConfirmedBooking(null);
    navigate('/patient-dashboard');
  };

  // Set initial date to today
  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="patient" 
        isAuthenticated={true}
        onLogout={() => navigate('/login')}
      />

      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold mb-2">Book Appointment</h1>
              <p className="text-muted-foreground">
                Schedule your Panchakarma therapy session with our expert practitioners
              </p>
            </div>
            
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              iconName="Filter"
              iconPosition="left"
            >
              Filters
            </Button>
          </div>

          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mt-4">
            <button 
              onClick={() => navigate('/patient-dashboard')}
              className="hover:text-foreground transition-gentle"
            >
              Dashboard
            </button>
            <Icon name="ChevronRight" size={14} />
            <span className="text-foreground">Book Appointment</span>
          </nav>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className={`
            lg:col-span-1
            ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}
          `}>
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <CalendarView
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              availableSlots={availableSlots}
              selectedSlot={selectedSlot}
              onSlotSelect={handleSlotSelect}
              filters={filters}
            />
          </div>

          {/* Booking Panel */}
          <div className="lg:col-span-1">
            <BookingPanel
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              onBookingConfirm={handleBookingConfirm}
              onBookingCancel={handleBookingCancel}
              patientData={patientData}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 p-6 bg-card rounded-lg border shadow-soft">
          <h3 className="font-medium mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              fullWidth
              onClick={() => navigate('/patient-profile')}
              iconName="User"
              iconPosition="left"
            >
              Update Profile
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => navigate('/patient-dashboard')}
              iconName="Calendar"
              iconPosition="left"
            >
              View Appointments
            </Button>
            <Button
              variant="outline"
              fullWidth
              iconName="Phone"
              iconPosition="left"
            >
              Contact Clinic
            </Button>
            <Button
              variant="outline"
              fullWidth
              iconName="MessageCircle"
              iconPosition="left"
            >
              Chat Support
            </Button>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div className="text-sm">
              <h4 className="font-medium mb-1">Booking Guidelines</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Appointments can be cancelled up to 24 hours in advance</li>
                <li>• Please arrive 15 minutes early for check-in and preparation</li>
                <li>• Bring a valid ID and any relevant medical documents</li>
                <li>• Consultation fee is separate from treatment charges</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showConfirmation && (
        <BookingConfirmation
          bookingData={confirmedBooking}
          onClose={handleCloseConfirmation}
          onViewDashboard={handleViewDashboard}
        />
      )}
    </div>
  );
};

export default AppointmentBooking;