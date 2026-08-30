import React from 'react';
import { motion } from 'framer-motion';
import { useForceReducedMotion } from '@/lib/motion';
import { Dumbbell, HeartPulse, TrendingUp, Flame, Leaf, Zap, CheckCircle2 } from 'lucide-react';
import { GymHeroSlideshow } from '@/components/GymHeroSlideshow';
import { staggerContainer, fadeUpItem } from '@/lib/animation';

const programs = [
  {
    id: 'strength',
    title: 'Strength Training',
    icon: Dumbbell,
    description: 'Build raw power and muscle mass with our extensive free weights area. Whether you are a powerlifter or just starting to lift, we have the iron you need.',
    inclusions: ['Free weights & barbells', 'Multiple power racks', 'Progressive overload tracking']
  },
  {
    id: 'cardio',
    title: 'Cardio',
    icon: HeartPulse,
    description: 'Improve your endurance, cardiovascular health, and stamina. Our cardio zone features top-of-the-line equipment designed to keep your heart rate up.',
    inclusions: ['Treadmills & ellipticals', 'Stationary cycles', 'Rowing machines']
  },
  {
    id: 'weight-gain',
    title: 'Weight Gain',
    icon: TrendingUp,
    description: 'Struggling to put on size? Our specialized bulking programs combine heavy lifting protocols with precise nutritional guidance to help you pack on muscle.',
    inclusions: ['Muscle building protocols', 'Nutrition & supplement guidance', 'Hypertrophy focus']
  },
  {
    id: 'weight-loss',
    title: 'Weight Loss',
    icon: Flame,
    description: 'Torch fat and lean out with high-intensity training. We focus on sustainable weight loss through metabolic conditioning and proper diet advice.',
    inclusions: ['Fat loss programs', 'HIIT workouts', 'Metabolic conditioning']
  },
  {
    id: 'yoga',
    title: 'Yoga',
    icon: Leaf,
    description: 'Find your center, improve flexibility, and enhance recovery. Our yoga sessions are designed to complement your heavy lifting and reduce stress.',
    inclusions: ['Flexibility training', 'Mindfulness & breath work', 'All experience levels']
  },
  {
    id: 'modern-equipment',
    title: 'Modern Equipment',
    icon: Zap,
    description: 'Isolate muscles effectively and train safely with our extensive range of modern pin-loaded machines, cables, and functional training tools.',
    inclusions: ['Latest selectorized machines', 'Cable crossover stations', 'Functional training area']
  }
];

export function Services() {
  const prefersReduced = useForceReducedMotion();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[80svh] min-h-[520px] flex items-center justify-center pt-20 overflow-hidden">
        <GymHeroSlideshow startIndex={2} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight text-white mb-4">
              Our <span className="text-primary text-glow">Programs</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium uppercase tracking-widest">
              Training for every goal, every level
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* staggerContainer replaces per-item delay: i * 0.1 */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer(0.09)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {programs.map((program) => (
              <motion.div
                key={program.id}
                variants={fadeUpItem}
                whileHover={prefersReduced ? {} : {
                  y: -4,
                  boxShadow: '0 6px 24px rgba(139,92,246,0.18)',
                  transition: { duration: 0.22 },
                }}
                whileTap={prefersReduced ? {} : { scale: 0.98, transition: { duration: 0.1 } }}
                className="bg-card border border-white/5 p-8 flex flex-col hover:border-primary/30 transition-colors group relative overflow-hidden cursor-default"
              >
                {/* Accent glow on hover */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>

                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-16 h-16 bg-white/5 rounded flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors box-glow">
                    <program.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wider text-white">
                    {program.title}
                  </h2>
                </div>

                <p className="text-muted-foreground text-lg mb-8 leading-relaxed relative z-10 flex-grow">
                  {program.description}
                </p>

                <div className="space-y-3 relative z-10">
                  {program.inclusions.map((item, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-300 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
