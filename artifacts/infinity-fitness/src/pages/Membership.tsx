import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { GymHeroSlideshow } from '@/components/GymHeroSlideshow';

const faqs = [
  {
    q: "Can I freeze my membership?",
    a: "Yes, you can freeze your membership once per term for up to 30 days due to medical reasons, travel, or personal emergencies."
  },
  {
    q: "Is there a joining fee?",
    a: "No joining fee, ever. We believe in transparent pricing. You only pay the membership amount."
  },
  {
    q: "Can I try before joining?",
    a: "Absolutely. Visit us any day during off-peak hours for a free tour of the facility."
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept Cash, UPI (Google Pay, PhonePe, Paytm), and direct bank transfers."
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Yes, you can upgrade from monthly to 6-month or yearly anytime. We will simply adjust the price difference."
  }
];

export function Membership() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60svh] min-h-[400px] flex items-center justify-center pt-20 overflow-hidden">
        <GymHeroSlideshow />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight text-white mb-4">
              Membership <span className="text-primary text-glow">Plans</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium uppercase tracking-widest">
              Invest in yourself. Start today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
            
            {/* Standard Monthly */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-white/10 p-8 flex flex-col h-full rounded-sm"
            >
              <h3 className="font-display text-2xl font-bold uppercase text-white mb-2">Standard Monthly</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-primary font-display text-5xl font-bold">₹2,000</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <div className="h-px w-full bg-white/10 mb-6"></div>
              <ul className="space-y-4 mb-8 flex-grow text-gray-300">
                <li className="flex gap-3">✓ Full gym access</li>
                <li className="flex gap-3">✓ Modern equipment</li>
                <li className="flex gap-3">✓ Locker room access</li>
                <li className="flex gap-3 text-muted-foreground">× No long-term commitment</li>
              </ul>
              <Link href="/contact" className="w-full block text-center border border-white/20 text-white font-display font-bold uppercase py-4 skew-x-[-10deg] hover:bg-white/5 transition-colors mt-auto group">
                <div className="skew-x-[10deg] flex items-center justify-center gap-2">
                  Join Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>

            {/* 1-Year Package - Highly Elevated */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border-2 border-primary p-10 flex flex-col h-[105%] relative shadow-[0_0_50px_rgba(255,107,0,0.2)] rounded-sm z-10"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-sm font-bold uppercase tracking-widest py-1.5 px-6 whitespace-nowrap shadow-lg">
                Best Value · Most Popular
              </div>
              <h3 className="font-display text-3xl font-bold uppercase text-white mb-2 mt-2">1-Year Package</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-primary font-display text-6xl font-bold text-glow">₹11,000</span>
                <span className="text-muted-foreground">total</span>
              </div>
              <div className="bg-[#25D366]/10 text-[#25D366] font-bold text-sm uppercase px-3 py-1.5 rounded-sm inline-block mb-6 w-fit border border-[#25D366]/20">
                Save ₹13,000 vs monthly
              </div>
              <div className="h-px w-full bg-white/10 mb-6"></div>
              <ul className="space-y-4 mb-8 flex-grow text-gray-200">
                <li className="flex gap-3 font-medium">✓ Full gym access for 12 months</li>
                <li className="flex gap-3 font-medium">✓ Modern equipment</li>
                <li className="flex gap-3 font-medium">✓ Locker room access</li>
                <li className="flex gap-3 font-medium text-primary">✓ Free fitness assessment</li>
                <li className="flex gap-3 font-medium text-primary">✓ Priority support</li>
              </ul>
              <Link href="/contact" className="w-full block text-center bg-primary text-white font-display font-bold text-lg uppercase py-5 skew-x-[-10deg] hover:bg-primary/90 transition-colors mt-auto box-glow hover:scale-105 active:scale-95 group">
                <div className="skew-x-[10deg] flex items-center justify-center gap-2">
                  Claim Offer <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>

            {/* 6-Month Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card border border-white/10 p-8 flex flex-col h-full relative rounded-sm"
            >
              <div className="absolute top-0 right-0 bg-white/10 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-bl-sm">
                Limited Time Offer
              </div>
              <h3 className="font-display text-2xl font-bold uppercase text-white mb-2">6-Month Package</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-primary font-display text-5xl font-bold">₹6,000</span>
                <span className="text-muted-foreground">total</span>
              </div>
              <div className="bg-[#25D366]/10 text-[#25D366] font-bold text-sm uppercase px-3 py-1.5 rounded-sm inline-block mb-6 w-fit border border-[#25D366]/20">
                Save ₹6,000 vs monthly
              </div>
              <div className="h-px w-full bg-white/10 mb-6"></div>
              <ul className="space-y-4 mb-8 flex-grow text-gray-300">
                <li className="flex gap-3">✓ Full gym access for 6 months</li>
                <li className="flex gap-3">✓ Modern equipment</li>
                <li className="flex gap-3">✓ Locker room access</li>
                <li className="flex gap-3">✓ Flexible payment options</li>
              </ul>
              <Link href="/contact" className="w-full block text-center border border-white/20 text-white font-display font-bold uppercase py-4 skew-x-[-10deg] hover:bg-white/5 transition-colors mt-auto group">
                <div className="skew-x-[10deg] flex items-center justify-center gap-2">
                  Join Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>

          </div>
          
          {/* Savings Callout */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-primary/10 border border-primary/20 p-6 md:p-8 text-center max-w-4xl mx-auto"
          >
            <p className="text-xl md:text-2xl font-display uppercase font-bold text-white">
              On the 1-Year plan you pay just <span className="text-primary text-glow text-3xl mx-2">₹917/month</span> 
              <span className="text-muted-foreground text-lg block sm:inline mt-2 sm:mt-0 sm:ml-2">compared to ₹2,000 on monthly</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#050505] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-wider mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-card border border-white/5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer text-lg font-bold uppercase font-display tracking-wide text-white group-hover:text-primary transition-colors">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-gray-400">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
