import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const MedicalHistoryForm = ({ formData, onFormDataChange, errors }) => {
  const [expandedSections, setExpandedSections] = useState({
    chronic: false,
    allergies: false,
    medications: false,
    surgeries: false
  });

  const chronicConditions = [
    'Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Arthritis', 
    'Thyroid Disorders', 'Kidney Disease', 'Liver Disease', 'Cancer', 'Depression'
  ];

  const allergyTypes = [
    'Food Allergies', 'Drug Allergies', 'Environmental Allergies', 
    'Skin Allergies', 'Respiratory Allergies', 'No Known Allergies'
  ];

  const handleInputChange = (field, value) => {
    onFormDataChange({
      ...formData,
      medicalHistory: {
        ...formData?.medicalHistory,
        [field]: value
      }
    });
  };

  const handleCheckboxChange = (field, item, checked) => {
    const currentItems = formData?.medicalHistory?.[field] || [];
    let updatedItems;
    
    if (checked) {
      updatedItems = [...currentItems, item];
    } else {
      updatedItems = currentItems?.filter(i => i !== item);
    }
    
    handleInputChange(field, updatedItems);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-primary-foreground">
          Please provide accurate medical history information. This helps our practitioners design the most effective Panchakarma treatment plan for you.
        </p>
      </div>
      {/* Chronic Conditions Section */}
      <div className="border rounded-lg">
        <button
          type="button"
          onClick={() => toggleSection('chronic')}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
        >
          <h3 className="font-medium text-foreground">Chronic Conditions</h3>
          <Icon 
            name={expandedSections?.chronic ? "ChevronUp" : "ChevronDown"} 
            size={20} 
          />
        </button>
        
        {expandedSections?.chronic && (
          <div className="p-4 border-t space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {chronicConditions?.map((condition) => (
                <Checkbox
                  key={condition}
                  label={condition}
                  checked={formData?.medicalHistory?.chronicConditions?.includes(condition) || false}
                  onChange={(e) => handleCheckboxChange('chronicConditions', condition, e?.target?.checked)}
                />
              ))}
            </div>
            <Input
              label="Other Chronic Conditions"
              type="text"
              placeholder="Please specify any other conditions"
              value={formData?.medicalHistory?.otherChronicConditions || ''}
              onChange={(e) => handleInputChange('otherChronicConditions', e?.target?.value)}
            />
          </div>
        )}
      </div>
      {/* Allergies Section */}
      <div className="border rounded-lg">
        <button
          type="button"
          onClick={() => toggleSection('allergies')}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
        >
          <h3 className="font-medium text-foreground">Allergies & Sensitivities</h3>
          <Icon 
            name={expandedSections?.allergies ? "ChevronUp" : "ChevronDown"} 
            size={20} 
          />
        </button>
        
        {expandedSections?.allergies && (
          <div className="p-4 border-t space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {allergyTypes?.map((allergy) => (
                <Checkbox
                  key={allergy}
                  label={allergy}
                  checked={formData?.medicalHistory?.allergies?.includes(allergy) || false}
                  onChange={(e) => handleCheckboxChange('allergies', allergy, e?.target?.checked)}
                />
              ))}
            </div>
            <Input
              label="Allergy Details"
              type="text"
              placeholder="Please describe specific allergies and reactions"
              value={formData?.medicalHistory?.allergyDetails || ''}
              onChange={(e) => handleInputChange('allergyDetails', e?.target?.value)}
            />
          </div>
        )}
      </div>
      {/* Current Medications Section */}
      <div className="border rounded-lg">
        <button
          type="button"
          onClick={() => toggleSection('medications')}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
        >
          <h3 className="font-medium text-foreground">Current Medications</h3>
          <Icon 
            name={expandedSections?.medications ? "ChevronUp" : "ChevronDown"} 
            size={20} 
          />
        </button>
        
        {expandedSections?.medications && (
          <div className="p-4 border-t space-y-4">
            <Input
              label="Current Medications"
              type="text"
              placeholder="List all current medications with dosage"
              value={formData?.medicalHistory?.currentMedications || ''}
              onChange={(e) => handleInputChange('currentMedications', e?.target?.value)}
            />
            <Input
              label="Supplements & Vitamins"
              type="text"
              placeholder="List any supplements or vitamins you take"
              value={formData?.medicalHistory?.supplements || ''}
              onChange={(e) => handleInputChange('supplements', e?.target?.value)}
            />
          </div>
        )}
      </div>
      {/* Previous Surgeries Section */}
      <div className="border rounded-lg">
        <button
          type="button"
          onClick={() => toggleSection('surgeries')}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
        >
          <h3 className="font-medium text-foreground">Previous Surgeries & Treatments</h3>
          <Icon 
            name={expandedSections?.surgeries ? "ChevronUp" : "ChevronDown"} 
            size={20} 
          />
        </button>
        
        {expandedSections?.surgeries && (
          <div className="p-4 border-t space-y-4">
            <Input
              label="Previous Surgeries"
              type="text"
              placeholder="List any previous surgeries with dates"
              value={formData?.medicalHistory?.previousSurgeries || ''}
              onChange={(e) => handleInputChange('previousSurgeries', e?.target?.value)}
            />
            <Input
              label="Previous Ayurvedic Treatments"
              type="text"
              placeholder="Any previous Panchakarma or Ayurvedic treatments"
              value={formData?.medicalHistory?.previousAyurvedicTreatments || ''}
              onChange={(e) => handleInputChange('previousAyurvedicTreatments', e?.target?.value)}
            />
          </div>
        )}
      </div>
      {/* Lifestyle Information */}
      <div className="bg-muted/50 border rounded-lg p-4 space-y-4">
        <h3 className="font-medium text-foreground">Lifestyle Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Exercise Frequency"
            options={[
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: '3-5 times per week' },
              { value: 'occasional', label: 'Occasionally' },
              { value: 'none', label: 'No regular exercise' }
            ]}
            value={formData?.medicalHistory?.exerciseFrequency || ''}
            onChange={(value) => handleInputChange('exerciseFrequency', value)}
            placeholder="Select exercise frequency"
          />
          
          <Select
            label="Smoking Status"
            options={[
              { value: 'never', label: 'Never smoked' },
              { value: 'former', label: 'Former smoker' },
              { value: 'current', label: 'Current smoker' }
            ]}
            value={formData?.medicalHistory?.smokingStatus || ''}
            onChange={(value) => handleInputChange('smokingStatus', value)}
            placeholder="Select smoking status"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Alcohol Consumption"
            options={[
              { value: 'none', label: 'No alcohol' },
              { value: 'occasional', label: 'Occasionally' },
              { value: 'moderate', label: 'Moderate (1-2 drinks/day)' },
              { value: 'heavy', label: 'Heavy (3+ drinks/day)' }
            ]}
            value={formData?.medicalHistory?.alcoholConsumption || ''}
            onChange={(value) => handleInputChange('alcoholConsumption', value)}
            placeholder="Select alcohol consumption"
          />
          
          <Select
            label="Diet Type"
            options={[
              { value: 'vegetarian', label: 'Vegetarian' },
              { value: 'vegan', label: 'Vegan' },
              { value: 'non-vegetarian', label: 'Non-Vegetarian' },
              { value: 'mixed', label: 'Mixed Diet' }
            ]}
            value={formData?.medicalHistory?.dietType || ''}
            onChange={(value) => handleInputChange('dietType', value)}
            placeholder="Select diet type"
          />
        </div>
      </div>
    </div>
  );
};

export default MedicalHistoryForm;