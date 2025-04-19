export default function ProductCard({ product }) {
    return (
      <div className="border p-4">
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-gray-700">€{product.price}</p>
      </div>
    )
  }