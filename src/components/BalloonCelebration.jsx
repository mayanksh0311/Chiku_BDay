import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { config } from "../constants";

const balloonColors = [
  { bg: "from-rose-500 via-pink-500 to-rose-600", border: "rgba(244,63,94,0.4)", highlight: "#fbcfe8", hex: "#f43f5e" },
  { bg: "from-amber-400 via-yellow-400 to-amber-500", border: "rgba(245,158,11,0.4)", highlight: "#fef08a", hex: "#f59e0b" },
  { bg: "from-sky-400 via-blue-500 to-indigo-600", border: "rgba(56,189,248,0.4)", highlight: "#bae6fd", hex: "#0ea5e9" },
  { bg: "from-emerald-400 via-teal-500 to-green-600", border: "rgba(52,211,153,0.4)", highlight: "#a7f3d0", hex: "#10b981" },
  { bg: "from-purple-500 via-violet-500 to-indigo-600", border: "rgba(168,85,247,0.4)", highlight: "#e9d5ff", hex: "#a855f7" },
  { bg: "from-orange-400 via-amber-500 to-red-500", border: "rgba(249,115,22,0.4)", highlight: "#fed7aa", hex: "#f97316" },
  { bg: "from-fuchsia-400 via-pink-500 to-rose-500", border: "rgba(232,121,249,0.4)", highlight: "#f5d0fe", hex: "#d946ef" },
];

const popMessages = ["POP! 💥", "Happy 26! 🎂", "+1 Wish 🌟", "Love You 💖", "Pure Magic ✨", "Cheers 🥂", "Queen 👑"];

export default function BalloonCelebration() {
  const letters = Array.from("Happy Birthday");
  const [poppedBalloons, setPoppedBalloons] = useState({});
  const [popEvents, setPopEvents] = useState([]);
  const audioCtxRef = useRef(null);

  // Synthesize an authentic, tactile balloon "POP!" sound using Web Audio API
  const playRealisticPopSound = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Fast, snappy pitch drop: 260Hz -> 30Hz in 0.07s
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.07);

      gain.gain.setValueAtTime(0.28, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio not supported / blocked, ignore
    }
  };

  // Generate 26 stable balloons with various sizes and speeds
  const initialBalloons = useMemo(() => {
    return Array.from({ length: 26 }).map((_, i) => ({
      id: i,
      x: (i * 3.8 + (Math.random() * 4)) % 92 + 4, // Spread evenly across 4% - 96% width
      color: balloonColors[i % balloonColors.length],
      scale: 0.75 + Math.random() * 0.45,
      speed: 7 + Math.random() * 5,
      delay: Math.random() * 8,
      sway: 15 + Math.random() * 15,
    }));
  }, []);

  const handleBalloonTap = (e, balloon) => {
    e.stopPropagation();
    playRealisticPopSound();

    const rect = e.currentTarget.getBoundingClientRect();
    const eventX = rect.left + rect.width / 2;
    const eventY = rect.top + rect.height / 2;

    // Generate 12 realistic shredded rubber fragments flying radially outward
    const shards = Array.from({ length: 12 }).map((_, idx) => {
      const angle = (idx / 12) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const velocity = 65 + Math.random() * 95;
      return {
        id: idx,
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity + 35, // Add gravity pull downwards
        rotate: Math.random() * 720 - 360,
        scale: 0.5 + Math.random() * 0.8,
        width: 8 + Math.random() * 14,
        height: 5 + Math.random() * 8,
      };
    });

    const newPop = {
      id: Date.now() + Math.random(),
      x: eventX,
      y: eventY,
      msg: popMessages[Math.floor(Math.random() * popMessages.length)],
      color: balloon.color.hex,
      highlight: balloon.color.highlight,
      shards,
    };

    setPopEvents((prev) => [...prev.slice(-6), newPop]);
    setPoppedBalloons((prev) => ({ ...prev, [balloon.id]: true }));

    // Respawn balloon after 3.5 seconds
    setTimeout(() => {
      setPoppedBalloons((prev) => {
        const next = { ...prev };
        delete next[balloon.id];
        return next;
      });
    }, 3500);
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#0a0f1d] via-[#111936] to-[#0d1424] relative overflow-hidden flex flex-col items-center justify-center select-none">
      {/* Ambient background particles */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Top instruction badge */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-white/80 text-[11px] font-medium tracking-wide backdrop-blur-md border border-white/15 shadow-sm">
          🎈 Tap any balloon to pop!
        </span>
      </div>

      {/* FLOATING REALISTIC BALLOONS */}
      {initialBalloons.map((balloon) => {
        if (poppedBalloons[balloon.id]) return null;

        return (
          <motion.div
            key={balloon.id}
            onClick={(e) => handleBalloonTap(e, balloon)}
            onTouchStart={(e) => handleBalloonTap(e, balloon)}
            className="absolute bottom-[-140px] cursor-pointer touch-none z-10"
            style={{
              left: `${balloon.x}%`,
              transform: `scale(${balloon.scale})`,
            }}
            initial={{ y: 0 }}
            animate={{
              y: -window.innerHeight - 300,
              x: [0, balloon.sway, -balloon.sway, balloon.sway * 0.5, 0],
              rotate: [0, 4, -4, 2, 0],
            }}
            transition={{
              y: {
                duration: balloon.speed,
                repeat: Infinity,
                ease: "linear",
                delay: balloon.delay,
              },
              x: {
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotate: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            whileHover={{ scale: balloon.scale * 1.15 }}
            whileTap={{ scale: balloon.scale * 1.25 }} // Slight elastic swell on contact right before burst
          >
            {/* 3D Glossy Balloon Body */}
            <div
              className={`w-14 h-18 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] bg-gradient-to-tr ${balloon.color.bg} shadow-lg relative overflow-hidden`}
              style={{
                boxShadow: `0 10px 25px -5px ${balloon.color.border}, inset 0 -8px 15px rgba(0,0,0,0.35)`,
              }}
            >
              {/* Glossy highlight reflection */}
              <div
                className="absolute top-2 left-2.5 w-4 h-6 rounded-[50%] bg-white/50 blur-[0.8px] transform -rotate-25"
                style={{
                  background: "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)",
                }}
              />
              {/* Secondary bottom soft reflection */}
              <div className="absolute bottom-1.5 right-2 w-3 h-2 rounded-full bg-white/20 blur-[1px]" />
            </div>

            {/* Balloon Knot */}
            <div className="w-2.5 h-2 mx-auto -mt-0.5 rounded-b-sm bg-inherit opacity-90 filter brightness-90 shadow-sm" />

            {/* Balloon String (SVG curve) */}
            <svg
              className="w-6 h-20 -mt-1 mx-auto overflow-visible opacity-50 pointer-events-none"
              viewBox="0 0 24 80"
              fill="none"
            >
              <path
                d="M12 0 C 8 20, 16 40, 12 60 C 9 70, 14 80, 12 85"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.2"
              />
            </svg>
          </motion.div>
        );
      })}

      {/* REALISTIC BALLOON POPPING ANIMATION (Rubber Shards + Shockwave + Confetti) */}
      <AnimatePresence>
        {popEvents.map((pop) => (
          <div
            key={pop.id}
            className="fixed pointer-events-none z-50 flex items-center justify-center"
            style={{ left: pop.x, top: pop.y }}
          >
            {/* 1. Fast Air Expansion Shockwave */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0.95 }}
              animate={{ scale: 2.8, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute w-20 h-20 rounded-full border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            />

            {/* 2. Realistic Shredded Rubber Fragments Scattering Radially */}
            {pop.shards.map((shard) => (
              <motion.div
                key={shard.id}
                initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                animate={{
                  x: shard.x,
                  y: shard.y,
                  rotate: shard.rotate,
                  scale: shard.scale,
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  backgroundColor: pop.color,
                  width: shard.width,
                  height: shard.height,
                  borderRadius: "35% 65% 60% 40% / 30% 30% 70% 70%", // Organic torn rubber edge
                  boxShadow: `0 0 8px ${pop.color}`,
                }}
              />
            ))}

            {/* 3. Golden Confetti Stars */}
            {Array.from({ length: 8 }).map((_, idx) => {
              const angle = (idx / 8) * Math.PI * 2;
              const dist = 40 + Math.random() * 55;
              return (
                <motion.div
                  key={idx}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist + 15,
                    scale: [0, 1.2, 0],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-yellow-300 shadow-[0_0_6px_#fde047]"
                />
              );
            })}

            {/* 4. Floating Pop Celebration Badge */}
            <motion.div
              initial={{ opacity: 1, scale: 0.6, y: 0 }}
              animate={{ opacity: 0, scale: 1.25, y: -50 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="absolute z-50 flex items-center justify-center whitespace-nowrap"
            >
              <span
                className="px-3 py-1 rounded-full text-xs font-black shadow-xl backdrop-blur-md"
                style={{
                  backgroundColor: "rgba(0,0,0,0.85)",
                  color: pop.highlight,
                  border: `1.5px solid ${pop.color}`,
                  boxShadow: `0 0 15px ${pop.color}`,
                }}
              >
                {pop.msg}
              </span>
            </motion.div>
          </div>
        ))}
      </AnimatePresence>

      {/* CENTER CELEBRATORY TEXT */}
      <div className="z-20 text-center px-4 max-w-sm flex flex-col items-center">
        {/* Milestone badge: 26 YEARS */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400/25 to-rose-400/25 border border-amber-300/40 text-amber-300 text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-300" />
          <span>CELEBRATING {config.ageTo} YEARS</span>
        </motion.div>

        {/* Bouncy Happy Birthday Letters (Responsive Single-Line or Double-Group) */}
        <div className="flex flex-wrap justify-center gap-x-1 gap-y-1 mb-2">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              className={`text-3xl sm:text-4xl md:text-5xl font-black text-white ${
                letter === " " ? "w-2 sm:w-3" : ""
              } inline-block drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]`}
              initial={{ y: -60, opacity: 0, rotate: (i % 2 === 0 ? -12 : 12) }}
              whileInView={{ y: 0, opacity: 1, rotate: 0 }}
              viewport={{ once: false }}
              transition={{
                type: "spring",
                damping: 10,
                stiffness: 240,
                delay: i * 0.035,
              }}
              whileHover={{ scale: 1.25, rotate: 5, color: "#fde047" }}
              whileTap={{ scale: 1.25, rotate: -5, color: "#fde047" }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Big Cursive Name */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 14 }}
          className="text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-pink-300 font-great-vibes mt-2 drop-shadow-[0_4px_20px_rgba(251,191,36,0.6)]"
        >
          {config.name}!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="text-white/70 text-xs md:text-sm font-light mt-4 max-w-[260px] leading-relaxed"
        >
          {config.wishes}
        </motion.p>
      </div>

      {/* Subtle bottom indicator */}
      <div className="absolute bottom-6 flex flex-col items-center gap-1 text-white/40 text-[10px] tracking-widest uppercase z-10 pointer-events-none">
        <span>Scroll to explore</span>
        <div className="w-1 h-3 rounded-full bg-white/40 animate-bounce" />
      </div>
    </div>
  );
}
