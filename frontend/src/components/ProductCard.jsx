import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault() // prevent navigating to product page
    addToCart(product)
  }

  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-contain rounded mb-4"
        />
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-gray-600">{product.category}</p>
        <p className="text-blue-600 font-semibold text-lg">€{product.price}</p>
        <button
          onClick={handleAddToCart}
          className="mt-2 w-full bg-yellow-400 hover:bg-yellow-300 text-black py-1 rounded"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  )
}
