// src/pages/MyPurchases.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const MyPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in");
          return;
        }

        // Send token for authenticated request
        const res = await axios.get("http://localhost:5000/api/purchases/mine", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPurchases(res.data);
      } catch (err) {
        setError("Unable to load purchased books");
      }
    };

    fetchPurchases();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="max-w-5xl mx-auto mt-10 p-5">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">My Purchases</h1>

        {error && (
          <div className="p-3 bg-red-200 text-red-800 rounded-lg mb-6">
            {error}
          </div>
        )}

        {purchases.length === 0 ? (
          <p className="text-gray-600 text-lg">You haven't bought any books yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {purchases.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-lg rounded-xl p-6 border"
              >
                <h2 className="text-2xl font-bold text-gray-900">
                  {item.ebookId.title}
                </h2>

                <p className="text-gray-700 mt-2">
                  {item.ebookId.description}
                </p>

                <p className="mt-3 text-purple-600 font-bold">
                  Price: KES {item.ebookId.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPurchases;
