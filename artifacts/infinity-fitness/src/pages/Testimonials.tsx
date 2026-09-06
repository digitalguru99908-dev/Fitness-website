import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useForceReducedMotion } from '@/lib/motion';
import { useVideoPauseOnHidden } from '@/lib/useVideoPauseOnHidden';
import { Star, MessageSquare, Volume2, VolumeX, Quote } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import {
  allReviews,
  featuredReviews,
  pageMarqueeReviews,
  AVG_RATING,
  REVIEW_COUNT,
  type Review,
} from '@/lib/reviews';

// 3D cube ke 4 faces par dikhne wale top featured reviews
const facePositions = ['front', 'right', 'back', 'left'] as const;

// Seamless infinite marquee ke liye list ek baar double
const marqueeReviews = [...pageMarqueeReviews, ...pageMarqueeReviews];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, j) => (
        <Star key={j} className={`w-4 h-4 ${j < count ? 'fill-primary text-primary' : 'fill-primary/20 text-primary/20'}`} />
      ))}
    </div>
  );
}

function CubeFace({ item, position }: { item: Review; position: (typeof facePositions)[number] }) {
  return (
    <div className={`cube-face cube-face-${position} bg-[#0b0b0b] border border-white/10 p-5 sm:p-6 flex flex-col overflow-hidden`}>
      <MessageSquare className="absolute top-5 right-5 w-7 h-7 text-primary/10" />
      <Stars count={item.rating} />
      <p className="text-gray-200 italic text-sm leading-relaxed my-4 flex-grow">
        "{item.review}"
      </p>
      <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3">
        <span className="font-display font-bold uppercase tracking-wider text-white text-sm">
          {item.name}
        </span>
        <span className="text-xs text-muted-foreground">
          {item.tag === 'Google Review' ? `Google · ${item.date}` : item.date}
        </span>
      </div>
    </div>
  );
}

// Naam ke initials nikalta hai (e.g. "Mohit Bansal" -> "MB")
function initialsOf(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

// Circular gradient avatar — initials + animated gradient ring
function InitialsAvatar({ item, size = 'md' }: { item: Review; size?: 'md' | 'lg' }) {
  const dim = size === 'lg' ? 'w-14 h-14' : 'w-11 h-11';
  const ring = size === 'lg' ? '-inset-1.5' : '-inset-1';
  const text = size === 'lg' ? 'text-base' : 'text-sm';
  return (
    <div className="relative shrink-0">
      <div className={`absolute ${ring} rounded-full blur-md opacity-45 animate-gradient-flow pointer-events-none`}
        style={{
          background: 'linear-gradient(135deg, #ff6a00, #ff3d00, #ff8c33, #ff6a00)',
          backgroundSize: '300% 300%',
        }} />
      <div className={`relative ${dim} rounded-full flex items-center justify-center overflow-hidden`}
        style={{
          background: 'linear-gradient(160deg, #1a1a1a, #0d0d0d)',
          border: '1.5px solid rgba(255,106,0,0.35)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5), 0 0 16px rgba(255,106,0,0.12)',
        }}>
        <span className={`${text} font-display font-black text-transparent animate-gradient-flow`}
          style={{
            backgroundImage: 'linear-gradient(135deg, #ff8c33, #ff6a00, #ff3d00)',
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}>
          {initialsOf(item.name)}
        </span>
      </div>
    </div>
  );
}

// 3D tilt review card — cursor-follow rotate + glow
function TiltReviewCard({ item, delay }: { item: Review; delay: number }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, type: 'spring', damping: 20, stiffness: 180 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,106,0,0.16) 0%, transparent 65%)' }} />
      {/* Gradient border on hover */}
      <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(255,106,0,0.5), rgba(255,61,0,0.2), rgba(255,140,51,0.4))' }} />

      <div className="relative h-full flex flex-col p-6 sm:p-7 rounded-2xl overflow-hidden bg-[#080808] border border-white/5 group-hover:border-transparent transition-colors duration-500"
        style={{ transform: 'translateZ(20px)', backgroundImage: 'linear-gradient(180deg, rgba(20,20,26,0.6), rgba(8,8,8,0.9))' }}>
        {/* Top row — avatar + quote */}
        <div className="flex items-start gap-4" style={{ transform: 'translateZ(30px)' }}>
          <InitialsAvatar item={item} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="font-display font-bold uppercase tracking-wider text-white text-sm">
                {item.name}
              </span>
              <Quote className="w-5 h-5 text-primary/40 shrink-0" />
            </div>
            <span className="text-xs text-muted-foreground mt-0.5 inline-block">
              {item.tag === 'Google Review' ? `Google · ${item.date}` : item.date}
            </span>
            <div className="mt-2">
              <Stars count={item.rating} />
            </div>
          </div>
        </div>

        {/* Review text */}
        <p className="text-gray-300 mt-4 flex-grow leading-relaxed text-[15px]">
          "{item.review}"
        </p>

        {/* Google badge */}
        {item.tag === 'Google Review' && (
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2" style={{ transform: 'translateZ(20px)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary/60">
              Verified Google Review
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const prefersReduced = useForceReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Perf: cube/marquee viewport se bahar ho to animation ruk jaye (weak GPU
  // par har frame ka GPU kaam tabhi chalega jab user section dekh raha ho).
  const cubeRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const cubeInView = useInView(cubeRef, { margin: '100px 0px' });
  const marqueeInView = useInView(marqueeRef, { margin: '100px 0px' });

  useVideoPauseOnHidden(videoRef);

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

    // Perf: reel card viewport se bahar ho to decode loop pause ho jaye
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(vid);
    return () => {
      io.disconnect();
      vid.pause();
    };
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
        {/* Ambient backdrop — full-screen blur-3xl video + blur-xl glow ne GPU
            ko har frame par bhaari recomposite karta tha (perf fix). Ab static
            subtle radial glow + gradient — dikhne me same vibe, near-zero cost. */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full bg-primary/10 blur-2xl"></div>
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
              <div className="absolute -inset-2 bg-gradient-to-b from-primary/20 to-transparent rounded-3xl blur-lg opacity-50"></div>
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
            className="flex flex-col items-center justify-center text-center mb-20 bg-card border border-white/5 py-12 px-6 max-w-3xl mx-auto"
          >
            <div className="text-7xl font-display font-bold text-white mb-4 tracking-tighter">
              <AnimatedCounter to={AVG_RATING} decimals={1} duration={1.4} />
              <span className="text-4xl text-muted-foreground">/5.0</span>
            </div>
            <div className="flex gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-8 h-8 ${i < 4 ? 'fill-primary text-primary' : 'fill-primary/20 text-primary/20'}`} />
              ))}
            </div>
            <p className="text-xl text-gray-300 font-medium">
              Based on <AnimatedCounter to={REVIEW_COUNT} suffix="+ Google Reviews" duration={1.2} />
            </p>
          </motion.div>

          {/* Featured Reviews — rotating 3D cube */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-4">
              Featured Reviews
            </p>
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-white">
              Hear It From <span className="text-primary text-glow">Every Angle</span>
            </h2>
            <p className="text-muted-foreground mt-4 font-medium">
              Hover over the cube to pause it and read the reviews.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative flex justify-center mb-20"
          >
            {/* Ambient glow behind the cube — chhota + kam blur (perf: rotating cube
                ke peeche bada blur har frame recomposite karta tha) */}
            <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-primary/10 blur-2xl pointer-events-none"></div>

            <div className="cube-scene relative" ref={cubeRef}>
              <div className={`cube cube-spin ${cubeInView ? '' : 'cube-spin-offscreen'}`}>
                {featuredReviews.map((item, i) => (
                  <CubeFace key={i} item={item} position={facePositions[i]} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Reviews Marquee — infinite loop, hover par pause */}
          <div className="relative mb-20">
            <div className="overflow-hidden py-2">
              <div ref={marqueeRef} className={`flex items-stretch gap-6 w-max pr-6 animate-marquee ${marqueeInView ? '' : 'animate-marquee-offscreen'}`}>
                {marqueeReviews.map((item, i) => (
                  <div
                    key={i}
                    aria-hidden={i >= pageMarqueeReviews.length}
                    className="w-[300px] sm:w-[380px] shrink-0 bg-[#080808] border border-white/5 p-6 sm:p-7 relative flex flex-col"
                  >
                    <MessageSquare className="absolute top-6 right-6 w-7 h-7 text-primary/10" />
                    <Stars count={item.rating} />
                    <p className="text-gray-300 italic mt-4 mb-6 flex-grow leading-relaxed">
                      "{item.review}"
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="font-display font-bold uppercase tracking-wider text-white">
                        {item.name}
                      </span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-3">
                        {item.tag === 'Google Review' ? `Google · ${item.date}` : item.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Dono taraf edge fade — cards smooth fade-out hoke loop me wapas aate hain */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-background to-transparent"></div>
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-background to-transparent"></div>
          </div>

          {/* All Reviews — static grid (saare reviews readable + SEO indexable) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-4">
              &middot; Real Google Reviews &middot;
            </p>
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-white">
              Every Review <span className="text-primary text-glow">Counts</span>
            </h2>
            <p className="text-muted-foreground mt-4 font-medium">
              {allReviews.length} reviews taken directly from our Google business listing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-20">
            {allReviews.map((item, i) => (
              <TiltReviewCard key={i} item={item} delay={(i % 3) * 0.08} />
            ))}
          </div>

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
