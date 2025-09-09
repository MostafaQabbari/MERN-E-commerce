// src/pages/ContactUs.jsx
import React from "react";

const ContactUs = () => {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <p className="mb-4 text-gray-700 text-lg">
        Have questions, feedback, or need support?  
        We'd love to hear from you! Reach us through the options below:
      </p>

      <div className="space-y-4">
        <p>
          📍 <span className="font-medium">Address:</span> 123 Main Street, Berlin, Germany
        </p>
        <p>
          📞 <span className="font-medium">Phone:</span> +49 123 456 789
        </p>
        <p>
          📧 <span className="font-medium">Email:</span> support@shopsmart.com
        </p>
      </div>

      <form className="mt-8 space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border rounded-lg p-3"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border rounded-lg p-3"
          required
        />
        <textarea
          placeholder="Your Message"
          className="w-full border rounded-lg p-3"
          rows="4"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
