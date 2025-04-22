const express = require('express')
const Product = require('../models/Product')
const router = express.Router()

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

module.exports = router