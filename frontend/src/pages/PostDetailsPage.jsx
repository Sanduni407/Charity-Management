import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Calendar, Target, Loader2, ArrowLeft, Share2, Clock, MapPin, CheckCircle, Star } from "lucide-react";
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DonationForm from "../components/DonationForm";
import { AppContext } from '../context/AppContext'; // Adjust path as needed

const PostDetailsPage = () => {
  const { token } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/api/posts/${id}`, {
          headers: {
            token,  // Keep as 'token' since your middleware expects this
            'Content-Type': 'application/json'  // Changed from 'multipart/form-data' to 'application/json'
          }
        });
        
        if (response.data.success) {
          setPost(response.data.post);
        } else {
          setError('Post not found');
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setError('Error loading post details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id, token]);

  if (loading) {
    return (
      <>
        <Navbar/>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-gray-200 border-t-rose-600 rounded-full animate-spin mx-auto mb-4"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-8 h-8 text-rose-600 animate-pulse" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Impact Story</h3>
            <p className="text-gray-600">Preparing this meaningful request...</p>
          </div>
        </div>
        <Footer/>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar/>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
          <div className="text-center bg-white rounded-3xl shadow-2xl p-12 max-w-md mx-4">
            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-rose-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Request Not Found</h3>
            <p className="text-gray-600 mb-8">{error}</p>
            <button 
              onClick={() => navigate('/posts')} 
              className="bg-gradient-to-r from-rose-600 to-blue-700 text-white px-8 py-3 rounded-full hover:from-rose-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Back to All Requests
            </button>
          </div>
        </div>
        <Footer/>
      </>
    );
  }

  const progressPercentage = (post.collectedAmount / post.goalAmount) * 100;

  return (
    <>
      <Navbar/>
      
      {/* Clean Professional Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-rose-600 mb-6 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Requests
          </button>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center bg-green-50 text-green-700 rounded-full px-4 py-2 text-sm font-semibold mb-4 border border-green-200">
                <CheckCircle className="w-4 h-4 mr-2" />
                Verified Request
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {post.beneficiaryName}
              </h1>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Request Code</p>
              <p className="text-lg font-bold text-rose-600">{post.beneficiaryRequestCode}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Featured Image */}
              <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={`http://localhost:4000/uploads/${post.imageUrl}`}
                  alt={post.beneficiaryName}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Story Section */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-blue-700 rounded-2xl flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Their Story</h2>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <Calendar className="h-4 w-4 mr-1 text-rose-600" />
                      {new Date(post.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {post.description}
                </p>
              </div>

              {/* Items Needed */}
              {post.itemsToGive && post.itemsToGive.length > 0 && (
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mr-4">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Items Needed</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {post.itemsToGive.map((item, i) => (
                      <div key={i} className="flex items-center bg-gradient-to-r from-rose-50 to-blue-50 rounded-2xl p-4 border border-rose-200 hover:shadow-lg transition-all duration-300">
                        <CheckCircle className="w-5 h-5 text-rose-600 mr-3 flex-shrink-0" />
                        <span className="font-medium text-gray-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Donation Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                  
                  {/* Progress Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      <Star className="w-4 h-4 mr-2" />
                      Impact Progress
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {progressPercentage.toFixed(1)}%
                    </div>
                    <p className="text-gray-600">of goal achieved</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="w-full bg-gray-100 rounded-full h-6 shadow-inner mb-4">
                      <div
                        className="bg-gradient-to-r from-rose-500 via-rose-600 to-yellow-500 h-6 rounded-full transition-all duration-700 relative overflow-hidden"
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">
                        LKR {post.collectedAmount.toLocaleString()}
                      </span>
                      <span className="font-bold text-gray-900">
                        LKR {post.goalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="mb-8">
                    <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl p-6 text-center">
                      <div className="text-3xl font-bold text-rose-600 mb-2">
                        LKR {(post.goalAmount - post.collectedAmount).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Still Needed to Reach Goal</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button
                      onClick={() => setShowDonationForm(true)}
                      className="w-full bg-gradient-to-r from-rose-600 to-blue-700 hover:from-rose-700 hover:to-blue-800 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      <Heart className="w-6 h-6" />
                      Make a Donation
                    </button>
                    
                    <button className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-2xl font-medium hover:border-rose-600 hover:text-rose-600 transition-all duration-300 hover:bg-rose-50 flex items-center justify-center gap-3">
                      <Share2 className="w-5 h-5" />
                      Share This Request
                    </button>
                  </div>

                  {/* Trust Indicators */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                        Verified
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        Trusted
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 text-rose-600 mr-1" />
                        Secure
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Form Modal */}
      {showDonationForm && (
        <DonationForm 
          post={post} 
          onClose={() => setShowDonationForm(false)} 
        />
      )}

      <Footer/>
    </>
  );
};

export default PostDetailsPage;