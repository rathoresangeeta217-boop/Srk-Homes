import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Lock, Instagram } from 'lucide-react';

interface HeaderProps {
  onOpenConsultation: (initialSubject?: string) => void;
  onSelectRoom: (room: 'living' | 'dining' | 'bedroom') => void;
  onOpenDashboard: () => void;
  inquiryCount: number;
  isAdminAuthenticated?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenConsultation,
  onSelectRoom,
  onOpenDashboard,
  inquiryCount,
  isAdminAuthenticated = false
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (room: 'living' | 'dining' | 'bedroom', targetId?: string) => {
    onSelectRoom(room);
    setMobileMenuOpen(false);
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 lg:px-12 py-2 sm:py-3">
        {/* Zone 1: Brand Logo Element */}
        <a 
          href="#" 
          className="flex items-center shrink-0 hover:opacity-95 transition-opacity py-1"
          aria-label="SRK Homes - Return to top"
        >
          <img
            src="/assets/aistudio/Golden_SRK_Homes_Logo_0601aba7.png"
            alt="SRK Homes - Modular Homes | Interiors | Custom Spaces"
            className="h-14 sm:h-16 lg:h-20 w-auto max-w-[260px] sm:max-w-[320px] lg:max-w-[380px] object-contain drop-shadow-sm"
          />
        </a>

        {/* Zone 2: 4-5 single-line clean text links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button 
            type="button"
            onClick={() => handleNavClick('living', 'hero-stage')} 
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-stone-900 hover:after:w-full after:transition-all cursor-pointer"
          >
            Living
          </button>
          <button 
            type="button"
            onClick={() => handleNavClick('dining', 'hero-stage')} 
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-stone-900 hover:after:w-full after:transition-all cursor-pointer"
          >
            Dining
          </button>
          <button 
            type="button"
            onClick={() => handleNavClick('bedroom', 'hero-stage')} 
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-stone-900 hover:after:w-full after:transition-all cursor-pointer"
          >
            Bedroom
          </button>
          <a 
            href="#craftsmanship" 
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-stone-900 hover:after:w-full after:transition-all"
          >
            Craftsmanship
          </a>
          <a 
            href="#planner" 
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-stone-900 hover:after:w-full after:transition-all"
          >
            Room Planner
          </a>
        </nav>

        {/* Zone 3: 1 primary action + Instagram & Admin Affordances */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Instagram Handle Link */}
          <a
            href="https://www.instagram.com/homes.srk/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-200/60 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            title="Follow SRK Homes on Instagram @homes.srk"
            aria-label="SRK Homes Instagram @homes.srk"
          >
            <Instagram className="w-4 h-4 text-stone-700 hover:text-pink-600 transition-colors" />
            <span className="hidden xl:inline text-xs font-medium text-stone-700">@homes.srk</span>
          </a>

          {/* Admin Login Button */}
          <button
            type="button"
            onClick={onOpenDashboard}
            className="flex items-center gap-2 px-3 sm:px-3.5 py-2 text-xs font-medium text-stone-800 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 border border-stone-200/80 rounded-lg transition-colors cursor-pointer shadow-sm"
            title="Administrator Login for Submitted Inquiries"
          >
            <Lock className="w-3.5 h-3.5 text-stone-600" />
            <span>Admin Login</span>
            {inquiryCount > 0 && (
              <span className="bg-amber-400 text-stone-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full tabular-nums">
                {inquiryCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onOpenConsultation('General Design Inquiry')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs tracking-wider uppercase font-medium text-stone-50 bg-stone-900 hover:bg-stone-800 transition-colors rounded-none whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
          >
            <span>Book Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-950 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAF8F5] px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3 text-base font-serif">
            <button
              type="button"
              onClick={() => handleNavClick('living', 'hero-stage')}
              className="text-left py-2 text-stone-800 border-b border-stone-200/60"
            >
              Living Room Suites
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('dining', 'hero-stage')}
              className="text-left py-2 text-stone-800 border-b border-stone-200/60"
            >
              Solid Oak Dining
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('bedroom', 'hero-stage')}
              className="text-left py-2 text-stone-800 border-b border-stone-200/60"
            >
              Master Bedroom Sanctuaries
            </button>
            <a
              href="#craftsmanship"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-stone-800 border-b border-stone-200/60"
            >
              Material Craftsmanship
            </a>
            <a
              href="#planner"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-stone-800 border-b border-stone-200/60"
            >
              Interactive Room Planner
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDashboard();
              }}
              className="text-left py-2 text-stone-900 font-medium flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-stone-600" />
                <span>Admin Login</span>
              </span>
              {inquiryCount > 0 && (
                <span className="bg-amber-400 text-stone-950 text-xs font-bold px-2 py-0.5 rounded-full">
                  {inquiryCount}
                </span>
              )}
            </button>

            <a
              href="https://www.instagram.com/homes.srk/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 text-stone-800 font-medium flex items-center gap-2 text-sm hover:text-pink-600 transition-colors"
            >
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>Follow @homes.srk on Instagram</span>
            </a>
          </div>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConsultation();
            }}
            className="w-full mt-4 py-3 text-xs tracking-wider uppercase font-medium text-stone-50 bg-stone-900 hover:bg-stone-800 text-center cursor-pointer"
          >
            Book Consultation
          </button>
        </div>
      )}
    </header>
  );
};
