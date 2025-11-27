import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Using lucide-react for professional icons
import { Menu, X, BookOpen, LogOut, UserPlus, LogIn } from 'lucide-react'; 

const Navbar = () => {
  // State for toggling the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Checking for authentication token
  const isLoggedIn = localStorage.getItem("token");
  
  // Hook for programmatic navigation (MUST be inside the <Router>)
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Use navigate for clean React routing after logout
    navigate("/login");
  };

  const navItems = [
    { name: "Home", path: "/" },
  ];

  // Dynamic links based on authentication status
  const authItems = isLoggedIn ? (
    <>
      
      <Link to="/books" className="nav-link">Browse Books</Link>
      <button 
        onClick={handleLogout}
        className="nav-link flex items-center gap-1 text-red-100 hover:text-white"
      >
        <LogOut size={18} /> Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/register" className="nav-link flex items-center gap-1">
        <UserPlus size={18} /> Register
      </Link>
      <Link 
        to="/login" 
        // Highlighted Login button with a white background
        className="px-4 py-2 bg-white text-purple-600 rounded-full hover:bg-gray-100 transition duration-200 shadow-md flex items-center gap-1"
      >
        <LogIn size={18} /> Login
      </Link>
    </>
  );

  return (
    <nav className="bg-purple-600 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center text-white text-2xl font-extrabold tracking-tight hover:text-purple-100 transition duration-200">
            <BookOpen className="mr-2 text-purple-200" size={24} />
            EduBooks
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 text-white font-medium">
            {navItems.map(item => (
              <Link key={item.name} to={item.path} className="nav-link">{item.name}</Link>
            ))}
            {authItems}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Content (Toggles via state) */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } bg-purple-700`}
      >
        <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 flex flex-col items-start">
          {navItems.map(item => (
            <Link 
              key={item.name} 
              to={item.path} 
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="w-full h-px bg-purple-600 my-2"></div>
          {/* Mobile Auth Links */}
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
              <button 
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                className="mobile-nav-link flex items-center gap-2 text-red-100"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="mobile-nav-link flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <UserPlus size={18} /> Register
              </Link>
              <Link 
                to="/login" 
                className="mobile-nav-link bg-white text-purple-700 mt-2 font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn size={18} /> Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Global CSS for the Navbar */}
      <style jsx>{`
        .nav-link {
          @apply text-white hover:text-purple-100 transition duration-200 px-3 py-2 rounded-lg;
        }
        .mobile-nav-link {
          @apply text-white w-full text-left px-3 py-2 rounded-md font-medium hover:bg-purple-600 transition duration-200;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;