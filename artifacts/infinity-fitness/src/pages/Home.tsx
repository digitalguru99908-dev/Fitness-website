import React from 'react';
import { Link } from 'wouter';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Phone, Dumbbell, HeartPulse, TrendingUp, Flame, Leaf, Zap } from 'lucide-react';
import { GymHeroSlideshow } from '@/components/GymHeroSlideshow';
import { Reviews } from '@/components/sections/Reviews';
import { staggerContainer, fadeUpItem } from '@/lib/animation';

const homeServices = [
  { icon: Dumbbell, title: "Strength Training" },
  { icon: HeartPulse, title: "Cardio" },
  { icon: TrendingUp, title: "Weight Gain" },
  { icon: Flame, title: "Weight Loss" },
  { icon: Leaf, title: "Yoga" },
  { icon: Zap, title: "Modern Equipment" },
];

export function Home() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center pt-20 overflow-hidden">
        <GymHeroSlideshow />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold uppercase tracking-tight text-white mb-6 leading-tight">
              Transform Your Body,<br />
              <span className="text-primary text-glow">Transform Your Life</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-10 font-medium">
              Kaithal's premier community gym — real equipment, real results, real people.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <motion.div
              whileHover={prefersReduced ? {} : { scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={prefersReduced ? {} : { scale: 0.95, transition: { duration: 0.1 } }}
            >
              <Link
                href="/membership"
                className="inline-flex items-center justify-center bg-gold text-gold-foreground px-8 py-4 font-display font-bold text-xl uppercase tracking-wider skew-x-[-10deg] hover:bg-gold/90 transition-colors group"
                style={{ boxShadow: '0 0 30px hsl(38 91% 55% / 0.3)' }}
              >
                <span className="skew-x-[10deg] flex items-center gap-2">
                  Join Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
            <motion.div
              whileHover={prefersReduced ? {} : { scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={prefersReduced ? {} : { scale: 0.95, transition: { duration: 0.1 } }}
            >
              <a
                href="tel:07206333820"
                className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 font-display font-bold text-xl uppercase tracking-wider skew-x-[-10deg] hover:bg-white/20 transition-colors group"
              >
                <span className="skew-x-[10deg] flex items-center gap-2">
                  <Phone className="w-5 h-5" /> Call Now
                </span>
              </a>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-5 text-sm text-muted-foreground tracking-wide"
          >
            <span className="text-gold font-bold">✓</span> First visit free — no commitment
          </motion.p>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>
        <div className="absolute -left-40 top-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-wider">
              More Than Just A <span className="text-primary">Gym</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Infinity Fitness isn't a corporate chain where you're just a number. It's a neighborhood powerhouse in Kaithal built for those who take their goals seriously. We provide the heavy iron, the modern machines, and the intense atmosphere you need to push past your limits.
            </p>
            <div>
              <Link href="/about" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider hover:text-white transition-colors group">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-wider mb-4">
                Our <span className="text-primary">Programs</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Targeted training for every goal. Whatever you want to achieve, we have the tools and the expertise to get you there.
              </p>
            </div>
            <Link href="/services" className="shrink-0 flex items-center gap-2 text-primary font-bold uppercase tracking-wider hover:text-white transition-colors group">
              See All Services <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {/* Stagger container — replaces per-item delay: i * 0.1 */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {homeServices.map((service) => (
              <motion.div key={service.title} variants={fadeUpItem}>
                <motion.div
                  className="bg-card border border-white/5 p-6 md:p-8 hover:border-primary/50 transition-colors group flex flex-col items-center text-center gap-4 h-full"
                  whileHover={prefersReduced ? {} : {
                    y: -4,
                    boxShadow: '0 6px 24px rgba(139,92,246,0.14)',
                    transition: { duration: 0.22 },
                  }}
                  whileTap={prefersReduced ? {} : { scale: 0.98, transition: { duration: 0.1 } }}
                >
                  <div className="w-16 h-16 rounded-full bg-background border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors group-hover:box-glow">
                    <service.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display font-bold uppercase tracking-wide text-lg md:text-xl">{service.title}</h3>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Member Reviews */}
      <Reviews />

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-primary/20 via-primary to-accent relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-white mb-8">
            Ready to Start Your Journey?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={prefersReduced ? {} : { scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={prefersReduced ? {} : { scale: 0.95, transition: { duration: 0.1 } }}
            >
              <Link
                href="/membership"
                className="inline-flex items-center justify-center bg-gold text-gold-foreground px-8 py-4 font-display font-bold text-xl uppercase tracking-wider skew-x-[-10deg] hover:bg-gold/90 transition-colors shadow-2xl group"
              >
                <span className="skew-x-[10deg] flex items-center gap-2">
                  Join Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
            <motion.div
              whileHover={prefersReduced ? {} : { scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={prefersReduced ? {} : { scale: 0.95, transition: { duration: 0.1 } }}
            >
              <a
                href="tel:07206333820"
                className="inline-flex items-center justify-center bg-transparent border-2 border-black text-black px-8 py-4 font-display font-bold text-xl uppercase tracking-wider skew-x-[-10deg] hover:bg-black/10 transition-colors group"
              >
                <span className="skew-x-[10deg] flex items-center gap-2">
                  <Phone className="w-5 h-5" /> Call Now
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
