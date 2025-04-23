const express = require('express')
const router = express.Router()
const Review = require('../models/Review')
const authMiddleware = require('../middleware/auth') 

router.get('/:id/reviews', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product.reviews || []);
});

router.post('/:id/reviews', authMiddleware, async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const alreadyReviewed = product.reviews.find(
    r => r.user.toString() === req.user.id
  );
  if (alreadyReviewed) return res.status(400).json({ error: 'You already reviewed this product' });

  const review = {
    user: req.user.id,
    rating,
    comment,
    createdAt: new Date(),
  };

  product.reviews.push(review);
  await product.save();

  res.status(201).json(product.reviews);
});

module.exports = router;
