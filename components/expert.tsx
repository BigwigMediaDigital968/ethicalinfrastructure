import React, { useState } from "react";
import {
  FaBuilding,
  FaGlobe,
  FaUsers,
  FaHandshake,
  FaChartLine,
  FaHome,
} from "react-icons/fa";
import image1 from "../assets/9-768x532.webp";
import Image from "next/image";
import ButtonFill from "./Button";
import LeadFormModal from "./LeadPopup";
import Link from "next/link";

const RealEstateExperts: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="bg-[var(--white)] py-12 text-[var(--black)] transition-colors ">
      <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center py-12">
        {/* Image section */}
        <div className="relative w-full h-[400px] flex justify-center">
          <Image
            src={image1}
            alt="Real Estate Experts"
            className="w-full"
            draggable="false"
          />
        </div>

        {/* Text and stats */}
        <div className="mt-8 md:mt-0">
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 tracking-widest text-[var(--title)]">
            Luxury Living Starts with{" "}
            <span className="text-[var(--primary-color)]">
              ETHICAL INFRASTRUCTURES
            </span>{" "}
          </h2>

          <p className="text-[var(--text)] mb-6 text-justify">
            Searching for your ideal home or a profitable real estate investment
            in Delhi NCR? At ETHICAL INFRASTRUCTURES PRIVATE LIMITED, we go
            beyond property transactions — we build long-term relationships
            rooted in trust, transparency, and professionalism. Our expert
            consultants assist clients across Gurugram, Delhi, and surrounding
            regions with buying, selling, and investing in premium{" "}
            <span className="uppercase text-[var(--primary-color)]">
              {" "}
              <Link href="/buy?type=builder-floor">builder floors</Link>,{" "}
              <Link href="/buy?type=villa">villas</Link>,{" "}
              <Link href="/buy?type=farmhouse">farmhouses</Link> ,{" "}
              <Link href="/buy?type=apartment"> apartments</Link>, and
              commercial properties{" "}
            </span>
            that match their goals and lifestyle aspirations. With a
            client-first approach and an in-depth understanding of the market,
            we provide comprehensive support from site visits and market
            research to legal guidance and portfolio management. Whether you’re
            seeking a luxury residence or a high-return commercial space,
            Ethical Infrastructures ensures you make confident decisions every
            step of the way
          </p>

          <ButtonFill onClick={() => setShowModal(true)} text="Get In Touch" />
        </div>
      </div>
      <LeadFormModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default RealEstateExperts;
