"use client";

import QRCode from "react-qr-code";

export default function QRApk() {
  return (
    <div>
      <h2 className="text-2xl font-black text-red-600 text-center">
        Escanea para descargar nuestra App
      </h2>

      <div className="relative flex items-center justify-center rounded-2xl bg-white p-4">
        <QRCode
          value="https://miahorropharma.onrender.com/apk"
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
    </div>
  );
}