import React from 'react';
import Icon from '../../../components/AppIcon';

const ClinicInfo = () => {
  const features = [
    {
      id: 1,
      icon: 'Calendar',
      title: 'Smart Scheduling',
      description: 'AI-powered appointment booking with certified Ayurvedic practitioners nationwide',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      icon: 'Activity',
      title: 'Real-time Tracking',
      description: 'Monitor your treatment progress with advanced analytics and personalized insights',
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      id: 3,
      icon: 'FileText',
      title: 'Digital Health Records',
      description: 'Secure, government-compliant digital records accessible anytime, anywhere',
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      id: 4,
      icon: 'Bell',
      title: 'Intelligent Reminders',
      description: 'Smart notifications for appointments, medications, and wellness goals',
      color: 'amber',
      gradient: 'from-amber-500 to-orange-500'
    }
  ];

  const stats = [
    { label: 'Active Citizens', value: '50,000+', icon: 'Users', color: 'blue' },
    { label: 'Successful Treatments', value: '1,25,000+', icon: 'Heart', color: 'emerald' },
    { label: 'Success Rate', value: '97.5%', icon: 'TrendingUp', color: 'purple' },
    { label: 'Years of Excellence', value: '15+', icon: 'Award', color: 'amber' }
  ];

  const certifications = [
    { name: 'Ministry of AYUSH', icon: 'Building2', color: 'blue' },
    { name: 'ISO 27001:2013', icon: 'Shield', color: 'emerald' },
    { name: 'NABH Certified', icon: 'CheckCircle', color: 'purple' },
    { name: 'DPDP 2023 Compliant', icon: 'Lock', color: 'amber' }
  ];

  return (
    <div className="space-y-8">
      {/* Platform Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-colorful">
            <Icon name="Leaf" size={32} color="white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              AyurSutra
            </h1>
            <p className="text-blue-700 font-semibold">Digital Healthcare Revolution</p>
          </div>
        </div>
        <p className="text-xl text-slate-700 max-w-lg mx-auto leading-relaxed">
          Experience the perfect fusion of ancient Ayurvedic wisdom and modern digital innovation 
          for comprehensive healthcare solutions.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features?.map((feature) => (
          <div
            key={feature?.id}
            className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-transparent hover:shadow-elevated transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature?.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            
            <div className="relative flex items-start space-x-4">
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${feature?.gradient} flex items-center justify-center shadow-lg`}>
                <Icon name={feature?.icon} size={24} color="white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 mb-2 text-lg">{feature?.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature?.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-3xl p-8 border border-blue-100">
        <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          Trusted Nationwide Healthcare Partner
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-${stat?.color}-500 to-${stat?.color}-600 text-white mb-3 shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={stat?.icon} size={24} />
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-1">{stat?.value}</div>
              <div className="text-sm text-slate-600 font-medium">{stat?.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Government Certifications */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft">
        <h4 className="font-bold text-slate-800 mb-4 flex items-center text-lg">
          <Icon name="Award" size={20} className="mr-3 text-blue-600" />
          Government Certifications & Compliance
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {certifications?.map((cert, index) => (
            <div key={index} className={`flex items-center space-x-3 p-3 bg-${cert?.color}-50 rounded-lg border border-${cert?.color}-100 hover:shadow-md transition-all duration-200`}>
              <Icon name={cert?.icon} size={18} className={`text-${cert?.color}-600`} />
              <span className={`text-sm font-semibold text-${cert?.color}-800`}>{cert?.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-2xl p-6 border border-emerald-200">
        <h4 className="font-bold text-slate-800 mb-4 flex items-center text-lg">
          <Icon name="MapPin" size={20} className="mr-3 text-emerald-600" />
          Nationwide Service Centers
        </h4>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Icon name="Phone" size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">24/7 Helpline</p>
                <p className="text-slate-600">1800-AYUR-HELP</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Icon name="Mail" size={16} className="text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">Official Email</p>
                <p className="text-slate-600">support@ayursutra.gov.in</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <Icon name="Clock" size={16} className="text-purple-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-800">Service Hours</p>
              <p className="text-slate-600">Monday - Saturday: 6:00 AM - 10:00 PM | Sunday: 8:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicInfo;