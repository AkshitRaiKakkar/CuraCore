import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = null, isAuthenticated = false, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: userRole === 'patient' ? '/patient-dashboard' : '/therapist-dashboard',
      roles: ['patient', 'therapist', 'admin'],
      icon: 'LayoutDashboard'
    },
    {
      label: 'Appointments',
      path: '/appointment-booking',
      roles: ['patient', 'therapist', 'admin'],
      icon: 'Calendar'
    },
    {
      label: 'Profile',
      path: '/patient-profile',
      roles: ['patient', 'therapist', 'admin'],
      icon: 'User'
    },
    {
      label: 'Patients',
      path: '/patient-registration',
      roles: ['therapist', 'admin'],
      icon: 'Users'
    }
  ];

  const filteredNavItems = navigationItems?.filter(item => 
    !userRole || item?.roles?.includes(userRole)
  );

  const visibleNavItems = filteredNavItems?.slice(0, 4);
  const overflowNavItems = filteredNavItems?.slice(4);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isAuthenticated) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-soft">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Icon name="Leaf" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-primary">Ayursutra</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-soft">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Icon name="Leaf" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-primary">Ayursutra</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {visibleNavItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActivePath(item?.path) ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className="transition-gentle"
            >
              {item?.label}
            </Button>
          ))}
          
          {overflowNavItems?.length > 0 && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreHorizontal"
                iconSize={16}
              >
                More
              </Button>
            </div>
          )}
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              iconName="Bell"
              iconSize={18}
              className="relative"
            />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-error text-xs font-medium text-error-foreground flex items-center justify-center">
                {notifications > 9 ? '9+' : notifications}
              </span>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="User" size={16} color="var(--color-primary)" />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              iconName="LogOut"
              iconPosition="left"
              iconSize={16}
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          iconName={isMobileMenuOpen ? "X" : "Menu"}
          iconSize={20}
        />
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-card">
          <div className="px-4 py-2 space-y-1">
            {filteredNavItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                size="sm"
                fullWidth
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                className="justify-start transition-gentle"
              >
                {item?.label}
              </Button>
            ))}
            
            <div className="border-t pt-2 mt-2">
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="User" size={16} color="var(--color-primary)" />
                  </div>
                  <span className="text-sm font-medium">
                    {userRole ? userRole?.charAt(0)?.toUpperCase() + userRole?.slice(1) : 'User'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Bell"
                      iconSize={18}
                    />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-error text-xs font-medium text-error-foreground flex items-center justify-center">
                        {notifications > 9 ? '9+' : notifications}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    iconName="LogOut"
                    iconSize={18}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;