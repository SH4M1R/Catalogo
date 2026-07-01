"use client";
import { Download, Smartphone, ShieldCheck, Info } from "lucide-react";

export default function DescargaApk() {
  return (
    <div className="bg-white min-h-screen pb-24 md:pb-0">
      {/* HERO */}
      <section className="py-12 md:py-16 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight text-red-600">
          Descarga Nuestra App
        </h1>
        <p className="text-zinc-600 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
          Instala la aplicación en tu celular Android y accede más rápido a nuestros productos y promociones.
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5">
        {/* CARD DE DESCARGA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-50 shadow-lg border border-zinc-100 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-200">
            <Smartphone className="text-white" size={36} />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-zinc-800 mb-2">
            App Mi Ahorro Pharma
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base mb-8">
            Versión Android · Archivo .apk
          </p>

          <a
            href="/MiAhorroPharma.apk"
            download="MiAhorroPharma.apk"
            className="w-full inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-red-200 transition-all transform active:scale-95 uppercase tracking-wider"
          >
            <Download size={22} />
            Descargar APK
          </a>
        </div>

        {/* INSTRUCCIONES */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-zinc-50 border border-zinc-100 shadow-lg">
          <h3 className="text-lg font-bold text-zinc-800 mb-5 flex items-center gap-2">
            <Info className="text-red-600" size={20} /> Cómo instalar
          </h3>
          <ol className="space-y-4 text-sm sm:text-base text-zinc-600 font-medium list-decimal list-inside">
            <li>Toca el botón "Descargar APK" desde tu celular.</li>
            <li>
              Si tu Android bloquea la instalación, ve a{" "}
              <span className="font-bold text-zinc-800">
                Ajustes → Seguridad
              </span>{" "}
              y activa "Instalar apps de orígenes desconocidos".
            </li>
            <li>Abre el archivo descargado y sigue los pasos para instalar.</li>
          </ol>
        </div>

        {/* NOTA DE SEGURIDAD */}
        <div className="mt-6 flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-100">
          <ShieldCheck className="text-red-600 shrink-0 mt-0.5" size={20} />
          <p className="text-xs sm:text-sm text-red-700 font-medium leading-relaxed">
            Esta app no está en Google Play, por eso Android muestra una advertencia al instalar.
            Es normal y seguro: el archivo proviene directamente de nuestro sitio oficial.
          </p>
        </div>
      </div>
    </div>
  );
}