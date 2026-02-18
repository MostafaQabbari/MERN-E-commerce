import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5050/api/admin/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-red-500">Error: {error}</p>
    </div>
  );

  if (!stats) return null;

  const revenue = typeof stats.totalRevenue === "number" ? stats.totalRevenue : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-teal-700 text-white px-8 py-6">
        <h1 className="text-2xl font-bold">🛠️ Admin Dashboard</h1>
        <p className="text-teal-200 text-sm mt-1">Welcome back, {user.name}</p>
      </div>

      {/* Nav */}
      <div className="bg-teal-600 text-white flex gap-6 px-8 py-3 text-sm font-medium">
        <Link to="/admin" className="hover:text-yellow-300">Dashboard</Link>
        <Link to="/admin/products" className="hover:text-yellow-300">Products</Link>
        <Link to="/admin/orders" className="hover:text-yellow-300">Orders</Link>
        <Link to="/admin/users" className="hover:text-yellow-300">Users</Link>
        <Link to="/" className="hover:text-yellow-300 ml-auto">← Back to Store</Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Revenue", value: `€${revenue.toFixed(2)}`, icon: "💰", color: "bg-green-500" },
            { label: "Total Orders", value: stats.totalOrders || 0, icon: "📦", color: "bg-blue-500" },
            { label: "Total Products", value: stats.totalProducts || 0, icon: "🛍️", color: "bg-purple-500" },
            { label: "Total Users", value: stats.totalUsers || 0, icon: "👥", color: "bg-orange-500" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
              <div className={`${s.color} text-white text-2xl rounded-lg w-12 h-12 flex items-center justify-center`}>
                {s.icon}
              </div>
              <div>
                <p className="text-gray-500 text-xs">{s.label}</p>
                <p className="text-xl font-bold text-gray-800">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
            <Link to="/admin/orders" className="text-teal-600 text-sm hover:underline">View all →</Link>
          </div>
          {!stats.recentOrders || stats.recentOrders.length === 0 ? (
            <p className="text-gray-400 text-sm">No orders yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2">Order ID</th>
                  <th className="pb-2">Customer</th>
                  <th className="pb-2">Total</th>
                  <th className="pb-2">Paid</th>
                  <th className="pb-2">Delivered</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((o) => (
                  <tr key={o._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 text-xs text-gray-400">{o._id.slice(-8)}</td>
                    <td className="py-2">{o.user?.name || "Guest"}</td>
                    <td className="py-2 font-medium">€{(o.totalPrice || 0).toFixed(2)}</td>
                    <td className="py-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${o.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                        {o.isPaid ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td className="py-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${o.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {o.isDelivered ? "Delivered" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
