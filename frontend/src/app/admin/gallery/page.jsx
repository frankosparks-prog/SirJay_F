"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, UploadCloud, Film, Camera, Check, X, Save } from "lucide-react";
import Button from "@/components/ui/Button";
import { getGalleryItems, uploadGalleryFile, createItem, updateItem, deleteItem } from "@/lib/api";

export default function AdminGalleryPage() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Fashion Design",
    type: "image",
    src: "",
    poster: "",
    desc: "",
    tags: ["Fashion", "Campus"],
    isCircularGallery: false,
    isFacilityTour: false,
  });
  const [saving, setSaving] = useState(false);

  const loadGallery = async () => {
    const data = await getGalleryItems();
    if (data) setItems(data);
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadGalleryFile(file);
      if (res && res.success && res.url) {
        setFormData({
          ...formData,
          src: res.url,
          type: res.type || "image",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleOpenForm = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        category: item.category || "Fashion Design",
        type: item.type || "image",
        src: item.src,
        poster: item.poster || "",
        desc: item.desc || "",
        tags: item.tags || ["Fashion"],
        isCircularGallery: !!item.isCircularGallery,
        isFacilityTour: !!item.isFacilityTour,
      });
    } else {
      setEditingItem("new");
      setFormData({
        title: "",
        category: "Fashion Design",
        type: "image",
        src: "",
        poster: "",
        desc: "",
        tags: ["Fashion", "Campus"],
        isCircularGallery: false,
        isFacilityTour: false,
      });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.src) {
      alert("Please upload a file or provide a valid media asset URL.");
      return;
    }
    setSaving(true);
    try {
      if (editingItem === "new") {
        await createItem("/gallery", formData);
      } else {
        await updateItem("/gallery", editingItem._id, formData);
      }
      setEditingItem(null);
      await loadGallery();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this media asset from Cloudinary storage?")) {
      await deleteItem("/gallery", id);
      await loadGallery();
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400">
            Cloudinary Storage Manager
          </span>
          <h1 className="text-3xl font-black text-white mt-1">Media Vault & 3D WebGL Assets</h1>
        </div>
        <Button onClick={() => handleOpenForm(null)} size="sm" icon={Plus} className="cursor-pointer">
          Upload New Asset
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((asset) => (
          <div
            key={asset._id || asset.title}
            className="rounded-2xl bg-navy-900 border border-slate-800 overflow-hidden shadow-xl flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-navy-950">
              {asset.type === "video" ? (
                <video src={asset.src} className="w-full h-full object-cover" />
              ) : (
                <img src={asset.src} alt={asset.title} className="w-full h-full object-cover" />
              )}
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-navy-950/80 text-gold-300 text-[10px] font-bold">
                {asset.type === "video" ? "Video" : "Photo"}
              </span>
              {asset.isCircularGallery && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold border border-emerald-500/30">
                  3D WebGL
                </span>
              )}
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gold-400 uppercase">{asset.category}</span>
                <h3 className="font-extrabold text-white text-sm line-clamp-1">{asset.title}</h3>
                <p className="text-slate-400 line-clamp-2 text-[11px]">{asset.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">{asset.tags?.join(", ")}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenForm(asset)}
                    className="p-1.5 rounded-lg bg-navy-800 text-slate-300 hover:text-white"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(asset._id)}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-navy-900 border border-gold-500/40 p-6 space-y-6 text-white relative">
            <button
              onClick={() => setEditingItem(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold">
              {editingItem === "new" ? "Upload / Add Asset" : "Edit Asset Metadata"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* File Uploader */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Upload to Cloudinary (Image/Video)</label>
                <div className="p-4 rounded-xl border-2 border-dashed border-slate-700 bg-navy-950 text-center space-y-2 relative">
                  <UploadCloud className="w-8 h-8 text-gold-400 mx-auto" />
                  <p className="text-slate-400">
                    {uploading ? "Uploading to Cloudinary..." : "Click to select file or drag & drop"}
                  </p>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Media Asset URL *</label>
                <input
                  type="text"
                  required
                  placeholder="https://res.cloudinary.com/..."
                  value={formData.src}
                  onChange={(e) => setFormData({ ...formData, src: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white font-mono text-[11px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Haute Couture Pattern Drafting"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                  >
                    <option value="Fashion Design">Fashion Design</option>
                    <option value="ICT & Tech">ICT & Tech</option>
                    <option value="Media Arts">Media Arts</option>
                    <option value="Videos">Videos</option>
                    <option value="Campus Life">Campus Life</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                  >
                    <option value="image">Image (Photo)</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isCircularGallery}
                    onChange={(e) => setFormData({ ...formData, isCircularGallery: e.target.checked })}
                    className="rounded border-slate-700 text-gold-500 focus:ring-0"
                  />
                  <span>Show in WebGL 3D Circular Canvas</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFacilityTour}
                    onChange={(e) => setFormData({ ...formData, isFacilityTour: e.target.checked })}
                    className="rounded border-slate-700 text-gold-500 focus:ring-0"
                  />
                  <span>Set as Main Facility Video Tour</span>
                </label>
              </div>

              <div className="pt-2">
                <Button type="submit" size="lg" icon={Save} className="w-full cursor-pointer" disabled={saving}>
                  {saving ? "Saving..." : "Save Asset"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
