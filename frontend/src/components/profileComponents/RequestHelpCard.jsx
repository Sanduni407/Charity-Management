import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const RequestHelpCard = () => {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 border border-slate-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.06]">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <defs>
            <pattern id="subtle-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#subtle-grid)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-4 right-4 w-12 h-12 bg-rose-100 rounded-full blur-sm"></div>
      <div className="absolute bottom-8 left-8 w-6 h-6 bg-blue-100 rounded-full blur-sm"></div>
      <div className="absolute top-12 left-12 w-3 h-3 bg-yellow-100 rounded-full"></div>
      
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-rose-100 rounded-xl group-hover:bg-rose-200 transition-colors">
            <Plus className="w-6 h-6 text-rose-600" />
          </div>
          <div className="text-slate-500 group-hover:translate-x-1 transition-transform text-xl">
            →
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Need Help?
        </h3>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Submit a new request for assistance. Our dedicated team will review and respond to your needs promptly.
        </p>
        
        <Link to='/help'>
          <button className="w-full bg-rose-600 text-white py-3 rounded-xl font-medium hover:bg-rose-700 transition-all duration-200 shadow-md">
            Submit Request
          </button>
        </Link> 
      </div>
    </div>
  );
};

export default RequestHelpCard;
