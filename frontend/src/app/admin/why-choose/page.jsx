"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, CheckCircle2, X, Save, UploadCloud } from "lucide-react";
import Button from "@/components/ui/Button";
import { getWhyChooseCards, createItem, updateItem, deleteItem, uploadGalleryFile } from "@/lib/api";

export default function AdminWhyChoosePage() {
  const [cards, setCards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "State-of-the-Art",
    iconName: "Scissors",
    image: "",
  });
  const [saving, setSaving] = useState(false);

  const loadCards = async () => {
    const data = await getWhyChooseCards();
    if (data) setCards(data);
  };

  useEffect(() => {
    loadCards();
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

  const handleOpenForm = (card = null) => {
    if (card) {
      setEditingCard(card);
      setFormData({
        title: card.title,
        description: card.description,
        tag: card.tag || "State-of-the-Art",
        iconName: card.iconName || "Scissors",
        image: card.image,
      });
    } else {
      setEditingCard("new");
      setFormData({
        title: "",
        description: "",
        tag: "State-of-the-Art",
        iconName: "Scissors",
        image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop",
      });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingCard === "new") {
        await createItem("/why-choose", formData);
      } else {
        await updateItem("/why-choose", editingCard._id, formData);
      }
      setEditingCard(null);
      await loadCards();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this feature card?")) {
      await deleteItem("/why-choose", id);
      await loadCards();
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400">
            Home Page Cards
          </span>
          <h1 className="text-3xl font-black text-white mt-1">Why Choose Us Cards Manager</h1>
        </div>
        <Button onClick={() => handleOpenForm(null)} size="sm" icon={Plus} className="cursor-pointer">
          Add New Feature Card
        </Button>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card._id || card.title}
            className="rounded-2xl bg-navy-900 border border-slate-800 overflow-hidden shadow-xl flex flex-col justify-between"
          >
            <div className="relative h-40 overflow-hidden bg-slate-800">
              <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
              <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-navy-950/90 text-gold-400 border border-gold-500/30">
                {card.tag}
              </span>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between text-xs">
              <div className="space-y-2">
                <h3 className="font-extrabold text-white text-base">{card.title}</h3>
                <p className="text-slate-400 leading-relaxed line-clamp-3">{card.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-gold-400 font-mono">Icon: {card.iconName}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenForm(card)}
                    className="p-1.5 rounded-lg bg-navy-800 text-slate-300 hover:text-white"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(card._id)}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Create Form Drawer Modal */}
      {editingCard && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-navy-900 border border-gold-500/40 p-6 space-y-6 text-white relative">
            <button
              onClick={() => setEditingCard(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold">
              {editingCard === "new" ? "Add Feature Card" : "Edit Feature Card"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Card Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Pill Tag</label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Icon</label>
                  <select
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                  >
                    <option value="Scissors">Scissors</option>
                    <option value="Briefcase">Briefcase</option>
                    <option value="Award">Award</option>
                    <option value="Users">Users</option>
                    <option value="GraduationCap">GraduationCap</option>
                  </select>
                </div>
              </div>

              {/* Cloudinary File Upload Integration */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Upload Image to Cloudinary</label>
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
                <label className="font-bold text-slate-300">Image URL</label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white font-mono text-[11px]"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" size="lg" icon={Save} className="w-full cursor-pointer" disabled={saving}>
                  {saving ? "Saving..." : "Save Card"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
