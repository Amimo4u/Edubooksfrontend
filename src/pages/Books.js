import React, { useState } from 'react';
import { ShoppingCart, X, CheckCircle, BookOpen, LogOut, UserPlus, LogIn, LayoutDashboard, CreditCard, DollarSign, Smartphone } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

// Mock Book Data (Data is loaded locally)
const initialBooks = [
  { 
    id: 'mern_stack_guide', 
    title: 'MERN STACK', 
    description: 'A complete MERN guide...', 
    price: 999, 
    // Add the image URL here. You can use a local image (e.g., '/images/mern-stack.jpg') 
    // or a direct link to an online image.
    imageUrl: '/images/download.jpeg' 
  },
  { 
    id: 'react_mastery', 
    title: 'Advanced React Hooks', 
    description: 'Master custom hooks, Context API, and state management without Redux.', 
    price: 1299, 
    imageUrl: '/images/adv.png' 
  },
  { 
    id: 'nodejs_api', 
    title: 'Node.js API Development', 
    description: 'Build robust and scalable RESTful APIs using Express, middleware, and authentication.', 
    price: 1499, 
    imageUrl: '/images/nodejs.jpeg' 
  },
  { 
    id: 'mongodb_design', 
    title: 'MongoDB Schema Design', 
    description: 'Learn best practices for data modeling, indexing, and aggregation in MongoDB.', 
    price: 850, 
    imageUrl: '/images/mongoschema.png' 
  },
  { 
    id: 'typescript_mastery', 
    title: 'Mastering TypeScript', 
    description: 'Deep dive into types, generics, and advanced TypeScript patterns for large applications.', 
    price: 1150, 
    imageUrl: '/images/mts.jpeg' 
  },
  { 
    id: 'sql_modern', 
    title: 'Modern SQL & DB Design', 
    description: 'Fundamentals of relational databases, PostgreSQL, and writing efficient SQL queries.', 
    price: 750, 
    imageUrl: '/images/dbs.png' 
  },
  {
    id: 'python_data_science',
    title: 'Python for Data Science',
    description: 'A practical guide to NumPy, Pandas, and Matplotlib for data analysis and visualization.',
    price: 1350,
    imageUrl: '/images/psc.jpeg'
  },
  {
    id: 'cloud_computing',
    title: 'Cloud Fundamentals (AWS/Azure)',
    description: 'Introduction to essential cloud computing concepts, services, and architecture design.',
    price: 1600,
    imageUrl: '/images/ccf.jpeg'
  },
];

// In-Component Navbar definition
const Navbar = ({ isAuthenticated, handleLogout }) => {
    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <BookOpen className="h-6 w-6 text-purple-600 mr-2" />
                            <span className="text-xl font-bold text-gray-900 dark:text-white">EduBooks</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link to="/books" className="border-purple-500 text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-150">
                                Books
                            </Link>
                            <Link to="/library" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-150">
                                My Library
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 p-2 rounded-full transition duration-150">
                                    <LayoutDashboard size={20} />
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="ml-4 px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition duration-150 flex items-center gap-1"
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="px-3 py-1.5 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150 flex items-center gap-1">
                                    <LogIn size={16} /> Login
                                </Link>
                                <Link to="/register" className="ml-4 px-3 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition duration-150 flex items-center gap-1">
                                    <UserPlus size={16} /> Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

// NEW: Payment Modal Component
const PaymentModal = ({ book, onClose, onPaymentSuccess }) => {
  const [processing, setProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handlePayment = () => {
    if (!selectedMethod) return;

    setProcessing(true);
    // Simulate payment processing delay
    setTimeout(() => {
      setProcessing(false);
      onClose(); // Close the payment modal
      onPaymentSuccess(book.title); // Trigger success state in Books component
    }, 2000);
  };

  const methods = [
    { name: 'Credit Card', icon: CreditCard, color: 'text-blue-500' },
    { name: 'M-Pesa / Mobile Money', icon: Smartphone, color: 'text-green-500' },
    { name: 'PayPal', icon: DollarSign, color: 'text-indigo-500' },
  ];

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100">
        <div className="p-4 rounded-t-xl bg-purple-600 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <DollarSign size={20} /> Complete Purchase
          </h3>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{book.title}</p>
          <p className="text-3xl font-extrabold text-purple-600 mb-6">KES {book.price}</p>
          
          <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-4">Choose Payment Method</h4>
          
          <div className="space-y-3 mb-6">
            {methods.map((method) => (
              <button
                key={method.name}
                onClick={() => setSelectedMethod(method.name)}
                className={`w-full p-4 border rounded-lg flex items-center gap-3 transition-all duration-150
                  ${selectedMethod === method.name 
                    ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-500 dark:bg-gray-700'
                    : 'border-gray-300 hover:border-purple-400 dark:border-gray-700 dark:hover:bg-gray-700'
                  }`}
              >
                <method.icon size={24} className={method.color} />
                <span className="font-medium text-gray-800 dark:text-gray-100">{method.name}</span>
                {selectedMethod === method.name && <CheckCircle size={18} className="text-purple-600 ml-auto" />}
              </button>
            ))}
          </div>

          <button
            onClick={handlePayment}
            disabled={processing || !selectedMethod}
            className={`w-full px-6 py-3 font-bold rounded-lg shadow-md transition duration-200 flex items-center justify-center gap-2
              ${processing || !selectedMethod
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
          >
            {processing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              `Pay KES ${book.price} via ${selectedMethod || '...'}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};


const Books = () => {
  const [books, setBooks] = useState(initialBooks);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ visible: false, message: '', isSuccess: false });
  
  // NEW STATE: Controls the visibility and content of the Payment Modal
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null); 
  
  const navigate = useNavigate();

  // Helper to check if a user is "logged in" based on your MERN app's logic
  const isUserAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  // NEW: Function to be called by PaymentModal upon successful simulation
  const handlePaymentSuccess = (bookTitle) => {
     setModal({ 
        visible: true, 
        message: `Purchase simulation successful for "${bookTitle}". (Persistence disabled.)`, 
        isSuccess: true 
    });
  }


  // UPDATED: Handle Purchase Logic now opens the Payment Modal
  const handlePurchase = (book) => {
    // 1. MERN Authentication Check 
    if (!isUserAuthenticated()) {
      setModal({ 
        visible: true, 
        message: 'You must be logged in to make a purchase. Redirecting you to register...', 
        isSuccess: false 
      });
      setTimeout(() => {
        setModal(prev => ({ ...prev, visible: false }));
        navigate('/register');
      }, 1500); 
      return;
    }

    // 2. Open the payment modal
    setSelectedBook(book);
    setIsPaymentModalOpen(true);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId'); 
    navigate('/login'); 
  };


  const Modal = ({ message, isSuccess }) => {
    const icon = isSuccess ? <CheckCircle className="h-6 w-6 text-green-500" /> : <X className="h-6 w-6 text-red-500" />;
    const title = isSuccess ? 'Success!' : 'Error';
    const bgColor = isSuccess ? 'bg-green-600' : 'bg-red-600';

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
        <Navbar isAuthenticated={isUserAuthenticated()} handleLogout={handleLogout} />
        <div className="flex flex-col items-center justify-center flex-grow py-20 text-gray-700 dark:text-gray-300">
          <p className="mt-4">Loading books...</p>
        </div>
      </div>
    );
  }

  const isButtonEnabled = true; 

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 w-full">
      <Navbar isAuthenticated={isUserAuthenticated()} handleLogout={handleLogout} />
      
      <div className="py-10 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">
          Available Books
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Status: {isUserAuthenticated() ? 'Authenticated via MERN Login' : 'Guest User'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-purple-500/30 transition duration-300">
              <div>
                {/* NEW: Book Image */}
                {book.imageUrl && (
                  <img 
                    src={book.imageUrl} 
                    alt={book.title} 
                    className="w-full h-40 object-cover rounded-lg mb-4 shadow-sm" 
                  />
                )}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{book.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{book.description}</p>
                <p className="text-2xl font-extrabold text-purple-600 mb-6">KES {book.price}</p>
              </div>
              
              <button
                onClick={() => handlePurchase(book)}
                disabled={!isButtonEnabled} 
                className={`w-full px-4 py-2 font-semibold rounded-lg shadow-md transition duration-200 flex items-center justify-center gap-2 
                    ${!isButtonEnabled
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
              >
                <ShoppingCart size={20} /> Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Renders the Payment Modal when a book is selected */}
      {isPaymentModalOpen && selectedBook && (
        <PaymentModal 
          book={selectedBook} 
          onClose={() => setIsPaymentModalOpen(false)} 
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Custom Modal for alerts/errors/success messages */}
      {modal.visible && <Modal message={modal.message} isSuccess={modal.isSuccess} />}
    </div>
  );
};

export default Books;