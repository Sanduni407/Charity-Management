import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import AdminNavigation from '../components/AdminNavigation';
import AdminEventCard from '../components/eventComponents/AdminEventCard';
import { Plus, Calendar, TrendingUp, Users, AlertCircle, Loader2, BarChart3 } from 'lucide-react';
import axios from 'axios';

const AdminManageEvents = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchEvents();
    fetchAnalytics();
  }, [token]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        'http://localhost:4000/api/event/admin/my-events',
        {},
        { headers: { token } }
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

  const fetchAnalytics = async () => {
    try {
      const res = await axios.post(
        'http://localhost:4000/api/event/admin/analytics/all',
        {},
        { headers: { token } }
      );

      if (res.data.success) {
        setAnalytics(res.data.data);
      }
    } catch (err) {
      console.error('Fetch analytics error:', err);
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      const res = await axios.post(
        `http://localhost:4000/api/event/admin/${eventId}`,
        {},
        { headers: { token } }
      );

      if (res.data.success) {
        alert('Event deleted successfully');
        fetchEvents();
        fetchAnalytics();
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert(err.response?.data?.message || 'Failed to delete event');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <AdminNavigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Events</h1>
              <p className="text-gray-600">Create and manage workshops and charity events</p>
            </div>
            <button
              onClick={() => navigate('/admin/create-event')}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Create Workshop</span>
            </button>
          </div>

          {/* Quick Stats */}
          {analytics && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-10 h-10 text-blue-600" />
                  <span className="text-3xl font-bold text-gray-900">{analytics.totalEvents}</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">Total Events</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-10 h-10 text-green-600" />
                  <span className="text-3xl font-bold text-gray-900">{analytics.upcomingEvents}</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">Upcoming Events</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-10 h-10 text-purple-600" />
                  <span className="text-3xl font-bold text-gray-900">{analytics.totalRegistrations}</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">Total Registrations</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <BarChart3 className="w-10 h-10 text-orange-600" />
                  <span className="text-3xl font-bold text-gray-900">{analytics.averageAttendance}%</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">Avg Fill Rate</p>
              </div>
            </div>
          )}
        </div>

        {/* Events List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl p-12 text-center">
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
          <div className="bg-white rounded-2xl p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Events Yet</h3>
            <p className="text-gray-600 mb-6">Create your first workshop to get started</p>
            <button
              onClick={() => navigate('/admin/create-event')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90"
            >
              Create First Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <AdminEventCard
                key={event._id}
                event={event}
                onDelete={handleDelete}
                onUpdate={fetchEvents}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManageEvents;