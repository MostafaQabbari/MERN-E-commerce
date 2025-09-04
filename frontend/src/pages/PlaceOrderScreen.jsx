// src/pages/PlaceOrderScreen.jsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

export default function PlaceOrderScreen() {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
      const savedAddress = localStorage.getItem("shippingAddress");
      const savedPayment = localStorage.getItem("paymentMethod");

      if (!savedAddress) return navigate("/shipping");
      if (!savedPayment) return navigate("/payment");

      setShippingAddress(JSON.parse(savedAddress));
      setPaymentMethod(savedPayment);
    } catch (err) {
      console.error("Error parsing saved shipping address:", err);
      navigate("/shipping");
    }
  }, [navigate]);

  if (!shippingAddress || !paymentMethod) {
    return null; // prevent premature rendering
  }

  const placeOrderHandler = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return navigate("/login");
      }

      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice: total,
          shippingPrice: total > 100 ? 0 : 10,
          totalPrice: total + (total > 100 ? 0 : 10),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Order placed:", data);
      clearCart();
      navigate(`/order/${data._id}`);
    } catch (error) {
      console.error("❌ Order failed:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "Order failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">📦 Place Order</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">
          {/* Shipping */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">Shipping</h3>
            <p>
              {shippingAddress.fullName}, {shippingAddress.address},{" "}
              {shippingAddress.city}, {shippingAddress.postalCode},{" "}
              {shippingAddress.country}
            </p>
          </div>

          {/* Payment */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">Payment</h3>
            <p>{paymentMethod}</p>
          </div>

          {/* Items */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">Order Items</h3>
            {cartItems.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              <ul className="divide-y">
                {cartItems.map((item) => (
                  <li
                    key={item._id}
                    className="flex justify-between py-2 items-center"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <Link to={`/product/${item._id}`} className="text-teal-600">
                        {item.name}
                      </Link>
                    </div>
                    <p>
                      {item.qty} × €{item.price.toFixed(2)} = €
                      {(item.qty * item.price).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-4">Order Summary</h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Items</span>
              <span>€{total.toFixed(2)}</span>
            </li>
            <li className="flex justify-between">
              <span>Shipping</span>
              <span>€{total > 100 ? "0.00" : "10.00"}</span>
            </li>
            <li className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>
                €
                {(total + (total > 100 ? 0 : 10)).toFixed(2)}
              </span>
            </li>
          </ul>

          {errorMessage && (
            <p className="text-red-600 mt-3">{errorMessage}</p>
          )}

          <button
            onClick={placeOrderHandler}
            disabled={cartItems.length === 0 || loading}
            className="mt-6 w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition disabled:bg-gray-400"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
