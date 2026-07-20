import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Dumbbell, Sparkles, Users } from 'lucide-react';
import aboutHero from '@assets/generated_images/about-hero.jpg';
import about1 from '@assets/generated_images/about-1.jpg';
import about2 from '@assets/generated_images/about-2.jpg';
import about3 from '@assets/generated_images/about-3.jpg';
import about4 from '@assets/generated_images/about-4.jpg';

export function About() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60svh] min-h-[400px] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={aboutHero} 
            alt="Wide gym interior" 
            className="w-full h-full object-cover opacity-50"
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
