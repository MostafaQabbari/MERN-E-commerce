import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './components/ProductCard'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('❌ Could not fetch products:', err))
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">🛍️ Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default App



