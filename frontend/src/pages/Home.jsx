import React from 'react'
import Navbar from '../components/Navbar'


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
    
       <Navbar/>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="mb-12 lg:mb-0">
            <h1 className="text-4xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
              Empowering Charities to <span className="text-yellow-500">Change Lives</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Streamline charity operations with our management platform. Track donations, manage volunteers, and measure impact with powerful analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2">
                Start Free Trial →
              </button>
              <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Volunteers helping community"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-yellow-400 p-4 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">1,500+</div>
                <div className="text-sm text-blue-800">Charities Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">Everything You Need to Manage Your Charity</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools you need to run your charity efficiently and transparently
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Card 1 */}
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-blue-600">♥</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Donation Tracking</h3>
              <p className="text-gray-600">
                Monitor donations in real-time with automated receipts and donor management
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-yellow-600">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Volunteer Management</h3>
              <p className="text-gray-600">
                Organize volunteers, schedule events, and track participation seamlessly
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-blue-600">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Impact Measurement</h3>
              <p className="text-gray-600">
                Track your charity's impact with comprehensive reporting and analytics
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-yellow-600">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Financial Reports</h3>
              <p className="text-gray-600">
                Generate detailed financial reports for transparency and compliance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Transform Your Charity?</h2>
        <p className="mb-8 text-lg">Join thousands of charities already using CharityHub to maximize their impact</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg hover:bg-yellow-300 transition-colors duration-200">
            Start Your Free Trial
          </button>
          <button className="border border-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200">
            Schedule a Demo
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <span className="text-yellow-400 text-xl font-bold">♥</span>
                </div>
                <span className="text-xl font-bold">CharityHub</span>
              </div>
              <p className="text-blue-200">Empowering charities worldwide with comprehensive management solutions.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="flex flex-col gap-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Donations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Volunteers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="flex flex-col gap-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="flex flex-col gap-2 text-blue-200">
                <span>📞 +1 (555) 123-4567</span>
                <span>✉️ hello@charityhub.com</span>
                <span>📍 San Francisco, CA</span>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-4 text-blue-200 text-sm">
            &copy; 2025 CharityHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
