import { useEffect, type RefObject } from 'react';

/**
 * Tab hidden/visible hote hi autoplay video pause/resume ho jaye.
 *
 * Browser me video decode ka CPU/GPU load continuous hota hai — agar user
 * dusri tab me hai tab bhi video decode chalta rehta hai aur weak machines
 * par poore system me jank aa jaati hai. Ye hook ensure karta hai ki video
 * tabhi decode ho jab user asal me us tab me ho. Visual quality par koi
 * farak nahi padta — bas load use hata deta hai jo dikhta hi nahi.
 */
export function useVideoPauseOnHidden(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const onVisibility = () => {
      if (document.hidden) {
        vid.pause();
      } else {
        vid.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [videoRef]);
}