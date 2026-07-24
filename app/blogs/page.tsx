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
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS2tSaGATHDMJrUsCpLaYJzEXU8rII_0OAGRqpikW1FewAhaj85OW93QJMxCDQ_UQ/pub?gid=2016887320&single=true&output=csv"
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
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/95 group-hover:scale-110 flex items-center justify-center shadow-xl transition-transform">
          {videoId ? (
            <Play className="text-primary ml-0.5" size={22} fill="currentColor" />
          ) : (
            <ExternalLink className="text-primary" size={20} />
          )}
        </div>
      </div>
    </button>
  );
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <article className="flex flex-col sm:flex-row bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden hover:shadow-md transition-shadow duration-300 sm:min-h-[300px]">
      {/* MINIATURA / VIDEO */}
      <div className="relative w-full sm:w-72 md:w-80 aspect-[9/16] sm:aspect-auto shrink-0 bg-zinc-950">
        <TikTokPreview blog={blog} />
      </div>

      {/* CONTENIDO */}
      <div className="flex flex-col justify-center p-6 md:p-8">
        <h2 className="text-lg md:text-2xl font-bold text-zinc-800 mb-2 md:mb-3 tracking-tight leading-tight">
          {blog.titulo}
        </h2>
        <p className="text-zinc-500 text-sm md:text-base leading-relaxed">{blog.descripcion}</p>
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
        <Loader2 className="animate-spin text-primary mb-5" size={48} />
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          Mi Ahorro Pharma
        </h1>
        <p className="text-zinc-400 mt-2 text-sm">Cargando blogs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-16">
      {/* HERO */}
      <section className="py-10 md:py-14 px-6 text-center border-b border-zinc-200 bg-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight text-zinc-900">
          Blogs
        </h1>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Consejos de salud, novedades y contenido en video directo desde nuestro TikTok.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        {blogs.length > 0 ? (
          <div className="flex flex-col gap-5 md:gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-2xl border border-zinc-200">
            <p className="text-zinc-500 text-base font-medium">Todavía no hay blogs publicados.</p>
          </div>
        )}
      </div>
    </div>
  );
}