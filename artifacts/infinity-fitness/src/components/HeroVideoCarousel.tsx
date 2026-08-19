import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function HeroVideoCarousel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const vid = videoRef.current;
    const aud = audioRef.current;
    if (!vid) return;

    vid.muted = true;
    vid.volume = 0;
    if (aud) aud.muted = true;
    vid.load();

    const startBoth = () => {
      vid.play().then(() => {
        if (aud) {
          aud.currentTime = 0;
          aud.play().catch(() => {});
        }
        setTimeout(() => {
          if (aud) aud.muted = false;
          setMuted(false);
        }, 2000);
      }).catch(() => {});
    };

    if (vid.readyState >= 2) {
      startBoth();
    } else {
      vid.addEventListener('canplay', startBoth, { once: true });
    }

    return () => {
      vid.removeEventListener('canplay', startBoth);
    };
  }, []);

  const toggleMute = () => {
    const vid = videoRef.current;
    const aud = audioRef.current;
    if (aud) {
      aud.muted = !aud.muted;
      setMuted(aud.muted);
    }
  };

  return (
    <>
      <div className="absolute inset-0 z-0 bg-black overflow-hidden">
        <audio ref={audioRef} src="/hero-audio.mp3" loop muted preload="auto" />
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

      <button
        onClick={toggleMute}
        aria-label={muted ? 'Unmute' : 'Mute'}
        title={muted ? 'Sound ON karo' : 'Sound OFF karo'}
        className="absolute bottom-5 right-4 z-20 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </>
  );
}
