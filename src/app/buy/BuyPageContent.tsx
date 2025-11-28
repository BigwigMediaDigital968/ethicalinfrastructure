"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Home } from "lucide-react";
import banner from "../../../assets/property (1).jpg";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { motion } from "framer-motion";
import ContactInfo from "../../../components/ContactInfo";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import ContactSidebar from "../../../components/ContactSidebar";
import ButtonFill from "../../../components/Button";
import LeadForm from "../../../components/LeadForm"; // ✅ your existing form
import LeadFormModal from "../../../components/LeadPopup";
import { useProperty } from "@/context/PropertyContext";
import Select from "react-select";
import Link from "next/link";

interface Property {
  _id: string;
  title: string;
  slug: string;
  type?: string;
  location?: string;
  price?: number | null;
  images: string[];
  purpose?: string;
  instagramLink?: string;
}

export default function BuyPageContent() {
  const buyRef = useRef<HTMLDivElement | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);

  // Static filters
  const propertyTypes = [
    { name: "All", value: "all" },
    { name: "Builder Floors", value: "builder-floor" },
    { name: "Apartments", value: "apartment" },
    { name: "Villas", value: "villa" },
    { name: "Farmhouses", value: "farmhouse" },
    { name: "Plots", value: "plot" },
  ];

  const staticLocations = [
    "All",
    "DLF Phase 1",
    "DLF Phase 2",
    "DLF Phase 3",
    "DLF Phase 4",
    "DLF Phase 5",
    "Sushant Lok 1",
    "Sushant Lok 2",
    "Sushant Lok 3",
    "Sushant Lok 4",
    "Sushant Lok 5",
    "MG Road",
    "Golf Course Road",
    "Golf Course Ext. Road",
    "Sector 77 Gurugram Haryana",
    "Sector 76 Gurugram Haryana",
    "Sector 102 Gurugram Haryana",
    "Sector 59 Gurugram Haryana",
  ];

  const locationOptions = staticLocations
    .filter((l) => l !== "All")
    .map((loc) => ({ label: loc, value: loc }));

  const { selectedType, setSelectedType } = useProperty();

  // const [selectedLocation, setSelectedLocation] = useState("All");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const propertiesPerPage = 9;

  // Fetch data from backend (with filters + pagination)
  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams({
      purpose: "buy",
      type: selectedType || "all", // fallback to 'all' if null
      location:
        selectedLocation.length === 0 ? "all" : selectedLocation.join(","),
      page: currentPage.toString(),
      limit: propertiesPerPage.toString(),
    });

    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/property?${params}`)
      .then((res) => res.json())
      .then(
        (data: {
          success: boolean;
          properties: Property[];
          total?: number;
          totalPages?: number;
          currentPage?: number;
        }) => {
          if (data?.success) {
            setProperties(data.properties);
            setTotalPages(data.totalPages ?? 1);
          }
          setLoading(false);
        }
      )
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [selectedType, selectedLocation, currentPage]);

  // Scroll to property section
  const scrollToNext = () => {
    if (buyRef.current) {
      const yOffset = -50;
      const y =
        buyRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* <!-- Open Graph Meta Tags --> */}
      <meta
        property="og:title"
        content="Buy Property in Gurgaon – Luxury Homes & Builder Floors"
      />
      <meta property="og:site_name" content="Ethical Infrastructures Pvt Ltd" />
      <meta
        property="og:url"
        content="https://www.ethicalinfrastructures.com/buy"
      />
      <meta
        property="og:description"
        content="Explore luxury builder floors, villas, and apartments for sale in Gurgaon’s prime locations with Ethical Infrastructures."
      />
      <meta
        property="og:image"
        content="https://www.eipl.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.634a2fe3.png&w=256&q=75"
      />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_IN" />
      <link rel="canonical" href="https://www.ethicalinfrastructures.com/buy" />
      <title>Buy Property in Gurgaon – Luxury Homes & Builder Floors</title>
      <meta
        name="description"
        content="Explore luxury builder floors, villas, and apartments for sale in Gurgaon’s prime locations with Ethical Infrastructures."
      />
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[70vh] bg-black text-white flex items-center justify-center">
        <Image
          src={banner}
          alt="Buy Properties"
          fill
          className="object-cover opacity-70"
        />
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest">
            Find Your Dream Home
          </h1>
          <p className="mt-4 text-lg tracking-widest">
            Builder Floors • Apartments • Villas • Farmhouses • Plots
          </p>
          <button
            onClick={scrollToNext}
            className="mt-10 animate-bounce border rounded-full w-fit px-1 py-2 mx-auto cursor-pointer"
          >
            <span className="text-3xl">↓</span>
          </button>
        </motion.div>
      </div>

      {/* Filter Section */}
      <motion.div
        className=" bg-[var(--desktop-sidebar)] shadow-md z-20 flex flex-col md:flex-row md:justify-between items-center gap-4 px-4 py-4 tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div></div>
        {/* Property Type Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {propertyTypes.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                if (opt.value === "plot") {
                  window.location.href = "/plots"; // redirect only plots
                  return;
                }

                setSelectedType(opt.value); // normal filter for all others
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition cursor-pointer ${
                selectedType === opt.value
                  ? "bg-[var(--primary-color)] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {opt.name}
            </button>
          ))}
        </div>

        {/* Static Location Dropdown */}
        <div className="w-72">
          <Select
            isMulti
            options={locationOptions}
            value={locationOptions.filter((opt) =>
              selectedLocation.includes(opt.value)
            )}
            onChange={(selected) => {
              setSelectedLocation(selected.map((s) => s.value));
              setCurrentPage(1);
            }}
            placeholder="Select Locations..."
            className="text-sm font-semibold"
          />
        </div>
      </motion.div>

      {/* Property List */}
      <div ref={buyRef} className="py-12">
        {loading ? (
          <p className="text-center py-20 text-gray-500">
            Loading properties...
          </p>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 text-gray-600 tracking-widest flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-3">
              Can’t find what you’re looking for?
            </h2>
            <p className="mb-6">
              Fill the form, and our team will contact with relevant options.
            </p>
            <ButtonFill
              text="Get in Touch"
              onClick={() => setShowLeadForm(true)}
              className="font-semibold"
            />
            <LeadFormModal
              isOpen={showLeadForm}
              onClose={() => setShowLeadForm(false)}
            />
          </div>
        ) : (
          <>
            <motion.div
              className="w-11/12 md:w-5/6 mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 tracking-widest"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.2 } },
              }}
            >
              {properties.map((p) => (
                <motion.div
                  key={p._id}
                  className="overflow-hidden shadow-md hover:shadow-xl transition bg-[var(--desktop-sidebar)] rounded"
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, y: 30 },
                    visible: { opacity: 1, scale: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative h-64 w-full">
                    {p.images?.[0] ? (
                      <Image
                        src={p.images[0]}
                        alt={p.title}
                        fill
                        className="object-cover rounded"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL="/blur-placeholder.jpg" // a tiny base64 or small image
                      />
                    ) : (
                      <div className="h-64 flex items-center justify-center bg-gray-100 text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-[var(--primary-color)] text-lg line-clamp-1 uppercase">
                        {p.title}
                      </h3>

                      {/* ⭐ Instagram Icon */}
                      {p.instagramLink && (
                        <a
                          href={p.instagramLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-pink-600 hover:text-pink-700"
                          title="View Instagram Post"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
                          </svg>
                        </a>
                      )}
                    </div>

                    {p.location && (
                      <p className="flex items-center text-sm mt-1">
                        <MapPin size={16} className="mr-1" /> {p.location}
                      </p>
                    )}
                    {p.price !== null && (
                      <p className="mt-1 font-semibold text-[var(--text)]">
                        ₹ {p.price?.toLocaleString()}
                      </p>
                    )}
                    {p.type && (
                      <p className="mt-1 text-sm text-gray-600 flex items-center">
                        <Home size={16} className="mr-1" /> {p.type}
                      </p>
                    )}
                    <Link href={`/buy/${p.slug}`}>
                      <ButtonFill text="View Details" className="w-full mt-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-3 py-2 rounded border bg-[var(--white)] hover:bg-[var(--pagination-button)]"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (num) => (
                    <button
                      key={num}
                      onClick={() => setCurrentPage(num)}
                      className={`px-3 py-2 rounded border ${
                        currentPage === num
                          ? "bg-[var(--primary-color)] text-white"
                          : "bg-[var(--white)] hover:bg-[var(--pagination-button)]"
                      }`}
                    >
                      {num}
                    </button>
                  )
                )}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-3 py-2 rounded border bg-[var(--white)] hover:bg-[var(--pagination-button)]"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <ContactInfo />

      {/* Mobile Floating Buttons */}
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
