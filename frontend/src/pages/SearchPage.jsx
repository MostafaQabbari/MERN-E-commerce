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
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortOption, setSortOption] = useState('')

  const query = useQuery()
  const searchTerm = query.get('q') || ''
  const category = query.get('category') || 'All'

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('❌ Could not fetch products:', err))
  }, [])

  useEffect(() => {
    let filteredProducts = products.filter(product => {
      const matchName = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchCategory = category === 'All' || product.category === category
      const matchPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      return matchName && matchCategory && matchPrice
    })

    if (sortOption === 'priceLowHigh') {
      filteredProducts.sort((a, b) => a.price - b.price)
    } else if (sortOption === 'newest') {
      filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sortOption === 'rating') {
      filteredProducts.sort((a, b) => b.rating - a.rating)
    }

    setFiltered(filteredProducts)
  }, [products, searchTerm, category, priceRange, sortOption])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{searchTerm}"</h1>

      <div className="flex gap-6 mb-6">
        <div className="w-64 bg-white p-4 rounded shadow">
          <label className="block font-semibold mb-2">Price Range</label>
          <input type="range" min="0" max="1000" value={priceRange[1]} onChange={e => setPriceRange([0, Number(e.target.value)])} className="w-full" />
          <p className="text-sm text-gray-600">€0 - €{priceRange[1]}</p>

          <label className="block font-semibold mt-4 mb-2">Sort by</label>
          <select value={sortOption} onChange={e => setSortOption(e.target.value)} className="w-full border rounded p-2">
            <option value="">None</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="newest">Newest</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {filtered.length > 0 ? (
            filtered.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-gray-600">No products found.</p>
          )}
        </div>
      </div>
    </div>
  )
}
