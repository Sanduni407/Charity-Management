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
