const express = require('express')
const Product = require('../models/Product')
const Review = require('../models/Review') // ✅ make sure this exists
const router = express.Router()
const protect = require('../middleware/auth')
// GET /api/products
router.get('/', async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// ✅ POST review for a product (protected)
router.post('/:id/reviews', protect, async (req, res) => {
  const { rating, comment } = req.body

  try {
    const review = new Review({
      product: req.params.id,
      user: req.user._id,
      rating,
      comment,
    })

    await review.save()
    res.status(201).json({ message: 'Review added' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to save review' })
  }
})

// ✅ GET reviews for a product
router.get('/:id/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.id }).populate('user', 'name')
    res.json(reviews)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' })
  }
})

module.exports = router
