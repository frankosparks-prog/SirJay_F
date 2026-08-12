"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, X, Save, Users, UploadCloud, ShieldCheck, Mail, Phone, Award } from "lucide-react";
import Button from "@/components/ui/Button";
import { getStaff, createItem, updateItem, deleteItem, uploadGalleryFile } from "@/lib/api";

export default function AdminStaffPage() {
  const [staffList, setStaffList] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "School of Fashion Design",
    bio: "",
    qualifications: "",
    email: "",
    phone: "",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    hierarchyOrder: 1,
    isLeadership: false,
  });
  const [saving, setSaving] = useState(false);

  const loadStaff = async () => {
    const data = await getStaff();
    if (data) setStaffList(data);
  };

  useEffect(() => {
    loadStaff();
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

  const handleOpenForm = (member = null) => {
    if (member) {
      setEditingStaff(member);
      setFormData({
        name: member.name,
        role: member.role,
        department: member.department || "School of Fashion Design",
        bio: member.bio || "",
        qualifications: member.qualifications || "",
        email: member.email || "",
        phone: member.phone || "",
        image: member.image || "",
        hierarchyOrder: member.hierarchyOrder || 1,
        isLeadership: !!member.isLeadership,
      });
    } else {
      setEditingStaff("new");
      setFormData({
        name: "",
        role: "",
        department: "School of Fashion Design",
        bio: "",
        qualifications: "",
        email: "",
        phone: "",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
        hierarchyOrder: staffList.length + 1,
        isLeadership: false,
      });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingStaff === "new") {
        await createItem("/staff", formData);
      } else {
        await updateItem("/staff", editingStaff._id, formData);
      }
      setEditingStaff(null);
      await loadStaff();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Remove this staff member from institution directory?")) {
      await deleteItem("/staff", id);
      await loadStaff();
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400">
            Faculty Directory
          </span>
          <h1 className="text-3xl font-black text-white mt-1">Institutional Staff & Hierarchy Manager</h1>
        </div>
        <Button onClick={() => handleOpenForm(null)} size="sm" icon={Plus} className="cursor-pointer">
          Add Staff Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffList.map((person, idx) => (
          <div
            key={person._id || idx}
            className="p-6 rounded-3xl bg-navy-900 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4 hover:border-gold-500/40 transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-navy-950 border border-slate-800 shrink-0 shadow-md">
                  <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1 overflow-hidden text-xs">
                  <span className="font-mono text-[10px] text-gold-400 font-bold uppercase">
                    Order #{person.hierarchyOrder || idx + 1} • {person.department}
                  </span>
                  <h3 className="text-base font-black text-white truncate">{person.name}</h3>
                  <p className="text-slate-300 font-bold truncate">{person.role}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 text-xs font-semibold text-slate-300">
                {person.qualifications || "No qualifications listed"}
              </div>

              {person.bio && (
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{person.bio}</p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[10px] font-bold text-gold-400 font-mono">
                {person.isLeadership ? "Leadership Board" : "Faculty"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenForm(person)}
                  className="p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-white"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(person._id)}
                  className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingStaff && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full rounded-3xl bg-navy-900 border border-gold-500/40 p-6 space-y-6 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setEditingStaff(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold">
              {editingStaff === "new" ? "Add Staff Member" : "Edit Staff Profile"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master Tailor Peter Kinyua"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Role / Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Head of Fashion Design"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                  >
                    <option value="Executive Directorate">Executive Directorate</option>
                    <option value="Academic Registry">Academic Registry</option>
                    <option value="School of Fashion Design">School of Fashion Design</option>
                    <option value="ICT & Technical Department">ICT & Technical Department</option>
                    <option value="Student Welfare">Student Welfare</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Hierarchy Order Index</label>
                  <input
                    type="number"
                    value={formData.hierarchyOrder}
                    onChange={(e) => setFormData({ ...formData, hierarchyOrder: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white font-bold"
                  />
                </div>
              </div>

              {/* Cloudinary Image Upload */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Upload Portrait Photo to Cloudinary</label>
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
                <label className="font-bold text-slate-300">Photo URL *</label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white font-mono text-[11px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Qualifications</label>
                <input
                  type="text"
                  placeholder="e.g. Higher Diploma Fashion Technology"
                  value={formData.qualifications}
                  onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Email Address</label>
                  <input
                    type="email"
                    placeholder="email@sirjayinstitute.ac.ke"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+254 712 345 678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Bio Summary</label>
                <textarea
                  rows={3}
                  placeholder="Background narrative..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                ></textarea>
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-bold">
                  <input
                    type="checkbox"
                    checked={formData.isLeadership}
                    onChange={(e) => setFormData({ ...formData, isLeadership: e.target.checked })}
                    className="rounded border-slate-700 text-gold-500 focus:ring-0"
                  />
                  <span>Feature in Executive Leadership Spotlight Section</span>
                </label>
              </div>

              <div className="pt-3">
                <Button type="submit" size="lg" icon={Save} className="w-full cursor-pointer" disabled={saving}>
                  {saving ? "Saving Staff Profile..." : "Save Staff Profile"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
