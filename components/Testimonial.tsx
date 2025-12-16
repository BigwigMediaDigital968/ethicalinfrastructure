"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaQuoteLeft } from "react-icons/fa";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ButtonFill from "./Button";
import LeadFormModal from "./LeadPopup";
import { useState } from "react";

const testimonials = [
  {
    name: "Pulkit Sharma",
    message:
      "Ethical Infrastructures truly lives up to its name. Their team guided me through the entire buying process with honesty and professionalism. If anyone is searching for the best property dealer in Gurgaon, I highly recommend their services.",
  },
  {
    name: "Kirti Bedi",
    message:
      "As a first-time homebuyer, I was nervous, but their consultants made everything smooth and transparent. Their expertise clearly shows why they are among the top property dealer agents in Gurgaon",
  },
  {
    name: "Saurav Sharma",
    message:
      "I sold my builder floor through Ethical Infrastructures and received more than my expected price. A reliable and result-driven property dealer broker in Gurgaon who understands the market extremely well.",
  },
  {
    name: "Anita Desai",
    message:
      "What stood out was their ethical approach and clear communication. They helped me lease my property quickly. Definitely the best property dealer in Gurgaon for anyone looking for trustworthy real estate support.",
  },
  {
    name: "Rahul Verma",
    message:
      "The team understood exactly what I was looking for and shortlisted the perfect properties within my budget. They are truly excellent property dealer agents in Gurgaon for premium residential options.",
  },
  {
    name: "Priya Kapoor",
    message:
      "Professional, responsive, and knowledgeable. Ethical Infrastructures made my commercial property investment completely hassle-free. Easily the most dependable property dealer broker in Gurgaon.",
  },
  {
    name: "Raj Singh",
    message:
      "They provided genuine listings, handled documentation smoothly, and guided the entire process with complete transparency. Truly the best property dealer in Gurgaon if you want ethical and seamless transactions.",
  },
  {
    name: "Neha Gupta",
    message:
      "I contacted several agents before, but none matched the professionalism of Ethical Infrastructures. They are highly experienced property dealer agents in Gurgaon who always prioritize their clients.",
  },
  {
    name: "Arjun Dixit",
    message:
      "From market evaluation to final closing, they managed the entire selling process flawlessly. If you need a trustworthy property dealer broker in Gurgaon, this company is the right choice.",
  },
];

export default function Testimonials() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="w-full py-12 font-raleway relative">
      <div className="w-11/12 md:w-5/6 mx-auto">
        {/* Section Label */}
        <p className="text-[var(--primary-color)] text-sm uppercase tracking-widest">
          Testimonials
        </p>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 tracking-widest text-[var(--title)]">
          What People Say
        </h2>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={3}
          loop
          centeredSlides
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-[var(--featured)] rounded-2xl border border-neutral-200 p-6 shadow-md h-72 flex flex-col justify-between hover:shadow-lg transition duration-300 relative">
                <FaQuoteLeft className="text-[var(--primary-color)] text-3xl opacity-30 mb-3" />

                <p className="text-base leading-relaxed text-[var(--text)] font-annie line-clamp-5">
                  {testimonial.message}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--primary-color)]">
                    — {testimonial.name}
                  </h3>

                  <div className="w-10 h-10 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center text-sm font-bold uppercase">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ✅ CTA Section */}
        <div
          className="mt-12 text-center bg-[var(--desktop-sidebar)] rounded-2xl p-10 shadow-md"
          data-aos="fade-up"
        >
          <h3 className="text-2xl md:text-3xl font-bold tracking-widest text-[var(--title)]">
            Get a Free Consultation Today
          </h3>

          <p className="mt-4 text-[var(--text)] max-w-2xl mx-auto">
            Speak with our experienced property consultants and get personalized
            guidance for buying, selling, or investing in Gurgaon’s prime real
            estate locations.
          </p>

          <div className="mt-6 flex justify-center">
            <ButtonFill
              text="Book Free Consultation"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </div>
      <LeadFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
