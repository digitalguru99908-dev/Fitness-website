/**
 * HeroPhotoStrip
 *
 * Renders two groups of 4 gym photos as a joined collage strip with a looping
 * animation sequence:
 *
 *   Joined strip → 360° spin → split into individual frames
 *   → hold → merge back to joined → spin-transition to next group → repeat
 *
 * All animation is Framer Motion / GPU-composited (transform only).
 */
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

// ── 8 gym photos split into two groups of 4 ─────────────────────────────────
import p1 from '@assets/file_0000000046608208ba36dee87d0a73b8_1785615546023.png';
import p2 from '@assets/file_00000000c7608208930d451b5a477dab_1785615546040.png';
import p3 from '@assets/file_000000000a708208b3e914e3eef173f1_1785615546050.png';
import p4 from '@assets/file_0000000074388208a8815a71a7fbb8fe_1785615546061.png';
import p5 from '@assets/file_0000000058708208bf9028fd3f84fc37_1785615546072.png';
import p6 from '@assets/file_00000000ebb08208a4ae08625f30b3c0_1785615546080.png';
import p7 from '@assets/file_00000000968c820883eca274f123764c_1785615546087.png';
import p8 from '@assets/file_00000000c0148208839e71034406f00a_1785615133984.png';

const GROUPS = [
  [p1, p2, p3, p4],
  [p5, p6, p7, p8],
] as const;

// ── Layout constants ─────────────────────────────────────────────────────────
/**
 * How far each photo travels outward from the strip centre when split.
 * Photo i shifts by (i − 1.5) × SPLIT_GAP pixels on the X axis.
 * Indices:  0→−1.5×, 1→−0.5×, 2→+0.5×, 3→+1.5×
 */
const SPLIT_GAP = 22; // px

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

// ── Component ────────────────────────────────────────────────────────────────
export function HeroPhotoStrip() {
  const [group, setGroup]   = useState(0);
  const [split, setSplit]   = useState(false);
  const stripCtrl           = useAnimation();
  const mounted             = useRef(true);

  useEffect(() => {
    mounted.current = true;

    const go = async () => {
      // ── Spin the current group in from 90° (edge-on) to 0° ──────────────
      stripCtrl.set({ rotateY: 90 });

      let g = 0;

      while (mounted.current) {
        // 1. Switch to this group (photos appear at x=0, strip at rotateY=90)
        setGroup(g);
        setSplit(false);

        // 2. Spin in: 90° → 0°
        await stripCtrl.start({
          rotateY: 0,
          transition: { duration: 0.55, ease: [0.2, 0, 0.05, 1] },
        });
        if (!mounted.current) break;

        // 3. Hold as joined strip
        await sleep(2300);
        if (!mounted.current) break;

        // 4. Full 360° spin (the "wow" flip)
        await stripCtrl.start({
          rotateY: 360,
          transition: { duration: 0.9, ease: [0.42, 0, 0.58, 1] },
        });
        if (!mounted.current) break;
        stripCtrl.set({ rotateY: 0 }); // reset counter without animation

        // 5. Split photos apart (x offsets open up)
        setSplit(true);
        await sleep(580); // wait for CSS transition to finish
        if (!mounted.current) break;

        // 6. Hold as individual frames
        await sleep(2100);
        if (!mounted.current) break;

        // 7. Merge back into joined strip
        setSplit(false);
        await sleep(580);
        if (!mounted.current) break;

        // 8. Brief pause on joined
        await sleep(350);
        if (!mounted.current) break;

        // 9. Spin out: 0° → −90° (goes edge-on from the other side)
        await stripCtrl.start({
          rotateY: -90,
          transition: { duration: 0.5, ease: [0.55, 0, 1, 0.45] },
        });
        if (!mounted.current) break;

        // 10. Swap group while invisible (edge-on), reset to +90° for next spin-in
        g = 1 - g;
        setSplit(false);
        stripCtrl.set({ rotateY: 90 });

        await sleep(40); // let React flush the new group's photo elements
      }
    };

    go();

    return () => {
      mounted.current = false;
      stripCtrl.stop();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const photos = GROUPS[group];

  return (
    <div className="flex flex-col items-center select-none">
      {/* Perspective parent — required for 3-D rotateY to look correct */}
      <div style={{ perspective: '1100px' }}>
        <motion.div
          animate={stripCtrl}
          style={{
            display:        'flex',
            transformStyle: 'preserve-3d',
            willChange:     'transform',
          }}
        >
          {photos.map((src, i) => (
            <motion.div
              key={`${group}-${i}`}
              animate={{ x: split ? (i - 1.5) * SPLIT_GAP : 0 }}
              transition={{
                duration: 0.55,
                ease:     split ? [0.15, 0, 0, 1] : [0.6, 0, 0.2, 1],
              }}
              style={{ flexShrink: 0, willChange: 'transform' }}
            >
              <div
                className="overflow-hidden border-[3px] border-white"
                style={{
                  width:  'clamp(74px, 11.5vw, 172px)',
                  height: 'clamp(99px, 15.3vw, 229px)', /* 4:3 portrait ratio */
                }}
              >
                <img
                  src={src}
                  alt={`Infinity Fitness gym photo ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Subtle caption */}
      <p
        className="mt-3 text-white/40 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-medium"
        aria-hidden="true"
      >
        Infinity Fitness — Kaithal
      </p>
    </div>
  );
}
