import React, { useEffect, useRef } from 'react';

export function HeroVideoCarousel() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = true;
    vid.volume = 0;

    const tryPlay = () => {
      vid.play().catch(() => {});
    };

    if (vid.readyState >= 2) {
      tryPlay();
    } else {
      vid.addEventListener('canplay', tryPlay, { once: true });
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-black overflow-hidden">
      <video
        ref={videoRef}
        src="/hero-bg.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
    </div>
  );
}
