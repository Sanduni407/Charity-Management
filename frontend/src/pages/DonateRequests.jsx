import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DonateRequests = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/posts/');
        setPosts(response.data.posts);
      } catch (err) {
        setError('Failed to fetch posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="text-center py-10 text-gray-600 animate-pulse">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-teal-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
          Beneficiary Requests
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const progress = (post.collectedAmount / post.goalAmount) * 100 || 0;
            const urgencyColor =
              post.urgencyLevel === 'Urgent 🚨'
                ? 'bg-red-500'
                : post.urgencyLevel === 'High'
                ? 'bg-orange-500'
                : post.urgencyLevel === 'Medium'
                ? 'bg-yellow-500'
                : 'bg-green-500';

            return (
              <div
                key={post._id}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:-translate-y-2 hover:shadow-3xl transition-all duration-300"
              >
                <img
                  src={`http://localhost:4000/uploads/${post.imageUrl}`}
                  alt={post.beneficiaryName}
                  className="w-full h-56 object-cover transition-opacity duration-300 hover:opacity-90"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-5">
                    <h2 className="text-xl font-bold text-gray-900 line-clamp-1">{post.beneficiaryName}</h2>
                    <span className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${urgencyColor} animate-pulse-once`}>
                      {post.urgencyLevel}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-5 text-base line-clamp-2 leading-relaxed">{post.description}</p>
                  <div className="mb-5">
                    <p className="text-sm text-gray-600">Items Needed: {post.itemsToGive.join(', ') || 'None'}</p>
                  </div>
                  <div className="mb-5">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-700 mt-2 font-medium">
                      ${post.collectedAmount} raised of ${post.goalAmount}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Status: {post.status}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {posts.length === 0 && (
          <p className="text-center text-gray-600 py-10 text-lg">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default DonateRequests;