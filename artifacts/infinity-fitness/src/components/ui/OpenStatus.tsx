import React, { useEffect, useState } from 'react';
import { GYM_OPEN_HOUR, GYM_CLOSE_HOUR } from '@/lib/siteConfig';

export function isGymOpen(now: Date): boolean {
  const h = now.getHours();
  // 7 din khula. Timing 24h clock me: GYM_OPEN_HOUR se GYM_CLOSE_HOUR tak.
  // Agar CLOSE < OPEN (raat bhar), wrap-around handle karo.
  if (GYM_CLOSE_HOUR >= GYM_OPEN_HOUR) {
    return h >= GYM_OPEN_HOUR && h < GYM_CLOSE_HOUR;
  }
  return h >= GYM_OPEN_HOUR || h < GYM_CLOSE_HOUR;
}

export function OpenStatus({ className = '' }: { className?: string }) {
  const [open, setOpen] = useState<boolean>(() => isGymOpen(new Date()));

  useEffect(() => {
    const id = setInterval(() => setOpen(isGymOpen(new Date())), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${className}`}
      title={open ? 'Open Now' : 'Closed'}
    >
      <span className="relative flex h-2 w-2">
        {open && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${open ? 'bg-[#25D366]' : 'bg-red-500'}`}
        ></span>
      </span>
      {open ? 'Open Now' : 'Closed'}
    </span>
  );
}
