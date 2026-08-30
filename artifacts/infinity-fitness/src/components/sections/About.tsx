import React from 'react';
import { Reveal } from '../ui/reveal';

export const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <Reveal direction="right">
              <div className="relative z-10 border-l-4 border-primary pl-6 py-2">
                <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-6 text-foreground leading-tight">
                  More Than Just <br/>A Gym. We Are A <span className="text-primary">Community.</span>
                </h2>
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    Infinity Fitness Gym isn't a glossy corporate chain where you're just a barcode. We are a real neighbourhood gym in Kaithal built for everyday people who want to transform their bodies and their lives.
                  </p>
                  <p>
                    When you walk in, you'll hear the clanging of iron and feel an electric energy. It's dark, it's intense, but most importantly, it's welcoming. Whether you're lifting for the first time or prepping for a competition, you belong here.
                  </p>
                  <p className="font-medium text-foreground">
                    Serious equipment, affordable prices, and a grind-it-out spirit. That's who we are.
                  </p>
                </div>
                
                <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8">
                  <div>
                    <h4 className="text-sm uppercase tracking-widest text-primary mb-1">Location</h4>
                    <p className="text-foreground font-medium">Opp. Maharaja Palace,<br/>Rishi Nagar, Kaithal</p>
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-widest text-primary mb-1">Hours</h4>
                    <p className="text-foreground font-medium">Open Daily<br/>Closes 11 PM</p>
                  </div>
                </div>
              </div>
            </Reveal>
            
            {/* Decorative background elements */}
            <div className="absolute top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-2xl -z-10" />
          </div>
          
          <div className="order-1 lg:order-2">
            <Reveal direction="left">
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-sm relative z-10 border border-border shadow-2xl">
                  {/* Using an unslpash image of someone training hard in a dark gym */}
                  <img 
                    src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" 
                    alt="Infinity Fitness Gym interior" 
                    className="w-full h-full object-cover grayscale contrast-125"
                  />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                
                {/* Accent box behind */}
                <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-primary/30 z-0 rounded-sm" />
                <div className="absolute top-8 -right-8 w-32 h-32 bg-primary/20 backdrop-blur-sm z-20 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                  <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                    <path id="curve" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                    <text className="font-display uppercase tracking-[0.2em] text-[11px] fill-primary font-bold">
                      <textPath href="#curve" startOffset="0%">
                        NO EXCUSES • JUST RESULTS • NO EXCUSES • JUST RESULTS • 
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </Reveal>
          </div>
          
        </div>
      </div>
    </section>
  );
};
