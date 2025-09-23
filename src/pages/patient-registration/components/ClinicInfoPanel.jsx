import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ClinicInfoPanel = () => {
  const clinicFeatures = [
    {
      icon: 'Award',
      title: 'Certified Practitioners',
      description: 'Licensed Ayurvedic doctors with 10+ years experience'
    },
    {
      icon: 'Shield',
      title: 'Safe & Hygienic',
      description: 'WHO-approved safety protocols and sterilization'
    },
    {
      icon: 'Clock',
      title: 'Flexible Scheduling',
      description: 'Convenient appointment slots to fit your schedule'
    },
    {
      icon: 'Heart',
      title: 'Personalized Care',
      description: 'Customized treatment plans for individual needs'
    }
  ];

  const treatmentHighlights = [
    'Traditional Panchakarma Therapies',
    'Abhyanga (Therapeutic Oil Massage)',
    'Swedana (Herbal Steam Therapy)',
    'Virechana (Detoxification)',
    'Basti (Medicated Enemas)',
    'Nasya (Nasal Therapy)'
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      text: `The Panchakarma treatment here completely transformed my health. The doctors are knowledgeable and the facilities are excellent.`
    },
    {
      name: 'Rajesh Kumar',
      location: 'Delhi',
      rating: 5,
      text: `Professional staff and authentic Ayurvedic treatments. I feel rejuvenated after completing my therapy sessions.`
    }
  ];

  return (
    <div className="bg-card border rounded-lg p-6 space-y-6 sticky top-6">
      {/* Clinic Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Icon name="Leaf" size={24} color="white" />
          </div>
          <h2 className="text-2xl font-bold text-primary">Ayursutra</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Authentic Panchakarma & Ayurvedic Wellness Center
        </p>
      </div>
      {/* Clinic Image */}
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop"
          alt="Ayursutra Clinic Interior"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      {/* Key Features */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Why Choose Ayursutra?</h3>
        <div className="space-y-3">
          {clinicFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={feature?.icon} size={16} color="var(--color-primary)" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{feature?.title}</p>
                <p className="text-xs text-muted-foreground">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Treatment Highlights */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Our Specialties</h3>
        <div className="space-y-2">
          {treatmentHighlights?.map((treatment, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={14} color="var(--color-success)" />
              <span className="text-sm text-muted-foreground">{treatment}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Contact Information */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-3">Contact Information</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={14} color="var(--color-primary)" />
            <span className="text-sm text-muted-foreground">+91 98765 43210</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={14} color="var(--color-primary)" />
            <span className="text-sm text-muted-foreground">info@ayursutra.com</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="MapPin" size={14} color="var(--color-primary)" className="mt-0.5" />
            <span className="text-sm text-muted-foreground">
              123 Wellness Street, Health District, Mumbai - 400001
            </span>
          </div>
        </div>
      </div>
      {/* Patient Testimonials */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">What Our Patients Say</h3>
        <div className="space-y-4">
          {testimonials?.map((testimonial, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-3">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(testimonial?.rating)]?.map((_, i) => (
                  <Icon key={i} name="Star" size={12} color="var(--color-warning)" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mb-2 italic">
                "{testimonial?.text}"
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">
                  {testimonial?.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {testimonial?.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Badges */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="text-center">
            <Icon name="Shield" size={20} color="var(--color-success)" className="mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">DPDP 2023</p>
            <p className="text-xs text-muted-foreground">Compliant</p>
          </div>
          <div className="text-center">
            <Icon name="Award" size={20} color="var(--color-warning)" className="mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Certified</p>
            <p className="text-xs text-muted-foreground">Ayurvedic</p>
          </div>
          <div className="text-center">
            <Icon name="Users" size={20} color="var(--color-primary)" className="mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">1000+</p>
            <p className="text-xs text-muted-foreground">Patients</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicInfoPanel;