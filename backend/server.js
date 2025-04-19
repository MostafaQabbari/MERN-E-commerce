const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
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
.catch(err => console.error(err))

app.get('/api/products', async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})
