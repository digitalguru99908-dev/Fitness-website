import { Variants } from 'framer-motion';

/** Fade-up page transition variants */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
};

export const pageTransition = { duration: 0.35, ease: 'easeInOut' as const };

/**
 * Parent container that auto-staggers its children.
 * Apply to the grid wrapper; each child should use `fadeUpItem`.
 */
export const staggerContainer = (stagger = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  },
});

/** Standard card/list-item reveal variant */
export const fadeUpItem: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};
