const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const productRoutes = require('./routes/productRoutes')
const Product = require('../models/Product')
const router = express.Router()

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/products', productRoutes)

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend' })
})


// @route   GET /api/products
router.get('/', async (req, res) => {
    const products = await Product.find()
    res.json(products)
  })


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})
