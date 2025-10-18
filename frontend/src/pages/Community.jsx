import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import CommunityPostCard from '../components/communityComponents/CommunityPostCard';
import CreatePostButton from '../components/communityComponents/CreatePostButton';
import { Users, TrendingUp, MessageCircle, Loader2, AlertCircle, Plus } from 'lucide-react';


const Community = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch community posts
  const fetchPosts = async (pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const config = token ? { headers: { token } } : {};
      const res = await axios.get(
        `http://localhost:4000/api/community/all?page=${pageNum}&limit=10`,
        config
      );

      if (res.data.success) {
        if (pageNum === 1) {
          setPosts(res.data.data);
        } else {
          setPosts(prev => [...prev, ...res.data.data]);
        }
        setHasMore(res.data.pagination.page < res.data.pagination.pages);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load community posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, [token]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage);
  };

  const handleCreatePost = () => {
    if (!token) {
      alert('Please login to create a post');
      navigate('/login');
      return;
    }
    navigate('/community/create');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-950 to-rose-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Community</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Share your stories, connect with others, and inspire change together
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold">{posts.length}+</div>
              <div className="text-sm text-white/80">Posts</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Users className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-white/80">Members</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <MessageCircle className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold">1.2K+</div>
              <div className="text-sm text-white/80">Comments</div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Button - Desktop */}
      <div className="max-w-4xl mx-auto px-4 -mt-6 mb-8">
        <button
          onClick={handleCreatePost}
          className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex items-center space-x-4 hover:shadow-xl transition-all duration-300 group"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-gray-500 group-hover:text-gray-700 transition-colors">
              Share your thoughts with the community...
            </p>
          </div>
          <span className="text-blue-600 font-semibold">Create Post</span>
        </button>
      </div>

      {/* Posts Feed */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        {loading && page === 1 ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Error</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => fetchPosts(1)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Posts Yet</h3>
            <p className="text-gray-600 mb-6">Be the first to share something with the community!</p>
            <button
              onClick={handleCreatePost}
              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-blue-600 text-white rounded-lg hover:opacity-90"
            >
              Create First Post
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {posts.map((post) => (
                <CommunityPostCard
                  key={post._id}
                  post={post}
                  onUpdate={() => fetchPosts(1)}
                />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-8 py-3 bg-white border-2 border-gray-300 rounded-full hover:border-blue-600 hover:text-blue-600 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                  ) : null}
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating Create Button - Mobile */}
      <CreatePostButton onClick={handleCreatePost} />
    </div>
  );
};

export default Community;