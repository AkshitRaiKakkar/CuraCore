import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ProgressChart from './components/ProgressChart';
import UpcomingAppointments from './components/UpcomingAppointments';
import TreatmentSummary from './components/TreatmentSummary';
import QuickActions from './components/QuickActions';
import NotificationCenter from './components/NotificationCenter';
import RecentSessions from './components/RecentSessions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole] = useState('patient');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock patient data
  const patientData = {
    name: 'Rajesh Patel',
    id: 'PT001',
    joinDate: '2024-01-15',
    currentTreatment: 'Panchakarma Program',
    nextAppointment: '2024-03-22 10:00 AM'
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        userRole={userRole}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          userRole={userRole}
          isAuthenticated={isAuthenticated}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    {getGreeting()}, {patientData?.name}!
                  </h1>
                  <p className="text-muted-foreground mb-4">
                    Welcome to your Ayursutra patient dashboard. Track your treatment progress and manage appointments.
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="User" size={16} color="var(--color-primary)" />
                      <span className="text-foreground">Patient ID: {patientData?.id}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={16} color="var(--color-secondary)" />
                      <span className="text-foreground">
                        Member since: {new Date(patientData.joinDate)?.toLocaleDateString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Current Treatment</div>
                    <div className="font-medium text-foreground">{patientData?.currentTreatment}</div>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="Leaf" size={24} color="var(--color-primary)" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column - Primary Content */}
              <div className="xl:col-span-2 space-y-6">
                {/* Progress Chart */}
                <ProgressChart />

                {/* Upcoming Appointments */}
                <UpcomingAppointments />

                {/* Recent Sessions */}
                <RecentSessions />
              </div>

              {/* Right Column - Secondary Content */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <QuickActions />

                {/* Notification Center */}
                <NotificationCenter />
              </div>
            </div>

            {/* Treatment Summary - Full Width */}
            <TreatmentSummary />

            {/* Emergency Information */}
            <div className="bg-card rounded-lg border p-6 shadow-soft">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Emergency Information</h3>
                  <p className="text-sm text-muted-foreground">Important contacts and guidelines</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-error/5 border border-error/20 rounded-lg p-4">
                  <h4 className="font-medium text-error mb-2">24/7 Emergency Helpline</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    For immediate medical assistance or treatment-related emergencies
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('tel:+911234567890')}
                    iconName="Phone"
                    iconPosition="left"
                    iconSize={16}
                    className="border-error text-error hover:bg-error hover:text-error-foreground"
                  >
                    Call +91 12345 67890
                  </Button>
                </div>
                
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-medium text-primary mb-2">Clinic Address</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Ayursutra Panchakarma Clinic\n123 Wellness Street, Health City\nMumbai, Maharashtra 400001
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://maps.google.com/?q=19.0760,72.8777')}
                    iconName="MapPin"
                    iconPosition="left"
                    iconSize={16}
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;