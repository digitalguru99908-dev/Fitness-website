import React from 'react';
import { motion } from 'framer-motion';
import galleryHero from '@assets/generated_images/gallery-hero.jpg';
import img1 from '@assets/generated_images/gallery-1.jpg';
import img2 from '@assets/generated_images/gallery-2.jpg';
import img3 from '@assets/generated_images/gallery-3.jpg';
import img4 from '@assets/generated_images/gallery-4.jpg';
import img5 from '@assets/generated_images/gallery-5.jpg';
import img6 from '@assets/generated_images/gallery-6.jpg';

// Combine images for a fuller grid (reusing some for layout purposes if fewer generated)
const images = [
  { src: img1, caption: "Squat Rack Weights" },
  { src: img2, caption: "Cardio Zone" },
  { src: img3, caption: "Functional Training" },
  { src: img4, caption: "Pull-Up Station" },
  { src: img5, caption: "Free Weights Area" },
  { src: img6, caption: "Powerlifting Setup" },
  { src: img3, caption: "Battle Ropes" },
  { src: img1, caption: "Heavy Iron" },
  { src: img5, caption: "Dumbbell Rack" },
];

export function Gallery() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50svh] min-h-[400px] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={galleryHero} 
            alt="Dramatic wide shot of gym floor" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          <div className="absolute inset-0 bg-black/50"></div>
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
                className={`group relative overflow-hidden bg-card ${
                  i === 0 || i === 5 ? 'row-span-2' : ''
                }`}
                style={{ aspectRatio: i === 0 || i === 5 ? '3/4' : '4/3' }}
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
    </div>
  );
}
