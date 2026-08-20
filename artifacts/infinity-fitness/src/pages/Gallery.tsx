import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { staggerContainer, fadeUpItem } from '@/lib/animation';
import img1 from '@assets/1_1785140838620.webp';
import img2 from '@assets/2_1785140851182.webp';
import img3 from '@assets/3_1785140851181.webp';
import img4 from '@assets/4_1785140862774.webp';
import img5 from '@assets/5_1785140862773.webp';
import img6 from '@assets/6_1785140862772.webp';
import img7 from '@assets/1a4c7a90-e805-426f-a6ee-c310dc609be2_1785141254714.webp';

const videos = [
  { src: '/gallery-video-1.mp4', caption: 'Infinity Fitness Gym Reel' },
  { src: '/gallery-video-2.mp4', caption: 'Best Gym in Kaithal' },
];

const images = [
  { src: img1, caption: "Main Floor" },
  { src: img2, caption: "Powerlifting Zone" },
  { src: img3, caption: "Get In Shape Studio" },
  { src: img4, caption: "Free Weights Area" },
  { src: img5, caption: "Cardio Zone" },
  { src: img6, caption: "Machine Section" },
  { src: img7, caption: "Reception & Lounge" },
];

function VideoCard({ video, onClick }: { video: typeof videos[0]; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    if (playing) {
      vid.pause();
      setPlaying(false);
    } else {
      vid.muted = false;
      setMuted(false);
      vid.play();
      setPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
  };

  const stopVideo = () => {
    const vid = videoRef.current;
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
      setPlaying(false);
    }
  };

  return (
    <div className="group relative overflow-hidden bg-card cursor-pointer row-span-2" style={{ aspectRatio: '3/4' }}
      onClick={onClick}
      onMouseLeave={stopVideo}
    >
      <video
        ref={videoRef}
        src={video.src}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Play/Pause overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <button
          onClick={togglePlay}
          className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-all"
        >
          {playing ? <Pause className="w-7 h-7 text-white" fill="white" /> : <Play className="w-7 h-7 text-white ml-1" fill="white" />}
        </button>
      </div>

      {/* Mute button */}
      <button
        onClick={toggleMute}
        className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-all"
      >
        {muted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
      </button>

      {/* Video badge */}
      <div className="absolute top-3 left-3 z-30">
        <span className="bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
          Video
        </span>
      </div>

      {/* Caption */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end">
        <div className="p-4 sm:p-6 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-display text-white font-bold uppercase tracking-wider text-lg sm:text-xl border-l-4 border-primary pl-3">
            {video.caption}
          </h3>
        </div>
      </div>
    </div>
  );
}

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxType, setLightboxType] = useState<'image' | 'video'>('image');
  const prefersReduced = useReducedMotion();
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);
  const [lbMuted, setLbMuted] = useState(true);

  const openImageLightbox = (i: number) => { setLightboxType('image'); setLightboxIndex(i); };
  const closeLightbox = () => { setLightboxIndex(null); if (lightboxVideoRef.current) { lightboxVideoRef.current.pause(); } };
  const prev = () => setLightboxIndex(i => i === null ? null : (i - 1 + images.length) % images.length);
  const next = () => setLightboxIndex(i => i === null ? null : (i + 1) % images.length);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50svh] min-h-[400px] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={img1} alt="Infinity Fitness Gym" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight text-white mb-4">
              Inside <span className="text-primary text-glow">Infinity</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium uppercase tracking-widest">
              Your future home. Come see it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Videos first */}
      <section className="py-6 md:py-12">
        <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-8">
          <h2 className="text-2xl font-display font-bold uppercase tracking-wider text-foreground mb-6 border-l-4 border-primary pl-4">
            Gym Reels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((video, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative overflow-hidden bg-card"
                style={{ aspectRatio: '9/16', maxHeight: '600px' }}
              >
                <video
                  src={video.src}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                  <div className="p-4 sm:p-6 w-full">
                    <h3 className="font-display text-white font-bold uppercase tracking-wider text-lg border-l-4 border-primary pl-3">
                      {video.caption}
                    </h3>
                  </div>
                </div>
                <div className="absolute top-3 left-3 z-30">
                  <span className="bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
                    Video
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photos Grid */}
      <section className="py-6 md:py-12">
        <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-8">
          <h2 className="text-2xl font-display font-bold uppercase tracking-wider text-foreground mb-6 border-l-4 border-primary pl-4">
            Photos
          </h2>
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4"
            variants={staggerContainer(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '100px' }}
          >
            {images.map((img, i) => (
              <motion.div
                key={i}
                variants={fadeUpItem}
                className={`group relative overflow-hidden bg-card cursor-pointer ${
                  i === 0 || i === 4 ? 'row-span-2' : ''
                }`}
                style={{ aspectRatio: i === 0 || i === 4 ? '3/4' : '4/3' }}
                onClick={() => openImageLightbox(i)}
                whileHover={prefersReduced ? {} : { scale: 1.02, transition: { duration: 0.3 } }}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 sm:p-6 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-display text-white font-bold uppercase tracking-wider text-lg sm:text-xl border-l-4 border-primary pl-3">
                      {img.caption}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors p-2" onClick={closeLightbox}>
              <X className="w-8 h-8" />
            </button>
            <button className="absolute left-4 z-10 text-white/70 hover:text-white transition-colors p-2" onClick={e => { e.stopPropagation(); prev(); }}>
              <ChevronLeft className="w-10 h-10" />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].caption}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-sm shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
            <button className="absolute right-4 z-10 text-white/70 hover:text-white transition-colors p-2" onClick={e => { e.stopPropagation(); next(); }}>
              <ChevronRight className="w-10 h-10" />
            </button>
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <span className="font-display font-bold uppercase tracking-widest text-white/80 text-sm border-l-2 border-primary pl-3">
                {images[lightboxIndex].caption}
              </span>
              <span className="text-white/40 text-sm ml-4">{lightboxIndex + 1} / {images.length}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
