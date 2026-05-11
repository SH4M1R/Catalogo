import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { CarritoProvider } from "@/context/CarritoContext";

export const metadata: Metadata = {
  title: "Mi Ahorro Pharma | Catálogo Online",
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
      <body className="antialiased">
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