import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminUsers = () => {
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchUsers = () => {
    fetch("http://localhost:5050/api/admin/users", { headers })
      .then(r => r.json())
      .then(data => { setUsers(data); setLoading(false); });
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await fetch(`http://localhost:5050/api/admin/users/${id}`, { method: "DELETE", headers });
    fetchUsers();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-teal-700 text-white px-8 py-6">
        <h1 className="text-2xl font-bold">👥 User Management</h1>
      </div>
      <div className="bg-teal-600 text-white flex gap-6 px-8 py-3 text-sm font-medium">
        <Link to="/admin" className="hover:text-yellow-300">Dashboard</Link>
        <Link to="/admin/products" className="hover:text-yellow-300">Products</Link>
        <Link to="/admin/orders" className="hover:text-yellow-300">Orders</Link>
        <Link to="/admin/users" className="hover:text-yellow-300">Users</Link>
        <Link to="/" className="hover:text-yellow-300 ml-auto">← Back to Store</Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">All Users ({users.length})</h2>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{u.name}</td>
                  <td className="px-4 py-3 text-gray-500">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.isAdmin ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"}`}>
                      {u.isAdmin ? "Admin" : "Customer"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    {!u.isAdmin && (
                      <button onClick={() => handleDelete(u._id)} className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-xs hover:bg-red-200 font-medium">
                        Delete
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

export default AdminUsers;