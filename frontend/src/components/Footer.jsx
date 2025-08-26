import React from 'react'
import { assets } from "../assets/assets"; 

const Footer = () => {
  return (
    <div>
      <footer className="bg-blue-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            
            {/* Logo + Description */}
            <div>
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <img 
                  src={assets.logo_bg} 
                  alt="EchoKind Logo" 
                  className="h-10 w-auto object-contain"
                />
                <span className="text-xl font-bold">EchoKind</span>
              </div>
              <p className="text-blue-200">
                Empowering charities worldwide with comprehensive management solutions.
              </p>  
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="flex flex-col gap-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Donations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Volunteers</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="flex flex-col gap-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="flex flex-col gap-2 text-blue-200">
                <span>📞 +1 (555) 123-4567</span>
                <span>✉️ hello@echokind.com</span>
                <span>📍 San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-blue-800 pt-4 text-blue-200 text-sm">
            &copy; 2025 EchoKind. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
