import QRMiAhorroPharma from "@/components/QRMiAhorroPharma";
import QRApk from "@/components/QRApk";

export default function Page() {
  return (
    <div className="bg-white min-h-screen pb-24 md:pb-0">
      {/* HERO */}
      <section className="py-12 md:py-16 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight text-red-600">
          Escanea y Accede
        </h1>
        <p className="text-zinc-600 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
          Escanea el código QR con tu celular para visitar nuestra web o descargar directamente la app.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* QR WEB */}
          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-50 shadow-lg border border-zinc-100 flex flex-col items-center text-center">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-800 mb-6">
              Visita Nuestra Web
            </h2>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-100">
              <QRMiAhorroPharma />
            </div>
            <p className="text-zinc-500 text-sm mt-6 font-medium">
              Escanea para explorar productos y promociones
            </p>
          </div>

          {/* QR APK */}
          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-50 shadow-lg border border-zinc-100 flex flex-col items-center text-center">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-800 mb-6">
              Descarga la App
            </h2>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-100">
              <QRApk />
            </div>
            <p className="text-zinc-500 text-sm mt-6 font-medium">
              Escanea para descargar el APK en tu Android
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}