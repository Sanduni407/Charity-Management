import React, { useState } from 'react';
import { Users, Heart, Calendar, DollarSign, FileText, TrendingUp, Bell, Settings,Search,Filter,MoreHorizontal,UserCheck,AlertCircle,CheckCircle,Clock,Plus,  ArrowRight, Eye} from 'lucide-react';
import StatsCard from '../components/adminDahboardComp/StatsCard';
import QuickActionCard from '../components/adminDahboardComp/QuickActionCard';
import ActivityItem from '../components/adminDahboardComp/ActivityItem';


const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const stats = [
    { 
      title: 'Total Users', 
      value: '1,284', 
      change: 12, 
      icon: Users, 
      color: 'bg-gradient-to-br from-blue-500 to-blue-600' 
    },
    { 
      title: 'Active Requests', 
      value: '67', 
      change: 8, 
      icon: Heart, 
      color: 'bg-gradient-to-br from-green-500 to-green-600' 
    },
    { 
      title: 'Total Donations', 
      value: '$24,580', 
      change: 15, 
      icon: DollarSign, 
      color: 'bg-gradient-to-br from-purple-500 to-purple-600' 
    },
    { 
      title: 'Upcoming Events', 
      value: '12', 
      change: -5, 
      icon: Calendar, 
      color: 'bg-gradient-to-br from-orange-500 to-orange-600' 
    }
  ];

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
      onClick: () => console.log('Navigate to Requests')
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
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo & Title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">EchoKind Admin</h1>
                  <p className="text-sm text-gray-500">Dashboard</p>
                </div>
              </div>
            </div>

            {/* Search & Actions */}
            <div className="flex items-center space-x-4">
              
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
              
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>

              {/* Admin Avatar */}
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Admin! 👋</h2>
          <p className="text-gray-600">Here's what's happening with your charity management system today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>
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
  );
};

export default AdminDashboard;