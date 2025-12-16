"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Who is the best property dealer in Gurgaon? ",
    a: "Ethical Infrastructures Pvt. Ltd. is recognized as one of the best property dealers in Gurgaon, offering transparent and professional guidance for buying, selling, and leasing residential and commercial properties.",
  },
  {
    q: "What services does Ethical Infrastructures Pvt. Ltd. provide?",
    a: "We offer complete real estate solutions, including property buying, selling, leasing, market evaluation, verified listings, documentation assistance, and expert negotiation support across Gurgaon and Delhi NCR.",
  },
  {
    q: "Do you provide verified property listings?",
    a: "Yes, all our residential and commercial listings are verified for authenticity, location details, and ownership status to ensure clients experience secure and transparent transactions.",
  },
  {
    q: "Can you help me find a property in Gurgaon?",
    a: "Absolutely. Our team of experienced property dealer agents in Gurgaon helps you find builder floors, villas, apartments, commercial spaces, and investment-ready properties that match your budget and requirements.",
  },
  {
    q: "How do you assist in selling a property?",
    a: "We offer accurate market evaluations, professional marketing, buyer screening, and complete documentation support to help you sell your property quickly and at the best possible value.",
  },
  {
    q: "Do you offer leasing services for both landlords and tenants? ",
    a: "Yes, we manage leasing for residential and commercial spaces. Our leasing experts provide verified listings, tenant screening, rental agreement preparation, and smooth onboarding for both parties.",
  },
  {
    q: "What areas do you serve besides Gurgaon?",
    a: "We serve the entire Delhi NCR region, including Delhi, Noida, Faridabad, Dwarka, and prime locations across South Delhi. However, our strongest expertise lies in Gurgaon’s premium sectors.",
  },
  {
    q: "Why should I choose Ethical Infrastructures for real estate services? ",
    a: "We prioritize ethical practices, transparent communication, verified listings, and complete end-to-end assistance. With deep market knowledge, we are a trusted property dealer and broker in Gurgaon for all real estate needs.",
  },
  {
    q: "Do you help with property documentation and legal processes?",
    a: "Yes, we assist with all documentation, including sale agreements, lease agreements, property verification, and legal formalities to ensure a smooth and stress-free experience.",
  },
  {
    q: "How can I contact your team for a property consultation? ",
    a: "You can reach us through our website, call directly, WhatsApp, or schedule a visit to our office. Our team is always available to guide you through buying, selling, or leasing properties in Gurgaon.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <section className="w-full py-16 font-raleway bg-[var(--background)]">
      <div className="w-11/12 md:w-5/6 mx-auto">
        {/* Heading */}
        <div className="mb-12">
          <p className="text-sm uppercase tracking-widest text-[var(--primary-color)]">
            FAQs
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-[var(--title)] mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--primary-color)] opacity-20 hidden md:block" />

          <div className="space-y-6">
            {visibleFaqs.map((item, index) => {
              const isOpen = active === index;

              return (
                <div key={index} className="relative pl-0 md:pl-12">
                  <div className="hidden md:flex absolute -left-1 top-4 w-8 h-8 rounded-full bg-[var(--primary-color)] text-white text-sm font-bold items-center justify-center">
                    {index + 1}
                  </div>

                  <div className="bg-[var(--featured)] border border-neutral-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition">
                    <button
                      className="w-full flex justify-between items-center text-left gap-4 cursor-pointer"
                      onClick={() => setActive(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <h3 className="text-lg font-semibold text-[var(--title)]">
                        {item.q}
                      </h3>

                      <ChevronDown
                        className={`w-5 h-5 text-[var(--primary-color)] transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 text-[var(--text)] leading-relaxed">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show More / Less Button */}
          {faqs.length > 5 && (
            <div className="mt-10 text-center">
              <button
                onClick={() => {
                  setShowAll(!showAll);
                  setActive(null);
                }}
                className="px-6 py-3 rounded-full border border-[var(--primary-color)] text-[var(--primary-color)] font-semibold tracking-widest hover:bg-[var(--primary-color)] hover:text-white transition"
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
