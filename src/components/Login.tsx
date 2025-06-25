import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Route to dashboard
      window.location.hash = '#dashboard';
      window.location.reload();
    }, 1500);
  };

  const handleSignUpClick = () => {
    window.location.hash = '#signup';
    window.location.reload();
  };

  // DEV ONLY – REMOVE BEFORE PRODUCTION
  const handleDevAccess = () => {
    window.location.hash = '#dashboard';
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-[#FF3B5C] rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-sm"></div>
            </div>
            <span className="text-2xl font-bold text-gray-900 font-space-grotesk">
              GlassConversion
            </span>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 font-space-grotesk">
            Log in to GlassConversion
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Welcome back, creator.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`appearance-none relative block w-full px-4 py-3 border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3B5C] focus:border-transparent transition-colors`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <div className="flex items-center space-x-2 mt-2 text-red-600">
                  <AlertCircle size={16} />
                  <span className="text-sm">{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`appearance-none relative block w-full px-4 py-3 pr-12 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3B5C] focus:border-transparent transition-colors`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center space-x-2 mt-2 text-red-600">
                  <AlertCircle size={16} />
                  <span className="text-sm">{errors.password}</span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-[#FF3B5C] hover:bg-[#E63350] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3B5C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Logging in...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Login</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </button>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={handleSignUpClick}
                className="font-semibold text-[#FF3B5C] hover:text-[#E63350] transition-colors"
              >
                Start free
              </button>
            </p>
          </div>

          {/* DEV ONLY – REMOVE BEFORE PRODUCTION */}
          <div className="border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={handleDevAccess}
              className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Developer Access
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;