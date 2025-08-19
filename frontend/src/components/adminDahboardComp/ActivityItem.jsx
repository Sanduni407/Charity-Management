import React, { useState } from 'react';
import { Users, Heart, Calendar, DollarSign, FileText, TrendingUp, Bell, Settings,Search,Filter,MoreHorizontal,UserCheck,AlertCircle,CheckCircle,Clock,Plus,  ArrowRight, Eye} from 'lucide-react';



const ActivityItem = ({ type, title, time, status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'request': return <Heart className="w-4 h-4" />;
      case 'donation': return <DollarSign className="w-4 h-4" />;
      case 'event': return <Calendar className="w-4 h-4" />;
      case 'user': return <Users className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          {getIcon(type)}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
      {status && (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
          {status}
        </span>
      )}
    </div>
  );
};


export default ActivityItem;
