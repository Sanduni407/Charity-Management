import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Calendar, MapPin, Users, Edit2, Trash2, BarChart3, Clock } from 'lucide-react';
import axios from 'axios';

const AdminEventCard = ({ event, onDelete, onUpdate }) => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const backendUrl = 'http://localhost:4000';

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      upcoming: 'bg-blue-100 text-blue-700',
      ongoing: 'bg-green-100 text-green-700',
      completed: 'bg-gray-100 text-gray-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const fillPercentage = ((event.registeredCount / event.capacity) * 100).toFixed(0);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={`${backendUrl}${event.imageUrl}`}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(event.eventDate)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>

        {/* Capacity Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              Registrations
            </span>
            <span className="font-semibold text-gray-900">
              {event.registeredCount} / {event.capacity}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                fillPercentage >= 90 ? 'bg-red-500' : fillPercentage >= 70 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${fillPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{fillPercentage}% Full</p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => navigate(`/admin/event/${event._id}/analytics`)}
            className="flex items-center justify-center space-x-1 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </button>
          <button
            onClick={() => navigate('/admin/edit-event', { state: { event } })}
            className="flex items-center justify-center space-x-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(event._id)}
            className="flex items-center justify-center space-x-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEventCard;