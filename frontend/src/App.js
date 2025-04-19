import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './components/ProductCard'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('/api/products') // works if proxy is set
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

