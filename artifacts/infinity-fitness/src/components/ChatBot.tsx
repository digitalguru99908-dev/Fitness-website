import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Volume2, VolumeX, Minus, Dumbbell, Zap, Flame, Apple } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MSG: ChatMessage = {
  role: 'assistant',
  content: "Welcome to Infinity Fitness AI! I'm your personal trainer. Ask me anything about Workout, Diet, Supplements or Fitness!",
};

const QUICK_ACTIONS = [
  { icon: '💪', label: 'Workout Plan', query: 'Give me a workout plan' },
  { icon: '🍎', label: 'Diet & Nutrition', query: 'What should I eat for muscle gain?' },
  { icon: '🧴', label: 'Supplements', query: 'Which supplements should I take?' },
  { icon: '❓', label: 'Ask Anything', query: '' },
];

function BodyBuilderSVG({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="muscleGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#ff6a00" stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4a574" />
          <stop offset="50%" stopColor="#c4956a" />
          <stop offset="100%" stopColor="#b8875c" />
        </linearGradient>
        <linearGradient id="tankGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#0d0d0d" />
        </linearGradient>
        <linearGradient id="orangeAccent" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff8c33" />
          <stop offset="100%" stopColor="#ff6a00" />
        </linearGradient>
        <filter id="innerShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.5" />
        </filter>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <ellipse cx="100" cy="140" rx="80" ry="100" fill="url(#muscleGlow)" />

      {/* Shadow */}
      <ellipse cx="100" cy="268" rx="40" ry="6" fill="rgba(255,106,0,0.12)" />

      {/* Head */}
      <ellipse cx="100" cy="42" rx="24" ry="26" fill="url(#skinGrad)" />

      {/* Hair */}
      <path d="M76 32 Q80 10 100 6 Q120 10 124 32 Q122 18 100 14 Q78 18 76 32Z" fill="#1a1a1a" />
      <path d="M78 24 Q84 16 100 14 Q88 22 80 26Z" fill="#111" />

      {/* Face shadow */}
      <ellipse cx="100" cy="42" rx="22" ry="24" fill="url(#skinGrad)" opacity="0.9" />

      {/* Eyes */}
      <ellipse cx="91" cy="40" rx="3.5" ry="2.8" fill="#111" />
      <ellipse cx="109" cy="40" rx="3.5" ry="2.8" fill="#111" />
      <circle cx="91" cy="39.5" r="1.2" fill="#fff" />
      <circle cx="109" cy="39.5" r="1.2" fill="#fff" />

      {/* Eyebrows */}
      <path d="M84 34 Q91 31 98 34" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M102 34 Q109 31 116 34" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Nose */}
      <path d="M100 42 L97 48 L103 48Z" fill="#b8875c" opacity="0.6" />

      {/* Smile */}
      <path d="M91 52 Q100 60 109 52" stroke="#ff6a00" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Neck */}
      <rect x="90" y="64" width="20" height="14" rx="6" fill="url(#skinGrad)" />

      {/* Trapezius */}
      <path d="M64 78 L136 78 L130 72 L70 72Z" fill="#c4956a" />

      {/* Tank top */}
      <path d="M56 78 L144 78 L150 190 L50 190Z" fill="url(#tankGrad)" rx="4" />

      {/* V-neck */}
      <path d="M84 78 L100 98 L116 78" fill="#c4956a" />

      {/* Orange side stripes */}
      <path d="M56 78 L62 78 L60 190 L50 190Z" fill="url(#orangeAccent)" opacity="0.9" />
      <path d="M138 78 L144 78 L150 190 L140 190Z" fill="url(#orangeAccent)" opacity="0.9" />

      {/* INFINITY text on chest */}
      <text x="100" y="128" textAnchor="middle" fill="#ff6a00" fontSize="10" fontWeight="900" fontFamily="Arial" letterSpacing="2">INFINITY</text>
      <text x="100" y="144" textAnchor="middle" fill="#ff6a00" fontSize="8" fontFamily="Arial" letterSpacing="3">FITNESS</text>

      {/* Muscle definition */}
      <path d="M72 95 Q78 115 72 140" stroke="#111" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M128 95 Q122 115 128 140" stroke="#111" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M82 95 L100 102 L118 95" stroke="#111" strokeWidth="0.5" fill="none" opacity="0.3" />

      {/* LEFT ARM - massive bicep */}
      <path d="M56 80 Q34 84 22 102 Q14 118 16 140 Q18 148 26 142 Q32 132 38 116 Q42 104 56 90Z" fill="url(#skinGrad)" />
      {/* Bicep peak */}
      <ellipse cx="26" cy="110" rx="12" ry="16" fill="#c4956a" opacity="0.4" />
      <path d="M20 100 Q16 112 18 124" stroke="#ff6a00" strokeWidth="1" fill="none" opacity="0.3" />
      {/* Forearm */}
      <path d="M16 140 Q12 155 14 168 Q16 174 22 170 Q24 160 24 148Z" fill="url(#skinGrad)" />
      {/* Fist */}
      <ellipse cx="18" cy="172" rx="8" ry="7" fill="#c4956a" />

      {/* RIGHT ARM - massive bicep */}
      <path d="M144 80 Q166 84 178 102 Q186 118 184 140 Q182 148 174 142 Q168 132 162 116 Q158 104 144 90Z" fill="url(#skinGrad)" />
      {/* Bicep peak */}
      <ellipse cx="174" cy="110" rx="12" ry="16" fill="#c4956a" opacity="0.4" />
      <path d="M180 100 Q184 112 182 124" stroke="#ff6a00" strokeWidth="1" fill="none" opacity="0.3" />
      {/* Forearm */}
      <path d="M184 140 Q188 155 186 168 Q184 174 178 170 Q176 160 176 148Z" fill="url(#skinGrad)" />
      {/* Fist */}
      <ellipse cx="182" cy="172" rx="8" ry="7" fill="#c4956a" />

      {/* Dumbbell in right hand */}
      <rect x="172" y="166" width="20" height="4" rx="2" fill="#555" />
      <rect x="168" y="162" width="6" height="12" rx="2" fill="#ff6a00" />
      <rect x="190" y="162" width="6" height="12" rx="2" fill="#ff6a00" />

      {/* Shorts */}
      <path d="M50 190 L150 190 L146 228 L116 228 L100 210 L84 228 L54 228Z" fill="#111" />
      <path d="M50 190 L54 190 L54 228 L50 228Z" fill="url(#orangeAccent)" opacity="0.8" />
      <path d="M146 190 L150 190 L150 228 L146 228Z" fill="url(#orangeAccent)" opacity="0.8" />

      {/* Legs */}
      <rect x="66" y="228" width="22" height="32" rx="8" fill="url(#skinGrad)" />
      <rect x="112" y="228" width="22" height="32" rx="8" fill="url(#skinGrad)" />

      {/* Calves */}
      <ellipse cx="77" cy="248" rx="11" ry="7" fill="#c4956a" opacity="0.3" />
      <ellipse cx="123" cy="248" rx="11" ry="7" fill="#c4956a" opacity="0.3" />

      {/* Shoes */}
      <ellipse cx="77" cy="264" rx="16" ry="7" fill="#111" />
      <ellipse cx="123" cy="264" rx="16" ry="7" fill="#111" />
      <path d="M61 264 L93 264" stroke="#ff6a00" strokeWidth="1.5" opacity="0.6" />
      <path d="M107 264 L139 264" stroke="#ff6a00" strokeWidth="1.5" opacity="0.6" />

      {/* Orange aura */}
      <ellipse cx="100" cy="140" rx="70" ry="80" fill="none" stroke="#ff6a00" strokeWidth="0.5" opacity="0.15" />
    </svg>
  );
}

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current = messages;
  }, [messages]);

  // Stop speaking when chatbot closes
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

  const detectLang = (text: string): string => {
    const devanagari = /[\u0900-\u097F]/;
    if (devanagari.test(text)) return 'hi';
    return 'en';
  };

  const ttsAbortRef = useRef<AbortController | null>(null);

  const speak = async (text: string, userText?: string) => {
    if (muted || !text) return;

    // Cancel any previous TTS request
    if (ttsAbortRef.current) {
      ttsAbortRef.current.abort();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const lang = userText ? detectLang(userText) : 'en';
    const controller = new AbortController();
    ttsAbortRef.current = controller;

    try {
      setSpeaking(true);
      const res = await fetch(`${import.meta.env.BASE_URL}api/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, lang }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) { setSpeaking(false); return; }

      // Stream audio for faster playback
      const reader = res.body.getReader();
      const chunks: Uint8Array[] = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }

      if (controller.signal.aborted) return;

      const blob = new Blob(chunks, { type: 'audio/mpeg' });
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
    const updatedMessages = [...messagesEndRef.current, userMsg];
    messagesEndRef.current = updatedMessages;
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      const reply = data.reply;
      const finalMessages = [...updatedMessages, { role: 'assistant' as const, content: reply }];
      messagesEndRef.current = finalMessages;
      setMessages(finalMessages);
      speak(reply, msg);
    } catch {
      const errorMsgs = [...updatedMessages, { role: 'assistant' as const, content: 'Server busy right now, try again!' }];
      messagesEndRef.current = errorMsgs;
      setMessages(errorMsgs);
    } finally {
      setLoading(false);
    }
  };

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      if (!prev && audioRef.current) {
        audioRef.current.pause();
        setSpeaking(false);
      }
      return !prev;
    });
  }, []);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* FAB */}
      <motion.div
        ref={fabRef}
        className="fixed bottom-24 right-6 z-50"
        animate={open ? {} : { y: [0, -8, 0] }}
        transition={open ? {} : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.button
          onClick={() => { setOpen(!open); setMinimized(false); }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          className="relative group"
          aria-label="Open Infinity Fitness AI"
        >
          {/* Outer glow rings */}
          <div className="absolute -inset-5 rounded-full border border-orange-500/15 animate-ping" style={{ animationDuration: '3.5s' }} />
          <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-orange-500/25 to-amber-500/10 blur-xl" />
          {/* Neon ring */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-orange-500 via-amber-400 to-orange-600 opacity-60 blur-sm" />
          {/* Button body */}
          <div className="relative w-16 h-16 rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #1c1c1c, #0a0a0a)',
              boxShadow: '0 0 35px rgba(255,106,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}>
            <BodyBuilderSVG className="w-14 h-16" />
          </div>
          {/* Online dot */}
          {!open && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black">
              <span className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-50" />
            </span>
          )}
          {/* Tooltip */}
          {!open && (
            <div className="absolute -top-14 right-0 whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, rgba(10,10,10,0.95), rgba(20,20,20,0.95))',
                border: '1px solid rgba(255,106,0,0.3)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              }}>
              <span className="text-orange-400">💪</span> AI Fitness Coach
              <div className="absolute -bottom-1 right-6 w-2 h-2 bg-[rgba(10,10,10,0.95)] border-r border-b border-orange-500/30 rotate-45" />
            </div>
          )}
        </motion.button>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 50, scale: 0.85, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 50, scale: 0.85, rotateX: 15 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed bottom-40 right-6 z-50 w-[420px] max-w-[calc(100vw-2rem)] rounded-3xl overflow-hidden flex flex-col"
            style={{
              height: minimized ? '80px' : '620px',
              maxHeight: 'calc(100vh - 140px)',
              perspective: '1200px',
            }}
          >
            {/* Outer neon border */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                border: '1.5px solid rgba(255,106,0,0.35)',
                boxShadow: '0 0 50px rgba(255,106,0,0.12), 0 0 100px rgba(255,106,0,0.04), 0 35px 70px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
            />

            {/* Glass bg */}
            <div className="absolute inset-0 rounded-3xl"
              style={{
                background: 'linear-gradient(165deg, rgba(16,16,16,0.98) 0%, rgba(8,8,8,0.99) 50%, rgba(4,4,4,1) 100%)',
                backdropFilter: 'blur(40px)',
              }}
            />

            {/* Holographic shimmer */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
              <div className="absolute -top-1/2 -left-1/2 w-full h-full opacity-[0.02]"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, #ff6a00, transparent, transparent)',
                  animation: 'spin 10s linear infinite',
                }}
              />
            </div>

            {/* Content */}
            <div className="relative flex flex-col h-full">
              {/* Header */}
              <div className="relative px-5 py-4 border-b border-orange-500/10 flex-shrink-0">
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, rgba(255,106,0,0.05) 0%, transparent 100%)' }} />

                <div className="relative flex items-center gap-3">
                  {/* 3D Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-1.5 rounded-xl opacity-30 blur-md"
                      style={{ background: 'linear-gradient(135deg, #ff6a00, #e85d00)' }} />
                    <div className="relative w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden"
                      style={{
                        background: 'linear-gradient(145deg, #1c1c1c, #0a0a0a)',
                        border: '1px solid rgba(255,106,0,0.25)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                      }}>
                      <BodyBuilderSVG className="w-12 h-16" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-gray-900">
                      <span className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-40" style={{ animationDuration: '2s' }} />
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm leading-tight"
                      style={{ textShadow: '0 0 30px rgba(255,106,0,0.4)' }}>
                      INFINITY FITNESS AI
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-400 text-[10px] font-bold tracking-wider">ONLINE</span>
                    </div>
                    <p className="text-orange-400/40 text-[10px] font-semibold tracking-[0.15em] uppercase mt-0.5">
                      Gym & Diet Coach
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <motion.button
                      onClick={toggleMute}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                      style={{
                        background: muted ? 'rgba(239,68,68,0.12)' : 'rgba(255,106,0,0.08)',
                        border: `1px solid ${muted ? 'rgba(239,68,68,0.2)' : 'rgba(255,106,0,0.12)'}`,
                      }}
                      title={muted ? 'Voice ON karo' : 'Voice OFF karo'}
                    >
                      {muted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-orange-400" />}
                    </motion.button>
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
                  {/* Messages */}
                  <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
                    style={{ background: 'transparent' }}>

                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 14, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.35, delay: 0.05 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.role === 'assistant' && (
                          <div className="mr-2.5 flex-shrink-0 mt-0.5 relative">
                            <div className="absolute -inset-0.5 rounded-lg opacity-20 blur-sm"
                              style={{ background: 'linear-gradient(135deg, #ff6a00, #e85d00)' }} />
                            <div className="relative w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
                              style={{
                                background: 'linear-gradient(145deg, #1c1c1c, #0a0a0a)',
                                border: '1px solid rgba(255,106,0,0.2)',
                              }}>
                              <BodyBuilderSVG className="w-7 h-10" />
                            </div>
                          </div>
                        )}
                        <div
                          className={`max-w-[82%] px-4 py-3 text-[13px] leading-relaxed ${
                            msg.role === 'user'
                              ? 'text-white font-medium rounded-2xl rounded-br-lg'
                              : 'text-white/90 rounded-2xl rounded-bl-lg'
                          }`}
                          style={msg.role === 'user' ? {
                            background: 'linear-gradient(135deg, #ff6a00, #e85d00)',
                            boxShadow: '0 4px 25px rgba(255,106,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12)',
                          } : {
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
                          }}
                        >
                          {msg.content}
                        </div>
                      </motion.div>
                    ))}

                    {loading && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="mr-2.5 flex-shrink-0 relative">
                          <div className="absolute -inset-0.5 rounded-lg opacity-20 blur-sm"
                            style={{ background: 'linear-gradient(135deg, #ff6a00, #e85d00)' }} />
                          <div className="relative w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
                            style={{
                              background: 'linear-gradient(145deg, #1c1c1c, #0a0a0a)',
                              border: '1px solid rgba(255,106,0,0.2)',
                            }}>
                            <BodyBuilderSVG className="w-7 h-10" />
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

                    {speaking && !loading && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="px-3 py-1.5 rounded-full flex items-center gap-2"
                          style={{ background: 'rgba(255,106,0,0.06)', border: '1px solid rgba(255,106,0,0.12)' }}>
                          <Volume2 className="w-3 h-3 text-orange-400 animate-pulse" />
                          <span className="text-orange-400/70 text-[10px] font-medium">Speaking...</span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  {messages.length <= 1 && (
                    <div className="px-4 pb-3 grid grid-cols-2 gap-2 flex-shrink-0">
                      {QUICK_ACTIONS.map((action, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i }}
                          onClick={() => { if (action.query) send(action.query); }}
                          className="flex items-center gap-2.5 px-3 py-3 rounded-xl text-left transition-all hover:scale-[1.03]"
                          style={{
                            background: 'rgba(255,106,0,0.05)',
                            border: '1px solid rgba(255,106,0,0.1)',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
                          }}
                        >
                          <span className="text-lg">{action.icon}</span>
                          <span className="text-white/70 text-[11px] font-semibold">{action.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {messages.length <= 1 && (
                    <div className="px-4 pb-2 flex-shrink-0">
                      <div className="text-center py-2 rounded-xl"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255,106,0,0.04), transparent)',
                          borderTop: '1px solid rgba(255,106,0,0.08)',
                        }}>
                        <p className="text-orange-400/25 text-[9px] font-bold tracking-[0.25em] uppercase">
                          LET'S BUILD A BETTER YOU
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="px-4 pb-4 pt-2 flex-shrink-0">
                    <div className="flex gap-2 items-center p-1.5 rounded-2xl"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.25)',
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
                            : 'rgba(255,106,0,0.08)',
                          boxShadow: input.trim() ? '0 4px 20px rgba(255,106,0,0.3)' : 'none',
                        }}
                      >
                        <Send className="w-4 h-4 text-white" />
                      </motion.button>
                    </div>
                  </div>
                </>
              )}

              {/* Bottom glow */}
              <div className="h-[1px] w-full flex-shrink-0"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,106,0,0.4), transparent)' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
