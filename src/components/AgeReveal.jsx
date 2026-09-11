import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RotateCcw, Flame } from "lucide-react";
import { config } from "../constants";

export default function AgeReveal() {
  const [stage, setStage] = useState(0); // 0: 25 steady, 1: 25 burning on fire, 2: explosion/flash, 3: 26 reveal
  const [key, setKey] = useState(0);

  const startSequence = useCallback(() => {
    setStage(0);
    const t1 = setTimeout(() => {
      setStage(1); // Catch fire & burn
    }, 1800);
    const t2 = setTimeout(() => {
      setStage(2); // Inferno blast & flash
    }, 3600);
    const t3 = setTimeout(() => {
      setStage(3); // Glorious 26 reveal
    }, 4100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    const cleanup = startSequence();
    return cleanup;
  }, [startSequence, key]);

  const handleReplay = () => {
    setKey((prev) => prev + 1);
  };

  // Rising embers & fire sparks for the burning animation (Stage 1)
  const fireEmbers = Array.from({ length: 45 }).map((_, i) => {
    const xOffset = (Math.random() - 0.5) * 220; // Spread across the width of "25"
    const riseDistance = 140 + Math.random() * 260;
    const size = Math.random() * 7 + 3;
    const duration = 0.8 + Math.random() * 0.9;
    const delay = Math.random() * 1.5;
    const colors = ["#ff2200", "#ff4500", "#ff8c00", "#ffd700", "#ffffff", "#ff0055"];
    return {
      id: i,
      x: xOffset,
      rise: riseDistance,
      size,
      duration,
      delay,
      color: colors[i % colors.length],
    };
  });

  // Pre-calculate 70 varied fire & gold explosion particles for Stage 2
  const explosionParticles = Array.from({ length: 70 }).map((_, i) => {
    const angle = (i / 70) * Math.PI * 2 + (Math.random() * 0.2);
    const distance = 130 + Math.random() * 280;
    const colors = [
      "#ff4500", "#f59e0b", "#fbbf24", "#ef4444", 
      "#ec4899", "#8b5cf6", "#ffffff", "#f97316"
    ];
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      color: colors[i % colors.length],
      size: Math.random() * 9 + 4,
      rotation: Math.random() * 720 - 360,
      isStar: i % 3 === 0,
      duration: 1.2 + Math.random() * 0.8,
    };
  });

  return (
    <div className="w-full h-full bg-[#050508] relative flex flex-col items-center justify-center overflow-hidden select-none">
      {/* Background ambient radial glow (shifts to deep fiery red during burn) */}
      <motion.div
        animate={{
          background:
            stage === 1
              ? "radial-gradient(circle at center, rgba(239,68,68,0.3) 0%, rgba(180,83,9,0.15) 50%, transparent 75%)"
              : stage >= 2
              ? "radial-gradient(circle at center, rgba(245,158,11,0.25) 0%, rgba(139,92,246,0.15) 60%, transparent 75%)"
              : "radial-gradient(circle at center, rgba(88,28,135,0.25) 0%, transparent 70%)",
        }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Subtle star speckles */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Replay Button in corner */}
      {stage >= 3 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleReplay}
          className="absolute top-6 right-6 z-40 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-xs backdrop-blur-md border border-white/15 transition-all shadow-lg cursor-pointer active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay</span>
        </motion.button>
      )}

      {/* STAGE 0 & 1: THE BURNING OF '25' */}
      <AnimatePresence mode="wait">
        {stage < 2 && (
          <motion.div
            key={`old-age-${key}`}
            className="flex flex-col items-center justify-center z-10 relative"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Top Subtitle */}
            <motion.div
              animate={
                stage === 1
                  ? { color: "#fca5a5", scale: [1, 1.05, 1] }
                  : { color: "rgba(255,255,255,0.6)" }
              }
              className="text-xs tracking-[0.4em] uppercase mb-2 font-medium flex items-center gap-1.5"
            >
              {stage === 1 && <Flame className="w-3.5 h-3.5 text-orange-500 animate-bounce" />}
              <span>{stage === 1 ? "Burning Farewell..." : "Leaving Behind"}</span>
              {stage === 1 && <Flame className="w-3.5 h-3.5 text-orange-500 animate-bounce" />}
            </motion.div>

            {/* THE NUMBER 25: Steady, then catching fire, charring, and dissolving */}
            <div className="relative flex items-center justify-center">
              <motion.div
                className={`relative ${stage === 1 ? "animate-flame-flicker" : ""}`}
                animate={
                  stage === 1
                    ? {
                        scale: [1, 1.06, 1.12, 0.7],
                        opacity: [1, 1, 0.9, 0],
                        filter: [
                          "brightness(1) drop-shadow(0 0 25px rgba(239,68,68,0.7))",
                          "brightness(1.8) drop-shadow(0 -15px 40px rgba(249,115,22,0.9))",
                          "brightness(2.4) contrast(1.6) drop-shadow(0 -25px 60px rgba(245,158,11,1))",
                          "brightness(0.3) blur(8px)",
                        ],
                      }
                    : { scale: 1, opacity: 1 }
                }
                transition={
                  stage === 1
                    ? { duration: 1.8, ease: "easeInOut" }
                    : { duration: 0.5 }
                }
              >
                <span
                  className={`text-9xl md:text-[11rem] font-black tracking-tight text-transparent bg-clip-text ${
                    stage === 1
                      ? "bg-gradient-to-t from-red-600 via-orange-500 to-amber-300"
                      : "bg-gradient-to-b from-white via-slate-200 to-slate-400"
                  } drop-shadow-[0_0_35px_rgba(255,255,255,0.35)] block`}
                >
                  {config.ageFrom}
                </span>

                {/* Fiery Underglow Glow Mask during burning */}
                {stage === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.6, 1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-red-600/50 via-orange-500/30 to-transparent blur-md pointer-events-none"
                  />
                )}
              </motion.div>

              {/* RISING FIRE EMBERS & SPARKS (Stage 1) */}
              {stage === 1 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                  {fireEmbers.map((ember) => (
                    <motion.div
                      key={ember.id}
                      initial={{
                        x: ember.x,
                        y: 40 + Math.random() * 30, // Starts at base of the number 25
                        opacity: 1,
                        scale: ember.size / 4,
                      }}
                      animate={{
                        y: -ember.rise,
                        x: ember.x + (Math.random() - 0.5) * 70,
                        opacity: [1, 0.9, 0],
                        scale: [ember.size / 4, ember.size / 2, 0],
                      }}
                      transition={{
                        duration: ember.duration,
                        delay: ember.delay,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      style={{
                        backgroundColor: ember.color,
                        boxShadow: `0 0 10px ${ember.color}, 0 0 20px #ff4500`,
                        width: ember.size,
                        height: ember.size * 1.3,
                        borderRadius: "50% 50% 30% 30%",
                      }}
                      className="absolute"
                    />
                  ))}
                </div>
              )}
            </div>

            <motion.span
              animate={
                stage === 1
                  ? { color: "#fdba74", textShadow: "0 0 15px rgba(251,146,60,0.8)" }
                  : { color: "rgba(216,180,254,0.5)" }
              }
              className="text-xs tracking-widest mt-2 font-medium"
            >
              {stage === 1 ? "TRANSFORMING INTO 26..." : `CHAPTER ${config.ageFrom}`}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 2: BRIGHT INFERNO FLASH */}
      <AnimatePresence>
        {stage === 2 && (
          <motion.div
            key="flash-effect"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.85, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-r from-orange-200 via-white to-amber-200 z-30 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* STAGE 2 & 3: PARTICLE EXPLOSION & FIRE SHOCKWAVES */}
      <AnimatePresence>
        {stage >= 2 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            {/* Fiery Golden Expanding Shockwaves */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 6.5, opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="absolute w-32 h-32 rounded-full border-4 border-orange-400/90 shadow-[0_0_35px_rgba(249,115,22,0.9)]"
            />
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 8.5, opacity: 0 }}
              transition={{ duration: 1.1, delay: 0.08, ease: "easeOut" }}
              className="absolute w-24 h-24 rounded-full border-3 border-amber-300/90 shadow-[0_0_30px_rgba(251,191,36,0.9)]"
            />
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 10.5, opacity: 0 }}
              transition={{ duration: 1.3, delay: 0.16, ease: "easeOut" }}
              className="absolute w-20 h-20 rounded-full border-2 border-rose-500/80 shadow-[0_0_25px_rgba(244,63,94,0.8)]"
            />

            {/* Radiant Fire & Gold Particles */}
            {explosionParticles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
                animate={{
                  x: p.x,
                  y: p.y,
                  scale: [0, 1.5, 0.8, 0],
                  opacity: [1, 1, 0.85, 0],
                  rotate: p.rotation,
                }}
                transition={{ duration: p.duration, ease: "easeOut" }}
                style={{
                  backgroundColor: p.isStar ? "transparent" : p.color,
                  width: p.size,
                  height: p.size,
                  borderRadius: p.isStar ? "0" : "50%",
                  boxShadow: `0 0 14px ${p.color}`,
                }}
                className="absolute flex items-center justify-center"
              >
                {p.isStar && (
                  <Sparkles
                    style={{ color: p.color, width: p.size * 1.7, height: p.size * 1.7 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* STAGE 3: THE GLORIOUS 26 REVEAL */}
      <AnimatePresence>
        {stage >= 3 && (
          <motion.div
            key={`new-age-${key}`}
            initial={{ scale: 0.1, opacity: 0, rotate: -15, filter: "blur(12px)" }}
            animate={{ scale: 1, opacity: 1, rotate: 0, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              damping: 12,
              stiffness: 180,
              mass: 0.8,
            }}
            className="flex flex-col items-center justify-center z-20 text-center px-4 max-w-full"
          >
            {/* Milestone Badge */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/25 via-rose-500/20 to-purple-500/25 border border-amber-400/50 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-2.5 backdrop-blur-md shadow-[0_0_20px_rgba(251,191,36,0.35)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span>Chapter {config.ageTo} Begins ✨</span>
            </motion.div>

            {/* Glowing Majestic 26 */}
            <div className="relative">
              <h1 className="text-9xl md:text-[11.5rem] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 via-amber-400 to-rose-500 drop-shadow-[0_0_45px_rgba(245,158,11,0.7)]">
                {config.ageTo}
              </h1>
              {/* Shimmer reflection */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/15 to-transparent pointer-events-none" />
            </div>

            {/* FIXED ONE-LINE BIRTHDAY HEADER WITH BETTER LUXURY FONTS */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="whitespace-nowrap flex items-center justify-center gap-2 mt-2 px-2 max-w-full"
            >
              <span className="text-xl sm:text-2xl md:text-3xl font-serif font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-300 uppercase drop-shadow-[0_2px_12px_rgba(245,158,11,0.5)]">
                Happy Birthday,
              </span>
              <span className="text-3xl sm:text-4xl md:text-5xl font-great-vibes text-rose-300 drop-shadow-[0_2px_20px_rgba(244,63,94,0.7)] pr-1">
                {config.name}!
              </span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.8 }}
              className="text-white/70 text-xs md:text-sm max-w-xs mt-2 font-light tracking-wide"
            >
              {config.subtitle}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Swipe Hint */}
      {stage >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-7 flex flex-col items-center gap-1 text-white/50 text-[10px] tracking-[0.25em] uppercase z-20 pointer-events-none"
        >
          <span className="animate-pulse">Swipe Up</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-4 h-7 rounded-full border border-white/30 flex justify-center pt-1"
          >
            <div className="w-1 h-1.5 rounded-full bg-white/70 animate-bounce" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
