"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Select from "react-select";
import Link from "next/link";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ContactSidebar from "../../../components/ContactSidebar";
import Plotform from "../../../components/Plotform";
import ButtonFill from "../../../components/Button";

import banner from "../../../assets/plot.webp";

interface Property {
  _id: string;
  title: string;
  slug: string;
  location?: string;
  price?: number | null;
  images: string[];
  instagramLink?: string;
}

export default function PlotPage() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [plots, setPlots] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const plotsPerPage = 9;

  const staticLocations = [
    "DLF Phase 1",
    "DLF Phase 2",
    "DLF Phase 3",
    "DLF Phase 4",
    "DLF Phase 5",
    "Sushant Lok 1",
    "Golf Course Road",
    "Golf Course Ext. Road",
    "MG Road",
  ];

  const locationOptions = staticLocations.map((loc) => ({
    label: loc,
    value: loc,
  }));

  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams({
      purpose: "buy",
      type: "plot", // 🔒 ONLY plots
      location:
        selectedLocation.length === 0 ? "all" : selectedLocation.join(","),
      page: currentPage.toString(),
      limit: plotsPerPage.toString(),
    });

    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/property?${params}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          setPlots(data.properties);
          setTotalPages(data.totalPages || 1);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedLocation, currentPage]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[70vh] flex items-center justify-center text-white">
        <Image
          src={banner}
          alt="Plots in Gurgaon"
          fill
          className="object-cover opacity-70"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest">
            Premium Plots in Prime Locations
          </h1>
          <p className="mt-4 tracking-widest">
            Ideal for Luxury Homes & High ROI Investments
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[var(--desktop-sidebar)] shadow-md py-4">
        <div className="w-11/12 md:w-5/6 mx-auto flex flex-col md:flex-row gap-4 justify-end">
          <div className="w-72">
            <Select
              isMulti
              options={locationOptions}
              placeholder="Select Locations..."
              value={locationOptions.filter((opt) =>
                selectedLocation.includes(opt.value)
              )}
              onChange={(selected) => {
                setSelectedLocation(selected.map((s) => s.value));
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {/* Plot Listings */}
      <div ref={sectionRef} className="py-12">
        {loading ? (
          <p className="text-center py-20">Loading plots...</p>
        ) : plots.length === 0 ? (
          <p className="text-center py-20 text-gray-500">
            No plots found. Please fill the form below.
          </p>
        ) : (
          <>
            <motion.div
              className="w-11/12 md:w-5/6 mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 tracking-widest"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            >
              {plots.map((p) => (
                <motion.div
                  key={p._id}
                  className="bg-[var(--desktop-sidebar)] rounded shadow hover:shadow-xl transition"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <div className="relative h-60">
                    {p.images?.[0] && (
                      <Image
                        src={p.images[0]}
                        alt={p.title}
                        fill
                        className="object-cover rounded-t"
                      />
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-[var(--primary-color)] uppercase line-clamp-2">
                      {p.title}
                    </h3>

                    {p.location && (
                      <p className="flex items-center text-sm mt-1">
                        <MapPin size={16} className="mr-1" />
                        {p.location}
                      </p>
                    )}

                    {p.price && (
                      <p className="mt-2 font-semibold">
                        ₹ {p.price.toLocaleString()}
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
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (num) => (
                    <button
                      key={num}
                      onClick={() => setCurrentPage(num)}
                      className={`px-4 py-2 border rounded ${
                        currentPage === num
                          ? "bg-[var(--primary-color)] text-white"
                          : "bg-white"
                      }`}
                    >
                      {num}
                    </button>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Plot Inquiry Form (NOT REMOVED) */}
      <section className="w-full flex justify-center py-16 px-4">
        <div className="w-full max-w-2xl rounded-xl p-8 card-shadow bg-white">
          <h2 className="text-3xl font-bold text-center text-[var(--primary-color)] mb-6 tracking-widest">
            Plot Inquiry Form
          </h2>
          <Plotform />
        </div>
      </section>

      <div className="hidden md:block">
        <ContactSidebar />
      </div>

      <Footer />
    </div>
  );
}
