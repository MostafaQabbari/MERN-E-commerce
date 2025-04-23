import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../components/ProductCard'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function SearchPage() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])

  const query = useQuery()
  const searchTerm = query.get('q') || ''
  const category = query.get('category') || 'All'

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('❌ Could not fetch products:', err))
  }, [])

  useEffect(() => {
    const filteredProducts = products.filter(product => {
      const matchName = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchCategory = category === 'All' || product.category === category
      return matchName && matchCategory
    })
    setFiltered(filteredProducts)
  }, [products, searchTerm, category])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{searchTerm}"</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.length > 0 ? (
          filtered.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-gray-600">No products found.</p>
        )}
      </div>
    </div>
  )
}
