"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "../../../../components/Footer";
import Navbar2 from "../../../../components/Navbar2";
import ContactInfo from "../../../../components/ContactInfo";
import ContactSidebar from "../../../../components/ContactSidebar";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import LeadForm from "../../../../components/LeadForm";
import LeadFormModal from "../../../../components/LeadPopup";
import BlogSidebar from "../../../../components/BlogSidebar";

export default function BlogClient({
  blog,
  relatedBlogs,
}: {
  blog: any;
  relatedBlogs: any[];
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // ✅ SAME POPUP LOGIC AS FIRST PROJECT
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-open-popup='true']")) {
        setIsPopupOpen(true);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="min-h-screen">
      {/* ================== BREADCRUMB SCHEMA ================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.ethicalinfrastructures.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blogs",
                item: "https://www.ethicalinfrastructures.com/blogs",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: blog.title,
                item: `https://www.ethicalinfrastructures.com/blogs/${blog.slug}`,
              },
            ],
          }),
        }}
      />

      {/* ================== ARTICLE SCHEMA ================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.ethicalinfrastructures.com/blogs/${blog.slug}`,
            },
            headline: blog.title,
            description: blog.excerpt,
            image: [blog.coverImage],
            author: {
              "@type": "Person",
              name: blog.author || "Team Ethical Infrastructures",
            },
            publisher: {
              "@type": "Organization",
              name: "Ethical Infrastructures",
              logo: {
                "@type": "ImageObject",
                url: "https://www.ethicalinfrastructures.com/logo.png",
              },
            },
            url: `https://www.ethicalinfrastructures.com/blogs/${blog.slug}`,
            datePublished: blog.datePublished,
            dateModified: blog.datePublished,
          }),
        }}
      />

      <Navbar2 />

      {/* ================== HEADER ================== */}
      <section className="w-11/12 md:w-5/6 mx-auto pt-24 md:pt-40">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--title)] mb-3">
          {blog.title}
        </h1>
        <p className="text-sm md:text-base text-[var(--text)] mb-6">
          By <span className="font-semibold">{blog.author}</span> •{" "}
          {new Date(blog.datePublished).toLocaleDateString()}
        </p>
      </section>

      {/* ================== COVER IMAGE ================== */}
      {blog.coverImage && (
        <div className="relative w-11/12 md:w-5/6 mx-auto h-[40vh] md:h-[60vh] lg:h-[100vh] rounded-xl overflow-hidden">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* ================== CONTENT ================== */}
      <section className="w-11/12 md:w-5/6 mx-auto my-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT – BLOG */}
        <article className="lg:col-span-8">
          <div
            className="blog-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>

        {/* RIGHT – SIDEBAR */}
        <div className="lg:col-span-4">
          <BlogSidebar relatedBlogs={relatedBlogs} />
        </div>
      </section>

      {/* ================== RELATED BLOGS ================== */}
      {/* {relatedBlogs.length > 0 && (
        <section className="w-11/12 md:w-5/6 mx-auto mt-20">
          <h2 className="text-3xl font-bold mb-8">Related Blogs</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedBlogs.map((rel) => (
              <a
                key={rel.slug}
                href={`/blogs/${rel.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <div className="relative h-48">
                  <Image
                    src={rel.coverImage}
                    alt={rel.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold line-clamp-2 mb-2">
                    {rel.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {rel.excerpt}
                  </p>
                  <p className="text-xs text-gray-400 mt-3">
                    {new Date(rel.datePublished).toLocaleDateString()}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )} */}

      <ContactInfo />

      {/* ================== POPUP ================== */}
      <LeadFormModal
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />

      {/* ================== MOBILE CTA ================== */}
      <div className="fixed bottom-0 left-0 w-full flex md:hidden z-[9999]">
        <a
          href="tel:+919999000183"
          className="w-1/2 bg-[var(--primary-color)] text-white py-3 flex justify-center gap-2"
        >
          <FaPhoneAlt size={18} /> Call Us
        </a>
        <a
          href="https://wa.me/+919999000172"
          className="w-1/2 bg-white text-green-500 py-3 flex justify-center gap-2"
        >
          <FaWhatsapp size={18} /> WhatsApp
        </a>
      </div>

      <div className="hidden md:block">
        <ContactSidebar />
      </div>

      <Footer />
    </div>
  );
}
