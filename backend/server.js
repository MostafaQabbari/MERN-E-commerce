// backend/server.js
import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"

import productRoutes from "./routes/productRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import Product from "./models/Product.js"  // ✅ ESM import

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/orders", orderRoutes)

// Database connection
const connectToDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("❌ MONGO_URI is undefined. Check your .env file.")
    }
    await mongoose.connect(process.env.MONGO_URI)
    console.log("✅ MongoDB connected")
  } catch (err) {
    console.error("❌ MongoDB connection error:")
    console.error(err.message)
    console.log("🔄 Retrying MongoDB connection in 5 seconds...")
    setTimeout(connectToDB, 5000)
  }
}
connectToDB()

// Temporary test route for fetching products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" })
  }
})

const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})
