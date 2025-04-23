import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-teal-700 text-white p-6 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <h3 className="font-bold mb-2">About Us</h3>
          <p>Learn more about our mission and values.</p>
        </div>
        <div>
          <h3 className="font-bold mb-2">Customer Service</h3>
          <ul>
            <li>Help Center</li>
            <li>Returns</li>
            <li>Track Order</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Categories</h3>
          <ul>
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Gaming</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Connect</h3>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-4 text-xs">© 2025 E-store. All rights reserved.</div>
    </footer>
  )
}
