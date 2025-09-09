import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login") // redirect if not logged in
      return
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error("Failed to fetch orders")
        const data = await res.json()
        setOrders(data)
      } catch (err) {
        console.error("Error fetching orders:", err)
      }
    }

    fetchOrders()
  }, [navigate])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📦 My Orders</h2>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
              <p><strong>Status:</strong> {order.isDelivered ? "✅ Delivered" : "⏳ Pending"}</p>
              <p><strong>Paid:</strong> {order.isPaid ? "💰 Yes" : "❌ No"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
