"use client";
import Image from "next/image";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contacto() {
  return (
    <div className="bg-gray-50 min-h-screen pb-24 md:pb-16">
      {/* HERO */}
      <section className="bg-white border-b border-zinc-200 py-10 md:py-14 px-6 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight text-zinc-900">
          Contáctanos
        </h1>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Somos una botica con más de 5 años de atención ubicada en Santa Paula - Puente Piedra para atenderte. Envíanos tus consultas o recomendaciones para nuestra página web.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* FORMULARIO */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 shadow-xs">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-800 mb-6 flex items-center gap-2 tracking-tight">
              <span className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Send size={18} />
              </span>
              Envíanos un mensaje
            </h2>

            <form
              action="https://formspree.io/f/mzdovoeo"
              method="POST"
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">
                  Nombres Completos
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Ej. Juan Pablo"
                  className="w-full p-3 sm:p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-1.5">
                    Teléfono
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="964 328 743"
                    className="w-full p-3 sm:p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-1.5">
                    Gmail
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="tu-correo@gmail.com"
                    className="w-full p-3 sm:p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Mensaje</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="¿Qué medicamento o producto buscas?"
                  className="w-full p-3 sm:p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-xl shadow-xs hover:shadow-md transition-all transform active:scale-[0.98]"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>

          {/* INFO Y FOTO BOTICA */}
          <div className="flex flex-col">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-xs mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-zinc-800 mb-5 tracking-tight">
                Información de Local
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
                    <MapPin size={18} />
                  </div>
                  <p className="text-zinc-600 font-medium text-sm sm:text-base">
                    Distrito de Puente Piedra, Lima
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
                    <Phone size={18} />
                  </div>
                  <p className="text-zinc-600 font-medium text-sm sm:text-base">
                    964 328 743 / 985 389 609
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[200px] sm:h-[240px] md:h-[280px] rounded-2xl overflow-hidden shadow-xs border border-zinc-200 group">
              <Image
                src="/botica.webp"
                alt="Local Mi Ahorro Pharma"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
                  Nuestra Sede
                </p>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">Santa Paula</h3>
              </div>
            </div>
          </div>
        </div>

        {/* MAPA */}
        <div className="mt-10 md:mt-14">
          <h2 className="text-lg sm:text-xl font-bold text-center mb-5 text-zinc-800 tracking-tight">
            Nuestra Ubicación
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-xs h-[280px] sm:h-[340px] md:h-[400px] border border-zinc-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.04544895890922!2d-77.06307197844333!3d-11.854360266053641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105d6d0db52e1b3%3A0x8467c59feedd66d7!2sCalle%20Las%20Acacias%20Mz.A6%20-%20Lt.45%2C%20Carabayllo%2015121!5e0!3m2!1ses-419!2spe!4v1778139388578!5m2!1ses-419!2spe"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}