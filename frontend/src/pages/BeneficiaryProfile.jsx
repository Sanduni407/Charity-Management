import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import ProfileHeader from '../components/profileComponents/ProfileHeader';
import RequestHelpCard from '../components/profileComponents/RequestHelpCard';
import QuickStatsCard from '../components/QuickStatsCard';
import OngoingRequests from '../components/profileComponents/OngoingRequests ';
import Navbar from '../components/Navbar';

const BeneficiaryProfile = () => {
  const { token, name } = useContext(AppContext);

  const ongoingRequests = [
    { id: 1, title: "Food Assistance", status: "pending", date: "2024-01-15", description: "Monthly food supplies for family of 4" },
    { id: 2, title: "Medical Aid", status: "approved", date: "2024-01-10", description: "Emergency medical treatment support" },
    { id: 3, title: "Educational Support", status: "in-review", date: "2024-01-08", description: "School supplies and books" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* ✅ Full-width navbar at the top */}
      <Navbar />

      {/* Page content with padding */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Profile Header */}
        <ProfileHeader name={name} />

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <RequestHelpCard />
          <QuickStatsCard ongoingRequests={ongoingRequests} />
        </div>

        {/* Ongoing Requests */}
        <OngoingRequests requests={ongoingRequests} />
      </div>
    </div>
  )
}

export default BeneficiaryProfile
