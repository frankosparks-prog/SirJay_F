"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, X, Save, MessageSquare, Bot, Send, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { getFAQs, createItem, updateItem, deleteItem } from "@/lib/api";

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState([]);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    order: 1,
  });
  const [saving, setSaving] = useState(false);

  // Chatbot Simulator state
  const [testInput, setTestInput] = useState("");
  const [testReply, setTestReply] = useState(null);

  const loadFaqs = async () => {
    const data = await getFAQs();
    if (data) setFaqs(data);
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const handleTestChatbot = (e) => {
    e.preventDefault();
    if (!testInput.trim()) return;
    const match = faqs.find((f) =>
      testInput.toLowerCase().includes(f.question.toLowerCase().slice(0, 10))
    );
    if (match) {
      setTestReply(match.answer);
    } else {
      setTestReply(
        "Thank you for reaching out! You can also reach our admissions desk directly at +254 719 185 821 or visit us on Hospital Road, Nanyuki."
      );
    }
  };

  const handleOpenForm = (item = null) => {
    if (item) {
      setEditingFaq(item);
      setFormData({
        question: item.question,
        answer: item.answer,
        order: item.order || 1,
      });
    } else {
      setEditingFaq("new");
      setFormData({
        question: "",
        answer: "",
        order: faqs.length + 1,
      });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingFaq === "new") {
        await createItem("/faqs", formData);
      } else {
        await updateItem("/faqs", editingFaq._id, formData);
      }
      setEditingFaq(null);
      await loadFaqs();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this Chatbot FAQ response?")) {
      await deleteItem("/faqs", id);
      await loadFaqs();
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400">
            Admissions Chatbot Management
          </span>
          <h1 className="text-3xl font-black text-white mt-1">Chatbot FAQ Knowledge Base</h1>
        </div>
        <Button onClick={() => handleOpenForm(null)} size="sm" icon={Plus} className="cursor-pointer">
          Add New Question
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FAQs List (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq._id || faq.question}
              className="p-6 rounded-3xl bg-navy-900 border border-slate-800 shadow-xl flex items-start justify-between gap-4 hover:border-gold-500/40 transition-colors"
            >
              <div className="space-y-3 text-xs flex-1">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gold-400 shrink-0" />
                  <h3 className="text-base font-extrabold text-white">{faq.question}</h3>
                </div>
                <p className="p-4 rounded-2xl bg-navy-950 text-slate-200 leading-relaxed font-normal border border-slate-800">
                  {faq.answer}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenForm(faq)}
                  className="p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-white"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(faq._id)}
                  className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {faqs.length === 0 && (
            <div className="p-12 text-center text-slate-500 bg-navy-900 border border-slate-800 rounded-3xl">
              No chatbot FAQs created yet. Click "Add New Question" above.
            </div>
          )}
        </div>

        {/* Live Chatbot Simulator Sidebar */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-navy-900 border border-gold-500/30 shadow-2xl space-y-4 relative overflow-hidden">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Bot className="w-5 h-5 text-gold-400" />
              <h3 className="text-sm font-extrabold text-white">Live Chatbot Simulator</h3>
            </div>

            <p className="text-xs text-slate-400">
              Test how Sarah (Admissions Chatbot) responds to student inquiries using your saved FAQs database.
            </p>

            <form onSubmit={handleTestChatbot} className="space-y-3">
              <input
                type="text"
                placeholder="Type question e.g. intake dates?"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-gold-400"
              />
              <Button type="submit" size="sm" icon={Send} className="w-full cursor-pointer">
                Test Reply
              </Button>
            </form>

            {testReply && (
              <div className="p-4 rounded-2xl bg-navy-950 border border-slate-800 space-y-2 text-xs">
                <span className="text-[10px] font-mono font-bold text-gold-400 uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-gold-400" /> Simulated Bot Reply
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">{testReply}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {editingFaq && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-navy-900 border border-gold-500/40 p-6 space-y-6 text-white relative shadow-2xl">
            <button
              onClick={() => setEditingFaq(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-navy-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold">
              {editingFaq === "new" ? "Add Chatbot FAQ" : "Edit Chatbot FAQ"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Question Prompt *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. When is the next intake?"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Automated Reply *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Official answer given by Chatbot..."
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white"
                ></textarea>
              </div>

              <div className="pt-2">
                <Button type="submit" size="lg" icon={Save} className="w-full cursor-pointer" disabled={saving}>
                  {saving ? "Saving..." : "Save FAQ"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
