import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext"; // ✅ get token, name, role from context

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const { token, name, role, setToken, setName, setRole } = useContext(AppContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken("");
    setName("");
    setRole("");
    window.location.href = "/"; // reload to home
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-blue-600">
            <Link to="/">MySite</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">About</Link>
            <Link to="/donate" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Donate</Link>
            <Link to="/help" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Dashboard</Link>
            <Link to="/admin-dashboard" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Contact</Link>

            {/* If NOT logged in → show Login + Sign Up */}
            {!token ? (
              <div className="flex items-center gap-4">
                <Link to="/login" className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition">
                  Login
                </Link>
                <Link to="/signup" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                  Sign Up
                </Link>
              </div>
            ) : (
              /* If logged in → show profile icon */
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold"
                >
                  {name?.charAt(0).toUpperCase()}
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg">
                    <Link
                      to={role === "Beneficiary" ? "/beneficiary-profile" : "/donor-profile"}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 flex flex-col gap-1">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded">Home</Link>
            <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded">About</Link>
            <Link to="/donate" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded">Donate</Link>
            <Link to="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded">Dashboard</Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded">Contact</Link>

            {!token ? (
              <div className="flex flex-col gap-2 mt-3">
                <Link to="/login" className="block w-full text-center px-3 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition">
                  Login
                </Link>
                <Link to="/signup" className="block w-full text-center px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-3">
                <Link to={role === "Beneficiary" ? "/beneficiary-profile" : "/donor-profile"} className="block w-full text-center px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-center px-3 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
