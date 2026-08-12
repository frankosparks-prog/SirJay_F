"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, X, Save, Palette } from "lucide-react";
import Button from "@/components/ui/Button";
import { getComingSoonDepts, createItem, updateItem, deleteItem } from "@/lib/api";

export default function AdminComingSoonPage() {
  const [depts, setDepts] = useState([]);
  const [editingDept, setEditingDept] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    iconName: "Palette",
    status: "Registration Opening Soon",
  });
  const [saving, setSaving] = useState(false);

  const loadDepts = async () => {
    const data = await getComingSoonDepts();
    if (data) setDepts(data);
  };

  useEffect(() => {
    loadDepts();
  }, []);

  const handleOpenForm = (item = null) => {
    if (item) {
      setEditingDept(item);
      setFormData({
        name: item.name,
        desc: item.desc,
        iconName: item.iconName || "Palette",
        status: item.status || "Registration Opening Soon",
      });
    } else {
      setEditingDept("new");
      setFormData({
        name: "",
        desc: "",
        iconName: "Palette",
        status: "Registration Opening Soon",
      });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingDept === "new") {
        await createItem("/coming-soon", formData);
      } else {
        await updateItem("/coming-soon", editingDept._id, formData);
      }
      setEditingDept(null);
      await loadDepts();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this department?")) {
      await deleteItem("/coming-soon", id);
      await loadDepts();
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400">
            Expanding Departments
          </span>
          <h1 className="text-3xl font-black text-white mt-1">Coming Soon Departments Manager</h1>
        </div>
        <Button onClick={() => handleOpenForm(null)} size="sm" icon={Plus} className="cursor-pointer">
          Add Department
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {depts.map((dept) => (
          <div
            key={dept._id || dept.name}
            className="p-6 rounded-2xl bg-navy-900 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-mono text-gold-400 font-bold uppercase">Icon: {dept.iconName}</span>
                <span className="px-2 py-0.5 rounded bg-navy-950 text-gold-300 text-[10px]">
                  {dept.status}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-white">{dept.name}</h3>
              <p className="text-slate-400 leading-relaxed">{dept.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenForm(dept)}
                className="p-1.5 rounded-lg bg-navy-800 text-slate-300 hover:text-white"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(dept._id)}
                className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingDept && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-navy-900 border border-gold-500/40 p-6 space-y-6 text-white relative">
            <button
              onClick={() => setEditingDept(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold">
              {editingDept === "new" ? "Add Department" : "Edit Department"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Department Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cosmetology & Beauty"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Skincare, hair design..."
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Icon</label>
                  <select
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                  >
                    <option value="Palette">Palette</option>
                    <option value="Music">Music</option>
                    <option value="Camera">Camera</option>
                    <option value="Coffee">Coffee</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Status Badge</label>
                  <input
                    type="text"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" size="lg" icon={Save} className="w-full cursor-pointer" disabled={saving}>
                  {saving ? "Saving..." : "Save Department"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
