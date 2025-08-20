import React, { useState } from 'react';
import { Users, Heart, Calendar, DollarSign, FileText, TrendingUp, Bell, Settings,Search,Filter,MoreHorizontal,UserCheck,AlertCircle,CheckCircle,Clock,Plus,  ArrowRight, Eye} from 'lucide-react';
import QuickActionCard from '../components/adminDahboardComp/QuickActionCard';
import ActivityItem from '../components/adminDahboardComp/ActivityItem';
import { useNavigate } from 'react-router-dom';
import AdminNavigation from '../components/AdminNavigation';


const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'View All Users',
      description: 'Manage registered users and their profiles',
      icon: Users,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      onClick: () => console.log('Navigate to Users')
    },
    {
      title: 'Review Requests',
      description: 'Approve or reject help requests from beneficiaries',
      icon: Heart,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      onClick: () => navigate('/admin-view-requests')
    },
    {
      title: 'Create Post',
      description: 'Post new fundraising requests to the community',
      icon: Plus,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      onClick: () => console.log('Navigate to Create Post')
    },
    {
      title: 'Manage Events',
      description: 'Create and organize charity events',
      icon: Calendar,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      onClick: () => console.log('Navigate to Events')
    },
    {
      title: 'View Donations',
      description: 'Track donations and manage financial records',
      icon: DollarSign,
      color: 'bg-gradient-to-br from-teal-500 to-teal-600',
      onClick: () => console.log('Navigate to Donations')
    },
    {
      title: 'Generate Reports',
      description: 'View detailed analytics and generate reports',
      icon: FileText,
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      onClick: () => console.log('Navigate to Reports')
    }
  ];

  const recentActivities = [
    { type: 'request', title: 'New help request from John Doe', time: '2 minutes ago', status: 'pending' },
    { type: 'donation', title: 'Donation of $500 received', time: '15 minutes ago', status: 'approved' },
    { type: 'user', title: 'New user registration: Jane Smith', time: '1 hour ago', status: 'approved' },
    { type: 'event', title: 'Charity Walk event created', time: '2 hours ago', status: 'approved' },
    { type: 'request', title: 'Help request approved for Maria Garcia', time: '3 hours ago', status: 'approved' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('https://www.pecva.org/wp-content/uploads/VCE_JMSWCD_VGBI_Event_Glenmore_Farm_Fauquier_County_9.21.22_credit_Hugh_Kenny_PEC-23-of-39-1024x683.jpg')`
        }}
      />
      
      {/* Glass Morphism Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/10"></div>
      
      {/* Content Wrapper */}
      <div className="relative z-10">
        <AdminNavigation/>
        
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Welcome Section */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-200 mb-2">Welcome back, Admin! 👋</h2>
            <p className="text-gray-200">Here's what's happening with your charity management system today.</p>
          </div>

          {/* Quick Actions */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-200">Quick Actions</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <QuickActionCard key={index} {...action} />
              ))}
            </div>
          </div>

          {/* Recent Activity & Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-1">
                {recentActivities.map((activity, index) => (
                  <ActivityItem key={index} {...activity} />
                ))}
              </div>

              <button className="w-full mt-4 py-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All Activity
              </button>
            </div>

            {/* Quick Overview */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">System Overview</h3>
              
              <div className="space-y-4">
                
                {/* Pending Approvals */}
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Pending Approvals</p>
                      <p className="text-xs text-gray-500">Requires attention</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-yellow-600">8</span>
                </div>

                {/* Active Campaigns */}
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Active Campaigns</p>
                      <p className="text-xs text-gray-500">Currently running</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-blue-600">12</span>
                </div>

                {/* Success Rate */}
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Success Rate</p>
                      <p className="text-xs text-gray-500">This month</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-green-600">94%</span>
                </div>

                {/* Quick Create */}
                <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors flex items-center justify-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Create New Campaign</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;