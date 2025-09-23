import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import TodaySchedule from './components/TodaySchedule';
import ActiveSessionPanel from './components/ActiveSessionPanel';
import PatientProgressCharts from './components/PatientProgressCharts';
import QuickActions from './components/QuickActions';
import NotificationCenter from './components/NotificationCenter';
import TreatmentPlanTemplates from './components/TreatmentPlanTemplates';

const TherapistDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dashboardStats, setDashboardStats] = useState({
    todayAppointments: 5,
    activeSessions: 1,
    completedSessions: 3,
    pendingReports: 2
  });

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Mock authentication check
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (!userRole || userRole !== 'therapist') {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const statsCards = [
    {
      title: 'Today\'s Appointments',
      value: dashboardStats?.todayAppointments,
      icon: 'Calendar',
      color: 'primary',
      change: '+2 from yesterday',
      trend: 'up'
    },
    {
      title: 'Active Sessions',
      value: dashboardStats?.activeSessions,
      icon: 'Activity',
      color: 'success',
      change: 'In progress',
      trend: 'neutral'
    },
    {
      title: 'Completed Today',
      value: dashboardStats?.completedSessions,
      icon: 'CheckCircle',
      color: 'accent',
      change: '60% completion rate',
      trend: 'up'
    },
    {
      title: 'Pending Reports',
      value: dashboardStats?.pendingReports,
      icon: 'FileText',
      color: 'warning',
      change: 'Due by EOD',
      trend: 'down'
    }
  ];

  const getStatColor = (color) => {
    const colorMap = {
      primary: 'bg-primary/10 text-primary border-primary/20',
      success: 'bg-success/10 text-success border-success/20',
      accent: 'bg-accent/10 text-accent border-accent/20',
      warning: 'bg-warning/10 text-warning border-warning/20'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        userRole="therapist" 
        isAuthenticated={true} 
        onLogout={handleLogout}
      />
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          userRole="therapist"
          isAuthenticated={true}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    Good {currentTime?.getHours() < 12 ? 'Morning' : currentTime?.getHours() < 17 ? 'Afternoon' : 'Evening'}, Dr. Therapist
                  </h1>
                  <p className="text-muted-foreground">
                    {currentTime?.toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })} • {currentTime?.toLocaleTimeString('en-IN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <Button
                    variant="default"
                    onClick={() => navigate('/appointment-booking')}
                    iconName="Plus"
                    iconPosition="left"
                    iconSize={16}
                  >
                    New Appointment
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/patient-registration')}
                    iconName="UserPlus"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Add Patient
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards?.map((stat, index) => (
                <div key={index} className="bg-card rounded-lg border p-6 shadow-soft hover:shadow-elevated transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat?.title}</p>
                      <p className="text-3xl font-bold text-foreground mt-2">{stat?.value}</p>
                      <div className="flex items-center mt-2 space-x-1">
                        <Icon 
                          name={getTrendIcon(stat?.trend)} 
                          size={14} 
                          color={stat?.trend === 'up' ? 'var(--color-success)' : stat?.trend === 'down' ? 'var(--color-error)' : 'var(--color-muted-foreground)'} 
                        />
                        <p className="text-xs text-muted-foreground">{stat?.change}</p>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${getStatColor(stat?.color)}`}>
                      <Icon name={stat?.icon} size={24} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column - Schedule and Active Session */}
              <div className="xl:col-span-2 space-y-6">
                <TodaySchedule />
                <ActiveSessionPanel />
              </div>

              {/* Right Column - Quick Actions and Notifications */}
              <div className="space-y-6">
                <QuickActions />
                <NotificationCenter />
              </div>
            </div>

            {/* Bottom Section - Charts and Templates */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <PatientProgressCharts />
              <TreatmentPlanTemplates />
            </div>

            {/* Quick Navigation */}
            <div className="bg-card rounded-lg border p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Navigation</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/patient-profile')}
                  iconName="User"
                  iconPosition="left"
                  iconSize={16}
                  className="justify-start"
                >
                  Patient Profiles
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/appointment-booking')}
                  iconName="Calendar"
                  iconPosition="left"
                  iconSize={16}
                  className="justify-start"
                >
                  Appointments
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/patient-registration')}
                  iconName="UserPlus"
                  iconPosition="left"
                  iconSize={16}
                  className="justify-start"
                >
                  New Patient
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/patient-dashboard')}
                  iconName="BarChart3"
                  iconPosition="left"
                  iconSize={16}
                  className="justify-start"
                >
                  Reports
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TherapistDashboard;