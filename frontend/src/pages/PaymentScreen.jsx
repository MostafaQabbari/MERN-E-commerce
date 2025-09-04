// src/pages/PaymentScreen.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentScreen() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  useEffect(() => {
    // Redirect if no shipping address exists
    const shippingAddress = localStorage.getItem("shippingAddress");
    if (!shippingAddress) {
      navigate("/shipping");
    }

    // Load saved payment method if exists
    const savedPayment = localStorage.getItem("paymentMethod");
    if (savedPayment) {
      setPaymentMethod(savedPayment);
    }
  }, [navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Save chosen method
    localStorage.setItem("paymentMethod", paymentMethod);

    // Go to place order page
    navigate("/placeorder");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <form
        onSubmit={submitHandler}
        className="bg-white shadow rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          💳 Select Payment Method
        </h2>

        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="accent-teal-600"
            />
            PayPal
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="CreditCard"
              checked={paymentMethod === "CreditCard"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="accent-teal-600"
            />
            Credit Card
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
        >
          Continue to Place Order →
        </button>
      </form>
    </div>
  );
}
