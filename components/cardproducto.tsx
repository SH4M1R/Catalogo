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

export default function CardProducto({
  producto,
  onClick,
  onAgregar,
}: Props) {
  return (
    <div className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Imagen con Aspect Ratio controlado */}
      <div 
        className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer"
        onClick={onClick}
      >
        <img
          src={producto.imagen || "/placeholder.png"}
          alt={producto.nombre}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge de Categoría (Visible en móvil también) */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-red-600 shadow-sm border border-gray-100 uppercase tracking-wider">
            {producto.categoria}
          </span>
        </div>
      </div>

      {/* Contenido de Datos */}
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <h3 
          className="text-zinc-800 font-bold text-sm md:text-base leading-tight mb-2 line-clamp-2 min-h-[2.5rem] cursor-pointer hover:text-red-600 transition-colors"
          onClick={onClick}
        >
          {producto.nombre}
        </h3>
        
        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-tighter">Precio</span>
            <span className="text-red-600 font-black text-lg md:text-xl tracking-tight">
              S/ {parseFloat(producto.precio).toFixed(2)}
            </span>
          </div>

          <button
            onClick={onAgregar}
            className="bg-red-600 hover:bg-red-700 text-white p-3 md:p-3.5 rounded-2xl shadow-lg shadow-red-200 transition-all active:scale-90"
            title="Añadir al carrito"
          >
            <Plus size={20} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}