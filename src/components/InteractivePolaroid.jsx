import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, RotateCcw } from "lucide-react";
import { polaroids } from "../constants";

const PushPin = ({ color = "#ef4444" }) => (
  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center">
    {/* Round pin head */}
    <div
      className="w-4 h-4 rounded-full shadow-md border border-white/40 relative"
      style={{
        backgroundColor: color,
        boxShadow: `0 4px 8px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.6)`,
      }}
    >
      {/* Specular highlight */}
      <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white/70" />
    </div>
    {/* Pin shadow on cork */}
    <div className="w-2 h-1 rounded-full bg-black/30 blur-[1px] mt-0.5" />
  </div>
);

const PolaroidCard = ({ item, constraintsRef, onBringToFront, zIndex }) => {
  const [liked, setLiked] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    setLiked((prev) => !prev);

    // Spawn 3 floating hearts
    const hearts = Array.from({ length: 3 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 40,
    }));
    setFloatingHearts((prev) => [...prev, ...hearts]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => !hearts.includes(h)));
    }, 1000);
  };

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      dragMomentum={false}
      onDragStart={onBringToFront}
      onPointerDown={onBringToFront}
      initial={{ x: item.x, y: item.y, rotate: item.rotation, scale: 1 }}
      whileDrag={{ scale: 1.08, rotate: 0, cursor: "grabbing" }}
      style={{ zIndex }}
      className="absolute cursor-grab select-none touch-none"
    >
      <div className="relative bg-[#faf7f2] p-2.5 pb-8 rounded-sm shadow-[0_12px_28px_rgba(0,0,0,0.35)] border border-neutral-200/80 w-36 md:w-44 transition-shadow hover:shadow-[0_18px_36px_rgba(0,0,0,0.45)]">
        {/* Push Pin */}
        <PushPin color={item.pinColor} />

        {/* Photo Canvas */}
        <div className="w-full h-36 md:h-44 bg-neutral-800 rounded-xs overflow-hidden shadow-inner relative">
          <img
            src={item.src}
            alt={item.caption}
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
          {/* Polaroid paper glare */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none" />
        </div>

        {/* Caption & Interactive Heart Icon */}
        <div className="mt-2.5 flex items-center justify-between px-1">
          <span className="font-handwriting text-base md:text-lg text-neutral-800 font-bold tracking-tight">
            {item.caption}
          </span>
          <div className="relative">
            <button
              onClick={handleHeartClick}
              onTouchStart={handleHeartClick}
              className="p-1 rounded-full hover:bg-neutral-100 transition-transform active:scale-125 cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  liked
                    ? "text-red-500 fill-red-500"
                    : "text-neutral-400 hover:text-red-400"
                }`}
              />
            </button>

            {/* Floating Mini Hearts on like */}
            <AnimatePresence>
              {floatingHearts.map((h) => (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 1, y: 0, x: h.x, scale: 0.8 }}
                  animate={{ opacity: 0, y: -45, scale: 1.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute -top-2 left-1 text-red-500 text-xs pointer-events-none z-50"
                >
                  ❤️
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function InteractivePolaroid() {
  const containerRef = useRef(null);
  const [zOrder, setZOrder] = useState(polaroids.map((p) => p.id));
  const [resetKey, setResetKey] = useState(0);

  const bringToFront = (id) => {
    setZOrder((prev) => [...prev.filter((item) => item !== id), id]);
  };

  const handleReset = () => {
    setResetKey((prev) => prev + 1);
    setZOrder(polaroids.map((p) => p.id));
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col select-none">
      {/* Corkboard Textured Background */}
      <div className="absolute inset-0 corkboard-texture" />

      {/* Wooden Frame Edge Styling */}
      <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] border-[10px] md:border-[14px] border-[#5c3a21] pointer-events-none z-30" />

      {/* Header Bar */}
      <div className="pt-6 pb-2 px-6 text-center z-20 flex justify-between items-center pointer-events-auto">
        <div className="w-8" />
        <div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Memory Corkboard
          </h2>
          <p className="text-[11px] md:text-xs text-amber-200/80 font-medium drop-shadow-sm mt-0.5">
            📌 Drag photos around • Tap ❤️ to like
          </p>
        </div>
        <button
          onClick={handleReset}
          className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-amber-200 backdrop-blur-sm border border-amber-300/30 shadow-md transition-all active:scale-95 cursor-pointer"
          title="Reset Polaroid Positions"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bounded Draggable Playground */}
      <div
        ref={containerRef}
        key={resetKey}
        className="flex-1 w-full h-full relative p-4 overflow-hidden z-10"
      >
        {polaroids.map((p) => {
          const index = zOrder.indexOf(p.id);
          return (
            <PolaroidCard
              key={p.id}
              item={p}
              constraintsRef={containerRef}
              zIndex={index + 10}
              onBringToFront={() => bringToFront(p.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
