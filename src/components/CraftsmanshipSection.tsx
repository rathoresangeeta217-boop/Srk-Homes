import React from 'react';
import { CRAFTSMANSHIP_PILLARS } from '../data/furnitureData';
import { ArrowUpRight } from 'lucide-react';

interface CraftsmanshipSectionProps {
  onOpenConsultation: () => void;
}

export const CraftsmanshipSection: React.FC<CraftsmanshipSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="craftsmanship" className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-stone-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Manifesto & Narrative */}
        <div className="lg:col-span-5 space-y-6">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-medium">
            Material & Structural Mastery
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 font-normal leading-tight">
            Furniture built to endure generations, not seasons.
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
            At SRK Homes, we resist the transient disposable furniture cycle. Every timber joint is mortised, tenoned, and cured by master woodworkers. Every textile is selected for tactile richness, tensile strength, and organic resilience.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-stone-900 pb-1 border-b border-stone-900 hover:text-stone-600 hover:border-stone-400 transition-colors cursor-pointer"
            >
              <span>Schedule Atelier Visit or Wood Sample Box</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: 4 Editorial Numbered Pillars (§1.B Editorial Numbering) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {CRAFTSMANSHIP_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="bg-white p-6 rounded-xl border border-stone-200/80 space-y-3"
            >
              <div className="font-mono text-xs text-amber-900 font-medium tracking-wider">
                {pillar.number}.
              </div>
              <h3 className="font-serif text-lg text-stone-900 font-medium">
                {pillar.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
