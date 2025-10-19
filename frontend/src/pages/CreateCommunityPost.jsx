import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import { Upload, ImagePlus, X, Loader2, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const CreateCommunityPost = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const editPost = location.state?.post;

  const [formData, setFormData] = useState({
    topic: '',
    description: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      alert('Please login to create a post');
      navigate('/login');
      return;
    }

    if (editPost) {
      setFormData({
        topic: editPost.topic,
        description: editPost.description
      });
      setImagePreview(`http://localhost:4000${editPost.imageUrl}`);
    }
  }, [token, navigate, editPost]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Image size should be less than 10MB');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.topic.trim() || !formData.description.trim()) {
      alert('Please fill in all fields');
      return;
    }

    if (!editPost && !image) {
      alert('Please select an image');
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append('topic', formData.topic);
      data.append('description', formData.description);
      if (image) {
        data.append('image', image);
      }

      let res;
      if (editPost) {
        res = await axios.put(
          `http://localhost:4000/api/community/${editPost._id}`,
          data,
          {
            headers: {
              token,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else {
        res = await axios.post(
          'http://localhost:4000/api/community/create',
          data,
          {
            headers: {
              token,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }

      if (res.data.success) {
        alert(res.data.message);
        navigate('/community');
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert(err.response?.data?.message || 'Failed to submit post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {editPost ? 'Edit Post' : 'Create New Post'}
          </h1>
          <p className="text-gray-600 mt-2">
            Share your thoughts and experiences with the community
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Topic */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Topic *
            </label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="What's your post about?"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Share your story..."
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            ></textarea>
            <p className="text-sm text-gray-500 mt-2">
              {formData.description.length} characters
            </p>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image {!editPost && '*'}
            </label>

            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="imageInput"
                />
                <label
                  htmlFor="imageInput"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <ImagePlus className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 font-medium">Click to upload image</p>
                  <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                </label>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-500 to-blue-600 text-white rounded-xl hover:opacity-90 transition-all disabled:opacity-50 font-semibold flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{editPost ? 'Updating...' : 'Creating...'}</span>
                </>
              ) : (
                <span>{editPost ? 'Update Post' : 'Create Post'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunityPost;