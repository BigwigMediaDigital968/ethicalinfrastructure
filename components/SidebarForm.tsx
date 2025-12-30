"use client";

import React, { useState } from "react";
import axios from "axios";
import type { AxiosError } from "axios";

export default function SidebarSimpleForm() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+91",
    phone: "",
    email: "",
    requirements: "Apartment",
    budget: "₹2Cr - ₹3Cr",
    message: "",
  });

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val) && val.length <= 10) {
      setFormData({ ...formData, phone: val });
    }
  };

  /* ================= SUBMIT FORM ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("");

    if (!formData.name.trim()) {
      setStatusMessage("Please enter your name.");
      return;
    }

    if (formData.phone.length !== 10) {
      setStatusMessage("Phone number must be exactly 10 digits.");
      return;
    }

    if (formData.email && !emailRegex.test(formData.email)) {
      setStatusMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/lead/submit`, {
        ...formData,
        phone: formData.countryCode + formData.phone,
      });

      setStatusMessage("Thank you! Our team will contact you soon.");

      setFormData({
        name: "",
        countryCode: "+91",
        phone: "",
        email: "",
        requirements: "Apartment",
        budget: "₹2Cr - ₹3Cr",
        message: "",
      });
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      setStatusMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <p className="text-sm text-gray-500 mb-4">
        Fill in your details and we’ll get in touch
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 text-sm"
          required
        />

        <div className="flex gap-2">
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className="border rounded-md px-2 py-2 text-sm w-24"
          >
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
            <option value="+971">+971</option>
          </select>

          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handlePhoneChange}
            className="flex-1 border rounded-md px-3 py-2 text-sm"
            required
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 text-sm"
        />

        <select
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 text-sm"
        >
          <option>Apartment</option>
          <option>Builder Floor</option>
          <option>Villa</option>
          <option>Farmhouse</option>
          <option>Plot</option>
        </select>

        <select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 text-sm"
        >
          <option>₹2Cr - ₹3Cr</option>
          <option>₹3Cr - ₹4Cr</option>
          <option>₹4Cr - ₹5Cr</option>
          <option>Above ₹5Cr</option>
        </select>

        <textarea
          name="message"
          placeholder="Your requirement"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 text-sm"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--primary-color)] text-white py-2 rounded-md font-semibold text-sm"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {statusMessage && (
        <p className="mt-3 text-center text-sm text-gray-600">
          {statusMessage}
        </p>
      )}
    </div>
  );
}
