// src/App.js

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import Books from './pages/Books';
import MyPurchases from './pages/MyPurchases';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/*  NEW LINE ADDED: Renders Register component when visiting the root path (/) */}
        <Route path="/" element={<Home />} /> 
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/books" element={<Books />} />
        
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/purchases" element={<MyPurchases />} />


    

      </Routes>
    </Router>
  );
}

export default App;