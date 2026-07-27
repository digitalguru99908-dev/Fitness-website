import React, { useState, useEffect } from 'react';
import slide1 from '@assets/1_1785140838620.webp';
import slide2 from '@assets/2_1785140851182.webp';
import slide3 from '@assets/3_1785140851181.webp';
import slide4 from '@assets/4_1785140862774.webp';
import slide5 from '@assets/5_1785140862773.webp';
import slide6 from '@assets/6_1785140862772.webp';
import slide7 from '@assets/1a4c7a90-e805-426f-a6ee-c310dc609be2_1785141254714.webp';

const gymSlides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];

export function GymHeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % gymSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {gymSlides.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Infinity Fitness Gym ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000"
          style={{ opacity: i === current ? 0.75 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
    </div>
  );
}
