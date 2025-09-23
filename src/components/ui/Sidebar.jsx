import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ 
  userRole = null, 
  isAuthenticated = false, 
  isCollapsed = false, 
  onToggleCollapse,
  className = ""
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: userRole === 'patient' ? '/patient-dashboard' : '/therapist-dashboard',
      roles: ['patient', 'therapist', 'admin'],
      icon: 'LayoutDashboard',
      description: 'Overview and quick actions'
    },
    {
      label: 'Appointments',
      path: '/appointment-booking',
      roles: ['patient', 'therapist', 'admin'],
      icon: 'Calendar',
      description: 'Schedule and manage appointments'
    },
    {
      label: 'Profile',
      path: '/patient-profile',
      roles: ['patient', 'therapist', 'admin'],
      icon: 'User',
      description: 'Personal information and settings'
    },
    {
      label: 'Patient Registration',
      path: '/patient-registration',
      roles: ['therapist', 'admin'],
      icon: 'UserPlus',
      description: 'Register new patients'
    }
  ];

  const filteredNavItems = navigationItems?.filter(item => 
    !userRole || item?.roles?.includes(userRole)
  );

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`
        hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:flex-col
        ${isCollapsed ? 'lg:w-16' : 'lg:w-64'}
        transition-all duration-300 ease-gentle
        ${className}
      `}>
        <div className="flex flex-col flex-1 min-h-0 bg-card border-r shadow-soft">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Icon name="Leaf" size={20} color="white" />
                </div>
                <span className="text-lg font-semibold text-primary">Ayursutra</span>
              </div>
            )}
            {isCollapsed && (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary mx-auto">
                <Icon name="Leaf" size={20} color="white" />
              </div>
            )}
            {onToggleCollapse && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleCollapse}
                iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
                iconSize={16}
                className={isCollapsed ? "mx-auto mt-2" : ""}
              />
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {filteredNavItems?.map((item) => (
              <div key={item?.path} className="relative group">
                <Button
                  variant={isActivePath(item?.path) ? "default" : "ghost"}
                  size="sm"
                  fullWidth
                  onClick={() => handleNavigation(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  iconSize={18}
                  className={`
                    justify-start transition-gentle
                    ${isCollapsed ? 'px-2' : 'px-3'}
                  `}
                >
                  {!isCollapsed && item?.label}
                </Button>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full top-0 ml-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-md shadow-elevated opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                    <div className="font-medium">{item?.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{item?.description}</div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-3 border-t">
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="User" size={16} color="var(--color-primary)" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {userRole ? userRole?.charAt(0)?.toUpperCase() + userRole?.slice(1) : 'User'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Active Session
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative flex flex-col w-64 bg-card shadow-elevated">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Icon name="Leaf" size={20} color="white" />
                </div>
                <span className="text-lg font-semibold text-primary">Ayursutra</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileOpen(false)}
                iconName="X"
                iconSize={20}
              />
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1">
              {filteredNavItems?.map((item) => (
                <Button
                  key={item?.path}
                  variant={isActivePath(item?.path) ? "default" : "ghost"}
                  size="sm"
                  fullWidth
                  onClick={() => handleNavigation(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  iconSize={18}
                  className="justify-start transition-gentle"
                >
                  {item?.label}
                </Button>
              ))}
            </nav>

            {/* Mobile User Section */}
            <div className="p-3 border-t">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="User" size={16} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">
                    {userRole ? userRole?.charAt(0)?.toUpperCase() + userRole?.slice(1) : 'User'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Active Session
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Mobile Sidebar Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden fixed bottom-4 right-4 z-40 shadow-elevated"
        onClick={() => setIsMobileOpen(true)}
        iconName="Menu"
        iconSize={20}
      />
    </>
  );
};

export default Sidebar;