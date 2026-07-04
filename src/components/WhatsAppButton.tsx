"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917258902556?text=Hi%2C%20I%20want%20to%20order%20DXN%20products"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[999] group"
    >
      <div className="relative flex items-center">
        {/* Tooltip */}
        <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat on WhatsApp
        </span>

        {/* Button */}
        <div className="bg-green-500 hover:bg-green-600 active:scale-95 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200">
          <MessageCircle className="w-7 h-7 fill-white" />
        </div>

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30 pointer-events-none" />
      </div>
    </a>
  );
}
