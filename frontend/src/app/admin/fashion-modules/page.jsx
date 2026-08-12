"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, X, Save } from "lucide-react";
import Button from "@/components/ui/Button";
import { getFashionModules, createItem, updateItem, deleteItem } from "@/lib/api";

export default function AdminFashionModulesPage() {
  const [modules, setModules] = useState([]);
  const [editingModule, setEditingModule] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    level: "Beginner Level",
    duration: "3 Months",
    desc: "",
    order: 1,
  });
  const [saving, setSaving] = useState(false);

  const loadModules = async () => {
    const data = await getFashionModules();
    if (data) setModules(data);
  };

  useEffect(() => {
    loadModules();
  }, []);

  const handleOpenForm = (item = null) => {
    if (item) {
      setEditingModule(item);
      setFormData({
        title: item.title,
        level: item.level || item.title,
        duration: item.duration || "3 Months",
        desc: item.desc || item.description || "",
        order: item.order || 1,
      });
    } else {
      setEditingModule("new");
      setFormData({
        title: "",
        level: "Beginner Level",
        duration: "3 Months",
        desc: "",
        order: modules.length + 1,
      });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingModule === "new") {
        await createItem("/fashion-modules", formData);
      } else {
        await updateItem("/fashion-modules", editingModule._id, formData);
      }
      setEditingModule(null);
      await loadModules();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this fashion module?")) {
      await deleteItem("/fashion-modules", id);
      await loadModules();
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400">
            School of Fashion Design
          </span>
          <h1 className="text-3xl font-black text-white mt-1">Fashion Module Tiers Manager</h1>
        </div>
        <Button onClick={() => handleOpenForm(null)} size="sm" icon={Plus} className="cursor-pointer">
          Add Module Tier
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((item, idx) => (
          <div
            key={item._id || item.title}
            className="p-6 rounded-2xl bg-navy-900 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-mono text-gold-400 font-bold uppercase">Module 0{idx + 1}</span>
                <span className="px-2 py-0.5 rounded bg-navy-950 text-slate-300">{item.duration}</span>
              </div>
              <h3 className="text-lg font-extrabold text-white">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.desc || item.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenForm(item)}
                className="p-1.5 rounded-lg bg-navy-800 text-slate-300 hover:text-white"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingModule && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-navy-900 border border-gold-500/40 p-6 space-y-6 text-white relative">
            <button
              onClick={() => setEditingModule(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold">
              {editingModule === "new" ? "Add Module Tier" : "Edit Module Tier"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Module Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Beginner Level"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value, level: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Duration</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3 Months"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Module Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Summary of skills learned in this tier..."
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                ></textarea>
              </div>

              <div className="pt-2">
                <Button type="submit" size="lg" icon={Save} className="w-full cursor-pointer" disabled={saving}>
                  {saving ? "Saving..." : "Save Module"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
