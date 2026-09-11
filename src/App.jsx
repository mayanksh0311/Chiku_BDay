import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Sparkles, Wifi, Battery, Signal } from "lucide-react";
import AgeReveal from "./components/AgeReveal";
import BalloonCelebration from "./components/BalloonCelebration";
import ColorCarousel from "./components/ColorCarousel";
import InteractivePolaroid from "./components/InteractivePolaroid";
import Scrapbook from "./components/Scrapbook";
import StarryGalaxy from "./components/StarryGalaxy";

const SECTIONS = [
  { id: 0, label: "Age Reveal", icon: "✨" },
  { id: 1, label: "Celebration", icon: "🎈" },
  { id: 2, label: "Film Strip", icon: "🎞️" },
  { id: 3, label: "Polaroids", icon: "📌" },
  { id: 4, label: "Scrapbook", icon: "📖" },
  { id: 5, label: "Galaxy", icon: "🌌" },
];

export default function App() {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);

  // Track active section on scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollPos = el.scrollTop;
      const height = el.clientHeight;
      const index = Math.round(scrollPos / height);
      setActiveSection(Math.min(index, SECTIONS.length - 1));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({
      top: index * el.clientHeight,
      behavior: "smooth",
    });
  };

  // Harmonious ambient synthesizer for birthday melody using Web Audio API
  const toggleAudio = () => {
    if (isAudioPlaying) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      if (timerRef.current) clearInterval(timerRef.current);
      setIsAudioPlaying(false);
      return;
    }

    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      setIsAudioPlaying(true);

      // Birthday notes melody (C4, D4, E4, F4, G4, A4, B4, C5)
      const notes = [
        261.63, 261.63, 293.66, 261.63, 349.23, 329.63, // Happy Birthday to you
        261.63, 261.63, 293.66, 261.63, 392.00, 349.23, // Happy Birthday to you
        261.63, 261.63, 523.25, 440.00, 349.23, 329.63, 293.66, // Happy Birthday dear Chiku
        466.16, 466.16, 440.00, 349.23, 392.00, 349.23  // Happy Birthday to you
      ];

      let noteIdx = 0;
      const playTone = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === "closed") return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(notes[noteIdx % notes.length], ctx.currentTime);
        
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.65);
        noteIdx++;
      };

      playTone();
      timerRef.current = setInterval(playTone, 650);
    } catch (e) {
      console.log("Audio not supported or blocked:", e);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#05070e] flex items-center justify-center p-0 md:p-4 overflow-hidden select-none">
      {/* Background ambient lighting for desktop display */}
      <div className="hidden md:block absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15)_0%,transparent_60%)] pointer-events-none" />
      <div className="hidden md:block absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* MOBILE PHONE FRAME CONTAINER */}
      <div className="w-full h-full md:w-[410px] md:h-[860px] md:max-h-[92vh] md:rounded-[46px] md:ring-[10px] md:ring-[#1e2333] md:shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(99,102,241,0.2)] bg-black overflow-hidden relative flex flex-col">
        
        {/* SIMULATED PHONE STATUS BAR (Mobile Notch / Island) */}
        <div className="absolute top-0 left-0 right-0 h-9 z-50 flex items-center justify-between px-6 text-white/80 text-[11px] font-medium pointer-events-none">
          <span className="font-semibold tracking-tight">9:11</span>
          
          {/* Camera Notch / Island */}
          <div className="w-24 h-4.5 bg-black rounded-full border border-white/10 shadow-inner flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-neutral-900 border border-white/20 mr-2" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
          </div>

          <div className="flex items-center gap-1.5">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* FLOATING TOP CONTROLS: Sound Toggle & Quick Title */}
        <div className="absolute top-11 right-4 z-50 flex items-center gap-2">
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-full backdrop-blur-md border transition-all active:scale-90 cursor-pointer ${
              isAudioPlaying
                ? "bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.6)]"
                : "bg-black/50 text-white/70 border-white/20 hover:bg-black/70 hover:text-white"
            }`}
            title={isAudioPlaying ? "Mute Birthday Music" : "Play Birthday Music"}
          >
            {isAudioPlaying ? (
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* FLOATING VERTICAL SECTION INDICATOR DOTS */}
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 pointer-events-auto">
          {SECTIONS.map((sec, idx) => {
            const isActive = activeSection === idx;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(idx)}
                className={`group relative flex items-center justify-center transition-all cursor-pointer ${
                  isActive ? "scale-125" : "hover:scale-110 opacity-40 hover:opacity-80"
                }`}
                title={sec.label}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all ${
                    isActive
                      ? "bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.9)] w-2.5 h-2.5"
                      : "bg-white"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* MAIN SCROLLABLE 6-SECTION PORTRAIT CONTAINER */}
        <div
          ref={containerRef}
          className="w-full h-full overflow-y-scroll snap-y snap-mandatory bg-black hide-scrollbar overscroll-none"
          style={{
            scrollSnapType: "y mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* SECTION 1: Age Reveal */}
          <section className="h-full w-full snap-start relative flex-shrink-0">
            <AgeReveal />
          </section>

          {/* SECTION 2: Balloon Celebration */}
          <section className="h-full w-full snap-start relative flex-shrink-0">
            <BalloonCelebration />
          </section>

          {/* SECTION 3: Color-Reveal Film Strip Carousel */}
          <section className="h-full w-full snap-start relative flex-shrink-0">
            <ColorCarousel />
          </section>

          {/* SECTION 4: Interactive Polaroid Corkboard */}
          <section className="h-full w-full snap-start relative flex-shrink-0">
            <InteractivePolaroid />
          </section>

          {/* SECTION 5: 3D Swipeable Scrapbook */}
          <section className="h-full w-full snap-start relative flex-shrink-0">
            <Scrapbook />
          </section>

          {/* SECTION 6: 3D Starry Galaxy */}
          <section className="h-full w-full snap-start relative flex-shrink-0">
            <StarryGalaxy />
          </section>
        </div>

        {/* BOTTOM HOME BAR (iPhone style) */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  );
}
