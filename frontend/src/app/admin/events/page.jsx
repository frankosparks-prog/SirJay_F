"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  X,
  Save,
  Calendar,
  MessageCircle,
  Clock,
  MapPin,
  Send,
  ExternalLink,
  Search,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { getEvents, createItem, updateItem, deleteItem, getAdminRSVPs } from "@/lib/api";

export default function AdminEventsPage() {
  const [activeTab, setActiveTab] = useState("events"); // 'events' or 'rsvps'
  const [events, setEvents] = useState([]);
  const [rsvps, setRsvps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    category: "Exhibition",
    badge: "Featured Event",
    description: "",
  });
  const [saving, setSaving] = useState(false);

  const loadEvents = async () => {
    const data = await getEvents();
    if (data) setEvents(data);
  };

  const loadRSVPs = async () => {
    const res = await getAdminRSVPs();
    if (res && res.success && res.rsvps) setRsvps(res.rsvps);
  };

  useEffect(() => {
    loadEvents();
    loadRSVPs();
  }, []);

  const filteredRSVPs = rsvps.filter((r) => {
    const term = searchTerm.toLowerCase();
    return (
      r.fullName?.toLowerCase().includes(term) ||
      r.whatsappNumber?.toLowerCase().includes(term) ||
      r.eventTitle?.toLowerCase().includes(term)
    );
  });

  const handleOpenForm = (item = null) => {
    if (item) {
      setEditingEvent(item);
      setFormData({
        title: item.title,
        date: item.date,
        time: item.time,
        location: item.location,
        category: item.category || "Exhibition",
        badge: item.badge || "Featured Event",
        description: item.description,
      });
    } else {
      setEditingEvent("new");
      setFormData({
        title: "",
        date: "May 15, 2025",
        time: "10:00 AM - 2:00 PM",
        location: "Sir Jay Main Auditorium, Nanyuki",
        category: "Exhibition",
        badge: "Featured Event",
        description: "",
      });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingEvent === "new") {
        await createItem("/events", formData);
      } else {
        await updateItem("/events", editingEvent._id, formData);
      }
      setEditingEvent(null);
      await loadEvents();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this event and its RSVPs?")) {
      await deleteItem("/events", id);
      await loadEvents();
      await loadRSVPs();
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400">
            News & Campus Events Desk
          </span>
          <h1 className="text-3xl font-black text-white mt-1">Campus Events & WhatsApp RSVPs</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-2xl bg-navy-900 border border-slate-800 p-1">
            <button
              onClick={() => setActiveTab("events")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "events" ? "bg-gold-500 text-navy-950 shadow-md font-extrabold" : "text-slate-400 hover:text-white"
              }`}
            >
              Events ({events.length})
            </button>
            <button
              onClick={() => setActiveTab("rsvps")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "rsvps" ? "bg-gold-500 text-navy-950 shadow-md font-extrabold" : "text-slate-400 hover:text-white"
              }`}
            >
              WhatsApp RSVPs ({rsvps.length})
            </button>
          </div>

          {activeTab === "events" && (
            <Button onClick={() => handleOpenForm(null)} size="sm" icon={Plus} className="cursor-pointer">
              Add Event
            </Button>
          )}
        </div>
      </div>

      {activeTab === "events" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((evt) => (
            <div
              key={evt._id || evt.id}
              className="p-6 rounded-3xl bg-navy-900 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4 hover:border-gold-500/40 transition-colors"
            >
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-1 rounded-full bg-navy-950 text-gold-400 font-bold border border-gold-500/30">
                    {evt.category}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">{evt.badge}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-gold-300 font-bold block text-sm">{evt.date}</span>
                  <h3 className="text-lg font-extrabold text-white">{evt.title}</h3>
                </div>

                <p className="text-slate-400 leading-relaxed line-clamp-3">{evt.description}</p>

                <div className="text-[11px] text-slate-400 space-y-1.5 pt-3 border-t border-slate-800 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <span>{evt.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenForm(evt)}
                  className="p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-white"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(evt._id)}
                  className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "rsvps" && (
        <div className="space-y-4">
          <div className="p-4 rounded-3xl bg-navy-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-gold-400 font-bold">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>Event Attendee Reach Out (Total: {rsvps.length} RSVPs)</span>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search attendee or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          <div className="bg-navy-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-navy-950 text-gold-400 uppercase tracking-wider border-b border-slate-800 font-mono text-[11px]">
                    <th className="py-4 px-5">Date</th>
                    <th className="py-4 px-5">Event Title</th>
                    <th className="py-4 px-5">Attendee Name</th>
                    <th className="py-4 px-5">WhatsApp Contact</th>
                    <th className="py-4 px-5">Email</th>
                    <th className="py-4 px-5 text-right">Direct Reach Out</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredRSVPs.map((r) => {
                    const cleanPhone = r.whatsappNumber ? r.whatsappNumber.replace(/[^0-9]/g, "") : "";
                    const waText = encodeURIComponent(
                      `Hello ${r.fullName}, thank you for registering for "${r.eventTitle}" at Sir Jay Training Institute!`
                    );
                    const waUrl = `https://wa.me/${cleanPhone}?text=${waText}`;

                    return (
                      <tr key={r._id} className="hover:bg-navy-950/60 transition-colors">
                        <td className="py-4 px-5 text-slate-400 font-mono text-[11px]">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-5 font-extrabold text-white">{r.eventTitle}</td>
                        <td className="py-4 px-5 font-bold text-slate-200 text-sm">{r.fullName}</td>
                        <td className="py-4 px-5 font-mono text-emerald-400 font-bold">
                          {r.whatsappNumber}
                        </td>
                        <td className="py-4 px-5 text-slate-400">{r.email || "N/A"}</td>
                        <td className="py-4 px-5 text-right">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 hover:bg-emerald-500 hover:text-navy-950 transition-colors text-xs"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Chat on WhatsApp ↗
                          </a>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredRSVPs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500">
                        No event RSVPs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {editingEvent && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-navy-900 border border-gold-500/40 p-6 space-y-6 text-white relative shadow-2xl">
            <button
              onClick={() => setEditingEvent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold">
              {editingEvent === "new" ? "Add Campus Event" : "Edit Campus Event"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sir Jay Nanyuki Fashion Showcase"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Date *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. April 28, 2025"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Time *</label>
                  <input
                    type="text"
                    required
                    placeholder="2:00 PM - 6:00 PM"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Location *</label>
                <input
                  type="text"
                  required
                  placeholder="Sir Jay Main Auditorium, Nanyuki"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Badge Tag</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Full details of event..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                ></textarea>
              </div>

              <div className="pt-2">
                <Button type="submit" size="lg" icon={Save} className="w-full cursor-pointer" disabled={saving}>
                  {saving ? "Saving..." : "Save Event"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
