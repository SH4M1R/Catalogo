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
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-zinc-900/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-4xl lg:max-w-5xl max-h-[92vh] rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 animate-in fade-in zoom-in-95 duration-300 relative flex flex-col md:flex-row"
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 bg-white/90 backdrop-blur-sm hover:bg-zinc-50 text-zinc-400 hover:text-primary rounded-xl shadow-xs border border-zinc-200 z-20 transition-all active:scale-90"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* Imagen */}
        <div className="relative w-full md:w-2/5 lg:w-1/2 h-56 sm:h-72 md:h-auto shrink-0 flex items-center justify-center p-6 sm:p-10 md:p-12 bg-zinc-50 overflow-hidden">
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-zinc-200 shadow-xs z-10">
            <Tag size={13} className="text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              {producto.categoria}
            </span>
          </div>

          <img
            src={producto.imagen || "/placeholder-farma.webp"}
            alt={producto.nombre}
            className="relative max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Info + acciones */}
        <div className="w-full md:w-3/5 lg:w-1/2 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 pb-4">
            <h2
              id="producto-modal-title"
              className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 mb-4 leading-tight tracking-tight pr-10"
            >
              {producto.nombre}
            </h2>

            <div className="flex items-center gap-2 text-zinc-400 mb-4">
              <Info size={15} className="text-primary shrink-0" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Información del producto
              </span>
            </div>

            <p className="text-zinc-500 text-sm sm:text-base leading-relaxed border-l-2 border-zinc-200 pl-4 sm:pl-5">
              {producto.descripcion || "Sin descripción detallada disponible actualmente."}
            </p>
          </div>

          <div className="p-6 sm:p-8 md:p-10 pt-4 bg-white border-t border-zinc-200 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                  Total a pagar
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
                  S/ {(parseFloat(producto.precio) * cantidad).toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-3 bg-zinc-50 p-1.5 rounded-xl border border-zinc-200 shrink-0">
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  aria-label="Disminuir cantidad"
                  className="w-9 h-9 flex items-center justify-center bg-white text-zinc-500 hover:text-primary rounded-lg shadow-xs border border-zinc-200 transition-all active:scale-90"
                >
                  <Minus size={16} strokeWidth={2.5} />
                </button>
                <span className="font-bold text-base sm:text-lg text-zinc-900 min-w-[1.5rem] text-center">
                  {cantidad}
                </span>
                <button
                  onClick={() => setCantidad(cantidad + 1)}
                  aria-label="Aumentar cantidad"
                  className="w-9 h-9 flex items-center justify-center bg-white text-zinc-500 hover:text-primary rounded-lg shadow-xs border border-zinc-200 transition-all active:scale-90"
                >
                  <Plus size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                onAdd(producto, cantidad);
                onClose();
              }}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-xl shadow-xs flex items-center justify-center gap-3 transition-all active:scale-[0.98] group"
            >
              <ShoppingCart size={18} className="group-hover:animate-bounce" />
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