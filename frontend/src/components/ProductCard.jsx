import React from 'react'

export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600 mt-1">{product.category}</p>
      <p className="text-xl font-bold text-blue-600 mt-2">€{product.price}</p>
    </div>
  )
}
