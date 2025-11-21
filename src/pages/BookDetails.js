// src/pages/BookDetails.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const BookDetails = () => {
  const { id } = useParams(); // get ebook id from URL
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/ebooks/${id}`);
        setBook(res.data);
      } catch (err) {
        setError("Unable to load book details");
      }
    };

    fetchBook();
  }, [id]);

  const handleBuy = async () => {
  setMessage("");
  setError("");

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to buy.");
      return;
    }

    // Decode token to get userId
    const payload = JSON.parse(atob(token.split(".")[1])); 
    const userId = payload.id;

    const res = await axios.post(
      "http://localhost:5000/api/purchases/buy",
      { ebookId: id, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setMessage("Purchase successful!");
  } catch (err) {
    setError(err.response?.data?.message || "Error making purchase");
  }
};


  if (!book)
    return (
      <div className="text-center mt-20 text-xl text-gray-700">
        Loading...
      </div>
    );

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto mt-12 p-5">
        <div className="bg-white shadow-lg rounded-xl p-8">

          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {book.title}
          </h1>

          <p className="text-gray-700 text-lg mb-4">
            <strong>Description:</strong> {book.description}
          </p>

          <p className="text-gray-700 text-lg mb-4">
            <strong>Author:</strong> {book.author}
          </p>

          <p className="text-xl text-purple-600 font-bold mb-6">
            Price: KES {book.price}
          </p>

          {message && (
            <div className="p-3 mb-4 bg-green-200 text-green-800 rounded-lg">
              {message}
            </div>
          )}

          {error && (
            <div className="p-3 mb-4 bg-red-200 text-red-800 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={handleBuy}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition"
          >
            Buy Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
