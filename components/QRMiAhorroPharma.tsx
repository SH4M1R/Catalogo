"use client";

import QRCode from "react-qr-code";

export default function QRMiAhorroPharma() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-6 shadow-xl">
      <h2 className="text-2xl font-black text-red-600 text-center">
        Escanea para ingresar a nuestra Web
      </h2>

      <div className="relative flex items-center justify-center rounded-2xl bg-white p-4">
        <QRCode
          value="https://miahorropharma.onrender.com"
          size={220}
          level="H"
        />
        
        {/* Contenedor del Logo */}
        <div className="absolute flex items-center justify-center">
          <img
            src="/logo.webp"
            alt="Logo"
            className="w-20 h-20 object-contain" 
          />
        </div>
      </div>

      <p className="text-center text-sm font-semibold text-gray-600">
        https://miahorropharma.onrender.com
      </p>
    </div>
  );
}