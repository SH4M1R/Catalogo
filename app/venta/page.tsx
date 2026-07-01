"use client";

import { useState } from "react";
import { useCarrito } from "@/context/CarritoContext";
import {
  Banknote,
  LocateFixed,
  Loader2,
  MapPin,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";

const metodosPago = [
  { nombre: "Yape", src: "/pagos/yape.png", fallback: "YA" },
  { nombre: "Plin", src: "/pagos/plin.png", fallback: "PL" },
  { nombre: "Visa", src: "/pagos/visa.png", fallback: "VI" },
  { nombre: "Efectivo", src: "/pagos/efectivo.png", fallback: "EF" },
];

// Limpia símbolos de moneda / comas antes de convertir a número.
function parsePrecio(precio: string | number | undefined): number {
  if (typeof precio === "number") return precio;
  if (!precio) return 0;
  const limpio = precio.replace(/[^0-9.,]/g, "").replace(",", ".");
  const valor = parseFloat(limpio);
  return Number.isFinite(valor) ? valor : 0;
}

function MetodoPagoBadge({ metodo }: { metodo: (typeof metodosPago)[number] }) {
  const [fallo, setFallo] = useState(false);

  return (
    <div
      title={metodo.nombre}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-100 bg-white shadow-sm overflow-hidden shrink-0"
    >
      {fallo ? (
        <span className="text-xs font-black text-red-600">{metodo.fallback}</span>
      ) : (
        <img
          src={metodo.src}
          alt={metodo.nombre}
          className="max-h-7 max-w-7 object-contain"
          onError={() => setFallo(true)}
        />
      )}
    </div>
  );
}

export default function VentaPage() {
  const { carrito, total } = useCarrito();

  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [direccion, setDireccion] = useState("");

  const [loadingUbicacion, setLoadingUbicacion] = useState(false);
  const [ubicacionError, setUbicacionError] = useState("");

  const [errores, setErrores] = useState({
    nombre: "",
    dni: "",
    direccion: "",
  });

  const obtenerUbicacion = () => {
    setUbicacionError("");

    if (!navigator.geolocation) {
      setUbicacionError("Tu navegador no permite obtener la ubicación.");
      return;
    }

    setLoadingUbicacion(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const coordenadas = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;

        try {
          const respuesta = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );

          const data = await respuesta.json();

          setDireccion(data.display_name || coordenadas);

          setErrores((prev) => ({
            ...prev,
            direccion: "",
          }));
        } catch {
          setDireccion(coordenadas);

          setUbicacionError(
            "No se pudo convertir la ubicación en dirección, se agregaron las coordenadas."
          );
        } finally {
          setLoadingUbicacion(false);
        }
      },
      () => {
        setLoadingUbicacion(false);

        setUbicacionError("No se pudo obtener la ubicación. Escríbela manualmente.");
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0,
      }
    );
  };

  const generarMensaje = () => {
    let mensaje = "";

    mensaje += "*NUEVA CONSULTA DE COMPRA* \n";
    mensaje += `Cliente: ${nombre}\n`;
    mensaje += `DNI: ${dni}\n`;
    mensaje += `Dirección: ${direccion}\n`;
    mensaje += "━━━━━━━━━━━━━━\n";
    mensaje += "*PRODUCTOS*\n";

    carrito.forEach((item, index) => {
      const precioUnitario = parsePrecio(item.precio);
      const subtotal = precioUnitario * item.cantidad;

      mensaje += `*${index + 1}. ${item.nombre}*\n`;
      mensaje += `Cantidad: ${item.cantidad}\n`;
      mensaje += `Precio: S/ ${precioUnitario.toFixed(2)}\n`;
      mensaje += `Subtotal: S/ ${subtotal.toFixed(2)}\n`;
      mensaje += "----------------------\n";
    });

    mensaje += `\n*TOTAL: S/ ${total.toFixed(2)}*`;

    return encodeURIComponent(mensaje);
  };

  const realizarConsulta = () => {
    const nuevosErrores = {
      nombre: "",
      dni: "",
      direccion: "",
    };

    let valido = true;

    if (!nombre.trim()) {
      nuevosErrores.nombre = "Ingrese su nombre completo";
      valido = false;
    }

    if (!dni.trim()) {
      nuevosErrores.dni = "Ingrese su DNI";
      valido = false;
    } else if (dni.length !== 8) {
      nuevosErrores.dni = "El DNI debe tener 8 dígitos";
      valido = false;
    }

    if (!direccion.trim()) {
      nuevosErrores.direccion = "Ingrese su dirección o use la ubicación automática";
      valido = false;
    }

    setErrores(nuevosErrores);

    if (!valido) return;

    const mensaje = generarMensaje();
    const telefono = "51964328743";
    const url = `https://wa.me/${telefono}?text=${mensaje}`;

    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f6f6f6] pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-16 text-zinc-900">
      <section className="relative overflow-hidden bg-red-600 px-4 pb-20 pt-4 md:px-6">
        <div className="relative mx-auto max-w-6xl">
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-3xl font-black text-white sm:text-4xl md:text-6xl">
                Finaliza tu consulta de compra
              </h1>

              <p className="mt-4 max-w-2xl text-sm font-medium text-red-100 sm:text-base">
                Completa tus datos y envía tu pedido directamente por WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 mx-auto -mt-10 grid max-w-6xl grid-cols-1 gap-5 px-3 sm:px-4 md:-mt-14 md:px-6 lg:grid-cols-[1fr_410px]">
        <section className="rounded-[24px] border border-red-100 bg-white p-4 shadow-[0_18px_55px_rgba(31,31,31,0.12)] sm:p-5 md:rounded-[28px] md:p-8">
          <div className="flex flex-col gap-4 border-b border-dashed border-zinc-200 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-black md:text-3xl">Datos del cliente</h2>

              <p className="mt-1 text-sm font-medium text-zinc-500">
                Completa la información para preparar el mensaje.
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {/* NOMBRE */}
            <div>
              <label className="mb-2 block text-sm font-black text-zinc-700">
                Nombre completo
              </label>

              <input
                type="text"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);

                  if (errores.nombre) {
                    setErrores((prev) => ({ ...prev, nombre: "" }));
                  }
                }}
                placeholder="Ingrese su nombre completo"
                className={`h-14 w-full rounded-2xl border bg-zinc-50 px-5 font-semibold outline-none transition focus:bg-white focus:ring-4
                ${
                  errores.nombre
                    ? "border-red-500 focus:ring-red-100"
                    : "border-zinc-200 focus:border-red-500 focus:ring-red-100"
                }`}
              />

              {errores.nombre && (
                <p className="mt-2 text-sm font-semibold text-red-500">{errores.nombre}</p>
              )}
            </div>

            {/* DNI */}
            <div>
              <label className="mb-2 block text-sm font-black text-zinc-700">DNI</label>

              <input
                type="text"
                value={dni}
                maxLength={8}
                inputMode="numeric"
                onChange={(e) => {
                  setDni(e.target.value.replace(/\D/g, ""));

                  if (errores.dni) {
                    setErrores((prev) => ({ ...prev, dni: "" }));
                  }
                }}
                placeholder="Ingrese su DNI"
                className={`h-14 w-full rounded-2xl border bg-zinc-50 px-5 font-semibold outline-none transition focus:bg-white focus:ring-4
                ${
                  errores.dni
                    ? "border-red-500 focus:ring-red-100"
                    : "border-zinc-200 focus:border-red-500 focus:ring-red-100"
                }`}
              />

              {errores.dni && (
                <p className="mt-2 text-sm font-semibold text-red-500">{errores.dni}</p>
              )}
            </div>

            {/* DIRECCIÓN — antes faltaba este campo en el formulario */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-black text-zinc-700">
                Dirección de entrega
              </label>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                    size={18}
                  />
                  <input
                    type="text"
                    value={direccion}
                    onChange={(e) => {
                      setDireccion(e.target.value);

                      if (errores.direccion) {
                        setErrores((prev) => ({ ...prev, direccion: "" }));
                      }
                    }}
                    placeholder="Escribe tu dirección o usa tu ubicación"
                    className={`h-14 w-full rounded-2xl border bg-zinc-50 pl-11 pr-5 font-semibold outline-none transition focus:bg-white focus:ring-4
                    ${
                      errores.direccion
                        ? "border-red-500 focus:ring-red-100"
                        : "border-zinc-200 focus:border-red-500 focus:ring-red-100"
                    }`}
                  />
                </div>

                <button
                  type="button"
                  onClick={obtenerUbicacion}
                  disabled={loadingUbicacion}
                  className="flex h-14 shrink-0 items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-5 font-black text-white transition hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-60"
                >
                  {loadingUbicacion ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <LocateFixed size={20} />
                  )}
                  <span className="whitespace-nowrap">
                    {loadingUbicacion ? "Ubicando..." : "Usar mi ubicación"}
                  </span>
                </button>
              </div>

              {errores.direccion && (
                <p className="mt-2 text-sm font-semibold text-red-500">{errores.direccion}</p>
              )}
              {!errores.direccion && ubicacionError && (
                <p className="mt-2 text-sm font-semibold text-amber-600">{ubicacionError}</p>
              )}
            </div>
          </div>

          {/* BOTÓN */}
          <button
            onClick={realizarConsulta}
            className="mt-7 flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-green-500 text-base font-black text-white shadow-[0_15px_35px_rgba(37,211,102,0.35)] transition hover:bg-[#1ebe5d] active:scale-[0.98] md:text-lg"
          >
            <MessageCircle size={26} />
            Realizar consulta por WhatsApp
          </button>
        </section>

        {/* RESUMEN */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="overflow-hidden rounded-[24px] bg-white shadow-xl md:rounded-[28px]">
            <div className="bg-zinc-950 p-5 text-white">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500">
                  <ShoppingBag size={28} />
                </div>

                <div>
                  <h2 className="text-2xl font-black">Resumen</h2>

                  <p className="text-sm font-medium text-zinc-300">
                    {carrito.length} producto(s) seleccionado(s)
                  </p>
                </div>
              </div>
            </div>

            <div className="max-h-[430px] space-y-3 overflow-y-auto p-4">
              {carrito.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[70px_1fr] gap-4 rounded-2xl bg-zinc-50 p-3 sm:grid-cols-[76px_1fr]"
                >
                  <div className="flex h-[70px] w-[70px] items-center justify-center rounded-xl bg-white p-2 sm:h-20 sm:w-20">
                    <img
                      src={item.imagen || "/placeholder-farma.webp"}
                      alt={item.nombre}
                      className="max-h-full object-contain"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-sm font-black leading-tight text-zinc-800 sm:text-base">
                      {item.nombre}
                    </h3>

                    <p className="mt-2 text-sm font-semibold text-zinc-500">
                      Cantidad: {item.cantidad}
                    </p>

                    <p className="mt-1 text-lg font-black text-red-600 sm:text-xl">
                      S/ {(parsePrecio(item.precio) * item.cantidad).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-zinc-200 p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-lg font-black text-zinc-700">Total</span>

                <span className="text-3xl font-black text-red-600 sm:text-4xl">
                  S/ {total.toFixed(2)}
                </span>
              </div>

              <div className="mt-4 rounded-2xl bg-red-50 p-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p className="flex items-center gap-2 text-sm font-bold text-red-700">
                    <Banknote size={18} />
                    Aceptamos
                  </p>
                  <div className="flex items-center gap-2">
                    {metodosPago.map((metodo) => (
                      <MetodoPagoBadge key={metodo.nombre} metodo={metodo} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}