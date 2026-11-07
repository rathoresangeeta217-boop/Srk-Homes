import React, { useEffect } from 'react';
import { X, Check, Ruler, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { FurnitureProduct, Hotspot } from '../types';

interface ProductModalProps {
  item: FurnitureProduct | Hotspot | null;
  onClose: () => void;
  onInquire: (itemName: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ item, onClose, onInquire }) => {
  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const isProduct = 'features' in item;
  const image = item.image || '/src/assets/images/hero_luxury_living_sofa_1794044589907.jpg';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-stone-200 text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-stone-100/80 hover:bg-stone-200 rounded-full text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative aspect-square md:aspect-auto md:h-full bg-stone-100 overflow-hidden">
            <img
              src={image}
              alt={'name' in item ? item.name : item.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md px-3 py-1 text-xs text-white rounded">
              SRK Atelier Edition
            </div>
          </div>

          {/* Right: Technical Specifications */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="uppercase tracking-wider">{item.category}</span>
                <span className="font-mono text-stone-900 font-semibold">{item.price}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-medium">
                {'name' in item ? item.name : item.title}
              </h2>

              <p className="text-sm text-stone-600 font-light mt-3 leading-relaxed">
                {item.description}
              </p>

              {/* Dimension Specs Box */}
              <div className="mt-6 p-4 bg-[#FAF8F5] border border-stone-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-stone-900">
                  <Ruler className="w-4 h-4 text-amber-900" />
                  <span>Architectural Footprint Dimensions:</span>
                </div>
                <div className="font-mono text-sm text-stone-800 font-medium">
                  {item.dimensions}
                </div>
                <p className="text-[11px] text-stone-500">
                  Custom lengths and corner orientations available for bespoke architectural spaces.
                </p>
              </div>

              {/* Material Composition */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="text-stone-500 uppercase tracking-wider text-[11px]">Materials & Construction</div>
                <div className="text-stone-800 font-medium">
                  {'material' in item ? item.material : item.materials}
                </div>
              </div>

              {/* Key Features if available */}
              {isProduct && (
                <div className="mt-4 space-y-2 text-xs">
                  <div className="text-stone-500 uppercase tracking-wider text-[11px]">Specifications</div>
                  <ul className="space-y-1.5 text-stone-700">
                    {(item as FurnitureProduct).features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-stone-900 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>10-Yr Guarantee</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-stone-700" />
                  <span>White-Glove Delivery</span>
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  const title = 'name' in item ? item.name : item.title;
                  onClose();
                  onInquire(`Bespoke Consultation for: ${title}`);
                }}
                className="w-full py-3 px-4 text-xs tracking-wider uppercase font-medium text-stone-50 bg-stone-900 hover:bg-stone-800 rounded-none transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Inquire for Custom Order / Swatches</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
