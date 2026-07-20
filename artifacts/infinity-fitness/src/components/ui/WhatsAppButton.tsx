import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export function WhatsAppButton() {
  return (
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
  );
}
