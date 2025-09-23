import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const InsuranceForm = ({ formData, onFormDataChange, errors }) => {
  const insuranceProviders = [
    { value: 'lic', label: 'LIC of India' },
    { value: 'icici', label: 'ICICI Lombard' },
    { value: 'hdfc', label: 'HDFC ERGO' },
    { value: 'bajaj', label: 'Bajaj Allianz' },
    { value: 'star', label: 'Star Health' },
    { value: 'max', label: 'Max Bupa' },
    { value: 'apollo', label: 'Apollo Munich' },
    { value: 'religare', label: 'Religare Health' },
    { value: 'other', label: 'Other' }
  ];

  const policyTypes = [
    { value: 'individual', label: 'Individual Policy' },
    { value: 'family', label: 'Family Floater' },
    { value: 'group', label: 'Group/Corporate Policy' },
    { value: 'senior', label: 'Senior Citizen Policy' }
  ];

  const handleInputChange = (field, value) => {
    onFormDataChange({
      ...formData,
      insurance: {
        ...formData?.insurance,
        [field]: value
      }
    });
  };

  const handleHasInsuranceChange = (checked) => {
    onFormDataChange({
      ...formData,
      insurance: {
        ...formData?.insurance,
        hasInsurance: checked,
        // Clear insurance fields if unchecked
        ...(checked ? {} : {
          provider: '',
          policyNumber: '',
          policyType: '',
          coverageAmount: '',
          expiryDate: '',
          groupNumber: '',
          otherProvider: ''
        })
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <p className="text-sm text-accent-foreground">
          Insurance information helps us process your claims efficiently. If you don't have insurance, you can still proceed with self-payment options.
        </p>
      </div>
      <Checkbox
        label="I have health insurance coverage"
        checked={formData?.insurance?.hasInsurance || false}
        onChange={(e) => handleHasInsuranceChange(e?.target?.checked)}
      />
      {formData?.insurance?.hasInsurance && (
        <div className="space-y-6 pl-6 border-l-2 border-primary/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Insurance Provider"
              options={insuranceProviders}
              value={formData?.insurance?.provider || ''}
              onChange={(value) => handleInputChange('provider', value)}
              error={errors?.insuranceProvider}
              placeholder="Select insurance provider"
              required
            />
            
            <Input
              label="Policy Number"
              type="text"
              placeholder="Enter policy number"
              value={formData?.insurance?.policyNumber || ''}
              onChange={(e) => handleInputChange('policyNumber', e?.target?.value)}
              error={errors?.policyNumber}
              required
            />
          </div>

          {formData?.insurance?.provider === 'other' && (
            <Input
              label="Other Insurance Provider"
              type="text"
              placeholder="Enter insurance provider name"
              value={formData?.insurance?.otherProvider || ''}
              onChange={(e) => handleInputChange('otherProvider', e?.target?.value)}
              error={errors?.otherProvider}
              required
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Policy Type"
              options={policyTypes}
              value={formData?.insurance?.policyType || ''}
              onChange={(value) => handleInputChange('policyType', value)}
              error={errors?.policyType}
              placeholder="Select policy type"
              required
            />
            
            <Input
              label="Coverage Amount (₹)"
              type="number"
              placeholder="500000"
              value={formData?.insurance?.coverageAmount || ''}
              onChange={(e) => handleInputChange('coverageAmount', e?.target?.value)}
              error={errors?.coverageAmount}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Policy Expiry Date"
              type="date"
              value={formData?.insurance?.expiryDate || ''}
              onChange={(e) => handleInputChange('expiryDate', e?.target?.value)}
              error={errors?.expiryDate}
              required
            />
            
            <Input
              label="Group Number (if applicable)"
              type="text"
              placeholder="Enter group number"
              value={formData?.insurance?.groupNumber || ''}
              onChange={(e) => handleInputChange('groupNumber', e?.target?.value)}
            />
          </div>

          <div className="bg-muted/50 border rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Policy Holder Information</h4>
            <div className="space-y-4">
              <Checkbox
                label="I am the policy holder"
                checked={formData?.insurance?.isPolicyHolder || false}
                onChange={(e) => handleInputChange('isPolicyHolder', e?.target?.checked)}
              />
              
              {!formData?.insurance?.isPolicyHolder && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Policy Holder Name"
                    type="text"
                    placeholder="Enter policy holder name"
                    value={formData?.insurance?.policyHolderName || ''}
                    onChange={(e) => handleInputChange('policyHolderName', e?.target?.value)}
                    error={errors?.policyHolderName}
                    required
                  />
                  
                  <Input
                    label="Relationship to Policy Holder"
                    type="text"
                    placeholder="e.g., Spouse, Child, Parent"
                    value={formData?.insurance?.relationshipToPolicyHolder || ''}
                    onChange={(e) => handleInputChange('relationshipToPolicyHolder', e?.target?.value)}
                    error={errors?.relationshipToPolicyHolder}
                    required
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <h4 className="font-medium text-warning-foreground mb-2">Important Note</h4>
            <p className="text-sm text-warning-foreground">
              Please ensure all insurance information is accurate. Incorrect details may delay claim processing. 
              You may be required to provide insurance card copies during your first visit.
            </p>
          </div>
        </div>
      )}
      {!formData?.insurance?.hasInsurance && (
        <div className="bg-muted/50 border rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-2">Self-Payment Option</h4>
          <p className="text-sm text-muted-foreground mb-3">
            No insurance? No problem. We offer flexible payment options including:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 ml-4">
            <li>• Cash payments</li>
            <li>• Card payments (Credit/Debit)</li>
            <li>• UPI and digital wallets</li>
            <li>• Installment plans for extended treatments</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default InsuranceForm;