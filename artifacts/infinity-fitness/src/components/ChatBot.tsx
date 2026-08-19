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
    "Welcome to Infinity Fitness AI! 💪 I'm your personal trainer. Ask me anything about Workout, Diet, Supplements or Fitness!",
};

const QUICK_ACTIONS = [
  { icon: '💪', label: 'Workout Plan', query: 'Suggest me a workout plan' },
  { icon: '🍴', label: 'Diet & Nutrition', query: 'What should I eat for muscle gain?' },
  { icon: '🧴', label: 'Supplements', query: 'Which supplements should I take?' },
  { icon: '❓', label: 'Ask Anything', query: '' },
];

function MuscleCoachSVG({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 160" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <ellipse cx="60" cy="28" rx="16" ry="18" fill="#1a1a1a" />
      <ellipse cx="60" cy="28" rx="15" ry="17" fill="#2a2a2a" />
      {/* Hair */}
      <path d="M44 22 Q48 8 60 6 Q72 8 76 22 Q74 14 60 12 Q46 14 44 22Z" fill="#111" />
      {/* Eyes */}
      <ellipse cx="53" cy="27" rx="2.5" ry="2" fill="#ff6a00" />
      <ellipse cx="67" cy="27" rx="2.5" ry="2" fill="#ff6a00" />
      {/* Smile */}
      <path d="M52 35 Q60 42 68 35" stroke="#ff6a00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Neck */}
      <rect x="54" y="44" width="12" height="8" rx="3" fill="#1a1a1a" />
      {/* Torso - black tank top */}
      <path d="M38 52 L82 52 L86 110 L34 110 Z" fill="#111" rx="4" />
      <path d="M39 53 L81 53 L85 109 L35 109 Z" fill="#1a1a1a" />
      {/* Orange stripe */}
      <path d="M55 53 L65 53 L63 109 L57 109 Z" fill="#ff6a00" opacity="0.9" />
      {/* Infinity text */}
      <text x="60" y="85" textAnchor="middle" fill="#ff6a00" fontSize="6" fontWeight="bold" fontFamily="Arial">INFINITY</text>
      <text x="60" y="95" textAnchor="middle" fill="#ff6a00" fontSize="5" fontFamily="Arial">FITNESS</text>
      {/* Left arm - muscular */}
      <path d="M38 55 Q28 58 22 70 Q18 80 20 90 Q22 92 26 88 Q28 80 32 72 Q34 66 38 62Z" fill="#1a1a1a" />
      <ellipse cx="22" cy="72" rx="8" ry="10" fill="#111" opacity="0.3" />
      {/* Right arm - muscular */}
      <path d="M82 55 Q92 58 98 70 Q102 80 100 90 Q98 92 94 88 Q92 80 88 72 Q86 66 82 62Z" fill="#1a1a1a" />
      <ellipse cx="98" cy="72" rx="8" ry="10" fill="#111" opacity="0.3" />
      {/* Left bicep highlight */}
      <path d="M24 65 Q20 72 22 80" stroke="#ff6a00" strokeWidth="1" fill="none" opacity="0.4" />
      {/* Right bicep highlight */}
      <path d="M96 65 Q100 72 98 80" stroke="#ff6a00" strokeWidth="1" fill="none" opacity="0.4" />
      {/* Towel on shoulder */}
      <path d="M36 52 Q42 48 50 52" stroke="#ff6a00" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M70 52 Q78 48 84 52" stroke="#ff6a00" strokeWidth="2" fill="none" opacity="0.6" />
      {/* Left hand */}
      <ellipse cx="20" cy="92" rx="6" ry="5" fill="#1a1a1a" />
      {/* Right hand */}
      <ellipse cx="100" cy="92" rx="6" ry="5" fill="#1a1a1a" />
      {/* Shorts */}
      <path d="M35 110 L85 110 L82 135 L65 135 L60 118 L55 135 L38 135 Z" fill="#111" />
      {/* Orange stripe on shorts */}
      <path d="M35 110 L38 110 L38 135 L35 135 Z" fill="#ff6a00" opacity="0.8" />
      <path d="M82 110 L85 110 L85 135 L82 135 Z" fill="#ff6a00" opacity="0.8" />
      {/* Left leg */}
      <rect x="40" y="135" width="14" height="20" rx="5" fill="#1a1a1a" />
      {/* Right leg */}
      <rect x="66" y="135" width="14" height="20" rx="5" fill="#1a1a1a" />
      {/* Shoes */}
      <ellipse cx="47" cy="157" rx="10" ry="4" fill="#111" />
      <ellipse cx="73" cy="157" rx="10" ry="4" fill="#111" />
      {/* Shoe accent */}
      <path d="M38 157 L56 157" stroke="#ff6a00" strokeWidth="1" opacity="0.6" />
      <path d="M64 157 L82 157" stroke="#ff6a00" strokeWidth="1" opacity="0.6" />
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

  const send = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: msg };
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
      {/* ── 3D FAB Button with Coach ── */}
      <motion.button
        onClick={() => { setOpen(!open); setMinimized(false); }}
        className="fixed bottom-24 right-6 z-50 group"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Open Infinity Fitness AI Chat"
      >
        <div className="relative">
          {/* Neon glow ring */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 opacity-60 blur-md animate-pulse" />
          {/* 3D pedestal base */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-18 h-4 bg-gradient-to-b from-orange-600/30 to-transparent rounded-full blur-sm" />
          {/* Main button */}
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center shadow-2xl shadow-orange-500/30 border-2 border-orange-500/60 overflow-hidden">
            <MuscleCoachSVG className="w-12 h-14" />
            {/* Neon inner ring */}
            <div className="absolute inset-0 rounded-full border border-orange-500/20" />
          </div>
          {/* Online indicator */}
          {!open && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-black">
              <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-50" />
            </span>
          )}
        </div>
        {!open && (
          <span className="absolute -top-12 right-0 bg-gradient-to-r from-gray-900 to-black text-white text-xs px-4 py-2 rounded-xl whitespace-nowrap font-bold border border-orange-500/40 shadow-lg shadow-orange-500/20">
            💪 AI Fitness Coach
          </span>
        )}
      </motion.button>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.85 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed bottom-40 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] rounded-3xl overflow-hidden flex flex-col"
            style={{
              height: minimized ? '80px' : '580px',
              maxHeight: 'calc(100vh - 140px)',
              background: 'linear-gradient(145deg, rgba(15,15,15,0.97), rgba(5,5,5,0.99))',
              border: '1.5px solid rgba(255,106,0,0.35)',
              boxShadow: '0 0 40px rgba(255,106,0,0.15), 0 25px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* ── Header ── */}
            <div className="relative px-5 py-4 border-b border-orange-500/20">
              {/* Glassmorphism bg */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5" />
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(180deg, rgba(255,106,0,0.08) 0%, transparent 100%)',
              }} />

              <div className="relative flex items-center gap-3">
                {/* 3D Coach avatar */}
                <div className="relative">
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 opacity-40 blur-sm" />
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center border border-orange-500/40 overflow-hidden">
                    <MuscleCoachSVG className="w-10 h-12" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-gray-900" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold uppercase tracking-[0.15em] text-sm leading-tight"
                    style={{ textShadow: '0 0 20px rgba(255,106,0,0.3)' }}>
                    INFINITY FITNESS AI
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-400/80 text-[11px] font-semibold tracking-wide">Online</span>
                    <span className="text-white/30 text-[11px]">•</span>
                    <span className="text-orange-400/60 text-[11px] font-medium tracking-wide">Gym & Diet Chatbot</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button onClick={() => setMinimized(!minimized)}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5">
                    <Minus className="w-4 h-4 text-white/50" />
                  </button>
                  <button onClick={() => setOpen(false)}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center transition-colors border border-white/5">
                    <X className="w-4 h-4 text-white/50 hover:text-red-400" />
                  </button>
                </div>
              </div>
            </div>

            {!minimized && (
              <>
                {/* ── Messages ── */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
                  style={{ background: 'linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(5,5,5,1) 100%)' }}>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="relative mr-2.5 flex-shrink-0 mt-1">
                          <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 opacity-30 blur-sm" />
                          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-gray-900 to-black flex items-center justify-center border border-orange-500/30 overflow-hidden">
                            <MuscleCoachSVG className="w-6 h-8" />
                          </div>
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] px-4 py-3 text-[13px] leading-relaxed ${
                          msg.role === 'user'
                            ? 'text-white font-medium rounded-2xl rounded-br-lg'
                            : 'text-white/90 rounded-2xl rounded-bl-lg'
                        }`}
                        style={msg.role === 'user' ? {
                          background: 'linear-gradient(135deg, #ff6a00, #e85d00)',
                          boxShadow: '0 4px 20px rgba(255,106,0,0.25)',
                        } : {
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className="relative mr-2.5 flex-shrink-0">
                        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 opacity-30 blur-sm" />
                        <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-gray-900 to-black flex items-center justify-center border border-orange-500/30 overflow-hidden">
                          <MuscleCoachSVG className="w-6 h-8" />
                        </div>
                      </div>
                      <div className="px-4 py-3 rounded-2xl rounded-bl-lg"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="flex gap-1.5 items-center">
                          <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* ── Quick Action Buttons ── */}
                {messages.length <= 1 && (
                  <div className="px-4 pb-3 grid grid-cols-2 gap-2">
                    {QUICK_ACTIONS.map((action, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        onClick={() => { if (action.query) send(action.query); }}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all hover:scale-[1.02]"
                        style={{
                          background: 'rgba(255,106,0,0.06)',
                          border: '1px solid rgba(255,106,0,0.15)',
                        }}
                      >
                        <span className="text-lg">{action.icon}</span>
                        <span className="text-white/80 text-[12px] font-medium">{action.label}</span>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* ── Input ── */}
                <div className="px-4 pb-4 pt-2">
                  <div className="flex gap-2 items-center p-1.5 rounded-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder="Type your question..."
                      className="flex-1 bg-transparent text-white text-sm px-3 py-2.5 outline-none placeholder:text-white/20"
                    />
                    <motion.button
                      onClick={() => send()}
                      disabled={!input.trim() || loading}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      style={{
                        background: input.trim()
                          ? 'linear-gradient(135deg, #ff6a00, #e85d00)'
                          : 'rgba(255,106,0,0.15)',
                        boxShadow: input.trim() ? '0 4px 20px rgba(255,106,0,0.3)' : 'none',
                      }}
                    >
                      <Send className="w-4 h-4 text-white" />
                    </motion.button>
                  </div>
                </div>
              </>
            )}

            {/* ── Bottom glow line ── */}
            <div className="h-[1px] w-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,106,0,0.4), transparent)' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
