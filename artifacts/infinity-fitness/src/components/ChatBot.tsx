import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Dumbbell, Minus } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MSG: ChatMessage = {
  role: 'assistant',
  content:
    "Yo what's up champ! 💪 I'm IRON MIKE — your personal AI trainer from Infinity Fitness, Kaithal. Ask me about workouts, diet, supplements, or our membership plans. Let's build that body! 🔥",
};

function BodyBuilderIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="16" r="8" fill="currentColor" opacity="0.9"/>
      <path d="M20 28 C20 24 24 22 32 22 C40 22 44 24 44 28 L46 40 C46 42 44 44 42 44 L22 44 C20 44 18 42 18 40 Z" fill="currentColor" opacity="0.85"/>
      <rect x="8" y="26" width="8" height="4" rx="2" fill="currentColor" opacity="0.7"/>
      <rect x="48" y="26" width="8" height="4" rx="2" fill="currentColor" opacity="0.7"/>
      <rect x="6" y="24" width="4" height="8" rx="2" fill="currentColor" opacity="0.5"/>
      <rect x="54" y="24" width="4" height="8" rx="2" fill="currentColor" opacity="0.5"/>
      <rect x="24" y="46" width="6" height="12" rx="2" fill="currentColor" opacity="0.7"/>
      <rect x="34" y="46" width="6" height="12" rx="2" fill="currentColor" opacity="0.7"/>
    </svg>
  );
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Server busy right now, try again in a sec! 💪' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* ── FAB Button ── */}
      <motion.button
        onClick={() => { setOpen(!open); setMinimized(false); }}
        className="fixed bottom-24 right-6 z-50 group"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Open gym chat"
      >
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 flex items-center justify-center shadow-xl shadow-amber-500/30 border-2 border-amber-400/50">
          <Dumbbell className="w-7 h-7 text-black" strokeWidth={2.5} />
          {!open && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse" />
          )}
        </div>
        {!open && (
          <span className="absolute -top-10 right-0 bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap font-medium border border-white/10">
            Chat with Iron Mike 💪
          </span>
        )}
      </motion.button>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-40 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-black/60 flex flex-col"
            style={{ height: minimized ? '64px' : '520px', maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* ── Header ── */}
            <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-4 py-3 border-b border-amber-500/30">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h1v1H0z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
              <div className="relative flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center border-2 border-amber-400/60 shadow-lg shadow-amber-500/20">
                  <BodyBuilderIcon className="w-7 h-7 text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-display font-bold uppercase tracking-wider text-sm leading-tight">
                    Iron Mike
                  </h3>
                  <p className="text-amber-400/80 text-[11px] font-medium tracking-wide">
                    INFINITY FITNESS AI TRAINER
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setMinimized(!minimized)} className="w-7 h-7 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                    <Minus className="w-3.5 h-3.5 text-white/60" />
                  </button>
                  <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-md bg-white/5 hover:bg-red-500/20 flex items-center justify-center transition-colors">
                    <X className="w-3.5 h-3.5 text-white/60 hover:text-red-400" />
                  </button>
                </div>
              </div>
            </div>

            {!minimized && (
              <>
                {/* ── Messages ── */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-950 to-[#0a0a0a]">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                          <Dumbbell className="w-3.5 h-3.5 text-black" />
                        </div>
                      )}
                      <div
                        className={`max-w-[78%] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-black font-medium rounded-2xl rounded-br-md shadow-lg shadow-amber-500/10'
                            : 'bg-white/5 text-white/90 border border-white/5 rounded-2xl rounded-bl-md'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 mr-2">
                        <Dumbbell className="w-3.5 h-3.5 text-black" />
                      </div>
                      <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-bl-md">
                        <div className="flex gap-1.5 items-center">
                          <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* ── Input ── */}
                <div className="p-3 bg-gray-900 border-t border-white/5">
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder="Ask about workouts, diet..."
                      className="flex-1 bg-white/5 text-white text-sm rounded-xl px-4 py-3 outline-none placeholder:text-white/25 focus:ring-1 focus:ring-amber-500/40 border border-white/5 focus:border-amber-500/30 transition-colors"
                    />
                    <motion.button
                      onClick={send}
                      disabled={!input.trim() || loading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center hover:from-amber-400 hover:to-amber-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20"
                    >
                      <Send className="w-4 h-4 text-black" />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
