import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff, ArrowLeft, Loader2, Heart, Users, Shield, CheckCircle } from 'lucide-react';

const SignUpPage = () => {
  const [currentStep, setCurrentStep] = useState('signup'); // 'signup' or 'otp'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',        // changed from fullName to name to match model
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setOtp(value);
      if (error) setError('');
    }
  };

  const handleSignUp = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Axios request to backend matching your Mongoose model
      const response = await axios.post('http://localhost:4000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        password: formData.password
      });

      if (response.data.success) {
        setCurrentStep('otp');
      } else {
        setError(response.data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (otp.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/api/auth/verify', {
        email: formData.email,
        otp: otp
      });

      if (response.data.success) {
        window.location.href = '/login'; // Redirect to login page
      } else {
        setError(response.data.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSignup = () => {
    setCurrentStep('signup');
    setOtp('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Side - Hero Section */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center text-white relative overflow-hidden"
               style={{
                 backgroundImage: ` url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80')`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat'
               }}>
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-indigo-700/40"></div>
            
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
              <div className="absolute bottom-20 right-10 w-24 h-24 border border-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <div className="mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  Join Our
                  <span className="block text-blue-200">Community</span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Connect with people who care. Make a difference in someone's life today.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-blue-100">Connect with thousands of donors and beneficiaries</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span className="text-blue-100">Secure and transparent help requests</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-blue-100">Verified profiles and genuine impact</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            {currentStep === 'signup' ? (
              <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
                  <p className="text-gray-600">Join our community and start making a difference</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">I want to</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                    >
                      <option value="">Choose your role</option>
                      <option value="Beneficiary">Receive Help (Beneficiary)</option>
                      <option value="Donor">Provide Help (Donor)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a strong password"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleSignUp}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>

                  <p className="text-center text-gray-600 text-sm">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                      Sign in here
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              // OTP Verification Step
              <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
                  <p className="text-gray-600">
                    We've sent a 6-digit code to <span className="font-medium">{formData.email}</span>
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                      Enter Verification Code
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={handleOtpChange}
                      placeholder="000000"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-center text-2xl font-mono tracking-widest focus:border-blue-500 focus:outline-none transition-colors"
                      maxLength={6}
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm text-center">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleOtpSubmit}
                    disabled={loading || otp.length !== 6}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Verifying...
                      </>
                    ) : (
                      'Verify Email'
                    )}
                  </button>

                  <button
                    onClick={handleBackToSignup}
                    className="w-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Sign Up
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;