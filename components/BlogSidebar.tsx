"use client";

import Image from "next/image";
import SidebarSimpleForm from "./SidebarForm";

export default function BlogSidebar({ relatedBlogs }: { relatedBlogs: any[] }) {
  return (
    <aside className="space-y-10 sticky top-28">
      {/* ===== CONTACT FORM ===== */}
      <div className="bg-white border rounded-xl shadow-md p-5">
        <h3 className="text-xl font-bold mb-2">Need Help?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Share your details & get expert assistance
        </p>

        <SidebarSimpleForm />
      </div>

      {/* ===== RELATED BLOGS ===== */}
      {relatedBlogs?.length > 0 && (
        <div className="bg-white border rounded-xl shadow-md p-5">
          <h3 className="text-xl font-bold mb-4">Related Blogs</h3>

          <div className="space-y-4">
            {relatedBlogs.slice(0, 4).map((blog) => (
              <a
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className="flex gap-4 items-center group"
              >
                <div className="relative w-20 h-16 rounded-md overflow-hidden shrink-0">
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-[var(--primary-color)]">
                    {blog.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(blog.datePublished).toLocaleDateString()}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
