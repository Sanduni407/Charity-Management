import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight } from 'lucide-react';

const HeroHeader = ({ scrollToRequests }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Professional charity-related images for sliding background
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Building Hope Together",
      subtitle: "Every donation creates a ripple of positive change in communities worldwide"
    },
    {
      url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", 
      title: "Connecting Communities",
      subtitle: "Bridging hearts across the world through compassion and meaningful action"
    },
    {
      url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Empowering Lives",
      subtitle: "Transforming dreams into reality, one donation at a time"
    },
    {
      url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Making Impact Real",
      subtitle: "Where generosity meets genuine need and creates lasting change"
    }
  ];

  // Auto-slide images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const currentSlide = heroImages[currentImageIndex];

  return (
    <section className="relative h-[95vh] w-full mt-0 flex items-center justify-center px-6">
      <div className="w-[90%] h-[88%] bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        {/* Left Side - Animated Images */}
        <div className="w-1/2 relative overflow-hidden rounded-l-3xl">
          {/* Background Images with Transition */}
          <div className="absolute inset-0">
            {heroImages.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[1500ms] ease-in-out ${
                  index === currentImageIndex 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-105'
                }`}
                style={{ backgroundImage: `url(${slide.url})` }}
              />
            ))}
            {/* Professional overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          {/* Image Indicators */}
          <div className="absolute bottom-8 left-8 z-10">
            <div className="flex space-x-3 bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentImageIndex 
                      ? 'w-8 h-3 bg-white' 
                      : 'w-3 h-3 bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="w-1/2 bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-16 lg:p-20 rounded-r-3xl">
          <div className="max-w-lg space-y-8">
            {/* Brand Badge */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-rose-600 font-semibold tracking-wider uppercase text-sm">
                EchoKind Foundation
              </span>
            </div>
            
            {/* Dynamic Content */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {currentSlide.title}
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-6 py-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-rose-600">2,547+</div>
                <div className="text-gray-600 text-sm">Lives Transformed</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-blue-700">$127K+</div>
                <div className="text-gray-600 text-sm">Funds Raised</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={scrollToRequests}
                className="group bg-gradient-to-r from-rose-500 to-rose-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-rose-600 hover:to-rose-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-rose-500/30 flex items-center justify-center"
              >
                Explore Donations
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-blue-700 hover:text-blue-700 transition-all duration-300 bg-white hover:bg-blue-50">
                Watch Our Story
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-[15%] hidden lg:block">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700">24/7</div>
            <div className="text-xs text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHeader;