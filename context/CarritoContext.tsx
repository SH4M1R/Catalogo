"use client";
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

interface Producto {
  id: string;
  nombre: string;
  precio: string;
  imagen: string;
  categoria: string;
}

interface ItemCarrito extends Producto {
  cantidad: number;
}

interface CarritoContextType {
  carrito: ItemCarrito[];
  agregarAlCarrito: (p: Producto, cant: number) => void;
  eliminarDelCarrito: (id: string) => void;
  vaciarCarrito: () => void;
  total: number;
}

const CARRITO_KEY = "carrito_app";
const DURACION_MS = 10 * 60 * 1000;

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

function leerCarritoDeStorage(): ItemCarrito[] {
  const datosPersistidos = localStorage.getItem(CARRITO_KEY);
  if (!datosPersistidos) return [];

  try {
    const { items, expiracion } = JSON.parse(datosPersistidos);
    if (Date.now() < expiracion) return items;
    localStorage.removeItem(CARRITO_KEY);
    return [];
  } catch (error) {
    console.error("Error al parsear el carrito:", error);
    return [];
  }
}

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [montado, setMontado] = useState(false);

  // Evita que el efecto de guardado reescriba el storage justo
  // después de un vaciado explícito (removeItem manual).
  const saltarProximoGuardado = useRef(false);

  // Carga inicial
  useEffect(() => {
    setCarrito(leerCarritoDeStorage());
    setMontado(true);
  }, []);

  // Persistencia normal (agregar / eliminar)
  useEffect(() => {
    if (!montado) return;

    if (saltarProximoGuardado.current) {
      saltarProximoGuardado.current = false;
      return;
    }

    if (carrito.length === 0) {
      localStorage.removeItem(CARRITO_KEY);
      return;
    }

    const dataParaGuardar = {
      items: carrito,
      expiracion: Date.now() + DURACION_MS,
    };
    localStorage.setItem(CARRITO_KEY, JSON.stringify(dataParaGuardar));
  }, [carrito, montado]);

  // Resincroniza si el carrito cambia en OTRA pestaña u OTRA instancia
  // del provider (ej. layouts distintos que montan CarritoProvider por separado).
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === CARRITO_KEY) {
        setCarrito(leerCarritoDeStorage());
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const agregarAlCarrito = useCallback((producto: Producto, cant: number) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + cant } : item
        );
      }
      return [...prev, { ...producto, cantidad: cant }];
    });
  }, []);

  const eliminarDelCarrito = useCallback((id: string) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const vaciarCarrito = useCallback(() => {
    saltarProximoGuardado.current = true;
    localStorage.removeItem(CARRITO_KEY);
    setCarrito([]);
  }, []);

  const total = carrito.reduce((acc, item) => acc + parseFloat(item.precio) * item.cantidad, 0);

  if (!montado) return null;

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, total }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (context === undefined) {
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  }
  return context;
};