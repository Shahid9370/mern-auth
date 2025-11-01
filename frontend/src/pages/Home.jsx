import { useEffect, useState } from "react";

export default function Home() {
  // local state to trigger entrance animation
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40); // tiny delay for animation
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-sky-50 flex items-center justify-center p-6">
      <main
        className={
          "max-w-3xl w-full bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 " +
          "transform transition-all duration-700 ease-out " +
          (mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")
        }
        aria-live="polite"
      >
        <div className="px-8 py-12 sm:py-16 flex flex-col sm:flex-row items-center gap-8">
          {/* Animated graphic */}
          <div
            className="flex-none rounded-xl p-4 bg-gradient-to-br from-white to-sky-100/60 shadow-md
                       hover:scale-105 transition-transform duration-500 ease-out"
            aria-hidden="true"
          >
            {/* Simple house SVG with subtle floating + hover rotation */}
            <svg
              viewBox="0 0 64 64"
              width="120"
              height="120"
              className="block mx-auto animate-[float_4s_ease-in-out_infinite] hover:animate-[none] hover:rotate-6 transition-all"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="House icon"
            >
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              <g transform="translate(8,8)" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M24 0 L48 18 V46 H0 V18 Z" fill="url(#g1)" stroke="#0369a1" strokeWidth="1.5" />
                <rect x="8" y="22" width="12" height="12" rx="1.8" fill="#ffffffcc" stroke="#0369a1" strokeWidth="1.2"/>
                <path d="M34 18 V28" stroke="#ffffffaa" strokeWidth="1.5" strokeLinecap="round"/>
              </g>
            </svg>
          </div>

          {/* Content */}
          <section className="flex-1 text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight">
              Welcome Home <span className="inline-block ml-2 transform animate-bounce">🏠</span>
            </h2>

            <p className="mt-3 text-slate-600 text-base sm:text-lg max-w-xl">
              This is the frontend setup of our MERN Authentication project. Built with Tailwind CSS for
              rapid UI development and smooth, accessible animations.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 justify-center sm:justify-start">
              <a
                href="#get-started"
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-md bg-sky-600 text-white font-medium shadow hover:bg-sky-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 transition"
              >
                Get started
                <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="#docs"
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-md bg-white border border-slate-200 text-slate-700 font-medium shadow-sm hover:shadow-md transition"
              >
                Docs
              </a>
            </div>

            <div className="mt-6 text-sm text-slate-500">
              Tip: Hover the card and icon to see subtle motion. All animations respect prefers-reduced-motion.
            </div>
          </section>
        </div>
      </main>

      {/* Inline styles for keyframes (Tailwind JIT supports arbitrary animation names;
          these @keyframes will work when included in a global CSS file or a style tag in the app's root.
          If you prefer, move them to your global CSS (e.g., globals.css) */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        /* Respect users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-[float_4s_ease-in-out_infinite] {
            animation: none !important;
          }
          .animate-bounce {
            animation: none !important;
          }
          .transition-all {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}