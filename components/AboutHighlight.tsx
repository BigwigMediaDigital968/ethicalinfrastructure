"use client";

import Image from "next/image";
import ButtonFill from "./Button";
import aboutImg from "../assets/dlf.jpg";
import LeadFormModal from "./LeadPopup";
import { useState } from "react";

export default function AboutHighlight() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="w-full py-16 bg-[var(--background)]">
      <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-widest text-[var(--primary-color)]">
            About Us
          </p>

          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-[var(--title)]">
            Trusted Real Estate Experts in Delhi NCR
          </h2>

          <p className="text-[var(--text)] leading-relaxed text-lg">
            <span className="font-bold">Ethical Infrastructures Pvt. Ltd.</span>{" "}
            is a trusted real estate consultancy offering transparent solutions
            to buy, sell, and lease premium properties across Delhi NCR.
            Recognized as the{" "}
            <span className="font-bold"> best property dealer in Gurgaon </span>
            , we help clients discover perfect homes, builder floors, villas,
            and commercial spaces with ethical guidance and professional
            support.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <ButtonFill
              text="Get Free Consultation"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-[260px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={aboutImg}
            alt="Ethical Infrastructures Real Estate"
            fill
            className="object-cover hover:scale-105 transition duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
      {/* Popup Modal */}
      <LeadFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
