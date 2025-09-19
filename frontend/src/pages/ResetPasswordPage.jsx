import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff, Loader2, ArrowRight, Shield, Lock, CheckCircle, X } from "lucide-react";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Password strength validation
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  useEffect(() => {
    // Get email from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    } else {
      // If no email in URL, redirect to forgot password page
      window.location.href = "/forgot-password";
    }
  }, []);

  useEffect(() => {
    // Validate password strength
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  }, [password]);

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      setError("Both password fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Check password strength
    const isPasswordStrong = Object.values(passwordValidation).every(Boolean);
    if (!isPasswordStrong) {
      setError("Please ensure your password meets all requirements");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:4000/api/auth/reset-password", {
        email,
        password
      });

      if (response.data.success) {
        setSuccess(true);
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } else {
        setError(response.data.message || "Password reset failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const getValidationIcon = (isValid) => {
    return isValid ? 
      <CheckCircle className="w-4 h-4 text-green-500" /> : 
      <X className="w-4 h-4 text-gray-400" />;
  };

  const getValidationColor = (isValid) => {
    return isValid ? 'text-green-600' : 'text-gray-500';
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Password Reset Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl text-sm">
            Redirecting to login page...
          </div>
          <button
            onClick={() => window.location.href = "/login"}
            className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Go to Login Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Side - Hero Section */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center text-white relative overflow-hidden"
               style={{
                 backgroundImage: `url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
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
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  Create New
                  <span className="block text-indigo-200">Password</span>
                </h1>
                <p className="text-xl text-indigo-100 leading-relaxed">
                  Your OTP has been verified. Now create a strong new password.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Strong Security</h3>
                    <p className="text-indigo-100 text-sm">Use a combination of letters, numbers, and symbols.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Password Requirements</h3>
                    <p className="text-indigo-100 text-sm">Minimum 8 characters with mixed case and special characters.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Account Recovery</h3>
                    <p className="text-indigo-100 text-sm">Your account will be fully restored after password reset.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
                <p className="text-gray-600">
                  Create a new password for <strong className="text-indigo-600">{email}</strong>
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your new password"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:border-indigo-500 focus:outline-none transition-colors"
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
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:border-indigo-500 focus:outline-none transition-colors"
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

                {/* Password Requirements */}
                {password && (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Password Requirements:</h4>
                    <div className="space-y-2">
                      <div className={`flex items-center space-x-2 text-xs ${getValidationColor(passwordValidation.length)}`}>
                        {getValidationIcon(passwordValidation.length)}
                        <span>At least 8 characters</span>
                      </div>
                      <div className={`flex items-center space-x-2 text-xs ${getValidationColor(passwordValidation.uppercase)}`}>
                        {getValidationIcon(passwordValidation.uppercase)}
                        <span>One uppercase letter</span>
                      </div>
                      <div className={`flex items-center space-x-2 text-xs ${getValidationColor(passwordValidation.lowercase)}`}>
                        {getValidationIcon(passwordValidation.lowercase)}
                        <span>One lowercase letter</span>
                      </div>
                      <div className={`flex items-center space-x-2 text-xs ${getValidationColor(passwordValidation.number)}`}>
                        {getValidationIcon(passwordValidation.number)}
                        <span>One number</span>
                      </div>
                      <div className={`flex items-center space-x-2 text-xs ${getValidationColor(passwordValidation.special)}`}>
                        {getValidationIcon(passwordValidation.special)}
                        <span>One special character</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Password Match Indicator */}
                {confirmPassword && (
                  <div className={`text-sm flex items-center space-x-2 ${
                    password === confirmPassword ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {password === confirmPassword ? 
                      <CheckCircle className="w-4 h-4" /> : 
                      <X className="w-4 h-4" />
                    }
                    <span>
                      {password === confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                    </span>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleResetPassword}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Resetting Password...
                    </>
                  ) : (
                    <>
                      Reset Password
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-gray-600 text-sm">
                    Remember your password?{" "}
                    <a href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
                      Sign In
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;