import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Send, User, Calendar, Trash2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CommentSection = ({ postId, onUpdate }) => {
  const { token, email } = useContext(AppContext);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch comments
  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:4000/api/community/${postId}/comments`
      );

      if (res.data.success) {
        setComments(res.data.data);
      }
    } catch (err) {
      console.error('Fetch comments error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!token) {
      alert('Please login to comment');
      navigate('/login');
      return;
    }

    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      const res = await axios.post(
        `http://localhost:4000/api/community/${postId}/comment`,
        { comment: newComment },
        { headers: { token } }
      );

      if (res.data.success) {
        setComments(prev => [res.data.data, ...prev]);
        setNewComment('');
        onUpdate && onUpdate();
      }
    } catch (err) {
      console.error('Add comment error:', err);
      alert(err.response?.data?.message || 'Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;

    try {
      const res = await axios.post(
        `http://localhost:4000/api/community/${postId}/comment/${commentId}`,{},
        { headers: { token } }
      );

      if (res.data.success) {
        setComments(prev => prev.filter(c => c._id !== commentId));
        onUpdate && onUpdate();
      }
    } catch (err) {
      console.error('Delete comment error:', err);
      alert(err.response?.data?.message || 'Failed to delete comment');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="p-4 bg-gray-50">
      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} className="mb-4">
        <div className="flex space-x-2">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 flex space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {loading ? (
          <div className="text-center py-4">
            <Loader2 className="w-6 h-6 text-gray-400 animate-spin mx-auto" />
          </div>
        ) : comments.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => {
            const isOwner = comment.userId?.email === email || comment.userEmail === email;
            
            return (
              <div key={comment._id} className="flex space-x-3 bg-white p-3 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="font-semibold text-sm text-gray-900">
                        {comment.userName}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    {isOwner && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="p-1 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm break-words">{comment.comment}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CommentSection;