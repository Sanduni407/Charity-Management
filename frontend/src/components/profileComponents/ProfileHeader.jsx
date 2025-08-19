import React from 'react';
import { User, FileText, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';



const ProfileHeader = ({ name }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
      <div className="flex items-center space-x-6">
        {/* Avatar */}
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-2xl font-bold text-white">
            {name ? name.charAt(0).toUpperCase() : 'U'}
          </span>
        </div>
        
        {/* Profile Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            {name || 'User Name'}
          </h1>
          <p className="text-slate-600 flex items-center">
            <User className="w-4 h-4 mr-2" />
            Beneficiary Profile
          </p>
        </div>
        
        {/* Profile Stats */}
        <div className="hidden md:flex space-x-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-sm text-slate-500">Total Requests</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">1</div>
            <div className="text-sm text-slate-500">Approved</div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProfileHeader;