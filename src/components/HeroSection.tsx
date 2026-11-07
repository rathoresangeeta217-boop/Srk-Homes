import React, { useState, useRef } from 'react';
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
  ChevronLeft,
  Eye,
  SlidersHorizontal
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
  const carouselRef = useRef<HTMLDivElement>(null);

  // Keep selected material in sync when switching suites
  const handleSuiteChange = (suite: FurnitureSuite) => {
    onSelectSuite(suite);
    setSelectedMaterial(suite.materials[0]);
    setActiveHotspotId(null);
  };

  const handleNextSuite = () => {
    const currentIndex = suites.findIndex((s) => s.id === activeSuite.id);
    const nextIndex = (currentIndex + 1) % suites.length;
    handleSuiteChange(suites[nextIndex]);
  };

  const handlePrevSuite = () => {
    const currentIndex = suites.findIndex((s) => s.id === activeSuite.id);
    const prevIndex = (currentIndex - 1 + suites.length) % suites.length;
    handleSuiteChange(suites[prevIndex]);
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
    <section id="hero-stage" className="relative pt-4 sm:pt-6 pb-16 sm:pb-20 px-3 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Top Editorial Kicker & Headline */}
      <div className="mb-6 sm:mb-10 text-center max-w-3xl mx-auto px-2">
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs tracking-widest uppercase font-medium text-stone-500 mb-2 sm:mb-3">
          <span>SRK Homes</span>
          <span aria-hidden="true">·</span>
          <span>Architectural Furniture</span>
          <span aria-hidden="true">·</span>
          <span>2026 Collection</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-stone-900 font-normal tracking-tight leading-[1.15] sm:leading-[1.1] mb-3 sm:mb-5" style={{ textWrap: 'balance' }}>
          Furniture shaped for considered, timeless living.
        </h1>

        <p className="text-sm sm:text-lg text-stone-600 font-light leading-relaxed max-w-2xl mx-auto mb-4 sm:mb-6">
          Handcrafted modular sofas, sculptural timber dining ensembles, and tranquil bedroom suites built with certified solid hardwoods and bespoke tailoring.
        </p>

        {/* Clean Unboxed Metadata Strip (§1.A Zero-Pill Discipline) */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-1.5 text-[11px] sm:text-xs text-stone-500 pt-2 border-t border-stone-200/80">
          <span>100% Solid Certified Timber</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>10-Year Guarantee</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>Bespoke Dimensions</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>White-Glove Assembly</span>
        </div>
      </div>

      {/* Hero Interactive Stage Container */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-900 shadow-elevation border border-stone-200/60 transition-all duration-300">
        
        {/* Top Control Bar of the Stage */}
        <div className="bg-stone-900/95 backdrop-blur-md px-3 sm:px-6 py-2.5 sm:py-3 border-b border-stone-800 flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 text-stone-200">
          
          {/* Suite Selector Segmented Buttons (Horizontal touch scroll on mobile) */}
          <div className="flex items-center gap-1 p-1 bg-stone-800/90 rounded-lg max-w-full overflow-x-auto no-scrollbar">
            {suites.map((suite) => (
              <button
                key={suite.id}
                type="button"
                onClick={() => handleSuiteChange(suite)}
                className={`min-h-[36px] px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer touch-manipulation shrink-0 ${
                  activeSuite.id === suite.id
                    ? 'bg-stone-100 text-stone-900 shadow-sm font-semibold'
                    : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
                }`}
              >
                {suite.room === 'living' && 'Living Room'}
                {suite.room === 'dining' && 'Dining Room'}
                {suite.room === 'bedroom' && 'Bedroom'}
              </button>
            ))}
          </div>

          {/* Right Action Affordances: Lighting Ambience & Blueprint */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Lighting ambiance mode */}
            <div className="flex items-center gap-0.5 sm:gap-1 bg-stone-800/80 p-0.5 sm:p-1 rounded-lg text-xs">
              <span className="hidden sm:inline px-2 text-stone-400 text-[11px] uppercase tracking-wider">Light:</span>
              <button
                type="button"
                onClick={() => setLightingMode('morning')}
                title="Morning Sunlight"
                className={`p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded transition-colors cursor-pointer ${
                  lightingMode === 'morning' ? 'bg-stone-700 text-amber-300' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setLightingMode('twilight')}
                title="Golden Twilight"
                className={`p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded transition-colors cursor-pointer ${
                  lightingMode === 'twilight' ? 'bg-stone-700 text-amber-400' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Sunset className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setLightingMode('evening')}
                title="Evening Ambient"
                className={`p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded transition-colors cursor-pointer ${
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
              className={`min-h-[36px] flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer touch-manipulation ${
                showHotspots ? 'bg-stone-800 text-amber-200 border border-stone-700' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{showHotspots ? 'Pins On' : 'Pins Off'}</span>
            </button>

            {/* Toggle Dimension Blueprint */}
            <button
              type="button"
              onClick={() => setBlueprintMode(!blueprintMode)}
              className={`min-h-[36px] flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer touch-manipulation ${
                blueprintMode ? 'bg-amber-100 text-stone-900 font-semibold' : 'bg-stone-800 text-stone-300 hover:text-white'
              }`}
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>{blueprintMode ? 'Exit' : 'CAD'}</span>
            </button>
          </div>
        </div>

        {/* Main Stage Visual Canvas (Responsive aspect ratio for phone & tablet) */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full select-none overflow-hidden group">
          {/* Main Furniture Photography */}
          <img
            src={activeSuite.image}
            alt={activeSuite.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
            referrerPolicy="no-referrer"
          />

          {/* Dynamic Ambient Lighting Overlay */}
          <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${getLightingStyle()}`} />

          {/* Mobile Quick Suite Chevrons */}
          <button
            type="button"
            onClick={handlePrevSuite}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-stone-950/70 hover:bg-stone-950 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all active:scale-90 cursor-pointer shadow-lg z-20"
            aria-label="Previous furniture suite"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNextSuite}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-stone-950/70 hover:bg-stone-950 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all active:scale-90 cursor-pointer shadow-lg z-20"
            aria-label="Next furniture suite"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Blueprint Overlay Mode */}
          {blueprintMode && (
            <div className="absolute inset-0 bg-stone-950/85 backdrop-blur-[3px] p-4 sm:p-8 text-amber-100 flex flex-col justify-between overflow-y-auto transition-opacity duration-300 z-20">
              <div className="flex justify-between items-start border-b border-amber-200/20 pb-3">
                <div>
                  <div className="text-[10px] sm:text-[11px] tracking-widest uppercase text-amber-400 font-mono">
                    CAD Specification Sheet // SRK-HOMES-2026
                  </div>
                  <h2 className="text-lg sm:text-2xl font-serif text-white mt-0.5">
                    {activeSuite.name}
                  </h2>
                </div>
                <div className="text-right text-[11px] text-stone-300 font-mono">
                  Scale: 1:20 <br />
                  Tolerances: ±2mm
                </div>
              </div>

              {/* Dimension Callouts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 py-4 my-auto">
                {activeSuite.hotspots.map((hs, i) => (
                  <div key={hs.id} className="border border-amber-200/30 bg-stone-900/90 p-3.5 sm:p-4 rounded-xl space-y-1.5">
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-[11px] text-amber-400">0{i + 1} / {hs.category}</span>
                      <span className="font-mono text-xs text-white font-semibold">{hs.price}</span>
                    </div>
                    <div className="font-serif text-sm sm:text-base text-white">{hs.title}</div>
                    <div className="text-xs text-stone-300">
                      <span className="text-amber-300 font-mono">Dimensions: </span>
                      {hs.dimensions}
                    </div>
                    <div className="text-[11px] text-stone-400 pt-1 border-t border-stone-800">
                      {hs.materials}
                    </div>
                    <button
                      type="button"
                      onClick={() => onInspectHotspot(hs)}
                      className="mt-1 text-xs text-amber-300 hover:text-white underline cursor-pointer flex items-center gap-1"
                    >
                      <span>View details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-between items-center pt-3 border-t border-amber-200/20 text-[11px] sm:text-xs text-stone-400 gap-2">
                <span>Modular pieces can be custom-scaled for any room.</span>
                <button
                  type="button"
                  onClick={() => setBlueprintMode(false)}
                  className="px-3 py-1.5 bg-amber-400 text-stone-950 font-medium rounded hover:bg-amber-300 cursor-pointer"
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
                    {/* Hotspot Pin Button with generous 44px hitbox */}
                    <button
                      type="button"
                      onClick={() => setActiveHotspotId(isActive ? null : hotspot.id)}
                      className="group/pin relative flex items-center justify-center w-11 h-11 -m-1.5 rounded-full cursor-pointer touch-manipulation focus:outline-none"
                      aria-label={`View details for ${hotspot.title}`}
                    >
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-950/90 text-stone-100 border border-stone-100/70 shadow-lg flex items-center justify-center group-hover/pin:scale-110 transition-transform">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 group-hover/pin:scale-125 transition-transform" />
                      </span>
                      
                      {/* Pulse Ring */}
                      <span className="absolute inset-1 rounded-full border border-amber-400/60 animate-ping pointer-events-none opacity-75" />
                    </button>

                    {/* Desktop/Tablet Popover Card */}
                    {isActive && (
                      <div 
                        className="hidden sm:block absolute bottom-12 left-1/2 -translate-x-1/2 w-72 sm:w-80 bg-stone-950/95 backdrop-blur-md border border-stone-700/80 rounded-xl p-4 text-stone-100 shadow-2xl z-30 transition-all animate-in fade-in zoom-in-95 duration-200"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5 text-[11px] text-stone-400">
                          <span className="uppercase tracking-wider">{hotspot.category}</span>
                          <span className="font-semibold text-amber-300 font-mono">{hotspot.price}</span>
                        </div>

                        <h3 className="font-serif text-base sm:text-lg text-white font-medium leading-snug mb-1">
                          {hotspot.title}
                        </h3>

                        <p className="text-xs text-stone-300 line-clamp-2 mb-2 leading-relaxed">
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
                            className="flex-1 py-2 px-3 text-xs font-medium text-stone-900 bg-amber-200 hover:bg-amber-100 rounded transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <span>Inspect Piece</span>
                            <Maximize2 className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onOpenConsultation(`Inquiry for ${hotspot.title}`)}
                            className="py-2 px-3 text-xs font-medium text-stone-200 hover:text-white bg-stone-800 hover:bg-stone-700 rounded transition-colors cursor-pointer"
                          >
                            Inquire
                          </button>
                        </div>

                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-stone-950 border-r border-b border-stone-700/80 rotate-45" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom In-Image Suite Title Strip */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/90 via-stone-950/50 to-transparent p-3.5 sm:p-6 lg:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
            <div className="max-w-xl">
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-300 font-medium mb-0.5">
                {activeSuite.room.toUpperCase()} COLLECTION
              </div>
              <h2 className="text-xl sm:text-3xl font-serif font-normal text-white mb-1">
                {activeSuite.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 font-light line-clamp-2 sm:line-clamp-none">
                {activeSuite.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onOpenConsultation(`Custom Room Plan: ${activeSuite.name}`)}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium tracking-wider uppercase text-stone-900 bg-stone-100 hover:bg-white rounded transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md touch-manipulation"
              >
                <span>Request Custom Quote</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE SPECIAL: Horizontal Swipeable Hotspot Pieces Rail */}
        <div className="bg-stone-950/90 px-3 sm:px-6 py-3 border-t border-stone-800">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-2.5">
            <span className="uppercase tracking-wider font-mono text-[11px] text-amber-300">
              Featured Pieces in this Room:
            </span>
            <span className="text-[11px] text-stone-500">Tap to inspect</span>
          </div>

          {/* Horizontal Touch Scroll Rail */}
          <div 
            ref={carouselRef}
            className="flex items-stretch gap-3 overflow-x-auto no-scrollbar pb-1 snap-x snap-mandatory"
          >
            {activeSuite.hotspots.map((hs) => {
              const isSelected = activeHotspotId === hs.id;
              return (
                <div
                  key={hs.id}
                  onClick={() => {
                    setActiveHotspotId(hs.id);
                    onInspectHotspot(hs);
                  }}
                  className={`snap-start shrink-0 w-64 sm:w-72 p-3 rounded-xl border transition-all cursor-pointer touch-manipulation flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-400 bg-stone-800 shadow-md ring-1 ring-amber-400/50'
                      : 'border-stone-800 bg-stone-900/80 hover:border-stone-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
                      <span className="uppercase tracking-wider">{hs.category}</span>
                      <span className="font-semibold text-amber-300 font-mono">{hs.price}</span>
                    </div>
                    <div className="font-serif text-sm text-stone-100 font-medium leading-snug line-clamp-1">
                      {hs.title}
                    </div>
                    <div className="text-[11px] text-stone-400 font-mono mt-1">
                      {hs.dimensions}
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-amber-200 flex items-center gap-1">
                      <span>Inspect Details</span>
                      <Maximize2 className="w-3 h-3" />
                    </span>
                    <span className="text-stone-500">Tap</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Dock: Live Material Finish Swatches & Key Architecture Specifications */}
        <div className="bg-stone-900 px-3 sm:px-6 py-4 sm:py-5 border-t border-stone-800 text-stone-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            
            {/* Left Column: Material Customizer Swatches */}
            <div className="lg:col-span-6 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span className="uppercase tracking-wider">Select Upholstery & Finish:</span>
                <span className="text-amber-200 font-medium">{selectedMaterial.name}</span>
              </div>
              
              {/* Swatch row with touch-friendly hitboxes */}
              <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1">
                {activeSuite.materials.map((mat) => {
                  const isSelected = selectedMaterial.id === mat.id;
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => setSelectedMaterial(mat)}
                      className={`group relative min-h-[44px] flex items-center gap-2 p-1.5 px-2.5 rounded-lg border transition-all cursor-pointer touch-manipulation shrink-0 ${
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
                      <span className="text-xs text-stone-300 font-medium whitespace-nowrap">
                        {mat.name}
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
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t lg:border-t-0 lg:border-l border-stone-800 pt-3 lg:pt-0 lg:pl-6 text-xs">
              <div>
                <span className="block text-stone-500 text-[10px] uppercase tracking-wider mb-0.5">Species</span>
                <span className="font-serif text-xs sm:text-sm text-stone-200">Solid Walnut & Oak</span>
              </div>
              <div>
                <span className="block text-stone-500 text-[10px] uppercase tracking-wider mb-0.5">Frame</span>
                <span className="font-serif text-xs sm:text-sm text-stone-200">Kiln-Dried Hardwood</span>
              </div>
              <div>
                <span className="block text-stone-500 text-[10px] uppercase tracking-wider mb-0.5">Warranty</span>
                <span className="font-serif text-xs sm:text-sm text-stone-200">10-Year Structural</span>
              </div>
              <div>
                <span className="block text-stone-500 text-[10px] uppercase tracking-wider mb-0.5">Atelier</span>
                <span className="font-serif text-xs sm:text-sm text-stone-200">Bespoke Fit</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Quick Suite Features Proof Strip Adjacent to Hero */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-4 sm:p-5 bg-white/70 border border-stone-200/70 rounded-xl space-y-1">
          <div className="text-[11px] uppercase tracking-wider text-stone-500 font-mono">01. Bespoke Dimension Fitting</div>
          <h4 className="font-serif text-base sm:text-lg text-stone-900">Tailored to Your Floor Plan</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Every sectional length, dining table span, and bed headboard width can be adapted down to the centimeter by our in-house engineering team.
          </p>
        </div>

        <div className="p-4 sm:p-5 bg-white/70 border border-stone-200/70 rounded-xl space-y-1">
          <div className="text-[11px] uppercase tracking-wider text-stone-500 font-mono">02. Architectural Materiality</div>
          <h4 className="font-serif text-base sm:text-lg text-stone-900">Natural Stones & Solid Hardwood</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Roman travertine, Carrara marble, and select FSC-certified European hardwoods with natural organic plant oils that enrich with time.
          </p>
        </div>

        <div className="p-4 sm:p-5 bg-white/70 border border-stone-200/70 rounded-xl space-y-1">
          <div className="text-[11px] uppercase tracking-wider text-stone-500 font-mono">03. Private Design Consultation</div>
          <h4 className="font-serif text-base sm:text-lg text-stone-900">White-Glove Interior Support</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Share your CAD layouts or photos; our furniture architects will curate tailored 3D spatial renders and swatch boxes dispatched to your door.
          </p>
        </div>
      </div>
    </section>
  );
};
