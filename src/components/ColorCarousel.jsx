import { useState, useRef, useEffect } from "react";
import { Sparkles, Eye } from "lucide-react";
import { carouselPhotos, config } from "../constants";

const FilmPhotoCard = ({ photo, activeId, setActiveId }) => {
  const isHeld = activeId === photo.id;

  const handleHoldStart = () => {
    setActiveId(photo.id);
  };

  const handleHoldEnd = () => {
    if (activeId === photo.id) {
      setActiveId(null);
    }
  };

  return (
    <div
      className="flex-shrink-0 relative select-none touch-pan-x cursor-pointer group"
      onPointerDown={handleHoldStart}
      onPointerUp={handleHoldEnd}
      onPointerLeave={handleHoldEnd}
      onPointerCancel={handleHoldEnd}
      onTouchStart={handleHoldStart}
      onTouchEnd={handleHoldEnd}
    >
      {/* Film Strip Frame */}
      <div
        className={`w-[260px] md:w-[280px] bg-[#1a1a1c] p-3 pt-5 pb-6 rounded-lg shadow-2xl transition-all duration-500 border border-neutral-800 ${
          isHeld ? "scale-[1.04] shadow-[0_15px_35px_rgba(255,107,107,0.35)] -translate-y-1" : "hover:scale-[1.01]"
        }`}
        style={{
          boxShadow: isHeld 
            ? "0 20px 40px -10px rgba(0,0,0,0.5), 0 0 25px rgba(251,191,36,0.3)" 
            : "0 12px 25px -5px rgba(0,0,0,0.3)",
        }}
      >
        {/* Top Film Sprocket Perforations */}
        <div className="flex justify-between items-center px-1 mb-2">
          <span className="text-[9px] font-mono text-neutral-500 tracking-tighter">
            {photo.frame}
          </span>
          <div className="flex gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-3.5 h-2 rounded-[2px] bg-[#0c0c0d] border border-neutral-700/60 shadow-inner"
              />
            ))}
          </div>
          <span className="text-[9px] font-mono text-amber-500/80 font-bold tracking-tighter">
            KODAK 400
          </span>
        </div>

        {/* Photo Container */}
        <div className="relative w-full h-[320px] md:h-[350px] bg-neutral-900 rounded overflow-hidden">
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-full object-cover transition-all duration-700 ease-out pointer-events-none"
            style={{
              filter: isHeld
                ? "grayscale(0%) contrast(105%) saturate(125%) brightness(102%)"
                : "grayscale(100%) contrast(115%) brightness(90%)",
              transform: isHeld ? "scale(1.03)" : "scale(1)",
            }}
            draggable={false}
          />

          {/* Color reveal badge overlay */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center bg-black/25 transition-opacity duration-300 pointer-events-none ${
              isHeld ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-white/90 text-xs font-medium flex items-center gap-1.5 border border-white/20 shadow-lg">
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span>Hold to Colorize</span>
            </div>
          </div>

          {/* Hold active shimmer banner */}
          {isHeld && (
            <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-amber-400/90 text-slate-950 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md pointer-events-none animate-pulse">
              <Sparkles className="w-3 h-3" />
              <span>Full Color</span>
            </div>
          )}

          {/* Label tag at bottom of photo */}
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white/80 text-[10px] font-mono backdrop-blur-sm pointer-events-none">
            {photo.label}
          </div>
        </div>

        {/* Bottom Film Sprocket Perforations */}
        <div className="flex justify-between items-center px-1 mt-2.5">
          <span className="text-[9px] font-mono text-neutral-500 tracking-tighter">
            PORTRA
          </span>
          <div className="flex gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-3.5 h-2 rounded-[2px] bg-[#0c0c0d] border border-neutral-700/60 shadow-inner"
              />
            ))}
          </div>
          <span className="text-[9px] font-mono text-neutral-500 tracking-tighter">
            SAFETY FILM
          </span>
        </div>
      </div>
    </div>
  );
};

export default function ColorCarousel() {
  const [activeId, setActiveId] = useState(null);
  const scrollRef = useRef(null);

  // Auto-scroll hint or gentle loop animation setup
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Center the first or second item on load
    el.scrollLeft = 40;
  }, []);

  return (
    <div className="w-full h-full bg-[#f6f2ec] relative flex flex-col justify-between py-8 md:py-12 overflow-hidden select-none">
      {/* Subtle vintage paper texture */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#d6cebe 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* TOP HEADER */}
      <div className="text-center px-6 z-10 pt-2">
        <span className="text-xs font-serif tracking-[0.35em] text-neutral-500 uppercase block mb-1">
          A Year in Monochrome & Color
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-neutral-800 font-normal tracking-wide">
          Happy Birthday
        </h2>
        <h3 className="text-5xl md:text-6xl font-great-vibes text-[#e11d48] mt-1 font-bold">
          {config.name}
        </h3>
        <p className="text-xs text-neutral-500 max-w-xs mx-auto mt-2 font-light">
          Tap and hold any frame below to bring the memory to life in full color ✨
        </p>
      </div>

      {/* CURVED 3D FILM-STRIP CAROUSEL */}
      <div className="relative w-full z-10 my-auto py-4">
        {/* Curved gradient vignette for 3D depth */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[#f6f2ec] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[#f6f2ec] to-transparent z-20 pointer-events-none" />

        <div
          ref={scrollRef}
          className="w-full flex gap-4 overflow-x-auto px-8 py-4 hide-scrollbar snap-x snap-mandatory scroll-smooth"
          style={{
            perspective: "1000px",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {carouselPhotos.map((photo, i) => (
            <div key={photo.id} className="snap-center">
              <FilmPhotoCard
                photo={photo}
                index={i}
                activeId={activeId}
                setActiveId={setActiveId}
              />
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM HINT */}
      <div className="text-center z-10 pb-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-neutral-300 text-neutral-600 text-xs shadow-sm">
          <span>🎞️ Swipe horizontally to browse film strip</span>
        </div>
      </div>
    </div>
  );
}
