import React, { useState } from "react";
import axios from "axios";
import { Mail, ArrowRight, Loader2, ArrowLeft, Shield, Clock, CheckCircle } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSendOtp = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:4000/api/auth/forgot-password", { email });

      if (response.data.success) {
        setSuccess(true);
        // Redirect to OTP verification page after 2 seconds
        setTimeout(() => {
          window.location.href = `/reset-otp-verify?email=${encodeURIComponent(email)}`;
        }, 2000);
      } else {
        setError(response.data.message || "Failed to send reset OTP");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendOtp();
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Reset OTP Sent!</h2>
          <p className="text-gray-600 mb-6">
            We've sent a password reset OTP to <strong>{email}</strong>. 
            Please check your inbox and follow the instructions to reset your password.
          </p>
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl text-sm">
            Redirecting to OTP verification...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[500px]">
          {/* Left Side - Hero Section */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center text-white relative overflow-hidden"
               style={{
                 backgroundImage: `url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat'
               }}>
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 to-blue-700/40"></div>
            
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 right-10 w-32 h-32 border border-white rounded-full"></div>
              <div className="absolute bottom-20 left-10 w-24 h-24 border border-white rounded-full"></div>
              <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-white rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <div className="mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  Password
                  <span className="block text-indigo-200">Recovery</span>
                </h1>
                <p className="text-xl text-indigo-100 leading-relaxed">
                  Don't worry, we'll help you regain access to your account securely.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email Verification</h3>
                    <p className="text-indigo-100 text-sm">We'll send a secure OTP to your registered email address.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Quick Process</h3>
                    <p className="text-indigo-100 text-sm">Reset your password in just a few simple steps.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Secure Process</h3>
                    <p className="text-indigo-100 text-sm">Your account security is protected throughout the process.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
                <p className="text-gray-600">Enter your email address and we'll send you a reset code</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your registered email"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending Reset Code...
                    </>
                  ) : (
                    <>
                      Send Reset Code
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Remember your password?</span>
                  </div>
                </div>

                <div className="text-center">
                  <a 
                    href="/login" 
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Sign In
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;