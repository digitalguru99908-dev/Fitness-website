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
      className="flex group fixed bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:scale-105 hover:shadow-[#25D366]/50 transition-all duration-300 items-center h-12 md:h-14 bottom-20 right-4 md:bottom-6 md:right-6 z-50"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 flex items-center justify-center">
        <FaWhatsapp size={26} className="md:hidden" />
        <FaWhatsapp size={30} className="hidden md:block" />
        {/* Ping effect */}
        <span className="absolute w-full h-full rounded-full bg-[#25D366] opacity-50 animate-ping -z-10" style={{ animationDuration: '2s' }}></span>
      </span>
      {/* Label — hover par slide-out hota hai (mobile par sirf icon hi tap-friendly rahta hai) */}
      <span className="hidden md:block max-w-0 overflow-hidden whitespace-nowrap font-bold uppercase tracking-wider text-sm group-hover:max-w-[200px] group-hover:pr-5 transition-all duration-300 ease-out">
        Chat with us
      </span>
    </a>
  );
}
