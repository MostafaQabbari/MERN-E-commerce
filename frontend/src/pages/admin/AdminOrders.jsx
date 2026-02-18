import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminOrders = () => {
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchOrders = () => {
    fetch("http://localhost:5050/api/admin/orders", { headers })
      .then(r => r.json())
      .then(data => { setOrders(data); setLoading(false); });
  };

  useEffect(() => { fetchOrders(); }, []);

  const markPaid = async (id) => {
    await fetch(`http://localhost:5050/api/admin/orders/${id}/pay`, { method: "PUT", headers });
    fetchOrders();
  };

  const markDelivered = async (id) => {
    await fetch(`http://localhost:5050/api/admin/orders/${id}/deliver`, { method: "PUT", headers });
    fetchOrders();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-teal-700 text-white px-8 py-6">
        <h1 className="text-2xl font-bold">📦 Order Management</h1>
      </div>
      <div className="bg-teal-600 text-white flex gap-6 px-8 py-3 text-sm font-medium">
        <Link to="/admin" className="hover:text-yellow-300">Dashboard</Link>
        <Link to="/admin/products" className="hover:text-yellow-300">Products</Link>
        <Link to="/admin/orders" className="hover:text-yellow-300">Orders</Link>
        <Link to="/admin/users" className="hover:text-yellow-300">Users</Link>
        <Link to="/" className="hover:text-yellow-300 ml-auto">← Back to Store</Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">All Orders ({orders.length})</h2>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Paid</th>
                <th className="px-4 py-3">Delivered</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-xs text-gray-400 font-mono">{o._id.slice(-10)}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{o.user?.name || "Guest"}</div>
                    <div className="text-xs text-gray-400">{o.user?.email}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 font-medium text-teal-700">€{o.totalPrice.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${o.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                      {o.isPaid ? `Paid ${new Date(o.paidAt).toLocaleDateString()}` : "Unpaid"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${o.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {o.isDelivered ? "Delivered" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2 flex-wrap">
                    {!o.isPaid && (
                      <button onClick={() => markPaid(o._id)} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs hover:bg-green-200 font-medium">
                        Mark Paid
                      </button>
                    )}
                    {!o.isDelivered && (
                      <button onClick={() => markDelivered(o._id)} className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs hover:bg-blue-200 font-medium">
                        Mark Delivered
                      </button>
                    )}
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

export default AdminOrders;