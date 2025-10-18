import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LikeButton = ({ postId, initialLiked, initialCount, onUpdate }) => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!token) {
      alert('Please login to like posts');
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      
      // Optimistic update
      setLiked(!liked);
      setCount(prev => liked ? prev - 1 : prev + 1);

      const res = await axios.post(
        `http://localhost:4000/api/community/${postId}/like`,
        {},
        { headers: { token } }
      );

      if (res.data.success) {
        setLiked(res.data.liked);
        setCount(res.data.likesCount);
        onUpdate && onUpdate();
      }
    } catch (err) {
      console.error('Like error:', err);
      // Revert on error
      setLiked(liked);
      setCount(initialCount);
      alert(err.response?.data?.message || 'Failed to update like');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 group"
    >
      <Heart
        className={`w-5 h-5 transition-all ${
          liked
            ? 'fill-rose-500 text-rose-500'
            : 'text-gray-600 group-hover:text-rose-500'
        }`}
      />
      <span
        className={`font-medium ${
          liked ? 'text-rose-500' : 'text-gray-600 group-hover:text-rose-500'
        }`}
      >
        {liked ? 'Liked' : 'Like'}
      </span>
      {count > 0 && (
        <span className="text-sm text-gray-500">({count})</span>
      )}
    </button>
  );
};

export default LikeButton;