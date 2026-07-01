"use client";

import { useState, useEffect, useMemo } from "react";
import Papa from "papaparse";
import { Loader2, Play, ExternalLink } from "lucide-react";

interface Blog {
  id: string;
  titulo: string;
  descripcion: string;
  tiktok: string;
  imagen: string;
}

const SHEET_URL_BLOGS =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxu2PFEjWEu28sy32MYlzQMu7nyyB_x2dVBmgv5mLy5A7cdAq2hqPkxYDyMsu5r5-GVAhZNtB5GtrU/pub?gid=1105937198&single=true&output=csv";

function extraerTikTokId(url: string | undefined): string | null {
  if (!url) return null;
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : null;
}

function TikTokPreview({ blog }: { blog: Blog }) {
  const videoId = useMemo(() => extraerTikTokId(blog.tiktok), [blog.tiktok]);
  const [reproduciendo, setReproduciendo] = useState(false);

  if (reproduciendo && videoId) {
    return (
      <iframe
        src={`https://www.tiktok.com/embed/v2/${videoId}`}
        title={blog.titulo}
        className="h-full w-full"
        style={{ border: 0 }}
        allow="encrypted-media;"
        allowFullScreen
      />
    );
  }

  return (
    <button
      onClick={() =>
        videoId ? setReproduciendo(true) : window.open(blog.tiktok, "_blank")
      }
      className="group relative h-full w-full block"
      aria-label={videoId ? `Reproducir video: ${blog.titulo}` : `Ver en TikTok: ${blog.titulo}`}
    >
      {blog.imagen ? (
        <img src={blog.imagen} alt={blog.titulo} className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full bg-zinc-900" />
      )}
      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors flex items-center justify-center">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 group-hover:scale-110 flex items-center justify-center shadow-xl transition-transform">
          {videoId ? (
            <Play className="text-red-600 ml-1" size={26} fill="currentColor" />
          ) : (
            <ExternalLink className="text-red-600" size={24} />
          )}
        </div>
      </div>
    </button>
  );
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <article className="flex flex-col sm:flex-row bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 sm:min-h-[350px]">
      {/* MINIATURA / VIDEO */}
      <div className="relative w-full sm:w-80 md:w-96 aspect-[9/16] sm:aspect-auto shrink-0 bg-zinc-950">
        <TikTokPreview blog={blog} />
      </div>

      {/* CONTENIDO */}
      <div className="flex flex-col justify-center p-6 md:p-10">
        <h2 className="text-xl md:text-3xl font-bold text-zinc-800 mb-3 md:mb-4 leading-tight">
          {blog.titulo}
        </h2>
        <p className="text-zinc-500 text-sm md:text-lg leading-relaxed">{blog.descripcion}</p>
      </div>
    </article>
  );
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarBlogs = async () => {
      try {
        const response = await fetch(SHEET_URL_BLOGS);
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data = results.data as Blog[];
            const validos = data.filter((b) => b.id && b.titulo);
            setBlogs(validos);
            setLoading(false);
          },
        });
      } catch (e) {
        console.error("Error cargando blogs:", e);
        setLoading(false);
      }
    };
    cargarBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-red-600 mb-5" size={54} />
        <h1 className="text-3xl font-black italic uppercase tracking-tight text-red-600">
          Mi Ahorro Pharma
        </h1>
        <p className="text-zinc-400 mt-2 font-medium">Cargando blogs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-16 font-sans">
      {/* HERO */}
      <section className="py-14 md:py-16 px-6 text-center border-b border-zinc-100 bg-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight text-red-600">
          Blogs
        </h1>
        <p className="text-zinc-600 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
          Consejos de salud, novedades y contenido en video directo desde nuestro TikTok.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        {blogs.length > 0 ? (
          <div className="flex flex-col gap-6 md:gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-zinc-500 text-lg font-medium">Todavía no hay blogs publicados.</p>
          </div>
        )}
      </div>
    </div>
  );
}