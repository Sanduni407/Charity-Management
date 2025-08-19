import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext'; 
import Navbar from '../components/Navbar'; // ✅ Navbar
import { 
  Heart, Upload, User, MapPin, Calendar, FileText, 
  DollarSign, CreditCard, Send, Loader 
} from 'lucide-react';

const HelpRequestForm = () => {
  const { token } = useContext(AppContext);

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

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

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

      const res = await axios.post(
        'http://localhost:4000/api/help/submit',
        data,
        {
          headers: {
            token,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      alert(res.data.message || 'Help request submitted!');
      setFormData({
        fullName: '',
        age: '',
        location: '',
        typeOfHelp: '',
        description: '',
        requestedAmount: '',
        paymentDetails: ''
      });
      setFile(null);
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
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Background with donation image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop")`
        }}
      >
      
      </div>

      {/* Form Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 border border-white/30">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Request Help</h1>
            <p className="text-white/80">We're here to support you in your time of need</p>
          </div>

          {/* Form */}
          <form 
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl space-y-6"
          >
            {/* Full Name */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/30"
              />
            </div>

            {/* Age */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                required
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/30"
              />
            </div>

            {/* Location */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                required
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/30"
              />
            </div>

         {/* Type of Help */}
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-5 h-5 text-white/60" />
             <select
               name="typeOfHelp"
               value={formData.typeOfHelp}
               onChange={handleChange}
               required
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 appearance-none focus:ring-2 focus:ring-white/30"
              >
              <option value="" className="bg-white text-black">
                    Select Type of Help
              </option>
             {helpTypes.map((type) => (
              <option key={type} value={type} className="bg-white text-black">
               {type}
             </option>
              ))}
         </select>
       </div>



            {/* Description */}
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your situation"
              rows="4"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/30"
            ></textarea>

            {/* Financial Aid Fields */}
            {isFinancialAid && (
              <>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type="number"
                    name="requestedAmount"
                    value={formData.requestedAmount}
                    onChange={handleChange}
                    placeholder="Requested Amount"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/30"
                  />
                </div>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type="text"
                    name="paymentDetails"
                    value={formData.paymentDetails}
                    onChange={handleChange}
                    placeholder="Payment Details (optional)"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/30"
                  />
                </div>
              </>
            )}

            {/* File Upload */}
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="flex items-center justify-center w-full px-4 py-3 bg-white/10 border border-dashed border-white/30 rounded-xl text-white/80 cursor-pointer hover:bg-white/20 transition"
              >
                <Upload className="w-5 h-5 mr-2" />
                {file ? file.name : 'Upload Supporting Document (optional)'}
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
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
          </form>

          {/* Footer */}
          <p className="text-center text-white/60 text-sm mt-6">
            Your information is secure and will be reviewed within 24-48 hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpRequestForm;
