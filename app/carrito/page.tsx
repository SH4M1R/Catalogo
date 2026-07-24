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

// Limpia símbolos de moneda / comas antes de convertir a número.
// Evita NaN si el precio llega como "S/ 12.50" en vez de "12.50".
function parsePrecio(precio: string | number | undefined): number {
  if (typeof precio === "number") return precio;
  if (!precio) return 0;
  const limpio = precio.replace(/[^0-9.,]/g, "").replace(",", ".");
  const valor = parseFloat(limpio);
  return Number.isFinite(valor) ? valor : 0;
}

export default function CarritoPage() {
  const { carrito, agregarAlCarrito, eliminarDelCarrito, total } = useCarrito();

  const subtotal = total;
  const totalFinal = subtotal;

  return (
    // pb extra en móvil: reserva espacio para la barra de checkout + el navbar inferior fijo
    <div className="min-h-screen bg-gray-50 pb-[calc(9rem+env(safe-area-inset-bottom))] md:pb-16 font-sans">
      {/* HEADER COMPACTO */}
      <section className="bg-white border-b border-zinc-200 py-5 px-5 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
            Carrito{" "}
            <span className="text-sm font-normal text-zinc-500">
              ({carrito.length} artículos)
            </span>
          </h1>
          <Link href="/productos" className="text-sm text-primary font-semibold md:hidden">
            Continuar comprando
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-6 relative z-20">
        {carrito.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs p-10 md:p-20 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-zinc-50 flex items-center justify-center">
              <ShoppingBag className="text-zinc-300" size={32} />
            </div>
            <h2 className="mt-5 text-lg font-bold text-zinc-800">Tu carrito está vacío</h2>
            <Link
              href="/productos"
              className="inline-flex items-center justify-center mt-5 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl font-semibold shadow-xs hover:shadow-md transition-all"
            >
              Ir a comprar
            </Link>
          </div>
        ) : (
          /* Grid: 1 columna en móvil, 2 columnas (1fr y 380px) en Desktop */
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
            {/* LISTA DE PRODUCTOS */}
            <div className="space-y-3 min-h-[50vh]">
              {carrito.map((item) => {
                const precioUnitario = parsePrecio(item.precio);
                return (
                  <div
                    key={item.id}
                    className="bg-white p-4 flex gap-4 rounded-2xl border border-zinc-200 shadow-xs group"
                  >
                    {/* IMAGEN COMPACTA */}
                    <div className="w-20 h-20 md:w-28 md:h-28 flex-shrink-0 bg-zinc-50 rounded-xl overflow-hidden border border-zinc-100 p-2">
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
                          <h2 className="text-sm md:text-base font-semibold text-zinc-800 line-clamp-2 leading-tight">
                            {item.nombre}
                          </h2>
                          <button
                            onClick={() => eliminarDelCarrito(item.id)}
                            className="text-zinc-400 hover:text-red-500 p-1 shrink-0"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                        <span className="inline-block mt-1.5 text-[10px] bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full uppercase font-bold tracking-wide">
                          {item.categoria}
                        </span>
                      </div>

                      <div className="flex items-end justify-between mt-2">
                        <div className="text-primary">
                          <span className="text-xs font-bold">S/</span>
                          <span className="text-lg md:text-xl font-bold">
                            {precioUnitario.toFixed(2)}
                          </span>
                        </div>

                        {/* SELECTOR DE CANTIDAD COMPACTO */}
                        <div className="flex items-center border border-zinc-200 rounded-full h-8 overflow-hidden bg-white">
                          <button
                            onClick={() =>
                              item.cantidad > 1
                                ? agregarAlCarrito(item, -1)
                                : eliminarDelCarrito(item.id)
                            }
                            className="px-3 h-full hover:bg-zinc-100 text-zinc-600 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-zinc-800">
                            {item.cantidad}
                          </span>
                          <button
                            onClick={() => agregarAlCarrito(item, 1)}
                            className="px-3 h-full hover:bg-zinc-100 text-zinc-600 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RESUMEN DE COMPRA - solo desktop */}
            <aside className="hidden lg:block">
              <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs p-6 sticky top-28">
                <h2 className="text-base font-bold text-zinc-800 mb-4 tracking-tight">
                  Resumen del pedido
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-zinc-500 text-sm">
                    <span>Subtotal ({carrito.length} productos)</span>
                    <span>S/ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 text-sm">
                    <span>Envío</span>
                    <span className="font-medium">Gratis</span>
                  </div>

                  <div className="border-t border-zinc-100 pt-3 flex justify-between items-end">
                    <span className="text-zinc-800 font-bold text-base">Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">
                        S/ {totalFinal.toFixed(2)}
                      </span>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-wide">
                        IGV Incluido
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    href="/venta"
                    className="w-full bg-primary hover:bg-primary-dark text-white h-12 rounded-xl font-semibold flex items-center justify-center transition-all shadow-xs hover:shadow-md"
                  >
                    Confirmar Pedido
                  </Link>
                  <div className="flex items-center justify-center gap-4 py-2 border-t border-zinc-100 mt-4">
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

      {/* BARRA DE CHECKOUT MÓVIL — flota justo encima del navbar inferior fijo */}
      {carrito.length > 0 && (
        <div
          className="lg:hidden fixed left-0 right-0 bg-white border-t border-zinc-200 p-4 z-40 flex items-center justify-between shadow-[0_-5px_15px_rgba(0,0,0,0.05)]"
          style={{ bottom: "calc(4rem + env(safe-area-inset-bottom))" }}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-xs text-zinc-400">Total</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold">
                Envío Gratis
              </span>
            </div>
            <span className="text-xl font-bold text-primary leading-none">
              S/ {totalFinal.toFixed(2)}
            </span>
          </div>
          <Link
            href="/venta"
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold text-sm active:scale-95 transition-transform flex items-center gap-2 shadow-xs"
          >
            Confirmar Pedido
            <ChevronRight size={18} />
          </Link>
        </div>
      )}
    </div>
  );
}