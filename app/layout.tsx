import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import FloatingButtons from "../components/FloatingWhatsapp";
import { CarritoProvider } from "@/context/CarritoContext";

export const metadata: Metadata = {
  title: "Mi Ahorro Pharma",
  description: "Compra por WhatsApp de forma fácil en Puente Piedra",
  icons: {
    icon: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased flex flex-col min-h-screen bg-slate-50 text-slate-900">
        <CarritoProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingButtons /> 
        </CarritoProvider>
      </body>
    </html>
  );
}