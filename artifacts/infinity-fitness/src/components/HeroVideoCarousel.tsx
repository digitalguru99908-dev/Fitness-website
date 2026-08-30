import React, { useEffect, useRef } from 'react';
import { useVideoPauseOnHidden } from '@/lib/useVideoPauseOnHidden';

export function HeroVideoCarousel() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useVideoPauseOnHidden(videoRef);

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

    // Perf: video hero scroll se bahar jaate hi pause (decode loop tabhi chale
    // jab user use dekh raha ho), wapas dikhe to resume.
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

  return (
    <div className="absolute inset-0 z-0 bg-black overflow-hidden">
      <video
        ref={videoRef}
        src="/infinity.mp4"
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
