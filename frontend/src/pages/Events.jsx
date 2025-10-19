import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import EventCard from '../components/eventComponents/EventCard';
import { Calendar, TrendingUp, Users, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

const Events = () => {
  const { token } = useContext(AppContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('upcoming');

  useEffect(() => {
    fetchEvents();
  }, [filter, token]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const config = token ? { headers: { token } } : {};
      const res = await axios.get(
        `http://localhost:4000/api/event/all?status=${filter}`,
        config
      );

      if (res.data.success) {
        setEvents(res.data.data);
      }
    } catch (err) {
      console.error('Fetch events error:', err);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-950 to-rose-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Workshops & Events</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join our skill development workshops and empower yourself for a brighter future
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Calendar className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold">{events.length}+</div>
              <div className="text-sm text-white/80">Events</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Users className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-white/80">Participants</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm text-white/80">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-6xl mx-auto px-4 -mt-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2 inline-flex space-x-2">
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-6 py-2 rounded-xl font-medium transition-all ${
              filter === 'upcoming'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('ongoing')}
            className={`px-6 py-2 rounded-xl font-medium transition-all ${
              filter === 'ongoing'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Ongoing
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-6 py-2 rounded-xl font-medium transition-all ${
              filter === 'completed'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Error</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchEvents}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No {filter} Events
            </h3>
            <p className="text-gray-600">Check back soon for new workshops!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} onUpdate={fetchEvents} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;