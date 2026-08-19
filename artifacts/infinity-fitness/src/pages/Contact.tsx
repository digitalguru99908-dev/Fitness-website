import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Instagram, Mail, Send, CheckCircle2 } from 'lucide-react';
import { GymHeroSlideshow } from '@/components/GymHeroSlideshow';

export function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'submitted' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      plan: (form.elements.namedItem('plan') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error((json as { error?: string }).error || 'Something went wrong.');
      }

      setFormStatus('submitted');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send. Please try again.');
      setFormStatus('error');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50svh] min-h-[400px] flex items-center justify-center pt-20 overflow-hidden">
        <GymHeroSlideshow />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight text-white mb-4">
              Get In <span className="text-primary text-glow">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium uppercase tracking-widest">
              We're here to help you start
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Contact Info & Map */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl font-display font-bold uppercase tracking-wider mb-8">Location & Info</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold uppercase tracking-wide text-white mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        Kaithal - Dhand Rd, Opp. Maharaja Palace,<br />
                        Rishi Nagar, Kaithal, Haryana 136027
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold uppercase tracking-wide text-white mb-1">Phone</h3>
                      <a href="tel:07206333820" className="text-muted-foreground hover:text-primary transition-colors text-lg">072063 33820</a>
                      <div className="mt-2">
                        <a href="https://wa.me/917206333820" target="_blank" rel="noreferrer" className="text-[#25D366] hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          Chat on WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold uppercase tracking-wide text-white mb-1">Email</h3>
                      <a href="mailto:digitalguru99908@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-lg break-all">digitalguru99908@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div className="w-full">
                      <h3 className="font-display font-bold uppercase tracking-wide text-white mb-2">Hours</h3>
                      <div className="space-y-2 text-muted-foreground w-full max-w-[300px]">
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span>Mon - Sun</span>
                          <span className="text-white">Open - 11:00 PM</span>
                        </div>
                        <div className="flex justify-between pt-1">
                          <span className="text-primary">Busiest Hours</span>
                          <span className="text-primary">6:00 PM - 9:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center shrink-0">
                      <Instagram className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold uppercase tracking-wide text-white mb-1">Social</h3>
                      <a href="https://instagram.com/infinityfitnessgyms" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">@infinityfitnessgyms</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="h-[300px] w-full rounded-sm overflow-hidden border border-white/10">
                <iframe 
                  src="https://maps.google.com/maps?q=Infinity+Fitness+Gym,Rishi+Nagar,Kaithal,Haryana&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Infinity Fitness Location Map"
                  className="filter invert-[90%] hue-rotate-180 contrast-125"
                ></iframe>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card border border-white/10 p-8 md:p-10"
            >
              <h2 className="text-3xl font-display font-bold uppercase tracking-wider mb-2">Send an Inquiry</h2>
              <p className="text-muted-foreground mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

              {formStatus === 'submitted' ? (
                <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-sm p-8 text-center flex flex-col items-center justify-center h-[400px]">
                  <CheckCircle2 className="w-16 h-16 text-[#25D366] mb-4" />
                  <h3 className="text-2xl font-display font-bold uppercase text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300 mb-6">Thanks! We'll call you back within 24 hours.</p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="text-primary font-bold uppercase tracking-wider text-sm hover:text-white transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wider text-gray-300 mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      className="w-full bg-background border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors rounded-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold uppercase tracking-wider text-gray-300 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required
                      className="w-full bg-background border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors rounded-sm"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="plan" className="block text-sm font-bold uppercase tracking-wider text-gray-300 mb-2">Preferred Plan</label>
                    <select 
                      id="plan"
                      className="w-full bg-background border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors rounded-sm appearance-none"
                    >
                      <option value="Not sure">Not sure yet</option>
                      <option value="Monthly">Monthly Plan (₹2,000)</option>
                      <option value="6-Month">6-Month Plan (₹6,000)</option>
                      <option value="1-Year">1-Year Plan (₹11,000)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold uppercase tracking-wider text-gray-300 mb-2">Message (Optional)</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="w-full bg-background border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors rounded-sm resize-none"
                      placeholder="Any specific goals or questions?"
                    ></textarea>
                  </div>
                  
                  {formStatus === 'error' && (
                    <p className="text-red-400 text-sm font-medium border border-red-400/30 bg-red-400/10 px-4 py-3 rounded-sm">
                      ⚠ {errorMsg}
                    </p>
                  )}

                  <button 
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full flex items-center justify-center gap-2 bg-gold text-gold-foreground font-display font-bold text-lg uppercase py-4 skew-x-[-10deg] hover:bg-gold/90 transition-colors hover:scale-105 active:scale-95 group mt-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span className="skew-x-[10deg] flex items-center gap-2">
                      {formStatus === 'sending' ? (
                        <>Sending…</>
                      ) : (
                        <>Send Inquiry <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
