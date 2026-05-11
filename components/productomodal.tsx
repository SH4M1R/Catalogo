"use client";
import { X, ShoppingCart, Plus, Minus, Info, Tag } from "lucide-react";
import { useState, useEffect } from "react";

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
    return () => { document.body.style.overflow = "unset"; };
  }, [producto]);

  if (!producto) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/80 backdrop-blur-md transition-all">
      <div className="bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 relative flex flex-col md:flex-row">
        
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-3 bg-white/90 hover:bg-red-50 text-zinc-400 hover:text-red-600 rounded-2xl shadow-lg z-20 transition-all active:scale-90"
        >
          <X size={24} strokeWidth={3} />
        </button>

        {/* LADO IZQUIERDO: Imagen (Usando img estándar) */}
        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 md:p-12 relative h-[40vh] md:h-auto shrink-0">
          <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100 shadow-sm">
            <Tag size={14} className="text-red-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{producto.categoria}</span>
          </div>
          <img 
            src={producto.imagen || "/placeholder-farma.webp"} 
            alt={producto.nombre} 
            className="max-w-full max-h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col h-full overflow-hidden">
          {/* Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-8 md:p-12 pb-4">
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4 leading-tight tracking-tight">
              {producto.nombre}
            </h2>
            
            <div className="flex items-center gap-2 text-zinc-400 mb-6">
              <Info size={16} className="text-red-500" />
              <span className="text-xs font-bold uppercase tracking-widest">Información del producto</span>
            </div>

            <p className="text-zinc-500 text-base leading-relaxed mb-8 border-l-4 border-red-50 pl-6 italic">
              {producto.descripcion || "Sin descripción detallada disponible actualmente."}
            </p>
          </div>

          {/* Sticky Bottom Actions - Siempre visibles al final del modal */}
          <div className="p-8 md:p-12 pt-4 bg-white border-t border-gray-100 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">Total a pagar</span>
                <span className="text-4xl font-black text-zinc-900 tracking-tighter">
                  S/ {(parseFloat(producto.precio) * cantidad).toFixed(2)}
                </span>
              </div>

              {/* Selector de cantidad mejorado */}
              <div className="flex items-center gap-4 bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
                <button 
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  className="w-10 h-10 flex items-center justify-center bg-white text-zinc-500 hover:text-red-600 rounded-xl shadow-sm transition-all active:scale-90"
                >
                  <Minus size={18} strokeWidth={3} />
                </button>
                <span className="font-black text-xl text-zinc-800 min-w-[1.5rem] text-center">{cantidad}</span>
                <button 
                  onClick={() => setCantidad(cantidad + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-white text-zinc-500 hover:text-red-600 rounded-xl shadow-sm transition-all active:scale-90"
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
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-red-200 flex items-center justify-center gap-4 transition-all transform active:scale-[0.98] group"
            >
              <ShoppingCart size={22} className="group-hover:animate-bounce" />
              <span className="uppercase tracking-widest text-sm">Agregar al carrito</span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}