// src/pages/Login.js (Styled with Redirect)

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ← added

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { email, password } = formData;

  const navigate = useNavigate(); // ← added

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('/api/auth/login', formData);
      setMessage(res.data.message);
      localStorage.setItem('token', res.data.token);

      localStorage.setItem('userId', res.data.user._id);  

      // Redirect to home page after successful login
      navigate('/home'); // ← added
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    }

    

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-sm transform hover:shadow-purple-500/50 transition-shadow duration-300">
        
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">
          Welcome Back
        </h1>

        {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg font-medium">{message}</div>}
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition duration-150"
              placeholder="you@edubooks.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition duration-150"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl shadow-md shadow-purple-500/40 transition-all duration-300 transform hover:scale-[1.01]"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Don’t have an account? <a href="/register" className="text-purple-600 hover:text-purple-700 font-medium">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
