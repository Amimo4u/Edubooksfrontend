import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Globe, Users, Zap, Facebook, Twitter, Linkedin } from 'lucide-react';
// Navbar import is correctly removed as it is now global in App.js

const Home = () => {
  return (
    // Min-height ensures the content (and footer) fills the screen
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      
      {/* Main Content Wrapper (Flex grow pushes the footer down) */}
      <main className="flex-grow">
        
        {/* 1. Hero Section (Welcome) */}
        <div className="pt-20 pb-16 px-4 max-w-5xl mx-auto text-center">
          
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
            The Future of Learning, <span className="text-purple-600">Digitally Accessible.</span>
          </h1>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            EduBooks offers a vast, curated library of educational resources, from academic texts to professional guides, ready when you are.
          </p>

          
        </div>

        {/* 2. Features Section */}
        <div className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Why Choose EduBooks?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                <BookOpen className="h-10 w-10 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Massive Library</h3>
                <p className="text-gray-600 dark:text-gray-400">Access thousands of academic and professional e-books updated constantly.</p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                <Globe className="h-10 w-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Global Access</h3>
                <p className="text-gray-600 dark:text-gray-400">Read on any device, anywhere in the world, with seamless cloud synchronization.</p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center p-6 bg-gray-500/5 dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                <Zap className="h-10 w-10 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Instant Reading</h3>
                <p className="text-gray-600 dark:text-gray-400">No downloads, no waiting. Start reading your selection the moment you choose it.</p>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* 3. Footer Section (NEW) */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-white mt-12">
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
            
            {/* Logo/Branding Column */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/register" className="flex items-center text-2xl font-extrabold text-purple-400 hover:text-purple-300 transition duration-200">
                <BookOpen className="mr-2" size={24} />
                EduBooks
              </Link>
              <p className="text-sm text-gray-400 mt-4">The future of accessible, digital education.</p>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/home" className="text-gray-400 hover:text-purple-400 transition duration-150">Home</Link></li>
                <li><Link to="/books" className="text-gray-400 hover:text-purple-400 transition duration-150">Browse Books</Link></li>
                <li><Link to="/dashboard" className="text-gray-400 hover:text-purple-400 transition duration-150">Dashboard</Link></li>
              </ul>
            </div>

            {/* Legal Links Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-purple-400 transition duration-150">Terms of Service</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-purple-400 transition duration-150">Privacy Policy</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-purple-400 transition duration-150">Contact Us</Link></li>
              </ul>
            </div>

            {/* Social Media Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-purple-400 transition duration-150">
                  <Facebook size={24} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-purple-400 transition duration-150">
                  <Twitter size={24} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-purple-400 transition duration-150">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>

          </div>
          
          {/* Copyright Row */}
          <div className="text-center text-gray-500 text-sm pt-4">
            &copy; {new Date().getFullYear()} EduBooks. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;