"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, X, Save, BookOpen, UploadCloud } from "lucide-react";
import Button from "@/components/ui/Button";
import { getCourses, createItem, updateItem, deleteItem, uploadGalleryFile } from "@/lib/api";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "fashion",
    level: "Diploma / Certificate",
    duration: "6 Months to 1 Year",
    fees: "KES 22,000 / Term",
    image: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);

  const loadCourses = async () => {
    const data = await getCourses();
    if (data) setCourses(data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadGalleryFile(file);
      if (res && res.success && res.url) {
        setFormData((prev) => ({ ...prev, image: res.url }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleOpenForm = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title,
        category: course.category || "fashion",
        level: course.level || "Diploma",
        duration: course.duration || "6 Months",
        fees: course.fees || "KES 22,000",
        image: course.image || "",
        description: course.description || "",
      });
    } else {
      setEditingCourse("new");
      setFormData({
        title: "",
        category: "fashion",
        level: "Diploma / Certificate",
        duration: "6 Months to 1 Year",
        fees: "KES 22,000 / Term",
        image: "https://images.unsplash.com/photo-1537832816519-689ad163238b",
        description: "",
      });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingCourse === "new") {
        await createItem("/courses", formData);
      } else {
        await updateItem("/courses", editingCourse._id, formData);
      }
      setEditingCourse(null);
      await loadCourses();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this course from catalog?")) {
      await deleteItem("/courses", id);
      await loadCourses();
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400">
            Academic Programs
          </span>
          <h1 className="text-3xl font-black text-white mt-1">Course Catalog Manager</h1>
        </div>
        <Button onClick={() => handleOpenForm(null)} size="sm" icon={Plus} className="cursor-pointer">
          Add New Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((c) => (
          <div
            key={c._id || c.title}
            className="p-6 rounded-2xl bg-navy-900 border border-slate-800 shadow-xl flex items-start justify-between gap-4"
          >
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-gold-400 font-bold uppercase px-2 py-0.5 rounded bg-navy-950">
                  {c.category}
                </span>
                <span className="text-slate-400">{c.level}</span>
              </div>
              <h3 className="text-lg font-extrabold text-white">{c.title}</h3>
              <p className="text-slate-300 font-semibold">{c.fees} • {c.duration}</p>
              {c.description && <p className="text-slate-400 leading-relaxed line-clamp-2">{c.description}</p>}
            </div>

            <div className="flex flex-col gap-2 shrink-0">
              <button
                onClick={() => handleOpenForm(c)}
                className="p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-white"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(c._id)}
                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingCourse && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-navy-900 border border-gold-500/40 p-6 space-y-6 text-white relative">
            <button
              onClick={() => setEditingCourse(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold">
              {editingCourse === "new" ? "Add Course" : "Edit Course"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fashion Design & Garment Construction"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                  >
                    <option value="fashion">Fashion Design</option>
                    <option value="ict">ICT & Media</option>
                    <option value="other">Other Creative</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Qualification Level *</label>
                  <input
                    type="text"
                    required
                    placeholder="Diploma / Certificate"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Duration *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 6 Months"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Tuition Fees *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. KES 22,000 / Term"
                    value={formData.fees}
                    onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              {/* Cloudinary File Upload Integration */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Upload Course Image to Cloudinary</label>
                <div className="p-3 rounded-xl border border-dashed border-slate-700 bg-navy-950 text-center space-y-1 relative">
                  <UploadCloud className="w-6 h-6 text-gold-400 mx-auto" />
                  <p className="text-[11px] text-slate-400">
                    {uploading ? "Uploading to Cloudinary..." : "Click to select or drag photo"}
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Image URL *</label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white font-mono text-[11px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Description</label>
                <textarea
                  rows={2}
                  placeholder="Overview of syllabus..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                ></textarea>
              </div>

              <div className="pt-2">
                <Button type="submit" size="lg" icon={Save} className="w-full cursor-pointer" disabled={saving}>
                  {saving ? "Saving..." : "Save Course"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
