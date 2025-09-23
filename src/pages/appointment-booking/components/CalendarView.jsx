import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarView = ({ 
  selectedDate, 
  onDateSelect, 
  availableSlots, 
  selectedSlot, 
  onSlotSelect,
  filters 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    let day = startOfWeek?.getDay();
    startOfWeek?.setDate(startOfWeek?.getDate() - day);
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay?.setDate(startOfWeek?.getDate() + i);
      weekDays?.push(currentDay);
    }
    
    return weekDays;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(selectedDate || currentMonth);
    newDate?.setDate(newDate?.getDate() + (direction * 7));
    setCurrentMonth(newDate);
    if (onDateSelect) {
      onDateSelect(newDate);
    }
  };

  const isToday = (date) => {
    const today = new Date();
    return date && 
           date?.getDate() === today?.getDate() &&
           date?.getMonth() === today?.getMonth() &&
           date?.getFullYear() === today?.getFullYear();
  };

  const isSelected = (date) => {
    return selectedDate && 
           date &&
           date?.getDate() === selectedDate?.getDate() &&
           date?.getMonth() === selectedDate?.getMonth() &&
           date?.getFullYear() === selectedDate?.getFullYear();
  };

  const isPastDate = (date) => {
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    return date && date < today;
  };

  const getAvailabilityForDate = (date) => {
    if (!date) return null;
    const dateStr = date?.toISOString()?.split('T')?.[0];
    return availableSlots?.[dateStr] || [];
  };

  const getAvailabilityIndicator = (date) => {
    const slots = getAvailabilityForDate(date);
    if (!slots || slots?.length === 0) return 'unavailable';
    
    const availableCount = slots?.filter(slot => slot?.available)?.length;
    if (availableCount === 0) return 'full';
    if (availableCount <= 2) return 'limited';
    return 'available';
  };

  const renderTimeSlots = () => {
    if (!selectedDate) return null;
    
    const slots = getAvailabilityForDate(selectedDate);
    if (!slots || slots?.length === 0) {
      return (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No slots available for this date</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {slots?.map((slot) => (
          <Button
            key={slot?.id}
            variant={selectedSlot?.id === slot?.id ? "default" : "outline"}
            size="sm"
            disabled={!slot?.available || isPastDate(selectedDate)}
            onClick={() => onSlotSelect && onSlotSelect(slot)}
            className={`
              h-12 flex flex-col items-center justify-center text-xs
              ${!slot?.available ? 'opacity-50' : ''}
            `}
          >
            <span className="font-medium">{slot?.time}</span>
            <span className="text-xs opacity-75">{slot?.therapist}</span>
          </Button>
        ))}
      </div>
    );
  };

  const days = viewMode === 'month' ? getDaysInMonth(currentMonth) : getWeekDays(selectedDate || currentMonth);

  return (
    <div className="bg-card rounded-lg border shadow-soft">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold">
            {months?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
          </h3>
          <div className="flex items-center space-x-1">
            <Button
              variant={viewMode === 'month' ? 'default' : 'ghost'}
              size="xs"
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'ghost'}
              size="xs"
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => viewMode === 'month' ? navigateMonth(-1) : navigateWeek(-1)}
            iconName="ChevronLeft"
            iconSize={16}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setCurrentMonth(new Date());
              if (onDateSelect) onDateSelect(new Date());
            }}
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => viewMode === 'month' ? navigateMonth(1) : navigateWeek(1)}
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="p-4">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays?.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days?.map((date, index) => {
            if (!date) {
              return <div key={index} className="h-12" />;
            }

            const availability = getAvailabilityIndicator(date);
            const isPast = isPastDate(date);

            return (
              <button
                key={date?.toISOString()}
                onClick={() => !isPast && onDateSelect && onDateSelect(date)}
                disabled={isPast}
                className={`
                  h-12 rounded-md text-sm font-medium transition-gentle relative
                  ${isPast 
                    ? 'text-muted-foreground cursor-not-allowed opacity-50' 
                    : 'hover:bg-muted cursor-pointer'
                  }
                  ${isSelected(date) 
                    ? 'bg-primary text-primary-foreground' 
                    : isToday(date) 
                      ? 'bg-accent text-accent-foreground' 
                      : 'text-foreground'
                  }
                `}
              >
                {date?.getDate()}
                {/* Availability Indicator */}
                {!isPast && availability !== 'unavailable' && (
                  <div className={`
                    absolute bottom-1 right-1 w-2 h-2 rounded-full
                    ${availability === 'available' ? 'bg-success' : ''}
                    ${availability === 'limited' ? 'bg-warning' : ''}
                    ${availability === 'full' ? 'bg-error' : ''}
                  `} />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-warning" />
            <span className="text-muted-foreground">Limited</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-error" />
            <span className="text-muted-foreground">Full</span>
          </div>
        </div>
      </div>
      {/* Time Slots */}
      {selectedDate && (
        <div className="border-t p-4">
          <h4 className="font-medium mb-3">
            Available Times - {selectedDate?.toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h4>
          {renderTimeSlots()}
        </div>
      )}
    </div>
  );
};

export default CalendarView;