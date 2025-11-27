"use client";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";

import WeHelp from "../../components/WeHelp";
import Testimonials from "../../components/Testimonial";
import PropertyGrid from "../../components/Properties";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import ContactSidebar from "../../components/ContactSidebar";

import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import BuyLeaseSection from "../../components/BuyLease";
import ScrollingIcons from "../../components/ScrollingIcons";
import OurSegments from "../../components/OurSegments";
import LeadFormWithoutImage from "../../components/LeadPopupwithoutImage";

import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSidebarButton, setShowSidebarButton] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });

  // ⭐ Calculate the REAL button position for zoom animation
  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPos({
        x: rect.left - window.innerWidth / 2 + rect.width / 2,
        y: rect.top - window.innerHeight / 2 + rect.height / 2,
      });
    }
  }, [showSidebarButton]);

  // ⭐ Show popup automatically after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // ⭐ Close popup on scroll
  // ⭐ Close popup if user scrolls more than 100px
  useEffect(() => {
    const lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY);

      if (isModalOpen && scrollDiff > 200) {
        // close only if scrolled more than 100px
        handleClosePopup();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isModalOpen]);

  // ⭐ Close popup and show button
  const handleClosePopup = () => {
    setIsModalOpen(false);

    setTimeout(() => {
      setShowSidebarButton(true);
    }, 400); // matches exit animation
  };

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <>
      <link rel="canonical" href="https://www.ethicalinfrastructures.com/" />
      <title>
        Ethical Infrastructures – Best Real Estate Company in Gurgaon
      </title>
      <meta
        name="description"
        content="Buy, sell, or lease premium properties in Gurgaon with Ethical Infrastructures – trusted, transparent, and expert real estate services."
      />
      <Navbar />
      <Hero />
      <OurSegments />
      <PropertyGrid />
      <BuyLeaseSection />
      <WeHelp />
      <Testimonials />
      <ScrollingIcons />
      <Footer />
      <ScrollToTopButton />
      {/* --------------------- MOBILE CALL/WHATSAPP BAR --------------------- */}
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
        <div className="w-1/2 bg-white text-green-500 text-center py-3">
          <a
            href="https://wa.me/+919999000172"
            target="_blank"
            className="w-full flex items-center justify-center gap-2"
          >
            <FaWhatsapp size={18} />
            WhatsApp
          </a>
        </div>
      </div>
      {/* --------------------- POPUP MODAL --------------------- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0  z-[9998] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.2, x: buttonPos.x, y: buttonPos.y }}
              animate={{ scale: 1, x: 0, y: 0 }}
              exit={{ scale: 0.2, x: buttonPos.x, y: buttonPos.y }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pointer-events-auto"
            >
              <LeadFormWithoutImage
                isOpen={isModalOpen}
                onClose={handleClosePopup}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* --------------------- GET IN TOUCH BUTTON --------------------- */}
      <AnimatePresence>
        {showSidebarButton && (
          <motion.button
            ref={buttonRef}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setIsModalOpen(true);
              setShowSidebarButton(false);
            }}
            className="hidden md:block fixed right-10 top-1/2 -translate-y-1/2 bg-[var(--primary-color)]
            text-white py-3 px-3 rounded-xl shadow-xl z-[9999] rotate-90 origin-bottom-right"
          >
            Get In Touch
          </motion.button>
        )}
      </AnimatePresence>
      {/* --------------------- Sidebar --------------------- */}
      <div className="hidden md:block">
        <ContactSidebar />
      </div>
    </>
  );
}
