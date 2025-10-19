import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import CommunityPostCard from './CommunityPostCard';
import { Users, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

const UserCommunityPosts = () => {
  const { token } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(
        'http://localhost:4000/api/community/user/my-posts', {},
        { headers: { token } }
      );
      if (res.data.success) setPosts(res.data.data);
    } catch (err) {
      console.error('Fetch user posts error:', err);
      setError('Failed to load your community posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchUserPosts();
  }, [token]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-950 to-rose-800 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">My Community Posts</h2>
            <p className="text-white/80 text-sm">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchUserPosts}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              No Community Posts Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Share your story with the community
            </p>
            <button
              onClick={() => (window.location.href = '/community/create')}
              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-blue-600 text-white rounded-lg hover:opacity-90"
            >
              Create Your First Post
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <CommunityPostCard
                key={post._id}
                post={post}
                showActions={true}
                onUpdate={fetchUserPosts}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCommunityPosts;
