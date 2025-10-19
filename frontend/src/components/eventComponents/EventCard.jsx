import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Calendar, MapPin, Users, Clock, CheckCircle } from 'lucide-react';

const EventCard = ({ event, onUpdate }) => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const backendUrl = 'http://localhost:4000';

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const fillPercentage = ((event.registeredCount / event.capacity) * 100).toFixed(0);

  const handleRegister = () => {
    if (!token) {
      alert('Please login to register for events');
      navigate('/login');
      return;
    }
    navigate(`/event/${event._id}/register`);
  };

  const handleViewDetails = () => {
    navigate(`/event/${event._id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={`${backendUrl}${event.imageUrl}`}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {event.isRegistered && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            <CheckCircle className="w-3 h-3" />
            <span>Registered</span>
          </div>
        )}
        {event.isFull && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            FULL
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.purpose}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-blue-600" />
            <span>{formatDate(event.eventDate)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-blue-600" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-blue-600" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>

        {/* Capacity */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              Capacity
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
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={handleViewDetails}
            className="flex-1 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            View Details
          </button>
          {!event.isRegistered && !event.isFull && event.status === 'upcoming' && (
            <button
              onClick={handleRegister}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all font-medium"
            >
              Register
            </button>
          )}
          {event.isRegistered && (
            <button
              disabled
              className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium cursor-not-allowed"
            >
              Registered ✓
            </button>
          )}
          {event.isFull && !event.isRegistered && (
            <button
              disabled
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-500 rounded-lg font-medium cursor-not-allowed"
            >
              Full
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;