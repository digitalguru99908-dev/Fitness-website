import React from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-12">
          <div className="col-span-1 lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-sm transform -skew-x-12">
                <span className="font-display font-bold text-white text-xl transform skew-x-12">I</span>
              </div>
              <span className="font-display font-bold text-2xl tracking-wider text-white">
                INFINITY <span className="text-primary">FITNESS</span>
              </span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-md">
              A real neighbourhood gym for real people. Serious equipment, affordable prices, and a welcoming community right here in Kaithal. Transform your body, transform your life.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://wa.me/917206333820" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-border flex items-center justify-center text-white hover:bg-primary transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={20} />
              </a>
              <a 
                href="https://instagram.com/infinityfitnessgyms" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-border flex items-center justify-center text-white hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-display text-xl mb-6 uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Programs</a></li>
              <li><a href="#plans" className="hover:text-primary transition-colors">Memberships</a></li>
              <li><a href="#gallery" className="hover:text-primary transition-colors">Gallery</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-xl mb-6 uppercase tracking-wide">Contact Info</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex flex-col gap-1">
                <span className="text-white font-medium uppercase font-display tracking-wider text-sm">Location</span>
                <span>Kaithal - Dhand Rd, Opp. Maharaja Palace, <br />Rishi Nagar, Kaithal, Haryana 136027</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-white font-medium uppercase font-display tracking-wider text-sm">Phone</span>
                <a href="tel:07206333820" className="hover:text-primary transition-colors">072063 33820</a>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-white font-medium uppercase font-display tracking-wider text-sm">Hours</span>
                <span>Open daily, Closes 11 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Infinity Fitness Gym. All rights reserved.</p>
          <p>Designed for Champions.</p>
        </div>
      </div>
    </footer>
  );
};
