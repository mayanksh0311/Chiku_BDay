import React, { useRef, useState, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  Mail,
  MailOpen,
  Maximize2,
  X,
  Heart,
  ZoomIn,
} from "lucide-react";
import { scrapbookPages, defaultLetter } from "../constants";

// Washi Tape Decoration Component
const WashiTape = ({ className = "" }) => (
  <div
    className={`absolute h-4 bg-amber-100/85 border-y border-amber-300/70 shadow-xs backdrop-blur-xs -translate-x-1/2 rotate-[-2deg] z-20 pointer-events-none ${className}`}
    style={{
      clipPath: "polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0 100%, 5% 50%)",
    }}
  />
);

// Vintage Postage Stamp Component
const PostageStamp = ({ label = "SPECIAL", price = "26th" }) => (
  <div className="w-10 h-12 bg-white p-1 border border-neutral-300 shadow-sm flex flex-col items-center justify-between text-center rotate-3 pointer-events-none">
    <div className="w-full h-6 bg-red-100/70 border border-dashed border-red-400/80 flex items-center justify-center text-[7px] font-mono text-red-700 font-bold">
      {label}
    </div>
    <span className="text-[6.5px] font-mono text-neutral-500 font-semibold">{price}</span>
  </div>
);

const Page = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="bg-[#f9f5ec] shadow-[inset_0_0_25px_rgba(0,0,0,0.08)] border border-[#e6dbc9] overflow-hidden select-none h-full"
    >
      <div className="w-full h-full p-3.5 relative flex flex-col justify-between overflow-hidden">
        {props.children}
      </div>
    </div>
  );
});

Page.displayName = "Page";

export default function Scrapbook() {
  const bookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Zoom / Lightbox modal state for viewing full uncropped photos
  const [zoomPhoto, setZoomPhoto] = useState(null);

  // Letter states
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);

  const flipPrev = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const flipNext = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const onFlip = (e) => {
    setCurrentPage(e.data);
  };

  return (
    <div className="w-full h-full bg-[#18181b] relative flex flex-col items-center justify-between py-5 overflow-hidden select-none">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.1)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Header Bar */}
      <div className="z-10 text-center px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-200/90 text-xs font-medium backdrop-blur-md border border-white/10 shadow-sm mb-1">
          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
          <span>3D Interactive Memory Book</span>
        </div>
        <p className="text-[11px] text-white/50">
          Swipe page corners or use the arrows below to flip
        </p>
      </div>

      {/* 3D BOOK CONTAINER */}
      <div className="w-[90vw] max-w-[345px] h-[485px] relative perspective-1500 my-auto flex items-center justify-center">
        <HTMLFlipBook
          width={320}
          height={470}
          size="stretch"
          minWidth={280}
          maxWidth={360}
          minHeight={420}
          maxHeight={520}
          maxShadowOpacity={0.6}
          showCover={true}
          mobileScrollSupport={true}
          usePortrait={true}
          disableFlipByClick={true}
          clickEventForward={true}
          onFlip={onFlip}
          className="shadow-[0_20px_50px_rgba(0,0,0,0.8)] mx-auto rounded-lg"
          ref={bookRef}
        >
          {scrapbookPages.map((page) => (
            <Page key={page.id}>
              {page.type === "cover" ? (
                /* VINTAGE HARDCOVER: SKETCHBOOK */
                <div className="w-full h-full bg-gradient-to-br from-[#78350f] via-[#59280d] to-[#451a03] p-5 rounded-r-lg border-l-[12px] border-[#290e02] flex flex-col items-center justify-between text-[#fef3c7] relative overflow-hidden shadow-inner">
                  {/* Decorative embossed frame */}
                  <div className="absolute inset-3 border-2 border-dashed border-[#d97706]/40 rounded pointer-events-none" />

                  {/* Top Corner Stickers */}
                  <div className="w-full flex justify-between items-start z-10">
                    <span className="text-3xl filter drop-shadow-md">🦋</span>
                    <PostageStamp label="EDITION" price="26th" />
                  </div>

                  {/* Centered Title */}
                  <div className="text-center z-10 my-auto transform -rotate-3">
                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-300/80 block mb-1">
                      MEMORIES & SMILES
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-400 drop-shadow-[0_3px_10px_rgba(0,0,0,0.8)]">
                      {page.title}
                    </h1>
                    <div className="w-16 h-0.5 bg-amber-400/60 mx-auto my-2" />
                    <p className="text-xs font-handwriting text-amber-200/90 text-base">
                      {page.subtitle}
                    </p>
                  </div>

                  {/* Bottom Stickers */}
                  <div className="w-full flex justify-between items-end z-10">
                    <span className="text-3xl filter drop-shadow-md">🌸</span>
                    <div className="px-2.5 py-1 rounded bg-black/40 text-[10px] font-mono text-amber-300/90 border border-amber-500/30">
                      SWIPE TO OPEN →
                    </div>
                    <span className="text-3xl filter drop-shadow-md">✨</span>
                  </div>
                </div>
              ) : page.type === "backCover" ? (
                /* BACK COVER */
                <div className="w-full h-full bg-gradient-to-bl from-[#78350f] to-[#451a03] p-6 rounded-l-lg border-r-[12px] border-[#290e02] flex flex-col items-center justify-center text-center text-[#fef3c7] relative">
                  <span className="text-4xl mb-3">💖</span>
                  <h3 className="text-2xl font-serif font-bold text-amber-200">
                    {page.title}
                  </h3>
                  <p className="text-xs font-handwriting text-base text-amber-100/80 mt-2 max-w-[200px]">
                    {page.note}
                  </p>
                  <span className="text-xs font-mono text-amber-400/60 mt-6">
                    Chapter 26 Begins Here ✨
                  </span>
                </div>
              ) : page.type === "letter" ? (
                /* CUSTOM LETTER SEGMENT (VINTAGE WAX-SEALED ENVELOPE & PARCHMENT) */
                <div className="w-full h-full relative flex flex-col justify-between p-1">
                  {/* Page Top Header */}
                  <div className="flex justify-between items-center border-b border-amber-900/15 pb-1">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                      {page.date}
                    </span>
                    <span className="text-xs font-serif italic text-amber-900 font-bold flex items-center gap-1">
                      <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                      {page.title}
                    </span>
                    <div className="flex gap-1 text-sm">
                      {page.stickers?.slice(0, 2).map((st, i) => (
                        <span key={i}>{st}</span>
                      ))}
                    </div>
                  </div>

                  {/* LETTER INTERACTIVE CONTENT */}
                  <div className="relative w-full flex-1 my-2 flex flex-col items-center justify-center">
                    {!isLetterOpen ? (
                      /* CLOSED VINTAGE ENVELOPE */
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsLetterOpen(true);
                        }}
                        onPointerDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        className="w-full h-[310px] bg-gradient-to-br from-[#7f1d1d] via-[#991b1b] to-[#581c87] rounded-lg p-4 flex flex-col items-center justify-between border-2 border-amber-300/40 shadow-xl relative overflow-hidden cursor-pointer group transition-transform active:scale-[0.98] text-left appearance-none"
                      >
                        {/* Washi Tape at top */}
                        <WashiTape className="top-[-6px] left-[50%] w-24" />

                        {/* Envelope flap aesthetic lines */}
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_45%,rgba(255,255,255,0.06)_50%,transparent_55%)] pointer-events-none" />
                        <div className="absolute top-0 left-0 right-0 h-28 border-b-2 border-dashed border-amber-300/30 [clip-path:polygon(0_0,100%_0,50%_100%)] bg-black/20 pointer-events-none" />

                        {/* Top Envelope Info */}
                        <div className="w-full flex justify-between items-start z-10 pt-2">
                          <span className="text-xs font-mono text-amber-200/80 tracking-widest uppercase">
                            AIR MAIL ✈️
                          </span>
                          <PostageStamp label="LOVE" price="26th" />
                        </div>

                        {/* Wax Seal in Center */}
                        <div className="my-auto z-20 flex flex-col items-center gap-2">
                          <div className="relative group-hover:scale-110 transition-transform">
                            {/* Wax Seal Outer Glow */}
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-rose-700 to-red-950 border-2 border-amber-300 shadow-[0_8px_25px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center text-amber-100 ring-4 ring-red-900/40">
                              <span className="font-serif font-black text-xl tracking-tight text-amber-200 drop-shadow-md">
                                C 26
                              </span>
                              <span className="text-[7px] font-mono tracking-widest text-amber-300 uppercase -mt-0.5">
                                SEALED
                              </span>
                            </div>
                            <Sparkles className="w-4 h-4 text-amber-300 absolute -top-1 -right-1 animate-spin" />
                          </div>

                          <div className="text-center">
                            <span className="font-serif italic font-bold text-base text-amber-100 drop-shadow">
                              {page.envelopeTitle || "For Chiku 💌"}
                            </span>
                            <span className="block text-[10px] font-handwriting text-amber-200/90 text-sm mt-0.5">
                              {page.envelopeSubtitle || "Tap wax seal to open letter"}
                            </span>
                          </div>
                        </div>

                        {/* Bottom prompt badge */}
                        <div className="z-10 w-full flex justify-center">
                          <div className="px-3 py-1 rounded-full bg-black/40 text-[9.5px] font-mono text-amber-200/90 border border-amber-400/30 backdrop-blur-xs flex items-center gap-1.5">
                            <MailOpen className="w-3 h-3 text-amber-300" />
                            <span>CLICK TO READ LETTER</span>
                          </div>
                        </div>
                      </button>
                    ) : (
                      /* OPENED HANDWRITTEN PARCHMENT LETTER */
                      <div
                        className="w-full h-[310px] bg-[#fffdfa] rounded-sm p-3.5 border border-amber-800/25 shadow-md flex flex-col justify-between relative overflow-hidden select-text"
                        onPointerDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                      >
                        {/* Antique paper texture & lines */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-40"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(transparent, transparent 23px, rgba(180, 83, 9, 0.08) 24px)",
                          }}
                        />

                        {/* Washi tape at top */}
                        <WashiTape className="top-[-6px] left-[50%] w-20" />

                        {/* Letter Header */}
                        <div className="relative z-10 flex justify-between items-center pb-1 border-b border-amber-900/10">
                          <h4 className="font-serif italic font-bold text-amber-950 text-sm">
                            {defaultLetter.salutation}
                          </h4>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsLetterOpen(false);
                            }}
                            className="p-1 rounded-full hover:bg-amber-100 text-amber-800 text-[10px] flex items-center gap-1 font-mono transition-colors cursor-pointer"
                            title="Fold into Envelope"
                          >
                            <Mail className="w-3 h-3" />
                            <span>Fold</span>
                          </button>
                        </div>

                        {/* Letter Body */}
                        <div
                          className="relative z-10 my-1 overflow-y-auto max-h-[195px] pr-1 space-y-2 hide-scrollbar overscroll-contain"
                          onPointerDown={(e) => e.stopPropagation()}
                          onTouchStart={(e) => e.stopPropagation()}
                          onTouchMove={(e) => e.stopPropagation()}
                          onWheel={(e) => e.stopPropagation()}
                        >
                          {defaultLetter.paragraphs.map((p, pIdx) => (
                            <p
                              key={pIdx}
                              className="font-handwriting text-xs text-neutral-800 leading-snug"
                            >
                              {p}
                            </p>
                          ))}
                          <p className="font-handwriting font-bold text-amber-900 text-xs pt-1 text-right">
                            {defaultLetter.signOff}
                          </p>
                          {defaultLetter.postscript && (
                            <p className="font-handwriting text-[10.5px] text-neutral-600 pt-0.5 text-right italic">
                              {defaultLetter.postscript}
                            </p>
                          )}
                        </div>

                        {/* Letter Footer Actions */}
                        <div className="relative z-10 pt-1.5 border-t border-amber-900/15 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsLetterModalOpen(true);
                            }}
                            className="px-2.5 py-1 rounded bg-amber-100/90 hover:bg-amber-200 text-[10px] font-medium text-amber-950 flex items-center gap-1.5 transition-colors border border-amber-300/70 shadow-2xs cursor-pointer"
                          >
                            <Maximize2 className="w-3 h-3 text-amber-800" />
                            <span>Expand Fullscreen</span>
                          </button>

                          <span className="text-[9.5px] font-mono text-amber-800/60 tracking-wider">
                            KEEP WITH LOVE ❤️
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cute bottom note */}
                  <div className="bg-[#f2ecdc] py-1.5 px-2.5 rounded border border-amber-900/10 shadow-xs z-10 flex items-center justify-between">
                    <p className="font-handwriting text-[11px] text-neutral-800 italic">
                      &quot;A handwritten keepsake from the heart ✨&quot;
                    </p>
                    <span className="text-xs">💌</span>
                  </div>
                </div>
              ) : (
                /* INTERIOR SCRAPBOOK PAGES WITH REFINED PORTRAIT FRAMES */
                <div className="w-full h-full relative flex flex-col justify-between p-0.5">
                  {/* Page Top Header */}
                  <div className="flex justify-between items-center border-b border-amber-900/15 pb-1">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                      {page.date}
                    </span>
                    <span className="text-xs font-serif italic text-amber-800 font-bold">
                      {page.title}
                    </span>
                    <div className="flex gap-1 text-sm">
                      {page.stickers?.slice(0, 2).map((st, i) => (
                        <span key={i}>{st}</span>
                      ))}
                    </div>
                  </div>

                  {/* STAGGERED REFINED PHOTO COLLAGE (NO CROPPING / CUTTING) */}
                  <div className="relative w-full flex-1 my-1.5 min-h-[310px]">
                    {page.photos?.map((photo, i) => {
                      const isFirst = i === 0;
                      const isLandscape = photo.orientation === "landscape";

                      return (
                        <button
                          type="button"
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setZoomPhoto(photo);
                          }}
                          onPointerDown={(e) => e.stopPropagation()}
                          onTouchStart={(e) => e.stopPropagation()}
                          className="absolute bg-white p-1.5 pb-2.5 shadow-md border border-neutral-200 rounded-xs transition-all hover:scale-[1.03] active:scale-95 cursor-pointer group text-left appearance-none"
                          style={{
                            width: isLandscape ? "76%" : "61%",
                            height: isLandscape ? "142px" : "175px",
                            top: isFirst ? "2px" : "auto",
                            bottom: isFirst ? "auto" : "2px",
                            left: isFirst ? "4px" : "auto",
                            right: isFirst ? "auto" : "4px",
                            transform: `rotate(${photo.rotate}deg)`,
                            zIndex: isFirst ? 10 : 20,
                          }}
                        >
                          {/* Washi Tape Strip */}
                          <WashiTape
                            className={
                              isFirst
                                ? "top-[-7px] left-[50%] w-14"
                                : "top-[-7px] right-[18%] w-12"
                            }
                          />

                          {/* Image Container with Top-Focal Alignment & Full Subject Visibility */}
                          <div
                            className="w-full bg-neutral-100 overflow-hidden relative rounded-[2px]"
                            style={{
                              height: isLandscape ? "106px" : "138px",
                            }}
                          >
                            <img
                              src={photo.src}
                              alt={photo.label}
                              className={`w-full h-full object-cover ${
                                isLandscape
                                  ? "object-center"
                                  : "object-[center_12%]"
                              } pointer-events-none filter sepia-[0.1] transition-transform duration-300 group-hover:scale-105`}
                              draggable={false}
                            />

                            {/* Subtle tap-to-zoom indicator */}
                            <div className="absolute bottom-1 right-1 bg-black/40 text-white/80 p-0.5 rounded backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                              <ZoomIn className="w-2.5 h-2.5" />
                            </div>
                          </div>

                          {/* Handwritten Label */}
                          <div className="flex items-center justify-between mt-1 px-0.5">
                            <span className="block text-[10px] font-handwriting text-neutral-800 font-bold truncate">
                              {photo.label}
                            </span>
                            <span className="text-[9px] text-neutral-400 group-hover:text-amber-600 transition-colors">
                              🔍
                            </span>
                          </div>
                        </button>
                      );
                    })}

                    {/* Cute corner sticker */}
                    <div className="absolute top-[48%] left-[45%] text-2xl filter drop-shadow-sm pointer-events-none z-30">
                      {page.stickers?.[2] || "🌸"}
                    </div>
                  </div>

                  {/* Handwritten Custom Note at Bottom */}
                  <div className="bg-[#f2ecdc] p-2 rounded border border-amber-900/10 shadow-xs z-30">
                    <p className="font-handwriting text-xs text-neutral-800 leading-snug">
                      &quot;{page.note}&quot;
                    </p>
                  </div>
                </div>
              )}
            </Page>
          ))}
        </HTMLFlipBook>
      </div>

      {/* BOTTOM CONTROLS & PAGE INDICATOR */}
      <div className="z-10 flex items-center justify-center gap-4 pt-1">
        <button
          onClick={flipPrev}
          disabled={currentPage === 0}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:pointer-events-none backdrop-blur-md border border-white/15 shadow-sm transition-all active:scale-95 cursor-pointer"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="text-xs font-mono text-white/60 tracking-wider">
          Page {currentPage + 1} / {scrapbookPages.length}
        </span>

        <button
          onClick={flipNext}
          disabled={currentPage >= scrapbookPages.length - 1}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:pointer-events-none backdrop-blur-md border border-white/15 shadow-sm transition-all active:scale-95 cursor-pointer"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* FULL UNCROPPED PHOTO LIGHTBOX MODAL */}
      {zoomPhoto && (
        <div
          onClick={() => setZoomPhoto(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-3 pb-4 rounded-md shadow-2xl max-w-[340px] w-full flex flex-col items-center relative animate-in zoom-in-95 duration-200 border border-neutral-200"
          >
            {/* Washi tape at top */}
            <WashiTape className="top-[-10px] left-[50%] w-28" />

            {/* Close Button */}
            <button
              onClick={() => setZoomPhoto(null)}
              className="absolute -top-3 -right-3 p-1.5 bg-neutral-900 text-white rounded-full border border-white/20 shadow-md hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer z-30"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Image display - Complete & Uncropped */}
            <div className="w-full max-h-[62vh] overflow-hidden bg-neutral-100 rounded-xs flex items-center justify-center">
              <img
                src={zoomPhoto.src}
                alt={zoomPhoto.label}
                className="w-full h-auto max-h-[62vh] object-contain rounded-xs"
              />
            </div>

            {/* Caption */}
            <div className="w-full text-center mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between px-2">
              <span className="text-sm font-handwriting font-bold text-neutral-800 text-base">
                {zoomPhoto.label}
              </span>
              <span className="text-xs font-mono text-neutral-400">Memory Keep 💖</span>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN CLEAN LETTER READER MODAL */}
      {isLetterModalOpen && (
        <div
          onClick={() => setIsLetterModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#fffdf7] text-neutral-900 w-full max-w-[360px] max-h-[85vh] rounded-lg shadow-2xl flex flex-col border-2 border-amber-800/30 overflow-hidden relative"
          >
            {/* Vintage Header */}
            <div className="bg-gradient-to-r from-amber-900 via-[#881337] to-amber-900 text-amber-100 p-3 flex items-center justify-between border-b border-amber-300/30">
              <div className="flex items-center gap-2">
                <MailOpen className="w-4 h-4 text-amber-300" />
                <h3 className="font-serif italic font-bold text-sm">
                  A Letter For Chiku
                </h3>
              </div>
              <button
                onClick={() => setIsLetterModalOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 overflow-y-auto flex-1 space-y-3 hide-scrollbar">
              <h2 className="font-serif italic font-bold text-xl text-amber-950">
                {defaultLetter.salutation}
              </h2>

              <div className="space-y-2.5">
                {defaultLetter.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="font-handwriting text-base text-neutral-800 leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="pt-2 border-t border-amber-900/10 text-right">
                <p className="font-handwriting font-bold text-amber-900 text-base">
                  {defaultLetter.signOff}
                </p>
                {defaultLetter.postscript && (
                  <p className="font-handwriting text-xs text-neutral-600 mt-1">
                    {defaultLetter.postscript}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
