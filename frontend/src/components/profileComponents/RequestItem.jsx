import React from 'react'
import { User, FileText, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';


const RequestItem = ({ request }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-review': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in-review': return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-semibold text-slate-800">
              {request.title}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(request.status)}`}>
              {getStatusIcon(request.status)}
              <span className="capitalize">{request.status.replace('-', ' ')}</span>
            </span>
          </div>
          <p className="text-slate-600 text-sm mb-2">
            {request.description}
          </p>
          <div className="text-xs text-slate-400">
            Submitted: {new Date(request.date).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestItem 