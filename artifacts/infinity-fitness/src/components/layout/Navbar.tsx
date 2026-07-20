import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Plans', href: '#plans' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Location', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary flex items-center justify-center rounded-sm transform -skew-x-12 group-hover:scale-105 transition-transform">
            <span className="font-display font-bold text-white text-xl md:text-2xl transform skew-x-12">I</span>
          </div>
          <span className="font-display font-bold text-xl md:text-2xl tracking-wider text-white">
            INFINITY <span className="text-primary">FITNESS</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase font-display"
            >
              {link.name}
            </a>
          ))}
          <a
            href="tel:07206333820"
            className="bg-primary text-white px-6 py-2 rounded-sm font-display font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(255,107,0,0.4)] hover:shadow-[0_0_25px_rgba(255,107,0,0.6)]"
          >
            Call Now
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-xl overflow-hidden"
          >
            <div className="flex flex-col px-4 py-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-display uppercase tracking-wide text-muted-foreground hover:text-primary py-2 border-b border-border/50"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="tel:07206333820"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 bg-primary text-white px-6 py-3 rounded-sm font-display font-bold uppercase tracking-wide text-center"
              >
                Call Now: 072063 33820
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
