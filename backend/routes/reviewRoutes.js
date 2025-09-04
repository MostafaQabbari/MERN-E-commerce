// backend/routes/reviewRoutes.js
import express from "express"
import Product from "../models/Product.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

// @desc   Get reviews for a product
// @route  GET /api/reviews/:id
// @access Public
router.get("/:id/reviews", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }
    res.json(product.reviews || [])
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// @desc   Add a review to a product
// @route  POST /api/reviews/:id
// @access Private
router.post("/:id/reviews", protect, async (req, res) => {
  const { rating, comment } = req.body

  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user.id
    )

    if (alreadyReviewed) {
      return res.status(400).json({ error: "You already reviewed this product" })
    }

    const review = {
      user: req.user.id,
      rating,
      comment,
      createdAt: new Date(),
    }

    product.reviews.push(review)
    await product.save()

    res.status(201).json(product.reviews)
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

export default router
