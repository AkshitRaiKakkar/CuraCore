import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MedicalHistoryTab = ({ medicalHistory }) => {
  const [expandedSections, setExpandedSections] = useState({
    conditions: true,
    allergies: true,
    medications: true,
    surgeries: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': case'severe':
        return 'bg-error/10 text-error border-error/20';
      case 'medium': case'moderate':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low': case'mild':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const MedicalSection = ({ title, icon, items, sectionKey, renderItem }) => (
    <div className="bg-card rounded-lg border">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-gentle"
        onClick={() => toggleSection(sectionKey)}
      >
        <div className="flex items-center gap-3">
          <Icon name={icon} size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
            {items?.length}
          </span>
        </div>
        <Icon 
          name={expandedSections?.[sectionKey] ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          color="var(--color-muted-foreground)" 
        />
      </div>
      
      {expandedSections?.[sectionKey] && (
        <div className="px-4 pb-4">
          {items?.length > 0 ? (
            <div className="space-y-3">
              {items?.map((item, index) => renderItem(item, index))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="FileX" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-2" />
              <p>No {title?.toLowerCase()} recorded</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Chronic Conditions */}
      <MedicalSection
        title="Chronic Conditions"
        icon="Heart"
        items={medicalHistory?.conditions}
        sectionKey="conditions"
        renderItem={(condition, index) => (
          <div key={index} className="bg-muted/30 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{condition?.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{condition?.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Diagnosed: {condition?.diagnosedDate}</span>
                  <span>By: Dr. {condition?.diagnosedBy}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(condition?.severity)}`}>
                  {condition?.severity}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  condition?.status === 'Active' ?'bg-success/10 text-success border-success/20' :'bg-muted text-muted-foreground border-border'
                }`}>
                  {condition?.status}
                </span>
              </div>
            </div>
          </div>
        )}
      />
      {/* Allergies */}
      <MedicalSection
        title="Allergies & Reactions"
        icon="AlertTriangle"
        items={medicalHistory?.allergies}
        sectionKey="allergies"
        renderItem={(allergy, index) => (
          <div key={index} className="bg-error/5 border border-error/20 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Icon name="AlertCircle" size={16} color="var(--color-error)" />
                  {allergy?.allergen}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">{allergy?.reaction}</p>
                <div className="text-xs text-muted-foreground mt-2">
                  Identified: {allergy?.identifiedDate}
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(allergy?.severity)}`}>
                {allergy?.severity}
              </span>
            </div>
          </div>
        )}
      />
      {/* Current Medications */}
      <MedicalSection
        title="Current Medications"
        icon="Pill"
        items={medicalHistory?.medications}
        sectionKey="medications"
        renderItem={(medication, index) => (
          <div key={index} className="bg-muted/30 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{medication?.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{medication?.dosage}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Frequency: {medication?.frequency}</span>
                  <span>Started: {medication?.startDate}</span>
                  <span>Prescribed by: Dr. {medication?.prescribedBy}</span>
                </div>
                {medication?.notes && (
                  <p className="text-xs text-muted-foreground mt-2 italic">{medication?.notes}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium text-center ${
                  medication?.status === 'Active' ?'bg-success/10 text-success border border-success/20' :'bg-muted text-muted-foreground border border-border'
                }`}>
                  {medication?.status}
                </span>
                {medication?.endDate && (
                  <span className="text-xs text-muted-foreground text-center">
                    Until: {medication?.endDate}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      />
      {/* Previous Surgeries */}
      <MedicalSection
        title="Previous Surgeries"
        icon="Scissors"
        items={medicalHistory?.surgeries}
        sectionKey="surgeries"
        renderItem={(surgery, index) => (
          <div key={index} className="bg-muted/30 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{surgery?.procedure}</h4>
                <p className="text-sm text-muted-foreground mt-1">{surgery?.reason}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Date: {surgery?.date}</span>
                  <span>Hospital: {surgery?.hospital}</span>
                  <span>Surgeon: Dr. {surgery?.surgeon}</span>
                </div>
                {surgery?.complications && (
                  <div className="mt-2 p-2 bg-warning/10 border border-warning/20 rounded text-xs">
                    <strong>Complications:</strong> {surgery?.complications}
                  </div>
                )}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                surgery?.outcome === 'Successful' ?'bg-success/10 text-success border border-success/20' :'bg-warning/10 text-warning border border-warning/20'
              }`}>
                {surgery?.outcome}
              </span>
            </div>
          </div>
        )}
      />
      {/* Add New Entry Button */}
      <div className="flex justify-center pt-4">
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          Add Medical History Entry
        </Button>
      </div>
    </div>
  );
};

export default MedicalHistoryTab;