import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Volume2, VolumeX, Minus } from 'lucide-react';
import { API_BASE } from '@/lib/apiBase';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MSG: ChatMessage = {
  role: 'assistant',
  content: "Hey! I'm your AI Fitness Coach. Ask me anything about workouts, diet, supplements, or gym plans!",
};

const QUICK_ACTIONS = [
  { icon: '💪', label: 'Workout Plan', query: 'Give me a workout plan' },
  { icon: '🍎', label: 'Diet & Nutrition', query: 'What should I eat for muscle gain?' },
  { icon: '🧴', label: 'Supplements', query: 'Which supplements should I take?' },
  { icon: '❓', label: 'Ask Anything', query: '' },
];

function AvatarSVG({ size = 'normal' }: { size?: 'small' | 'normal' }) {
  const s = size === 'small' ? 32 : 56;
  const fontSize = size === 'small' ? 20 : 36;
  return (
    <svg viewBox="0 0 100 100" width={s} height={s} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bg-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6a00" />
          <stop offset="100%" stopColor="#ff3d00" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#bg-${size})`} />
      <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <text x="50" y="58" textAnchor="middle" dominantBaseline="central" fontSize={fontSize}>💪</text>
    </svg>
  );
}

const HINGLISH_WORDS = [
  // verbs / helpers
  'hai', 'hain', 'ho', 'hu', 'hun', 'hoon', 'thi', 'tha',
  'raha', 'rahi', 'rahe', 'hoga', 'hogi', 'honge',
  // pronouns
  'aap', 'ap', 'tum', 'tu', 'tera', 'teri', 'tere',
  'mera', 'meri', 'mere', 'mujhe', 'muje', 'hum', 'apna', 'apni', 'apne',
  // question words
  'kya', 'kyu', 'kyun', 'kyunki', 'ku', 'kab', 'kb', 'kaha', 'kahan',
  'kaise', 'kaisa', 'kaisi', 'kaun', 'kitna', 'kitne', 'kitni',
  // kar-family
  'kar', 'karo', 'kardo', 'karde', 'karna', 'karta', 'karti', 'karte',
  'karein', 'kriye', 'kiya', 'kia',
  // negation / affirmation
  'nahi', 'nahin', 'nhi', 'na', 'haan', 'han', 'ji', 'bilkul', 'zaroor',
  // common adjectives / responses
  'acha', 'achha', 'accha', 'theek', 'thik',
  'chahiye', 'chaiye', 'cahiye', 'chahta', 'chahti', 'chahte',
  // address / social
  'bhai', 'bhaiya', 'bhen', 'didi', 'yaar', 'dost',
  // connectors / misc
  'aur', 'lekin', 'magar', 'sab', 'kuch', 'bahut', 'bohot', 'bohat',
  'abhi', 'phir', 'fir', 'bhi', 'toh', 'bas', 'jaldi', 'turant', 'zyada',
  // imperative verbs
  'batao', 'bata', 'bolo', 'bol', 'suna', 'suno', 'dekho',
  'dedo', 'dijiye', 'dena', 'lena', 'lelo', 'lana', 'laao',
  'mila', 'milega', 'mangta', 'mangti', 'chal', 'chalega', 'shuru',
  'sakta', 'sakti', 'sakte', 'banao', 'bana',
  // suffix-like common words
  'wala', 'wali', 'wale', 'waala', 'waali',
  'matlab', 'tarah', 'liye', 'saath', 'baad', 'paani', 'khana', 'sona', 'jaag',
];

const detectLang = (text: string): string => {
  // Devanagari script → definitely Hindi
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  // Roman script → look for known Hindi/Hinglish words (word-boundary match)
  const words = text.toLowerCase().split(/[^a-z]+/).filter(Boolean);
  const hasHinglish = words.some((w) => HINGLISH_WORDS.includes(w));
  return hasHinglish ? 'hi' : 'en';
};

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [muted, setMuted] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<ChatMessage[]>([WELCOME_MSG]);
  const ttsAbortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => { messagesEndRef.current = messages; }, [messages]);

  useEffect(() => {
    if (!open && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setSpeaking(false);
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!open) return;
      const target = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(target) && fabRef.current && !fabRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const speak = async (text: string, userText?: string) => {
    if (muted || !text) return;
    if (ttsAbortRef.current) ttsAbortRef.current.abort();
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    const lang = userText ? detectLang(userText) : 'en';
    const controller = new AbortController();
    ttsAbortRef.current = controller;
    try {
      setSpeaking(true);
      const res = await fetch(`${API_BASE}/api/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, lang }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) { setSpeaking(false); return; }
      const reader = res.body.getReader();
      const chunks: Uint8Array[] = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }
      if (controller.signal.aborted) return;
      const blob = new Blob(chunks as BlobPart[], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => { setSpeaking(false); URL.revokeObjectURL(url); };
      audio.onerror = () => { setSpeaking(false); URL.revokeObjectURL(url); };
      await audio.play();
    } catch (err: any) {
      if (err?.name !== 'AbortError') setSpeaking(false);
    }
  };

  const send = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    const userMsg: ChatMessage = { role: 'user', content: msg };
    const updated = [...messagesEndRef.current, userMsg];
    messagesEndRef.current = updated;
    setMessages(updated);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated.map(m => ({ role: m.role, content: m.content })) }),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      const reply = data.reply;
      const final = [...updated, { role: 'assistant' as const, content: reply }];
      messagesEndRef.current = final;
      setMessages(final);
      speak(reply, msg);
    } catch {
      const e = [...updated, { role: 'assistant' as const, content: 'Server busy right now, try again!' }];
      messagesEndRef.current = e;
      setMessages(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleMute = useCallback(() => {
    setMuted(prev => {
      if (!prev && audioRef.current) { audioRef.current.pause(); setSpeaking(false); }
      return !prev;
    });
  }, []);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* FAB */}
      <motion.div ref={fabRef} className="fixed bottom-24 md:bottom-32 right-6 z-50"
        animate={open ? {} : { y: [0, -8, 0] }}
        transition={open ? {} : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
        <motion.button
          onClick={() => { setOpen(!open); setMinimized(false); }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="relative group"
          aria-label="Open AI Fitness Coach"
        >
          {/* Animated rings — decorative only, click nahi pakadne chahiye */}
          <div className="absolute -inset-6 rounded-full opacity-30 pointer-events-none" style={{ border: '2px solid #ff6a00', animation: 'ping 3s cubic-bezier(0,0,0.2,1) infinite' }} />
          <div className="absolute -inset-4 rounded-full opacity-20 pointer-events-none" style={{ border: '1.5px solid #ff8c33', animation: 'ping 3s cubic-bezier(0,0,0.2,1) infinite 0.5s' }} />
          {/* Glow — filter blur ki jagah radial gradient (bobbing parent par
              blur layer har frame re-rasterize hota tha; dikhne me same) */}
          <div className="absolute -inset-3 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.38) 0%, rgba(255,106,0,0.1) 45%, transparent 72%)' }} />
          {/* Button */}
          <div className="relative w-16 h-16 rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
              boxShadow: '0 0 40px rgba(255,106,0,0.35), 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
              border: '1.5px solid rgba(255,106,0,0.3)',
            }}>
            <AvatarSVG />
          </div>
          {/* Pulse dot */}
          {!open && (
            <span className="absolute top-0 right-0 w-4 h-4 rounded-full" style={{ background: '#22c55e', border: '2.5px solid #0a0a0a', boxShadow: '0 0 8px rgba(34,197,94,0.5)' }}>
              <span className="absolute inset-0 rounded-full animate-ping opacity-60" style={{ background: '#22c55e' }} />
            </span>
          )}
          {/* Tooltip */}
          {!open && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
              className="absolute -top-12 right-0 whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, rgba(26,26,26,0.95), rgba(10,10,10,0.95))',
                border: '1px solid rgba(255,106,0,0.25)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.6), 0 0 20px rgba(255,106,0,0.1)',
                backdropFilter: 'blur(20px)',
              }}>
              <span className="mr-1.5">💪</span>AI Fitness Coach
              <div className="absolute -bottom-1 right-6 w-2 h-2 rotate-45"
                style={{ background: 'rgba(10,10,10,0.95)', borderRight: '1px solid rgba(255,106,0,0.25)', borderBottom: '1px solid rgba(255,106,0,0.25)' }} />
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div ref={panelRef}
            initial={{ opacity: 0, y: 60, scale: 0.8, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 60, scale: 0.8, rotateX: 20 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300, mass: 0.8 }}
            className="fixed bottom-40 md:bottom-52 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] rounded-3xl overflow-hidden flex flex-col"
            style={{
              height: minimized ? '72px' : '600px',
              maxHeight: 'calc(100vh - 140px)',
              perspective: '1200px',
            }}
          >
            {/* Gradient border glow */}
            <div className="absolute -inset-[1px] rounded-3xl pointer-events-none" style={{
              background: 'linear-gradient(135deg, rgba(255,106,0,0.5), rgba(255,61,0,0.3), rgba(255,140,51,0.4), rgba(255,106,0,0.2))',
              filter: 'blur(0.5px)',
            }} />

            {/* Glass panel */}
            <div className="absolute inset-0 rounded-3xl" style={{
              background: 'linear-gradient(160deg, rgba(18,18,22,0.97) 0%, rgba(10,10,14,0.99) 40%, rgba(6,6,10,1) 100%)',
              backdropFilter: 'blur(50px) saturate(150%)',
            }} />

            {/* Animated mesh gradient bg */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 opacity-[0.03]"
                style={{
                  background: 'conic-gradient(from 0deg at 50% 50%, #ff6a00, #ff3d00, #ff8c33, #ff6a00, transparent, transparent, #ff6a00)',
                  animation: 'spin 12s linear infinite',
                }} />
              {/* Floating orbs */}
              <div className="absolute top-[10%] left-[10%] w-32 h-32 rounded-full blur-3xl opacity-[0.04]" style={{ background: '#ff6a00', animation: 'float 6s ease-in-out infinite' }} />
              <div className="absolute bottom-[20%] right-[10%] w-24 h-24 rounded-full blur-3xl opacity-[0.03]" style={{ background: '#ff8c33', animation: 'float 8s ease-in-out infinite 2s' }} />
            </div>

            <style>{`
              @keyframes float { 0%,100%{ transform: translateY(0px) scale(1); } 50%{ transform: translateY(-20px) scale(1.1); } }
              @keyframes voiceWave { 0%,100%{ height: 4px; } 50%{ height: 16px; } }
              @keyframes shimmer { 0%{ background-position: -200% 0; } 100%{ background-position: 200% 0; } }
            `}</style>

            {/* Content */}
            <div className="relative flex flex-col h-full">

              {/* Header */}
              <div className="relative px-5 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,106,0,0.08)' }}>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(255,106,0,0.04) 0%, transparent 100%)' }} />
                <div className="relative flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-1 rounded-2xl blur-md opacity-40" style={{ background: 'linear-gradient(135deg, #ff6a00, #ff3d00)' }} />
                    <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #1a1a1a, #0d0d0d)',
                        border: '1.5px solid rgba(255,106,0,0.2)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 20px rgba(255,106,0,0.1)',
                      }}>
                      <AvatarSVG />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full" style={{ background: '#22c55e', border: '2.5px solid #111' }}>
                      <span className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ background: '#22c55e', animationDuration: '2s' }} />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-black uppercase text-sm leading-tight" style={{ letterSpacing: '0.15em', textShadow: '0 0 30px rgba(255,106,0,0.3)' }}>
                      IRON MIKE
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
                      <span className="text-[10px] font-bold tracking-wider" style={{ color: '#22c55e' }}>ONLINE</span>
                    </div>
                    <p className="text-[10px] font-semibold uppercase mt-0.5" style={{ color: 'rgba(255,106,0,0.35)', letterSpacing: '0.12em' }}>
                      AI Fitness Coach
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <motion.button onClick={toggleMute} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
                      style={{
                        background: muted ? 'rgba(239,68,68,0.1)' : 'rgba(255,106,0,0.06)',
                        border: `1px solid ${muted ? 'rgba(239,68,68,0.15)' : 'rgba(255,106,0,0.08)'}`,
                      }}>
                      {muted ? <VolumeX className="w-3.5 h-3.5" style={{ color: '#ef4444' }} /> : <Volume2 className="w-3.5 h-3.5" style={{ color: '#ff6a00' }} />}
                    </motion.button>
                    <button onClick={() => setMinimized(!minimized)}
                      className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.04)' }}>
                      <Minus className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
                    </button>
                    <button onClick={() => setOpen(false)}
                      className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 hover:opacity-80"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.04)' }}>
                      <X className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
                    </button>
                  </div>
                </div>
              </div>

              {!minimized && (
                <>
                  {/* Messages */}
                  <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{
                    background: 'transparent',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255,106,0,0.15) transparent',
                  }}>
                    {messages.map((msg, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, y: 16, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.03, type: 'spring', damping: 20 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'assistant' && (
                          <div className="mr-2.5 flex-shrink-0 mt-1">
                            <AvatarSVG size="small" />
                          </div>
                        )}
                        <div className={`max-w-[80%] px-4 py-3 text-[13px] leading-relaxed ${
                          msg.role === 'user' ? 'text-white font-medium rounded-2xl rounded-br-lg' : 'text-white/90 rounded-2xl rounded-bl-lg'
                        }`} style={msg.role === 'user' ? {
                          background: 'linear-gradient(135deg, #ff6a00, #ff3d00)',
                          boxShadow: '0 4px 20px rgba(255,106,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
                        } : {
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.05)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.02)',
                        }}>
                          {msg.content}
                        </div>
                      </motion.div>
                    ))}

                    {loading && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                        <div className="mr-2.5 flex-shrink-0 mt-1"><AvatarSVG size="small" /></div>
                        <div className="px-5 py-3.5 rounded-2xl rounded-bl-lg" style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.05)',
                        }}>
                          <div className="flex gap-1.5 items-center h-5">
                            {[0, 1, 2].map(i => (
                              <motion.span key={i} className="w-2 h-2 rounded-full" style={{ background: '#ff6a00' }}
                                animate={{ y: [-2, 2, -2], opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Speaking waveform */}
                    {speaking && !loading && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="mr-2.5 flex-shrink-0 mt-1"><AvatarSVG size="small" /></div>
                        <div className="px-4 py-2.5 rounded-2xl rounded-bl-lg flex items-center gap-3" style={{
                          background: 'rgba(255,106,0,0.04)',
                          border: '1px solid rgba(255,106,0,0.08)',
                        }}>
                          <div className="flex items-center gap-[3px] h-4">
                            {[0,1,2,3,4].map(i => (
                              <motion.div key={i} className="w-[3px] rounded-full" style={{ background: '#ff6a00' }}
                                animate={{ height: ['4px', '14px', '4px'] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }} />
                            ))}
                          </div>
                          <span className="text-[10px] font-semibold uppercase" style={{ color: 'rgba(255,106,0,0.5)', letterSpacing: '0.1em' }}>Speaking</span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  {messages.length <= 1 && (
                    <div className="px-4 pb-3 grid grid-cols-2 gap-2 flex-shrink-0">
                      {QUICK_ACTIONS.map((action, i) => (
                        <motion.button key={i}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 * i, type: 'spring', damping: 15 }}
                          onClick={() => { if (action.query) send(action.query); }}
                          className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-left transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,106,0,0.04), rgba(255,106,0,0.02))',
                            border: '1px solid rgba(255,106,0,0.08)',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                          }}>
                          <span className="text-base">{action.icon}</span>
                          <span className="text-[11px] font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>{action.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {messages.length <= 1 && (
                    <div className="px-4 pb-2 flex-shrink-0">
                      <div className="text-center py-2 rounded-xl" style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,106,0,0.03), transparent)',
                        borderTop: '1px solid rgba(255,106,0,0.06)',
                      }}>
                        <p className="text-[9px] font-bold uppercase" style={{ color: 'rgba(255,106,0,0.2)', letterSpacing: '0.25em' }}>
                          BUILT TO MAKE YOU STRONGER
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="px-4 pb-4 pt-2 flex-shrink-0">
                    <div className="flex gap-2 items-center p-1.5 rounded-2xl transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.2)',
                      }}>
                      <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
                        placeholder="Ask about workouts, diet, supplements..."
                        className="flex-1 bg-transparent text-white text-sm px-3 py-2.5 outline-none transition-all duration-200"
                        style={{ caretColor: '#ff6a00' }}
                        onFocus={e => { e.currentTarget.parentElement!.style.borderColor = 'rgba(255,106,0,0.2)'; e.currentTarget.parentElement!.style.boxShadow = 'inset 0 2px 8px rgba(0,0,0,0.2), 0 0 20px rgba(255,106,0,0.05)'; }}
                        onBlur={e => { e.currentTarget.parentElement!.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.parentElement!.style.boxShadow = 'inset 0 2px 8px rgba(0,0,0,0.2)'; }}
                      />
                      <motion.button onClick={() => send()} disabled={!input.trim() || loading}
                        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
                        style={{
                          background: input.trim() ? 'linear-gradient(135deg, #ff6a00, #ff3d00)' : 'rgba(255,106,0,0.06)',
                          boxShadow: input.trim() ? '0 4px 20px rgba(255,106,0,0.3)' : 'none',
                        }}>
                        <Send className="w-4 h-4 text-white" />
                      </motion.button>
                    </div>
                  </div>
                </>
              )}

              {/* Bottom accent line */}
              <div className="h-[2px] w-full flex-shrink-0" style={{
                background: 'linear-gradient(90deg, transparent, #ff6a00, transparent)',
                opacity: 0.3,
              }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
