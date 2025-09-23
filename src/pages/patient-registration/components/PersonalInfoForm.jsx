import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoForm = ({ formData, onFormDataChange, errors }) => {
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
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

  const maritalStatusOptions = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' }
  ];

  const handleInputChange = (field, value) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter first name"
          value={formData?.firstName || ''}
          onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          error={errors?.firstName}
          required
        />
        
        <Input
          label="Last Name"
          type="text"
          placeholder="Enter last name"
          value={formData?.lastName || ''}
          onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          error={errors?.lastName}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Date of Birth"
          type="date"
          value={formData?.dateOfBirth || ''}
          onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
          error={errors?.dateOfBirth}
          required
        />
        
        <Select
          label="Gender"
          options={genderOptions}
          value={formData?.gender || ''}
          onChange={(value) => handleInputChange('gender', value)}
          error={errors?.gender}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Mobile Number"
          type="tel"
          placeholder="+91 98765 43210"
          value={formData?.mobile || ''}
          onChange={(e) => handleInputChange('mobile', e?.target?.value)}
          error={errors?.mobile}
          required
        />
        
        <Input
          label="Email Address"
          type="email"
          placeholder="patient@example.com"
          value={formData?.email || ''}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Blood Group"
          options={bloodGroupOptions}
          value={formData?.bloodGroup || ''}
          onChange={(value) => handleInputChange('bloodGroup', value)}
          error={errors?.bloodGroup}
          placeholder="Select blood group"
        />
        
        <Select
          label="Marital Status"
          options={maritalStatusOptions}
          value={formData?.maritalStatus || ''}
          onChange={(value) => handleInputChange('maritalStatus', value)}
          error={errors?.maritalStatus}
          placeholder="Select marital status"
        />
      </div>
      <Input
        label="Address"
        type="text"
        placeholder="Enter complete address"
        value={formData?.address || ''}
        onChange={(e) => handleInputChange('address', e?.target?.value)}
        error={errors?.address}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="City"
          type="text"
          placeholder="Enter city"
          value={formData?.city || ''}
          onChange={(e) => handleInputChange('city', e?.target?.value)}
          error={errors?.city}
          required
        />
        
        <Input
          label="State"
          type="text"
          placeholder="Enter state"
          value={formData?.state || ''}
          onChange={(e) => handleInputChange('state', e?.target?.value)}
          error={errors?.state}
          required
        />
        
        <Input
          label="PIN Code"
          type="text"
          placeholder="400001"
          value={formData?.pinCode || ''}
          onChange={(e) => handleInputChange('pinCode', e?.target?.value)}
          error={errors?.pinCode}
          required
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;