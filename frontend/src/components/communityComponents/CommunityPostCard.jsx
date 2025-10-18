import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import CommentSection from './CommentSection';
import LikeButton from './LikeButton';
import { 
  Heart, MessageCircle, User, Calendar, MoreVertical, 
  Edit2, Trash2, Share2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CommunityPostCard = ({ post, onUpdate, showActions = false }) => {
  const { token, email } = useContext(AppContext);
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isOwner = email === post.userEmail;
  const backendUrl = 'http://localhost:4000';

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Handle delete
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      setDeleting(true);
      const res = await axios.post(
        `http://localhost:4000/api/community/${post._id}`,{},
        { headers: { token } }
      );

      if (res.data.success) {
        alert('Post deleted successfully');
        onUpdate && onUpdate();
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert(err.response?.data?.message || 'Failed to delete post');
    } finally {
      setDeleting(false);
      setShowMenu(false);
    }
  };

  // Handle edit
  const handleEdit = () => {
    navigate('/community/edit', { state: { post } });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{post.userName}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>