EduBooks (MERN Stack E-commerce/Education Platform)

🚧 PROJECT STATUS: INCOMPLETE (Submission for Core Functionality) 🚧

This submission represents a partially completed application built to demonstrate core user authentication, API deployment, and database integration capabilities.

The primary achievement of this phase was to successfully deploy the full-stack application across two cloud providers (Vercel/Render) and establish seamless cross-domain communication.

✅ Implemented Core Functionality

The following features have been successfully developed and deployed:

Status

Feature

Notes

✅ Working

Full-Stack Deployment

Frontend (React) on Vercel communicates successfully with Backend (Node/Express) on Render using a Vercel Rewrite rule.

✅ Working

User Registration (/signup)

Users can be created and saved to the MongoDB backend.

✅ Working

User Login (/signin)

Users can authenticate, receive a JWT, and sync their session with Firebase Auth using a custom token.

✅ Working

Responsive Navigation & Layout

Global Navbar accurately displays Logged In/Logged Out state. Home and Login/Register pages have complete, responsive UI layouts.

✅ Working

Books Listing & Purchase Logic

The Books page UI is functional. It reads initial data from a public Firestore collection.

✅ Working

Purchase Initiation (Data Layer)

When a user clicks "Buy Now" while logged in, a new document representing the purchase is successfully created in the user's private Firestore collection (/artifacts/{appId}/users/{userId}/purchases).

🛑 Missing Features & Next Steps

The project is not feature-complete and requires the following to be functional:

Status

Feature

Notes on Incompleteness

❌ Incomplete

Ebook Data Structure

The list of available books is currently placeholder data in Firestore. Real-world ebook data and image assets need to be integrated.

❌ Incomplete

Payment Processing

The handlePurchase function currently writes a transaction record to Firestore only. Secure payment gateway integration (e.g., Stripe) is not implemented.

❌ Incomplete

State Management

The application lacks robust global state management (e.g., Context/Redux) for user sessions, cart items, and dynamic content.

❌ Incomplete

My Purchases Page

The /purchases route exists, but the logic to query and display the Firestore purchase history for the logged-in user is incomplete.

🔗 Deployment and Access

Component

Technology

Hosting Platform

Live URL

Frontend (UI)

React.js

Vercel

https://edubooksfrontend.vercel.app/

Backend (API)

Node.js, Express, MongoDB

Render

https://edubooksbackend.onrender.com/

🛠 Technology Stack

Frontend: React.js, Tailwind CSS

Authentication: JWT, Firebase Auth

Backend: Node.js / Express

Databases: MongoDB (for users/auth), Firestore (for application data/purchases)
