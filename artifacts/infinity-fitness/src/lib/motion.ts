import { useContext } from 'react';
import { MotionConfigContext } from 'framer-motion';

/**
 * Animations-disable flag jo MotionConfig se aata hai.
 *
 * App.tsx me hum root par `<MotionConfig reducedMotion="never">` set karte hain,
 * isliye ye function hamesha `false` return karta hai:
 *  - `reducedMotion="never"` → animations is device par bhi full chalti hain
 *  - chahe user ke OS/browser me "prefers-reduced-motion" ON ho ya OFF
 *
 * Hamne framer ka `useReducedMotion()` use NAHI kiya kyunki wo raw OS preference
 * return karta hai (MotionConfig ke bahar) + console me dev-only warning chipkata
 * hai: "You have Reduced Motion enabled on your device. Animations may not appear
 * as expected." — ye site normal hi chalti hai, warning aur MotionConfig se
 * disabled animations hi asli kar ke laggy/"ghatiya" feel dete the.
 */
export function useForceReducedMotion(): boolean {
  const { reducedMotion } = useContext(MotionConfigContext);
  return reducedMotion === 'always';
}