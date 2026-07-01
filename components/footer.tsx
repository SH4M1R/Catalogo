"use client";
import Link from "next/link";
import { Phone, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";

const enlaces = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo de Productos", href: "/productos" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contáctanos", href: "/contactanos" },
];

const redes = [
  {
    nombre: "Facebook",
    href: "https://www.facebook.com/miahorropharma2020",
    icon: "https://cdn.simpleicons.org/facebook/white",
  },
  {
    nombre: "TikTok",
    href: "https://www.tiktok.com/@botica.mi.ahorro?lang=es-419",
    icon: "https://cdn.simpleicons.org/tiktok/white",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800 pt-16 md:pt-20 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* COLUMNA 1: MARCA Y UBICACIÓN */}
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            <h2 className="text-white text-xl font-black tracking-tight">
              MI AHORRO <span className="text-red-500">PHARMA</span>
            </h2>
            <p className="text-sm leading-relaxed max-w-sm">
              Tu farmacia de confianza en el distrito de Puente Piedra. Comprometidos con
              ofrecerte medicamentos seguros y productos de cuidado personal con la mejor
              atención profesional.
            </p>
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <MapPin size={18} className="text-red-500 shrink-0" />
              <span>Puente Piedra, Lima, Perú</span>
            </div>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN RÁPIDA */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Explorar
            </h3>
            <ul className="space-y-3 text-sm">
              {enlaces.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 hover:text-red-500 transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 3: CONTACTO */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Atención al cliente
            </h3>

            <div className="space-y-3">
              <a
                href="https://wa.me/51964328743"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-red-600 transition-colors shrink-0">
                  <MessageCircle size={16} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-500">WhatsApp principal</span>
                  <span className="text-sm text-white font-bold">964 328 743</span>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-900 rounded-lg shrink-0">
                  <Phone size={16} className="text-zinc-400" />
                </div>
                <div className="flex flex-col text-sm text-zinc-300">
                  <span>985 389 609</span>
                  <span>978 621 83</span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA 4: REDES SOCIALES */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Síguenos
            </h3>
            <div className="flex flex-col gap-3">
              {redes.map((red) => (
                <a
                  key={red.nombre}
                  href={red.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-red-600 transition-colors shrink-0">
                    <img src={red.icon} alt={red.nombre} className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                    {red.nombre}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* LÍNEA DE CRÉDITOS */}
        <div className="mt-14 md:mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 text-center sm:text-left">
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            © {currentYear} Mi Ahorro Pharma
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            Diseñado por Lic. Ingeniería de Software · Juan Pablo Inoñan
          </p>
        </div>
      </div>
    </footer>
  );
}