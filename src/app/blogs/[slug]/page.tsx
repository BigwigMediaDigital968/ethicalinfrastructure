import { Metadata } from "next";

import Footer from "../../../../components/Footer";
import Image from "next/image";
import ContactInfo from "../../../../components/ContactInfo";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import ContactSidebar from "../../../../components/ContactSidebar";
import Navbar2 from "../../../../components/Navbar2";

interface BlogType {
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  datePublished: string;
  content: string;
  slug: string;
  category?: string;
  schemaMarkup?: string[];
}

async function getBlog(slug: string): Promise<BlogType> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/blog/viewblog`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch blog");

  const blogs: BlogType[] = await res.json();
  const found = blogs.find((b) => b.slug === slug);

  if (!found) throw new Error("Blog not found");

  return found;
}

// ✅ Proper type for dynamic route metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: {
      canonical: `https://www.ethicalinfrastructures.com/blogs/${blog.slug}`,
    },
  };
}

// ✅ Proper page function type
export default async function BlogDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/blog/viewblog`, {
    cache: "no-store",
  });
  const allBlogs: BlogType[] = await res.json();

  const relatedBlogs = allBlogs
    .filter(
      (b) =>
        b.slug !== blog.slug &&
        b.category?.toLowerCase() === blog.category?.toLowerCase()
    )
    .slice(0, 4);

  return (
    <div className=" min-h-screen">
      {/* <!-- Open Graph Meta Tags --> */}
      <meta property="og:title" content={blog.title} />
      <meta property="og:description" content={blog.excerpt} />
      <meta property="og:type" content="article" />
      <meta
        property="og:url"
        content={`https://www.eipl.co/blogs/${blog.slug}`}
      />
      <meta property="og:image" content={blog.coverImage} />
      <meta property="og:site_name" content="Ethical Infrastructures Pvt Ltd" />
      <meta property="og:locale" content="en_US" />

      {/* Schema Markup */}
      {Array.isArray(blog.schemaMarkup) &&
        blog.schemaMarkup.map((markup, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: markup }}
          />
        ))}

      <Navbar2 />

      <section className="w-11/12 md:w-5/6 mx-auto text-left pt-24 md:pt-40">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--title)] leading-tight mb-3">
          {blog.title}
        </h1>
        <p className="text-[var(--text)] text-sm md:text-base mb-6">
          By <span className="font-semibold ">{blog.author}</span> •{" "}
          {new Date(blog.datePublished).toLocaleDateString()}
        </p>
      </section>

      {blog.coverImage && (
        <div className="relative w-11/12 md:w-5/6 mx-auto h-[60vh] md:h-[100vh] overflow-hidden rounded-xl">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="w-11/12 md:w-5/6 mx-auto mb-10">
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* {relatedBlogs.length > 0 && (
          <aside className="lg:col-span-1 bg-[var(--desktop-sidebar)] p-5 rounded-2xl shadow-sm h-fit mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-[var(--title)] border-b border-gray-200 pb-2">
              Related Blogs
            </h2>
            <div className="space-y-5">
              {relatedBlogs.map((rel) => (
                <div key={rel.slug}>
                  <h3 className="text-base font-semibold text-[var(--black)] leading-snug line-clamp-2">
                    {rel.title}
                  </h3>
                </div>
              ))}
            </div>
          </aside>
        )} */}
      </div>

      <ContactInfo />

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
    </div>
  );
}
