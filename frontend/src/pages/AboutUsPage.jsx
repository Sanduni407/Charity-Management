import React from 'react';
import { Heart, Users, Target, Award, Globe, HandHeart } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function AboutUsPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Executive Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Program Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Community Outreach",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Lives Impacted" },
    { number: "50+", label: "Partner Organizations" },
    { number: "15", label: "Years of Service" },
    { number: "$2M+", label: "Funds Distributed" }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Compassion",
      description: "We lead with empathy and understanding in every interaction."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Impact",
      description: "We focus on sustainable solutions that create lasting change."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description: "We believe in the power of collective action and partnership."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description: "We maintain the highest standards in all our programs and services."
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      <Navbar/>
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white border-b-4 border-blue-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 border-l-8 border-blue-900 pl-8 inline-block">
              About Our Mission
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Transforming communities through strategic charity management and sustainable impact programs that create lasting positive change for those who need it most.
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 opacity-30 bg-blue-900 p-3 rounded-full">
          <HandHeart className="w-10 h-10 text-yellow-400" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-30 bg-blue-900 p-3 rounded-full">
          <Globe className="w-10 h-10 text-red-600" />
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-blue-900 mb-6">Our Story</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Founded in 2009, our charity management organization emerged from a simple belief: 
                that effective coordination and strategic resource allocation can multiply the impact 
                of charitable giving exponentially.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                What started as a small team of passionate advocates has grown into a comprehensive 
                platform that connects donors, volunteers, and beneficiaries in meaningful ways, 
                ensuring every contribution creates maximum positive impact.
              </p>
              <div className="flex space-x-4">
                <div className="bg-red-600 px-6 py-3 rounded-lg">
                  <span className="text-white font-semibold">Est. 2009</span>
                </div>
                <div className="bg-yellow-400 px-6 py-3 rounded-lg">
                  <span className="text-blue-900 font-semibold">Global Reach</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop" 
                alt="Charity volunteers working together" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-yellow-400 p-4 rounded-lg">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t-2 border-blue-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12 relative">
            <span className="bg-blue-900 text-white px-8 py-2 rounded-full">Our Impact in Numbers</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-gray-50 p-6 rounded-lg shadow-lg border-t-4 border-blue-900 hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-red-600 mb-2">{stat.number}</div>
                <div className="text-blue-900 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-900 text-center mb-12 border-b-4 border-blue-900 pb-4 inline-block">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg text-center hover:transform hover:scale-105 transition-all duration-300 border-2 border-blue-900 shadow-lg">
                <div className="text-red-600 flex justify-center mb-4 bg-blue-900 p-3 rounded-full w-16 h-16 mx-auto items-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{value.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 border-4 border-blue-900 rounded-lg p-8 bg-gray-50">
            <h2 className="text-4xl font-bold text-blue-900">Meet Our Leadership</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg border-4 border-blue-900">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center bg-gradient-to-b from-white to-gray-50">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{member.name}</h3>
                  <p className="text-red-600 font-medium">{member.role}</p>
                  <div className="w-12 h-1 bg-yellow-400 mx-auto mt-3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Image Section */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop" 
                alt="Community outreach program" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -top-6 -right-6 bg-red-600 p-4 rounded-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-blue-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                To revolutionize charitable giving through innovative management solutions, 
                transparent operations, and strategic partnerships that amplify the positive 
                impact of every donation and volunteer hour.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-4"></div>
                  <span className="text-gray-700">Strategic resource allocation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-4"></div>
                  <span className="text-gray-700">Transparent impact reporting</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-4"></div>
                  <span className="text-gray-700">Community-driven solutions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 border-t-8 border-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white p-12 rounded-lg shadow-2xl border-4 border-blue-900">
            <h2 className="text-4xl font-bold text-blue-900 mb-6">Join Our Mission</h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Together, we can create lasting change and build stronger communities. 
              Every contribution matters, every volunteer hour counts.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 w-full sm:w-auto border-2 border-blue-900">
                Get Involved
              </button>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg transition-colors duration-300 w-full sm:w-auto border-2 border-blue-900">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}