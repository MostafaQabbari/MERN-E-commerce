# MERN-E-commerce

# E-Commerce Platform (MERN + JavaScript + FullStack)

A full-featured E-Commerce platform built with a modern technology stack using:

- React + TypeScript (Frontend)
- Node.js + Express + TypeScript (Backend API)
- MongoDB (Database)
- JWT Authentication (Users + Admin)
- Chakra UI (Frontend styling)
- Stripe or Payment Integration (Planned)
- Admin Dashboard (Planned)

This project is designed to be enterprise-ready and used for real world production with real users.

---

## Features

### User

✅ User registration and login (JWT + bcrypt password security)  
✅ Product listing and browsing  
✅ Product details page  
✅ Add to cart and manage cart  
✅ Checkout (with order summary)  
✅ Protected routes → cart, profile, orders  
✅ Order history

---

## Tech Stack

### Frontend

- React.js (with TypeScript)
- Next.js (optional future upgrade)
- Chakra UI (UI framework)
- React Router
- Axios

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT (Authentication)
- Bcrypt (Password hashing)

---

## Project Structure

/ecommerce-backend
├── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ └── utils/
├── .env
├── package.json
└── tsconfig.json

/ecommerce-frontend
├── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ └── utils/
├── public/
├── package.json
└── tsconfig.json


---

## Getting Started

### Backend

```bash
cd ecommerce-backend
npm install
npm run dev
Add your MongoDB URI + JWT secret in .env
Frontend
cd ecommerce-frontend
npm install
npm run dev
Update .env if needed to point to backend API URL.
Deployment

Planned deployment targets:

Backend → Railway / Render / DigitalOcean
Frontend → Vercel / Netlify
Both apps are easily dockerizable.

License

MIT License.

Contributors

Moustafa Saad→ Full Stack Developer 
