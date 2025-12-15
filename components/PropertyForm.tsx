"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

interface PropertyFormProps {
  property?: PropertyData;
  onClose: () => void;
  onSuccess: () => void;
}

interface PropertyData {
  title: string;
  slug: string;
  description: string;
  type: string;
  purpose: string;
  location: string;
  price: number | string;
  bedrooms: number | string;
  bathrooms: number | string;
  areaSqft: number | string;
  highlights: string[];
  featuresAmenities: string[];
  nearby: string[];
  extraHighlights: string[];
  googleMapUrl: string;
  videoLink: string;
  instagramLink?: string; // ⭐ NEW
  images: string[];
  builder: string;
  metatitle?: string;
  metadescription?: string;
}

type ArrayFields =
  | "highlights"
  | "featuresAmenities"
  | "nearby"
  | "extraHighlights";

// 🔹 Map technical field names → human labels
const fieldLabels: Record<ArrayFields, string> = {
  highlights: "Highlights",
  featuresAmenities: "Features & Amenities",
  nearby: "Nearby",
  extraHighlights: "Extra Highlights",
};

export default function PropertyForm({
  property,
  onClose,
  onSuccess,
}: PropertyFormProps) {
  const [formData, setFormData] = useState<Partial<PropertyData>>({
    title: "",
    description: "",
    type: "",
    purpose: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    areaSqft: "",
    googleMapUrl: "",
    videoLink: "",
    instagramLink: "",
    builder: "",
    metatitle: "", // ✅ initialize
    metadescription: "",
  });

  const [arrayInputs, setArrayInputs] = useState<Record<ArrayFields, string>>({
    highlights: "",
    featuresAmenities: "",
    nearby: "",
    extraHighlights: "",
  });

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false); // 🔹 loader
  const [brochureFile, setBrochureFile] = useState<File | null>(null);

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        description: property.description,
        type: property.type,
        purpose: property.purpose,
        location: property.location,
        price: property.price,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        areaSqft: property.areaSqft,
        googleMapUrl: property.googleMapUrl,
        videoLink: property.videoLink,
        instagramLink: property.instagramLink || "",
        builder: property.builder,
        metatitle: property.metatitle || "", // ✅ prefill
        metadescription: property.metadescription || "",
      });

      setArrayInputs({
        highlights: property.highlights.join(", "),
        featuresAmenities: property.featuresAmenities.join(", "),
        nearby: property.nearby.join(", "),
        extraHighlights: property.extraHighlights.join(", "),
      });

      setExistingImages(property.images || []);
    }
  }, [property]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setArrayInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setNewImages((prev) => [...prev, ...Array.from(files)]);
  };

  // Add this handler
  const handleBrochureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBrochureFile(e.target.files[0]);
    }
  };

  const handleRemoveExistingImage = (url: string) => {
    setExistingImages((prev) => prev.filter((img) => img !== url));
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // 🔹 start loader
    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          data.append(key, value.toString());
        }
      });

      (Object.keys(arrayInputs) as ArrayFields[]).forEach((key) => {
        const arr = arrayInputs[key]
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean);
        data.append(key, JSON.stringify(arr));
      });

      newImages.forEach((file) => data.append("images", file));
      data.append("existingImages", JSON.stringify(existingImages));

      if (brochureFile) {
        data.append("brochure", brochureFile); // <-- this was missing
      }

      if (property) {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_BASE}/property/${property.slug}`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/property`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to submit property", error);
    } finally {
      setLoading(false); // 🔹 stop loader
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg shadow p-6 ">
      {/* Title & Description */}
      <div className="space-y-3">
        <InputField
          label="Title"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          required
        />

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full rounded-lg p-3 border border-gray-300 focus:ring text-white"
            rows={4}
            required
          />
        </div>
      </div>
      {/* ✅ Meta SEO fields */}

      <InputField
        label="Meta Title"
        name="metatitle"
        value={formData.metatitle || ""}
        onChange={handleChange}
        placeholder="Enter Meta Title"
      />
      <div>
        <label className="block font-medium mb-1">Meta Description</label>
        <textarea
          name="metadescription"
          value={formData.metadescription || ""}
          onChange={handleChange}
          className="w-full rounded-lg p-3 border border-gray-300 focus:ring text-white"
          rows={3}
          placeholder="Enter Meta Description"
        />
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4">
        {/* 🔹 Purpose dropdown (light background so options visible) */}
        <div>
          <select
            name="purpose"
            value={formData.purpose || ""}
            onChange={handleChange}
            className="w-full rounded-lg p-3 bg-white text-black border border-gray-300 focus:ring "
          >
            <option value="">Select purpose</option>
            <option value="Buy">Buy</option>
            <option value="Lease">Lease</option>
          </select>
        </div>
        <div>
          <select
            name="type"
            value={formData.type || ""}
            onChange={handleChange}
            className="w-full rounded-lg p-3 bg-white text-black border border-gray-300 focus:ring "
          >
            <option value="">Select Type</option>
            <option value="Builder Floor">Builder Floor</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Farmhouse">Farmhouse</option>
            <option value="Plot">Plot</option>
          </select>
        </div>

        <InputField
          name="location"
          placeholder="Location"
          value={formData.location || ""}
          onChange={handleChange}
        />
        <InputField
          name="price"
          placeholder="Price"
          value={formData.price || ""}
          onChange={handleChange}
        />
        <InputField
          name="bedrooms"
          placeholder="Bedrooms"
          value={formData.bedrooms || ""}
          onChange={handleChange}
        />
        <InputField
          name="bathrooms"
          placeholder="Bathrooms"
          value={formData.bathrooms || ""}
          onChange={handleChange}
        />
        <InputField
          name="areaSqft"
          placeholder="Area (sqft)"
          value={formData.areaSqft || ""}
          onChange={handleChange}
        />
        <InputField
          name="builder"
          placeholder="Builder"
          value={formData.builder || ""}
          onChange={handleChange}
        />
      </div>

      {/* Images */}
      <div>
        {/* Existing Images */}
        {existingImages.length > 0 && (
          <>
            <label className="block font-medium mb-2">Existing Images</label>

            <DragDropContext
              onDragEnd={(result) => {
                if (!result.destination) return;
                const reordered = reorder(
                  existingImages,
                  result.source.index,
                  result.destination.index
                );
                setExistingImages(reordered);
              }}
            >
              <Droppable droppableId="existing-images">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                  >
                    {existingImages.map((url, idx) => (
                      <Draggable key={url} draggableId={url} index={idx}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`relative group cursor-grab rounded-lg overflow-hidden border ${
                              snapshot.isDragging
                                ? "border-blue-500 scale-105"
                                : ""
                            } transition-transform duration-150`}
                          >
                            <img
                              src={url}
                              alt={`existing-${idx}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveExistingImage(url)}
                              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <p className="text-sm text-gray-400 mt-2">
              💡 Drag images to reorder — changes will be saved when you update.
            </p>
          </>
        )}

        <label className="block font-medium mt-4">Upload New Images</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="mt-2"
        />
        <div className="grid grid-cols-4 gap-3 mt-3">
          {newImages.map((file, idx) => (
            <div key={idx} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-full h-24 object-cover rounded-lg shadow"
              />
              <button
                type="button"
                onClick={() => handleRemoveNewImage(idx)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Array fields */}
      <div className="grid grid-cols-2 gap-4">
        {(Object.keys(arrayInputs) as ArrayFields[]).map((field) => (
          <div key={field}>
            <label className="block font-medium mb-1 capitalize">
              {fieldLabels[field]}
            </label>
            <input
              type="text"
              name={field}
              value={arrayInputs[field]}
              onChange={handleArrayChange}
              placeholder={`Enter ${fieldLabels[field]} (comma separated)`}
              className="w-full rounded-lg p-3 border border-gray-300 focus:ring text-white"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputField
          name="videoLink"
          type="text"
          placeholder="video link"
          value={formData.videoLink || ""}
          onChange={handleChange}
        />
        <InputField
          name="googleMapUrl"
          type="text"
          placeholder="googleMapUrl"
          value={formData.googleMapUrl || ""}
          onChange={handleChange}
        />
      </div>

      {/* Brochure Upload */}
      <div className="mt-4">
        <label className="block font-medium mb-2">Upload Brochure (PDF)</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleBrochureChange}
          className="mt-2"
        />
      </div>
      <InputField
        name="instagramLink"
        type="text"
        placeholder="Instagram Post / Reel Link"
        value={formData.instagramLink || ""}
        onChange={handleChange}
      />

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:scale-105 transition"
          disabled={loading}
        >
          {loading && (
            <span className="text-white">
              {property ? "Updating..." : "Adding..."}
            </span>
          )}

          {!loading && (
            <span>{property ? "Update Property" : "Add Property"}</span>
          )}
        </button>
      </div>
    </form>
  );
}

/* 🔹 Reusable Input Component */
function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label?: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      {label && <label className="block font-medium mb-1">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={0}
        className="w-full rounded-lg p-3 border border-gray-300 focus:ring text-white"
        required={required}
      />
    </div>
  );
}
