const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Product = require('../models/Product')
const connectDB = require('../config/connectDB')

// Dummy products
const products = [
  {
    "name": "Wireless Headphones",
    "category": "Electronics",
    "price": 99.99,
    "image": "https://r2media.horizondm.com/catalog/product/cache/eb4305db09fb6492bb059b8131f647e3/h/e/headphone-wirless-tune-520bt-black-jbl-3.jpg"
  },
  {
    "name": "Bluetooth Speaker",
    "category": "Electronics",
    "price": 49.99,
    "image": "https://m.media-amazon.com/images/I/71DRh3h61OL._AC_SL1500_.jpg"
  },
  {
    "name": "Smartwatch",
    "category": "Wearables",
    "price": 129.99,
    "image": "https://m.media-amazon.com/images/I/61shUuiQKiL._AC_SL1500_.jpg"
  },
  {
    "name": "Laptop Backpack",
    "category": "Accessories",
    "price": 39.99,
    "image": "https://m.media-amazon.com/images/I/41E4fEES9eL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    "name": "Gaming Mouse",
    "category": "Gaming",
    "price": 29.99,
    "image": "https://m.media-amazon.com/images/I/61vF4LdktpL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    "name": "Mechanical Keyboard",
    "category": "Gaming",
    "price": 79.99,
    "image": "https://m.media-amazon.com/images/I/61rbDPiIkML._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    "name": "Smartphone",
    "category": "Electronics",
    "price": 699.99,
    "image": "https://m.media-amazon.com/images/I/71+d4rChCCL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    "name": "Running Shoes",
    "category": "Fashion",
    "price": 59.99,
    "image": "https://m.media-amazon.com/images/I/51RCs0GaniL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    "name": "Coffee Maker",
    "category": "Home Appliances",
    "price": 89.99,
    "image": "https://m.media-amazon.com/images/I/51xhpbbkEdL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    "name": "Electric Toothbrush",
    "category": "Personal Care",
    "price": 24.99,
    "image": "https://m.media-amazon.com/images/I/61SUSvif7tL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    "name": "Water Bottle",
    "category": "Fitness",
    "price": 14.99,
    "image": "https://m.media-amazon.com/images/I/61I0hFA+o0L._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    "name": "LED Desk Lamp",
    "category": "Home Office",
    "price": 19.99,
    "image": "https://m.media-amazon.com/images/I/61-+zxGt8pL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    "name": "Yoga Mat",
    "category": "Fitness",
    "price": 22.99,
    "image": "https://m.media-amazon.com/images/I/61fMb77NyoL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    "name": "4K Monitor",
    "category": "Electronics",
    "price": 249.99,
    "image": "https://m.media-amazon.com/images/I/810Sytc27aL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    "name": "Wireless Charger",
    "category": "Electronics",
    "price": 18.99,
    "image": "https://m.media-amazon.com/images/I/71hC8W0tbWL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    "name": "Desk Chair",
    "category": "Furniture",
    "price": 119.99,
    "image": "https://m.media-amazon.com/images/I/61EfPfCEPkL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    "name": "Sunglasses",
    "category": "Fashion",
    "price": 39.99,
    "image": "https://m.media-amazon.com/images/I/61JiniNyeaL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    "name": "T-Shirt Pack",
    "category": "Fashion",
    "price": 29.99,
    "image": "https://m.media-amazon.com/images/I/81E3Wt5FM1L._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    "name": "Vacuum Cleaner",
    "category": "Home Appliances",
    "price": 149.99,
    "image": "https://m.media-amazon.com/images/I/61YbjOXazxL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    "name": "Noise Cancelling Earbuds",
    "category": "Electronics",
    "price": 129.99,
    "image": "https://m.media-amazon.com/images/I/51M0yNEO-9L._AC_UL480_FMwebp_QL65_.jpg"
  }
]

dotenv.config()

const seedProducts = async () => {
  try {
    await connectDB()
    await Product.deleteMany()
    await Product.insertMany(products)
    console.log('✅ Dummy products inserted!')
    process.exit()
  } catch (err) {
    console.error('❌ Failed to seed products:', err)
    process.exit(1)
  }
}

seedProducts()
