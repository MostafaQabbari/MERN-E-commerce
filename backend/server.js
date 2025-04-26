const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const Product = require('./models/Product')
const authRoutes = require('./routes/authRoutes')
const productRoutes =require('./routes/productRoutes')
const reviewRoutes = require('./routes/reviewRoutes')

dotenv.config()

const app = express()

const connectToDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('❌ MONGO_URI is undefined. Check your .env file.')
    }
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ MongoDB Atlas connected')
  } catch (err) {
    console.error('❌ MongoDB connection error:')
    console.error(err.message)
  }
}

connectToDB()

app.use(cors())
app.use(express.json())
app.use('/api', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/reviews', reviewRoutes)



app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})

