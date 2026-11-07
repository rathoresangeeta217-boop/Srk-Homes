import React from 'react';
import { Compass, Sparkles, Ruler, Lock, CalendarCheck, Home } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenConsultation: () => void;
  onOpenAdmin: () => void;
  inquiryCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenConsultation,
  onOpenAdmin,
  inquiryCount
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      aria-label="Mobile Navigation Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-stone-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 pb-[env(safe-area-inset-bottom,8px)] pt-1.5"
    >
      <div className="grid grid-cols-5 items-center justify-around text-center max-w-md mx-auto">
        {/* Explore Rooms */}
        <button
          type="button"
          onClick={() => scrollTo('hero-stage')}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 text-stone-600 hover:text-stone-900 active:scale-95 transition-transform cursor-pointer"
        >
          <Home className="w-5 h-5 text-stone-700" />
          <span className="text-[10px] font-medium tracking-tight mt-1">Suites</span>
        </button>

        {/* Showcase Pieces */}
        <button
          type="button"
          onClick={() => scrollTo('showcase')}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 text-stone-600 hover:text-stone-900 active:scale-95 transition-transform cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-stone-700" />
          <span className="text-[10px] font-medium tracking-tight mt-1">Pieces</span>
        </button>

        {/* Room Dimension Planner */}
        <button
          type="button"
          onClick={() => scrollTo('planner')}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 text-stone-600 hover:text-stone-900 active:scale-95 transition-transform cursor-pointer"
        >
          <Ruler className="w-5 h-5 text-stone-700" />
          <span className="text-[10px] font-medium tracking-tight mt-1">Planner</span>
        </button>

        {/* Admin Login / Leads */}
        <button
          type="button"
          onClick={onOpenAdmin}
          className="relative flex flex-col items-center justify-center min-h-[48px] py-1 text-stone-600 hover:text-stone-900 active:scale-95 transition-transform cursor-pointer"
        >
          <div className="relative">
            <Lock className="w-5 h-5 text-stone-700" />
            {inquiryCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-amber-400 text-stone-950 text-[9px] font-bold px-1 rounded-full tabular-nums">
                {inquiryCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-1">Admin</span>
        </button>

        {/* Primary Consult Action */}
        <button
          type="button"
          onClick={onOpenConsultation}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 text-stone-900 active:scale-95 transition-transform cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center shadow-sm">
            <CalendarCheck className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold text-stone-900 tracking-tight mt-0.5">Consult</span>
        </button>
      </div>
    </nav>
  );
};
