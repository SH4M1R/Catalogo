"use client";
import Image from "next/image";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contacto() {
  return (
    <div className="bg-white min-h-screen pb-24 md:pb-0">
      {/* HERO */}
      <section className="py-12 md:py-16 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight text-red-600">
          Contáctanos
        </h1>
        <p className="text-zinc-600 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
          Somos una botica con más de 5 años de atención ubicada en Santa Paula - Puente Piedra para atenderte. Envíanos tus consultas o recomendaciones para nuestra página web.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          {/* FORMULARIO */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50 shadow-lg border border-zinc-100">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-800 mb-6 md:mb-8 flex items-center gap-2">
              <Send className="text-red-600" size={24} /> Envíanos un mensaje
            </h2>

            <form
              action="https://formspree.io/f/mzdovoeo"
              method="POST"
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">
                  Nombres Completos
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Ej. Juan Pablo"
                  className="w-full p-3.5 sm:p-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="964 328 743"
                    className="w-full p-3.5 sm:p-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2">
                    Gmail
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="tu-correo@gmail.com"
                    className="w-full p-3.5 sm:p-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Mensaje</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="¿Qué medicamento o producto buscas?"
                  className="w-full p-3.5 sm:p-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-red-200 transition-all transform active:scale-95 uppercase tracking-wider"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>

          {/* INFO Y FOTO BOTICA */}
          <div className="flex flex-col">
            <div className="bg-zinc-50 p-6 sm:p-8 rounded-3xl border border-zinc-100 mb-6 md:mb-8 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-800 mb-6 md:mb-8">
                Información de Local
              </h2>
              <div className="space-y-5 md:space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white shadow-sm text-red-600 rounded-xl shrink-0">
                    <MapPin size={20} />
                  </div>
                  <p className="text-zinc-600 font-medium text-sm sm:text-base">
                    Distrito de Puente Piedra, Lima
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white shadow-sm text-red-600 rounded-xl shrink-0">
                    <Phone size={20} />
                  </div>
                  <p className="text-zinc-600 font-medium text-sm sm:text-base">
                    964 328 743 / 985 389 609
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[220px] sm:h-[260px] md:h-[300px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl group">
              <Image
                src="/botica.webp"
                alt="Local Mi Ahorro Pharma"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 text-white">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest opacity-80">
                  Nuestra Sede
                </p>
                <h3 className="text-xl sm:text-2xl font-black">Santa Paula</h3>
              </div>
            </div>
          </div>
        </div>

        {/* MAPA */}
        <div className="mt-14 md:mt-20">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 md:mb-8 text-red-600">
            Nuestra Ubicación
          </h2>
          <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-lg h-[300px] sm:h-[380px] md:h-[450px] border-4 md:border-8 border-zinc-50">
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