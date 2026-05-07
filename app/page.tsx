"use client";
import Image from "next/image";
import Link from "next/link";
import { Users, Target, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* SECCIÓN HERO - Ajustada para mayor impacto inicial */}
      <section className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
        <Image
          src="/fondo.webp"
          alt="Promoción Principal"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col items-start justify-center text-white px-8 md:px-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 drop-shadow-2xl leading-tight">
            Cuidamos tu Salud <br /> 
            <span className="text-red-500">y tu Bolsillo</span>
          </h2>
          <Link 
            href="/productos"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-xl"
          >
            VER OFERTAS DE HOY
          </Link>
        </div>
      </section>

      {/* CONTENEDOR UNIFICADO - Reducimos py (padding vertical) para acercar las secciones */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* BIENVENIDA - Padding reducido para conectar con categorías */}
        <section className="pt-16 pb-10 text-center">
          <h2 className="text-4xl font-extrabold text-red-600 mb-4 tracking-tight">
            Bienvenido a Mi Ahorro Pharma
          </h2>
          <p className="text-lg text-zinc-600 max-w-3xl mx-auto leading-relaxed">
            Tu farmacia de confianza ahora online. Explora nuestro catálogo y coordina tu entrega por WhatsApp.
          </p>
        </section>

        {/* CATEGORÍAS - Espaciado gap reducido y tarjetas más estilizadas */}
        <section className="py-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Cuidado Personal", img: "/cuidado.webp" },
              { title: "Medicamentos", img: "/medicamentos.webp" },
              { title: "Perfumería", img: "/perfumeria.webp" }
            ].map((cat, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl h-60 shadow-md border border-zinc-100">
                <Image 
                  src={cat.img} 
                  alt={cat.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-6">
                  <span className="text-white font-bold text-xl tracking-wide">{cat.title}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ACERCA DE NOSOTROS - Integrado al fondo blanco con un borde sutil */}
        <section className="pt-16 pb-24">
          <div className="bg-zinc-50 rounded-[3rem] p-8 md:p-16 border border-zinc-100">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-red-600 mb-4">Acerca de nosotros</h3>
              <p className="text-zinc-600 text-lg leading-relaxed max-w-4xl mx-auto">
                Bienvenidos a <span className="font-bold text-red-600">"Mi Ahorro Pharma"</span>. 
                Nuestro equipo farmacéutico está comprometido a ofrecerte ética y transparencia en cada interacción.
              </p>
            </div>

            {/* VALORES, MISIÓN, VISIÓN - Gap reducido y diseño más compacto */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <Users size={28} />, title: "Valores", desc: "Priorizamos la ética y la calidad asegurando atención responsable para el bienestar común." },
                { icon: <Target size={28} />, title: "Misión", desc: "Proporcionar medicamentos seguros y efectivos siendo tu modelo de confianza en salud." },
                { icon: <TrendingUp size={28} />, title: "Visión", desc: "Ser reconocidos por la innovación y personalización en servicios farmacéuticos." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-zinc-100">
                  <div className="w-14 h-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h6 className="text-lg font-bold mb-2 text-zinc-900">{item.title}</h6>
                  <p className="text-zinc-500 text-sm leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}