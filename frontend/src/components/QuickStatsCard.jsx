import React from 'react'
import { User, FileText, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';

const QuickStatsCard = ({ ongoingRequests }) => {
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
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Pending</span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            {ongoingRequests.filter(r => r.status === 'pending').length}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600">In Review</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {ongoingRequests.filter(r => r.status === 'in-review').length}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Approved</span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {ongoingRequests.filter(r => r.status === 'approved').length}
          </span>
        </div>
      </div>
    </div>

  )
}

export default QuickStatsCard