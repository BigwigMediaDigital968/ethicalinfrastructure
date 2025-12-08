"use client";

import React, { useState } from "react";
import axios from "axios";
import ButtonFill from "./Button";

const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+91",
    phone: "",
    email: "",
    requirements: "",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error while typing
  };

  // ✅ Real-time phone input handler
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // allow only digits
    if (/^\d*$/.test(value)) {
      // limit to 10 digits
      if (value.length > 10) return;

      setFormData({ ...formData, phone: value });

      // set real-time error messages
      if (value.length < 10 && value.length > 0)
        setErrors({
          ...errors,
          phone: "Phone number must be exactly 10 digits.",
        });
      else setErrors({ ...errors, phone: "" });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";

    if (!formData.phone) newErrors.phone = "Phone number is required.";
    else if (formData.phone.length !== 10)
      newErrors.phone = "Phone number must be exactly 10 digits.";

    if (formData.email && !emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email address.";

    if (!formData.requirements)
      newErrors.requirements = "Please select a property type.";

    if (!formData.budget) newErrors.budget = "Please select a budget range.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        phone: formData.countryCode + formData.phone, // include country code
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/lead/submit`,
        payload
      );

      if (res.status === 200) {
        setSuccess("✅ Lead submitted successfully!");
        setFormData({
          name: "",
          countryCode: "+91",
          phone: "",
          email: "",
          requirements: "",
          budget: "",
          message: "",
        });
      }
    } catch (err) {
      console.error("Lead submission failed:", err);
      alert("❌ Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-[var(--white)] text-[var(--black)] overflow-hidden flex flex-col md:flex-row">
      <div className="w-full">
        <h3 className="text-3xl md:text-4xl font-bold mt-2 mb-6 tracking-widest text-[var(--primary-color)]">
          Get In Touch
        </h3>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name*"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CE9C81]"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          {/* Phone */}
          <div className="flex gap-2">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CE9C81]"
            >
              <option value="+91">+91 India</option>
              <option value="+1">+1 USA</option>
              <option value="+44">+44 UK</option>
              <option value="+971">+971 UAE</option>
              <option value="+61">+61 Australia</option>
              <option value="+81">+81 Japan</option>
              <option value="+49">+49 Germany</option>
              <option value="+33">+33 France</option>
              <option value="+86">+86 China</option>
              <option value="+55">+55 Brazil</option>
              <option value="+7">+7 Russia</option>
              <option value="+27">+27 South Africa</option>
              <option value="+39">+39 Italy</option>
              <option value="+34">+34 Spain</option>
              <option value="+65">+65 Singapore</option>
              <option value="+64">+64 New Zealand</option>
              <option value="+82">+82 South Korea</option>
              <option value="+46">+46 Sweden</option>
              <option value="+47">+47 Norway</option>
            </select>

            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handlePhoneChange}
              maxLength={10}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CE9C81] flex-1"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address (optional)"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CE9C81]"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          {/* Requirements */}
          <select
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            className="border border-gray-300 bg-[var(--white)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CE9C81]"
          >
            <option value="">Select Property Type*</option>
            <option value="Apartment">Apartment</option>
            <option value="Builder Floor">Builder Floor</option>
            <option value="Villa">Villa</option>
            <option value="Farmhouse">Farmhouse</option>
            <option value="Plot">Plot</option>
          </select>
          {errors.requirements && (
            <p className="text-red-500 text-sm">{errors.requirements}</p>
          )}

          {/* Budget */}
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="border border-gray-300 bg-[var(--white)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CE9C81]"
          >
            <option value="">Select Budget Range*</option>
            <option value="₹2Cr - ₹3Cr">₹2Cr - ₹3Cr</option>
            <option value="₹3Cr - ₹4Cr">₹3Cr - ₹4Cr</option>
            <option value="₹4Cr - ₹5Cr">₹4Cr - ₹5Cr</option>
            <option value="Above ₹5Cr">Above ₹5Cr</option>
          </select>
          {errors.budget && (
            <p className="text-red-500 text-sm">{errors.budget}</p>
          )}

          {/* Message */}
          <textarea
            name="message"
            rows={3}
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CE9C81]"
          ></textarea>

          <ButtonFill
            text={loading ? "Submitting..." : "Submit"}
            onClick={() => {}}
            className="w-full font-semibold py-2 mt-2"
          />
        </form>

        {success && (
          <p className="text-green-600 text-sm mt-3 font-medium">{success}</p>
        )}
      </div>
    </section>
  );
};

export default LeadForm;
