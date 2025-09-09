// src/pages/AboutUs.jsx
import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
      <p className="mb-4 text-lg text-gray-700">
        Welcome to <span className="font-semibold">ShopSmart</span> — your one-stop shop for everything you need.  
        Our mission is simple: provide quality products at fair prices while giving our customers the best online shopping experience.
      </p>
      <p className="mb-4 text-lg text-gray-700">
        Founded in 2025, ShopSmart started with a vision to make online shopping more reliable, fast, and enjoyable.  
        We are a passionate team that believes shopping should be easy and stress-free.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        <li>✅ Customer-first approach</li>
        <li>✅ Affordable quality products</li>
        <li>✅ Fast and secure delivery</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Meet the Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="text-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Team member"
            className="rounded-full mx-auto mb-2"
          />
          <p className="font-medium">Sarah – CEO & Founder</p>
        </div>
        <div className="text-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Team member"
            className="rounded-full mx-auto mb-2"
          />
          <p className="font-medium">John – Lead Developer</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
