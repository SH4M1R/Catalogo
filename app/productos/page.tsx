"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Papa from "papaparse";
import {
  Search,
  Loader2,
  ChevronLeft,
  CheckCircle2,
  SlidersHorizontal,
  X,
} from "lucide-react";

import ProductoModal from "@/components/productomodal";
import { useCarrito } from "@/context/CarritoContext";
import CardProducto from "@/components/cardproducto";

interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: string;
  imagen: string;
}

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxu2PFEjWEu28sy32MYlzQMu7nyyB_x2dVBmgv5mLy5A7cdAq2hqPkxYDyMsu5r5-GVAhZNtB5GtrU/pub?output=csv";

export default function ProductosPage() {
  const { agregarAlCarrito } = useCarrito();
  
  // Estados principales
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(20);
  
  // Estados de UI
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [notificacion, setNotificacion] = useState<string | null>(null);

  // Carga de datos
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data = results.data as Producto[];
            const validos = data.filter((p) => p.id && p.nombre);
            setProductos(validos);
            setLoading(false);
          },
        });
      } catch (e) {
        console.error("Error cargando Google Sheets:", e);
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  // Memorizar categorías únicas
  const categorias = useMemo(() => {
    return ["Todos", ...Array.from(new Set(productos.map((p) => p.categoria)))];
  }, [productos]);

  // Lógica de filtrado optimizada (Estado derivado)
  const filtrados = useMemo(() => {
    const term = busqueda.toLowerCase();
    return productos.filter((p) => {
      const coincideBusqueda = 
        p.nombre?.toLowerCase().includes(term) || 
        p.categoria?.toLowerCase().includes(term);
      const coincideCategoria = 
        categoriaActiva === "Todos" || p.categoria === categoriaActiva;
      
      return coincideBusqueda && coincideCategoria;
    });
  }, [productos, busqueda, categoriaActiva]);

  // Resetear paginación al filtrar
  useEffect(() => {
    setVisibleCount(20);
  }, [busqueda, categoriaActiva]);

  // Handlers
  const handleAgregar = useCallback((producto: Producto, cant: number = 1) => {
    agregarAlCarrito(producto, cant);
    setNotificacion(`${producto.nombre} añadido`);
    const timer = setTimeout(() => setNotificacion(null), 2500);
    return () => clearTimeout(timer);
  }, [agregarAlCarrito]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-red-600 mb-5" size={54} />
        <h1 className="text-3xl font-black italic uppercase tracking-tight text-red-600">
          Mi Ahorro Pharma
        </h1>
        <p className="text-zinc-400 mt-2 font-medium">Cargando catálogo...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden font-sans">
      <section className="relative bg-gradient-to-b from-gray-200 to-gray-100 pb-32 pt-10 px-5 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-zinc-800 text-3xl md:text-4xl font-black mb-6 tracking-tight uppercase">
              Productos Disponibles
            </h1>
            <div className="flex w-full max-w-3xl gap-3">
              <div className="relative flex-1 group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-red-500" size={22} />
                <input
                  type="text"
                  placeholder="Buscar medicamentos..."
                  className="w-full h-16 pl-16 pr-6 rounded-2xl bg-white shadow-xl shadow-gray-200/50 outline-none text-zinc-800 text-base md:text-lg border border-transparent focus:border-red-200 transition-all"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
              <button
                onClick={() => setShowMobileFilters(true)}
                className="md:hidden flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-2xl shadow-xl active:scale-95 transition-transform"
              >
                <SlidersHorizontal size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 -mt-16 relative z-20">
        <div className="flex gap-8">
          {/* SIDEBAR DESKTOP */}
          <aside className={`hidden md:block transition-all duration-500 ease-in-out ${showFilters ? "w-72 opacity-100" : "w-0 opacity-0 overflow-hidden"}`}>
            <div className="sticky top-24 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-sm uppercase tracking-widest text-zinc-400">Categorías</h2>
                <button onClick={() => setShowFilters(false)} className="hover:text-red-600 transition-colors">
                  <ChevronLeft size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoriaActiva(cat)}
                    className={`text-left px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                      categoriaActiva === cat ? "bg-red-50 text-red-600 shadow-sm" : "text-zinc-600 hover:bg-gray-50 hover:text-zinc-900"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-8 px-2">
              <div className="flex items-center gap-4">
                {!showFilters && (
                  <button
                    onClick={() => setShowFilters(true)}
                    className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 text-zinc-600 hover:border-red-500 hover:text-red-600 transition-all shadow-sm"
                  >
                    <SlidersHorizontal size={18} />
                    <span className="font-bold text-sm uppercase">Filtros</span>
                  </button>
                )}
                <h2 className="text-xl md:text-2xl font-bold text-zinc-800">{categoriaActiva}</h2>
              </div>
              <span className="text-zinc-400 text-sm font-medium">{filtrados.length} resultados</span>
            </div>

            {filtrados.length > 0 ? (
              <>
                <div className={`grid gap-4 md:gap-6 transition-all duration-500 ${showFilters ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-2 md:grid-cols-4 xl:grid-cols-5"}`}>
                  {filtrados.slice(0, visibleCount).map((producto) => (
                    <CardProducto
                      key={producto.id}
                      producto={producto}
                      onClick={() => setProductoSeleccionado(producto)}
                      onAgregar={() => handleAgregar(producto)}
                    />
                  ))}
                </div>

                {visibleCount < filtrados.length && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 20)}
                      className="px-7 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg transition-all active:scale-95"
                    >
                      Ver más productos
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-20 text-center">
                <p className="text-zinc-500 text-lg font-medium">No hay resultados</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTERS */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-zinc-800 uppercase">Filtrar por</h2>
                <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-gray-100 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col gap-2">
                  {categorias.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategoriaActiva(cat);
                        setShowMobileFilters(false);
                      }}
                      className={`text-left px-5 py-4 rounded-2xl font-bold text-base transition-all ${
                        categoriaActiva === cat ? "bg-red-600 text-white" : "bg-gray-50 text-zinc-600"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {notificacion && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[999]">
          <div className="bg-zinc-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
            <CheckCircle2 className="text-green-400" size={22} />
            <span className="font-bold text-xs md:text-sm uppercase tracking-wider">{notificacion}</span>
          </div>
        </div>
      )}

      <ProductoModal
        producto={productoSeleccionado}
        onClose={() => setProductoSeleccionado(null)}
        onAdd={handleAgregar}
      />
    </div>
  );
}