"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Papa from "papaparse";
import {
  Search,
  Loader2,
  ChevronLeft,
  CheckCircle2,
  SlidersHorizontal,
  X,
  RotateCcw,
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

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS2tSaGATHDMJrUsCpLaYJzEXU8rII_0OAGRqpikW1FewAhaj85OW93QJMxCDQ_UQ/pub?gid=2029790566&single=true&output=csv";

const PAGE_SIZE = 20;
const SEARCH_DEBOUNCE_MS = 250;

function parsePrecio(precio: string | undefined): number {
  if (!precio) return 0;
  const limpio = precio.replace(/[^0-9.,]/g, "").replace(",", ".");
  const valor = parseFloat(limpio);
  return Number.isFinite(valor) ? valor : 0;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

interface FiltrosPanelProps {
  categorias: string[];
  categoriaActiva: string;
  onCategoria: (cat: string) => void;
  precioBounds: [number, number];
  rangoPrecio: [number, number];
  onRangoPrecio: (rango: [number, number]) => void;
  onReset: () => void;
}

function FiltrosPanel({
  categorias,
  categoriaActiva,
  onCategoria,
  precioBounds,
  rangoPrecio,
  onRangoPrecio,
  onReset,
}: FiltrosPanelProps) {
  const [min, max] = precioBounds;
  const span = Math.max(max - min, 1);
  const leftPct = ((rangoPrecio[0] - min) / span) * 100;
  const rightPct = ((rangoPrecio[1] - min) / span) * 100;

  return (
    <div className="flex flex-col gap-7">
      {/* CATEGORÍAS */}
      <div>
        <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-400 mb-3">
          Categorías
        </h3>
        <div className="flex flex-col gap-1">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoria(cat)}
              className={`text-left px-3.5 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center justify-between ${
                categoriaActiva === cat
                  ? "bg-primary text-white shadow-md"
                  : "text-zinc-600 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {cat}
              {categoriaActiva === cat && (
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* PRECIO */}
      <div>
        <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-400 mb-3">
          Precio
        </h3>

        <div className="flex items-center justify-between mb-4 gap-3">
          <div className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2">
            <span className="block text-[10px] font-bold text-zinc-400 uppercase">
              Desde
            </span>
            <span className="text-sm font-bold text-zinc-800">
              S/ {rangoPrecio[0].toFixed(2)}
            </span>
          </div>
          <div className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2">
            <span className="block text-[10px] font-bold text-zinc-400 uppercase">
              Hasta
            </span>
            <span className="text-sm font-bold text-zinc-800">
              S/ {rangoPrecio[1].toFixed(2)}
            </span>
          </div>
        </div>

        <div className="relative h-1.5 rounded-full bg-zinc-200 mt-3 mb-1">
          <div
            className="absolute h-1.5 rounded-full bg-primary"
            style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={0.5}
            value={rangoPrecio[0]}
            onChange={(e) => {
              const nuevo = Math.min(Number(e.target.value), rangoPrecio[1]);
              onRangoPrecio([nuevo, rangoPrecio[1]]);
            }}
            className="rango-slider"
          />
          <input
            type="range"
            min={min}
            max={max}
            step={0.5}
            value={rangoPrecio[1]}
            onChange={(e) => {
              const nuevo = Math.max(Number(e.target.value), rangoPrecio[0]);
              onRangoPrecio([rangoPrecio[0], nuevo]);
            }}
            className="rango-slider"
          />
        </div>
      </div>

      <button
        onClick={onReset}
        className="flex items-center justify-center gap-2 text-sm font-semibold text-zinc-500 hover:text-primary transition-colors py-2"
      >
        <RotateCcw size={15} />
        Limpiar filtros
      </button>

      <style jsx global>{`
        .rango-slider {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          transform: translateY(-50%);
          appearance: none;
          background: transparent;
          pointer-events: none;
          margin: 0;
        }
        .rango-slider::-webkit-slider-thumb {
          appearance: none;
          pointer-events: auto;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background: var(--color-primary, #dc2626);
          border: 3px solid white;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
          cursor: pointer;
        }
        .rango-slider::-moz-range-thumb {
          pointer-events: auto;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background: var(--color-primary, #dc2626);
          border: 3px solid white;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
          cursor: pointer;
        }
        .rango-slider::-webkit-slider-runnable-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}


export default function ProductosPage() {
  const { agregarAlCarrito } = useCarrito();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  const [busquedaInput, setBusquedaInput] = useState("");
  const busqueda = useDebounce(busquedaInput, SEARCH_DEBOUNCE_MS);

  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [notificacion, setNotificacion] = useState<string | null>(null);
  const notifTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Rango de precios: límites reales derivados del catálogo
  const precioBounds = useMemo<[number, number]>(() => {
    if (productos.length === 0) return [0, 100];
    const precios = productos.map((p) => parsePrecio(p.precio));
    return [Math.floor(Math.min(...precios)), Math.ceil(Math.max(...precios))];
  }, [productos]);

  const [rangoPrecio, setRangoPrecio] = useState<[number, number]>([0, 100]);
  const rangoInicializado = useRef(false);

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

  // Inicializa el rango de precio una sola vez, cuando ya conocemos los límites reales
  useEffect(() => {
    if (!rangoInicializado.current && productos.length > 0) {
      setRangoPrecio(precioBounds);
      rangoInicializado.current = true;
    }
  }, [productos.length, precioBounds]);

  const categorias = useMemo(
    () => ["Todos", ...Array.from(new Set(productos.map((p) => p.categoria)))],
    [productos]
  );

  const filtrados = useMemo(() => {
    const term = busqueda.trim().toLowerCase();
    return productos.filter((p) => {
      const coincideBusqueda =
        !term ||
        p.nombre?.toLowerCase().includes(term) ||
        p.categoria?.toLowerCase().includes(term);
      const coincideCategoria = categoriaActiva === "Todos" || p.categoria === categoriaActiva;
      const precio = parsePrecio(p.precio);
      const coincidePrecio = precio >= rangoPrecio[0] && precio <= rangoPrecio[1];

      return coincideBusqueda && coincideCategoria && coincidePrecio;
    });
  }, [productos, busqueda, categoriaActiva, rangoPrecio]);

  // Resetear paginación al cambiar cualquier filtro
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [busqueda, categoriaActiva, rangoPrecio]);

  const resetFiltros = useCallback(() => {
    setCategoriaActiva("Todos");
    setRangoPrecio(precioBounds);
  }, [precioBounds]);

  const handleAgregar = useCallback(
    (producto: Producto, cant: number = 1) => {
      agregarAlCarrito(producto, cant);
      setNotificacion(`${producto.nombre} añadido`);
      if (notifTimer.current) clearTimeout(notifTimer.current);
      notifTimer.current = setTimeout(() => setNotificacion(null), 2500);
    },
    [agregarAlCarrito]
  );

  useEffect(() => {
    return () => {
      if (notifTimer.current) clearTimeout(notifTimer.current);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-primary mb-5" size={48} />
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          Mi Ahorro Pharma
        </h1>
        <p className="text-zinc-400 mt-2 text-sm">Cargando catálogo...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden font-sans pb-24 md:pb-0">
      <section className="bg-white pb-10 pt-8 px-4 md:px-6 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-zinc-900 text-2xl md:text-3xl font-bold mb-5 tracking-tight">
              Productos Disponibles
            </h1>
            <div className="flex w-full max-w-2xl gap-3">
              <div className="relative flex-1">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Buscar medicamentos..."
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-zinc-50 border border-zinc-200 outline-none text-zinc-800 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  value={busquedaInput}
                  onChange={(e) => setBusquedaInput(e.target.value)}
                />
              </div>
              <button
                onClick={() => setShowMobileFilters(true)}
                className="md:hidden flex items-center justify-center w-12 h-12 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-xs transition-all active:scale-95"
              >
                <SlidersHorizontal size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-6 relative z-20">
        <div className="flex gap-6">
          {/* SIDEBAR DESKTOP */}
          <aside
            className={`hidden md:block transition-all duration-500 ease-in-out ${
              showFilters ? "w-64 opacity-100" : "w-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="sticky top-24 bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-xs uppercase tracking-widest text-zinc-400">
                  Filtros
                </h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-zinc-400 hover:text-primary transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
              </div>
              <FiltrosPanel
                categorias={categorias}
                categoriaActiva={categoriaActiva}
                onCategoria={setCategoriaActiva}
                precioBounds={precioBounds}
                rangoPrecio={rangoPrecio}
                onRangoPrecio={setRangoPrecio}
                onReset={resetFiltros}
              />
            </div>
          </aside>

          {/* MAIN */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6 px-1">
              <div className="flex items-center gap-3">
                {!showFilters && (
                  <button
                    onClick={() => setShowFilters(true)}
                    className="hidden md:flex items-center gap-2 bg-white px-3.5 py-2 rounded-lg border border-zinc-200 text-zinc-600 hover:border-primary hover:text-primary transition-all shadow-xs"
                  >
                    <SlidersHorizontal size={16} />
                    <span className="font-semibold text-sm">Filtros</span>
                  </button>
                )}
                <h2 className="text-lg md:text-xl font-bold text-zinc-800 tracking-tight">{categoriaActiva}</h2>
              </div>
              <span className="text-zinc-400 text-sm font-medium">
                {filtrados.length} resultados
              </span>
            </div>

            {filtrados.length > 0 ? (
              <>
                <div
                  className={`grid gap-4 md:gap-5 transition-all duration-500 ${
                    showFilters
                      ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      : "grid-cols-2 md:grid-cols-4 xl:grid-cols-5"
                  }`}
                >
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
                      onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                      className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-xs hover:shadow-md transition-all active:scale-95"
                    >
                      Ver más productos
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-20 text-center bg-white rounded-2xl border border-zinc-200">
                <p className="text-zinc-500 text-base font-medium mb-3">No hay resultados</p>
                <button
                  onClick={resetFiltros}
                  className="text-primary font-semibold text-sm hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTERS */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col">
            <div className="p-6 flex flex-col h-full overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-zinc-800 tracking-tight">Filtrar por</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 bg-zinc-100 rounded-full text-zinc-500"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-1">
                <FiltrosPanel
                  categorias={categorias}
                  categoriaActiva={categoriaActiva}
                  onCategoria={(cat) => setCategoriaActiva(cat)}
                  precioBounds={precioBounds}
                  rangoPrecio={rangoPrecio}
                  onRangoPrecio={setRangoPrecio}
                  onReset={resetFiltros}
                />
              </div>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="mt-4 w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-xl shadow-xs transition-all active:scale-95"
              >
                Ver {filtrados.length} resultados
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {notificacion && (
        <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[999]">
          <div className="bg-zinc-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
            <CheckCircle2 className="text-green-400" size={20} />
            <span className="font-semibold text-sm">
              {notificacion}
            </span>
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