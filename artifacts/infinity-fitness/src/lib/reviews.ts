// ============================================================
// REVIEWS — single source of truth for saari site reviews.
// Home page (sections/Reviews.tsx) + Reviews page (Testimonials.tsx)
// dono yahan se padhte hain → do jagah alag data, nahi duplicate.
// Naya real Google review add karna ho to bas is list me append karo.
// ============================================================

export type Review = {
  name: string;
  rating: number; // 1-5
  review: string;
  date: string;
  tag: 'Google Review' | 'Member';
};

// ── REAL Google reviews (owner ke Google Business listing se) ──
const googleReviews: Review[] = [
  {
    name: 'Mohit Bansal',
    rating: 5,
    review:
      "One of the best gyms in Kaithal. Even some of the facilities are even better than Gold's Gym. Very supportive staff. Keep up the good work.",
    date: '2 years ago',
    tag: 'Google Review',
  },
  {
    name: 'Suresh Kumar',
    rating: 5,
    review:
      'Great team to support and motivate you to achieve your goal. Ample space and equipments.',
    date: '2 years ago',
    tag: 'Google Review',
  },
  {
    name: 'Armaan Duhan',
    rating: 5,
    review: 'My experience is very excellent under the guidance of Sandeep sir in the gym!',
    date: '6 months ago',
    tag: 'Google Review',
  },
  {
    name: 'Pardeep Jangra',
    rating: 5,
    review: 'City best gym. The equipment and environment here are top notch.',
    date: '2 years ago',
    tag: 'Google Review',
  },
  {
    name: 'Nisha Virdi',
    rating: 5,
    review:
      'Experienced trainer. Good infrastructure and environment. All new machinery.',
    date: '2 years ago',
    tag: 'Google Review',
  },
  {
    name: 'Deepshikha Manjeet',
    rating: 5,
    review: 'Must join for a peaceful mind. Give it a trial and feel the difference!',
    date: '2 years ago',
    tag: 'Google Review',
  },
  {
    name: 'Gurpal Chahal',
    rating: 4,
    review: 'Good gym with a supportive crowd and solid equipment.',
    date: '11 months ago',
    tag: 'Google Review',
  },
];

// ── Existing member reviews (home + reviews page, pehle se site par the) ──
const memberReviews: Review[] = [
  {
    name: 'Vikram S.',
    rating: 5,
    review:
      'Best gym in Rishi Nagar area. The equipment is always clean, the trainers actually pay attention, and the vibe is perfect for serious lifting. Worth every rupee.',
    date: '2 years ago',
    tag: 'Member',
  },
  {
    name: 'Rahul Verma',
    rating: 5,
    review:
      'Joined for weight loss and already down 8kg. The community here pushes you to do better. Not overcrowded during morning hours which I love.',
    date: '6 months ago',
    tag: 'Member',
  },
  {
    name: 'Amit Kumar',
    rating: 4,
    review:
      'Affordable fee structure and great machines. The evening energy is insane, exactly what you need after a long day at work to get fired up.',
    date: '1 year ago',
    tag: 'Member',
  },
  {
    name: 'Priya Sharma',
    rating: 5,
    review:
      'Finally found a gym where trainers actually care. My posture has improved so much. The environment is very motivating and clean.',
    date: '8 months ago',
    tag: 'Member',
  },
  {
    name: 'Deepak Singh',
    rating: 5,
    review:
      "Best investment I've made for my health. The coaches here know their stuff. Gained 6kg of lean muscle in 6 months.",
    date: '1 year ago',
    tag: 'Member',
  },
  {
    name: 'Rohit Mehta',
    rating: 5,
    review:
      'Just started my fitness journey and the trainers made it so easy. Great atmosphere, modern equipment, very professional.',
    date: '3 months ago',
    tag: 'Member',
  },
  {
    name: 'Rahul Sharma',
    rating: 5,
    review:
      'Best gym in Kaithal. The trainers really care about your progress. The equipment is modern and the atmosphere makes you want to lift heavy.',
    date: '2 months ago',
    tag: 'Member',
  },
  {
    name: 'Priya Singh',
    rating: 5,
    review:
      'Lost 8 kg in 3 months here. The weight loss program is excellent and they really guide you on nutrition too. Highly recommended for beginners.',
    date: '1 month ago',
    tag: 'Member',
  },
  {
    name: 'Amit Verma',
    rating: 4,
    review:
      'Modern equipment and very clean. Value for money is great compared to other places in Rishi Nagar. The crowd is good and serious about fitness.',
    date: '3 weeks ago',
    tag: 'Member',
  },
  {
    name: 'Sunita Devi',
    rating: 5,
    review:
      'Started yoga here and now I feel amazing. Very welcoming community for women. The trainers make sure you do every exercise with proper form.',
    date: '4 months ago',
    tag: 'Member',
  },
  {
    name: 'Vikas Yadav',
    rating: 5,
    review:
      "Annual plan is a steal. Can't imagine going anywhere else. The heavy lifting section has everything a powerlifter needs.",
    date: '1 week ago',
    tag: 'Member',
  },
  {
    name: 'Neha Gupta',
    rating: 5,
    review:
      'The trainers pushed me beyond what I thought was possible. Love this place. Very safe and encouraging environment.',
    date: '5 months ago',
    tag: 'Member',
  },
];

// ── Saare reviews ek saath (full list) ──
export const allReviews: Review[] = [...googleReviews, ...memberReviews];

// ── Cube (Reviews page 3D cube) me dikhne wale top featured reviews ──
export const featuredReviews: Review[] = [
  googleReviews[0], // Mohit Bansal
  googleReviews[1], // Suresh Kumar
  memberReviews[0], // Vikram S.
  memberReviews[6], // Rahul Sharma
];

// ── Home page marquee (6-8 best, combine Google + member) ──
export const homeReviews: Review[] = [
  googleReviews[0], // Mohit Bansal
  memberReviews[0], // Vikram S.
  memberReviews[1], // Rahul Verma
  googleReviews[2], // Armaan Duhan
  memberReviews[3], // Priya Sharma
  googleReviews[5], // Deepshikha Manjeet
  memberReviews[4], // Deepak Singh
  memberReviews[11], // Neha Gupta
];

// ── Reviews page marquee (home/cube se alag subset) ──
export const pageMarqueeReviews: Review[] = [
  memberReviews[6], // Rahul Sharma
  memberReviews[7], // Priya Singh
  memberReviews[5], // Rohit Mehta
  googleReviews[3], // Pardeep Jangra
  memberReviews[9], // Sunita Devi
  googleReviews[4], // Nisha Virdi
  memberReviews[10], // Vikas Yadav
  googleReviews[6], // Gurpal Chahal
];

// ── Aggregate rating (Google listing ke hisaab se) ──
export const AVG_RATING = 4.2;
export const REVIEW_COUNT = 40;
export const REVIEW_COUNT_LABEL = `${REVIEW_COUNT}+ Google Reviews`;