"use client";
import { X, ShoppingCart, Plus, Minus, Info, Tag } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: string;
  imagen: string;
}

interface Props {
  producto: Producto | null;
  onClose: () => void;
  onAdd: (p: Producto, cant: number) => void;
}

export default function ProductoModal({ producto, onClose, onAdd }: Props) {
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (producto) {
      setCantidad(1);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [producto]);

  // Cerrar con tecla Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!producto) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [producto, handleKeyDown]);

  if (!producto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="producto-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-zinc-900/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-4xl lg:max-w-5xl max-h-[92vh] rounded-[1.75rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300 relative flex flex-col md:flex-row"
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 bg-white/90 hover:bg-red-50 text-zinc-400 hover:text-red-600 rounded-2xl shadow-lg z-20 transition-all active:scale-90"
        >
          <X size={22} strokeWidth={3} />
        </button>

        {/* LADO IZQUIERDO: Imagen */}
        <div className="relative w-full md:w-2/5 lg:w-1/2 h-56 sm:h-72 md:h-auto shrink-0 flex items-center justify-center p-6 sm:p-10 md:p-12 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {/* Decoración: mancha suave detrás del producto (solo visible en desktop) */}
          <div className="hidden md:block absolute w-72 h-72 bg-red-100/40 rounded-full blur-3xl" />

          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-gray-100 shadow-sm z-10">
            <Tag size={13} className="text-red-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
              {producto.categoria}
            </span>
          </div>

          <img
            src={producto.imagen || "/placeholder-farma.webp"}
            alt={producto.nombre}
            className="relative max-w-full max-h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* LADO DERECHO: Info + acciones */}
        <div className="w-full md:w-3/5 lg:w-1/2 flex flex-col min-h-0">
          {/* Área con scroll */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 lg:p-12 pb-4">
            <h2
              id="producto-modal-title"
              className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-900 mb-4 leading-tight tracking-tight pr-10"
            >
              {producto.nombre}
            </h2>

            <div className="flex items-center gap-2 text-zinc-400 mb-5">
              <Info size={16} className="text-red-500 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Información del producto
              </span>
            </div>

            <p className="text-zinc-500 text-sm sm:text-base leading-relaxed border-l-4 border-red-50 pl-5 sm:pl-6 italic">
              {producto.descripcion || "Sin descripción detallada disponible actualmente."}
            </p>
          </div>

          {/* Acciones fijas al fondo del modal */}
          <div className="p-6 sm:p-8 md:p-10 lg:p-12 pt-4 bg-white border-t border-gray-100 space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                  Total a pagar
                </span>
                <span className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tighter">
                  S/ {(parseFloat(producto.precio) * cantidad).toFixed(2)}
                </span>
              </div>

              {/* Selector de cantidad */}
              <div className="flex items-center gap-3 sm:gap-4 bg-gray-100 p-1.5 rounded-2xl border border-gray-200 shrink-0">
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  aria-label="Disminuir cantidad"
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white text-zinc-500 hover:text-red-600 rounded-xl shadow-sm transition-all active:scale-90"
                >
                  <Minus size={18} strokeWidth={3} />
                </button>
                <span className="font-black text-lg sm:text-xl text-zinc-800 min-w-[1.5rem] text-center">
                  {cantidad}
                </span>
                <button
                  onClick={() => setCantidad(cantidad + 1)}
                  aria-label="Aumentar cantidad"
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white text-zinc-500 hover:text-red-600 rounded-xl shadow-sm transition-all active:scale-90"
                >
                  <Plus size={18} strokeWidth={3} />
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                onAdd(producto, cantidad);
                onClose();
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 sm:py-5 rounded-2xl shadow-xl shadow-red-200 flex items-center justify-center gap-3 sm:gap-4 transition-all transform active:scale-[0.98] group"
            >
              <ShoppingCart size={20} className="group-hover:animate-bounce" />
              <span className="uppercase tracking-widest text-xs sm:text-sm">
                Agregar al carrito
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}