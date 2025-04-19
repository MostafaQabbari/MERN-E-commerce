const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Product = require('../models/Product')

dotenv.config()
mongoose.connect(process.env.MONGO_URI)

const seedProducts = [
  {
    name: 'Wireless Headphones',
    image: 'https://via.placeholder.com/150',
    price: 99.99,
    category: 'Electronics',
    description: 'High-quality wireless sound.',
    countInStock: 10,
    rating: 4.5,
    numReviews: 12
  },
  // Add more products...
]

const seedDB = async () => {
  await Product.deleteMany()
  await Product.insertMany(seedProducts)
  console.log('✅ Products seeded!')
  process.exit()
}

seedDB()
