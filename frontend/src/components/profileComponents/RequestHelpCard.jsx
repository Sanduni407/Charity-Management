import React from 'react';
import { User, FileText, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';


 const RequestHelpCard = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-sm"></div>
      <div className="absolute bottom-8 left-8 w-8 h-8 bg-white/10 rounded-full blur-sm"></div>
      <div className="absolute top-12 left-12 w-4 h-4 bg-white/20 rounded-full"></div>
      
      <div className="relative p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl group-hover:bg-white/30 transition-colors">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <div className="text-white/80 group-hover:translate-x-1 transition-transform text-xl">
            →
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">
          Need Help?
        </h3>
        <p className="text-white/90 mb-6 leading-relaxed">
          Submit a new request for assistance. Our dedicated team will review and respond to your needs promptly.
        </p>
        
      <Link to='/help'> <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 rounded-xl font-medium hover:bg-white/30 transition-all duration-200 border border-white/20">
          Submit Request
        </button></Link> 
      </div>
    </div>
  );
};


export default RequestHelpCard