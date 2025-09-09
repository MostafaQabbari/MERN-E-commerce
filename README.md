# MERN E-Commerce

A full-featured **E-Commerce platform** built with the MERN stack.  
This project was created as a portfolio-ready application to demonstrate full-stack development skills.

---

## 🚀 Live Demo

👉 [Live Website Link Here – to be added after deployment]

---

## ✨ Features

### User Features
- ✅ User registration and login (JWT authentication + bcrypt password security)  
- ✅ Product listing and browsing  
- ✅ Product details page  
- ✅ Add to cart and manage cart  
- ✅ Checkout flow: **Cart → Shipping → Payment → Place Order**  
- ✅ Dummy payment (Cash on Delivery)  
- ✅ Order history page  
- ✅ Protected routes for cart, orders, and checkout  


---

## 🛠️ Tech Stack

**Frontend**
- React.js (JavaScript)
- React Router
- Axios
- TailwindCSS (UI styling)

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

**Others**
- Docker & Docker Compose (for running frontend + backend together)

## ⚡ Getting Started

### Run with Docker (Recommended)

```bash
docker-compose up --build

This will build and start both the frontend and backend containers.
App will be available at http://localhost:3000
.

Run Without Docker
Backend
cd ecommerce-backend
npm install
npm run dev

Frontend
cd ecommerce-frontend
npm install
npm start

