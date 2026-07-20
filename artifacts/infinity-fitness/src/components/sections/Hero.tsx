import React from 'react';
import { Reveal } from '../ui/reveal';

export const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image / Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop")',
          filter: 'grayscale(100%) contrast(120%)'
        }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-background/60 to-transparent" />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 z-10 opacity-20 pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <div className="container relative z-20 mx-auto px-4 md:px-6 flex flex-col items-start pt-12 md:pt-0">
        <Reveal direction="up" delay={0.1}>
          <div className="inline-flex items-center gap-3 mb-6 bg-secondary/50 backdrop-blur-sm border border-border px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Kaithal's Premier Community Gym</span>
          </div>
        </Reveal>
        
        <Reveal direction="up" delay={0.2}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold uppercase leading-[0.9] tracking-tighter mb-4 text-white">
            Transform Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400 text-glow">Body,</span> Transform <br />
            Your Life
          </h1>
        </Reveal>
        
        <Reveal direction="up" delay={0.3}>
          <p className="max-w-xl text-lg md:text-xl text-muted-foreground mb-10 mt-4 leading-relaxed">
            Raw power meets community warmth. No luxury fluff, just real equipment, real results, and a grind-it-out spirit right here in Rishi Nagar.
          </p>
        </Reveal>
        
        <Reveal direction="up" delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a 
              href="#plans" 
              className="bg-primary text-white px-8 py-4 rounded-sm font-display font-bold uppercase tracking-wider text-lg hover:bg-primary/90 transition-all text-center box-glow-hover transform hover:-translate-y-1"
            >
              Join Now
            </a>
            <a 
              href="tel:07206333820" 
              className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-sm font-display font-bold uppercase tracking-wider text-lg hover:bg-white hover:text-black transition-all text-center transform hover:-translate-y-1"
            >
              Call Now
            </a>
          </div>
        </Reveal>
        
        <Reveal direction="up" delay={0.6}>
          <div className="mt-16 flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-3xl font-display font-bold text-white">4.2<span className="text-primary text-xl">★</span></span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Google Rating</span>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="flex flex-col">
              <span className="text-3xl font-display font-bold text-white">3K<span className="text-primary text-xl">+</span></span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Insta Followers</span>
            </div>
          </div>
        </Reveal>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-display">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};
