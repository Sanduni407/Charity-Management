import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Heart } from "lucide-react";

const Navbar = ({ scrollToFooter }) => { // Receive scroll function as prop
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const { token, name, role, setToken, setName, setRole } = useContext(AppContext);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.clear();
    setToken("");
    setName("");
    setRole("");
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 text-gray-800 font-bold text-2xl">
            <Heart className="h-8 w-8 text-red-500" />
            <Link to="/">EchoKind</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-gray-700">
            <Link to="/" className="hover:text-red-500 transition-colors duration-200 font-medium">Home</Link>
            <Link to="/about" className="hover:text-red-500 transition-colors duration-200 font-medium">About</Link>
            <Link to="/donate" className="hover:text-red-500 transition-colors duration-200 font-medium">Donate</Link>
            <Link to="#" className="hover:text-red-500 transition-colors duration-200 font-medium">Community</Link>
            <Link to="#" className="hover:text-red-500 transition-colors duration-200 font-medium">Events</Link>

            {/* Contact button scrolls to footer */}
            <button
              onClick={scrollToFooter}
              className="hover:text-red-500 transition-colors duration-200 font-medium"
            >
              Contact
            </button>

            {!token ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 transition font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition font-medium"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold hover:bg-red-600 transition"
                >
                  {name?.charAt(0).toUpperCase()}
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border">
                    <Link
                      to={role === "Beneficiary" ? "/beneficiary-profile" : "/donor-profile"}
                      className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-b-lg"
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
            <button onClick={toggleMenu} className="text-gray-700 hover:text-red-500 focus:outline-none">
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
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded font-medium">Home</Link>
            <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded font-medium">About</Link>
            <Link to="/donate" className="block px-3 py-2 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded font-medium">Donate</Link>
            <Link to="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded font-medium">Dashboard</Link>

            {/* Mobile Contact button */}
            <button
              onClick={() => { scrollToFooter(); setIsMenuOpen(false); }}
              className="block px-3 py-2 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded font-medium text-left"
            >
              Contact
            </button>

            {!token ? (
              <div className="flex flex-col gap-2 mt-3">
                <Link to="/login" className="block w-full text-center px-3 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 transition font-medium">
                  Login
                </Link>
                <Link to="/signup" className="block w-full text-center px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition font-medium">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-3">
                <Link to={role === "Beneficiary" ? "/beneficiary-profile" : "/donor-profile"} className="block w-full text-center px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-medium">
                  My Profile
                </Link>
                <button onClick={handleLogout} className="block w-full text-center px-3 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 font-medium">
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
