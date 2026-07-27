import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import img1 from '@assets/1_1785140838620.webp';
import img2 from '@assets/2_1785140851182.webp';
import img3 from '@assets/3_1785140851181.webp';
import img4 from '@assets/4_1785140862774.webp';
import img5 from '@assets/5_1785140862773.webp';
import img6 from '@assets/6_1785140862772.webp';
import img7 from '@assets/1a4c7a90-e805-426f-a6ee-c310dc609be2_1785141254714.webp';

const images = [
  { src: img1, caption: "Main Floor" },
  { src: img2, caption: "Powerlifting Zone" },
  { src: img3, caption: "Get In Shape Studio" },
  { src: img4, caption: "Free Weights Area" },
  { src: img5, caption: "Cardio Zone" },
  { src: img6, caption: "Machine Section" },
  { src: img7, caption: "Reception & Lounge" },
];

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex(i => i === null ? null : (i - 1 + images.length) % images.length);
  const next = () => setLightboxIndex(i => i === null ? null : (i + 1) % images.length);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape') closeLightbox();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50svh] min-h-[400px] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={img1}
            alt="Infinity Fitness Gym"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight text-white mb-4">
              Inside <span className="text-primary text-glow">Infinity</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium uppercase tracking-widest">
              Your future home. Come see it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-24">
        <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className={`group relative overflow-hidden bg-card cursor-pointer ${
                  i === 0 || i === 4 ? 'row-span-2' : ''
                }`}
                style={{ aspectRatio: i === 0 || i === 4 ? '3/4' : '4/3' }}
                onClick={() => openLightbox(i)}
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
          </div>
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
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors p-2"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 z-10 text-white/70 hover:text-white transition-colors p-2"
              onClick={e => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            {/* Image */}
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

            {/* Next */}
            <button
              className="absolute right-4 z-10 text-white/70 hover:text-white transition-colors p-2"
              onClick={e => { e.stopPropagation(); next(); }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Caption */}
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
