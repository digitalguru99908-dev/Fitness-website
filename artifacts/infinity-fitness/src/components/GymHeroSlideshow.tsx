import React, { useState, useEffect } from 'react';
import slide1 from '@assets/1_1785140838620.webp';
import slide2 from '@assets/2_1785140851182.webp';
import slide3 from '@assets/3_1785140851181.webp';
import slide4 from '@assets/4_1785140862774.webp';
import slide5 from '@assets/5_1785140862773.webp';
import slide6 from '@assets/6_1785140862772.webp';
import slide7 from '@assets/1a4c7a90-e805-426f-a6ee-c310dc609be2_1785141254714.webp';

interface Slide {
  src: string;
  /** Portrait photo (382x510) — wide desktop hero me 68% cut hoti hai,
      isliye sirf mobile par dikhati hain jahan vertical container hota hai */
  portrait?: boolean;
}

const gymSlides: Slide[] = [
  { src: slide1 },
  { src: slide2 },
  { src: slide3 },
  { src: slide4 },
  { src: slide5 },
  { src: slide6 },
  { src: slide7, portrait: true },
];

// Desktop ke liye sirf landscape slides
const landscapeSlides = gymSlides.filter(s => !s.portrait);

interface GymHeroSlideshowProps {
  /** Har page alag photo se start ho — loop aage same sequence me chalta rehta hai */
  startIndex?: number;
}

export function GymHeroSlideshow({ startIndex = 0 }: GymHeroSlideshowProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 4000);
    return () => clearInterval(timer);
  }, []);

  // Dono stacks same rhythm me ghoomte hain
  const dCurrent = ((startIndex % landscapeSlides.length) + tick) % landscapeSlides.length;
  const mCurrent = ((startIndex % gymSlides.length) + tick) % gymSlides.length;

  return (
    <div className="absolute inset-0 z-0">
      {/* Desktop/tablet — landscape slides */}
      <div className="hidden md:block absolute inset-0">
        {landscapeSlides.map((slide, i) => (
          <img
            key={i}
            src={slide.src}
            alt={`Infinity Fitness Gym ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000"
            style={{ opacity: i === dCurrent ? 1 : 0 }}
          />
        ))}
      </div>
      {/* Mobile — saari slides (portrait yahan poori dikhti hai) */}
      <div className="md:hidden absolute inset-0">
        {gymSlides.map((slide, i) => (
          <img
            key={i}
            src={slide.src}
            alt={`Infinity Fitness Gym ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000"
            style={{ opacity: i === mCurrent ? 1 : 0 }}
          />
        ))}
      </div>
      {/* Text readability ke liye darker scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10"></div>
    </div>
  );
}
