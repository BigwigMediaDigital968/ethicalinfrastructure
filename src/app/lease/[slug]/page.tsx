"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "yet-another-react-lightbox/styles.css";

import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";

import { MapPin, BedDouble, Home, Phone } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
// import HelpSection from "../../../../components/HelpSection";
import "aos/dist/aos.css"; // CSS is fine at the top
import ContactInfo from "../../../../components/ContactInfo";
import Link from "next/link";
import ContactSidebar from "../../../../components/ContactSidebar";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import ButtonFill from "../../../../components/Button";

interface Property {
  _id: string;
  title: string;
  slug: string;
  purpose?: string;
  videoLink?: string;
  location?: string;
  price?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  areaSqft?: number | null;
  images: string[];
  highlights: string[];
  nearby: string[];
  featuresAmenities: string[];
  extraHighlights: string[];
  description: string;
  googleMapUrl?: string;
  brochure?: string;
}

export default function BuyDetails() {
  const { slug } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // only run in browser
    (async () => {
      const AOS = await import("aos"); // import dynamically
      AOS.init({ duration: 1000, once: true, offset: 100 });
    })();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!slug) return;
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/property/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading)
    return <p className="text-center mt-20 text-xl">Loading property...</p>;
  if (!property)
    return <p className="text-center mt-20 text-xl">Property not found</p>;

  const displayedImages = property?.images?.slice(0, 7) || [];
  const extraCount = (property?.images?.length || 0) - displayedImages.length;

  function getYouTubeEmbedUrl(url: string) {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
      } else if (parsedUrl.hostname.includes("youtube.com")) {
        return `https://www.youtube.com/embed/${parsedUrl.searchParams.get(
          "v"
        )}`;
      }
      return null;
    } catch {
      return null;
    }
  }

  return (
    <div className="   transition-colors duration-300">
      <Navbar />

      {/* Hero with overlay */}
      <section className="relative h-[100vh]">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 4000 }}
          loop
          className="h-full"
        >
          {property?.images?.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-full">
                <Image
                  src={img}
                  alt={`Property Image ${idx + 1}`}
                  fill
                  priority={idx === 0}
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Split Layout */}
      <section className="grid md:grid-cols-2 gap-10 w-11/12 md:w-5/6 mx-auto py-16">
        {/* Gallery - Left Side */}
        <div className="columns-2 gap-4 space-y-4">
          {displayedImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => {
                setPhotoIndex(idx);
                setIsOpen(true);
              }}
              className="relative overflow-hidden  shadow cursor-pointer"
            >
              <Image
                src={img}
                alt={`Gallery ${idx}`}
                width={600}
                height={400}
                className=" hover:scale-105 transition"
              />
            </div>
          ))}
          {extraCount > 0 && (
            <div
              className="relative h-40 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-xl text-2xl font-bold cursor-pointer"
              onClick={() => {
                setPhotoIndex(10);
                setIsOpen(true);
              }}
            >
              +{extraCount} more
            </div>
          )}
        </div>

        {/* Info + Description - Right Side */}
        <div className="sticky top-24 self-start space-y-6">
          {/* Title + Location + Price */}
          <h1 className="text-3xl font-bold text-[var(--title)]">
            {property.title}
          </h1>
          {property.location && (
            <p className="flex items-center gap-2 text-lg text-[var(--text)] ">
              <MapPin size={18} /> {property.location}
            </p>
          )}
          {property.price && (
            <p className="text-2xl font-semibold text-[var(--title)]">
              ₹ {property.price.toLocaleString()}
            </p>
          )}

          {/* Badges */}
          <div className="flex flex-wrap gap-3">
            {property.bedrooms && (
              <span className="px-4 py-2 bg-gray-100  rounded-lg shadow flex items-center gap-2 text-gray-800">
                <BedDouble size={18} /> {property.bedrooms} Beds
              </span>
            )}
            {property.bathrooms && (
              <span className="px-4 py-2 bg-gray-100  rounded-lg shadow flex items-center gap-2 text-gray-800">
                🛁 {property.bathrooms} Baths
              </span>
            )}
            {property.areaSqft && (
              <span className="px-4 py-2 bg-gray-100  rounded-lg shadow flex items-center gap-2 text-gray-800">
                📐 {property.areaSqft} Sqft
              </span>
            )}
          </div>

          {/* Description */}
          <h2 className="text-xl font-semibold mt-6 text-[var(--black)]">
            About this Property
          </h2>
          <p className="text-lg text-[var(--text)]  leading-relaxed">
            {property.description}
          </p>

          {/* Highlights */}
          {property?.highlights?.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-6 text-[var(--black)]">
                Highlights
              </h3>
              <div className="flex flex-wrap gap-3">
                {property.highlights.map((h, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gray-100 rounded-full shadow text-sm text-gray-800"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </>
          )}

          {property.brochure && (
            <>
              <h2 className="text-xl font-semibold text-[var(--title)]">
                Brochure
              </h2>

              <ButtonFill
                onClick={() => window.open(property.brochure, "_blank")}
                text="📄 View Brochure"
              />
            </>
          )}
        </div>
      </section>

      {/* Video Tour */}
      {property.videoLink && (
        <section className="w-11/12 md:w-5/6 mx-auto py-12">
          <h2 className="text-3xl font-semibold mb-6 text-[var(--title)]">
            Virtual Tour
          </h2>
          <div className="w-full h-[500px] overflow-hidden rounded-xl shadow">
            {property.videoLink.includes("youtube") ||
            property.videoLink.includes("youtu.be") ? (
              <iframe
                src={getYouTubeEmbedUrl(property.videoLink)!}
                width="100%"
                height="100%"
                allowFullScreen
              />
            ) : (
              <video
                src={property.videoLink}
                controls
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </section>
      )}

      {/* Features */}
      {property?.featuresAmenities?.length > 0 && (
        <section className="w-11/12 md:w-5/6 mx-auto py-12">
          <h2 className="text-3xl font-semibold mb-6 text-[var(--title)]">
            Features & Amenities
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {property.featuresAmenities.map((f, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-100 text-gray-800 rounded-lg shadow text-center"
              >
                ⭐ {f}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Nearby */}
      {property?.nearby?.length > 0 && (
        <section className="w-11/12 md:w-5/6 mx-auto py-12">
          <h2 className="text-3xl font-semibold mb-6 text-[var(--title)]">
            Nearby Places
          </h2>
          <div className="flex flex-wrap gap-3">
            {property.nearby.map((n, idx) => (
              <span
                key={idx}
                className="px-5 py-2 bg-gray-100 text-gray-800 rounded-full"
              >
                {n}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Map */}
      {property.googleMapUrl && (
        <section className="w-11/12 md:w-5/6 mx-auto py-12">
          <h2 className="text-3xl font-semibold mb-6 text-[var(--title)]">
            Location
          </h2>
          <iframe
            src={property.googleMapUrl}
            width="100%"
            height="450"
            loading="lazy"
            className="rounded-xl shadow border-0"
          />
        </section>
      )}

      {/* Floating Contact Widget */}
      <Link href="tel:919999000183">
        <div className="fixed bottom-6 right-6 bg-[var(--primary-color)] text-black p-4 rounded-full shadow-xl flex items-center gap-2 cursor-pointer hover:scale-105 transition">
          <Phone />
        </div>
      </Link>

      <ContactInfo />
      {/* <HelpSection /> */}

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

      {/* Lightbox */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={property.images.map((img) => ({ src: img }))}
          index={photoIndex}
          plugins={[Fullscreen, Slideshow]}
        />
      )}
    </div>
  );
}
