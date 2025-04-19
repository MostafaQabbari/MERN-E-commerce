export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-gray-600">{product.category}</p>
      <p className="text-blue-600 font-semibold text-lg">€{product.price}</p>
    </div>
  )
}
