import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, doc, setDoc, query } from 'firebase/firestore';
import { ShoppingCart, X, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Global Context Variables (MUST be used) ---
// Note: We use 'default-app-id' and empty config/token as fallbacks 
// if running outside the Canvas environment.

/* global __app_id, __firebase_config, __initial_auth_token */

const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
// Mock Book Data (Will be replaced by Firestore data once connected)
const initialBooks = [
  { id: 'mern_stack_guide', title: 'MERN STACK', description: 'A complete MERN guide...', price: 999 },
];


const Books = () => {
  const [books, setBooks] = useState(initialBooks);
  const [auth, setAuth] = useState(null);
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ visible: false, message: '', isSuccess: false });
  const navigate = useNavigate();

  // 1. Firebase Initialization and Authentication
  useEffect(() => {
    if (Object.keys(firebaseConfig).length === 0) {
      console.error("Firebase config is missing. Data persistence disabled.");
      setIsAuthReady(true);
      setLoading(false);
      return;
    }

    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const authInstance = getAuth(app);
    
    setDb(firestore);
    setAuth(authInstance);

    // Sign-in logic
    const attemptSignIn = async () => {
      try {
        if (initialAuthToken) {
          await signInWithCustomToken(authInstance, initialAuthToken);
        } else {
          // Fallback to anonymous sign-in if no token is available
          await signInAnonymously(authInstance);
        }
      } catch (error) {
        console.error("Firebase Auth Sign-In Error:", error);
      }
    };

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
      setIsAuthReady(true);
      setLoading(false);
    });

    attemptSignIn();
    return () => unsubscribe();
  }, []);

  // 2. Fetch Books from Firestore (Public Data)
  useEffect(() => {
    if (!db || !isAuthReady) return;

    // Path: /artifacts/{appId}/public/data/books
    const booksCollectionPath = `artifacts/${appId}/public/data/books`;
    const booksQuery = query(collection(db, booksCollectionPath));

    const unsubscribe = onSnapshot(booksQuery, (snapshot) => {
      const fetchedBooks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBooks(fetchedBooks);
    }, (error) => {
      console.error("Error fetching books:", error);
      // Fallback to mock data if fetch fails
      setBooks(initialBooks);
    });

    return () => unsubscribe();
  }, [db, isAuthReady]);

  // 3. Handle Purchase Logic
  // 3. Handle Purchase Logic
  const handlePurchase = async (ebookId, bookTitle, price) => {
    if (!userId) {
      // THIS ENTIRE BLOCK HANDLES THE REDIRECT:
      setModal({ 
        visible: true, 
        message: 'You must be logged in to make a purchase. Redirecting you to register...', 
        isSuccess: false 
      });
      // Delay navigation slightly so the user can read the message
      setTimeout(() => {
        setModal(prev => ({ ...prev, visible: false }));
        navigate('/register'); // <-- This is the redirect command
      }, 1500); 
      return;
    }
    if (!ebookId) {
      setModal({ visible: true, message: 'Ebook ID is missing.', isSuccess: false });
      return;
    }
    
    if (!db) {
        setModal({ visible: true, message: 'Database connection failed. Cannot process purchase.', isSuccess: false });
        return;
    }

    try {
      // Path: /artifacts/{appId}/users/{userId}/purchases/{purchaseId}
      const purchaseDocPath = `artifacts/${appId}/users/${userId}/purchases`;
      const newPurchaseRef = doc(collection(db, purchaseDocPath));

      await setDoc(newPurchaseRef, {
        ebookId: ebookId,
        bookTitle: bookTitle,
        price: price,
        purchaseDate: new Date().toISOString(),
        userId: userId, // Record the userId in the transaction
      });

      setModal({ 
        visible: true, 
        message: `Successfully purchased "${bookTitle}"! Check your library.`, 
        isSuccess: true 
      });

    } catch (error) {
      console.error("Error processing purchase:", error);
      setModal({ visible: true, message: `Purchase failed: ${error.message}`, isSuccess: false });
    }
  };

  const Modal = ({ message, isSuccess }) => {
    const icon = isSuccess ? <CheckCircle className="h-6 w-6 text-green-500" /> : <X className="h-6 w-6 text-red-500" />;
    const title = isSuccess ? 'Success!' : 'Error';
    const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
          <div className={`p-4 rounded-t-xl ${bgColor} flex items-center justify-between`}>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <button onClick={() => setModal({ visible: false, message: '', isSuccess: false })} className="text-white hover:text-gray-200">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-1">{icon}</div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                  {message}
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setModal({ visible: false, message: '', isSuccess: false })}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-md transition-all duration-200 
                      ${isSuccess ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900">
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-grow py-20 text-gray-700 dark:text-gray-300">
          <svg className="animate-spin h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4">Loading books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 w-full">
      <Navbar />
      
      <div className="py-10 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">
          Available Books
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {userId ? `User ID: ${userId}` : 'Status: Not authenticated'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-purple-500/30 transition duration-300">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{book.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{book.description}</p>
                <p className="text-2xl font-extrabold text-purple-600 mb-6">KES {book.price}</p>
              </div>
              
              <button
                onClick={() => handlePurchase(book.id, book.title, book.price)}
                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-200 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} /> Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Modal for alerts/errors/success messages */}
      {modal.visible && <Modal message={modal.message} isSuccess={modal.isSuccess} />}
    </div>
  );
};

export default Books;