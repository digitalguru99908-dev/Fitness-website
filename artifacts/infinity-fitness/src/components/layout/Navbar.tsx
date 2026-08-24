import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import gymLogo from '@assets/7_1785143551141.webp';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Membership', href: '/membership' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Reviews', href: '/testimonials' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const prefersReduced = useReducedMotion();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Scroll-driven nav shrink: height 80 → 60px, shadow fades in
  const { scrollY } = useScroll();
  const navHeight = useTransform(scrollY, [0, 80], [80, 60]);
  const shadowOpacity = useTransform(scrollY, [0, 80], [0, 0.45]);
  const boxShadow = useMotionTemplate`0 4px 30px rgba(0,0,0,${shadowOpacity})`;

  const motionStyle = prefersReduced
    ? {}
    : { height: navHeight, boxShadow };

  return (
    <>
      <motion.nav
        style={motionStyle}
        className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src={gymLogo}
                alt="Infinity Fitness Gym Logo"
                className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
              />
              <span className="font-display font-bold text-xl tracking-wider text-foreground group-hover:text-primary transition-colors">
                INFINITY FITNESS
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold uppercase tracking-wider transition-colors hover:text-primary ${
                    location === link.href ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="tel:8168828832"
                className="hidden lg:flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 font-display font-bold uppercase tracking-wider skew-x-[-10deg] hover:bg-primary/90 transition-colors box-glow-hover"
              >
                <div className="skew-x-[10deg] flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </div>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-foreground p-2 hover:text-primary transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden pt-20 flex flex-col"
          >
            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`block font-display text-4xl font-bold uppercase tracking-wide ${
                      location === link.href ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-8 space-y-3"
              >
                <a
                  href="tel:8168828832"
                  className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 w-full font-display font-bold text-xl uppercase tracking-wider box-glow"
                >
                  <Phone className="w-5 h-5" />
                  Call 81688 28832
                </a>
                <a
                  href="https://wa.me/918168828832?text=Hi!%20Mujhe%20Infinity%20Fitness%20Gym%20join%20karna%20hai.%20Membership%20ke%20baare%20me%20details%20bhejiye."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366]/10 border border-[#25D366]/40 text-[#25D366] py-4 w-full font-display font-bold text-xl uppercase tracking-wider hover:bg-[#25D366]/20 transition-colors"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  WhatsApp Karein
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
