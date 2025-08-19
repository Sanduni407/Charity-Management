import React from "react";
import { Home, LogOut, Heart } from "lucide-react";
import {useNavigate} from 'react-router-dom'

export default function AdminNavigation() {

    const navigate = useNavigate();
  
  const handleHome = () => {
    console.log("Navigating to home...");
    // navigate("/admin-dashboard") or your home route
  };

   
  const handleLogout = () => {
    console.log("Logging out...");
    // Clear session, redirect to login
    // navigate("/login")
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full shadow-md">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
                Echo<span className="text-red-600">Kind</span>
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Admin Dashboard</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4">
            
            {/* Home Button */}
            <button
              onClick={()=>navigate('/admin-dashboard')}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white transition-all duration-200 shadow-md hover:shadow-blue-400/30 transform hover:scale-105 group"
            >
              <Home className="w-4 h-4 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
              <span className="font-medium">Home</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-semibold transition-all duration-200 shadow-md hover:shadow-blue-400/30 transform hover:scale-105 group"
            >
              <LogOut className="w-4 h-4 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600"></div>
    </nav>
  );
}
