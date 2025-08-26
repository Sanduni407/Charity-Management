import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'; 
import Navbar from '../components/Navbar';
import { 
  Heart, Upload, User, MapPin, Calendar, FileText, 
  DollarSign, CreditCard, Send, Loader 
} from 'lucide-react';

const HelpRequestForm = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    location: '',
    typeOfHelp: '',
    description: '',
    requestedAmount: '',
    paymentDetails: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const helpTypes = [
    'Financial Aid',
    'Medical Support',
    'Food Assistance',
    'Educational Support',
    'Emergency Relief',
    'Housing Support',
    'Other'
  ];

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) data.append(key, formData[key]);
    });
    if (file) data.append('evidenceFile', file);

    try {
      if (!token) {
        alert('You must be logged in to submit a request.');
        return;
      }

      await axios.post('http://localhost:4000/api/help/submit', data, {
        headers: { token, 'Content-Type': 'multipart/form-data' }
      });

      navigate('/beneficiary-profile'); // navigate after success
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error submitting help request');
    } finally {
      setLoading(false);
    }
  };

  const isFinancialAid = formData.typeOfHelp === 'Financial Aid';

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop')`
        }}
      />

      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/20"></div>

      {/* Form Container */}
      <div className="relative z-10 flex justify-center items-start min-h-screen pt-10 px-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-full mb-4">
              <Heart className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Request Help</h1>
            <p className="text-gray-600">Fill in the details to submit your help request</p>
          </div>

          {/* Form Card */}
          <form 
            onSubmit={handleSubmit} 
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          >
            <div className="p-8 space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <User className="w-4 h-4 text-blue-900 mr-2" /> Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-all duration-200"
                />
              </div>

              {/* Age */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <Calendar className="w-4 h-4 text-blue-900 mr-2" /> Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-all duration-200"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <MapPin className="w-4 h-4 text-blue-900 mr-2" /> Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-all duration-200"
                />
              </div>

              {/* Type of Help */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <FileText className="w-4 h-4 text-blue-900 mr-2" /> Type of Help
                </label>
                <select
                  name="typeOfHelp"
                  value={formData.typeOfHelp}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-all duration-200 bg-white"
                >
                  <option value="">Select Type of Help</option>
                  {helpTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <FileText className="w-4 h-4 text-blue-900 mr-2" /> Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your situation"
                  rows="4"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-all duration-200 resize-none"
                />
              </div>

              {/* Financial Aid Fields */}
              {isFinancialAid && (
                <>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <DollarSign className="w-4 h-4 text-blue-900 mr-2" /> Requested Amount
                    </label>
                    <input
                      type="number"
                      name="requestedAmount"
                      value={formData.requestedAmount}
                      onChange={handleChange}
                      placeholder="Enter requested amount"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <CreditCard className="w-4 h-4 text-blue-900 mr-2" /> Payment Details (optional)
                    </label>
                    <input
                      type="text"
                      name="paymentDetails"
                      value={formData.paymentDetails}
                      onChange={handleChange}
                      placeholder="Enter payment info"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-all duration-200"
                    />
                  </div>
                </>
              )}

              {/* File Upload */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <Upload className="w-4 h-4 text-blue-900 mr-2" /> Supporting Document (optional)
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-900 file:text-white file:font-medium hover:file:bg-blue-800 file:cursor-pointer transition-all duration-200"
                />
                {file && (
                  <div className="mt-2 text-sm text-green-600 font-medium">
                    ✓ {file.name} selected
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpRequestForm;
