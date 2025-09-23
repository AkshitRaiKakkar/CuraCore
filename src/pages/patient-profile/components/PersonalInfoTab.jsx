import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PersonalInfoTab = ({ patient, isEditing, onSave }) => {
  const [formData, setFormData] = useState({
    name: patient?.name || '',
    email: patient?.email || '',
    phone: patient?.phone || '',
    dateOfBirth: patient?.dateOfBirth || '',
    gender: patient?.gender || '',
    address: patient?.address || '',
    city: patient?.city || '',
    state: patient?.state || '',
    pincode: patient?.pincode || '',
    occupation: patient?.occupation || '',
    maritalStatus: patient?.maritalStatus || '',
    emergencyContact: patient?.emergencyContact || '',
    emergencyPhone: patient?.emergencyPhone || '',
    insuranceProvider: patient?.insuranceProvider || '',
    insuranceNumber: patient?.insuranceNumber || '',
    bloodGroup: patient?.bloodGroup || ''
  });

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const maritalStatusOptions = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' }
  ];

  const bloodGroupOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
  };

  if (isEditing) {
    return (
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="User" size={20} color="var(--color-primary)" />
            <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              required
            />
            <Input
              label="Date of Birth"
              type="date"
              value={formData?.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
              required
            />
            <Select
              label="Gender"
              options={genderOptions}
              value={formData?.gender}
              onChange={(value) => handleInputChange('gender', value)}
              required
            />
            <Select
              label="Blood Group"
              options={bloodGroupOptions}
              value={formData?.bloodGroup}
              onChange={(value) => handleInputChange('bloodGroup', value)}
            />
          </div>
        </div>
        {/* Address Information */}
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="MapPin" size={20} color="var(--color-primary)" />
            <h3 className="text-lg font-semibold text-foreground">Address Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Address"
                type="text"
                value={formData?.address}
                onChange={(e) => handleInputChange('address', e?.target?.value)}
                placeholder="Street address"
              />
            </div>
            <Input
              label="City"
              type="text"
              value={formData?.city}
              onChange={(e) => handleInputChange('city', e?.target?.value)}
            />
            <Input
              label="State"
              type="text"
              value={formData?.state}
              onChange={(e) => handleInputChange('state', e?.target?.value)}
            />
            <Input
              label="PIN Code"
              type="text"
              value={formData?.pincode}
              onChange={(e) => handleInputChange('pincode', e?.target?.value)}
              maxLength={6}
            />
            <Input
              label="Occupation"
              type="text"
              value={formData?.occupation}
              onChange={(e) => handleInputChange('occupation', e?.target?.value)}
            />
          </div>
        </div>
        {/* Personal Details */}
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Heart" size={20} color="var(--color-primary)" />
            <h3 className="text-lg font-semibold text-foreground">Personal Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Marital Status"
              options={maritalStatusOptions}
              value={formData?.maritalStatus}
              onChange={(value) => handleInputChange('maritalStatus', value)}
            />
          </div>
        </div>
        {/* Emergency Contact */}
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Phone" size={20} color="var(--color-primary)" />
            <h3 className="text-lg font-semibold text-foreground">Emergency Contact</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Emergency Contact Name"
              type="text"
              value={formData?.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
            />
            <Input
              label="Emergency Contact Phone"
              type="tel"
              value={formData?.emergencyPhone}
              onChange={(e) => handleInputChange('emergencyPhone', e?.target?.value)}
            />
          </div>
        </div>
        {/* Insurance Information */}
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Shield" size={20} color="var(--color-primary)" />
            <h3 className="text-lg font-semibold text-foreground">Insurance Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Insurance Provider"
              type="text"
              value={formData?.insuranceProvider}
              onChange={(e) => handleInputChange('insuranceProvider', e?.target?.value)}
            />
            <Input
              label="Insurance Number"
              type="text"
              value={formData?.insuranceNumber}
              onChange={(e) => handleInputChange('insuranceNumber', e?.target?.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => {}}>
            Cancel
          </Button>
          <Button onClick={handleSave} iconName="Save" iconPosition="left" iconSize={16}>
            Save Changes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="User" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Full Name</label>
            <p className="text-foreground font-medium">{patient?.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <p className="text-foreground">{patient?.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Phone</label>
            <p className="text-foreground">{patient?.phone}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
            <p className="text-foreground">{patient?.dateOfBirth}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Gender</label>
            <p className="text-foreground capitalize">{patient?.gender}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Blood Group</label>
            <p className="text-foreground">{patient?.bloodGroup}</p>
          </div>
        </div>
      </div>
      {/* Address Information */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="MapPin" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Address Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="md:col-span-2 lg:col-span-3">
            <label className="text-sm font-medium text-muted-foreground">Address</label>
            <p className="text-foreground">{patient?.address}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">City</label>
            <p className="text-foreground">{patient?.city}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">State</label>
            <p className="text-foreground">{patient?.state}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">PIN Code</label>
            <p className="text-foreground">{patient?.pincode}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Occupation</label>
            <p className="text-foreground">{patient?.occupation}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Marital Status</label>
            <p className="text-foreground capitalize">{patient?.maritalStatus}</p>
          </div>
        </div>
      </div>
      {/* Emergency Contact */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Phone" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Emergency Contact</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Contact Name</label>
            <p className="text-foreground">{patient?.emergencyContact}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Contact Phone</label>
            <p className="text-foreground">{patient?.emergencyPhone}</p>
          </div>
        </div>
      </div>
      {/* Insurance Information */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Shield" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Insurance Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Insurance Provider</label>
            <p className="text-foreground">{patient?.insuranceProvider}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Insurance Number</label>
            <p className="text-foreground">{patient?.insuranceNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoTab;