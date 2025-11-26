"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import bgImage from "../../../assets/about.jpg";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Building2, Armchair, Ruler } from "lucide-react";
import image from "../../../assets/property/property1.jpg";
import image2 from "../../../assets/property/property2.jpg";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import ContactSidebar from "../../../components/ContactSidebar";
import founder from "../../../assets/founder.png";

const AboutHero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  return (
    <>
      {/* <!-- Open Graph Meta Tags --> */}
      <meta
        property="og:title"
        content="About Ethical Infrastructures – Trusted Realtors in Gurgaon"
      />
      <meta property="og:site_name" content="Ethical Infrastructures Pvt Ltd" />
      <meta property="og:url" content="https://www.eipl.co/about" />
      <meta
        property="og:description"
        content="Ethical Infrastructures delivers transparent, ethical, and premium property solutions across Gurgaon’s luxury real estate market."
      />
      <meta
        property="og:image"
        content="https://www.eipl.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.634a2fe3.png&w=256&q=75"
      />
      <meta property="og:type" content="profile" />
      <meta property="og:locale" content="en_IN" />
      <link
        rel="canonical"
        href="https://www.ethicalinfrastructures.com/about"
      />
      <title>About Ethical Infrastructures – Trusted Realtors in Gurgaon</title>
      <meta
        name="description"
        content="Ethical Infrastructures delivers transparent, ethical, and premium property solutions across Gurgaon’s luxury real estate market."
      />
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full h-[50vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src={bgImage}
          alt="About Us Background"
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="relative text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl mt-20 font-bold mb-4 tracking-widest">
            About <span className="text-[var(--primary-color)]">Us</span>
          </h1>
          {/* <p className="max-w-2xl mx-auto text-lg md:text-xl">
            We are dedicated to delivering excellence and innovation in
            everything we do, empowering clients to achieve their goals with
            confidence.
          </p> */}
        </div>
      </section>

      {/* ===== ABOUT COMPANY SECTION ===== */}
      <section className="py-12 bg-[var(--white)] ">
        <div className="w-11/12 md:w-5/6 mx-auto flex flex-col md:flex-row items-center gap-12 ">
          {/* Text Content */}
          <div className="md:w-2/3">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4 tracking-widest text-[var(--title)]"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              About{" "}
              <span className="text-[var(--primary-color)] ">
                Ethical Infrastructures
              </span>
            </h2>
            <p
              className="text-[var(--text)] mb-4 text-justify"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              At ETHICAL INFRASTRUCTURES PRIVATE LIMITED we function to deliver
              complete customer satisfaction and craft the best deals so as to
              stand out from the plethora of real estate agents that have
              sprouted to bank in on this boom in the real estate field but fail
              to provide exhaustive guidance and long term vision.
            </p>
            <p
              className="text-[var(--text)] mb-4 text-justify"
              data-aos="fade-right"
              data-aos-delay="600"
            >
              We provide complete need based and cost effective solutions to our
              clients and our unique selling point is the gamut of personalised
              services provided by our dedicated team to meet the client
              specific and task specific needs of our clients. Every prospective
              client is taken for site visits, market surveys and given updated
              information about the status of their property and market
              condition.
            </p>
          </div>

          {/* Image */}
          <div className="md:w-1/2" data-aos="zoom-in" data-aos-delay="800">
            <Image
              src={image2}
              alt="About Company"
              className="rounded-xl object-cover w-full h-80"
            />
          </div>
        </div>
      </section>
      <section className="py-12 w-11/12 md:w-5/6 mx-auto">
        <h3
          className=" text-2xl md:text-3xl font-semibold text-[var(--primary-color)] mb-6 font-amatic border-l-4 border-[var(--primary-color)] pl-3"
          data-aos="fade-right"
          data-aos-delay="400"
        >
          Our Founder
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Founder Card */}
          <div className="rounded-xl col-span-1 overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-white">
            <Image
              src={founder}
              alt="Founder"
              className="w-full h-[70vh] object-cover"
              data-aos="zoom-in"
              data-aos-delay="800"
            />
          </div>

          {/* Founder Statement */}
          <div className="flex flex-col col-span-2 justify-center text-[var(--text)]">
            <p
              className="text-xl  leading-relaxed italic font-light text-[var(--text)]"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              “With over a decade of hands-on experience in the real estate
              industry, I began my journey in 1992 with a clear vision - to make
              home buying transparent, trustworthy, and fulfilling for every
              individual. After years of learning, understanding client needs,
              and witnessing the evolving landscape of real estate, I founded
              <strong> Ethical Infrastructures Pvt. Ltd.</strong> in 2007. The
              company was built on the strong foundation of integrity, quality,
              and customer satisfaction - values that continue to guide us in
              delivering homes that bring happiness, comfort, and trust
              to every family.”
            </p>
            <span className="mt-6 block font-semibold text-[var(--primary-color)] text-lg md:text-xl">
              — Mr. Sorabh Chopra, Founder
            </span>
          </div>
        </div>
      </section>
      {/* WHY CHOOSE ENDORA SECTION */}
      <section className="py-16 bg-[var(--white)]">
        <div className="w-11/12 md:w-5/6 bg-[var(--featured)] p-6 md:p-10 rounded-xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-12 text-center lg:text-left">
          {/* LEFT TITLE BLOCK */}
          <div className="lg:w-1/3" data-aos="fade-right" data-aos-delay="200">
            <span className="text-[var(--primary-color)] text-sm uppercase tracking-widest">
              Bricks And Clicks
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 tracking-widest text-[var(--title)]">
              Why Choose <br /> Ethical Infrastructures?
            </h2>
          </div>

          {/* RIGHT FEATURE BOXES */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div
              className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="relative">
                <Building2
                  size={48}
                  className="relative text-[var(--primary-color)]"
                />
              </div>
              <h3 className="text-xl font-semibold text-[var(--black)]">
                Residential & Commercial Expertise
              </h3>
              <p className="text-[var(--text)]">
                Professional guidance for buying, selling, or leasing
                Residential and Commercial properties.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="relative">
                <Armchair
                  size={48}
                  className="relative text-[var(--primary-color)]"
                />
              </div>
              <h3 className="text-xl font-semibold text-[var(--black)]">
                Industrial & Leasing Services
              </h3>
              <p className="text-[var(--text)]">
                Specialized support for Industrial spaces, Pre-Leased
                properties, and FarmHouses to maximize.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="relative">
                <Ruler
                  size={48}
                  className="relative text-[var(--primary-color)]"
                />
              </div>
              <h3 className="text-xl font-semibold text-[var(--black)]">
                Trusted & Transparent Process
              </h3>
              <p className="text-[var(--text)]">
                Honest advice, personalized services, and complete support
                throughout the buying.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[var(--white)] ">
        <div className="w-11/12 md:w-5/6 mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <Image
              src={image}
              alt="Our Story"
              className="rounded-xl object-cover w-full h-80"
              data-aos="zoom-in"
            />
          </div>
          <div className="md:w-1/2">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4 tracking-widest text-[var(--primary-color)] border-l-4 border-[var(--primary-color)] pl-3"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Our Journey
            </h2>

            <p
              className="text-[var(--text)] mb-4 text-justify"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Founded with a clear vision to redefine the standards of real
              estate consultancy,{" "}
              <strong>Ethical Infrastructures Private Limited</strong> began its
              journey with a mission to bring integrity, transparency, and
              personalized service to every client interaction. In a market
              often crowded with short-term opportunists, we focused on building
              long-term trust and delivering complete satisfaction.
            </p>

            <p
              className="text-[var(--text)] text-justify"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              Over the years, we have grown into a trusted name in real estate
              by offering need-based, cost-effective, and client-centric
              solutions. Our dedicated team goes beyond conventional brokerage,
              conducting detailed site visits, market surveys, and providing
              up-to-date insights on property trends. This commitment to
              personalized guidance and long-term value has shaped our journey
              and continues to drive our success.
            </p>
          </div>
        </div>
      </section>

      {/* <section className="py-16">
        <div className="w-11/12 md:w-5/6 mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Integrity", "Excellence", "Innovation"].map((value) => (
              <div
                key={value}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="text-blue-600 mb-4">
                  <Building2 size={48} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value}</h3>
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

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
    </>
  );
};

export default AboutHero;
