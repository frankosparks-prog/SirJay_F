"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Phone,
  Mail,
  Clock,
  Trash2,
  CheckCircle,
  RefreshCw,
  Search,
  Filter,
  Eye,
  X,
  Send,
  Calendar,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { getAdminApplications, patchItem, deleteItem } from "@/lib/api";

export default function AdminAdmissionsPage() {
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  const loadApplications = async () => {
    setLoading(true);
    const res = await getAdminApplications({ status: statusFilter });
    if (res && res.success && res.applications) {
      setApplications(res.applications);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadApplications();
  }, [statusFilter]);

  const filteredApps = applications.filter((app) => {
    const term = searchTerm.toLowerCase();
    return (
      app.fullName?.toLowerCase().includes(term) ||
      app.phone?.toLowerCase().includes(term) ||
      app.email?.toLowerCase().includes(term) ||
      app.intendedCourse?.toLowerCase().includes(term)
    );
  });

  const handleStatusChange = async (id, newStatus) => {
    await patchItem("/admissions", `${id}/status`, { status: newStatus });
    if (selectedApp && selectedApp._id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
    await loadApplications();
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this student application record?")) {
      await deleteItem("/admissions", id);
      if (selectedApp && selectedApp._id === id) setSelectedApp(null);
      await loadApplications();
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400">
            Admissions Desk Management
          </span>
          <h1 className="text-3xl font-black text-white mt-1">Student Online Applications Inbox</h1>
        </div>

        <button
          onClick={loadApplications}
          className="p-2.5 rounded-xl bg-navy-900 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-2 text-xs font-bold self-start cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh List
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl bg-navy-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {["All", "Pending", "Approved", "Contacted", "Rejected"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-gold-500 text-navy-950 font-extrabold shadow-md"
                  : "bg-navy-950 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search name, phone, course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-gold-400"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-navy-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-navy-950 text-gold-400 uppercase tracking-wider border-b border-slate-800 font-mono text-[11px]">
                <th className="py-4 px-5">Date</th>
                <th className="py-4 px-5">Applicant Name</th>
                <th className="py-4 px-5">Contact Details</th>
                <th className="py-4 px-5">Intended Program</th>
                <th className="py-4 px-5">Schedule & Level</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredApps.map((app) => (
                <tr key={app._id} className="hover:bg-navy-950/60 transition-colors">
                  <td className="py-4 px-5 text-slate-400 font-mono text-[11px]">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-5">
                    <div className="font-bold text-white text-sm">{app.fullName}</div>
                    <div className="text-[10px] text-slate-400">{app.educationLevel}</div>
                  </td>
                  <td className="py-4 px-5 space-y-1 text-slate-300">
                    <div className="flex items-center gap-1.5 font-bold text-gold-300">
                      <Phone className="w-3.5 h-3.5 text-gold-400" />
                      <a href={`tel:${app.phone}`} className="hover:underline">{app.phone}</a>
                    </div>
                    {app.email && (
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                        <Mail className="w-3 h-3" />
                        <span>{app.email}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-5 font-semibold text-white">{app.intendedCourse}</td>
                  <td className="py-4 px-5 text-slate-300">
                    <div>{app.preferredIntake}</div>
                    <div className="text-[10px] text-slate-400">{app.schedulePreference}</div>
                  </td>
                  <td className="py-4 px-5">
                    <select
                      value={app.status || "Pending"}
                      onChange={(e) => handleStatusChange(app._id, e.target.value)}
                      className={`px-3 py-1 rounded-xl text-xs font-extrabold border cursor-pointer ${
                        app.status === "Approved"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : app.status === "Contacted"
                          ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                          : app.status === "Rejected"
                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                          : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      <option value="Pending" className="bg-navy-900 text-white">Pending</option>
                      <option value="Contacted" className="bg-navy-900 text-white">Contacted</option>
                      <option value="Approved" className="bg-navy-900 text-white">Approved</option>
                      <option value="Rejected" className="bg-navy-900 text-white">Rejected</option>
                    </select>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-white"
                        title="View Full Application Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredApps.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No student applications match your filter or search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Inspection Drawer Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full rounded-3xl bg-navy-900 border border-gold-500/40 p-6 sm:p-8 space-y-6 text-white relative shadow-2xl">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-navy-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 border-b border-slate-800 pb-4">
              <span className="text-xs font-mono font-bold text-gold-400 uppercase tracking-widest block">
                Application Detail View
              </span>
              <h3 className="text-2xl font-black text-white">{selectedApp.fullName}</h3>
              <p className="text-xs text-slate-400 font-mono">
                Submitted on {new Date(selectedApp.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-navy-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 block font-bold">Phone Contact</span>
                <a href={`tel:${selectedApp.phone}`} className="font-extrabold text-gold-300 hover:underline">
                  {selectedApp.phone}
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-navy-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 block font-bold">Email Address</span>
                <span className="font-extrabold text-slate-200">{selectedApp.email || "N/A"}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-navy-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 block font-bold">Intended Program</span>
                <span className="font-extrabold text-white">{selectedApp.intendedCourse}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-navy-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 block font-bold">Prior Education</span>
                <span className="font-extrabold text-white">{selectedApp.educationLevel}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-navy-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 block font-bold">Intake Preference</span>
                <span className="font-extrabold text-white">{selectedApp.preferredIntake}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-navy-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 block font-bold">Class Schedule</span>
                <span className="font-extrabold text-white">{selectedApp.schedulePreference}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <a
                href={`tel:${selectedApp.phone}`}
                className="px-4 py-2.5 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs hover:bg-gold-400 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> Call Applicant
              </a>

              <Button onClick={() => setSelectedApp(null)} size="sm" variant="outline">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
