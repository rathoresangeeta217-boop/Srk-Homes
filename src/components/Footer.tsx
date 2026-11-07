import React from 'react';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
  onSelectRoom: (room: 'living' | 'dining' | 'bedroom') => void;
  onOpenDashboard?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation, onSelectRoom, onOpenDashboard }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 px-6 lg:px-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-2xl font-serif text-white font-medium tracking-tight block">
              SRK HOMES
            </span>
            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-sm">
              Architectural home furniture and modular joinery crafted with solid timbers, tactile natural fabrics, and bespoke tolerances for residential interiors.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-500" />
                <a href="mailto:marketing.srkmodular@gmail.com" className="hover:text-white transition-colors">
                  marketing.srkmodular@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                <span>Atelier & Flagship Showroom · Appointments Only</span>
              </div>
            </div>
          </div>

          {/* Quick Collections Navigation */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-widest text-stone-400 font-mono">
              Furniture Collections
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectRoom('living')}
                  className="hover:text-white transition-colors text-stone-400 cursor-pointer"
                >
                  The Alva Modular Sectionals
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectRoom('dining')}
                  className="hover:text-white transition-colors text-stone-400 cursor-pointer"
                >
                  The Kyoto Solid Oak Dining Tables
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectRoom('bedroom')}
                  className="hover:text-white transition-colors text-stone-400 cursor-pointer"
                >
                  The Sylvan Master Bedroom Suites
                </button>
              </li>
              <li>
                <a href="#showcase" className="hover:text-white transition-colors text-stone-400">
                  Stone & Travertine Monoliths
                </a>
              </li>
            </ul>
          </div>

          {/* Bespoke Services */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs uppercase tracking-widest text-stone-400 font-mono">
              Bespoke Interior Atelier
            </div>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              We collaborate with private homeowners, interior architects, and design studios to manufacture custom furniture scales for bespoke residences.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-1.5 text-xs text-amber-200 hover:text-white transition-colors cursor-pointer"
              >
                <span>Request Material Sample Box</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {onOpenDashboard && (
                <button
                  type="button"
                  onClick={onOpenDashboard}
                  className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 transition-colors cursor-pointer border-l sm:border-l sm:border-stone-800 sm:pl-3"
                >
                  <span>Atelier Inquiries Desk</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Quiet Copyright (§1.B) */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} SRK Homes. All rights reserved. Handcrafted home furniture.
          </div>
          <div className="flex items-center gap-6">
            <span>FSC® Certified Solid Hardwoods</span>
            <span aria-hidden="true">·</span>
            <span>10-Year Structural Guarantee</span>
            <span aria-hidden="true">·</span>
            <span>Worldwide Architectural Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
