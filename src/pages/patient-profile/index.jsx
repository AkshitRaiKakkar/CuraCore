import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';

// Import all tab components
import PatientHeader from './components/PatientHeader';
import PersonalInfoTab from './components/PersonalInfoTab';
import MedicalHistoryTab from './components/MedicalHistoryTab';
import TreatmentHistoryTab from './components/TreatmentHistoryTab';
import ConsentManagementTab from './components/ConsentManagementTab';
import CommunicationHistoryTab from './components/CommunicationHistoryTab';
import DocumentsTab from './components/DocumentsTab';
import BillingTab from './components/BillingTab';

const PatientProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Mock patient data
  const patientData = {
    id: "PAT001",
    patientId: "AYU2024001",
    name: "Priya Sharma",
    age: 34,
    gender: "female",
    phone: "+91 98765 43210",
    email: "priya.sharma@email.com",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    status: "Active",
    dateOfBirth: "15/03/1990",
    bloodGroup: "B+",
    address: "123, Green Valley Apartments, Sector 15",
    city: "Gurgaon",
    state: "Haryana",
    pincode: "122001",
    occupation: "Software Engineer",
    maritalStatus: "married",
    emergencyContact: "Rajesh Sharma",
    emergencyPhone: "+91 98765 43211",
    insuranceProvider: "Star Health Insurance",
    insuranceNumber: "SH2024001234",
    totalSessions: 24,
    completedSessions: 18,
    upcomingSessions: 6,
    lastVisit: "15/09/2024"
  };

  // Mock medical history data
  const medicalHistoryData = {
    conditions: [
      {
        name: "Chronic Lower Back Pain",
        description: "Persistent lower back pain due to prolonged sitting and poor posture",
        diagnosedDate: "12/01/2023",
        diagnosedBy: "Rajesh Kumar",
        severity: "Moderate",
        status: "Active"
      },
      {
        name: "Stress-related Anxiety",
        description: "Work-related stress causing anxiety and sleep disturbances",
        diagnosedDate: "05/06/2023",
        diagnosedBy: "Meera Patel",
        severity: "Mild",
        status: "Active"
      }
    ],
    allergies: [
      {
        allergen: "Peanuts",
        reaction: "Skin rash and mild breathing difficulty",
        severity: "Moderate",
        identifiedDate: "20/08/2022"
      },
      {
        allergen: "Dust Mites",
        reaction: "Sneezing and watery eyes",
        severity: "Mild",
        identifiedDate: "15/03/2021"
      }
    ],
    medications: [
      {
        name: "Ashwagandha Capsules",
        dosage: "300mg",
        frequency: "Twice daily",
        startDate: "01/08/2024",
        prescribedBy: "Anjali Gupta",
        status: "Active",
        notes: "Take with warm milk before meals"
      },
      {
        name: "Triphala Powder",
        dosage: "5g",
        frequency: "Once daily at bedtime",
        startDate: "15/07/2024",
        prescribedBy: "Anjali Gupta",
        status: "Active",
        endDate: "15/10/2024"
      }
    ],
    surgeries: [
      {
        procedure: "Appendectomy",
        reason: "Acute appendicitis",
        date: "22/11/2018",
        hospital: "Apollo Hospital, Delhi",
        surgeon: "Vikram Singh",
        outcome: "Successful",
        complications: null
      }
    ]
  };

  // Mock treatment history data
  const treatmentHistoryData = [
    {
      name: "Panchakarma Detox Program",
      type: "Complete Panchakarma",
      status: "Completed",
      startDate: "01/06/2024",
      endDate: "30/06/2024",
      therapist: "Anjali Gupta",
      totalSessions: 15,
      completedSessions: 15,
      progress: 100,
      duration: "30 days",
      totalCost: 45000,
      goals: ["Detoxification", "Stress Relief", "Improved Digestion"],
      latestNotes: "Patient showed excellent response to treatment. All detox goals achieved successfully.",
      lastUpdated: "30/06/2024",
      sessions: [
        {
          number: 1,
          date: "01/06/2024",
          duration: "90 minutes",
          therapist: "Anjali Gupta",
          status: "Completed",
          notes: "Initial consultation and Abhyanga massage. Patient responded well to sesame oil treatment."
        },
        {
          number: 2,
          date: "03/06/2024",
          duration: "120 minutes",
          therapist: "Anjali Gupta",
          status: "Completed",
          notes: "Swedana therapy followed by Shirodhara. Patient reported deep relaxation."
        }
      ],
      milestones: [
        {
          title: "Initial Assessment Complete",
          description: "Comprehensive health evaluation and treatment plan finalized",
          achieved: true,
          achievedDate: "01/06/2024"
        },
        {
          title: "Mid-treatment Review",
          description: "Progress evaluation and treatment adjustments",
          achieved: true,
          achievedDate: "15/06/2024"
        },
        {
          title: "Treatment Completion",
          description: "All planned sessions completed successfully",
          achieved: true,
          achievedDate: "30/06/2024"
        }
      ]
    },
    {
      name: "Stress Management Therapy",
      type: "Specialized Treatment",
      status: "In-Progress",
      startDate: "15/08/2024",
      endDate: null,
      therapist: "Meera Patel",
      totalSessions: 12,
      completedSessions: 8,
      progress: 67,
      duration: "6 weeks",
      totalCost: 18000,
      goals: ["Stress Reduction", "Better Sleep", "Mental Clarity"],
      latestNotes: "Patient showing good progress. Stress levels reduced significantly. Continue with current protocol.",
      lastUpdated: "15/09/2024",
      sessions: [
        {
          number: 1,
          date: "15/08/2024",
          duration: "60 minutes",
          therapist: "Meera Patel",
          status: "Completed",
          notes: "Pranayama and meditation techniques introduced. Patient eager to learn."
        }
      ],
      milestones: [
        {
          title: "Baseline Assessment",
          description: "Initial stress level evaluation completed",
          achieved: true,
          achievedDate: "15/08/2024"
        },
        {
          title: "Technique Mastery",
          description: "Patient comfortable with basic breathing techniques",
          achieved: true,
          achievedDate: "29/08/2024"
        },
        {
          title: "Stress Level Improvement",
          description: "50% reduction in reported stress levels",
          achieved: false
        }
      ]
    }
  ];

  // Mock consent records data
  const consentRecordsData = [
    {
      title: "General Treatment Consent",
      category: "Treatment Authorization",
      version: "2.1",
      status: "Active",
      priority: "High",
      signedDate: "01/06/2024",
      expiryDate: "01/06/2025",
      witness: "Dr. Anjali Gupta",
      witnessDate: "01/06/2024",
      digitalSignature: true,
      timestamp: "01/06/2024 10:30:00 IST",
      documentId: "CONS-2024-001",
      signatureHash: "SHA256:a1b2c3d4e5f6...",
      description: "Consent for Panchakarma and related Ayurvedic treatments including massage therapies, herbal medications, and dietary recommendations.",
      fullText: `GENERAL TREATMENT CONSENT FORM\n\nI, Priya Sharma, hereby give my informed consent for Ayurvedic treatment at Ayursutra Clinic.\n\nI understand that:\n1. Ayurvedic treatments are traditional healing methods\n2. Individual results may vary\n3. I should inform about any allergies or medical conditions\n4. I can withdraw consent at any time\n\nI have read and understood all terms and conditions of this treatment consent.`,
      auditTrail: [
        {
          action: "Document Created",
          description: "Initial consent form generated",
          timestamp: "01/06/2024 10:15:00 IST",
          performedBy: "Dr. Anjali Gupta",
          ipAddress: "192.168.1.100"
        },
        {
          action: "Patient Signature",
          description: "Digital signature applied by patient",
          timestamp: "01/06/2024 10:30:00 IST",
          performedBy: "Priya Sharma",
          ipAddress: "192.168.1.105"
        }
      ]
    },
    {
      title: "Data Privacy Consent",
      category: "Privacy & Data Protection",
      version: "1.3",
      status: "Active",
      priority: "High",
      signedDate: "01/06/2024",
      expiryDate: "01/06/2026",
      witness: "Reception Staff",
      witnessDate: "01/06/2024",
      digitalSignature: true,
      timestamp: "01/06/2024 10:45:00 IST",
      documentId: "CONS-2024-002",
      signatureHash: "SHA256:b2c3d4e5f6g7...",
      description: "Consent for collection, processing, and storage of personal health information in compliance with DPDP Act 2023.",
      fullText: `DATA PRIVACY CONSENT\n\nI consent to the collection and processing of my personal health data for treatment purposes.\n\nThis includes:\n- Medical history and examination records\n- Treatment notes and progress reports\n- Billing and insurance information\n- Communication records\n\nData will be stored securely and used only for healthcare purposes.`,
      auditTrail: [
        {
          action: "Document Created",
          description: "Privacy consent form generated",
          timestamp: "01/06/2024 10:40:00 IST",
          performedBy: "Reception Staff",
          ipAddress: "192.168.1.101"
        }
      ]
    },
    {
      title: "Photography Consent",
      category: "Media & Documentation",
      version: "1.0",
      status: "Expired",
      priority: "Low",
      signedDate: "01/03/2024",
      expiryDate: "01/09/2024",
      witness: "Dr. Anjali Gupta",
      witnessDate: "01/03/2024",
      digitalSignature: false,
      timestamp: "01/03/2024 14:20:00 IST",
      documentId: "CONS-2024-003",
      description: "Consent for clinical photography for treatment documentation and progress tracking purposes.",
      fullText: `PHOTOGRAPHY CONSENT\n\nI consent to clinical photography for documentation of treatment progress.\n\nPhotographs will be:\n- Used only for medical documentation\n- Stored securely with patient records\n- Not shared without additional consent\n- Deleted upon request`,
      auditTrail: [
        {
          action: "Document Expired",
          description: "Consent expired and marked inactive",
          timestamp: "01/09/2024 00:00:00 IST",
          performedBy: "System",
          ipAddress: "System"
        }
      ]
    }
  ];

  // Mock communication history data
  const communicationHistoryData = [
    {
      subject: "Appointment Rescheduling Request",
      type: "Appointment",
      from: "Priya Sharma",
      date: "18/09/2024",
      time: "14:30",
      channel: "phone",
      priority: "Medium",
      status: "Resolved",
      handledBy: "Reception Team",
      responseTime: "15 minutes",
      content: "Patient called to reschedule tomorrow\'s appointment due to work emergency. Requested to move from 10:00 AM to 2:00 PM.",
      fullContent: `Patient called regarding appointment scheduled for 19/09/2024 at 10:00 AM.\n\nReason for rescheduling: Urgent work meeting that cannot be postponed.\n\nRequested new time: 2:00 PM on the same date.\n\nAvailability confirmed and appointment rescheduled successfully.\n\nPatient thanked for accommodation and confirmed attendance.`,
      responses: [
        {
          from: "Reception Team",
          date: "18/09/2024",
          time: "14:45",
          content: "Appointment successfully rescheduled to 19/09/2024 at 2:00 PM. Confirmation SMS sent to patient."
        }
      ]
    },
    {
      subject: "Treatment Feedback - Panchakarma Program",
      type: "Feedback",
      from: "Priya Sharma",
      date: "02/07/2024",
      time: "16:20",
      channel: "email",
      priority: "Low",
      status: "Resolved",
      handledBy: "Dr. Anjali Gupta",
      responseTime: "2 hours",
      content: "Excellent experience with the Panchakarma program. Feeling much more energetic and stress-free. Would like to know about maintenance treatments.",
      fullContent: `Dear Dr. Gupta,\n\nI wanted to share my feedback about the Panchakarma program I completed last month.\n\nThe entire experience was transformative. I feel:\n- Much more energetic throughout the day\n- Significantly reduced stress levels\n- Better sleep quality\n- Improved digestion\n\nThe staff was professional and caring. The treatments were exactly what I needed.\n\nI would like to know about maintenance treatments to continue these benefits.\n\nThank you for your excellent care.\n\nBest regards,\nPriya Sharma`,
      responses: [
        {
          from: "Dr. Anjali Gupta",
          date: "02/07/2024",
          time: "18:30",
          content: "Thank you for the wonderful feedback! I\'m delighted to hear about your positive results. I\'ll schedule a consultation to discuss maintenance treatments that would be perfect for you."
        }
      ],
      attachments: []
    },
    {
      subject: "Insurance Claim Query",
      type: "Inquiry",
      from: "Priya Sharma",
      date: "25/08/2024",
      time: "11:15",
      channel: "email",
      priority: "High",
      status: "Resolved",
      handledBy: "Billing Department",
      responseTime: "4 hours",
      content: "Need assistance with insurance claim submission for recent treatments. Insurance company requesting additional documentation.",
      fullContent: `Hello,\n\nI need help with my insurance claim for the treatments I received in August.\n\nMy insurance company (Star Health) is requesting:\n1. Detailed treatment notes\n2. Therapist qualifications certificate\n3. Clinic registration documents\n\nClaim number: SH2024-AYU-001\nTreatment dates: 15/08/2024 to 15/09/2024\n\nPlease let me know what documents you can provide.\n\nThanks,\nPriya`,
      responses: [
        {
          from: "Billing Department",
          date: "25/08/2024",
          time: "15:30",
          content: "All requested documents have been prepared and sent to your email. The claim should be processed within 7-10 business days. Please let us know if you need any additional assistance."
        }
      ],
      attachments: [
        {
          name: "Treatment_Notes_Aug2024.pdf",
          size: "245 KB",
          type: "PDF"
        },
        {
          name: "Therapist_Certificates.pdf",
          size: "180 KB",
          type: "PDF"
        }
      ]
    }
  ];

  // Mock documents data
  const documentsData = [
    {
      name: "Panchakarma Treatment Report",
      category: "Medical Reports",
      fileType: "pdf",
      size: 2048000,
      uploadDate: "30/06/2024",
      uploadedBy: "Dr. Anjali Gupta",
      description: "Comprehensive report of completed Panchakarma treatment including pre and post treatment assessments, daily progress notes, and final recommendations.",
      isEncrypted: true,
      accessLevel: "Medical Staff Only",
      versions: [
        {
          number: "1.0",
          date: "30/06/2024",
          changes: "Initial report created",
          updatedBy: "Dr. Anjali Gupta"
        }
      ]
    },
    {
      name: "Blood Test Results - Complete Panel",
      category: "Test Results",
      fileType: "pdf",
      size: 512000,
      uploadDate: "15/08/2024",
      uploadedBy: "Lab Technician",
      description: "Complete blood count, liver function tests, kidney function tests, and vitamin levels. All parameters within normal range.",
      isEncrypted: true,
      accessLevel: "Medical Staff Only"
    },
    {
      name: "Ayurvedic Prescription - August 2024",
      category: "Prescriptions",
      fileType: "pdf",
      size: 256000,
      uploadDate: "15/08/2024",
      uploadedBy: "Dr. Meera Patel",
      description: "Herbal medicine prescription for stress management therapy including Ashwagandha, Brahmi, and Jatamansi formulations.",
      isEncrypted: true,
      accessLevel: "Patient & Medical Staff"
    },
    {
      name: "Insurance Policy Document",
      category: "Insurance",
      fileType: "pdf",
      size: 1024000,
      uploadDate: "01/06/2024",
      uploadedBy: "Priya Sharma",
      description: "Star Health Insurance policy document with coverage details for Ayurvedic treatments and alternative medicine.",
      isEncrypted: false,
      accessLevel: "Patient & Billing Staff"
    },
    {
      name: "Treatment Progress Photos",
      category: "Medical Reports",
      fileType: "jpg",
      size: 3072000,
      uploadDate: "15/09/2024",
      uploadedBy: "Dr. Anjali Gupta",
      description: "Clinical photographs showing treatment progress and physical improvements over the course of therapy.",
      isEncrypted: true,
      accessLevel: "Medical Staff Only"
    },
    {
      name: "Signed Consent Forms",
      category: "Consent Forms",
      fileType: "pdf",
      size: 768000,
      uploadDate: "01/06/2024",
      uploadedBy: "Reception Staff",
      description: "Digitally signed consent forms for treatment, data privacy, and photography permissions.",
      isEncrypted: true,
      accessLevel: "All Staff"
    }
  ];

  // Mock billing data
  const billingData = {
    totalPaid: 63000,
    totalPending: 18000,
    totalOverdue: 0,
    insurance: {
      provider: "Star Health Insurance",
      policyNumber: "SH2024001234",
      coverage: 70,
      claimedAmount: 31500
    },
    invoices: [
      {
        invoiceNumber: "INV-2024-001",
        description: "Panchakarma Detox Program - Complete Package",
        date: "01/06/2024",
        dueDate: "15/06/2024",
        amount: 45000,
        status: "Paid",
        paymentMethod: "UPI",
        subtotal: 38135,
        gstRate: 18,
        gstAmount: 6865,
        discount: 0,
        services: [
          {
            name: "Abhyanga Massage",
            description: "Full body oil massage therapy",
            quantity: 15,
            rate: 1500,
            amount: 22500
          },
          {
            name: "Shirodhara Treatment",
            description: "Continuous oil pouring therapy",
            quantity: 10,
            rate: 2000,
            amount: 20000
          },
          {
            name: "Consultation & Assessment",
            description: "Initial and follow-up consultations",
            quantity: 3,
            rate: 800,
            amount: 2400
          }
        ],
        billTo: {
          name: "Priya Sharma",
          address: "123, Green Valley Apartments, Sector 15, Gurgaon, Haryana - 122001",
          phone: "+91 98765 43210",
          email: "priya.sharma@email.com"
        },
        paymentHistory: [
          {
            method: "UPI",
            amount: 45000,
            transactionId: "UPI2024060115301",
            date: "15/06/2024"
          }
        ]
      },
      {
        invoiceNumber: "INV-2024-002",
        description: "Stress Management Therapy Sessions",
        date: "15/08/2024",
        dueDate: "30/08/2024",
        amount: 18000,
        status: "Pending",
        paymentMethod: "Insurance",
        subtotal: 15254,
        gstRate: 18,
        gstAmount: 2746,
        discount: 0,
        services: [
          {
            name: "Pranayama Sessions",
            description: "Breathing technique training",
            quantity: 8,
            rate: 1000,
            amount: 8000
          },
          {
            name: "Meditation Therapy",
            description: "Guided meditation sessions",
            quantity: 8,
            rate: 800,
            amount: 6400
          },
          {
            name: "Herbal Consultation",
            description: "Stress management herbs prescription",
            quantity: 2,
            rate: 600,
            amount: 1200
          }
        ],
        billTo: {
          name: "Priya Sharma",
          address: "123, Green Valley Apartments, Sector 15, Gurgaon, Haryana - 122001",
          phone: "+91 98765 43210",
          email: "priya.sharma@email.com"
        },
        paymentHistory: []
      }
    ]
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'User' },
    { id: 'medical', label: 'Medical History', icon: 'Heart' },
    { id: 'treatment', label: 'Treatment History', icon: 'Activity' },
    { id: 'consent', label: 'Consent Management', icon: 'FileText' },
    { id: 'communication', label: 'Communication', icon: 'MessageSquare' },
    { id: 'documents', label: 'Documents', icon: 'Folder' },
    { id: 'billing', label: 'Billing', icon: 'Receipt' }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsEditing(false);
  };

  const handleEditToggle = (editing) => {
    setIsEditing(editing);
  };

  const handleSavePersonalInfo = (formData) => {
    // Handle save logic here
    console.log('Saving personal info:', formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoTab
            patient={patientData}
            isEditing={isEditing}
            onSave={handleSavePersonalInfo}
          />
        );
      case 'medical':
        return <MedicalHistoryTab medicalHistory={medicalHistoryData} />;
      case 'treatment':
        return <TreatmentHistoryTab treatmentHistory={treatmentHistoryData} />;
      case 'consent':
        return <ConsentManagementTab consentRecords={consentRecordsData} />;
      case 'communication':
        return <CommunicationHistoryTab communicationHistory={communicationHistoryData} />;
      case 'documents':
        return <DocumentsTab documents={documentsData} />;
      case 'billing':
        return <BillingTab billingData={billingData} />;
      default:
        return (
          <PersonalInfoTab
            patient={patientData}
            isEditing={isEditing}
            onSave={handleSavePersonalInfo}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        userRole="therapist"
        isAuthenticated={true}
        onLogout={handleLogout}
      />
      <div className="flex">
        <Sidebar
          userRole="therapist"
          isAuthenticated={true}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <main className={`flex-1 transition-all duration-300 ${
          isMobile ? '' : isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <div className="p-6 space-y-6">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/therapist-dashboard')}
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Button>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground font-medium">Patient Profile</span>
            </div>

            {/* Patient Header */}
            <PatientHeader
              patient={patientData}
              onEdit={handleEditToggle}
              canEdit={true}
            />

            {/* Navigation Tabs */}
            <div className="bg-card rounded-lg border">
              <div className="border-b">
                <div className="flex overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => handleTabChange(tab?.id)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span className="hidden sm:inline">{tab?.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="default"
                  onClick={() => navigate('/appointment-booking')}
                  iconName="Calendar"
                  iconPosition="left"
                  iconSize={16}
                >
                  Book Appointment
                </Button>
                <Button
                  variant="outline"
                  iconName="FileText"
                  iconPosition="left"
                  iconSize={16}
                >
                  Generate Report
                </Button>
                <Button
                  variant="outline"
                  iconName="MessageSquare"
                  iconPosition="left"
                  iconSize={16}
                >
                  Send Message
                </Button>
                <Button
                  variant="outline"
                  iconName="Phone"
                  iconPosition="left"
                  iconSize={16}
                >
                  Call Patient
                </Button>
                <Button
                  variant="outline"
                  iconName="Share"
                  iconPosition="left"
                  iconSize={16}
                >
                  Share Profile
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientProfile;