import React from 'react'

const Footer = () => {
  return (
    <div>
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

export default Footer