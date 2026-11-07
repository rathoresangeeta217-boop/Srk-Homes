import React, { useState } from 'react';
import { 
  Sparkles, 
  Maximize2, 
  Ruler, 
  Sun, 
  Sunset, 
  Moon, 
  ArrowRight, 
  Info, 
  Layers, 
  Check,
  ChevronRight,
  Eye
} from 'lucide-react';
import { FurnitureSuite, Hotspot, MaterialOption } from '../types';

interface HeroSectionProps {
  suites: FurnitureSuite[];
  activeSuite: FurnitureSuite;
  onSelectSuite: (suite: FurnitureSuite) => void;
  onInspectHotspot: (hotspot: Hotspot) => void;
  onOpenConsultation: (subject?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  suites,
  activeSuite,
  onSelectSuite,
  onInspectHotspot,
  onOpenConsultation
}) => {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [showHotspots, setShowHotspots] = useState(true);
  const [blueprintMode, setBlueprintMode] = useState(false);
  const [lightingMode, setLightingMode] = useState<'morning' | 'twilight' | 'evening'>('morning');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialOption>(activeSuite.materials[0]);

  // Keep selected material in sync when switching suites
  const handleSuiteChange = (suite: FurnitureSuite) => {
    onSelectSuite(suite);
    setSelectedMaterial(suite.materials[0]);
    setActiveHotspotId(null);
  };

  // Lighting overlay styling
  const getLightingStyle = () => {
    switch (lightingMode) {
      case 'twilight':
        return 'bg-gradient-to-tr from-amber-950/25 via-amber-700/10 to-transparent mix-blend-multiply';
      case 'evening':
        return 'bg-gradient-to-t from-stone-950/45 via-stone-900/20 to-transparent backdrop-brightness-[0.9]';
      case 'morning':
      default:
        return 'bg-gradient-to-b from-amber-50/10 via-transparent to-stone-900/15';
    }
  };

  return (
    <section id="hero-stage" className="relative pt-6 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Top Editorial Kicker & Headline */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-medium text-stone-500 mb-3">
          <span>SRK Homes Furniture</span>
          <span aria-hidden="true">·</span>
          <span>Architectural Living</span>
          <span aria-hidden="true">·</span>
          <span>Bespoke 2026 Collection</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-900 font-normal tracking-tight leading-[1.1] mb-5" style={{ textWrap: 'balance' }}>
          Furniture shaped for considered, timeless living.
        </h1>

        <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed max-w-2xl mx-auto mb-6">
          Handcrafted modular sofas, sculptural timber dining ensembles, and tranquil bedroom suites built with certified solid hardwoods and bespoke tailoring.
        </p>

        {/* Clean Unboxed Metadata Strip (§1.A Zero-Pill Discipline) */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-stone-500 pt-2 border-t border-stone-200/80">
          <span>100% Solid Certified Timber</span>
          <span aria-hidden="true">·</span>
          <span>10-Year Structural Guarantee</span>
          <span aria-hidden="true">·</span>
          <span>Bespoke Architectural Dimensions</span>
          <span aria-hidden="true">·</span>
          <span>White-Glove Home Assembly</span>
        </div>
      </div>

      {/* Hero Interactive Stage Container */}
      <div className="relative rounded-2xl overflow-hidden bg-stone-900 shadow-elevation border border-stone-200/60 transition-all duration-300">
        
        {/* Top Control Bar of the Stage */}
        <div className="bg-stone-900/90 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-stone-800 flex flex-wrap items-center justify-between gap-4 text-stone-200">
          
          {/* Suite Selector Segmented Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-800/80 rounded-lg">
            {suites.map((suite) => (
              <button
                key={suite.id}
                type="button"
                onClick={() => handleSuiteChange(suite)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  activeSuite.id === suite.id
                    ? 'bg-stone-100 text-stone-900 shadow-sm font-semibold'
                    : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
                }`}
              >
                {suite.room === 'living' && 'Living Suite'}
                {suite.room === 'dining' && 'Dining Suite'}
                {suite.room === 'bedroom' && 'Bedroom Suite'}
              </button>
            ))}
          </div>

          {/* Right Action Affordances: Lighting Ambience & Blueprint */}
          <div className="flex items-center gap-3">
            {/* Lighting ambiance mode */}
            <div className="hidden sm:flex items-center gap-1 bg-stone-800/80 p-1 rounded-lg text-xs">
              <span className="px-2 text-stone-400 text-[11px] uppercase tracking-wider">Lighting:</span>
              <button
                type="button"
                onClick={() => setLightingMode('morning')}
                title="Morning Sunlight"
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  lightingMode === 'morning' ? 'bg-stone-700 text-amber-300' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setLightingMode('twilight')}
                title="Golden Twilight"
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  lightingMode === 'twilight' ? 'bg-stone-700 text-amber-400' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Sunset className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setLightingMode('evening')}
                title="Evening Ambient"
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  lightingMode === 'evening' ? 'bg-stone-700 text-amber-200' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Toggle Hotspots */}
            <button
              type="button"
              onClick={() => setShowHotspots(!showHotspots)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                showHotspots ? 'bg-stone-800 text-amber-200 border border-stone-700' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{showHotspots ? 'Hotspots On' : 'Hotspots Off'}</span>
            </button>

            {/* Toggle Dimension Blueprint */}
            <button
              type="button"
              onClick={() => setBlueprintMode(!blueprintMode)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                blueprintMode ? 'bg-amber-100 text-stone-900' : 'bg-stone-800 text-stone-300 hover:text-white'
              }`}
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>{blueprintMode ? 'Exit Blueprint' : 'CAD Specs'}</span>
            </button>
          </div>
        </div>

        {/* Main Stage Visual Canvas (16:9 Aspect Ratio) */}
        <div className="relative aspect-[16/9] w-full select-none overflow-hidden group">
          {/* Main Furniture Photography */}
          <img
            src={activeSuite.image}
            alt={activeSuite.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
            referrerPolicy="no-referrer"
          />

          {/* Dynamic Ambient Lighting Overlay */}
          <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${getLightingStyle()}`} />

          {/* Blueprint Overlay Mode */}
          {blueprintMode && (
            <div className="absolute inset-0 bg-stone-950/75 backdrop-blur-[2px] p-6 sm:p-10 text-amber-100 flex flex-col justify-between transition-opacity duration-300">
              <div className="flex justify-between items-start border-b border-amber-200/20 pb-4">
                <div>
                  <div className="text-[11px] tracking-widest uppercase text-amber-400 font-mono">
                    Architectural Dimension Sheet // SRK-SPEC-2026
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif text-white mt-1">
                    {activeSuite.name}
                  </h2>
                </div>
                <div className="text-right text-xs text-stone-300 font-mono">
                  Scale: 1:20 <br />
                  Tolerances: ±2mm
                </div>
              </div>

              {/* Dimension Callouts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
                {activeSuite.hotspots.map((hs, i) => (
                  <div key={hs.id} className="border border-amber-200/30 bg-stone-900/80 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-xs text-amber-400">0{i + 1} / {hs.category}</span>
                      <span className="font-mono text-xs text-white font-semibold">{hs.price}</span>
                    </div>
                    <div className="font-serif text-base text-white">{hs.title}</div>
                    <div className="text-xs text-stone-300">
                      <span className="text-amber-300 font-mono">Dimensions: </span>
                      {hs.dimensions}
                    </div>
                    <div className="text-xs text-stone-400 pt-1 border-t border-stone-800">
                      {hs.materials}
                    </div>
                    <button
                      type="button"
                      onClick={() => onInspectHotspot(hs)}
                      className="mt-2 text-xs text-amber-300 hover:text-white underline cursor-pointer flex items-center gap-1"
                    >
                      <span>Full technical drawing</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-between items-center pt-4 border-t border-amber-200/20 text-xs text-stone-400">
                <span>All modular pieces can be reconfigured or resized for custom interior layouts.</span>
                <button
                  type="button"
                  onClick={() => setBlueprintMode(false)}
                  className="px-3 py-1 bg-amber-400 text-stone-950 font-medium rounded hover:bg-amber-300 cursor-pointer"
                >
                  Return to Realistic View
                </button>
              </div>
            </div>
          )}

          {/* Interactive Spatial Hotspots */}
          {showHotspots && !blueprintMode && (
            <div className="absolute inset-0 pointer-events-none">
              {activeSuite.hotspots.map((hotspot) => {
                const isActive = activeHotspotId === hotspot.id;

                return (
                  <div
                    key={hotspot.id}
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                  >
                    {/* Hotspot Pin Button */}
                    <button
                      type="button"
                      onClick={() => setActiveHotspotId(isActive ? null : hotspot.id)}
                      onMouseEnter={() => setActiveHotspotId(hotspot.id)}
                      className="group/pin relative flex items-center justify-center w-8 h-8 rounded-full bg-stone-900/90 text-stone-100 border border-stone-100/60 shadow-lg hover:scale-110 hover:bg-stone-950 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
                      aria-label={`View details for ${hotspot.title}`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 group-hover/pin:scale-125 transition-transform" />
                      
                      {/* Pulse Ring */}
                      <span className="absolute -inset-1 rounded-full border border-amber-400/50 animate-ping pointer-events-none opacity-75" />
                    </button>

                    {/* Popover Card */}
                    {isActive && (
                      <div 
                        onMouseLeave={() => setActiveHotspotId(null)}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-72 sm:w-80 bg-stone-950/95 backdrop-blur-md border border-stone-700/80 rounded-xl p-4 text-stone-100 shadow-2xl z-30 transition-all animate-in fade-in zoom-in-95 duration-200"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5 text-[11px] text-stone-400">
                          <span className="uppercase tracking-wider">{hotspot.category}</span>
                          <span className="font-semibold text-amber-300 font-mono">{hotspot.price}</span>
                        </div>

                        <h3 className="font-serif text-lg text-white font-medium leading-snug mb-1">
                          {hotspot.title}
                        </h3>

                        <p className="text-xs text-stone-300 line-clamp-2 mb-3 leading-relaxed">
                          {hotspot.description}
                        </p>

                        <div className="space-y-1 text-[11px] border-t border-stone-800 pt-2 mb-3 text-stone-400">
                          <div className="flex justify-between">
                            <span>Materials:</span>
                            <span className="text-stone-200 text-right truncate max-w-[170px]">{hotspot.materials}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Dimensions:</span>
                            <span className="text-stone-200 font-mono">{hotspot.dimensions}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => onInspectHotspot(hotspot)}
                            className="flex-1 py-1.5 px-3 text-xs font-medium text-stone-900 bg-amber-200 hover:bg-amber-100 rounded transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <span>Inspect Piece</span>
                            <Maximize2 className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onOpenConsultation(`Inquiry for ${hotspot.title}`)}
                            className="py-1.5 px-3 text-xs font-medium text-stone-200 hover:text-white bg-stone-800 hover:bg-stone-700 rounded transition-colors cursor-pointer"
                          >
                            Inquire
                          </button>
                        </div>

                        {/* Arrow Pointer */}
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-stone-950 border-r border-b border-stone-700/80 rotate-45" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom In-Image Suite Info Scrim */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/90 via-stone-950/50 to-transparent p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div className="max-w-xl">
              <div className="text-xs uppercase tracking-widest text-amber-300 font-medium mb-1">
                Featured Suite Showcase
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal text-white mb-2">
                {activeSuite.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                {activeSuite.description}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onOpenConsultation(`Custom Room Plan: ${activeSuite.name}`)}
                className="px-5 py-2.5 text-xs font-medium tracking-wider uppercase text-stone-900 bg-stone-100 hover:bg-white rounded transition-colors cursor-pointer flex items-center gap-2 shadow-md"
              >
                <span>Request Custom Quote</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Dock: Live Material Finish Swatches & Key Architecture Specifications */}
        <div className="bg-stone-900 px-4 sm:px-6 py-5 border-t border-stone-800 text-stone-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Material Customizer Swatches */}
            <div className="lg:col-span-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span className="uppercase tracking-wider">Select Upholstery & Finish:</span>
                <span className="text-amber-200 font-medium">{selectedMaterial.name}</span>
              </div>
              
              <div className="flex items-center gap-3">
                {activeSuite.materials.map((mat) => {
                  const isSelected = selectedMaterial.id === mat.id;
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => setSelectedMaterial(mat)}
                      className={`group relative flex items-center gap-2 p-1.5 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-400 bg-stone-800'
                          : 'border-stone-800 hover:border-stone-700 bg-stone-950/40'
                      }`}
                      title={mat.name}
                    >
                      <span
                        className="w-6 h-6 rounded-md shadow-inner border border-white/10 shrink-0"
                        style={{ backgroundColor: mat.colorHex }}
                      />
                      <span className="hidden sm:inline text-xs text-stone-300 font-medium pr-1">
                        {mat.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-stone-400">
                <span className="text-stone-300 font-medium">Material note: </span>
                {selectedMaterial.textureNote}
              </p>
            </div>

            {/* Right Column: Architectural Highlights Strip */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t lg:border-t-0 lg:border-l border-stone-800 pt-4 lg:pt-0 lg:pl-6 text-xs">
              <div>
                <span className="block text-stone-500 text-[11px] uppercase tracking-wider mb-0.5">Wood Species</span>
                <span className="font-serif text-sm text-stone-200">Solid American Walnut & Oak</span>
              </div>
              <div>
                <span className="block text-stone-500 text-[11px] uppercase tracking-wider mb-0.5">Frame Core</span>
                <span className="font-serif text-sm text-stone-200">Kiln-Dried Hardwood</span>
              </div>
              <div>
                <span className="block text-stone-500 text-[11px] uppercase tracking-wider mb-0.5">Warranty</span>
                <span className="font-serif text-sm text-stone-200">10-Year Structural</span>
              </div>
              <div>
                <span className="block text-stone-500 text-[11px] uppercase tracking-wider mb-0.5">Production</span>
                <span className="font-serif text-sm text-stone-200">Handcrafted Atelier</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Quick Suite Features Proof Strip Adjacent to Hero (§1.H Claim-to-Proof Adjacency) */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-white/70 border border-stone-200/70 rounded-xl space-y-1.5">
          <div className="text-xs uppercase tracking-wider text-stone-500 font-mono">01. Bespoke Dimension Fitting</div>
          <h4 className="font-serif text-lg text-stone-900">Tailored to Your Floor Plan</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Every sectional length, dining table span, and bed headboard width can be adapted down to the centimeter by our in-house engineering team.
          </p>
        </div>

        <div className="p-5 bg-white/70 border border-stone-200/70 rounded-xl space-y-1.5">
          <div className="text-xs uppercase tracking-wider text-stone-500 font-mono">02. Architectural Materiality</div>
          <h4 className="font-serif text-lg text-stone-900">Natural Stones & Solid Hardwood</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Roman travertine, Carrara marble, and select FSC-certified European hardwoods with natural organic plant oils that enrich with time.
          </p>
        </div>

        <div className="p-5 bg-white/70 border border-stone-200/70 rounded-xl space-y-1.5">
          <div className="text-xs uppercase tracking-wider text-stone-500 font-mono">03. Private Design Consultation</div>
          <h4 className="font-serif text-lg text-stone-900">White-Glove Interior Support</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Share your CAD layouts or photos; our furniture architects will curate tailored 3D spatial renders and swatch boxes dispatched to your door.
          </p>
        </div>
      </div>
    </section>
  );
};
