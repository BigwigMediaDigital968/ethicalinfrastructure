// import PhoneInput, { Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Mail, Phone } from "lucide-react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import banner from "../../../assets/contact.jpg";
import Image from "next/image";
import ContactSidebar from "../../../components/ContactSidebar";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="  min-h-screen ">
      {/* <!-- Open Graph Meta Tags --> */}
      <meta
        property="og:title"
        content="Contact Ethical Infrastructures – Gurgaon Real Estate Experts"
      />
      <meta property="og:site_name" content="Ethical Infrastructures Pvt Ltd" />
      <meta
        property="og:url"
        content="https://www.ethicalinfrastructures.com/contact-us"
      />
      <meta
        property="og:description"
        content="Get in touch with Ethical Infrastructures for buying, selling, or leasing premium properties in Gurgaon."
      />
      <meta
        property="og:image"
        content="https://www.eipl.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.634a2fe3.png&w=256&q=75"
      />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_IN" />
      <link
        rel="canonical"
        href="https://www.ethicalinfrastructures.com/contact-us"
      />
      <title>
        Contact Ethical Infrastructures – Gurgaon Real Estate Experts
      </title>
      <meta
        name="description"
        content="Get in touch with Ethical Infrastructures for buying, selling, or leasing premium properties in Gurgaon."
      />
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[70vh] bg-black flex flex-col justify-center items-center text-center px-6 tracking-widest">
        {/* Background Image */}
        <Image
          src={banner}
          alt="Contact Banner"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Content */}
        <div className="relative text-white z-20">
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest">
            Get in Touch With Us
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Have questions or need assistance? Our team is here to help you with
            all your property needs. Let’s connect and turn your real estate
            goals into reality.
          </p>
        </div>
      </div>

      <section className="w-11/12 md:w-5/6 mx-auto flex flex-col items-center text-center py-14">
        {/* Office Info */}
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl mb-3 font-bold text-[var(--primary-color)] font-amatic 3 text-centre uppercase">
            Head Office
          </h2>
          <hr className="mb-6" />
          <p className="text-2xl md:text-3xl font-semibold text-[var(--primary-color)]">
            Gurugram, India
          </p>
          <p className="text-lg md:text-xl  mb-6 leading-relaxed">
            A-26/12B, FF1 DLF City, Phase-1 Gurugram, Haryana - 122011
          </p>
          <p className="text-[var(--primary-color)] mt-4 text-base md:text-lg">
            Our business operating hours are as follows:
          </p>
          <p className=" text-lg md:text-xl mt-1">
            We’re here for you from 10 AM to 7 PM daily
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full md:w-3/4">
          {/* Phone */}
          <Link
            href="tel:+919999000183"
            className="bg-[var(--featured)] text-[var(--text)] rounded-md p-6 flex flex-col items-center justify-center gap-4 shadow-md transition hover:scale-105"
          >
            <FaPhoneAlt className="w-8 h-8" />
            <span className="text-base md:text-lg font-semibold">
              +91 9999000183
            </span>
          </Link>

          {/* WhatsApp */}
          <Link
            href="https://wa.me/+919999000172"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--featured)] text-[var(--text)] rounded-md p-6 flex flex-col items-center justify-center gap-4 shadow-md transition hover:scale-105"
          >
            <FaWhatsapp className="w-8 h-8 text-green-600" />
            <span className="text-base md:text-lg font-semibold">
              +91 9999000172
            </span>
          </Link>

          {/* Email */}
          <Link
            href="mailto:info@eipl.co"
            className="bg-[var(--featured)] text-[var(--text)] rounded-md p-6 flex flex-col items-center justify-center gap-4 shadow-md transition hover:scale-105"
          >
            <Mail className="w-8 h-8" />
            <span className="text-base md:text-lg font-semibold">
              info@eipl.co
            </span>
          </Link>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 w-full flex md:hidden z-[9999]">
        <div className="w-1/2 bg-[var(--primary-color)] text-white text-center py-3">
          <a
            href="tel:+919999000183"
            className="w-full flex items-center justify-center gap-2"
          >
            <FaPhoneAlt size={18} />
            Call Us
          </a>
        </div>
        <div className="w-1/2 bg-white text-green-500 text-center py-3 border-l border-white">
          <a
            href="https://wa.me/+919999000172"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2"
          >
            <FaWhatsapp size={18} />
            WhatsApp
          </a>
        </div>
      </div>

      <div className="hidden md:block">
        <ContactSidebar />
      </div>
      <Footer />
    </div>
  );
}
