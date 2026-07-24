import QRMiAhorroPharma from "@/components/QRMiAhorroPharma";
import QRApk from "@/components/QRApk";

export default function Page() {
  return (
    <div className="bg-gray-50 min-h-screen pb-24 md:pb-0">
      {/* HERO */}
      <section className="py-12 md:py-16 px-6 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight text-primary">
          Escanea y Accede
        </h1>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Escanea el código QR con tu celular para visitar nuestra web o descargar
          directamente la app.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 md:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          <QRMiAhorroPharma />
          <QRApk />
        </div>
      </div>
    </div>
  );
}