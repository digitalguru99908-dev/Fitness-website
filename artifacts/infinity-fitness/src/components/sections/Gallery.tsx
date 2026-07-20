import React from 'react';
import { Reveal } from '../ui/reveal';
import gallery1 from '../../../attached_assets/gallery-1.jpg';
import gallery2 from '../../../attached_assets/gallery-2.jpg';
import gallery3 from '../../../attached_assets/gallery-3.jpg';
import gallery4 from '../../../attached_assets/gallery-4.jpg';
import gallery5 from '../../../attached_assets/gallery-5.jpg';
import gallery6 from '../../../attached_assets/gallery-6.jpg';

export const Gallery = () => {
  const images = [
    { src: gallery1, alt: "Dumbbell rack in dark gym" },
    { src: gallery2, alt: "Squat rack with orange glow" },
    { src: gallery3, alt: "Cardio section in dark gym" },
    { src: gallery4, alt: "Weight plates close up" },
    { src: gallery5, alt: "Gym floor with benches" },
    { src: gallery6, alt: "Person lifting in dark gym" },
  ];

  return (
    <section id="gallery" className="py-24 bg-[#050505] border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <Reveal direction="left" width="w-auto">
            <h3 className="text-primary font-display tracking-widest uppercase text-sm mb-2">The Dungeon</h3>
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-white">Inside The <span className="text-primary">Iron</span></h2>
          </Reveal>
          <Reveal direction="right" width="w-auto">
            <a 
              href="https://instagram.com/infinityfitnessgyms" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border-b border-border hover:border-primary pb-1"
            >
              Follow us @infinityfitnessgyms
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <Reveal key={index} delay={index * 0.1} direction="up">
              <div className="group relative aspect-square overflow-hidden rounded-sm bg-card border border-border">
                {/* Fallback pattern while images load/generate */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiMzMzMiLz48L3N2Zz4=')] opacity-20 z-0"></div>
                
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                  onError={(e) => {
                    // Fallback to placeholder if asset isn't ready
                    e.currentTarget.src = `https://images.unsplash.com/photo-${[
                      '1534438327276-14e5300c3a48', 
                      '1571019614242-c5c5dee9f50b', 
                      '1540497077202-7c8a3999166f',
                      '1517836357463-d25dfeac3438',
                      '1574680096145-d05b474e2155',
                      '1581009146145-b5ef050c2e1e'
                    ][index]}?q=80&w=800&auto=format&fit=crop`;
                  }}
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-6">
                  <div className="w-10 h-[2px] bg-primary mb-3 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
