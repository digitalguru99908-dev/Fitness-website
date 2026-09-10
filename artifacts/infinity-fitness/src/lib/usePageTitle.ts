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
    description: `${SITE_NAME} is the best gym in ${LOCATION} — Strength Training, Cardio, Weight Loss, Weight Gain, Yoga & Personal Training in Rishi Nagar. Open till 11 PM daily. Serving Titram, Keorak, Geong, Chandana, Shergarh, Deod Kheri, Khurana, Sanghan, Patti Afghan & all nearby villages in ${LOCATION} district.`,
  },
  '/about': {
    title: `About ${SITE_NAME} | Best Fitness Center in ${LOCATION}`,
    description: `About ${SITE_NAME} ${LOCATION} — Kaithal's trusted fitness center in Rishi Nagar. Our story, mission, and commitment to helping every member achieve their fitness goals with affordable plans and hands-on personal training.`,
  },
  '/services': {
    title: `Gym Services & Training Programs | ${SITE_NAME} ${LOCATION}`,
    description: `Gym programs in ${LOCATION} — Strength Training, Cardio, Weight Loss, Weight Gain, Yoga & Personal Training with modern equipment at Rishi Nagar. Book your free trial today.`,
  },
  '/membership': {
    title: `Gym Membership Plans & Pricing | ${SITE_NAME} ${LOCATION}`,
    description: `Affordable gym membership in ${LOCATION} — ₹2,000/month, ₹6,000 for 6 months, ₹11,000/year. No joining fee. ${SITE_NAME} offers transparent pricing and a free trial.`,
  },
  '/gallery': {
    title: `Gym Gallery & Photos | ${SITE_NAME} ${LOCATION}`,
    description: `Take a look inside ${SITE_NAME} — Kaithal's best gym in Rishi Nagar with modern equipment, spacious workout floors, cardio zone, powerlifting area and more. See why members love us.`,
  },
  '/testimonials': {
    title: `Member Reviews & Testimonials | ${SITE_NAME} ${LOCATION}`,
    description: `Read real reviews from members of ${SITE_NAME}, the best gym in ${LOCATION}. Rated 4.2/5 on Google with 40+ reviews. Find out why members call us Kaithal's top fitness center.`,
  },
  '/contact': {
    title: `Contact ${SITE_NAME} | Best Gym in ${LOCATION}`,
    description: `Contact ${SITE_NAME}, ${LOCATION} — Rishi Nagar, Dhand Rd, 136027. Call +91 81688 28832 for membership, timings & free trial. Open 5 AM–11 PM daily. Serving Titram, Keorak, Geong, Chandana, Shergarh, Deod Kheri, Khurana, Sanghan, Patti Afghan & all nearby villages.`,
  },
  '/owner': {
    title: `Our Story | ${SITE_NAME} ${LOCATION}`,
    description: `Meet the owner of ${SITE_NAME} — the man building ${LOCATION}'s strongest fitness community in Rishi Nagar with 10+ years of experience and 500+ members trained.`,
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
