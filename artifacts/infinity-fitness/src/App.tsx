import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Plans } from '@/components/sections/Plans';
import { Gallery } from '@/components/sections/Gallery';
import { Reviews } from '@/components/sections/Reviews';
import { LocationContact } from '@/components/sections/LocationContact';
import { FaWhatsapp } from 'react-icons/fa';

function App() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-white overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Plans />
        <Gallery />
        <Reviews />
        <LocationContact />
      </main>
      
      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917206333820"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform hover:shadow-[#25D366]/50"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp size={32} />
        {/* Ping effect */}
        <span className="absolute w-full h-full rounded-full bg-[#25D366] opacity-50 animate-ping -z-10" style={{ animationDuration: '2s' }}></span>
      </a>
    </div>
  );
}

export default App;
