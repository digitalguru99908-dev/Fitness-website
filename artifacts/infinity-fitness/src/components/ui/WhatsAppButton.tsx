import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WA_URL =
  'https://wa.me/918168828832?text=' +
  encodeURIComponent('Hi! Mujhe Infinity Fitness Gym join karna hai. Membership ke baare me details bhejiye.');

export function WhatsAppButton() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-6 right-6 z-50 flex items-center h-14 bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:scale-105 hover:shadow-[#25D366]/50 transition-all duration-300"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="relative w-14 h-14 shrink-0 flex items-center justify-center">
        <FaWhatsapp size={30} />
        {/* Ping effect */}
        <span className="absolute w-full h-full rounded-full bg-[#25D366] opacity-50 animate-ping -z-10" style={{ animationDuration: '2s' }}></span>
      </span>
      {/* Label — hover par slide-out hota hai (mobile par button hi tap-friendly circle rehta hai) */}
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-bold uppercase tracking-wider text-sm group-hover:max-w-[200px] group-hover:pr-5 transition-all duration-300 ease-out">
        Chat with us
      </span>
    </a>
  );
}
