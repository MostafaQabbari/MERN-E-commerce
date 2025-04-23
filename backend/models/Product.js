const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  category: String,
  description: String,
  countInStock: Number,
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model('Product', productSchema)