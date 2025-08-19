import React from 'react'
import { User, FileText, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import RequestItem from './RequestItem';

const OngoingRequests = ({ requests }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Your Requests</h2>
        <div className="text-sm text-slate-500">
          {requests.length} total requests
        </div>
      </div>
      
      <div className="space-y-4">
        {requests.map((request) => (
          <RequestItem key={request.id} request={request} />
        ))}
      </div>
      
      {requests.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-500 mb-2">
            No requests yet
          </h3>
          <p className="text-slate-400">
            Submit your first request to get started
          </p>
        </div>
      )}
    </div>
  );
};



export default OngoingRequests
