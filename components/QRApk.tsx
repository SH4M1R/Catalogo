"use client";
import QRCode from "react-qr-code";

export default function QRApk() {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs p-6 md:p-8 flex flex-col items-center gap-5">
      <h2 className="text-lg md:text-xl font-bold text-primary text-center tracking-tight">
        Escanea para descargar nuestra App
      </h2>

      <div className="relative flex items-center justify-center rounded-xl bg-white p-4 border border-zinc-100">
        <QRCode value="https://miahorropharma.onrender.com/apk" size={220} level="H" />

        <div className="absolute flex items-center justify-center bg-white rounded-full p-1.5">
          <img src="/logo.webp" alt="Logo" className="w-16 h-16 object-contain" />
        </div>
      </div>
    </div>
  );
}