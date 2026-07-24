"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Target, TrendingUp, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

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
    name: "Dra. Domi",
    desc: "Enfermera y Técnica en Farmacia con más de 18 años de trayectoria en el sector salud. Especialista en atención al paciente, gestión farmacéutica y asistencia, comprometida en brindar un servicio humano, seguro y de alta calidad para el bienestar de la comunidad.",
    img: "/persona1.webp",
  },
  {
    name: "Dr. Juan",
    desc: "Químico Farmacéutico con más de 20 años de experiencia, actualmente liderando la gestión integral de la botica. Experto en aseguramiento de la calidad y regulación sanitaria, enfocado en garantizar el acceso seguro, ético y confiable a medicamentos.",
    img: "/persona2.webp",
  },
];

const categories = [
  { title: "Cuidado Personal", img: "/cuidado.webp" },
  { title: "Suplementos", img: "/medicamentos.webp" },
  { title: "Perfumería", img: "/perfumeria.webp" },
  { title: "Regalos", img: "/regalos.webp" },
  { title: "Vitaminas", img: "/vitaminas.webp" },
  { title: "Belleza", img: "/belleza.webp" },
];

const values = [
  {
    icon: <Users size={24} />,
    title: "Valores",
    desc: "Nos guiamos por la ética, la empatía y la responsabilidad. Como botica de tu barrio, nos comprometemos con la calidad en cada medicamento, garantizando que el bienestar de tu familia sea siempre nuestra máxima prioridad.",
  },
  {
    icon: <Target size={24} />,
    title: "Misión",
    desc: "Cuidar la salud de nuestra comunidad ofreciendo medicamentos seguros, eficaces y accesibles. Marcamos la diferencia a través de la atención personalizada de un equipo profesional y altamente capacitado, listo para brindarte la orientación y confianza que mereces en cada visita.",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Visión",
    desc: "Ser la botica local referente en salud y bienestar, reconocida por innovar constantemente en nuestros servicios farmacéuticos y por la calidez de nuestro personal especializado, convirtiéndonos en el aliado de confianza para una vida más saludable.",
  },
];

/**
 * Hook genérico: detecta cuándo un elemento entra en el viewport.
 */
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

function Reveal({
  children,
  delay = 0,
  from = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  from?: "up" | "left" | "right";
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const hiddenTransform =
    from === "left" ? "-translate-x-10" : from === "right" ? "translate-x-10" : "translate-y-6";

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${hiddenTransform}`
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
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
    <section className="relative w-full px-4 md:px-6 pt-4 md:pt-6">
      <div className="max-w-7xl mx-auto relative h-[420px] md:h-[560px] rounded-3xl overflow-hidden shadow-xs border border-zinc-200">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image src={slide.img} alt={slide.title} fill className="object-cover" priority={i === 0} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

            <div className="relative z-20 h-full flex flex-col items-start justify-center text-white px-6 sm:px-10 md:px-14 max-w-2xl">
              <span
                className={`inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full text-white font-semibold tracking-wide text-xs md:text-sm mb-4 transition-all duration-700 delay-150 ${
                  i === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
              >
                {slide.eyebrow}
              </span>
              <h2
                className={`text-2xl sm:text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight transition-all duration-700 delay-300 ${
                  i === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
              >
                {slide.title} <br />
                <span className="text-white/90">{slide.highlight}</span>
              </h2>
              <Link
                href={slide.href}
                className={`inline-flex items-center gap-2 bg-white hover:bg-zinc-100 text-primary font-semibold py-3 px-6 rounded-xl transition-all shadow-md ${
                  i === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
                style={{ transitionDelay: "450ms", transitionDuration: "700ms" }}
              >
                {slide.cta}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}

        {/* Flechas */}
        <button
          onClick={prev}
          aria-label="Anterior"
          className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-30 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white rounded-full p-2 md:p-2.5 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={next}
          aria-label="Siguiente"
          className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-30 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white rounded-full p-2 md:p-2.5 transition-colors"
        >
          <ChevronRight size={20} />
        </button>

        {/* Puntos */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir a la diapositiva ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-7 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member, index }: { member: (typeof team)[number]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <Reveal from={isEven ? "left" : "right"} delay={index * 150}>
      <div
        className={`flex flex-col bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden hover:shadow-md transition-shadow duration-300 sm:min-h-[300px] ${
          isEven ? "sm:flex-row" : "sm:flex-row-reverse"
        }`}
      >
        {/* FOTO: aspect ratio fijo (3/4) en todas las pantallas + object-top para no cortar cabezas */}
        <div className="relative w-full sm:w-64 md:w-72 aspect-[3/4] shrink-0 bg-zinc-100">
          <Image
            src={member.img}
            alt={member.name}
            fill
            className="object-cover object-top"
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col justify-center p-6 md:p-8 flex-1">
          <h6 className="text-lg md:text-2xl font-bold text-zinc-900 mb-2 md:mb-3 tracking-tight leading-tight">
            {member.name}
          </h6>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed">{member.desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-gray-50">
      <Hero />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* BIENVENIDA */}
        <Reveal>
          <section className="pt-14 md:pt-16 pb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3 tracking-tight">
              Bienvenido a Mi Ahorro Pharma
            </h2>
            <p className="text-sm md:text-base text-zinc-500 max-w-2xl mx-auto leading-relaxed">
              Tu farmacia de confianza ahora online. Explora nuestro catálogo web y coordina tu
              entrega por WhatsApp.
            </p>
          </section>
        </Reveal>

        {/* CATEGORÍAS */}
        <section className="py-6 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
            {categories.map((cat, index) => (
              <Reveal key={cat.title} delay={index * 100}>
                <div className="group relative overflow-hidden rounded-2xl aspect-square shadow-xs border border-zinc-200 hover:shadow-md transition-shadow">
                  <Image
                    src={cat.img}
                    alt={cat.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex items-end p-4 md:p-5">
                    <span className="text-white font-semibold text-sm md:text-base tracking-tight">
                      {cat.title}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ACERCA DE NOSOTROS */}
        <section className="pt-14 pb-20">
          <div className="bg-white rounded-2xl p-6 sm:p-10 md:p-14 border border-zinc-200 shadow-xs">
            <Reveal>
              <div className="text-center mb-10">
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 tracking-tight">
                  Acerca de nosotros
                </h3>
                <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
                  Bienvenidos a <span className="font-semibold text-zinc-700">"Mi Ahorro Pharma"</span>.
                  Nuestro equipo farmacéutico cuenta con más de 18 años de experiencia y está
                  comprometido a ofrecerte ética y transparencia en cada interacción.
                </p>
              </div>
            </Reveal>

            {/* VALORES, MISIÓN, VISIÓN */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
              {values.map((item, i) => (
                <Reveal key={item.title} delay={i * 150}>
                  <div className="flex flex-col items-center text-center p-6 bg-zinc-50 rounded-2xl border border-zinc-200 h-full">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h6 className="text-base font-bold mb-2 text-zinc-900">{item.title}</h6>
                    <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* NUESTRO EQUIPO */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-1 text-center tracking-tight">
                Nuestro equipo
              </h3>
              <p className="text-zinc-500 text-sm text-center mb-8">
                Las personas detrás de cada atención y recomendación.
              </p>
              <div className="flex flex-col gap-6 max-w-4xl mx-auto">
                {team.map((member, i) => (
                  <TeamCard key={member.name} member={member} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}