import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Volume2, VolumeX, Minus, Dumbbell, Mic } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MSG: ChatMessage = {
  role: 'assistant',
  content: "Welcome to Infinity Fitness AI! 💪 I'm your personal trainer. Ask me anything about Workout, Diet, Supplements or Fitness!",
};

const QUICK_ACTIONS = [
  { icon: '💪', label: 'Workout Plan', query: 'Give me a workout plan' },
  { icon: '🍴', label: 'Diet & Nutrition', query: 'What should I eat for muscle gain?' },
  { icon: '🧴', label: 'Supplements', query: 'Which supplements should I take?' },
  { icon: '❓', label: 'Ask Anything', query: '' },
];

function CoachSVG({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 200" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Shadow */}
      <ellipse cx="70" cy="195" rx="35" ry="5" fill="rgba(255,106,0,0.15)" />
      {/* Head */}
      <ellipse cx="70" cy="30" rx="18" ry="20" fill="#2a2a2a" />
      {/* Hair */}
      <path d="M52 24 Q56 6 70 4 Q84 6 88 24 Q86 14 70 10 Q54 14 52 24Z" fill="#111" />
      <path d="M55 18 Q60 12 70 10 Q65 16 58 20Z" fill="#1a1a1a" />
      {/* Face */}
      <ellipse cx="70" cy="30" rx="16" ry="18" fill="#333" />
      {/* Eyes */}
      <ellipse cx="63" cy="28" rx="2.5" ry="2" fill="#ff6a00" />
      <ellipse cx="77" cy="28" rx="2.5" ry="2" fill="#ff6a00" />
      <circle cx="63" cy="27.5" r="0.8" fill="#fff" />
      <circle cx="77" cy="27.5" r="0.8" fill="#fff" />
      {/* Eyebrows */}
      <path d="M59 24 Q63 22 67 24" stroke="#222" strokeWidth="1.5" fill="none" />
      <path d="M73 24 Q77 22 81 24" stroke="#222" strokeWidth="1.5" fill="none" />
      {/* Nose */}
      <path d="M70 30 L68 34 L72 34Z" fill="#3a3a3a" />
      {/* Smile */}
      <path d="M63 37 Q70 43 77 37" stroke="#ff6a00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Neck */}
      <rect x="63" y="47" width="14" height="10" rx="4" fill="#2a2a2a" />
      {/* Trapezius */}
      <path d="M48 57 L92 57 L88 52 L52 52Z" fill="#222" />
      {/* Tank top body */}
      <path d="M44 57 L96 57 L100 130 L40 130Z" fill="#111" rx="3" />
      <path d="M45 58 L95 58 L99 129 L41 129Z" fill="#1a1a1a" />
      {/* V-neck */}
      <path d="M60 57 L70 72 L80 57" fill="#222" />
      {/* Orange side stripes */}
      <path d="M44 57 L48 57 L46 130 L40 130Z" fill="#ff6a00" opacity="0.85" />
      <path d="M92 57 L96 57 L100 130 L94 130Z" fill="#ff6a00" opacity="0.85" />
      {/* INFINITY text on chest */}
      <text x="70" y="90" textAnchor="middle" fill="#ff6a00" fontSize="7" fontWeight="900" fontFamily="Arial" letterSpacing="1">INFINITY</text>
      <text x="70" y="102" textAnchor="middle" fill="#ff6a00" fontSize="6" fontFamily="Arial" letterSpacing="2">FITNESS</text>
      {/* Muscle definition lines */}
      <path d="M55 75 Q58 85 55 100" stroke="#222" strokeWidth="0.5" fill="none" />
      <path d="M85 75 Q82 85 85 100" stroke="#222" strokeWidth="0.5" fill="none" />
      <path d="M60 75 L70 80 L80 75" stroke="#222" strokeWidth="0.5" fill="none" />
      {/* Left arm - bicep */}
      <path d="M44 59 Q30 62 22 78 Q16 92 18 105 Q20 110 26 105 Q30 95 34 82 Q36 74 44 66Z" fill="#1a1a1a" />
      <ellipse cx="24" cy="82" rx="9" ry="12" fill="#222" opacity="0.4" />
      {/* Left bicep peak */}
      <path d="M22 72 Q18 80 20 90" stroke="#ff6a00" strokeWidth="0.8" fill="none" opacity="0.3" />
      {/* Right arm - bicep */}
      <path d="M96 59 Q110 62 118 78 Q124 92 122 105 Q120 110 114 105 Q110 95 106 82 Q104 74 96 66Z" fill="#1a1a1a" />
      <ellipse cx="116" cy="82" rx="9" ry="12" fill="#222" opacity="0.4" />
      {/* Right bicep peak */}
      <path d="M118 72 Q122 80 120 90" stroke="#ff6a00" strokeWidth="0.8" fill="none" opacity="0.3" />
      {/* Fists */}
      <ellipse cx="18" cy="108" rx="7" ry="6" fill="#1a1a1a" />
      <ellipse cx="122" cy="108" rx="7" ry="6" fill="#1a1a1a" />
      {/* Towel around neck */}
      <path d="M52 55 Q58 50 66 55" stroke="#ff6a00" strokeWidth="2.5" fill="none" opacity="0.5" strokeLinecap="round" />
      <path d="M74 55 Q82 50 88 55" stroke="#ff6a00" strokeWidth="2.5" fill="none" opacity="0.5" strokeLinecap="round" />
      <path d="M48 55 L52 58" stroke="#ff6a00" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M92 55 L88 58" stroke="#ff6a00" strokeWidth="1.5" fill="none" opacity="0.4" />
      {/* Shorts */}
      <path d="M41 130 L99 130 L96 160 L76 160 L70 140 L64 160 L44 160Z" fill="#111" />
      <path d="M41 130 L44 130 L44 160 L41 160Z" fill="#ff6a00" opacity="0.7" />
      <path d="M96 130 L99 130 L99 160 L96 160Z" fill="#ff6a00" opacity="0.7" />
      {/* Legs */}
      <rect x="48" y="160" width="16" height="26" rx="6" fill="#1a1a1a" />
      <rect x="76" y="160" width="16" height="26" rx="6" fill="#1a1a1a" />
      {/* Calves */}
      <ellipse cx="56" cy="178" rx="8" ry="5" fill="#222" opacity="0.3" />
      <ellipse cx="84" cy="178" rx="8" ry="5" fill="#222" opacity="0.3" />
      {/* Shoes */}
      <ellipse cx="56" cy="190" rx="12" ry="5" fill="#111" />
      <ellipse cx="84" cy="190" rx="12" ry="5" fill="#111" />
      <path d="M44 190 L68 190" stroke="#ff6a00" strokeWidth="1" opacity="0.5" />
      <path d="M72 190 L96 190" stroke="#ff6a00" strokeWidth="1" opacity="0.5" />
      {/* Orange glow effect */}
      <ellipse cx="70" cy="100" rx="50" ry="60" fill="url(#coachGlow)" opacity="0.08" />
      <defs>
        <radialGradient id="coachGlow">
          <stop offset="0%" stopColor="#ff6a00" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
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

  // Click outside to close
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

  const speak = async (text: string) => {
    if (muted || !text) return;
    try {
      setSpeaking(true);
      const res = await fetch(`${import.meta.env.BASE_URL}api/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => { setSpeaking(false); URL.revokeObjectURL(url); };
      audio.onerror = () => { setSpeaking(false); URL.revokeObjectURL(url); };
      await audio.play();
    } catch {
      setSpeaking(false);
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

      // Auto-speak the reply
      speak(reply);
    } catch {
      const errorMsgs = [...updatedMessages, { role: 'assistant' as const, content: 'Server busy right now, try again! 💪' }];
      messagesEndRef.current = errorMsgs;
      setMessages(errorMsgs);
    } finally {
      setLoading(false);
    }
  };

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      if (!prev) {
        // Muting - stop current audio
        if (audioRef.current) {
          audioRef.current.pause();
          setSpeaking(false);
        }
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
      {/* ── FAB Button ── */}
      <motion.div
        ref={fabRef}
        className="fixed bottom-24 right-6 z-50"
        animate={open ? {} : { y: [0, -6, 0] }}
        transition={open ? {} : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.button
          onClick={() => { setOpen(!open); setMinimized(false); }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative group"
          aria-label="Open Infinity Fitness AI"
        >
          {/* Outer glow rings */}
          <div className="absolute -inset-4 rounded-full border border-orange-500/20 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-orange-500/30 to-amber-500/10 blur-lg" />
          {/* Neon ring */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-orange-500 via-amber-400 to-orange-600 opacity-70 blur-sm" />
          {/* Button body */}
          <div className="relative w-16 h-16 rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #1a1a1a, #0a0a0a)',
              boxShadow: '0 0 30px rgba(255,106,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}>
            <CoachSVG className="w-14 h-16" />
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

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 40, scale: 0.9, rotateX: 10 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            className="fixed bottom-40 right-6 z-50 w-[420px] max-w-[calc(100vw-2rem)] rounded-3xl overflow-hidden flex flex-col"
            style={{
              height: minimized ? '80px' : '600px',
              maxHeight: 'calc(100vh - 140px)',
              perspective: '1000px',
            }}
          >
            {/* ── Outer neon border ── */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                border: '1.5px solid rgba(255,106,0,0.4)',
                boxShadow: '0 0 40px rgba(255,106,0,0.15), 0 0 80px rgba(255,106,0,0.05), 0 30px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            />

            {/* ── Glass bg ── */}
            <div className="absolute inset-0 rounded-3xl"
              style={{
                background: 'linear-gradient(165deg, rgba(18,18,18,0.98) 0%, rgba(8,8,8,0.99) 50%, rgba(5,5,5,1) 100%)',
                backdropFilter: 'blur(30px)',
              }}
            />

            {/* ── Holographic shimmer ── */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
              <div className="absolute -top-1/2 -left-1/2 w-full h-full opacity-[0.03]"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, #ff6a00, transparent, transparent)',
                  animation: 'spin 8s linear infinite',
                }}
              />
            </div>

            {/* Content wrapper */}
            <div className="relative flex flex-col h-full">
              {/* ── Header ── */}
              <div className="relative px-5 py-4 border-b border-orange-500/15 flex-shrink-0">
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, rgba(255,106,0,0.06) 0%, transparent 100%)' }} />

                <div className="relative flex items-center gap-3">
                  {/* 3D Coach Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-1 rounded-xl opacity-40 blur-md"
                      style={{ background: 'linear-gradient(135deg, #ff6a00, #e85d00)' }} />
                    <div className="relative w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden"
                      style={{
                        background: 'linear-gradient(145deg, #1a1a1a, #0a0a0a)',
                        border: '1px solid rgba(255,106,0,0.3)',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                      }}>
                      <CoachSVG className="w-12 h-16" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-gray-900">
                      <span className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-40" style={{ animationDuration: '2s' }} />
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm leading-tight"
                      style={{ textShadow: '0 0 25px rgba(255,106,0,0.4)' }}>
                      INFINITY FITNESS AI
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-400 text-[10px] font-bold tracking-wider">ONLINE</span>
                    </div>
                    <p className="text-orange-400/50 text-[10px] font-semibold tracking-[0.15em] uppercase mt-0.5">
                      Gym & Diet Chatbot
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Voice mute button */}
                    <motion.button
                      onClick={toggleMute}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                      style={{
                        background: muted ? 'rgba(239,68,68,0.15)' : 'rgba(255,106,0,0.1)',
                        border: `1px solid ${muted ? 'rgba(239,68,68,0.2)' : 'rgba(255,106,0,0.15)'}`,
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
                  {/* ── Messages ── */}
                  <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
                    style={{ background: 'transparent' }}>

                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.role === 'assistant' && (
                          <div className="mr-2.5 flex-shrink-0 mt-0.5 relative">
                            <div className="absolute -inset-0.5 rounded-lg opacity-25 blur-sm"
                              style={{ background: 'linear-gradient(135deg, #ff6a00, #e85d00)' }} />
                            <div className="relative w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
                              style={{
                                background: 'linear-gradient(145deg, #1a1a1a, #0a0a0a)',
                                border: '1px solid rgba(255,106,0,0.2)',
                              }}>
                              <CoachSVG className="w-7 h-10" />
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
                            boxShadow: '0 4px 25px rgba(255,106,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
                          } : {
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
                          }}
                        >
                          {msg.content}
                        </div>
                      </motion.div>
                    ))}

                    {loading && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="mr-2.5 flex-shrink-0 relative">
                          <div className="absolute -inset-0.5 rounded-lg opacity-25 blur-sm"
                            style={{ background: 'linear-gradient(135deg, #ff6a00, #e85d00)' }} />
                          <div className="relative w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
                            style={{
                              background: 'linear-gradient(145deg, #1a1a1a, #0a0a0a)',
                              border: '1px solid rgba(255,106,0,0.2)',
                            }}>
                            <CoachSVG className="w-7 h-10" />
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

                    {/* Speaking indicator */}
                    {speaking && !loading && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="px-3 py-1.5 rounded-full flex items-center gap-2"
                          style={{ background: 'rgba(255,106,0,0.08)', border: '1px solid rgba(255,106,0,0.15)' }}>
                          <Volume2 className="w-3 h-3 text-orange-400 animate-pulse" />
                          <span className="text-orange-400/80 text-[10px] font-medium">Speaking...</span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* ── Quick Actions ── */}
                  {messages.length <= 1 && (
                    <div className="px-4 pb-3 grid grid-cols-2 gap-2 flex-shrink-0">
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
                            border: '1px solid rgba(255,106,0,0.12)',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                          }}
                        >
                          <span className="text-base">{action.icon}</span>
                          <span className="text-white/70 text-[11px] font-semibold">{action.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {/* ── Pedestal text ── */}
                  {messages.length <= 1 && (
                    <div className="px-4 pb-2 flex-shrink-0">
                      <div className="text-center py-2 rounded-xl"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255,106,0,0.06), transparent)',
                          borderTop: '1px solid rgba(255,106,0,0.1)',
                        }}>
                        <p className="text-orange-400/30 text-[9px] font-bold tracking-[0.25em] uppercase">
                          LET'S BUILD A BETTER YOU 💪
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ── Input ── */}
                  <div className="px-4 pb-4 pt-2 flex-shrink-0">
                    <div className="flex gap-2 items-center p-1.5 rounded-2xl"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
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
                            : 'rgba(255,106,0,0.1)',
                          boxShadow: input.trim() ? '0 4px 20px rgba(255,106,0,0.3)' : 'none',
                        }}
                      >
                        <Send className="w-4 h-4 text-white" />
                      </motion.button>
                    </div>
                  </div>
                </>
              )}

              {/* ── Bottom glow ── */}
              <div className="h-[1px] w-full flex-shrink-0"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,106,0,0.5), transparent)' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
