import React from 'react';
import { Search, Heart, Target, Clock, Users, MapPin, Calendar } from 'lucide-react';




const DonateCard= ({ post }) => {
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Low': return 'bg-white text-green-700 border border-green-300 shadow-sm';
      case 'Medium': return 'bg-white text-yellow-700 border border-yellow-300 shadow-sm';
      case 'High': return 'bg-white text-red-600 border border-red-300 shadow-sm';
      case 'Urgent': return 'bg-red-50 text-red-700 border border-red-400 shadow-md';
      default: return 'bg-white text-gray-700 border border-gray-300 shadow-sm';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-white text-green-700 border border-green-300 shadow-sm';
      case 'Completed': return 'bg-white text-blue-700 border border-blue-300 shadow-sm';
      case 'Closed': return 'bg-white text-gray-700 border border-gray-300 shadow-sm';
      default: return 'bg-white text-gray-700 border border-gray-300 shadow-sm';
    }
  };

  const progressPercentage = (post.collectedAmount / post.goalAmount) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200 group">
      <div className="relative">
        <img 
          src={`http://localhost:4000/uploads/${post.imageUrl}` }
          alt={post.beneficiaryName}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getUrgencyColor(post.urgencyLevel)}`}>
            {post.urgencyLevel}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(post.status)}`}>
            {post.status}
          </span>
        </div>
      </div>
      
      <div className="p-6 bg-white">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{post.beneficiaryName}</h3>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1 text-yellow-500" />
            {new Date(post.createdAt || post.timestamps?.createdAt).toLocaleDateString()}
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>
        
        {post.itemsToGive && post.itemsToGive.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Target className="h-4 w-4 mr-1 text-red-500" />
              Items needed:
            </p>
            <div className="flex flex-wrap gap-2">
              {post.itemsToGive.slice(0, 3).map((item, index) => (
                <span key={index} className="px-3 py-1 bg-white text-red-700 border border-red-200 rounded-full text-sm font-medium shadow-sm">
                  {item}
                </span>
              ))}
              {post.itemsToGive.length > 3 && (
                <span className="px-3 py-1 bg-white text-yellow-600 border border-yellow-200 rounded-full text-sm font-medium shadow-sm">
                  +{post.itemsToGive.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700 flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              Progress
            </span>
            <span className="text-sm text-gray-600 font-semibold">
              ${post.collectedAmount?.toLocaleString() || '0'} / ${post.goalAmount?.toLocaleString() || '0'}
            </span>
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-3 shadow-inner">
            <div 
              className="bg-gradient-to-r from-red-500 via-red-600 to-yellow-500 h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-bold text-gray-800 flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              {progressPercentage.toFixed(1)}% raised
            </span>
            <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
              <Heart className="h-4 w-4" />
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default DonateCard;