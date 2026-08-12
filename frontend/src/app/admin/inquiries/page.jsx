"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, CheckCircle2, Trash2, Clock, RefreshCw } from "lucide-react";
import { getAdminInquiries, patchItem, deleteItem } from "@/lib/api";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadInquiries = async () => {
    setLoading(true);
    const res = await getAdminInquiries();
    if (res && res.success && res.inquiries) {
      setInquiries(res.inquiries);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleMarkRead = async (id) => {
    await patchItem("/contact/inquiries", `${id}/read`, {});
    await loadInquiries();
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this inquiry message?")) {
      await deleteItem("/contact/inquiries", id);
      await loadInquiries();
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400">
            Contact Us Messages
          </span>
          <h1 className="text-3xl font-black text-white mt-1">Contact Inquiries Inbox</h1>
        </div>
        <button
          onClick={loadInquiries}
          className="p-2 rounded-xl bg-navy-900 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-2 text-xs font-bold self-start"
        >
          <RefreshCw className="w-4 h-4" /> Refresh Inbox
        </button>
      </div>

      <div className="space-y-4">
        {inquiries.map((msg) => (
          <div
            key={msg._id}
            className={`p-6 rounded-2xl border transition-colors space-y-3 ${
              msg.isRead
                ? "bg-navy-900/60 border-slate-800 text-slate-300"
                : "bg-navy-900 border-gold-500/40 text-white shadow-xl"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-base text-white">{msg.fullName}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 font-bold">
                  {msg.courseOfInterest}
                </span>
                {!msg.isRead && (
                  <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                    New Unread
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="font-mono text-[11px]">{new Date(msg.createdAt).toLocaleString()}</span>
                <div className="flex items-center gap-2">
                  {!msg.isRead && (
                    <button
                      onClick={() => handleMarkRead(msg._id)}
                      className="px-2.5 py-1 rounded-lg bg-navy-800 text-gold-400 hover:bg-gold-500 hover:text-navy-950 font-bold text-xs"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex flex-wrap items-center gap-4 text-slate-300">
                <div className="flex items-center gap-1.5 font-bold text-gold-300">
                  <Phone className="w-3.5 h-3.5" />
                  <a href={`tel:${msg.phone}`} className="hover:underline">{msg.phone}</a>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Mail className="w-3.5 h-3.5" />
                  <a href={`mailto:${msg.email}`} className="hover:underline">{msg.email}</a>
                </div>
              </div>

              <p className="p-4 rounded-xl bg-navy-950 text-slate-200 leading-relaxed font-normal border border-slate-800">
                {msg.message}
              </p>
            </div>
          </div>
        ))}

        {inquiries.length === 0 && (
          <div className="p-12 text-center text-slate-500 bg-navy-900 border border-slate-800 rounded-3xl">
            No contact inquiries received yet.
          </div>
        )}
      </div>
    </div>
  );
}
