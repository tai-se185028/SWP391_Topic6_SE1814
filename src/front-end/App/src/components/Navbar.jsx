import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes, FaCar } from "react-icons/fa";

export default function Navbar({ username }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleProfileClick = () => {
    navigate("/profile");
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: "/vehicles", label: "Xe của bạn" },
    { path: "/schedule", label: "Đặt lịch" },
    { path: "/usageHistory", label: "Lịch sử" },
    { path: "/notification", label: "Thông báo" },
    { path: "/support", label: "Hỗ trợ" },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/vehicles" className="flex items-center space-x-2 text-white hover:text-primary-400 transition-colors">
            <FaCar size={28} />
            <span className="text-xl font-bold hidden sm:block">VehicleHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-primary-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleProfileClick}
              className="hidden md:flex items-center space-x-2 text-white hover:text-primary-400 transition-colors px-3 py-2 rounded-lg hover:bg-gray-700"
            >
              <FaUserCircle size={24} />
              <span className="font-medium">{username}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:text-primary-400 transition-colors p-2"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(link.path)
                      ? "bg-primary-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={handleProfileClick}
                className="flex items-center space-x-2 text-white hover:text-primary-400 transition-colors px-4 py-3 rounded-lg hover:bg-gray-700"
              >
                <FaUserCircle size={24} />
                <span className="font-medium">{username}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
