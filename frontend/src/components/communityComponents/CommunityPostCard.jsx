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

         {/* Menu - Only show if owner or showActions is true */}
        {(isOwner || showActions) && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
                <button
                  onClick={handleEdit}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Edit2 className="w-4 h-4 text-blue-600" />
                  <span>Edit Post</span>
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{deleting ? 'Deleting...' : 'Delete Post'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Topic Badge */}
      <div className="px-4 pb-2">
        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {post.topic}
        </span>
      </div>

      {/* Description */}
      <div className="px-4 pb-4">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.description}</p>
      </div>

      {/* Image */}
      {post.imageUrl && (
        <div className="relative w-full" style={{ maxHeight: '500px' }}>
          <img
            src={`${backendUrl}${post.imageUrl}`}
            alt={post.topic}
            className="w-full h-auto object-cover"
            style={{ maxHeight: '500px' }}
          />
        </div>
      )}

      {/* Stats */}
      <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
        <span>{post.likesCount} {post.likesCount === 1 ? 'like' : 'likes'}</span>
        <span>{post.commentsCount} {post.commentsCount === 1 ? 'comment' : 'comments'}</span>
      </div>

      {/* Actions */}
      <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-around">
        <LikeButton
          postId={post._id}
          initialLiked={post.isLiked}
          initialCount={post.likesCount}
          onUpdate={onUpdate}
        />

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <MessageCircle className={`w-5 h-5 ${showComments ? 'text-blue-600' : 'text-gray-600'}`} />
          <span className={`font-medium ${showComments ? 'text-blue-600' : 'text-gray-600'}`}>
            Comment
          </span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <Share2 className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-600">Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100">
          <CommentSection postId={post._id} onUpdate={onUpdate} />
        </div>
      )}
    </div>
  );
};

export default CommunityPostCard;