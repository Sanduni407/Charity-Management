import React from 'react';
import { Users, Target, Eye, Award, Globe, Handshake, Shield, TrendingUp, MapPin, Calendar, Star } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


const AboutPage = () => {
  // Placeholder for navbar component
  // const Navbar = () => <div>Your Navbar Component Here</div>;
  
  // Placeholder for footer component  
  // const Footer = () => <div>Your Footer Component Here</div>;

  const founders = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://www.mnp.ca/-/media/foundation/integrations/personnel/2020/12/16/13/57/personnel-image-4483.jpg?h=800&iar=0&w=600&hash=833D605FDB6AC3C2D2915F6BF8B4ADA4",
      bio: "With over 15 years in non-profit management, Sarah founded EchoKind to bridge the gap between those who need help and those who can provide it.",
      education: "MBA Harvard Business School",
      experience: "Former Director at UNICEF"
    },
    {
      name: "Michael Chen",
      role: "Co-Founder & CTO",
      image: "https://zoe-institut.de/wp-content/uploads/2023/09/Zoe-Institut-10-scaled-e1642151161755-300x300-1.jpg",
      bio: "Technology expert passionate about using innovation to solve social problems. Michael leads our platform development and ensures transparency.",
      education: "MS Computer Science, Stanford",
      experience: "Ex-Senior Engineer at Google"
    },
    {
      name: "Dr. Amara Okafor",
      role: "Director of Operations",
      image: "https://architecture.ou.edu/wp-content/uploads/2018/07/ANGELAPERSON-1447-300x300.jpg",
      bio: "Former UN humanitarian coordinator with expertise in crisis response and community development programs across three continents.",
      education: "PhD International Relations, Oxford",
      experience: "UN Humanitarian Coordinator"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Lives Impacted", icon: Users, color: "bg-rose-800" },
    { number: "25,000+", label: "Active Donors", icon: Target, color: "bg-blue-950" },
    { number: "$2.5M+", label: "Funds Distributed", icon: TrendingUp, color: "bg-rose-800" },
    { number: "150+", label: "Partner Organizations", icon: Globe, color: "bg-blue-950" },
    { number: "95%", label: "Success Rate", icon: Award, color: "bg-rose-800" },
    { number: "24/7", label: "Support Available", icon: Shield, color: "bg-blue-950" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Transparency",
      description: "Every donation is tracked and reported with complete accountability and real-time updates.",
      color: "bg-blue-950"
    },
    {
      icon: Handshake,
      title: "Compassion",
      description: "We treat every request with dignity, respect, and genuine care for human wellbeing.",
      color: "bg-rose-800"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in service delivery and impact measurement.",
      color: "bg-blue-950"
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Our platform ensures charitable giving is simple, secure, and available globally.",
      color: "bg-rose-800"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Space for Navbar Component */}
      <div className="navbar-placeholder">
        <Navbar/>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-blue-950 mb-6">
              About <span className="text-yellow-500">EchoKind</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Connecting hearts, changing lives. We're building a world where compassion echoes 
              through every act of kindness, creating ripples of hope that reach those who need it most.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-0 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="order-1 lg:order-1">
              <div className="relative">
                <img
                  src="https://media.gettyimages.com/id/1498170916/photo/a-couple-is-taking-a-bag-of-food-at-the-food-and-clothes-bank.jpg?s=612x612&w=gi&k=20&c=OQXzpRYIt4_vr0b2tTz9Wsz8aCPi9FgUBwGSEeJaToM="
                  alt="Our Mission"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-500 rounded-2xl flex items-center justify-center">
                  <Target className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            {/* Mission Text */}
            <div className="order-2 lg:order-2">
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-l-4 border-blue-950">
                <h2 className="text-4xl font-bold text-blue-950 mb-6">Our Mission</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  To create a transparent, accessible platform that directly connects beneficiaries 
                  in need with compassionate donors worldwide. We eliminate barriers to giving and 
                  receiving help, ensuring that every act of kindness creates maximum impact in 
                  real people's lives.
                </p>
                <div className="flex items-center text-rose-800 font-semibold">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>Serving communities globally since 2019</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Vision Text */}
            <div className="order-2 lg:order-1">
              <div className="bg-white p-8 rounded-2xl border-l-4 border-rose-800 shadow-lg">
                <h2 className="text-4xl font-bold text-blue-950 mb-6">Our Vision</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  A world where geographical boundaries don't limit compassion, where technology 
                  bridges the gap between abundance and need, and where every person has access 
                  to a supportive global community ready to help them overcome life's challenges.
                </p>
                <div className="flex items-center text-yellow-600 font-semibold">
                  <Eye className="w-5 h-5 mr-2" />
                  <span>Building tomorrow's compassionate world today</span>
                </div>
              </div>
            </div>
            {/* Photo */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img
                  src="https://www.tigernix.com/wp-content/uploads/2024/03/top-six-ways-effective-donation-management-charity-management-system-tigernix-singapore-768x432.jpg"
                  alt="Our Vision"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-rose-800 rounded-2xl flex items-center justify-center">
                  <Eye className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-950 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Measurable results that matter</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">{stat.number}</h3>
                <p className="text-gray-600 text-sm text-center font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-950 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide our every action</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2">
                <div className={`${value.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-4 text-center">{value.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-950 mb-4">Meet Our Founders</h2>
            <p className="text-xl text-gray-600">The visionaries leading our mission</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="text-center">
                  <div className="relative mb-6">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-200"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="bg-yellow-500 p-2 rounded-full">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-950 mb-2">{founder.name}</h3>
                  <p className="text-rose-800 font-semibold mb-3">{founder.role}</p>
                  <p className="text-gray-600 leading-relaxed mb-4">{founder.bio}</p>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="text-sm text-gray-500 mb-2 flex items-center justify-center">
                      <Award className="w-4 h-4 mr-1" />
                      {founder.education}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center justify-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {founder.experience}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-br from-blue-950 to-rose-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">How EchoKind Works</h2>
            <p className="text-xl text-gray-200">Simple, transparent, impactful process</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Submit Request</h3>
              <p className="text-gray-200 leading-relaxed">
                Beneficiaries submit verified requests with documentation. Our team ensures 
                authenticity and transparency for every case.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Connect & Donate</h3>
              <p className="text-gray-200 leading-relaxed">
                Verified requests appear on our platform where donors can browse and 
                choose causes that resonate with their values.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Track Impact</h3>
              <p className="text-gray-200 leading-relaxed">
                Real-time updates and progress reports ensure donors see exactly how 
                their contributions are making a difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-blue-950 mb-6">Join Our Mission Today</h2>
          <p className="text-xl text-gray-600 mb-8">
            Whether you're seeking help or ready to give, EchoKind connects hearts and changes lives. 
            Be part of building a more compassionate world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-rose-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-rose-700 transition-all transform hover:scale-105 shadow-lg">
              Start Donating
            </button>
            <button className="border-2 border-blue-950 text-blue-950 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-950 hover:text-white transition-all transform hover:scale-105">
              Request Help
            </button>
          </div>
        </div>
      </section>

      {/* Space for Footer Component */}
      <div className="footer-placeholder">
        <Footer/>
      </div>
    </div>
  );
};

export default AboutPage;