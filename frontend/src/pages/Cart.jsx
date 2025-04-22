// src/pages/Cart.jsx
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, total, clearCart } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">🛒 Your cart is empty</h2>
        <Link to="/" className="text-teal-600 underline">Continue shopping</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">🛍️ Shopping Cart</h2>
      <div className="space-y-6">
        {cartItems.map(item => (
          <div key={item._id} className="bg-white p-4 rounded shadow flex gap-4 items-center">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
            <div className="flex-grow">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-gray-600">€{item.price.toFixed(2)}</p>
              <div className="mt-2">
                <label className="mr-2">Qty:</label>
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) => updateQty(item._id, parseInt(e.target.value))}
                  className="w-16 border px-2 py-1 rounded"
                  min="1"
                />
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-white rounded shadow text-right">
        <p className="text-xl font-bold">Total: €{total.toFixed(2)}</p>
        <button
          onClick={clearCart}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
      </div>
    </div>
  )
}
