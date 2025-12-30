"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2, Code, ImageIcon } from "lucide-react";
import Fuse from "fuse.js";
import dynamic from "next/dynamic";
import { formatHtml } from "../../../../utils/formatHtml";
import { useRouter } from "next/navigation";

// Replace static import with dynamic:
const AddBlog = dynamic(() => import("../../../../components/AddBlogs"), {
  ssr: false,
});
interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  datePublished: string;
  slug: string;
  coverImage: string;
}

export default function AdminBlogsPage() {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modals
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [htmlContent, setHtmlContent] = useState("");
  const [showHtmlEditor, setShowHtmlEditor] = useState(false);

  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/blog/viewblog`
      );
      const data = await res.json();
      setBlogs(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const stripHtml = (html: string) => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, "");
  };

  useEffect(() => {
    // ✅ Check login status
    const loggedIn = localStorage.getItem("isAdmin");
    if (loggedIn !== "true") {
      router.push("/login"); // redirect if not logged in
      return;
    }
    fetchBlogs();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/blog/${slug}`,
        {
          method: "DELETE",
        }
      );
      const json = await res.json();
      if (res.ok) {
        alert(json.msg || "Deleted successfully");
        fetchBlogs();
      } else {
        alert(json.msg || "Failed to delete");
      }
    } catch (error) {
      alert("Error deleting blog post");
    }
  };

  const handleUpdateImage = async () => {
    if (!selectedImage || !editingSlug) return;

    const formData = new FormData();
    formData.append("coverImage", selectedImage);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/blog/${editingSlug}/image`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to update image");

      alert("Image updated successfully!");
      setShowImageModal(false);
      setSelectedImage(null);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Failed to update image");
    }
  };

  const handleEdit = (slug: string) => {
    const blogToEdit = blogs.find((b) => b.slug === slug);
    if (blogToEdit) {
      setEditingBlog(blogToEdit);
      setShowAddModal(true);
    }
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setEditingBlog(null);
  };

  const fuse = new Fuse(blogs, {
    keys: ["title", "author"],
    threshold: 0.3,
    ignoreLocation: true,
  });

  const filteredBlogs =
    searchQuery.trim() === ""
      ? blogs
      : fuse.search(searchQuery).map((result) => result.item);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-[#0b121a] text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        <button
          className=" bg-blue-500 px-5 py-2 rounded-lg text-white hover:bg-blue-600"
          onClick={() => {
            setEditingBlog(null);
            setShowAddModal(true);
          }}
        >
          Add Blog
        </button>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-3/4 px-4 py-2 rounded  border border-gray-600 text-sm"
        />
        <p className="text-gray-400 text-sm">
          Page {currentPage} of {totalPages || 1}
        </p>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredBlogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 text-sm">
            <thead className="bg-gray-800 text-left">
              <tr>
                <th className="px-3 py-2 border-b border-gray-700">Title</th>
                <th className="px-3 py-2 border-b border-gray-700">Content</th>
                <th className="px-3 py-2 border-b border-gray-700">Author</th>
                <th className="px-3 py-2 border-b border-gray-700">
                  Created At
                </th>
                <th className="px-3 py-2 border-b border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBlogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="even:bg-[#111] hover:bg-[#222] transition"
                >
                  <td className="px-3 py-2">{blog.title}</td>
                  <td className="px-3 py-2 max-w-[200px]">
                    <div className="line-clamp-3 text-gray-300">
                      {stripHtml(blog.content)}
                    </div>
                  </td>
                  <td className="px-3 py-2">{blog.author}</td>
                  <td className="px-3 py-2">
                    {new Date(blog.datePublished).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(blog.slug)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.slug)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={async () => {
                        setEditingSlug(blog.slug);
                        const formatted = formatHtml(blog.content);
                        setHtmlContent(await formatted);
                        setShowHtmlEditor(true);
                      }}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      <Code size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setEditingSlug(blog.slug);
                        setShowImageModal(true);
                      }}
                      className="text-purple-500 hover:text-purple-700"
                    >
                      <ImageIcon size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`px-3 py-1 rounded ${
                      num === currentPage
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    {num}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {showAddModal && (
        <AddBlog
          onClose={handleModalClose}
          onSuccess={fetchBlogs}
          existingBlog={editingBlog}
        />
      )}

      {/* HTML Editor Modal */}
      {showHtmlEditor && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-white text-black rounded-lg p-6 w-full max-w-3xl shadow-xl">
            <h2 className="text-lg font-bold mb-4">Edit Blog HTML</h2>
            <textarea
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              className="w-full h-64 p-3 border border-gray-300 rounded font-mono text-sm"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowHtmlEditor(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!editingSlug) return;
                  try {
                    const res = await fetch(
                      `${process.env.NEXT_PUBLIC_API_BASE}/blog/${editingSlug}`,
                      {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ content: htmlContent }),
                      }
                    );
                    if (!res.ok) throw new Error("Failed to update blog");
                    alert("Blog updated successfully");
                    setShowHtmlEditor(false);
                    fetchBlogs();
                  } catch (err) {
                    console.error(err);
                    alert("Failed to update blog");
                  }
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Upload Modal */}
      {showImageModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white text-black p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Update Cover Image</h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files?.length
                  ? setSelectedImage(e.target.files[0])
                  : null
              }
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowImageModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateImage}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
