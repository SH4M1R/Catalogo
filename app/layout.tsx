import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { CarritoProvider } from "@/context/CarritoContext"; // 1. Importamos el proveedor

export const metadata: Metadata = {
  title: "Mi Ahorro Pharma | Catálogo Online",
  description: "Compra por WhatsApp de forma fácil en Puente Piedra",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        {/* 2. Envolvemos todo con el Provider */}
        <CarritoProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CarritoProvider>
      </body>
    </html>
  );
}