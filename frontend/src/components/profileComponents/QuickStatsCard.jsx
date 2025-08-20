import React from 'react';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

const QuickStatsCard = ({ ongoingRequests = [] }) => {
  const pendingCount = ongoingRequests.filter(r => r.status === 'Pending').length;
  const approvedCount = ongoingRequests.filter(r => r.status === 'Approved').length;
  const rejectedCount = ongoingRequests.filter(r => r.status === 'Rejected').length;
  
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-emerald-100 rounded-xl">
          <FileText className="w-6 h-6 text-emerald-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 ml-3">
          Request Summary
        </h3>
      </div>
      
      <div className="space-y-4">
        {/* Total Requests */}
        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
          <span className="text-slate-700 font-medium">Total Requests</span>
          <span className="px-3 py-1 bg-slate-200 text-slate-800 rounded-full text-sm font-bold">
            {ongoingRequests.length}
          </span>
        </div>
        
        {/* Pending */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-slate-600">Pending Review</span>
          </div>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            {pendingCount}
          </span>
        </div>
        
        {/* Approved */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-slate-600">Approved</span>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {approvedCount}
          </span>
        </div>
        
        {/* Rejected */}
        {rejectedCount > 0 && (
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <XCircle className="w-4 h-4 text-red-600 mr-2" />
              <span className="text-slate-600">Rejected</span>
            </div>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              {rejectedCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickStatsCard;