"use client";

import { Plus } from "lucide-react";

interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: string;
  imagen: string;
}

interface Props {
  producto: Producto;
  onClick: () => void;
  onAgregar: () => void;
}

export default function CardProducto({ producto, onClick, onAgregar }: Props) {
  return (
    <div className="group bg-white rounded-2xl border border-zinc-200 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col h-full overflow-hidden">
      {/* Imagen */}
      <div
        className="relative aspect-square overflow-hidden bg-zinc-50 cursor-pointer"
        onClick={onClick}
      >
        <img
          src={producto.imagen || "/placeholder.png"}
          alt={producto.nombre}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary shadow-xs border border-zinc-200 uppercase tracking-widest">
            {producto.categoria}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <h3
          className="text-zinc-900 font-bold text-sm md:text-base leading-tight mb-2 line-clamp-2 min-h-[2.5rem] cursor-pointer hover:text-primary transition-colors tracking-tight"
          onClick={onClick}
        >
          {producto.nombre}
        </h3>

        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-widest">
              Precio
            </span>
            <span className="text-primary font-bold text-lg md:text-xl tracking-tight">
              S/ {parseFloat(producto.precio).toFixed(2)}
            </span>
          </div>

          <button
            onClick={onAgregar}
            aria-label="Añadir al carrito"
            title="Añadir al carrito"
            className="bg-primary hover:bg-primary-dark text-white p-3 md:p-3.5 rounded-xl shadow-xs transition-all active:scale-90"
          >
            <Plus size={20} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}