import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Dumbbell, Sparkles, Users, Phone, Instagram, Award, Heart } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { GymHeroSlideshow } from '@/components/GymHeroSlideshow';
import about1 from '@assets/generated_images/about-1.jpg';
import about2 from '@assets/generated_images/about-2.jpg';
import about3 from '@assets/generated_images/about-3.jpg';
import about4 from '@assets/generated_images/about-4.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const ownerStats = [
  { icon: Dumbbell, label: 'Years in Fitness', value: '10+' },
  { icon: Users,   label: 'Members Trained',  value: '500+' },
  { icon: Award,   label: 'Certifications',   value: '3+' },
  { icon: Heart,   label: 'Lives Changed',    value: '1000+' },
];

const ownerValues = [
  {
    title: 'Commitment to Community',
    desc: 'Every member is treated like family. No judgment, no ego — just hard work and mutual respect.',
  },
  {
    title: 'Results-First Approach',
    desc: 'Programs are built around real goals: weight loss, muscle gain, endurance, or simply feeling better.',
  },
  {
    title: 'Affordable for Everyone',
    desc: 'Quality fitness should not be a luxury. Infinity Fitness was built to be accessible to every person in Kaithal.',
  },
  {
    title: 'Hands-On Guidance',
    desc: 'The owner is present on the floor daily — personally ensuring every member trains safely and effectively.',
  },
];

export function About() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60svh] min-h-[400px] flex items-center justify-center pt-20 overflow-hidden">
        <GymHeroSlideshow />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight text-white mb-4">
              Our <span className="text-primary text-glow">Story</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium uppercase tracking-widest">
              Built for the people of Kaithal
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed"
          >
            <p>
              Infinity Fitness Gym wasn't built to be just another place with some treadmills and weights. We set out to create a sanctuary for those who are serious about changing themselves. A place where the iron speaks louder than excuses.
            </p>
            <p>
              Located in the heart of Kaithal on Dhand Road, we've poured our passion into curating a gym environment that fosters raw power and community warmth. Whether you're here to lose weight, build massive strength, or just find your daily peace, our doors are open to everyone willing to put in the work.
            </p>
            <p>
              We believe fitness isn't a luxury—it's a necessity. That's why we combine top-tier, modern equipment with affordable memberships. When you step into Infinity Fitness, you're not a client; you're family.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#050505] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-wider mb-4">
              Why Choose <span className="text-primary">Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Expert Trainers",
                desc: "Certified professionals who care about your form, progress, and goals as much as you do."
              },
              {
                icon: Dumbbell,
                title: "Modern Equipment",
                desc: "From heavy free weights to the latest cardio machines, we have everything you need."
              },
              {
                icon: Sparkles,
                title: "Clean & Hygienic",
                desc: "Immaculate locker rooms, sanitized equipment, and a fresh environment every single day."
              },
              {
                icon: Users,
                title: "Community Vibe",
                desc: "A supportive, grind-it-out atmosphere where everyone pushes each other to be better."
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-white/5 p-8 text-center group hover:border-primary/50 transition-colors"
              >
                <div className="mx-auto w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-bold uppercase tracking-wider text-xl mb-3 text-white">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet the Founder ── */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          {/* Section label */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-3">The Man Behind The Mission</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white uppercase">
              Meet Our <span className="text-primary">Founder</span>
            </h2>
          </motion.div>

          {/* Profile grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Photo placeholder */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
              className="relative"
            >
              <div className="aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 overflow-hidden relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-28 h-28 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center">
                    <span className="font-display text-5xl font-bold text-primary">IF</span>
                  </div>
                  <p className="text-muted-foreground text-sm text-center px-6">
                    Owner photo coming soon
                  </p>
                </div>
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary" />
              </div>
              <div className="absolute -bottom-6 -right-4 lg:right-0 bg-primary text-black font-display font-bold px-6 py-4 shadow-2xl">
                <p className="text-3xl leading-none">10+</p>
                <p className="text-xs uppercase tracking-widest mt-1">Years Experience</p>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
              className="space-y-6 pt-8 lg:pt-0"
            >
              <div>
                <p className="text-primary font-semibold uppercase tracking-[0.25em] text-sm mb-2">Owner &amp; Head Trainer</p>
                <h3 className="font-display font-bold text-4xl sm:text-5xl text-white uppercase mb-1">
                  [Owner Name]
                </h3>
                <p className="text-muted-foreground text-sm">Infinity Fitness Gym, Kaithal</p>
              </div>

              <div className="w-16 h-1 bg-primary" />

              <p className="text-muted-foreground leading-relaxed text-lg">
                With over a decade of hands-on experience in fitness and personal training, the founder of Infinity Fitness Gym turned a simple passion for health into Kaithal's most trusted fitness community. Starting from humble beginnings, the vision was always clear — bring world-class training to everyday people at a price that never excludes anyone.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, Infinity Fitness stands as proof that dedication beats expensive memberships. Every program, every piece of equipment, and every interaction on the gym floor reflects a single belief:{' '}
                <span className="text-white font-medium">anyone can transform, if they have the right environment and the right guide.</span>
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="tel:07206333820"
                  className="flex items-center gap-2 bg-primary text-black font-display font-bold uppercase tracking-wider px-6 py-3 hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Us
                </a>
                <a
                  href="https://wa.me/917206333820"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border border-[#25D366] text-[#25D366] font-display font-bold uppercase tracking-wider px-6 py-3 hover:bg-[#25D366]/10 transition-colors"
                >
                  <FaWhatsapp size={18} />
                  WhatsApp
                </a>
                <a
                  href="https://instagram.com/infinityfitnessgyms"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border border-white/20 text-white font-display font-bold uppercase tracking-wider px-6 py-3 hover:border-primary hover:text-primary transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              </div>
            </motion.div>
          </div>

          {/* Stats bar */}
          <div className="bg-primary py-12 px-4 -mx-4 sm:mx-0 sm:rounded-none grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {ownerStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-black/60 mx-auto mb-3" />
                <p className="font-display font-bold text-4xl text-black leading-none">{stat.value}</p>
                <p className="text-black/70 text-sm uppercase tracking-widest mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Core Values */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-3">What We Stand For</p>
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-white uppercase">Our Core Values</h3>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ownerValues.map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}
                className="bg-[#111] border border-white/5 p-8 hover:border-primary/30 transition-colors group"
              >
                <div className="w-8 h-1 bg-primary mb-6 group-hover:w-16 transition-all duration-300" />
                <h4 className="font-display font-bold text-xl text-white uppercase mb-3">{v.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-square md:aspect-[4/3] bg-card overflow-hidden group"
            >
              <img src={about1} alt="Community training" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="aspect-square md:aspect-[4/3] bg-card overflow-hidden group"
            >
              <img src={about2} alt="Modern equipment room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="aspect-square md:aspect-[4/3] bg-card overflow-hidden group"
            >
              <img src={about3} alt="Personal training session" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="aspect-square md:aspect-[4/3] bg-card overflow-hidden group"
            >
              <img src={about4} alt="Gym entrance" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
