import React, { useState } from 'react';
import { Users, Heart, Calendar, DollarSign, FileText, TrendingUp, Bell, Settings,Search,Filter,MoreHorizontal,UserCheck,AlertCircle,CheckCircle,Clock,Plus,  ArrowRight, Eye} from 'lucide-react';

const QuickActionCard = ({ title, description, icon: Icon, color, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer group hover:scale-[1.02]"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className={`inline-flex p-3 rounded-xl mb-4 ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
};


export default QuickActionCard;