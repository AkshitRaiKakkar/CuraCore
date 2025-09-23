import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      id: 1,
      title: 'ISO 27001:2013',
      subtitle: 'Information Security',
      icon: 'Shield',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'NABH Certified',
      subtitle: 'Healthcare Quality',
      icon: 'Award',
      color: 'emerald',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 3,
      title: 'DPDP 2023',
      subtitle: 'Data Protection',
      icon: 'Lock',
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      title: 'HIPAA Compliant',
      subtitle: 'Healthcare Privacy',
      icon: 'Eye',
      color: 'amber',
      gradient: 'from-amber-500 to-amber-600'
    }
  ];

  const partnerships = [
    { name: 'Ministry of AYUSH', icon: 'Building', color: 'blue' },
    { name: 'AIIA Partnership', icon: 'GraduationCap', color: 'emerald' },
    { name: 'CCIM Registered', icon: 'Stethoscope', color: 'purple' },
    { name: 'ASU&H Approved', icon: 'Heart', color: 'amber' }
  ];

  return (
    <div className="space-y-12">
      {/* Main Trust Banner */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-full text-white font-bold text-lg mb-8 shadow-elevated">
          <Icon name="Verified" size={20} />
          <span>Trusted by 50,000+ Citizens Across India</span>
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
        <h3 className="text-3xl font-bold text-slate-800 mb-4">
          Your Health Data is Protected by
          <span className="block text-blue-600">Enterprise-Grade Security</span>
        </h3>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          We maintain the highest standards of healthcare compliance and data protection, 
          ensuring your personal information remains secure and private.
        </p>
      </div>

      {/* Security & Compliance Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {certifications?.map((cert) => (
          <div
            key={cert?.id}
            className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-transparent hover:shadow-elevated transition-all duration-300 transform hover:scale-105 text-center relative overflow-hidden"
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${cert?.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            
            <div className="relative">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${cert?.gradient} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={cert?.icon} size={28} />
              </div>
              <h4 className="font-bold text-slate-800 text-lg mb-1">{cert?.title}</h4>
              <p className="text-sm text-slate-600 font-medium">{cert?.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Government Partnerships */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-3xl p-8 border border-blue-100">
        <div className="text-center mb-8">
          <h4 className="text-2xl font-bold text-slate-800 mb-3">Recognized by Leading Organizations</h4>
          <p className="text-slate-600 text-lg">
            Officially approved and partnered with top healthcare and government institutions
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {partnerships?.map((partner, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-4 bg-white rounded-xl border border-${partner?.color}-100 hover:shadow-md transition-all duration-200 group`}
            >
              <div className={`w-10 h-10 rounded-lg bg-${partner?.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={partner?.icon} size={20} className={`text-${partner?.color}-600`} />
              </div>
              <span className="text-sm font-bold text-slate-800">{partner?.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Testimonial */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100">
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center shadow-lg">
            <Icon name="Quote" size={24} />
          </div>
          <div className="flex-1">
            <p className="text-lg text-slate-700 italic mb-4 leading-relaxed">
              "The AyurSutra platform has revolutionized my healthcare experience. The digital tracking, 
              personalized treatment plans, and seamless doctor consultations make it incredibly convenient. 
              I feel more connected to my health journey than ever before."
            </p>
            <div className="flex items-center space-x-4">
              <div>
                <cite className="text-lg font-bold text-blue-700 not-italic">Dr. Priya Sharma</cite>
                <p className="text-sm text-slate-600">Verified Patient • Mumbai, Maharashtra</p>
              </div>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <Icon key={star} name="Star" size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-emerald-200 text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Icon name="Lock" size={24} />
          </div>
          <h4 className="font-bold text-slate-800 mb-2">End-to-End Encryption</h4>
          <p className="text-sm text-slate-600">All data is encrypted using military-grade security protocols</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-blue-200 text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Icon name="Shield" size={24} />
          </div>
          <h4 className="font-bold text-slate-800 mb-2">Zero Data Sharing</h4>
          <p className="text-sm text-slate-600">Your personal information is never shared with third parties</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-purple-200 text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Icon name="Eye" size={24} />
          </div>
          <h4 className="font-bold text-slate-800 mb-2">Complete Transparency</h4>
          <p className="text-sm text-slate-600">Full visibility into how your data is processed and stored</p>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;