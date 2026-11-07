import React, { useState, useMemo } from 'react';
import { Ruler, CheckCircle2, ArrowRight, LayoutTemplate, ShieldCheck } from 'lucide-react';

interface DimensionPlannerProps {
  onOpenConsultation: (subject?: string) => void;
}

export const DimensionPlanner: React.FC<DimensionPlannerProps> = ({ onOpenConsultation }) => {
  const [roomType, setRoomType] = useState<'living' | 'dining' | 'bedroom'>('living');
  const [roomWidth, setRoomWidth] = useState(5.2); // meters
  const [roomLength, setRoomLength] = useState(6.5); // meters
  const [sofaConfig, setSofaConfig] = useState<'3-piece' | '4-piece' | 'corner-l'>('4-piece');
  const [includeCoffeeTable, setIncludeCoffeeTable] = useState(true);
  const [includeLoungeChair, setIncludeLoungeChair] = useState(true);

  // Computed layout calculations
  const totalArea = useMemo(() => (roomWidth * roomLength).toFixed(1), [roomWidth, roomLength]);
  
  // Approximate furniture footprint (sq m)
  const furnitureFootprint = useMemo(() => {
    let area = 0;
    if (roomType === 'living') {
      area += sofaConfig === '3-piece' ? 3.2 : sofaConfig === '4-piece' ? 4.1 : 4.8;
      if (includeCoffeeTable) area += 1.3;
      if (includeLoungeChair) area += 0.9;
    } else if (roomType === 'dining') {
      area += 3.2; // 10-seater table
      area += 3.6; // chair perimeter pull-out allowance
    } else {
      area += 4.5; // platform bed & headboard system
      area += 1.2; // accent seating
    }
    return area;
  }, [roomType, sofaConfig, includeCoffeeTable, includeLoungeChair]);

  const coveragePercent = Math.min(Math.round((furnitureFootprint / parseFloat(totalArea)) * 100), 100);

  const getClearanceStatus = () => {
    if (coveragePercent > 45) return { status: 'Dense Footprint', color: 'text-amber-700', note: 'May restrict 90cm circulation paths. Consider a 3-piece configuration.' };
    if (coveragePercent < 20) return { status: 'Spacious & Airy', color: 'text-emerald-700', note: 'Optimal luxury spacing with generous open gallery walkways.' };
    return { status: 'Architectural Balance', color: 'text-stone-800', note: 'Ideal ratio for comfortable luxury circulation and relaxed focal flow.' };
  };

  const clearance = getClearanceStatus();

  return (
    <section id="planner" className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-stone-200">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-2">
          Spatial Architectural Tool
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 font-normal">
          Interactive Room Dimension Planner
        </h2>
        <p className="text-sm text-stone-600 font-light mt-3">
          Simulate your room scale to ensure SRK Homes modular furniture proportions complement your architectural layout with seamless circulation clearance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-soft">
        
        {/* Left Column: Interactive Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* Room Type Selector */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-500 font-medium mb-2">
              Select Room Space
            </label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-stone-100 rounded-lg">
              <button
                type="button"
                onClick={() => setRoomType('living')}
                className={`py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  roomType === 'living' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Living Salon
              </button>
              <button
                type="button"
                onClick={() => setRoomType('dining')}
                className={`py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  roomType === 'dining' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Dining Hall
              </button>
              <button
                type="button"
                onClick={() => setRoomType('bedroom')}
                className={`py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  roomType === 'bedroom' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Master Suite
              </button>
            </div>
          </div>

          {/* Room Width Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-stone-600">Room Width (Meters)</span>
              <span className="font-mono font-medium text-stone-900">{roomWidth.toFixed(1)} m ({Math.round(roomWidth * 3.28)} ft)</span>
            </div>
            <input
              type="range"
              min="3.5"
              max="9.0"
              step="0.1"
              value={roomWidth}
              onChange={(e) => setRoomWidth(parseFloat(e.target.value))}
              className="w-full accent-stone-900 cursor-pointer"
            />
          </div>

          {/* Room Length Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-stone-600">Room Length (Meters)</span>
              <span className="font-mono font-medium text-stone-900">{roomLength.toFixed(1)} m ({Math.round(roomLength * 3.28)} ft)</span>
            </div>
            <input
              type="range"
              min="4.0"
              max="11.0"
              step="0.1"
              value={roomLength}
              onChange={(e) => setRoomLength(parseFloat(e.target.value))}
              className="w-full accent-stone-900 cursor-pointer"
            />
          </div>

          {/* Furniture Options */}
          {roomType === 'living' && (
            <div className="space-y-3 pt-2 border-t border-stone-200">
              <label className="block text-xs uppercase tracking-wider text-stone-500 font-medium">
                Alva Sectional Configuration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['3-piece', '4-piece', 'corner-l'] as const).map((cfg) => (
                  <button
                    key={cfg}
                    type="button"
                    onClick={() => setSofaConfig(cfg)}
                    className={`py-2 px-3 text-xs capitalize rounded-lg border text-center transition-all cursor-pointer ${
                      sofaConfig === cfg
                        ? 'border-stone-900 bg-stone-900 text-white font-medium'
                        : 'border-stone-200 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    {cfg.replace('-', ' ')}
                  </button>
                ))}
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeCoffeeTable}
                    onChange={(e) => setIncludeCoffeeTable(e.target.checked)}
                    className="accent-stone-900"
                  />
                  <span>Include Monolith Coffee Plinth (150 × 85 cm)</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLoungeChair}
                    onChange={(e) => setIncludeLoungeChair(e.target.checked)}
                    className="accent-stone-900"
                  />
                  <span>Include Verona Sculpted Armchair (88 × 84 cm)</span>
                </label>
              </div>
            </div>
          )}

          {/* CTA to submit plan */}
          <button
            type="button"
            onClick={() => onOpenConsultation(`Custom Layout: ${roomWidth}m × ${roomLength}m ${roomType} space`)}
            className="w-full py-3 px-4 text-xs tracking-wider uppercase font-medium text-stone-50 bg-stone-900 hover:bg-stone-800 rounded-none transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Request Layout Engineering Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Column: Architectural Schematic Diagram */}
        <div className="lg:col-span-7 bg-[#FAF8F5] border border-stone-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <div className="text-[11px] font-mono uppercase text-stone-500">Spatial Layout Blueprint</div>
              <div className="text-lg font-serif text-stone-900">
                {roomWidth}m × {roomLength}m Room Canvas ({totalArea} m² / {Math.round(parseFloat(totalArea) * 10.76)} sq ft)
              </div>
            </div>
            <div className="text-right">
              <span className={`text-xs font-semibold ${clearance.color}`}>
                {clearance.status}
              </span>
              <span className="block text-[11px] text-stone-500 font-mono">
                {coveragePercent}% Floor Coverage
              </span>
            </div>
          </div>

          {/* Architectural 2D Schematic Preview Box */}
          <div className="relative w-full aspect-[16/10] bg-stone-100 rounded-lg border-2 border-dashed border-stone-300 p-4 flex items-center justify-center overflow-hidden">
            {/* Grid Lines */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#78716c 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Room Boundary Box */}
            <div className="relative w-4/5 h-4/5 border border-stone-400 bg-white shadow-inner flex flex-col items-center justify-center p-4">
              
              {/* Furniture Representation */}
              {roomType === 'living' && (
                <div className="relative flex flex-col items-center gap-4">
                  {/* Sofa Box */}
                  <div className="w-48 sm:w-56 h-16 bg-stone-800 text-stone-100 flex items-center justify-center text-[11px] font-mono rounded shadow">
                    Alva Modular Sectional (3.4m)
                  </div>
                  
                  {/* Table & Chair row */}
                  <div className="flex items-center gap-6">
                    {includeCoffeeTable && (
                      <div className="w-24 h-10 bg-amber-800/80 text-amber-50 flex items-center justify-center text-[10px] font-mono rounded">
                        Coffee Plinth
                      </div>
                    )}
                    {includeLoungeChair && (
                      <div className="w-14 h-12 bg-stone-600 text-white flex items-center justify-center text-[9px] font-mono rounded-full">
                        Verona
                      </div>
                    )}
                  </div>
                </div>
              )}

              {roomType === 'dining' && (
                <div className="relative flex flex-col items-center justify-center gap-2">
                  <div className="w-52 h-20 bg-amber-900/90 text-amber-50 flex items-center justify-center text-xs font-mono rounded shadow">
                    Kyoto 10-Seat Oak Dining (2.9m)
                  </div>
                  <div className="text-[10px] text-stone-500 font-mono">
                    75cm Dining Chair Clearance Zone Guaranteed
                  </div>
                </div>
              )}

              {roomType === 'bedroom' && (
                <div className="relative flex flex-col items-center justify-center gap-2">
                  <div className="w-56 h-28 bg-stone-800 text-stone-100 flex items-center justify-center text-xs font-mono rounded shadow">
                    Sylvan Platform Bed & Fluted Wall (3.6m)
                  </div>
                </div>
              )}

              {/* Clearance Labels */}
              <div className="absolute top-2 left-3 text-[10px] text-stone-400 font-mono">
                Min. 90cm Walkway Clearance
              </div>
              <div className="absolute bottom-2 right-3 text-[10px] text-stone-400 font-mono">
                FSC Certified Hardwood
              </div>
            </div>
          </div>

          {/* Architectural Notes */}
          <div className="p-4 bg-stone-100/70 rounded-lg text-xs text-stone-600 space-y-1">
            <div className="flex items-center gap-2 font-medium text-stone-900">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Architectural Clearance Assessment:</span>
            </div>
            <p className="leading-relaxed">
              {clearance.note} SRK Homes provides custom CAD floor plans upon request for every bespoke order.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
