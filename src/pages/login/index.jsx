import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import ClinicInfo from './components/ClinicInfo';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store user data in localStorage
    localStorage.setItem('ayursutra_user', JSON.stringify({
      email: formData?.email,
      role: formData?.userRole,
      isAuthenticated: true,
      loginTime: new Date()?.toISOString()
    }));
    
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>AyurSutra Login | Digital Healthcare Platform</title>
        <meta name="description" content="Secure access to AyurSutra - India's premier digital Ayurvedic healthcare platform. Government-approved, citizen-friendly healthcare services." />
        <meta name="keywords" content="ayurvedic healthcare, digital health platform, government approved, citizen services, panchakarma treatment" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50">
        {/* Header */}
        <header className="w-full py-6 px-6 bg-white/90 backdrop-blur-md border-b border-blue-200/50 shadow-soft">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary shadow-colorful">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  AyurSutra
                </span>
                <p className="text-xs text-blue-600 font-medium">Government Approved Healthcare Platform</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-100 rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-emerald-700">24/7 Support</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-blue-700">Emergency Helpline</p>
                <p className="text-lg font-bold text-blue-900">1800-AYUR-HELP</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-sm mb-6 shadow-elevated">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <span>Trusted by 50,000+ Citizens Across India</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                Digital Healthcare for
                <span className="block bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  Modern India
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Experience the future of Ayurvedic healthcare with our government-approved digital platform. 
                Seamless, secure, and citizen-centric health services.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Column - Clinic Information */}
              <div className="order-2 lg:order-1">
                <ClinicInfo />
              </div>

              {/* Right Column - Login Form */}
              <div className="order-1 lg:order-2">
                <div className="sticky top-8">
                  <div className="bg-white rounded-3xl shadow-elevated border border-blue-100 p-10 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 rounded-full -ml-12 -mb-12"></div>
                    
                    <div className="relative text-center mb-8">
                      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span className="text-sm font-medium text-blue-700">Secure Government Portal</span>
                      </div>
                      <h2 className="text-3xl font-bold text-slate-800 mb-2">
                        Welcome Back
                      </h2>
                      <p className="text-slate-600">
                        Sign in to access your personalized healthcare dashboard
                      </p>
                    </div>

                    <LoginForm onLogin={handleLogin} loading={loading} />
                  </div>

                  {/* Quick Access Demo Credentials */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-3 flex items-center">
                      <span className="w-3 h-3 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
                      Demo Access Credentials
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="bg-white/70 rounded-lg p-3 text-center">
                        <p className="font-semibold text-blue-700">Patient Portal</p>
                        <p className="text-slate-600">patient@ayursutra.com</p>
                        <p className="text-slate-600">patient123</p>
                      </div>
                      <div className="bg-white/70 rounded-lg p-3 text-center">
                        <p className="font-semibold text-emerald-700">Therapist Panel</p>
                        <p className="text-slate-600">therapist@ayursutra.com</p>
                        <p className="text-slate-600">therapist123</p>
                      </div>
                      <div className="bg-white/70 rounded-lg p-3 text-center">
                        <p className="font-semibold text-purple-700">Admin Dashboard</p>
                        <p className="text-slate-600">admin@ayursutra.com</p>
                        <p className="text-slate-600">admin123</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Signals Section */}
            <div className="mt-20">
              <TrustSignals />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12 px-6 mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">AyurSutra</h4>
                    <p className="text-sm text-slate-400">Digital Healthcare Platform</p>
                  </div>
                </div>
                <p className="text-slate-300 mb-4 max-w-md">
                  Bridging traditional Ayurvedic wisdom with cutting-edge digital technology 
                  to serve citizens across India with quality healthcare services.
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="px-3 py-1 bg-emerald-600 rounded-full text-white font-medium">
                    Government Approved
                  </span>
                  <span className="px-3 py-1 bg-blue-600 rounded-full text-white font-medium">
                    ISO Certified
                  </span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="hover:text-white transition-colors cursor-pointer">About Platform</div>
                  <div className="hover:text-white transition-colors cursor-pointer">Treatment Programs</div>
                  <div className="hover:text-white transition-colors cursor-pointer">Find Doctors</div>
                  <div className="hover:text-white transition-colors cursor-pointer">Citizen Resources</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Support</h4>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="hover:text-white transition-colors cursor-pointer">Help Center</div>
                  <div className="hover:text-white transition-colors cursor-pointer">Privacy Policy</div>
                  <div className="hover:text-white transition-colors cursor-pointer">Terms of Service</div>
                  <div className="hover:text-white transition-colors cursor-pointer">Contact Us</div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-slate-700 mt-12 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <p className="text-sm text-slate-400">
                  &copy; {new Date()?.getFullYear()} AyurSutra Platform. All rights reserved. | DPDP 2023 Compliant
                </p>
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  <span className="text-sm text-slate-400">Powered by</span>
                  <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                    <span className="text-white font-semibold text-sm">CuraCore</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LoginPage;