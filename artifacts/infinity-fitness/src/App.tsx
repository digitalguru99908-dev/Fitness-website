import React from 'react';
import { Switch, Route, Router, useLocation } from 'wouter';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ChatBot } from '@/components/ChatBot';
import { ScrollToTop } from '@/components/ScrollToTop';
import { FreeTrialModalProvider } from '@/components/free-trial/FreeTrialProvider';
import { MobileCtaBar } from '@/components/MobileCtaBar';
import { useForceReducedMotion } from '@/lib/motion';

import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Services } from '@/pages/Services';
import { Membership } from '@/pages/Membership';
import { Gallery } from '@/pages/Gallery';
import { Contact } from '@/pages/Contact';
import { Testimonials } from '@/pages/Testimonials';
import { Owner } from '@/pages/Owner';

/** Wraps the route Switch in AnimatePresence so page changes fade + slide */
function AnimatedRoutes() {
  const [location] = useLocation();
  const prefersReduced = useForceReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
        transition={{ duration: prefersReduced ? 0 : 0.35, ease: 'easeInOut' }}
        className="flex-grow flex flex-col"
      >
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/membership" component={Membership} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/contact" component={Contact} />
          <Route path="/testimonials" component={Testimonials} />
          <Route path="/owner" component={Owner} />
          <Route>
            <div className="flex-1 flex flex-col items-center justify-center pt-20">
              <h1 className="text-4xl font-display font-bold text-primary mb-4">404</h1>
              <p className="text-muted-foreground">Page not found</p>
            </div>
          </Route>
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      {/* Reduced motion par bhi site NORMAL chale — framer khud transform/hover
          animations disable kar deta hai jab user ke browser me
          prefers-reduced-motion ON ho. Isliye reducedMotion="never": setting
          kisi bhi user me ho, saare animations hamesha on. */}
      <MotionConfig reducedMotion="never">
        <FreeTrialModalProvider>
          <div className="min-h-[100dvh] flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-white overflow-x-hidden">
            <ScrollToTop />
            <Navbar />

            <main className="flex-grow flex flex-col">
              <AnimatedRoutes />
            </main>

            <Footer />
            <WhatsAppButton />
            <ChatBot />
            <MobileCtaBar />
          </div>
        </FreeTrialModalProvider>
      </MotionConfig>
    </Router>
  );
}

export default App;
