"use client";
import Link from "next/link";
import { Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* COLUMNA 1: MARCA Y UBICACIÓN */}
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-xl font-black tracking-tight">
            MI AHORRO <span className="text-red-500">PHARMA</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Tu farmacia de confianza en el distrito de Puente Piedra.
            Comprometidos con ofrecerte medicamentos seguros y productos de 
            cuidado personal con la mejor atención profesional.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={18} className="text-red-500" />
            <span>Puente Piedra, Lima, Perú.</span>
          </div>
        </div>

        {/* COLUMNA 2: NAVEGACIÓN RÁPIDA */}
        <div className="md:pl-10">
          <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Explorar</h3>
          <ul className="space-y-4 text-sm">
            <li><Link href="/" className="hover:text-red-500 transition-colors">Inicio</Link></li>
            <li><Link href="/productos" className="hover:text-red-500 transition-colors">Catálogo de Productos</Link></li>
            <li><Link href="/contactanos" className="hover:text-red-500 transition-colors">Contáctanos</Link></li>
          </ul>
        </div>

        {/* COLUMNA 3: CONTACTO Y REDES */}
        <div className="flex flex-col gap-6">
          <h3 className="text-white font-bold uppercase tracking-widest text-sm">Atención al Cliente</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 group">
              <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-red-600 transition-colors">
                <Phone size={16} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-zinc-500">WhatsApp Principal</span>
                <span className="text-sm text-white font-bold">964 328 743</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 bg-zinc-900 rounded-lg">
                <Phone size={16} className="text-zinc-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-zinc-300">985 389 609</span>
                <span className="text-zinc-300">978 621 83</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800">
            <a 
              href="https://www.facebook.com/miahorropharma2020" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-blue-500 transition-colors"
            >
              <img 
                src="https://cdn.simpleicons.org/facebook/white" 
                alt="Facebook" 
                className="w-5 h-5 hover:opacity-80 transition-opacity"
              />
              <span>Siguenos en Facebook</span>
            </a>
          </div>
        </div>
      </div>

      {/* LÍNEA DE CRÉDITOS */}
      <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-zinc-900 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          © {currentYear} MI AHORRO PHARMA. <br className="md:hidden" />
          Diseñado por Lic. Ingenieria de Software - Juan Pablo Inoñan
        </p>
      </div>
    </footer>
  );
}