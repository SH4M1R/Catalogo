"use client"

import { FaWhatsapp } from "react-icons/fa"

const WHATSAPP_NUMBER = "51964328743"
const WHATSAPP_MESSAGE = encodeURIComponent("¡Hola! Me gustaría recibir más información.")
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

export default function WhatsappButton() {
  return (
    <div className="fixed bottom-20 right-6 z-50 flex items-center group">
      <span className="mr-3 bg-white text-gray-800 text-sm font-medium px-3 py-1.5 rounded-lg shadow-md opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:inline-block">
        ¿Necesitas ayuda?
      </span>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="relative w-14 h-14 bg-[#25D366] text-white flex items-center justify-center rounded-full shadow-xl hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 ease-out"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />
        
        {/* Icono */}
        <FaWhatsapp size={32} className="relative z-10" />
      </a>
    </div>
  )
}