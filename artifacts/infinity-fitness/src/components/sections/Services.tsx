import React from 'react';
import { Dumbbell, Activity, Scale, TrendingDown, Flower2, Settings2 } from 'lucide-react';
import { Reveal } from '../ui/reveal';

const services = [
  {
    title: "Strength Training",
    description: "Build raw power and muscle with our extensive free weights, squat racks, and specialized strength equipment.",
    icon: Dumbbell,
    delay: 0.1
  },
  {
    title: "Cardio",
    description: "Improve stamina and heart health with top-tier treadmills, ellipticals, and stationary bikes.",
    icon: Activity,
    delay: 0.2
  },
  {
    title: "Weight Gain",
    description: "Targeted programs and guidance for those looking to build healthy mass and bulk up effectively.",
    icon: Scale,
    delay: 0.3
  },
  {
    title: "Weight Loss",
    description: "High-intensity routines and fat-burning programs designed to transform your physique.",
    icon: TrendingDown,
    delay: 0.4
  },
  {
    title: "Yoga",
    description: "Enhance flexibility, core strength, and mental focus with guided sessions in a dedicated space.",
    icon: Flower2,
    delay: 0.5
  },
  {
    title: "Modern Equipment",
    description: "Train on well-maintained, heavy-duty machinery built for serious lifters and real results.",
    icon: Settings2,
    delay: 0.6
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-[#0a0a0a] relative border-t border-b border-border">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Reveal>
            <h3 className="text-primary font-display tracking-widest uppercase text-sm mb-2">Our Arsenal</h3>
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-white mb-4">Everything You Need <br className="hidden md:block"/>To <span className="text-primary">Transform</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We don't do gimmicks. We provide the raw tools and programs you need to reach your peak potential, whatever your goal may be.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Reveal key={index} delay={service.delay} direction="up">
              <div className="bg-card border border-border p-8 rounded-sm hover:border-primary/50 transition-all duration-300 group hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-secondary rounded-sm flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                    <service.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white uppercase tracking-wide mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary/20 rotate-45 group-hover:bg-primary transition-colors duration-300" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
