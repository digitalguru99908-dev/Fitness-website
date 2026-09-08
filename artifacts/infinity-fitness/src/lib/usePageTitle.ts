import { useEffect } from 'react';

const SITE_NAME = 'Infinity Fitness Gym';
const LOCATION = 'Kaithal';

interface PageMeta {
  title: string;
  description: string;
}

export const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: `Best Gym in ${LOCATION} | ${SITE_NAME} | Fitness & Training`,
    description: `Kaithal's premier community gym — Strength Training, Cardio, Weight Loss, Weight Gain, Yoga & Personal Training. Open all 7 days till 11 PM.`,
  },
  '/about': {
    title: `About ${SITE_NAME} | Best Fitness Center in ${LOCATION}`,
    description: `Learn about ${SITE_NAME} ${LOCATION} — our story, mission, and commitment to helping every member achieve fitness goals with affordable plans and hands-on training.`,
  },
  '/services': {
    title: `Gym Services & Training Programs | ${SITE_NAME} ${LOCATION}`,
    description: `Explore gym programs at ${SITE_NAME} ${LOCATION} — Strength Training, Cardio, Weight Loss, Weight Gain, Yoga & Modern Equipment. Join the best gym in Kaithal today.`,
  },
  '/membership': {
    title: `Gym Membership Plans & Pricing | ${SITE_NAME} ${LOCATION}`,
    description: `Affordable gym membership in ${LOCATION} — ₹2,000/month, ₹6,000 for 6 months, ₹11,000/year. No joining fee, ${SITE_NAME} offers a free trial and transparent pricing.`,
  },
  '/gallery': {
    title: `Gym Gallery & Photos | ${SITE_NAME} ${LOCATION}`,
    description: `Take a look inside ${SITE_NAME} Gym ${LOCATION} — modern equipment, spacious workout floors, cardio zone, powerlifting area and more. See why we're Kaithal's best gym.`,
  },
  '/testimonials': {
    title: `Member Reviews & Testimonials | ${SITE_NAME} ${LOCATION}`,
    description: `Read real reviews from members of ${SITE_NAME} Gym ${LOCATION}. Rated 4.2/5 on Google with 40+ reviews. Find out why members call us the best gym in Kaithal.`,
  },
  '/contact': {
    title: `Contact ${SITE_NAME} | Best Gym in ${LOCATION}`,
    description: `Contact ${SITE_NAME} Gym ${LOCATION} — Rishi Nagar, Kaithal–Dhand Rd, Haryana 136027. Call +91 81688 28832 for membership, timings & free trial. Open 5 AM – 11 PM daily.`,
  },
  '/owner': {
    title: `Our Story | ${SITE_NAME} ${LOCATION}`,
    description: `Meet the owner of ${SITE_NAME} Gym ${LOCATION} — the man building Kaithal's strongest fitness community with 10+ years of experience and 500+ members trained.`,
  },
};

function setMetaDescription(description: string): void {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'description';
    document.head.appendChild(meta);
  }
  meta.content = description;
}

export function usePageTitle(path: string): void {
  useEffect(() => {
    const meta = PAGE_META[path];
    if (meta) {
      document.title = meta.title;
      setMetaDescription(meta.description);
    }
  }, [path]);
}
