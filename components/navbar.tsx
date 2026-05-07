"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCarrito } from "@/context/CarritoContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { carrito } = useCarrito();

  // TOTAL DE PRODUCTOS
  const totalItems = carrito.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-red-600 border-b border-red-700 shadow-lg backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          
          {/* IZQUIERDA */}
          <div className="flex items-center gap-4">
            
            {/* BOTÓN HAMBURGUESA */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white p-2 hover:bg-red-700 rounded-xl transition-all"
            >
              <Menu size={28} />
            </button>

            {/* LOGO */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <div className="relative overflow-hidden rounded-2xl p-1.5 shadow-md group-hover:scale-105 transition-all">
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
          </div>

          {/* LINKS DESKTOP */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className="text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-white/15 transition-all"
            >
              Inicio
            </Link>

            <Link
              href="/productos"
              className="text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-white/15 transition-all"
            >
              Catálogo
            </Link>

            <Link
              href="/contactanos"
              className="text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-white/15 transition-all"
            >
              Contacto
            </Link>
          </div>

          {/* CARRITO */}
          <Link
            href="/carrito"
            className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-red-700 hover:bg-red-800 border border-red-500/30 shadow-inner transition-all active:scale-90"
          >
            <ShoppingCart
              size={21}
              strokeWidth={2.5}
              className="text-white"
            />

            {/* BADGE */}
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-white text-red-600 text-[10px] font-black min-w-5 h-5 px-1 flex items-center justify-center rounded-full shadow-md border border-red-100 animate-in zoom-in duration-200">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* OVERLAY MOBILE */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-all duration-300 md:hidden ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
        onClick={toggleMenu}
      >
        {/* SIDEBAR */}
        <div
          className={`fixed top-0 left-0 w-[290px] h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="bg-gradient-to-r from-red-600 to-red-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-black text-2xl">
                  MENÚ
                </h2>

                <p className="text-red-100 text-sm mt-1">
                  Mi Ahorro Pharma
                </p>
              </div>

              <button
                onClick={toggleMenu}
                className="w-11 h-11 rounded-2xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition-all"
              >
                <X size={26} />
              </button>
            </div>
          </div>

          {/* LINKS */}
          <nav className="p-5 flex flex-col gap-3">
            <Link
              href="/"
              onClick={toggleMenu}
              className="text-zinc-800 font-bold text-lg p-4 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all"
            >
              Inicio
            </Link>

            <Link
              href="/productos"
              onClick={toggleMenu}
              className="text-zinc-800 font-bold text-lg p-4 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all"
            >
              Catálogo
            </Link>

            <Link
              href="/contactanos"
              onClick={toggleMenu}
              className="text-zinc-800 font-bold text-lg p-4 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all"
            >
              Contactanos
            </Link>

            <Link
              href="/carrito"
              onClick={toggleMenu}
              className="flex items-center justify-between text-zinc-800 font-bold text-lg p-4 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all"
            >
              <span>Carrito</span>

              {totalItems > 0 && (
                <span className="bg-red-600 text-white text-xs font-black min-w-6 h-6 px-2 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          {/* FOOTER SIDEBAR */}
          <div className="absolute bottom-6 left-5 right-5">
            <div className="bg-red-50 rounded-[2rem] p-5 border border-red-100">
              <h3 className="text-red-600 font-black text-sm">
                ¿Necesitas ayuda?
              </h3>

              <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                Nuestro equipo está listo para ayudarte por
                WhatsApp.
              </p>

              <button className="mt-4 w-full h-11 rounded-xl bg-red-600 hover:bg-zinc-900 text-white font-bold transition-all">
                Contactar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}