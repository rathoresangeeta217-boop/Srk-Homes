import React from 'react';
import { Instagram, ArrowUpRight, Camera, Sparkles } from 'lucide-react';

export const InstagramBanner: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-stone-200">
      <div className="bg-stone-900 text-stone-100 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-elevation border border-stone-800">
        {/* Background ambient glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gradient-to-tr from-pink-500/10 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-mono">
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>Official Instagram Community</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium leading-tight">
              Follow @homes.srk for daily residence installations & lookbooks.
            </h3>

            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Explore client living room reveals, solid timber joinery in progress at our atelier, and tactile fabric swatch stories directly on our official feed.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href="https://www.instagram.com/homes.srk/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-stone-950 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 hover:from-amber-200 hover:to-amber-100 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 touch-manipulation"
            >
              <Instagram className="w-4 h-4 text-pink-700" />
              <span>Follow @homes.srk</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-950" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
