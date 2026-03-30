import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import Slider from '../components/Slider'
import Footer from '../components/Footer'

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5050"

export default function HomePage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(`${API_BASE}/api/products`)
      .then(res => {
        const data = res.data
        setProducts(Array.isArray(data) ? data : data.products || [])
      })
      .catch(err => console.error('❌ Could not fetch products:', err))
  }, [])
  
  // rest of your code stays the same

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Image Slider */}
      <Slider />

      {/* Products Grid */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
