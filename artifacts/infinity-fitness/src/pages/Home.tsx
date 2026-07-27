import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Dumbbell, HeartPulse, TrendingUp, Flame, Leaf, Zap, Star } from 'lucide-react';
import slide1 from '@assets/image_1785133577611.png';
import slide2 from '@assets/image_1785133588675.png';
import slide3 from '@assets/image_1785133601743.png';
import slide4 from '@assets/image_1785133617558.png';
import slide5 from '@assets/image_1785133629842.png';
import slide6 from '@assets/image_1785133649795.png';

const heroSlides = [slide1, slide2, slide3, slide4, slide5, slide6];

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroSlides.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Infinity Fitness Gym slide ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000"
              style={{ opacity: i === currentSlide ? 0.45 : 0 }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

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
            <Link href="/membership" className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 font-display font-bold text-xl uppercase tracking-wider skew-x-[-10deg] hover:bg-primary/90 transition-colors box-glow hover:scale-105 active:scale-95 group">
              <span className="skew-x-[10deg] flex items-center gap-2">
                Join Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <a href="tel:07206333820" className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 font-display font-bold text-xl uppercase tracking-wider skew-x-[-10deg] hover:bg-white/20 transition-colors hover:scale-105 active:scale-95 group">
              <span className="skew-x-[10deg] flex items-center gap-2">
                <Phone className="w-5 h-5" /> Call Now
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Decorative elements */}
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
              <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-wider mb-4">Our <span className="text-primary">Programs</span></h2>
              <p className="text-muted-foreground max-w-2xl">Targeted training for every goal. Whatever you want to achieve, we have the tools and the expertise to get you there.</p>
            </div>
            <Link href="/services" className="shrink-0 flex items-center gap-2 text-primary font-bold uppercase tracking-wider hover:text-white transition-colors group">
              See All Services <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: Dumbbell, title: "Strength Training" },
              { icon: HeartPulse, title: "Cardio" },
              { icon: TrendingUp, title: "Weight Gain" },
              { icon: Flame, title: "Weight Loss" },
              { icon: Leaf, title: "Yoga" },
              { icon: Zap, title: "Modern Equipment" },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-white/5 p-6 md:p-8 hover:border-primary/50 transition-colors group flex flex-col items-center text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-background border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors group-hover:box-glow">
                  <service.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-bold uppercase tracking-wide text-lg md:text-xl">{service.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Highlight */}
      <section className="py-24 bg-background relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-wider mb-4">Invest in <span className="text-primary">Yourself</span></h2>
            <p className="text-muted-foreground">Straightforward pricing. No hidden fees. Just results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Standard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-white/10 p-8 flex flex-col"
            >
              <h3 className="font-display text-2xl font-bold uppercase mb-2">Standard</h3>
              <div className="text-primary font-display text-4xl font-bold mb-6">₹2,000<span className="text-lg text-muted-foreground">/mo</span></div>
              <ul className="space-y-3 mb-8 flex-grow text-muted-foreground">
                <li className="flex gap-2">✓ Full gym access</li>
                <li className="flex gap-2">✓ Modern equipment</li>
                <li className="flex gap-2">✓ Locker room access</li>
              </ul>
            </motion.div>

            {/* 1 Year - Highlighted */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card border-2 border-primary relative p-8 flex flex-col transform md:-translate-y-4 shadow-[0_0_40px_rgba(255,107,0,0.15)]"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-4 whitespace-nowrap">
                Best Value · Most Popular
              </div>
              <h3 className="font-display text-2xl font-bold uppercase mb-2 text-white">1-Year Package</h3>
              <div className="text-primary font-display text-4xl font-bold mb-2">₹11,000</div>
              <div className="text-sm font-semibold text-green-500 mb-6 bg-green-500/10 inline-block px-2 py-1 rounded w-fit">Save ₹13,000 vs monthly</div>
              <ul className="space-y-3 mb-8 flex-grow text-gray-300">
                <li className="flex gap-2">✓ Full gym access</li>
                <li className="flex gap-2">✓ Modern equipment</li>
                <li className="flex gap-2">✓ Free fitness assessment</li>
                <li className="flex gap-2">✓ Priority support</li>
              </ul>
              <Link href="/membership" className="w-full text-center bg-primary text-white font-display font-bold uppercase py-3 skew-x-[-10deg] hover:bg-primary/90 transition-colors">
                <div className="skew-x-[10deg]">Join Now</div>
              </Link>
            </motion.div>

            {/* 6 Month */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border border-white/10 p-8 flex flex-col relative"
            >
              <div className="absolute top-0 right-0 bg-white/10 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-bl-lg">
                Limited Offer
              </div>
              <h3 className="font-display text-2xl font-bold uppercase mb-2">6-Month Package</h3>
              <div className="text-primary font-display text-4xl font-bold mb-2">₹6,000</div>
              <div className="text-sm font-semibold text-green-500 mb-6 bg-green-500/10 inline-block px-2 py-1 rounded w-fit">Save ₹6,000 vs monthly</div>
              <ul className="space-y-3 mb-8 flex-grow text-muted-foreground">
                <li className="flex gap-2">✓ Full gym access</li>
                <li className="flex gap-2">✓ Modern equipment</li>
                <li className="flex gap-2">✓ Locker room access</li>
              </ul>
            </motion.div>
          </div>

          <div className="text-center">
            <Link href="/membership" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider hover:text-white transition-colors group">
              View Full Plans & Details <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials — Auto-looping carousel */}
      <section className="py-24 bg-[#050505] border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-primary text-primary" />
            ))}
          </div>
          <h2 className="text-5xl font-display font-bold mb-2">4.2 / 5.0</h2>
          <p className="text-muted-foreground">Based on 40+ Google Reviews</p>
        </div>

        {/* Marquee track */}
        <div
          className="group overflow-hidden cursor-default select-none"
          title="Hover to pause"
        >
          <div className="animate-marquee flex gap-6 w-max pause-marquee-target">
            {[
              { name: "Rahul Sharma",   stars: 5, text: "Best gym in Kaithal. The trainers really care about your progress and the equipment is top notch." },
              { name: "Priya Singh",    stars: 5, text: "Lost 8 kg in 3 months here. The weight loss program is excellent and the environment is very supportive." },
              { name: "Amit Kumar",     stars: 5, text: "The atmosphere here is unmatched. Everyone motivates each other and the trainers are always available to guide you." },
              { name: "Neha Yadav",     stars: 5, text: "Affordable prices with world-class facilities. I joined 6 months ago and already see a huge difference in my strength." },
              { name: "Suresh Verma",   stars: 4, text: "Modern equipment and clean facilities. The owner himself trains alongside members which is very inspiring." },
              { name: "Pooja Devi",     stars: 5, text: "Finally a gym that feels like family. No judgment, just pure dedication and results. Highly recommend to everyone!" },
              /* ── duplicate for seamless loop ── */
              { name: "Rahul Sharma",   stars: 5, text: "Best gym in Kaithal. The trainers really care about your progress and the equipment is top notch." },
              { name: "Priya Singh",    stars: 5, text: "Lost 8 kg in 3 months here. The weight loss program is excellent and the environment is very supportive." },
              { name: "Amit Kumar",     stars: 5, text: "The atmosphere here is unmatched. Everyone motivates each other and the trainers are always available to guide you." },
              { name: "Neha Yadav",     stars: 5, text: "Affordable prices with world-class facilities. I joined 6 months ago and already see a huge difference in my strength." },
              { name: "Suresh Verma",   stars: 4, text: "Modern equipment and clean facilities. The owner himself trains alongside members which is very inspiring." },
              { name: "Pooja Devi",     stars: 5, text: "Finally a gym that feels like family. No judgment, just pure dedication and results. Highly recommend to everyone!" },
            ].map((review, i) => (
              <div
                key={i}
                className="w-[300px] sm:w-[340px] shrink-0 bg-card border border-white/5 p-6 relative group-hover:[animation-play-state:paused]"
              >
                <div className="text-primary text-4xl font-display opacity-20 absolute top-4 right-4">"</div>
                <div className="flex text-primary mb-3">
                  {[...Array(review.stars)].map((_, j) => <Star key={j} className="w-4 h-4 fill-primary" />)}
                </div>
                <p className="text-gray-300 italic mb-4 relative z-10 text-sm leading-relaxed">"{review.text}"</p>
                <div className="font-bold uppercase tracking-wider text-sm text-white">{review.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-primary/20 via-primary to-accent relative overflow-hidden text-center">
        {/* Noise overlay pattern */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-white mb-8">
            Ready to Start Your Journey?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/membership" className="inline-flex items-center justify-center bg-black text-white px-8 py-4 font-display font-bold text-xl uppercase tracking-wider skew-x-[-10deg] hover:bg-gray-900 transition-colors shadow-2xl hover:scale-105 active:scale-95 group">
              <span className="skew-x-[10deg] flex items-center gap-2">
                Join Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <a href="tel:07206333820" className="inline-flex items-center justify-center bg-transparent border-2 border-black text-black px-8 py-4 font-display font-bold text-xl uppercase tracking-wider skew-x-[-10deg] hover:bg-black/10 transition-colors hover:scale-105 active:scale-95 group">
              <span className="skew-x-[10deg] flex items-center gap-2">
                <Phone className="w-5 h-5" /> Call Now
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
