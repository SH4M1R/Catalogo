"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Target, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    img: "/fondo1.webp",
    eyebrow: "Ofertas de la semana",
    title: "Nos aseguramos de cuidar tu Salud",
    highlight: "y tu Bolsillo",
    cta: "Ver ofertas de hoy",
    href: "/productos",
  },
  {
    img: "/fondo2.webp",
    eyebrow: "Entrega coordinada por WhatsApp",
    title: "Tu farmacia de confianza",
    highlight: "ahora online",
    cta: "Escríbenos ahora",
    href: "/contacto",
  },
  {
    img: "/fondo3.webp",
    eyebrow: "Más de 18 años de experiencia",
    title: "Atención farmacéutica",
    highlight: "ética y transparente",
    cta: "Conócenos",
    href: "/nosotros",
  },
];

const team = [
  {
    name: "Domi Zegarra",
    desc: "Enfermera y Farmacéutica con más de 18 años de experiencia en el rubro.",
    img: "/persona1.webp",
  },
  {
    name: "Juan Pablo Inoñan",
    desc: "Químico Farmacéutico con más de 20 años de experiencia en el rubro.",
    img: "/equipo/persona2.webp",
  },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i: number) => setCurrent(i);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="relative w-full h-[480px] md:h-[640px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image src={slide.img} alt={slide.title} fill className="object-cover" priority={i === 0} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          <div className="relative z-20 h-full flex flex-col items-start justify-center text-white px-6 sm:px-10 md:px-20 max-w-3xl">
            <span
              className={`inline-block text-amber-400 font-semibold tracking-wide text-sm md:text-base mb-4 transition-all duration-700 delay-150 ${
                i === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              {slide.eyebrow}
            </span>
            <h2
              className={`text-3xl sm:text-4xl md:text-6xl font-black mb-6 drop-shadow-2xl leading-tight transition-all duration-700 delay-300 ${
                i === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              {slide.title} <br />
              <span className="text-red-500">{slide.highlight}</span>
            </h2>
            <Link
              href={slide.href}
              className={`bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-8 md:py-4 md:px-10 rounded-full transition-all transform hover:scale-105 shadow-xl ${
                i === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: "450ms", transitionDuration: "700ms" }}
            >
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}

      {/* Flechas */}
      <button
        onClick={prev}
        aria-label="Anterior"
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-2 md:p-3 transition-colors"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={next}
        aria-label="Siguiente"
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-2 md:p-3 transition-colors"
      >
        <ChevronRight size={22} />
      </button>

      {/* Puntos */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a la diapositiva ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-red-500" : "w-2 bg-white/60 hover:bg-white/90"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function TeamCard({ member, index }: { member: (typeof team)[number]; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  // Condicional para alternar la orientación de la card (índices impares invierten foto/texto)
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 sm:min-h-[320px] ${
        isEven ? "sm:flex-row" : "sm:flex-row-reverse"
      } ${
        inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
      }`}
      style={{
        transitionProperty: "opacity, transform, box-shadow",
        transitionDuration: "700ms, 700ms, 300ms",
        transitionTimingFunction: "ease-out",
        transitionDelay: inView ? `${index * 300}ms, ${index * 300}ms, 0ms` : "0ms",
      }}
    >
      {/* FOTO */}
      <div className="relative w-full sm:w-80 md:w-[400px] aspect-[4/3] sm:aspect-auto shrink-0 bg-zinc-100">
        <Image src={member.img} alt={member.name} fill className="object-cover" />
      </div>

      {/* INFO */}
      <div className={`flex flex-col justify-center p-6 md:p-10 flex-1 ${!isEven ? "text-left" : ""}`}>
        <h6 className="text-xl md:text-3xl font-bold text-zinc-900 mb-3 md:mb-4 leading-tight">
          {member.name}
        </h6>
        <p className="text-zinc-500 text-sm md:text-lg leading-relaxed">{member.desc}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      <Hero />

      <div className="max-w-7xl mx-auto px-6">
        {/* BIENVENIDA */}
        <section className="pt-14 md:pt-16 pb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-red-600 mb-4 tracking-tight">
            Bienvenido a Mi Ahorro Pharma
          </h2>
          <p className="text-base md:text-lg text-zinc-600 max-w-3xl mx-auto leading-relaxed">
            Tu farmacia de confianza ahora online. Explora nuestro catálogo web y coordina tu
            entrega por WhatsApp.
          </p>
        </section>

        {/* CATEGORÍAS */}
        <section className="py-6 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: "Cuidado Personal", img: "/cuidado.webp" },
              { title: "Medicamentos", img: "/medicamentos.webp" },
              { title: "Perfumería", img: "/perfumeria.webp" },
              { title: "Regalos", img: "/regalos.webp" },
              { title: "Vitaminas", img: "/vitaminas.webp" },
              { title: "Belleza", img: "/belleza.webp" },
            ].map((cat, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl h-44 sm:h-52 md:h-60 shadow-md border border-zinc-100"
              >
                <Image
                  src={cat.img}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent flex items-end p-4 md:p-6">
                  <span className="text-white font-bold text-base md:text-xl tracking-wide">
                    {cat.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ACERCA DE NOSOTROS */}
        <section className="pt-16 pb-24">
          <div className="bg-zinc-50 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-16 border border-zinc-100">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
                Acerca de nosotros
              </h3>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
                Bienvenidos a <span className="font-bold text-red-600">"Mi Ahorro Pharma"</span>.
                Nuestro equipo farmacéutico cuenta con más de 18 años de experiencia y está
                comprometido a ofrecerte ética y transparencia en cada interacción.
              </p>
            </div>

            {/* VALORES, MISIÓN, VISIÓN */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  icon: <Users size={28} />,
                  title: "Valores",
                  desc: "Nos guiamos por la ética, la empatía y la responsabilidad. Como botica de tu barrio, nos comprometemos con la calidad en cada medicamento, garantizando que el bienestar de tu familia sea siempre nuestra máxima prioridad.",
                },
                {
                  icon: <Target size={28} />,
                  title: "Misión",
                  desc: "Cuidar la salud de nuestra comunidad ofreciendo medicamentos seguros, eficaces y accesibles. Marcamos la diferencia a través de la atención personalizada de un equipo profesional y altamente capacitado, listo para brindarte la orientación y confianza que mereces en cada visita.",
                },
                {
                  icon: <TrendingUp size={28} />,
                  title: "Visión",
                  desc: "Ser la botica local referente en salud y bienestar, reconocida por innovar constantemente en nuestros servicios farmacéuticos y por la calidez de nuestro personal especializado, convirtiéndonos en el aliado de confianza para una vida más saludable.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-zinc-100"
                >
                  <div className="w-14 h-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h6 className="text-lg font-bold mb-2 text-zinc-900">{item.title}</h6>
                  <p className="text-zinc-500 text-sm leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* NUESTRO EQUIPO */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-red-600 mb-2 text-center">
                Nuestro equipo
              </h3>
              <p className="text-zinc-500 text-sm md:text-base text-center mb-10">
                Las personas detrás de cada recomendación.
              </p>
              {/* Se cambió de 'max-w-2xl' a 'max-w-4xl' para expandir el ancho de la lista */}
              <div className="flex flex-col gap-8 max-w-4xl mx-auto">
                {team.map((member, i) => (
                  <TeamCard key={i} member={member} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}