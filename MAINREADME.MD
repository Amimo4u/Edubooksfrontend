EduBooks (MERN Stack E-commerce/Education Platform)

✅ Project Status: Core Functionality Complete (MERN Focus)

This application successfully demonstrates core full-stack capabilities, focusing exclusively on the MERN architecture for user authentication and relying on local/mock data for the frontend e-commerce demonstration.

The primary achievement of this phase was establishing a stable, cross-domain architecture for deployment and secure data handling using JWTs.

Key Achieved Functionality

Status

Feature

Notes

✅ Working

Full-Stack Deployment

Frontend (React) on Vercel communicates successfully with Backend (Node/Express) on Render using a Vercel Rewrite rule, ensuring production-ready cross-domain requests.

✅ Working

User Registration (/signup)

Users can be created and persisted in the MongoDB backend.

✅ Working

User Login (/signin)

Users can authenticate, receive a JWT (MERN token), which secures all subsequent API interactions.

✅ Working

Responsive UI & Navigation

Global Navbar accurately displays Logged In/Logged Out state based on local MERN token presence. All major UI layouts are complete and fully responsive.

✅ Working

Books Listing & Buy Flow

The Books page UI is functional, displaying mock book details and images from local data. The purchase flow successfully triggers the Payment Method Modal upon authentication.

✅ Working

Data Handling

The application successfully uses local (mock) data for book listing and relies on MERN JWT for authentication status checks.

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

Authentication: JWT (MERN Backend Token Validation)

Backend: Node.js / Express

Databases:

MongoDB: Used for persistence and retrieval of core User and Authentication records.

Local/Mock Data: Used for static book list display and purchase simulation on the frontend.
