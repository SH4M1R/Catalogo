"use client";

import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Truck,
  BadgeCheck,
} from "lucide-react";
import Link from "next/link";
import { useCarrito } from "@/context/CarritoContext";

export default function CarritoPage() {
  const {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    total,
  } = useCarrito();

  const subtotal = total;
  const totalFinal = subtotal;

  return (
    <div className="min-h-screen bg-[#f5f7fb] overflow-x-hidden pb-40">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-120px] right-[-120px] w-[350px] h-[350px] rounded-full bg-red-200 blur-3xl opacity-30" />
        <div className="absolute bottom-[-120px] left-[-120px] w-[350px] h-[350px] rounded-full bg-red-100 blur-3xl opacity-40" />
      </div>

      {/* HEADER */}
      <section className="relative bg-gradient-to-r from-red-600 via-red-500 to-rose-500 pb-28 pt-12 px-5 rounded-b-[3rem] shadow-xl">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* CARD RESUMEN */}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-16 relative z-20">
        {carrito.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-white p-10 md:p-20 text-center">
            <div className="w-28 h-28 mx-auto rounded-full bg-red-50 flex items-center justify-center">
              <ShoppingBag
                className="text-red-500"
                size={54}
              />
            </div>

            <h2 className="mt-8 text-3xl font-black text-zinc-800">
              Tu carrito está vacío
            </h2>

            <p className="text-zinc-500 mt-4 max-w-lg mx-auto">
              Explora nuestro catálogo y agrega productos para
              comenzar tu compra.
            </p>

            <Link
              href="/productos"
              className="inline-flex items-center justify-center mt-8 bg-red-600 hover:bg-zinc-900 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-red-200"
            >
              Ir al catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">
            {/* PRODUCTOS */}
            <div className="space-y-5">
              {carrito.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-lg border border-white p-5 md:p-6 flex flex-col md:flex-row gap-5 md:items-center hover:shadow-2xl transition-all"
                >
                  {/* IMAGEN */}
                  <div className="w-full md:w-36 h-36 rounded-[1.5rem] bg-gradient-to-b from-zinc-50 to-white flex items-center justify-center p-4 overflow-hidden">
                    <img
                      src={
                        item.imagen || "/placeholder-farma.webp"
                      }
                      alt={item.nombre}
                      className="max-h-full object-contain hover:scale-110 transition-all duration-500"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide">
                        {item.categoria}
                      </span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-black text-zinc-800 leading-tight">
                      {item.nombre}
                    </h2>

                    <p className="mt-3 text-zinc-400 text-sm">
                      Producto agregado al carrito.
                    </p>

                    <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* CANTIDAD */}
                      <div className="flex items-center bg-zinc-100 rounded-2xl p-1 w-fit">
                        <button
                          onClick={() => {
                            if (item.cantidad > 1) {
                              agregarAlCarrito(item, -1);
                            } else {
                              eliminarDelCarrito(item.id);
                            }
                          }}
                          className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
                        >
                          <Minus size={18} />
                        </button>

                        <span className="w-14 text-center font-black text-lg text-zinc-800">
                          {item.cantidad}
                        </span>

                        <button
                          onClick={() =>
                            agregarAlCarrito(item, 1)
                          }
                          className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center hover:bg-zinc-900 transition-all"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      {/* PRECIO */}
                      <div className="flex items-center gap-6">
                        <div>
                          <span className="block text-[11px] uppercase tracking-widest text-zinc-400 font-bold">
                            Total
                          </span>

                          <span className="text-2xl font-black text-zinc-900">
                            S/{" "}
                            {(
                              parseFloat(item.precio) *
                              item.cantidad
                            ).toFixed(2)}
                          </span>
                        </div>

                        <button
                          onClick={() =>
                            eliminarDelCarrito(item.id)
                          }
                          className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RESUMEN */}
            <aside className="relative">
              <div className="sticky top-24 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white p-7">
                <h2 className="text-2xl font-black text-zinc-800">
                  Resumen
                </h2>

                <p className="text-zinc-500 text-sm mt-2">
                  Detalle de tu compra actual.
                </p>

                {/* INFO */}
                <div className="mt-8 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 font-medium">
                      Subtotal
                    </span>

                    <span className="font-black text-zinc-800">
                      S/ {subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-zinc-200 pt-5 flex items-center justify-between">
                    <span className="text-lg font-bold text-zinc-700">
                      Total
                    </span>

                    <span className="text-4xl font-black text-red-600">
                      S/ {totalFinal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* BENEFICIOS */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 bg-zinc-50 rounded-2xl p-4">
                    <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
                      <ShieldCheck
                        className="text-green-600"
                        size={20}
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-zinc-800 text-sm">
                        Compra segura
                      </h3>

                      <p className="text-zinc-400 text-xs">
                        Protección garantizada.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-zinc-50 rounded-2xl p-4">
                    <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center">
                      <BadgeCheck
                        className="text-red-600"
                        size={20}
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-zinc-800 text-sm">
                        Productos de Calidad
                      </h3>

                      <p className="text-zinc-400 text-xs">
                        Calidad farmacéutica.
                      </p>
                    </div>
                  </div>
                </div>

                {/* BOTONES */}
                <div className="mt-8 space-y-4">
                  <Link
                      href="/venta"
                      className="w-full h-14 rounded-2xl bg-red-600 hover:bg-zinc-900 text-white font-black text-lg shadow-lg shadow-red-200 transition-all flex items-center justify-center"
                    >
                      Finalizar compra
                    </Link>

                  <Link
                    href="/productos"
                    className="w-full h-14 rounded-2xl border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 font-bold flex items-center justify-center transition-all"
                  >
                    Seguir comprando
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}