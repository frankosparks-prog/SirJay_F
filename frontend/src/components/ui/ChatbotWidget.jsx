"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Zap, User, ShieldCheck } from "lucide-react";

const faqData = [
  {
    question: "When is the next intake?",
    answer: "Our major intakes occur in January, May, and September, with ongoing rolling admissions for fashion workshops."
  },
  {
    question: "What courses are offered?",
    answer: "Sir Jay School of Fashion Design (Beginner to Professional), Trade Test Artisan Level 3, Level 4 Cert, Level 5 Craft, and Level 6 Diploma."
  },
  {
    question: "Where is the Nanyuki campus?",
    answer: "Hospital Road, Off Nyeri-Nanyuki Highway, near Cedar Mall Area in Nanyuki Town."
  },
  {
    question: "What are the learning schedules?",
    answer: "Day Classes (9am-5pm), Evening Classes (5:30pm-8pm), and Saturday Weekend Classes (10am-3pm)."
  }
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! Welcome to Sir Jay Training Institute. I'm Sarah from the Admissions Desk. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const newMessages = [...messages, { sender: "user", text: query }];
    setMessages(newMessages);
    setInput("");

    // Simulate humanized support response
    setTimeout(() => {
      const match = faqData.find(f => query.toLowerCase().includes(f.question.toLowerCase().slice(0, 10)));
      const reply = match
        ? match.answer
        : "Thank you for reaching out! You can also reach our admissions desk directly at +254 719 185 821 or visit us on Hospital Road, Nanyuki.";

      setMessages(prev => [...prev, { sender: "bot", text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-navy-900 to-navy-800 text-white shadow-2xl border border-gold-500/40 hover:border-gold-400 group cursor-pointer"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gold-400/50 flex items-center justify-center bg-white shrink-0">
              <Image
                src="/SJLogo.jpeg"
                alt="Sir Jay Logo"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-navy-900"></span>
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold text-white flex items-center gap-1">
              Ask Sir Jay Desk <Zap className="w-3 h-3 text-gold-400" />
            </div>
            <div className="text-[10px] text-slate-300">Online Help Assistant</div>
          </div>
          <MessageSquare className="w-5 h-5 text-gold-400" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-[340px] sm:w-[380px] h-[480px] rounded-3xl glass-panel-dark shadow-2xl flex flex-col overflow-hidden border border-gold-500/30"
          >
            {/* Window Header */}
            <div className="p-4 bg-navy-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-gold-400/50 flex items-center justify-center bg-white shrink-0">
                    <Image
                      src="/SJLogo.jpeg"
                      alt="Sir Jay Logo"
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-navy-900"></span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Sarah • Admissions Desk
                  </h4>
                  <p className="text-[10px] text-gold-300 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> TVETA Certified Support
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-navy-950/60">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gold-500 text-navy-950 font-medium rounded-br-none"
                        : "bg-navy-800 text-slate-100 border border-slate-700/60 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Question Chips */}
            <div className="p-2.5 bg-navy-900/90 border-t border-slate-800 flex gap-2 overflow-x-auto text-[11px] scrollbar-none">
              {faqData.map((faq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(faq.question)}
                  className="px-2.5 py-1 rounded-full bg-navy-800 text-gold-300 border border-gold-500/20 hover:bg-gold-500 hover:text-navy-950 whitespace-nowrap transition-colors shrink-0"
                >
                  {faq.question}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-navy-900 border-t border-slate-800 flex items-center gap-2 text-xs"
            >
              <input
                type="text"
                placeholder="Ask about courses, fees, intakes..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-gold-500 text-navy-950 font-bold hover:bg-gold-400"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
