"use client";

import { useState } from "react";
import { useCarrito } from "@/context/CarritoContext";
import {
  ArrowLeft,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

export default function VentaPage() {
  const { carrito, total } = useCarrito();

  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");

  const generarMensaje = () => {
  let mensaje = "";
  
  mensaje += "*NUEVA CONSULTA DE COMPRA* \n\n";

  mensaje += `Cliente: ${nombre}\n`;
  mensaje += `DNI: ${dni}\n\n`;

  mensaje += "━━━━━━━━━━━━━━\n";
  mensaje += "*PRODUCTOS*\n";

  carrito.forEach((item, index) => {
    const subtotal =
      parseFloat(item.precio) * item.cantidad;

    mensaje += `*${index + 1}. ${item.nombre}*\n`;
    mensaje += `Cantidad: ${item.cantidad}\n`;
    mensaje += `Precio: S/ ${parseFloat(
      item.precio
    ).toFixed(2)}\n`;
    mensaje += `Subtotal: S/ ${subtotal.toFixed(2)}\n`;
    mensaje += "----------------------\n";
  });

  mensaje += `\n*TOTAL: S/ ${total.toFixed(2)}*`;

  return encodeURIComponent(mensaje);
}

  const realizarConsulta = () => {
    if (!nombre.trim()) {
      alert("Ingrese su nombre");
      return;
    }

    if (!dni.trim() || dni.length !== 8) {
      alert("Ingrese un DNI válido");
      return;
    }

    const mensaje = generarMensaje();

    const telefono = "51964328743";

    const url = `https://wa.me/${telefono}?text=${mensaje}`;

    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] overflow-x-hidden pb-20">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-120px] right-[-120px] w-[350px] h-[350px] rounded-full bg-red-200 blur-3xl opacity-30" />
        <div className="absolute bottom-[-120px] left-[-120px] w-[350px] h-[350px] rounded-full bg-red-100 blur-3xl opacity-40" />
      </div>

      {/* HEADER */}
      <section className="relative bg-gradient-to-r from-red-600 via-red-500 to-rose-500 pb-28 pt-12 px-5 rounded-b-[3rem] shadow-xl">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/carrito"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-all mb-8 font-semibold"
          >
            <ArrowLeft size={18} />
            Volver al carrito
          </Link>

          <h1 className="text-white text-4xl md:text-6xl font-black italic tracking-tight">
            Finalizar consulta
          </h1>

          <p className="text-red-100 mt-4 max-w-xl">
            Completa tus datos para enviar tu pedido por
            WhatsApp.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          
          {/* FORMULARIO */}
          <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white p-6 md:p-8">
            <h2 className="text-3xl font-black text-zinc-800">
              Datos del cliente
            </h2>

            <p className="text-zinc-500 mt-2">
              Estos datos serán enviados junto con la
              consulta.
            </p>

            <div className="mt-8 space-y-6">
              {/* NOMBRE */}
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-3">
                  Nombre completo
                </label>

                <input
                  type="text"
                  value={nombre}
                  onChange={(e) =>
                    setNombre(e.target.value)
                  }
                  placeholder="Ingrese su nombre completo"
                  className="w-full h-14 rounded-2xl border border-zinc-200 px-5 outline-none focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all"
                />
              </div>

              {/* DNI */}
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-3">
                  DNI
                </label>

                <input
                  type="text"
                  value={dni}
                  maxLength={8}
                  onChange={(e) =>
                    setDni(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="Ingrese su DNI"
                  className="w-full h-14 rounded-2xl border border-zinc-200 px-5 outline-none focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all"
                />
              </div>
            </div>

            {/* BOTÓN */}
            <button
              onClick={realizarConsulta}
              className="mt-10 w-full h-16 rounded-2xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black text-lg shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <MessageCircle size={26} />
              Realizar consulta por WhatsApp
            </button>
          </div>

          {/* RESUMEN */}
          <aside>
            <div className="sticky top-24 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
                  <ShoppingBag
                    className="text-red-600"
                    size={28}
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-black text-zinc-800">
                    Resumen
                  </h2>

                  <p className="text-zinc-500 text-sm">
                    Productos seleccionados
                  </p>
                </div>
              </div>

              <div className="space-y-5 max-h-[450px] overflow-y-auto pr-2">
                {carrito.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-2xl bg-zinc-50"
                  >
                    <div className="w-20 h-20 rounded-xl bg-white flex items-center justify-center p-2">
                      <img
                        src={
                          item.imagen ||
                          "/placeholder-farma.webp"
                        }
                        alt={item.nombre}
                        className="max-h-full object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-black text-zinc-800 leading-tight">
                        {item.nombre}
                      </h3>

                      <p className="text-zinc-500 text-sm mt-2">
                        Cantidad: {item.cantidad}
                      </p>

                      <p className="text-red-600 font-black text-lg mt-1">
                        S/{" "}
                        {(
                          parseFloat(item.precio) *
                          item.cantidad
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="mt-8 border-t border-dashed border-zinc-200 pt-6 flex items-center justify-between">
                <span className="text-lg font-bold text-zinc-700">
                  Total
                </span>

                <span className="text-4xl font-black text-red-600">
                  S/ {total.toFixed(2)}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}