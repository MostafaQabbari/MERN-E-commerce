// src/pages/ProductPage.jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const { addToCart } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get(`/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error('❌ Could not fetch product:', err))

    axios.get(`/api/products/${id}/reviews`)
      .then(res => setReviews(res.data))
      .catch(err => console.error('❌ Could not fetch reviews:', err))
  }, [id])

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!user) return alert('You must be logged in to leave a review.')

    try {
      await axios.post(`/api/products/${id}/reviews`, { rating, comment }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      const updated = await axios.get(`/api/products/${id}/reviews`)
      setReviews(updated.data)
      setRating(5)
      setComment('')
    } catch (error) {
      console.error('❌ Review submission failed:', error)
    }
  }

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 'No reviews yet'

  if (!product) return <div className="p-6">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6 flex flex-col gap-6">
        <img src={product.image} alt={product.name} className="w-full h-96 object-contain rounded" />

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-700">Category: {product.category}</p>
          <p className="text-gray-900 text-xl font-semibold">€{product.price}</p>
          <p className="text-yellow-600">⭐ {averageRating} ({reviews.length} reviews)</p>
          <button onClick={() => addToCart(product)} className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded w-fit">Add to Cart</button>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold mb-2 text-lg">Leave a Review:</h3>
          {user ? (
            <form onSubmit={handleReviewSubmit} className="bg-gray-50 p-4 rounded border space-y-3">
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <span
                    key={star}
                    className={`cursor-pointer text-2xl transition-transform ${rating >= star ? 'text-yellow-500 scale-110' : 'text-gray-400'}`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="Write your review..."
                rows="4"
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Submit Review
              </button>
            </form>
          ) : (
            <p className="text-sm text-red-500">You must be logged in to write a review.</p>
          )}

          <div className="mt-6">
            <h3 className="font-semibold mb-2 text-lg">Customer Reviews:</h3>
            {reviews.length > 0 ? (
              <ul className="space-y-3">
                {reviews.map((review, idx) => (
                  <li key={idx} className="border p-4 rounded bg-white flex justify-between items-center">
                    <div>
                      <p className="text-base font-semibold text-gray-800">{review.user?.name || 'Anonymous'}</p>
                      <p className="text-gray-700 text-lg mt-1">{review.comment}</p>
                    </div>
                    <div className="text-3xl text-yellow-500 ml-4 whitespace-nowrap">
                      {'★'.repeat(review.rating)}
                      {'☆'.repeat(5 - review.rating)}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
