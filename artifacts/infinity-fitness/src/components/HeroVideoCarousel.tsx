/**
 * HeroVideoCarousel — Video-only background for the hero section.
 * Renders as absolute inset-0 with overlay gradients.
 * Audio: attempts unmuted autoplay; falls back to muted if browser blocks it.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

import videoSrc from '@assets/VID_20260731_230129_059_bsl_1785615546095.mp4';

export function HeroVideoCarousel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false); // default: unmuted (user request)

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    // Try to play with audio; fall back to muted autoplay if browser blocks it
    vid.muted = false;
    vid.play().catch(() => {
      vid.muted = true;
      setMuted(true);
      vid.play().catch(() => {}); // final silent fallback
    });
  }, []);

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
  };

  return (
    <>
      {/* Full-screen video background */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          playsInline
          preload="auto"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Dark overlay so text remains readable */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Bottom gradient fade to blend into sections below */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      </div>

      {/* Mute / Unmute toggle — bottom-right corner */}
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        title={muted ? 'Unmute video' : 'Mute video'}
        className="absolute bottom-5 right-4 z-20 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </>
  );
}
