import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import { AlertCircle, Loader2, User, Mail, Calendar, Shield, CheckCircle, XCircle } from 'lucide-react';

const DonorProfile = () => {
  const { token, name } = useContext(AppContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.post(
          'http://localhost:4000/api/auth/profile',
          {},
          { headers: { token } }
        );

        console.log('Profile data:', res.data);
        setProfileData(res.data.user || res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Authentication Required</h2>
          <p className="text-slate-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-white px-8 py-12 text-white">
            <div className="flex items-center space-x-6">
              <div className="bg-red-500 backdrop-blur-sm rounded-full p-6">
                <User className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome, {name || 'Donor'}!
                </h1>
                <p className="text-black font-semibold text-lg">
                  Your generous donations make a difference
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details Card */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-600">Loading your profile...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">Error Loading Profile</h3>
            <p className="text-slate-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : profileData ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
              <User className="w-6 h-6 mr-3 text-blue-600" />
              Profile Details
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-700 mb-1">Full Name</h3>
                    <p className="text-lg text-slate-800">{profileData.name}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2 mt-1">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-700 mb-1">Email Address</h3>
                    <p className="text-lg text-slate-800">{profileData.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-full p-2 mt-1">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-700 mb-1">Role</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {profileData.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Account Status */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className={`${profileData.isAccountVerified ? 'bg-green-100' : 'bg-red-100'} rounded-full p-2 mt-1`}>
                    {profileData.isAccountVerified ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-700 mb-1">Account Status</h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      profileData.isAccountVerified 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {profileData.isAccountVerified ? 'Verified' : 'Not Verified'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 rounded-full p-2 mt-1">
                    <Calendar className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-700 mb-1">Member Since</h3>
                    <p className="text-lg text-slate-800">
                      {formatDate(profileData.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full p-2 mt-1">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-700 mb-1">Last Updated</h3>
                    <p className="text-lg text-slate-800">
                      {formatDate(profileData.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Verification Alert */}
            {!profileData.isAccountVerified && (
              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                  <p className="text-yellow-800">
                    <strong>Account Verification Pending:</strong> Please verify your email address to unlock all features.
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">No Profile Data</h3>
            <p className="text-slate-600">Unable to load profile information.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorProfile;