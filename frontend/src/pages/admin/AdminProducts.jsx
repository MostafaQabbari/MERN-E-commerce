import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const emptyForm = {
  name: "", price: "", category: "", image: "", description: "", countInStock: ""
};

const AdminProducts = () => {
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  const fetchProducts = () => {
    fetch("http://localhost:5050/api/admin/products", { headers })
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false); });
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const url = editId
      ? `http://localhost:5050/api/admin/products/${editId}`
      : "http://localhost:5050/api/admin/products";
    const method = editId ? "PUT" : "POST";
    await fetch(url, { method, headers, body: JSON.stringify({ ...form, price: Number(form.price), countInStock: Number(form.countInStock) }) });
    setSaving(false);
    setShowForm(false);
    setForm(emptyForm);
    setEditId(null);
    fetchProducts();
  };

  const handleEdit = (p) => {
    setForm({ name: p.name, price: p.price, category: p.category, image: p.image, description: p.description, countInStock: p.countInStock });
    setEditId(p._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await fetch(`http://localhost:5050/api/admin/products/${id}`, { method: "DELETE", headers });
    fetchProducts();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-teal-700 text-white px-8 py-6">
        <h1 className="text-2xl font-bold">🛍️ Product Management</h1>
      </div>
      <div className="bg-teal-600 text-white flex gap-6 px-8 py-3 text-sm font-medium">
        <Link to="/admin" className="hover:text-yellow-300">Dashboard</Link>
        <Link to="/admin/products" className="hover:text-yellow-300">Products</Link>
        <Link to="/admin/orders" className="hover:text-yellow-300">Orders</Link>
        <Link to="/admin/users" className="hover:text-yellow-300">Users</Link>
        <Link to="/" className="hover:text-yellow-300 ml-auto">← Back to Store</Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">All Products ({products.length})</h2>
          <button onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 font-medium">
            + Add Product
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
              <h3 className="text-lg font-bold mb-4">{editId ? "Edit Product" : "Add New Product"}</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                {[["name","Product Name"],["price","Price (€)"],["category","Category"],["image","Image URL"],["countInStock","Stock Quantity"]].map(([key, label]) => (
                  <input key={key} type={key === "price" || key === "countInStock" ? "number" : "text"}
                    placeholder={label} value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required />
                ))}
                <textarea placeholder="Description" value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  rows={3} required />
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving}
                    className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 font-medium disabled:opacity-50">
                    {saving ? "Saving..." : editId ? "Update" : "Create"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 font-medium">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg" />
                    <span className="font-medium text-gray-800">{p.name}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{p.category}</td>
                  <td className="px-4 py-3 font-medium text-teal-700">€{p.price}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.countInStock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                      {p.countInStock > 0 ? `${p.countInStock} in stock` : "Out of stock"}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => handleEdit(p)} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-xs hover:bg-blue-200 font-medium">Edit</button>
                    <button onClick={() => handleDelete(p._id)} className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-xs hover:bg-red-200 font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;