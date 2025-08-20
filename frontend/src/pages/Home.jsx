import React, { useRef, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroHeader from '../components/HeroHeader'
import DonateCard from '../components/DonateCard'
import axios from 'axios'
import { Heart, Users, Target, TrendingUp, ArrowRight, Award, Globe, Zap, Star, Shield, CheckCircle } from 'lucide-react'

const Home = () => {
  const footerRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const scrollToRequests = () => {
    document.getElementById('donation-requests')?.scrollIntoView({ behavior: 'smooth' });
  }

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:4000/api/posts/');
        if (response.data.success) {
          // Show only active posts, limit to 6
          const activePosts = response.data.posts.filter(post => post.status === 'Active').slice(0, 6);
          setPosts(activePosts);
        }
      } catch (err) {
        console.log('Error fetching posts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white">
        <Navbar scrollToFooter={scrollToFooter} />

        {/* Hero Header Component */}
        <HeroHeader scrollToRequests={scrollToRequests} />

        {/* Welcome Section with Clean Design */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
          {/* Subtle Background Decorations */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-rose-100 rounded-full opacity-20 -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100 rounded-full opacity-20 translate-x-40 translate-y-40"></div>
          
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="mb-8">
              <span className="inline-block bg-blue-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-4">
                Welcome to Our Community
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Where Compassion 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-blue-700"> Meets Action</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-16">
              EchoKind is more than a platform—it's a movement. We connect generous hearts with meaningful causes, 
              creating ripples of positive change that echo through communities worldwide.
            </p>

            {/* Feature Highlights with Theme Colors */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Verified Impact</h3>
                <p className="text-gray-600 text-sm">Every donation tracked and verified</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Global Reach</h3>
                <p className="text-gray-600 text-sm">Communities worldwide supported</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Instant Impact</h3>
                <p className="text-gray-600 text-sm">Real-time donation processing</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Excellence</h3>
                <p className="text-gray-600 text-sm">Award-winning platform design</p>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Stats Section */}
        <section className="py-20 bg-gradient-to-br from-blue-950 to-rose-800 relative overflow-hidden">
          {/* Subtle animated elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-60"></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Our Impact in Numbers</h2>
              <p className="text-white/80 text-lg">Real results from our global community</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                  <Heart className="w-12 h-12 text-yellow-300 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-4xl font-bold text-white mb-2">2,547+</div>
                  <div className="text-white/80 text-sm">Lives Transformed</div>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                  <Users className="w-12 h-12 text-yellow-300 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-4xl font-bold text-white mb-2">1,200+</div>
                  <div className="text-white/80 text-sm">Active Donors</div>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                  <Target className="w-12 h-12 text-yellow-300 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-4xl font-bold text-white mb-2">92%</div>
                  <div className="text-white/80 text-sm">Success Rate</div>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                  <TrendingUp className="w-12 h-12 text-yellow-300 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-4xl font-bold text-white mb-2">$127K+</div>
                  <div className="text-white/80 text-sm">Funds Raised</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Donation Requests Section */}
        <section id="donation-requests" className="py-20 px-4 bg-white relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block bg-rose-100 text-rose-600 px-6 py-3 rounded-full text-sm font-semibold mb-4">
                Make a Difference Today
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Current Donation Requests
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These verified requests from our community are waiting for your support. 
                Every contribution creates lasting impact.
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-gray-200 border-t-rose-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-rose-600 animate-pulse" />
                  </div>
                </div>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Active Requests</h3>
                <p className="text-gray-500 text-lg mb-8">Check back soon for new opportunities to help.</p>
                <button className="bg-rose-600 text-white px-8 py-3 rounded-full hover:bg-rose-700 transition-colors duration-300">
                  Subscribe for Updates
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <div 
                    key={post._id}
                    className="transform transition-all duration-500 hover:scale-105 fade-in-up"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <DonateCard post={post} />
                  </div>
                ))}
              </div>
            )}

            {posts.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-gradient-to-r from-rose-600 to-blue-700 text-white px-8 py-4 rounded-full hover:from-rose-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  View All Requests
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Enhanced About Section - Creating Waves of Change */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block bg-blue-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-6">
                  Our Impact Story
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                  Creating Waves of 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-blue-700"> Change</span>
                </h2>
                
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p className="text-lg">
                    Founded on the belief that every act of kindness creates a ripple effect, EchoKind connects 
                    compassionate donors with verified needs across the globe.
                  </p>
                  <p className="text-lg">
                    Our mission transcends simple donation processing—we build bridges between hearts, 
                    ensuring every contribution creates lasting, meaningful change that echoes through generations.
                  </p>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center space-x-6 mt-8 mb-10">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700 font-medium">Verified NGO</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">Secure Platform</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-700 font-medium">5-Star Rated</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={scrollToFooter}
                    className="bg-rose-600 text-white px-8 py-4 rounded-full hover:bg-rose-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Get In Touch
                  </button>
                  <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-blue-700 hover:text-blue-700 transition-all duration-300 hover:bg-blue-50">
                    Read Our Story
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <img 
                      src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                      alt="Community Support" 
                      className="rounded-2xl shadow-xl w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                      alt="Volunteer Work" 
                      className="rounded-2xl shadow-xl w-full h-32 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-6 pt-12">
                    <img 
                      src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                      alt="Helping Hands" 
                      className="rounded-2xl shadow-xl w-full h-32 object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                      alt="Community Growth" 
                      className="rounded-2xl shadow-xl w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                
                {/* Floating Stats with Theme Colors */}
                <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-2xl border border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-rose-600">15+</div>
                    <div className="text-xs text-gray-600">Countries</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-2xl border border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-700">98%</div>
                    <div className="text-xs text-gray-600">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

       

        {/* Footer */}
        <div ref={footerRef}>
          <Footer />
        </div>
      </div>

      <style jsx>{`        
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}

export default Home