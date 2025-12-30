import { Metadata } from "next";
import BlogClient from "./BlogClient";

interface BlogType {
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  datePublished: string;
  content: string;
  slug: string;
}

interface RelatedBlogType {
  title: string;
  slug: string;
  coverImage: string;
  excerpt: string;
  datePublished: string;
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

async function getRelatedBlogs(slug: string): Promise<RelatedBlogType[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/blog/related/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  return res.json();
}

/* ===================== SEO METADATA ===================== */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params; // ✅ REQUIRED in Next 15
  const blog = await getBlog(slug);

  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: {
      canonical: `https://www.ethicalinfrastructures.com/blogs/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      url: `https://www.ethicalinfrastructures.com/blogs/${blog.slug}`,
      images: [{ url: blog.coverImage }],
      siteName: "Ethical Infrastructures Pvt Ltd",
      locale: "en_IN",
    },
  };
}

/* ===================== PAGE ===================== */
export default async function BlogDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ REQUIRED in Next 15

  const blog = await getBlog(slug);
  const relatedBlogs = await getRelatedBlogs(slug);

  return <BlogClient blog={blog} relatedBlogs={relatedBlogs} />;
}
