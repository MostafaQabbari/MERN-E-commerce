// src/pages/ShippingScreen.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ShippingScreen() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    // load saved address if exists
    const savedAddress = localStorage.getItem("shippingAddress");
    if (savedAddress) {
      const addr = JSON.parse(savedAddress);
      setFullName(addr.fullName || "");
      setAddress(addr.address || "");
      setCity(addr.city || "");
      setPostalCode(addr.postalCode || "");
      setCountry(addr.country || "");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const shippingData = {
      fullName,
      address,
      city,
      postalCode,
      country,
    };

    // ✅ Save to localStorage properly
    localStorage.setItem("shippingAddress", JSON.stringify(shippingData));

    // ✅ Redirect to payment page
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <form
        onSubmit={submitHandler}
        className="bg-white shadow rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">🚚 Shipping</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
          required
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        <button
          type="submit"
          className="mt-6 w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
