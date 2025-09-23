import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const therapistOptions = [
    { value: 'all', label: 'All Therapists' },
    { value: 'dr-sharma', label: 'Dr. Priya Sharma' },
    { value: 'dr-patel', label: 'Dr. Rajesh Patel' },
    { value: 'dr-singh', label: 'Dr. Meera Singh' },
    { value: 'dr-kumar', label: 'Dr. Anil Kumar' }
  ];

  const treatmentOptions = [
    { value: 'all', label: 'All Treatments' },
    { value: 'abhyanga', label: 'Abhyanga' },
    { value: 'shirodhara', label: 'Shirodhara' },
    { value: 'panchakarma', label: 'Panchakarma' },
    { value: 'nasya', label: 'Nasya' },
    { value: 'basti', label: 'Basti' }
  ];

  const timeSlotOptions = [
    { value: 'all', label: 'All Times' },
    { value: 'morning', label: 'Morning (6 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 6 PM)' },
    { value: 'evening', label: 'Evening (6 PM - 9 PM)' }
  ];

  const durationOptions = [
    { value: 'all', label: 'Any Duration' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '60 minutes' },
    { value: '90', label: '90+ minutes' }
  ];

  const priceRangeOptions = [
    { value: 'all', label: 'Any Price' },
    { value: '0-2000', label: 'Under ₹2,000' },
    { value: '2000-3000', label: '₹2,000 - ₹3,000' },
    { value: '3000-5000', label: '₹3,000 - ₹5,000' },
    { value: '5000+', label: 'Above ₹5,000' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const handleSpecializationChange = (specialization, checked) => {
    const currentSpecializations = filters?.specializations || [];
    const newSpecializations = checked
      ? [...currentSpecializations, specialization]
      : currentSpecializations?.filter(s => s !== specialization);
    
    handleFilterChange('specializations', newSpecializations);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.therapist && filters?.therapist !== 'all') count++;
    if (filters?.treatment && filters?.treatment !== 'all') count++;
    if (filters?.timeSlot && filters?.timeSlot !== 'all') count++;
    if (filters?.duration && filters?.duration !== 'all') count++;
    if (filters?.priceRange && filters?.priceRange !== 'all') count++;
    if (filters?.specializations && filters?.specializations?.length > 0) count++;
    if (filters?.onlineConsultation) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-card rounded-lg border shadow-soft">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <h3 className="font-medium">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
            >
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
            className="lg:hidden"
          />
        </div>
      </div>
      {/* Filter Content */}
      <div className={`
        ${isExpanded ? 'block' : 'hidden'} lg:block
        p-4 space-y-4
      `}>
        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters?.availableOnly ? "default" : "outline"}
            size="xs"
            onClick={() => handleFilterChange('availableOnly', !filters?.availableOnly)}
            iconName="Clock"
            iconPosition="left"
            iconSize={14}
          >
            Available Only
          </Button>
          <Button
            variant={filters?.todayOnly ? "default" : "outline"}
            size="xs"
            onClick={() => handleFilterChange('todayOnly', !filters?.todayOnly)}
            iconName="Calendar"
            iconPosition="left"
            iconSize={14}
          >
            Today
          </Button>
          <Button
            variant={filters?.thisWeek ? "default" : "outline"}
            size="xs"
            onClick={() => handleFilterChange('thisWeek', !filters?.thisWeek)}
            iconName="CalendarDays"
            iconPosition="left"
            iconSize={14}
          >
            This Week
          </Button>
        </div>

        {/* Therapist Filter */}
        <div>
          <Select
            label="Therapist"
            options={therapistOptions}
            value={filters?.therapist || 'all'}
            onChange={(value) => handleFilterChange('therapist', value)}
          />
        </div>

        {/* Treatment Filter */}
        <div>
          <Select
            label="Treatment Type"
            options={treatmentOptions}
            value={filters?.treatment || 'all'}
            onChange={(value) => handleFilterChange('treatment', value)}
          />
        </div>

        {/* Time Slot Filter */}
        <div>
          <Select
            label="Preferred Time"
            options={timeSlotOptions}
            value={filters?.timeSlot || 'all'}
            onChange={(value) => handleFilterChange('timeSlot', value)}
          />
        </div>

        {/* Duration Filter */}
        <div>
          <Select
            label="Session Duration"
            options={durationOptions}
            value={filters?.duration || 'all'}
            onChange={(value) => handleFilterChange('duration', value)}
          />
        </div>

        {/* Price Range Filter */}
        <div>
          <Select
            label="Price Range"
            options={priceRangeOptions}
            value={filters?.priceRange || 'all'}
            onChange={(value) => handleFilterChange('priceRange', value)}
          />
        </div>

        {/* Specializations */}
        <div>
          <h4 className="text-sm font-medium mb-3">Specializations</h4>
          <div className="space-y-2">
            {[
              'Panchakarma Specialist',
              'Pain Management',
              'Stress Relief',
              'Detoxification',
              'Skin Care',
              'Weight Management'
            ]?.map((specialization) => (
              <Checkbox
                key={specialization}
                label={specialization}
                checked={(filters?.specializations || [])?.includes(specialization)}
                onChange={(e) => handleSpecializationChange(specialization, e?.target?.checked)}
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div className="space-y-3 pt-4 border-t">
          <Checkbox
            label="Online Consultation Available"
            description="Show therapists offering virtual sessions"
            checked={filters?.onlineConsultation || false}
            onChange={(e) => handleFilterChange('onlineConsultation', e?.target?.checked)}
          />
          <Checkbox
            label="Same Day Booking"
            description="Show slots available for today"
            checked={filters?.sameDayBooking || false}
            onChange={(e) => handleFilterChange('sameDayBooking', e?.target?.checked)}
          />
          <Checkbox
            label="Weekend Availability"
            description="Include Saturday and Sunday slots"
            checked={filters?.weekendAvailability || false}
            onChange={(e) => handleFilterChange('weekendAvailability', e?.target?.checked)}
          />
        </div>

        {/* Apply Filters Button (Mobile) */}
        <div className="lg:hidden pt-4 border-t">
          <Button
            variant="default"
            fullWidth
            onClick={() => setIsExpanded(false)}
            iconName="Check"
            iconPosition="left"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;