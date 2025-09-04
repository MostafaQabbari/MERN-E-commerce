// src/pages/ShippingScreen.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ShippingScreen() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Save shipping info to Context or LocalStorage
    console.log('Shipping Info:', form)
    navigate('/payment') // go to next step
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">🚚 Shipping Address</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          required
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={form.postalCode}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700"
        >
          Continue to Payment →
        </button>
      </form>
    </div>
  )
}
