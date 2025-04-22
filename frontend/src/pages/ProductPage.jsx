// src/pages/ProductPage.jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context/CartContext'

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get(`/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error('❌ Could not fetch product:', err))
  }, [id])

  if (!product) return <div className="p-6">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6 flex flex-col md:flex-row gap-6">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 rounded object-cover" />
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-700">Category: {product.category}</p>
          <p className="text-gray-900 text-xl font-semibold">€{product.price}</p>
          <button onClick={() => addToCart(product)}className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded w-fit">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
