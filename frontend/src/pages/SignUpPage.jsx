import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';

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

  // --- Renders are the same as your previous code ---
  // Just make sure input name for Full Name is now 'name'
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {currentStep === 'signup' ? (
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Create Your Account</h1>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full border rounded-xl px-3 py-2"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full border rounded-xl px-3 py-2"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full border rounded-xl px-3 py-2"
            >
              <option value="">Select Role</option>
              <option value="Beneficiary">Beneficiary</option>
              <option value="Donor">Donor</option>
            </select>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full border rounded-xl px-3 py-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className="w-full border rounded-xl px-3 py-2"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <button
              onClick={handleSignUp}
              disabled={loading}
              className="w-full bg-teal-500 text-white py-2 rounded-xl"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </div>
      ) : (
        // OTP step
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Verify OTP</h1>
          <input
            type="text"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter 6-digit code"
            className="w-full border rounded-xl px-3 py-2 text-center"
            maxLength={6}
          />
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          <button
            onClick={handleOtpSubmit}
            disabled={loading || otp.length !== 6}
            className="w-full bg-teal-500 text-white py-2 rounded-xl mt-4"
          >
            {loading ? 'Verifying...' : 'Submit'}
          </button>
          <button onClick={handleBackToSignup} className="mt-2 text-sm text-gray-600 underline">
            Back to Signup
          </button>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
