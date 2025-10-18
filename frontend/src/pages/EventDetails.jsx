import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import { 
  Calendar, MapPin, Users, Clock, ArrowLeft, 
  CheckCircle, Package, User, Phone, Mail, Loader2, AlertCircle 
} from 'lucide-react';
import axios from 'axios';

const EventDetails = () => {
  const { eventId } = useParams();
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = 'http://localhost:4000';

  useEffect(() => {
    fetchEvent();
  }, [eventId, token]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const config = token ? { headers: { token } } : {};
      const res = await axios.get(
        `http://localhost:4000/api/event/${eventId}`,
        config
      );

      if (res.data.success) {
        setEvent(res.data.data);
      }
    } catch (err) {
      console.error('Fetch event error:', err);
      setError('Failed to load event details');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleRegister = () => {
    if (!token) {
      alert('Please login to register');
      navigate('/login');
      return;
    }
    navigate(`/event/${eventId}/register`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl p-12 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Error</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const fillPercentage = ((event.registeredCount / event.capacity) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Events</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={`${backendUrl}${event.imageUrl}`}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              {event.isRegistered && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>You're Registered!</span>
                </div>
              )}
            </div>

            {/* Title & Purpose */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
              <div className="flex items-start space-x-2 bg-blue-50 p-4 rounded-xl">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Purpose</h3>
                  <p className="text-gray-700">{event.purpose}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Workshop</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{event.description}</p>
            </div>

            {/* Items to Carry */}
            {event.itemsToCarry && event.itemsToCarry.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-blue-600" />
                  What to Bring
                </h2>
                <ul className="space-y-2">
                  {event.itemsToCarry.map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Organizer Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Organizer Information</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{event.organizer}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{event.organizerContact}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Event Details Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium text-gray-900">{formatDate(event.eventDate)}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium text-gray-900">{event.startTime} - {event.endTime}</p>
                    <p className="text-sm text-gray-600">Duration: {event.duration}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Venue</p>
                    <p className="font-medium text-gray-900">{event.venue}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Capacity</p>
                    <p className="font-medium text-gray-900">
                      {event.registeredCount} / {event.capacity} registered
                    </p>
                  </div>
                </div>
              </div>

              {/* Capacity Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Seats Filled</span>
                  <span className="font-semibold text-gray-900">{fillPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      fillPercentage >= 90 ? 'bg-red-500' : fillPercentage >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${fillPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {event.capacity - event.registeredCount} seats remaining
                </p>
              </div>

              {/* Registration Button */}
              {event.isRegistered ? (
                <div>
                  <button
                    disabled
                    className="w-full py-3 bg-green-100 text-green-700 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Already Registered</span>
                  </button>
                  {event.registrationDetails && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">Your Registration Code:</p>
                      <p className="font-mono font-bold text-blue-600">
                        {event.registrationDetails.registrationCode}
                      </p>
                    </div>
                  )}
                </div>
              ) : event.isFull ? (
                <button
                  disabled
                  className="w-full py-3 bg-gray-100 text-gray-500 rounded-xl font-semibold cursor-not-allowed"
                >
                  Event Full
                </button>
              ) : event.status !== 'upcoming' ? (
                <button
                  disabled
                  className="w-full py-3 bg-gray-100 text-gray-500 rounded-xl font-semibold cursor-not-allowed"
                >
                  Registration Closed
                </button>
              ) : (
                <button
                  onClick={handleRegister}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
                >
                  Register Now
                </button>
              )}

              {!token && (
                <p className="text-xs text-center text-gray-500 mt-3">
                  Please login to register for this event
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;