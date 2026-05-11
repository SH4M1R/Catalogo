"use client";

import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useCarrito } from "@/context/CarritoContext";

export default function CarritoPage() {
  const { carrito, agregarAlCarrito, eliminarDelCarrito, total } = useCarrito();

  const subtotal = total;
  const totalFinal = subtotal;

  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-40 md:pb-20 font-sans">
      {/* HEADER COMPACTO */}
      <section className="bg-white border-b border-gray-100 py-6 px-5 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-red-600 flex items-center gap-2">
            Carrito <span className="text-sm font-normal text-zinc-500">({carrito.length} artículos)</span>
          </h1>
          <Link href="/productos" className="text-sm text-red-600 font-medium md:hidden">
            Continuar comprando
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-0 md:px-6 mt-4 relative z-20">
        {carrito.length === 0 ? (
          <div className="bg-white mx-4 rounded-3xl p-10 md:p-20 text-center shadow-sm">
            <div className="w-20 h-20 mx-auto rounded-full bg-zinc-50 flex items-center justify-center">
              <ShoppingBag className="text-zinc-300" size={40} />
            </div>
            <h2 className="mt-6 text-xl font-bold text-zinc-800">Tu carrito está vacío</h2>
            <Link
              href="/productos"
              className="inline-flex items-center justify-center mt-6 bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-all"
            >
              Ir a comprar
            </Link>
          </div>
        ) : (
          /* Grid: 1 columna en móvil, 2 columnas (1fr y 400px) en Desktop */
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
            
            {/* LISTA DE PRODUCTOS ESTILO TEMU */}
            <div className="space-y-2 md:space-y-4 min-h-[50vh]">
              {carrito.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 flex gap-4 md:rounded-2xl md:shadow-sm border-b md:border border-gray-100 group"
                >
                  {/* IMAGEN COMPACTA */}
                  <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-50 p-2">
                    <img
                      src={item.imagen || "/placeholder-farma.webp"}
                      alt={item.nombre}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* INFO PRODUCTO */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h2 className="text-sm md:text-base font-medium text-zinc-800 line-clamp-2 leading-tight">
                          {item.nombre}
                        </h2>
                        <button
                          onClick={() => eliminarDelCarrito(item.id)}
                          className="text-zinc-400 hover:text-red-500 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <span className="inline-block mt-1 text-[10px] bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded uppercase font-bold tracking-tighter">
                        {item.categoria}
                      </span>
                    </div>

                    <div className="flex items-end justify-between mt-2">
                      <div className="text-red-600">
                        <span className="text-xs font-bold">S/</span>
                        <span className="text-lg md:text-xl font-black">
                          {parseFloat(item.precio).toFixed(2)}
                        </span>
                      </div>

                      {/* SELECTOR DE CANTIDAD COMPACTO */}
                      <div className="flex items-center border border-gray-200 rounded-full h-8 overflow-hidden bg-white">
                        <button
                          onClick={() => item.cantidad > 1 ? agregarAlCarrito(item, -1) : eliminarDelCarrito(item.id)}
                          className="px-3 h-full hover:bg-gray-100 text-zinc-600 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-zinc-800">
                          {item.cantidad}
                        </span>
                        <button
                          onClick={() => agregarAlCarrito(item, 1)}
                          className="px-3 h-full hover:bg-gray-100 text-zinc-600 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RESUMEN DE COMPRA - OCULTO EN MÓVIL (hidden), VISIBLE EN DESKTOP (lg:block) */}
            <aside className="hidden lg:block px-4 md:px-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
                <h2 className="text-lg font-bold text-zinc-800 mb-4 uppercase tracking-tighter">Resumen del pedido</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-zinc-500 text-sm">
                    <span>Subtotal ({carrito.length} productos)</span>
                    <span>S/ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600 text-sm">
                    <span>Envío</span>
                    <span className="font-medium">Gratis</span>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-3 flex justify-between items-end">
                    <span className="text-zinc-800 font-bold text-base">Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-black text-red-600">S/ {totalFinal.toFixed(2)}</span>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-tighter">IGV Incluido</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                   <Link
                      href="/venta"
                      className="w-full bg-red-600 hover:bg-red-700 text-white h-12 rounded-full font-bold flex items-center justify-center transition-all shadow-md shadow-red-100"
                    >
                      Confirmar Pedido
                    </Link>
                    <div className="flex items-center justify-center gap-4 py-2 border-t border-gray-50 mt-4">
                      <ShieldCheck className="text-zinc-400" size={16} />
                      <BadgeCheck className="text-zinc-400" size={16} />
                      <span className="text-[10px] text-zinc-400 font-medium">Pago 100% seguro</span>
                    </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* FOOTER STICKY PARA MÓVIL (ESTILO TEMU) - Reemplaza al resumen en responsive */}
      {carrito.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-[50] flex items-center justify-between shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
               <span className="text-xs text-zinc-400">Total</span>
               <span className="text-[10px] bg-green-100 text-green-700 px-1 rounded font-bold">Envío Gratis</span>
            </div>
            <span className="text-xl font-black text-red-600 leading-none">S/ {totalFinal.toFixed(2)}</span>
          </div>
          <Link
            href="/venta"
            className="bg-red-600 text-white px-8 py-3 rounded-full font-bold text-base active:scale-95 transition-transform flex items-center gap-2 shadow-lg shadow-red-200"
          >
            Confirmar Pedido<ChevronRight size={18} />
          </Link>
        </div>
      )}
    </div>
  );
}