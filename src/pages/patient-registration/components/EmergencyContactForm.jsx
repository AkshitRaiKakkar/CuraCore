import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EmergencyContactForm = ({ formData, onFormDataChange, errors }) => {
  const relationshipOptions = [
    { value: 'spouse', label: 'Spouse' },
    { value: 'parent', label: 'Parent' },
    { value: 'child', label: 'Child' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'friend', label: 'Friend' },
    { value: 'relative', label: 'Relative' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    onFormDataChange({
      ...formData,
      emergencyContact: {
        ...formData?.emergencyContact,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <p className="text-sm text-warning-foreground">
          Please provide emergency contact information. This person will be contacted in case of medical emergencies during treatment.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Emergency Contact Name"
          type="text"
          placeholder="Enter full name"
          value={formData?.emergencyContact?.name || ''}
          onChange={(e) => handleInputChange('name', e?.target?.value)}
          error={errors?.emergencyContactName}
          required
        />
        
        <Select
          label="Relationship"
          options={relationshipOptions}
          value={formData?.emergencyContact?.relationship || ''}
          onChange={(value) => handleInputChange('relationship', value)}
          error={errors?.emergencyContactRelationship}
          placeholder="Select relationship"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Primary Phone"
          type="tel"
          placeholder="+91 98765 43210"
          value={formData?.emergencyContact?.primaryPhone || ''}
          onChange={(e) => handleInputChange('primaryPhone', e?.target?.value)}
          error={errors?.emergencyContactPhone}
          required
        />
        
        <Input
          label="Alternate Phone"
          type="tel"
          placeholder="+91 98765 43210"
          value={formData?.emergencyContact?.alternatePhone || ''}
          onChange={(e) => handleInputChange('alternatePhone', e?.target?.value)}
          error={errors?.emergencyContactAlternatePhone}
        />
      </div>
      <Input
        label="Emergency Contact Address"
        type="text"
        placeholder="Enter complete address"
        value={formData?.emergencyContact?.address || ''}
        onChange={(e) => handleInputChange('address', e?.target?.value)}
        error={errors?.emergencyContactAddress}
        required
      />
      <div className="bg-muted/50 border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-2">Additional Emergency Instructions</h4>
        <Input
          type="text"
          placeholder="Any specific instructions for emergency situations (optional)"
          value={formData?.emergencyContact?.instructions || ''}
          onChange={(e) => handleInputChange('instructions', e?.target?.value)}
        />
      </div>
    </div>
  );
};

export default EmergencyContactForm;