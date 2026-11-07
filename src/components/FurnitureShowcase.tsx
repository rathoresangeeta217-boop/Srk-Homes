import React from 'react';
import { Eye, ArrowUpRight } from 'lucide-react';
import { FurnitureProduct } from '../types';

interface FurnitureShowcaseProps {
  products: FurnitureProduct[];
  onInspectProduct: (product: FurnitureProduct) => void;
  onOpenConsultation: (subject?: string) => void;
}

export const FurnitureShowcase: React.FC<FurnitureShowcaseProps> = ({
  products,
  onInspectProduct,
  onOpenConsultation
}) => {
  return (
    <section id="showcase" className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-stone-200">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-2">
            Curated Signature Objects
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 font-normal">
            Sculptural Home Editions
          </h2>
        </div>
        <p className="text-sm text-stone-600 max-w-md font-light">
          Individual statement pieces designed to stand alone or anchor entire residential spaces. Each piece is crafted in limited batches with hand-finished surfaces.
        </p>
      </div>

      {/* 3-Column Product Grid complying with §2.A & §2.B */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <article
            key={product.id}
            className="group flex flex-col bg-white border border-stone-200/80 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-soft transition-all duration-300"
          >
            {/* Image takes 65–75% of visual focus */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-300" />
              
              {/* Quick View Button on Hover */}
              <button
                type="button"
                onClick={() => onInspectProduct(product)}
                className="absolute bottom-3 right-3 px-3 py-1.5 bg-stone-900/90 hover:bg-stone-950 text-white text-xs font-medium rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 cursor-pointer"
                aria-label={`Quick view ${product.name}`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Quick View</span>
              </button>
            </div>

            {/* Clean Metadata Section */}
            <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                  <span className="uppercase tracking-wider">{product.category}</span>
                  <span className="text-stone-400 font-mono text-[11px]">{product.leadTime}</span>
                </div>

                <h3 className="font-serif text-xl text-stone-900 font-medium group-hover:text-amber-900 transition-colors">
                  {product.name}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price & Action Row */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-400 block">Pricing from</span>
                  <span className="text-base font-semibold text-stone-900 font-mono tabular-nums">
                    {product.price}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onInspectProduct(product)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-stone-900 hover:text-amber-800 transition-colors cursor-pointer group/btn"
                >
                  <span>Specs & Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
