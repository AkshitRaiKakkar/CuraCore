import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onLogin, loading }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    userRole: 'patient'
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Mock credentials for different user types
  const mockCredentials = {
    patient: { email: 'patient@ayursutra.com', password: 'patient123' },
    therapist: { email: 'therapist@ayursutra.com', password: 'therapist123' },
    admin: { email: 'admin@ayursutra.com', password: 'admin123' }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({ ...prev, userRole: role }));
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    const expectedCredentials = mockCredentials?.[formData?.userRole];
    
    if (formData?.email !== expectedCredentials?.email || formData?.password !== expectedCredentials?.password) {
      setErrors({
        general: `Invalid credentials for ${formData?.userRole}. Use: ${expectedCredentials?.email} / ${expectedCredentials?.password}`
      });
      return;
    }
    
    // Simulate login process
    await onLogin(formData);
    
    // Navigate based on role
    const roleRoutes = {
      patient: '/patient-dashboard',
      therapist: '/therapist-dashboard',
      admin: '/therapist-dashboard' // Admin uses therapist dashboard for now
    };
    
    navigate(roleRoutes?.[formData?.userRole]);
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality will be implemented soon. Please contact platform administration.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div className="space-y-2">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your registered email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            className="w-full border-2 border-blue-100 focus:border-blue-500 rounded-xl p-4 text-lg transition-all duration-200"
          />
        </div>

        {/* Password Input */}
        <div className="relative space-y-2">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            className="w-full border-2 border-blue-100 focus:border-blue-500 rounded-xl p-4 text-lg pr-12 transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-12 text-slate-400 hover:text-blue-600 transition-colors"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>

        {/* Role Selection */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-slate-700">Select Your Portal</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'patient', label: 'Patient', icon: 'User', color: 'blue', gradient: 'from-blue-500 to-blue-600' },
              { value: 'therapist', label: 'Doctor', icon: 'Stethoscope', color: 'emerald', gradient: 'from-emerald-500 to-emerald-600' },
              { value: 'admin', label: 'Admin', icon: 'Shield', color: 'purple', gradient: 'from-purple-500 to-purple-600' }
            ]?.map((role) => (
              <button
                key={role?.value}
                type="button"
                onClick={() => handleRoleChange(role?.value)}
                className={`
                  flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105
                  ${formData?.userRole === role?.value
                    ? `border-${role?.color}-500 bg-gradient-to-br ${role?.gradient} text-white shadow-lg shadow-${role?.color}-500/25`
                    : `border-slate-200 bg-white text-slate-600 hover:border-${role?.color}-300 hover:bg-${role?.color}-50`
                  }
                `}
              >
                <Icon name={role?.icon} size={24} className="mb-2" />
                <span className="text-sm font-semibold">{role?.label}</span>
                <span className="text-xs opacity-75">Portal</span>
              </button>
            ))}
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Keep me signed in"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            name="rememberMe"
            size="sm"
            className="text-blue-600"
          />
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {/* General Error */}
        {errors?.general && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="text-sm text-red-700 font-medium">{errors?.general}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={loading}
          iconName="LogIn"
          iconPosition="left"
          className="mt-8 py-4 rounded-xl font-semibold text-lg gradient-primary hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 transform hover:scale-[1.02]"
        >
          {loading ? 'Signing In...' : 'Sign In Securely'}
        </Button>

        {/* Create Account Link */}
        <div className="text-center pt-6 border-t border-slate-100">
          <p className="text-sm text-slate-600">
            New to the platform?{' '}
            <button
              type="button"
              onClick={() => navigate('/patient-registration')}
              className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
            >
              Register as Patient
            </button>
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Healthcare professionals can contact admin for account setup
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;