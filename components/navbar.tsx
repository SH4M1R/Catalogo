"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, Home, LayoutGrid, Phone, Newspaper } from "lucide-react";
import { useCarrito } from "@/context/CarritoContext";

const tabs = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/productos", label: "Catálogo", icon: LayoutGrid },
  { href: "/contactanos", label: "Contáctanos", icon: Phone },
  { href: "/blogs", label: "Blogs", icon: Newspaper },
];

export default function Navbar() {
  const { carrito } = useCarrito();
  const pathname = usePathname();

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <>
      {/* NAVBAR SUPERIOR */}
      <nav className="sticky top-0 z-50 bg-red-600 border-b border-red-700 shadow-lg backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          {/* LOGO — oculto en móvil, visible desde md */}
          <Link href="/" className="hidden md:flex items-center gap-3 group">
            <div className="group-hover:scale-105 transition-all">
              <Image
                src="/logo.webp"
                alt="Logo Mi Ahorro Pharma"
                width={40}
                height={40}
                priority
                className="h-auto object-contain"
              />
            </div>
            <div className="leading-none">
              <h1 className="text-white text-lg md:text-xl font-black tracking-tight">
                MI AHORRO
              </h1>
              <span className="text-red-100 text-xs md:text-sm font-bold tracking-wide">
                PHARMA
              </span>
            </div>
          </Link>

          {/* LINKS DESKTOP */}
          <div className="hidden md:flex items-center gap-2">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className="text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-red-700 transition-all"
              >
                {tab.label.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* CARRITO — único elemento visible en móvil */}
          <Link
            href="/carrito"
            className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-red-700 hover:bg-red-800 border border-red-500/30 shadow-inner transition-all active:scale-90 ml-auto md:ml-0"
          >
            <ShoppingCart size={21} strokeWidth={2.5} className="text-white" />

            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-white text-red-600 text-[10px] font-black min-w-5 h-5 px-1 flex items-center justify-center rounded-full shadow-md border border-red-100 animate-in zoom-in duration-200">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* NAVBAR INFERIOR — solo móvil, estilo app */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-zinc-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="grid grid-cols-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active =
              tab.href === "/" ? pathname === "/" : pathname?.startsWith(tab.href);

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex flex-col items-center justify-center gap-1 py-2.5 relative"
              >
                <span
                  className={`absolute top-0 h-0.5 w-8 rounded-full transition-all ${
                    active ? "bg-red-600" : "bg-transparent"
                  }`}
                />
                <Icon
                  size={22}
                  strokeWidth={active ? 2.6 : 2}
                  className={active ? "text-red-600" : "text-zinc-400"}
                />
                <span
                  className={`text-[11px] font-bold ${
                    active ? "text-red-600" : "text-zinc-400"
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}