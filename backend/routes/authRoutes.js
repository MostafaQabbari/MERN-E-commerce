// backend/routes/authRoutes.js
import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

// POST /api/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = new User({ name, email, password: hashedPassword })
  await user.save()

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  })
})

// POST /api/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" })
  }

  const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET)

  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  })
})

export default router
