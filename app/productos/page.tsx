"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";
import {
  Search,
  Loader2,
  Plus,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  SlidersHorizontal,
  X,
} from "lucide-react";
import ProductoModal from "@/components/productomodal";
import { useCarrito } from "@/context/CarritoContext";

interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: string;
  imagen: string;
}

export default function ProductosPage() {
  const { agregarAlCarrito } = useCarrito();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [filtrados, setFiltrados] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);

  const [showFilters, setShowFilters] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [notificacion, setNotificacion] = useState<string | null>(null);

  const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxu2PFEjWEu28sy32MYlzQMu7nyyB_x2dVBmgv5mLy5A7cdAq2hqPkxYDyMsu5r5-GVAhZNtB5GtrU/pub?output=csv";

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
            setFiltrados(validos);
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

  useEffect(() => {
    let res = productos.filter(
      (p) =>
        p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.categoria?.toLowerCase().includes(busqueda.toLowerCase())
    );

    if (categoriaActiva !== "Todos") {
      res = res.filter((p) => p.categoria === categoriaActiva);
    }

    setFiltrados(res);
  }, [busqueda, categoriaActiva, productos]);

  const categorias = [
    "Todos",
    ...Array.from(new Set(productos.map((p) => p.categoria))),
  ];

  const handleAgregar = (producto: Producto, cant: number = 1) => {
    agregarAlCarrito(producto, cant);

    setNotificacion(`${producto.nombre} añadido`);
    setTimeout(() => setNotificacion(null), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-50 to-white">
        <Loader2
          className="animate-spin text-red-600 mb-5"
          size={54}
        />

        <h1 className="text-3xl font-black italic uppercase tracking-tight text-red-600">
          Mi Ahorro Pharma
        </h1>

        <p className="text-zinc-400 mt-2 font-medium">
          Cargando catálogo...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] overflow-x-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-120px] right-[-120px] w-[350px] h-[350px] rounded-full bg-red-200 blur-3xl opacity-30" />
        <div className="absolute bottom-[-120px] left-[-120px] w-[350px] h-[350px] rounded-full bg-red-100 blur-3xl opacity-40" />
      </div>

      {/* HEADER */}
      <section className="relative bg-gradient-to-r from-red-600 via-red-500 to-rose-500 pb-32 pt-12 px-5 rounded-b-[3rem] shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
           {/* BUSCADOR */}
            <div className="relative w-full max-w-3xl mt-10 group">
              <Search
                className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-red-500 transition-all"
                size={24}
              />

              <input
                type="text"
                placeholder="Buscar medicamentos, vitaminas, cuidado personal..."
                className="w-full h-16 pl-16 pr-6 rounded-[1.8rem] bg-white shadow-2xl outline-none text-zinc-800 text-base md:text-lg font-medium focus:ring-8 focus:ring-white/20 transition-all"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-20 relative z-20">
        <div className="flex gap-6">
          {/* MINI SIDEBAR RESPONSIVE */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden fixed bottom-24 left-5 z-50 w-14 h-14 rounded-2xl bg-red-600 text-white shadow-2xl flex items-center justify-center active:scale-95 transition-all"
          >
            <SlidersHorizontal size={24} />
          </button>

          {/* OVERLAY MOBILE */}
          {showMobileFilters && (
            <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
              <div className="absolute left-0 top-0 h-full w-[280px] bg-white shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-left duration-300">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-black text-xl text-zinc-800">
                    Filtros
                  </h2>

                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {categorias.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategoriaActiva(cat);
                        setShowMobileFilters(false);
                      }}
                      className={`text-left px-4 py-3 rounded-2xl font-semibold transition-all ${
                        categoriaActiva === cat
                          ? "bg-red-600 text-white shadow-lg"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SIDEBAR DESKTOP */}
          <aside
            className={`hidden md:block transition-all duration-500 ${
              showFilters
                ? "w-[280px] opacity-100"
                : "w-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="sticky top-24 bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-black uppercase tracking-wide text-zinc-800">
                  Categorías
                </h2>

                <button
                  onClick={() => setShowFilters(false)}
                  className="w-9 h-9 rounded-xl bg-zinc-100 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoriaActiva(cat)}
                    className={`text-left px-4 py-3 rounded-2xl font-semibold transition-all ${
                      categoriaActiva === cat
                        ? "bg-red-600 text-white shadow-lg"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* BOTON ABRIR DESKTOP */}
          {!showFilters && (
            <button
              onClick={() => setShowFilters(true)}
              className="hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 z-40 bg-white shadow-2xl border border-zinc-200 w-14 h-14 rounded-2xl items-center justify-center hover:bg-red-600 hover:text-white transition-all"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* GRID */}
          <main className="flex-1">
            {/* INFO */}
            <div className="flex items-center justify-between mb-6 px-1">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-zinc-800 tracking-tight">
                  Productos disponibles
                </h2>

                <p className="text-zinc-500 mt-1 text-sm">
                  {filtrados.length} productos encontrados
                </p>
              </div>

              <div className="hidden md:flex bg-white rounded-2xl px-4 py-3 shadow-md border border-zinc-100">
                <span className="text-sm font-semibold text-zinc-500">
                  Categoría:
                </span>

                <span className="ml-2 text-sm font-black text-red-600">
                  {categoriaActiva}
                </span>
              </div>
            </div>

            {filtrados.length > 0 ? (
              <div
                className={`grid gap-5 md:gap-7 transition-all duration-500 ${
                  showFilters
                    ? "grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                }`}
              >
                {filtrados.map((producto) => (
                  <div
                    key={producto.id}
                    onClick={() =>
                      setProductoSeleccionado(producto)
                    }
                    className="group relative bg-white/90 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-1"
                  >
                    {/* IMAGE */}
                    <div className="relative h-44 md:h-56 bg-gradient-to-b from-zinc-50 to-white flex items-center justify-center p-5 overflow-hidden">
                      <img
                        src={
                          producto.imagen ||
                          "/placeholder-farma.webp"
                        }
                        alt={producto.nombre}
                        className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />

                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-red-600 text-[10px] md:text-xs uppercase font-black px-3 py-2 rounded-full shadow-sm">
                        {producto.categoria}
                      </div>
                    </div>

                    {/* BODY */}
                    <div className="p-5 md:p-6 flex flex-col">
                      <h3 className="font-black text-zinc-800 text-sm md:text-lg leading-tight line-clamp-2">
                        {producto.nombre}
                      </h3>

                      <p className="text-zinc-400 text-xs md:text-sm mt-2 line-clamp-2 min-h-[40px]">
                        {producto.descripcion}
                      </p>

                      <div className="mt-5 flex items-end justify-between">
                        <div>
                          <span className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                            Precio
                          </span>

                          <span className="text-xl md:text-2xl font-black text-zinc-900">
                            S/{" "}
                            {parseFloat(
                              producto.precio
                            ).toFixed(2)}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAgregar(producto);
                          }}
                          className="w-12 h-12 rounded-2xl bg-red-600 hover:bg-zinc-900 text-white flex items-center justify-center shadow-lg shadow-red-200 transition-all active:scale-90"
                        >
                          <Plus size={22} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[2rem] border border-dashed border-zinc-200 shadow-lg py-28 text-center">
                <p className="text-zinc-500 text-lg font-semibold">
                  No se encontraron productos.
                </p>

                <p className="text-zinc-400 mt-2 text-sm">
                  Intenta con otra búsqueda o categoría.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* TOAST */}
      {notificacion && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[999]">
          <div className="bg-zinc-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
            <CheckCircle2
              className="text-green-400"
              size={22}
            />

            <span className="font-bold text-xs md:text-sm uppercase tracking-wider">
              {notificacion}
            </span>
          </div>
        </div>
      )}

      {/* MODAL */}
      <ProductoModal
        producto={productoSeleccionado}
        onClose={() => setProductoSeleccionado(null)}
        onAdd={handleAgregar}
      />
    </div>
  );
}