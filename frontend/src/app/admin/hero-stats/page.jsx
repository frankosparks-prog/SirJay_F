"use client";

import { useState, useEffect } from "react";
import { Zap, Save, Plus, Trash2, CheckCircle2, Eye, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Counter from "@/components/ui/Counter";
import { getHeroConfig, updateHeroConfig } from "@/lib/api";

export default function AdminHeroStatsPage() {
  const [badgeText, setBadgeText] = useState("Admissions Open for 2025/2026");
  const [badgeActive, setBadgeActive] = useState(true);
  const [stats, setStats] = useState([
    { label: "Graduated Alumni", value: "1,800", suffix: "+", iconName: "Users" },
    { label: "Professional Courses", value: "16", suffix: "+", iconName: "GraduationCap" },
    { label: "Self-Employment Rate", value: "95", suffix: "%", iconName: "Briefcase" },
    { label: "Practical Workshop Access", value: "100", suffix: "%", iconName: "TrendingUp" },
  ]);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    async function loadConfig() {
      const hero = await getHeroConfig();
      if (hero) {
        if (hero.announcementBadgeText) setBadgeText(hero.announcementBadgeText);
        if (hero.announcementActive !== undefined) setBadgeActive(hero.announcementActive);
        if (hero.stats && hero.stats.length > 0) setStats(hero.stats);
      }
    }
    loadConfig();
  }, []);

  const handleStatChange = (index, field, val) => {
    const updated = [...stats];
    updated[index][field] = val;
    setStats(updated);
  };

  const handleAddStat = () => {
    setStats([...stats, { label: "New Metric", value: "100", suffix: "+", iconName: "Award" }]);
  };

  const handleRemoveStat = (index) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    try {
      const res = await updateHeroConfig({
        announcementBadgeText: badgeText,
        announcementActive: badgeActive,
        stats,
      });
      if (res && res.success) {
        setSuccessMsg("Hero Pill & Stats Counters updated successfully!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400">
          Home Page Customization
        </span>
        <h1 className="text-3xl font-black text-white mt-1">Hero Announcement & Stats Manager</h1>
        <p className="text-xs text-slate-400 mt-1">
          Update the top announcement pill notification and homepage counter numbers in real time.
        </p>
      </div>

      {/* LIVE VISUAL PREVIEW BOX */}
      <div className="p-8 rounded-3xl bg-navy-950 border border-gold-500/30 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest flex items-center gap-2">
            <Eye className="w-4 h-4 text-gold-400" /> Live Website Visual Preview
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Homepage Banner Rendering</span>
        </div>

        {/* Live Pill Preview */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-navy-900/90 text-gold-300 text-xs md:text-sm font-semibold shadow-2xl border border-gold-500/40">
            <Zap className="w-4 h-4 text-gold-400 animate-pulse" />
            <span>{badgeText}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </div>

        {/* Live Counter Stats Grid Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white text-navy-950 shadow-xl">
          {stats.map((st, i) => (
            <div key={i} className="text-center space-y-1">
              <div className="text-2xl font-black text-navy-900">
                {st.value}{st.suffix}
              </div>
              <div className="text-[11px] text-slate-600 font-medium">{st.label}</div>
            </div>
          ))}
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Announcement Pill */}
        <div className="p-6 rounded-3xl bg-navy-900 border border-slate-800 space-y-4 shadow-xl">
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-gold-400" />
            Announcement Pill Settings
          </h3>

          <div className="space-y-2 text-xs">
            <label className="font-bold text-slate-300">Pill Notification Text</label>
            <input
              type="text"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-gold-400 font-semibold"
            />
          </div>
        </div>

        {/* Section 2: Counter Stats */}
        <div className="p-6 rounded-3xl bg-navy-900 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-white">Homepage Counter Stats ({stats.length})</h3>
            <button
              type="button"
              onClick={handleAddStat}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-800 text-gold-400 hover:bg-gold-500 hover:text-navy-950 font-bold text-xs transition-colors cursor-pointer border border-gold-500/30"
            >
              <Plus className="w-4 h-4" /> Add Metric Counter
            </button>
          </div>

          <div className="space-y-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-navy-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center text-xs"
              >
                <div>
                  <label className="text-slate-400 block mb-1">Metric Label</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-slate-700 text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Value (Number)</label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(idx, "value", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-slate-700 text-white font-bold"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Suffix (+ / %)</label>
                  <input
                    type="text"
                    value={stat.suffix}
                    onChange={(e) => handleStatChange(idx, "suffix", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-slate-700 text-white font-bold"
                  />
                </div>

                <div className="flex items-center justify-between gap-2 pt-4 sm:pt-0">
                  <div>
                    <label className="text-slate-400 block mb-1">Icon Identifier</label>
                    <select
                      value={stat.iconName || "Users"}
                      onChange={(e) => handleStatChange(idx, "iconName", e.target.value)}
                      className="px-3 py-2 rounded-lg bg-navy-900 border border-slate-700 text-white"
                    >
                      <option value="Users">Users</option>
                      <option value="GraduationCap">GraduationCap</option>
                      <option value="Briefcase">Briefcase</option>
                      <option value="TrendingUp">TrendingUp</option>
                      <option value="Award">Award</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveStat(idx)}
                    className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" size="lg" icon={Save} disabled={saving} className="cursor-pointer">
          {saving ? "Saving Settings..." : "Save Hero Settings"}
        </Button>
      </form>
    </div>
  );
}
