"use client";
import { createContext, useContext, useState, useEffect } from "react";

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

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    const datosPersistidos = localStorage.getItem("carrito_app");
    if (datosPersistidos) {
      try {
        const { items, expiracion } = JSON.parse(datosPersistidos);

        if (Date.now() < expiracion) {
          setCarrito(items);
        } else {
          localStorage.removeItem("carrito_app");
        }
      } catch (error) {
        console.error("Error al parsear el carrito:", error);
      }
    }
    setMontado(true);
  }, []);

  useEffect(() => {
    if (montado) {
      const dataParaGuardar = {
        items: carrito,
        expiracion: Date.now() + 10 * 60 * 1000,
      };
      localStorage.setItem("carrito_app", JSON.stringify(dataParaGuardar));
    }
  }, [carrito, montado]);

  const agregarAlCarrito = (producto: Producto, cant: number) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + cant } : item
        );
      }
      return [...prev, { ...producto, cantidad: cant }];
    });
  };

  const eliminarDelCarrito = (id: string) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito_app");
  };

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