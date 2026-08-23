import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star, MessageSquare, Volume2, VolumeX } from 'lucide-react';
import { staggerContainer, fadeUpItem } from '@/lib/animation';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const reviews = [
  {
    name: "Rahul Sharma",
    review: "Best gym in Kaithal. The trainers really care about your progress. The equipment is modern and the atmosphere makes you want to lift heavy.",
    rating: 5,
    date: "2 months ago"
  },
  {
    name: "Priya Singh",
    review: "Lost 8 kg in 3 months here. The weight loss program is excellent and they really guide you on nutrition too. Highly recommended for beginners.",
    rating: 5,
    date: "1 month ago"
  },
  {
    name: "Amit Verma",
    review: "Modern equipment and very clean. Value for money is great compared to other places in Rishi Nagar. The crowd is good and serious about fitness.",
    rating: 4,
    date: "3 weeks ago"
  },
  {
    name: "Sunita Devi",
    review: "Started yoga here and now I feel amazing. Very welcoming community for women. The trainers make sure you do every exercise with proper form.",
    rating: 5,
    date: "4 months ago"
  },
  {
    name: "Vikas Yadav",
    review: "Annual plan is a steal. Can't imagine going anywhere else. The heavy lifting section has everything a powerlifter needs.",
    rating: 5,
    date: "1 week ago"
  },
  {
    name: "Neha Gupta",
    review: "The trainers pushed me beyond what I thought was possible. Love this place. Very safe and encouraging environment.",
    rating: 5,
    date: "5 months ago"
  }
];

export function Testimonials() {
  const prefersReduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = true;
    const tryPlay = () => {
      vid.play().catch(() => {});
    };
    if (vid.readyState >= 2) {
      tryPlay();
    } else {
      vid.addEventListener('canplay', tryPlay, { once: true });
    }
  }, []);

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section — client review reel card + ambient blurred backdrop */}
      <section className="relative pt-32 pb-16 flex items-center justify-center overflow-hidden bg-[#050505]">
        {/* Ambient backdrop — same video, blurred, sirf vibe ke liye */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            src="/client-review.mp4"
            className="absolute inset-0 w-full h-full object-cover scale-125 blur-3xl opacity-35"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/55 to-[#050505]/80"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left max-w-xl"
            >
              <p className="text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-4">
                Real Members &middot; Real Results
              </p>
              <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight text-white mb-6">
                What Our <span className="text-primary text-glow">Members Say</span>
              </h1>
              <p className="text-lg text-muted-foreground font-medium">
                Client review suno unhi ki zubani — seedha gym floor se.
              </p>
            </motion.div>

            {/* Reel-style portrait video card — poori video dikhti hai (no face crop) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
              whileHover={prefersReduced ? {} : { scale: 1.02, transition: { duration: 0.25 } }}
              className="relative w-64 md:w-72 shrink-0"
            >
              <div className="absolute -inset-3 bg-gradient-to-b from-primary/25 to-transparent rounded-3xl blur-xl opacity-70"></div>
              <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/15 shadow-2xl ring-1 ring-white/10 bg-black">
                <video
                  ref={videoRef}
                  src="/client-review.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />

                {/* Mute / Unmute toggle */}
                <button
                  onClick={toggleMute}
                  aria-label={muted ? 'Unmute video' : 'Mute video'}
                  title={muted ? 'Unmute' : 'Mute'}
                  className="absolute bottom-3 right-3 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 hover:border-primary/50 transition-all"
                >
                  {muted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Reviews Content */}
      <section className="pb-24 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Rating Callout — animated counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center justify-center text-center mb-16 bg-card border border-white/5 py-12 px-6 max-w-3xl mx-auto"
          >
            <div className="text-7xl font-display font-bold text-white mb-4 tracking-tighter">
              <AnimatedCounter to={4.2} decimals={1} duration={1.4} />
              <span className="text-4xl text-muted-foreground">/5.0</span>
            </div>
            <div className="flex gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-8 h-8 ${i < 4 ? 'fill-primary text-primary' : 'fill-primary/20 text-primary/20'}`} />
              ))}
            </div>
            <p className="text-xl text-gray-300 font-medium">
              Based on <AnimatedCounter to={40} suffix="+ Google Reviews" duration={1.2} />
            </p>
          </motion.div>

          {/* Review Grid — staggered cascade */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            variants={staggerContainer(0.09)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {reviews.map((item, i) => (
              <motion.div key={i} variants={fadeUpItem}>
                <motion.div
                  className="bg-[#080808] border border-white/5 p-8 relative flex flex-col hover:border-primary/30 transition-colors h-full"
                  whileHover={prefersReduced ? {} : {
                    y: -4,
                    boxShadow: '0 8px 28px rgba(139,92,246,0.12)',
                    transition: { duration: 0.22 },
                  }}
                  whileTap={prefersReduced ? {} : { scale: 0.99, transition: { duration: 0.1 } }}
                >
                  <MessageSquare className="absolute top-8 right-8 w-8 h-8 text-primary/10" />
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-4 h-4 ${j < item.rating ? 'fill-primary text-primary' : 'fill-primary/20 text-primary/20'}`} />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-8 flex-grow leading-relaxed">
                    "{item.review}"
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="font-display font-bold uppercase tracking-wider text-white">
                      {item.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.date}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <div className="text-center">
            <motion.a
              href="https://www.google.com/maps/search/Infinity+Fitness+Gym,+Rishi+Nagar,+Kaithal"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 font-display font-bold text-xl uppercase tracking-wider skew-x-[-10deg] box-glow"
              whileHover={prefersReduced ? {} : { scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={prefersReduced ? {} : { scale: 0.96, transition: { duration: 0.1 } }}
            >
              <span className="skew-x-[10deg]">Share Your Story on Google</span>
            </motion.a>
          </div>

        </div>
      </section>
    </div>
  );
}
