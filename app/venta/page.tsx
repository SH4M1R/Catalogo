"use client";

import { useState } from "react";
import { useCarrito } from "@/context/CarritoContext";
import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";
import {
  Banknote,
  MessageCircle,
  ShoppingBag,
  Store,
  Navigation,
} from "lucide-react";

const metodosPago = [
  { nombre: "Yape", src: "/pagos/yape.png", fallback: "YA" },
  { nombre: "Plin", src: "/pagos/plin.png", fallback: "PL" },
  { nombre: "Visa", src: "/pagos/visa.png", fallback: "VI" },
  { nombre: "Efectivo", src: "/pagos/efectivo.png", fallback: "EF" },
];

const BOTICA = {
  nombre: "Mi Ahorro Pharma",
  direccionTexto: "Puente Piedra, Lima, Perú",
  lat: -11.854611196276153,
  lng: -77.06324886513723,
  mapsUrl: "https://maps.app.goo.gl/MKjPVv8a3ZBxMHrF7",
};

// Limpia símbolos de moneda / comas antes de convertir a número.
function parsePrecio(precio: string | number | undefined): number {
  if (typeof precio === "number") return precio;
  if (!precio) return 0;
  const limpio = precio.replace(/[^0-9.,]/g, "").replace(",", ".");
  const valor = parseFloat(limpio);
  return Number.isFinite(valor) ? valor : 0;
}

// Arma la URL de Google Maps para ir DESDE el cliente HACIA la botica.
function construirUrlMapsHaciaBotica(origen: { lat: number; lng: number } | null) {
  const params = new URLSearchParams({
    api: "1",
    destination: `${BOTICA.lat},${BOTICA.lng}`,
    travelmode: "driving",
  });

  if (origen) {
    params.set("origin", `${origen.lat},${origen.lng}`);
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

function MetodoPagoBadge({ metodo }: { metodo: (typeof metodosPago)[number] }) {
  const [fallo, setFallo] = useState(false);

  return (
    <div
      title={metodo.nombre}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white shadow-xs overflow-hidden shrink-0"
    >
      {fallo ? (
        <span className="text-xs font-bold text-primary">{metodo.fallback}</span>
      ) : (
        <img
          src={metodo.src}
          alt={metodo.nombre}
          className="max-h-6 max-w-6 object-contain"
          onError={() => setFallo(true)}
        />
      )}
    </div>
  );
}

export default function VentaPage() {
  const { carrito, total, vaciarCarrito } = useCarrito();

  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [direccion, setDireccion] = useState("");
  const [coordsUsuario, setCoordsUsuario] = useState<{ lat: number; lng: number } | null>(null);

  const [loadingUbicacion, setLoadingUbicacion] = useState(false);
  const [ubicacionError, setUbicacionError] = useState("");

  const [errores, setErrores] = useState({
    nombre: "",
    dni: "",
  });

  const obtenerUbicacion = async () => {
    setUbicacionError("");
    setLoadingUbicacion(true);

    try {
      let latitude: number;
      let longitude: number;

      if (Capacitor.isNativePlatform()) {
        const permisos = await Geolocation.requestPermissions();

        if (permisos.location !== "granted" && permisos.coarseLocation !== "granted") {
          setUbicacionError("Debes conceder el permiso de ubicación en los ajustes de la app.");
          setLoadingUbicacion(false);
          return;
        }

        const posicion = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 12000,
        });

        latitude = posicion.coords.latitude;
        longitude = posicion.coords.longitude;
      } else {
        if (!navigator.geolocation) {
          setUbicacionError("Tu navegador no permite obtener la ubicación.");
          setLoadingUbicacion(false);
          return;
        }

        const posicion = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 12000,
            maximumAge: 0,
          });
        });

        latitude = posicion.coords.latitude;
        longitude = posicion.coords.longitude;
      }

      setCoordsUsuario({ lat: latitude, lng: longitude });

      const coordenadas = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;

      try {
        const respuesta = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
        const data = await respuesta.json();
        setDireccion(data.display_name || coordenadas);
      } catch {
        setDireccion(coordenadas);
        setUbicacionError(
          "No se pudo convertir la ubicación en dirección, se agregaron las coordenadas."
        );
      }
    } catch (error) {
      console.error("Error de geolocalización:", error);
      setUbicacionError("No se pudo obtener la ubicación. Escríbela manualmente.");
    } finally {
      setLoadingUbicacion(false);
    }
  };

  const generarMensaje = () => {
    let mensaje = "";

    mensaje += "*NUEVA CONSULTA DE COMPRA — RECOJO EN TIENDA* \n";
    mensaje += `Cliente: ${nombre}\n`;
    mensaje += `DNI: ${dni}\n`;
    mensaje += `Recojo en: ${BOTICA.nombre} — ${BOTICA.direccionTexto}\n`;
    mensaje += `Ubicación de la botica: ${BOTICA.mapsUrl}\n`;
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

    setErrores(nuevosErrores);

    if (!valido) return;

    const mensaje = generarMensaje();
    const telefono = "51964328743";
    const urlWhatsapp = `https://wa.me/${telefono}?text=${mensaje}`;
    const urlMaps = construirUrlMapsHaciaBotica(coordsUsuario);

    vaciarCarrito();

    window.open(urlWhatsapp, "_blank");
    window.open(urlMaps, "_blank");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 pb-16 md:pb-24 text-zinc-900">
      <section className="bg-white border-b border-zinc-200 px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="max-w-2xl text-2xl font-bold text-zinc-900 tracking-tight sm:text-3xl">
            Finaliza tu recojo en tienda
          </h1>
          <p className="mt-2 max-w-xl text-sm font-medium text-zinc-500">
            Por el momento todos los pedidos se recogen directamente en la botica.
            Completa tus datos y te enviaremos a WhatsApp y a Google Maps con la
            ruta hacia nuestro local.
          </p>
        </div>
      </section>

      <main className="mx-auto mt-6 mb-12 md:mb-16 grid max-w-6xl grid-cols-1 gap-5 px-4 md:px-6 lg:grid-cols-[1fr_380px]">
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs sm:p-6 md:p-8">
          {/* AVISO DE RECOJO EN TIENDA */}
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Store size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-zinc-800">
                Recojo en {BOTICA.nombre}
              </p>
              <p className="mt-0.5 text-xs font-medium text-zinc-500">
                {BOTICA.direccionTexto}
              </p>
              
              <a
                href={BOTICA.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
              >
                <Navigation size={12} />
                Ver ubicación de la botica
              </a>
            </div>
          </div>

          <div className="border-b border-zinc-100 pb-5">
            <h2 className="text-lg font-bold text-zinc-800 tracking-tight md:text-xl">Datos del cliente</h2>
            <p className="mt-1 text-sm font-medium text-zinc-500">
              Completa la información para preparar el mensaje.
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {/* NOMBRE */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-zinc-700">
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
                className={`h-12 w-full rounded-xl border bg-zinc-50 px-4 text-sm font-medium outline-none transition focus:bg-white focus:ring-2
                ${
                  errores.nombre
                    ? "border-red-400 focus:ring-red-100"
                    : "border-zinc-200 focus:border-primary focus:ring-primary/20"
                }`}
              />

              {errores.nombre && (
                <p className="mt-1.5 text-xs font-semibold text-red-500">{errores.nombre}</p>
              )}
            </div>

            {/* DNI */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-zinc-700">DNI</label>

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
                className={`h-12 w-full rounded-xl border bg-zinc-50 px-4 text-sm font-medium outline-none transition focus:bg-white focus:ring-2
                ${
                  errores.dni
                    ? "border-red-400 focus:ring-red-100"
                    : "border-zinc-200 focus:border-primary focus:ring-primary/20"
                }`}
              />

              {errores.dni && (
                <p className="mt-1.5 text-xs font-semibold text-red-500">{errores.dni}</p>
              )}
            </div>
          </div>

          {/* BOTÓN */}
          <button
            onClick={realizarConsulta}
            className="mt-7 flex h-13 w-full items-center justify-center gap-2.5 rounded-xl bg-emerald-500 py-3.5 text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-600 hover:shadow-md active:scale-[0.98] md:text-base"
          >
            <MessageCircle size={20} />
            Enviar por WhatsApp y ver cómo llegar
          </button>
        </section>

        {/* RESUMEN */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xs">
            <div className="bg-primary p-5 text-white">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                  <ShoppingBag size={22} />
                </div>

                <div>
                  <h2 className="text-lg font-bold tracking-tight">Resumen</h2>
                  <p className="text-xs font-medium text-white/75">
                    {carrito.length} producto(s) seleccionado(s)
                  </p>
                </div>
              </div>
            </div>

            <div className="max-h-[400px] space-y-2.5 overflow-y-auto p-4">
              {carrito.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[64px_1fr] gap-3.5 rounded-xl bg-zinc-50 p-3 border border-zinc-100"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white p-2 border border-zinc-100">
                    <img
                      src={item.imagen || "/placeholder-farma.webp"}
                      alt={item.nombre}
                      className="max-h-full object-contain"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-zinc-800">
                      {item.nombre}
                    </h3>

                    <p className="mt-1.5 text-xs font-medium text-zinc-500">
                      Cantidad: {item.cantidad}
                    </p>

                    <p className="mt-1 text-base font-bold text-primary">
                      S/ {(parsePrecio(item.precio) * item.cantidad).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-100 p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-base font-bold text-zinc-700">Total</span>

                <span className="text-2xl font-bold text-primary sm:text-3xl">
                  S/ {total.toFixed(2)}
                </span>
              </div>

              <div className="mt-4 rounded-xl bg-primary/10 p-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p className="flex items-center gap-2 text-xs font-bold text-primary">
                    <Banknote size={16} />
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