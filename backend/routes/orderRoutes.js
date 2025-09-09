// backend/routes/orderRoutes.js
import express from "express"
import Order from "../models/Order.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

// @desc   Create new order
// @route  POST /api/orders
// @access Private
router.post("/", protect, async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = req.body

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" })
    }

    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id, // added by protect middleware
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @desc   Get logged-in user orders
// @route  GET /api/orders/myorders
// @access Private
// GET logged-in user's orders
router.get("/myorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" })
  }
})

export default router
