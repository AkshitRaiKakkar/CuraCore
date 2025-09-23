import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ConsentForm = ({ formData, onFormDataChange, errors }) => {
  const [expandedSections, setExpandedSections] = useState({
    treatment: false,
    privacy: false,
    communication: false
  });

  const handleConsentChange = (field, checked) => {
    onFormDataChange({
      ...formData,
      consent: {
        ...formData?.consent,
        [field]: checked,
        timestamp: checked ? new Date()?.toISOString() : null
      }
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const currentDate = new Date()?.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="space-y-6">
      <div className="bg-error/10 border border-error/20 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Icon name="AlertTriangle" size={20} color="var(--color-error)" className="mt-0.5" />
          <div>
            <h4 className="font-medium text-error-foreground mb-1">Important Legal Information</h4>
            <p className="text-sm text-error-foreground">
              Please read all consent forms carefully before proceeding. Your digital signature and timestamp will be recorded for legal compliance.
            </p>
          </div>
        </div>
      </div>
      {/* Treatment Consent */}
      <div className="border rounded-lg">
        <button
          type="button"
          onClick={() => toggleSection('treatment')}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
        >
          <h3 className="font-medium text-foreground">Treatment Consent & Acknowledgment</h3>
          <Icon 
            name={expandedSections?.treatment ? "ChevronUp" : "ChevronDown"} 
            size={20} 
          />
        </button>
        
        {expandedSections?.treatment && (
          <div className="p-4 border-t space-y-4">
            <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground max-h-48 overflow-y-auto">
              <h4 className="font-medium text-foreground mb-2">Panchakarma Treatment Consent</h4>
              <p className="mb-3">
                I understand that Panchakarma treatments are traditional Ayurvedic therapies that may include:
              </p>
              <ul className="list-disc ml-4 space-y-1 mb-3">
                <li>Abhyanga (oil massage)</li>
                <li>Swedana (steam therapy)</li>
                <li>Virechana (therapeutic purgation)</li>
                <li>Basti (medicated enemas)</li>
                <li>Nasya (nasal administration of medicines)</li>
              </ul>
              <p className="mb-3">
                I acknowledge that these treatments may have side effects and I have disclosed my complete medical history. 
                I understand that results may vary and no specific outcomes are guaranteed.
              </p>
              <p className="mb-3">
                I consent to the treatment plan as recommended by the qualified Ayurvedic practitioners at this clinic.
              </p>
              <p className="text-xs text-muted-foreground">
                Last updated: {currentDate} | Version 2.1
              </p>
            </div>
            
            <Checkbox
              label="I have read and agree to the treatment consent terms"
              checked={formData?.consent?.treatmentConsent || false}
              onChange={(e) => handleConsentChange('treatmentConsent', e?.target?.checked)}
              error={errors?.treatmentConsent}
              required
            />
          </div>
        )}
      </div>
      {/* Privacy Policy */}
      <div className="border rounded-lg">
        <button
          type="button"
          onClick={() => toggleSection('privacy')}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
        >
          <h3 className="font-medium text-foreground">Privacy Policy & Data Protection</h3>
          <Icon 
            name={expandedSections?.privacy ? "ChevronUp" : "ChevronDown"} 
            size={20} 
          />
        </button>
        
        {expandedSections?.privacy && (
          <div className="p-4 border-t space-y-4">
            <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground max-h-48 overflow-y-auto">
              <h4 className="font-medium text-foreground mb-2">Data Protection & Privacy</h4>
              <p className="mb-3">
                Your personal and medical information will be handled in accordance with the Digital Personal Data Protection Act 2023 (DPDP 2023) and healthcare privacy regulations.
              </p>
              <ul className="list-disc ml-4 space-y-1 mb-3">
                <li>Medical records will be stored securely and accessed only by authorized personnel</li>
                <li>Personal information will not be shared with third parties without consent</li>
                <li>You have the right to access, modify, or delete your personal data</li>
                <li>Data will be retained as per medical record retention guidelines</li>
                <li>We use industry-standard encryption for data protection</li>
              </ul>
              <p className="mb-3">
                For any privacy concerns or data requests, please contact our Data Protection Officer at privacy@ayursutra.com
              </p>
              <p className="text-xs text-muted-foreground">
                DPDP 2023 Compliant | Last updated: {currentDate}
              </p>
            </div>
            
            <Checkbox
              label="I agree to the privacy policy and data protection terms"
              checked={formData?.consent?.privacyConsent || false}
              onChange={(e) => handleConsentChange('privacyConsent', e?.target?.checked)}
              error={errors?.privacyConsent}
              required
            />
          </div>
        )}
      </div>
      {/* Communication Preferences */}
      <div className="border rounded-lg">
        <button
          type="button"
          onClick={() => toggleSection('communication')}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
        >
          <h3 className="font-medium text-foreground">Communication Preferences</h3>
          <Icon 
            name={expandedSections?.communication ? "ChevronUp" : "ChevronDown"} 
            size={20} 
          />
        </button>
        
        {expandedSections?.communication && (
          <div className="p-4 border-t space-y-4">
            <div className="space-y-3">
              <Checkbox
                label="I consent to receive appointment reminders via SMS"
                checked={formData?.consent?.smsReminders || false}
                onChange={(e) => handleConsentChange('smsReminders', e?.target?.checked)}
              />
              
              <Checkbox
                label="I consent to receive appointment reminders via WhatsApp"
                checked={formData?.consent?.whatsappReminders || false}
                onChange={(e) => handleConsentChange('whatsappReminders', e?.target?.checked)}
              />
              
              <Checkbox
                label="I consent to receive appointment reminders via Email"
                checked={formData?.consent?.emailReminders || false}
                onChange={(e) => handleConsentChange('emailReminders', e?.target?.checked)}
              />
              
              <Checkbox
                label="I consent to receive promotional offers and health tips"
                checked={formData?.consent?.promotionalContent || false}
                onChange={(e) => handleConsentChange('promotionalContent', e?.target?.checked)}
              />
            </div>
            
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
              <p className="text-xs text-accent-foreground">
                You can update your communication preferences anytime from your patient dashboard or by contacting us.
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Digital Signature Acknowledgment */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <h4 className="font-medium text-primary-foreground mb-3">Digital Signature Acknowledgment</h4>
        <div className="space-y-3">
          <Checkbox
            label="I acknowledge that my digital acceptance constitutes a legally binding electronic signature"
            checked={formData?.consent?.digitalSignature || false}
            onChange={(e) => handleConsentChange('digitalSignature', e?.target?.checked)}
            error={errors?.digitalSignature}
            required
          />
          
          {formData?.consent?.digitalSignature && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                <span className="text-sm text-success-foreground">
                  Digital signature recorded on {currentDate} at {new Date()?.toLocaleTimeString('en-IN')}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Final Acknowledgment */}
      <div className="bg-muted border rounded-lg p-4">
        <Checkbox
          label="I confirm that all information provided is accurate and complete to the best of my knowledge"
          checked={formData?.consent?.informationAccuracy || false}
          onChange={(e) => handleConsentChange('informationAccuracy', e?.target?.checked)}
          error={errors?.informationAccuracy}
          required
        />
      </div>
    </div>
  );
};

export default ConsentForm;