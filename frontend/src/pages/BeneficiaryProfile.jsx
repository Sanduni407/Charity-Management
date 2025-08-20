import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import ProfileHeader from '../components/profileComponents/ProfileHeader';
import RequestHelpCard from '../components/profileComponents/RequestHelpCard';
import QuickStatsCard from '../components/profileComponents/QuickStatsCard';
import OngoingRequests from '../components/profileComponents/OngoingRequests';
import Navbar from '../components/Navbar';
import { AlertCircle, Loader2 } from 'lucide-react';

const BeneficiaryProfile = () => {
  const { token, name } = useContext(AppContext);
  const [ongoingRequests, setOngoingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await axios.post(
          'http://localhost:4000/api/help/my-requests',
          {},
          { headers: { token } }
        );
        
        console.log('Fetched requests:', res.data.data);
        setOngoingRequests(res.data.data || []);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setError('Failed to load your requests. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchRequests();
    }
  }, [token]);

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
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <ProfileHeader name={name} requests={ongoingRequests} />
        
        <div className="grid md:grid-cols-2 gap-6">
          <RequestHelpCard />
          <QuickStatsCard ongoingRequests={ongoingRequests} />
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-600">Loading your requests...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">Error Loading Requests</h3>
            <p className="text-slate-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <OngoingRequests requests={ongoingRequests} />
        )}
      </div>
    </div>
  );
};

export default BeneficiaryProfile;