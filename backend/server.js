const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const Product = require('./models/Product')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err))

// Test route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend' })
})

// Products route
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' })
  }
})

const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})
