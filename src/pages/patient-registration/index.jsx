import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';
import PersonalInfoForm from './components/PersonalInfoForm';
import EmergencyContactForm from './components/EmergencyContactForm';
import MedicalHistoryForm from './components/MedicalHistoryForm';
import InsuranceForm from './components/InsuranceForm';
import ConsentForm from './components/ConsentForm';
import DocumentUpload from './components/DocumentUpload';
import ProgressIndicator from './components/ProgressIndicator';
import ClinicInfoPanel from './components/ClinicInfoPanel';

const PatientRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {},
    emergencyContact: {},
    medicalHistory: {},
    insurance: {},
    consent: {},
    documents: {}
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved');

  const steps = [
    {
      id: 'personal',
      title: 'Personal Info',
      description: 'Basic details',
      component: PersonalInfoForm
    },
    {
      id: 'emergency',
      title: 'Emergency Contact',
      description: 'Contact person',
      component: EmergencyContactForm
    },
    {
      id: 'medical',
      title: 'Medical History',
      description: 'Health information',
      component: MedicalHistoryForm
    },
    {
      id: 'insurance',
      title: 'Insurance',
      description: 'Coverage details',
      component: InsuranceForm
    },
    {
      id: 'documents',
      title: 'Documents',
      description: 'Upload files',
      component: DocumentUpload
    },
    {
      id: 'consent',
      title: 'Consent',
      description: 'Legal agreements',
      component: ConsentForm
    }
  ];

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      setAutoSaveStatus('saving');
      // Simulate auto-save
      setTimeout(() => {
        localStorage.setItem('patientRegistrationDraft', JSON.stringify(formData));
        setAutoSaveStatus('saved');
      }, 1000);
    }, 2000);

    return () => clearTimeout(autoSaveTimer);
  }, [formData]);

  // Load saved draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('patientRegistrationDraft');
    if (savedDraft) {
      try {
        const parsedData = JSON.parse(savedDraft);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error loading saved draft:', error);
      }
    }
  }, []);

  const validateStep = (stepIndex) => {
    const stepErrors = {};
    const step = steps?.[stepIndex - 1];

    switch (step?.id) {
      case 'personal':
        if (!formData?.firstName?.trim()) stepErrors.firstName = 'First name is required';
        if (!formData?.lastName?.trim()) stepErrors.lastName = 'Last name is required';
        if (!formData?.dateOfBirth) stepErrors.dateOfBirth = 'Date of birth is required';
        if (!formData?.gender) stepErrors.gender = 'Gender is required';
        if (!formData?.mobile?.trim()) stepErrors.mobile = 'Mobile number is required';
        if (!formData?.email?.trim()) stepErrors.email = 'Email is required';
        if (!formData?.address?.trim()) stepErrors.address = 'Address is required';
        if (!formData?.city?.trim()) stepErrors.city = 'City is required';
        if (!formData?.state?.trim()) stepErrors.state = 'State is required';
        if (!formData?.pinCode?.trim()) stepErrors.pinCode = 'PIN code is required';
        break;

      case 'emergency':
        if (!formData?.emergencyContact?.name?.trim()) {
          stepErrors.emergencyContactName = 'Emergency contact name is required';
        }
        if (!formData?.emergencyContact?.relationship) {
          stepErrors.emergencyContactRelationship = 'Relationship is required';
        }
        if (!formData?.emergencyContact?.primaryPhone?.trim()) {
          stepErrors.emergencyContactPhone = 'Primary phone is required';
        }
        if (!formData?.emergencyContact?.address?.trim()) {
          stepErrors.emergencyContactAddress = 'Emergency contact address is required';
        }
        break;

      case 'insurance':
        if (formData?.insurance?.hasInsurance) {
          if (!formData?.insurance?.provider) {
            stepErrors.insuranceProvider = 'Insurance provider is required';
          }
          if (!formData?.insurance?.policyNumber?.trim()) {
            stepErrors.policyNumber = 'Policy number is required';
          }
          if (!formData?.insurance?.policyType) {
            stepErrors.policyType = 'Policy type is required';
          }
          if (!formData?.insurance?.coverageAmount) {
            stepErrors.coverageAmount = 'Coverage amount is required';
          }
          if (!formData?.insurance?.expiryDate) {
            stepErrors.expiryDate = 'Policy expiry date is required';
          }
        }
        break;

      case 'documents':
        if (!formData?.documents?.photo) {
          stepErrors.photo = 'Profile photo is required';
        }
        if (!formData?.documents?.identity) {
          stepErrors.identity = 'Identity proof is required';
        }
        break;

      case 'consent':
        if (!formData?.consent?.treatmentConsent) {
          stepErrors.treatmentConsent = 'Treatment consent is required';
        }
        if (!formData?.consent?.privacyConsent) {
          stepErrors.privacyConsent = 'Privacy consent is required';
        }
        if (!formData?.consent?.digitalSignature) {
          stepErrors.digitalSignature = 'Digital signature acknowledgment is required';
        }
        if (!formData?.consent?.informationAccuracy) {
          stepErrors.informationAccuracy = 'Information accuracy confirmation is required';
        }
        break;

      default:
        break;
    }

    return stepErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    
    if (Object.keys(stepErrors)?.length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    if (currentStep < steps?.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    const stepErrors = validateStep(currentStep);
    
    if (Object.keys(stepErrors)?.length > 0) {
      setErrors(stepErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear saved draft
      localStorage.removeItem('patientRegistrationDraft');
      
      // Navigate to patient dashboard
      navigate('/patient-dashboard', { 
        state: { 
          message: 'Registration completed successfully! Welcome to Ayursutra.',
          registrationData: formData
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormDataChange = (newData) => {
    setFormData(newData);
    setErrors({});
  };

  const CurrentStepComponent = steps?.[currentStep - 1]?.component;

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={false} onLogout={() => {}} />
      <ProgressIndicator 
        currentStep={currentStep} 
        totalSteps={steps?.length} 
        steps={steps}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border rounded-lg shadow-soft">
              {/* Form Header */}
              <div className="border-b p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">
                      {steps?.[currentStep - 1]?.title}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      {steps?.[currentStep - 1]?.description}
                    </p>
                  </div>
                  
                  {/* Auto-save Status */}
                  <div className="flex items-center space-x-2 text-sm">
                    {autoSaveStatus === 'saving' && (
                      <>
                        <Icon name="Loader2" size={16} className="animate-spin text-warning" />
                        <span className="text-warning">Saving...</span>
                      </>
                    )}
                    {autoSaveStatus === 'saved' && (
                      <>
                        <Icon name="Check" size={16} className="text-success" />
                        <span className="text-success">Saved</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                <CurrentStepComponent
                  formData={formData}
                  onFormDataChange={handleFormDataChange}
                  errors={errors}
                />
              </div>

              {/* Form Actions */}
              <div className="border-t p-6">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    iconName="ChevronLeft"
                    iconPosition="left"
                  >
                    Previous
                  </Button>

                  <div className="flex items-center space-x-3">
                    {currentStep < steps?.length ? (
                      <Button
                        onClick={handleNext}
                        iconName="ChevronRight"
                        iconPosition="right"
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        loading={isSubmitting}
                        iconName="UserCheck"
                        iconPosition="left"
                        className="bg-success hover:bg-success/90"
                      >
                        Complete Registration
                      </Button>
                    )}
                  </div>
                </div>

                {errors?.submit && (
                  <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg">
                    <p className="text-sm text-error">{errors?.submit}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Clinic Info Panel */}
          <div className="lg:col-span-1">
            <ClinicInfoPanel />
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t p-4">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>

          {currentStep < steps?.length ? (
            <Button
              size="sm"
              onClick={handleNext}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleSubmit}
              loading={isSubmitting}
              iconName="UserCheck"
              iconPosition="left"
              className="bg-success hover:bg-success/90"
            >
              Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;