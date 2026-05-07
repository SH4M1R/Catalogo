"use client";
import { X, ShoppingCart, Plus, Minus, Info } from "lucide-react";
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
        <div className="md:w-1/2 bg-zinc-50 relative flex items-center justify-center p-12 min-h-[300px]">
          <div className="absolute top-8 left-8">
            <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-lg shadow-red-200">
              {producto.categoria}
            </span>
          </div>
          
          <img 
            src={producto.imagen || "/placeholder-farma.webp"} 
            alt={producto.nombre} 
            className="max-w-full max-h-[350px] object-contain drop-shadow-xl"
          />
        </div>

        {/* LADO DERECHO: Info */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
          <div className="flex-grow">
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4 leading-none tracking-tighter italic">
              {producto.nombre}
            </h2>
            
            <div className="flex items-center gap-2 text-zinc-400 mb-6">
              <Info size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Detalle del Producto</span>
            </div>

            <p className="text-zinc-500 text-sm md:text-base leading-relaxed mb-8 border-l-4 border-zinc-100 pl-4">
              {producto.descripcion}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between bg-zinc-50 p-6 rounded-[2rem] border border-zinc-100">
              <div className="flex flex-col">
                <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">Precio Unitario</span>
                <span className="text-3xl font-black text-zinc-900">S/ {parseFloat(producto.precio).toFixed(2)}</span>
              </div>

              <div className="flex items-center gap-5 bg-white p-2 rounded-2xl shadow-sm border border-zinc-100">
                <button 
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Minus size={20} strokeWidth={3} />
                </button>
                <span className="font-black text-xl text-zinc-800 w-6 text-center">{cantidad}</span>
                <button 
                  onClick={() => setCantidad(cantidad + 1)}
                  className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Plus size={20} strokeWidth={3} />
                </button>
              </div>
            </div>

            <button 
              onClick={() => {
                onAdd(producto, cantidad);
                onClose();
              }}
              className="w-full bg-red-600 hover:bg-zinc-900 text-white font-black py-5 rounded-[2rem] flex items-center justify-center gap-4 shadow-xl shadow-red-100 transition-all transform active:scale-[0.98] group"
            >
              <ShoppingCart size={22} className="group-hover:animate-bounce" />
              <span className="uppercase tracking-wider">Añadir S/ {(parseFloat(producto.precio) * cantidad).toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}