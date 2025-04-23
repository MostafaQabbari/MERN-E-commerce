import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import Slider from '../components/Slider'
import Footer from '../components/Footer'

export default function HomePage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('❌ Could not fetch products:', err))
  }, [])

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
