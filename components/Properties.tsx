"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import ButtonFill from "./Button";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

interface Property {
  _id: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: string;
  images: string[];
  slug: string;
}

export default function PropertyGrid() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
    const featuredSlugs = [
      "dlf-the-magnolias",
      "dlf-the-aralias",
      "dlf-the-camellias",
      "dlf-the-belaire",
    ];
    const slugQuery = featuredSlugs.join(",");

    const fetchProperties = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE}/property/featured?slugs=${slugQuery}`
        );
        console.log(res.data);
        setProperties(res.data.properties);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Show only first 4 (or remove .slice if you want all filtered items)

  if (loading)
    return <p className="text-center py-12">Loading properties...</p>;
  if (!properties.length)
    return <p className="text-center py-12">No properties available.</p>;

  // Always show only top 4 properties
  const displayedProperties = properties.slice(0, 4);
  return (
    <section className="py-12 bg-[var(--white)]">
      <div className="w-11/12 md:w-5/6 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[var(--title)] tracking-widest">
          Our Properties
        </h2>

        {/* ==== Mobile View: Swiper ==== */}
        <div className="block md:hidden">
          <Swiper spaceBetween={16} slidesPerView={1.2} grabCursor={true}>
            {displayedProperties.map((property, index) => (
              <SwiperSlide key={property._id}>
                <div
                  className="bg-[var(--desktop-sidebar)] shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition"
                  data-aos="fade-up"
                  data-aos-delay={index * 200}
                >
                  <div className="relative h-56 w-full">
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      spaceBetween={0}
                      loop={true}
                      autoplay={{ delay: 2500, disableOnInteraction: false }}
                      className="h-56 w-full"
                    >
                      {property.images?.map((img, i) => (
                        <SwiperSlide key={i}>
                          <div className="relative h-56 w-full">
                            <Image
                              src={img}
                              alt={`${property.title} image ${i + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-[var(--primary-color)]">
                      {property.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{property.location}</p>
                    <p className="font-semibold">{property.price}</p>
                    <div className="flex items-center gap-4 mt-2 text-gray-600">
                      <div className="flex items-center gap-1">
                        <FaBed /> {property.bedrooms}
                      </div>
                      <div className="flex items-center gap-1">
                        <FaBath /> {property.bathrooms}
                      </div>
                      <div className="flex items-center gap-1">
                        <FaRulerCombined /> {property.areaSqft}
                      </div>
                    </div>
                    <Link href={`/buy/${property.slug}`}>
                      <ButtonFill text="View Details" className="w-full mt-4" />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ==== Desktop View: Grid ==== */}
        <div
          className={`hidden md:grid gap-8 ${
            displayedProperties.length < 4
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-items-center"
              : "grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {displayedProperties.map((property, index) => (
            <div
              key={property._id}
              className="bg-[var(--desktop-sidebar)] shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition w-full max-w-sm"
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <div className="relative h-56 w-full">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  className="h-56 w-full"
                  spaceBetween={0}
                  loop={true}
                  autoplay={{ delay: 3000 }}
                >
                  {property.images?.map((img, i) => (
                    <SwiperSlide key={i}>
                      <div className="relative h-56 w-full">
                        <Image
                          src={img}
                          alt={`${property.title} image ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-base font-bold text-[var(--primary-color)] uppercase">
                  {property.title}
                </h3>
                <p className="text-gray-500 text-sm">{property.location}</p>
                <p className="font-semibold text-[var(--text)]">
                  {property.price}
                </p>
                <div className="flex items-center gap-4 mt-2 text-gray-500">
                  <div className="flex items-center gap-1">
                    <FaBed /> {property.bedrooms}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBath /> {property.bathrooms}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaRulerCombined /> {property.areaSqft}
                  </div>
                </div>
                <Link href={`/buy/${property.slug}`}>
                  <ButtonFill text="View Details" className="w-full mt-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ View All Button */}
        {properties.length && (
          <div className="flex justify-center mt-8">
            <Link href="/buy">
              <ButtonFill text="View All" className="px-6 py-2" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
