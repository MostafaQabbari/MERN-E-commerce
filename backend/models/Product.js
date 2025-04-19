const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  category: String,
  description: String,
  countInStock: Number,
  rating: Number,
  numReviews: Number,
})

module.exports = mongoose.model('Product', productSchema)