import React from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { Reveal } from '../ui/reveal';

export const LocationContact = () => {
  return (
    <section id="location" className="py-24 bg-[#0a0a0a] border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Form & Info */}
          <div id="contact" className="order-2 lg:order-1">
            <Reveal direction="right">
              <h3 className="text-primary font-display tracking-widest uppercase text-sm mb-2">Reach Out</h3>
              <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-white mb-8">Drop A <span className="text-primary">Line</span></h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <a href="tel:07206333820" className="flex items-start gap-4 p-4 rounded-sm border border-border bg-card hover:border-primary/50 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-secondary group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors">
                    <Phone className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-1">Call Us</h4>
                    <p className="text-white font-medium">072063 33820</p>
                  </div>
                </a>
                
                <div className="flex items-start gap-4 p-4 rounded-sm border border-border bg-card">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Clock className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-1">Hours</h4>
                    <p className="text-white font-medium">Daily till 11 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border p-6 md:p-8 rounded-sm">
                <h3 className="text-xl font-display font-bold uppercase text-white mb-6">Send an Inquiry</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full bg-background border border-border px-4 py-3 rounded-sm text-white focus:outline-none focus:border-primary transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      className="w-full bg-background border border-border px-4 py-3 rounded-sm text-white focus:outline-none focus:border-primary transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="How can we help you?" 
                      rows={4}
                      className="w-full bg-background border border-border px-4 py-3 rounded-sm text-white focus:outline-none focus:border-primary transition-colors resize-none"
                      required
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-primary text-white font-display font-bold uppercase tracking-wider py-4 rounded-sm hover:bg-primary/90 transition-colors"
                  >
                    Send Message
                  </button>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Or message us directly on <a href="https://wa.me/917206333820" className="text-primary hover:underline">WhatsApp</a>
                  </p>
                </form>
              </div>
            </Reveal>
          </div>
          
          {/* Map & Location */}
          <div className="order-1 lg:order-2 h-full flex flex-col">
            <Reveal direction="left" className="h-full flex flex-col">
              <h3 className="text-primary font-display tracking-widest uppercase text-sm mb-2">Find Us</h3>
              <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-white mb-8">Our <span className="text-primary">Territory</span></h2>
              
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="text-primary w-6 h-6 shrink-0 mt-1" />
                <p className="text-white text-lg leading-relaxed">
                  Kaithal - Dhand Rd, Opp. Maharaja Palace,<br />
                  Rishi Nagar, Kaithal, Haryana 136027
                </p>
              </div>
              
              <div className="flex-grow min-h-[400px] bg-card border border-border rounded-sm overflow-hidden relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.9324546853245!2d76.3888!3d29.8055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sInfinity%20Fitness%20Gym!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Infinity Fitness Gym Map"
                  className="absolute inset-0 filter grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                ></iframe>
              </div>
              
              <a 
                href="https://goo.gl/maps/search/Infinity+Fitness+Gym,+Kaithal+Dhand+Rd,+Rishi+Nagar,+Kaithal,+Haryana" 
                target="_blank" 
                rel="noreferrer"
                className="mt-6 flex items-center justify-center gap-2 border border-border bg-card text-white px-6 py-4 rounded-sm font-display font-bold uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
              >
                <MapPin size={18} />
                Get Directions
              </a>
            </Reveal>
          </div>
          
        </div>
      </div>
    </section>
  );
};
