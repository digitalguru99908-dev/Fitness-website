import React from 'react';
import { Switch, Route, Router } from 'wouter';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ScrollToTop } from '@/components/ScrollToTop';

import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Services } from '@/pages/Services';
import { Membership } from '@/pages/Membership';
import { Gallery } from '@/pages/Gallery';
import { Contact } from '@/pages/Contact';

function App() {
  return (
    <Router base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <div className="min-h-[100dvh] flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-white overflow-x-hidden">
        <ScrollToTop />
        <Navbar />
        
        <main className="flex-grow flex flex-col">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/membership" component={Membership} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/contact" component={Contact} />
            <Route>
              <div className="flex-1 flex flex-col items-center justify-center pt-20">
                <h1 className="text-4xl font-display font-bold text-primary mb-4">404</h1>
                <p className="text-muted-foreground">Page not found</p>
              </div>
            </Route>
          </Switch>
        </main>
        
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
