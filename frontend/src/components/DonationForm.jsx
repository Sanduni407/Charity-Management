import React, { useState, useEffect, useContext } from 'react';
import { Heart, DollarSign, Loader2, X, Shield, Star, CheckCircle, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { AppContext } from '../context/AppContext'; // Adjust path as needed
import Footer from './Footer';

const DonationForm = ({ post, onClose }) => {
  const { token } = useContext(AppContext);
  const [amountLKR, setAmountLKR] = useState('');
  const [amountUSD, setAmountUSD] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(320);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        setExchangeRate(response.data.rates.LKR);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };
    fetchExchangeRate();
  }, []);

  useEffect(() => {
    if (amountLKR && exchangeRate) {
      const usdAmount = (parseFloat(amountLKR) / exchangeRate).toFixed(2);
      setAmountUSD(usdAmount);
    }
  }, [amountLKR, exchangeRate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!amountLKR || parseFloat(amountLKR) < 100) {
      newErrors.amountLKR = 'Please enter amount at least LKR 100';
    }
    
    if (!donorEmail || !/\S+@\S+\.\S+/.test(donorEmail)) {
      newErrors.donorEmail = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDonation = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/api/donations/create-checkout-session', {
        postId: post._id,
        amountLKR: parseFloat(amountLKR),
        donorName,
        donorEmail,
        donorPhone
      }, {
        headers: {
          token,  // Keep as 'token' since your middleware expects this
          'Content-Type': 'application/json'  // Changed from 'multipart/form-data' to 'application/json'
        }
      });

      if (response.data.success) {
        window.location.href = response.data.url;
      } else {
        alert('Error creating payment session');
      }
    } catch (error) {
      console.error('Donation error:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Error processing donation. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
      <div className="min-h-screen">
        
        {/* Professional Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={onClose}
                  className="flex items-center text-gray-600 hover:text-rose-600 transition-colors duration-300"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <h1 className="text-2xl font-bold text-gray-900">Make a Donation</h1>
              </div>
              <div className="flex items-center space-x-3">
                <div className="inline-flex items-center bg-green-50 text-green-700 rounded-full px-3 py-1 text-sm font-semibold border border-green-200">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Secure Payment
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Left Column - Beneficiary Info */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-rose-500  rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <div className="inline-flex items-center bg-yellow-50 text-yellow-700 rounded-full px-3 py-1 text-sm font-semibold mb-3 border border-yellow-200">
                      <Star className="w-4 h-4 mr-1" />
                      Verified Request
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{post.beneficiaryName}</h3>
                      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                        Request Code: <span className="font-semibold text-rose-600">{post.beneficiaryRequestCode}</span>
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Shield className="w-4 h-4 text-blue-600 mr-1" />
                          Secure
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                          Verified
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Donation Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Donation Details</h2>
                    <p className="text-gray-600">Every contribution makes a meaningful difference in someone's life.</p>
                  </div>

                  <div className="space-y-6">
                    
                    {/* Donation Amount */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        Donation Amount (LKR) *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={amountLKR}
                          onChange={(e) => setAmountLKR(e.target.value)}
                          className={`w-full p-4 border-2 rounded-xl text-lg font-semibold transition-all duration-300 ${
                            errors.amountLKR 
                              ? 'border-red-300 bg-red-50 focus:border-red-500' 
                              : 'border-gray-300 focus:border-blue-500 focus:bg-blue-50'
                          } focus:outline-none`}
                          placeholder="Enter amount in LKR"
                          min="100"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                      {errors.amountLKR && (
                        <p className="text-red-600 text-sm mt-2 flex items-center">
                          <X className="w-4 h-4 mr-1" />
                          {errors.amountLKR}
                        </p>
                      )}
                      {amountUSD > 0 && !errors.amountLKR && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-800 font-medium">
                            ≈ ${amountUSD} USD
                          </p>
                          <p className="text-xs text-blue-600 mt-1">
                            Exchange Rate: 1 USD = {exchangeRate.toFixed(2)} LKR
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Donor Information Section */}
                    <div className="pt-6 border-t border-gray-100">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Your Information</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:bg-blue-50 focus:outline-none transition-all duration-300"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            className={`w-full p-4 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                              errors.donorEmail 
                                ? 'border-red-300 bg-red-50 focus:border-red-500' 
                                : 'border-gray-300 focus:border-blue-500 focus:bg-blue-50'
                            }`}
                            placeholder="Enter your email address"
                            required
                          />
                          {errors.donorEmail && (
                            <p className="text-red-600 text-sm mt-2 flex items-center">
                              <X className="w-4 h-4 mr-1" />
                              {errors.donorEmail}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={donorPhone}
                            onChange={(e) => setDonorPhone(e.target.value)}
                            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:bg-blue-50 focus:outline-none transition-all duration-300"
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Security Notice */}
                    <div className="bg-gradient-to-r from-blue-50 to-rose-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start">
                        <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-semibold text-gray-800 mb-1">Secure Payment Processing</h4>
                          <p className="text-xs text-gray-600">
                            Your payment is processed securely through our encrypted payment gateway. 
                            We never store your financial information.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-6">
                      <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 py-4 px-6 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDonation}
                        disabled={loading}
                        className="flex-2 py-4 px-8 bg-gradient-to-r from-blue-950 to-blue-800 text-white rounded-xl font-semibold hover:from-blue-800 hover:to-blue-950 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg hover:shadow-xl"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Processing Payment...
                          </>
                        ) : (
                          <>
                            <Heart className="h-5 w-5" />
                            Complete Donation
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Footer */}
       <Footer/>
      </div>
    </div>
  );
};

export default DonationForm;