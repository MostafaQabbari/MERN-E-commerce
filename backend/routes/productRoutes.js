// backend/routes/productRoutes.js
import express from "express"
import Product from "../models/Product.js"
import Review from "../models/Review.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

// @desc   Get all products
// @route  GET /api/products
// @access Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// @desc   Get single product by ID
// @route  GET /api/products/:id
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: "Product not found" })
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// @desc   Create a review for a product
// @route  POST /api/products/:id/reviews
// @access Private
router.post("/:id/reviews", protect, async (req, res) => {
  const { rating, comment } = req.body

  try {
    const review = new Review({
      product: req.params.id,
      user: req.user._id,
      rating,
      comment,
    })

    await review.save()
    res.status(201).json({ message: "Review added" })
  } catch (err) {
    res.status(500).json({ error: "Failed to save review" })
  }
})

// @desc   Get reviews for a product
// @route  GET /api/products/:id/reviews
// @access Public
router.get("/:id/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.id }).populate("user", "name")
    res.json(reviews)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" })
  }
})

export default router
