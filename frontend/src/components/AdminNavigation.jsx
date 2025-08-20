import React, { useContext } from "react";
import { Home, LogOut, Heart, LayoutDashboard } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'; // Adjust path as needed

export default function AdminNavigation() {
  const navigate = useNavigate();
  const { setToken, setRole, setName } = useContext(AppContext);

  const handleDashboard = () => {
    console.log("Navigating to dashboard...");
    navigate("/admin-dashboard");
  };

  const handleLogout = () => {
    console.log("Logging out...");
    
    // Clear localStorage   
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    
    // Clear context
    setToken("");
    setRole("");
    setName("");
    
    // Redirect to login
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Echo<span className="text-red-500">Kind</span>
              </h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4">
            
            {/* Dashboard Button */}
            <button
              onClick={handleDashboard}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="font-medium">Dashboard</span>
            </button>

            {/* Home Button */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}