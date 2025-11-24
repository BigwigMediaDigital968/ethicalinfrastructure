"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import buyImage from "../assets/Bug Your Dream home.png";
import sellImage from "../assets/Sell Your House Easily.png";
import leaseImage from "../assets/Lease your Property.png";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function BuyLeaseSection() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell" | "lease">("buy");
  const router = useRouter();

  const images = {
    buy: buyImage,
    sell: sellImage,
    lease: leaseImage,
  };

  // 🔁 Auto-switch images on mobile view
  useEffect(() => {
    if (window.innerWidth >= 768) return; // only for mobile

    const tabs: ("buy" | "sell" | "lease")[] = ["buy", "sell", "lease"];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % tabs.length;
      setActiveTab(tabs[index]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <div className="bg-[var(--white)] text-[var(--black)] py-12 relative">
      <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-2 items-stretch">
        {/* LEFT SECTION */}
        <div className="border border-gray-700 h-auto md:h-[300px] my-auto p-6 md:p-12 flex flex-col justify-center">
          <div className="space-y-4 w-full">
            {/* ===== MOBILE VIEW (Vertical Buttons with Arrow) ===== */}
            <div className="flex md:hidden flex-col gap-4 mb-6">
              {[
                { label: "BUY", path: "/buy" },
                { label: "SELL", path: "/sell" },
                { label: "LEASE", path: "/lease" },
              ].map(({ label, path }) => (
                <button
                  key={label}
                  onClick={() => handleRedirect(path)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-md text-base font-semibold border transition-all duration-300 ${
                    activeTab === label.toLowerCase()
                      ? "bg-[var(--black)] text-[var(--white)] border-[var(--title)]"
                      : "bg-transparent border-gray-400 text-[var(--black)]"
                  }`}
                >
                  <span>{label}</span>
                  <span className="text-lg">
                    <FaArrowRight />
                  </span>
                </button>
              ))}
            </div>

            {/* ===== DESKTOP HOVER & CLICK ===== */}
            <div className="hidden md:block space-y-4">
              {/* BUY */}
              <Link href="/buy">
                <div
                  className="relative flex items-center cursor-pointer group"
                  onMouseEnter={() => setActiveTab("buy")}
                >
                  <h2
                    className={`text-5xl tracking-wider transition-colors duration-300 ${
                      activeTab === "buy" ? "text-[var(--title)] font-bold" : ""
                    }`}
                  >
                    BUY
                  </h2>
                  <div
                    className={`relative ml-6 h-[1px] bg-[var(--black)] transition-all duration-300 ${
                      activeTab === "buy" ? "w-32" : "w-6"
                    }`}
                  >
                    <span className="absolute -right-2 md:-top-3.5 text-[var(--black)] text-xl">
                      &gt;
                    </span>
                  </div>
                </div>
              </Link>

              {/* SELL */}
              <Link href="/sell">
                <div
                  className="relative flex items-center cursor-pointer group"
                  onMouseEnter={() => setActiveTab("sell")}
                >
                  <h2
                    className={`text-5xl tracking-wider transition-colors duration-300 ${
                      activeTab === "sell"
                        ? "text-[var(--title)] font-bold"
                        : ""
                    }`}
                  >
                    SELL
                  </h2>
                  <div
                    className={`relative ml-6 h-[1px] bg-[var(--black)] transition-all duration-300 ${
                      activeTab === "sell" ? "w-32" : "w-6"
                    }`}
                  >
                    <span className="absolute -right-2 md:-top-3.5 text-[var(--black)] text-xl">
                      &gt;
                    </span>
                  </div>
                </div>
              </Link>

              {/* LEASE */}
              <Link href="/lease">
                <div
                  className="relative flex items-center cursor-pointer group"
                  onMouseEnter={() => setActiveTab("lease")}
                >
                  <h2
                    className={`text-5xl tracking-wider transition-colors duration-300 ${
                      activeTab === "lease"
                        ? "text-[var(--title)] font-bold"
                        : ""
                    }`}
                  >
                    LEASE
                  </h2>
                  <div
                    className={`relative ml-6 h-[1px] bg-[var(--black)] transition-all duration-300 ${
                      activeTab === "lease" ? "w-32" : "w-6"
                    }`}
                  >
                    <span className="absolute -right-2 md:-top-3.5 text-[var(--black)] text-xl">
                      &gt;
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            <p className="text-[var(--text)] mt-6 text-sm md:text-base leading-relaxed max-w-md text-center md:text-left">
              Discover, sell, or lease premium properties in Gurugram — your
              trusted partner for every real estate move.
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="min-h-[300px] md:min-h-[450px] mt-8 md:mt-0">
          <Image
            src={images[activeTab]}
            alt={activeTab}
            className="w-full h-full object-cover transition-all duration-700 rounded-md"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}
