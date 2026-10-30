import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

interface SingleHeartProps {
  label: string; // The secret value revealed under scratch (e.g. "24", "NOVEMBER", "2026")
  subLabel?: string;
  isRevealed: boolean;
  onScratched: () => void;
}

const SingleHeart: React.FC<SingleHeartProps> = ({
  label,
  subLabel,
  isRevealed,
  onScratched,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scratched, setScratched] = useState(false);
  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  // Helper to trace precise heart geometry
  const traceHeartPath = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.beginPath();
    ctx.moveTo(w * 0.5, h * 0.93);
    ctx.bezierCurveTo(w * 0.2, h * 0.75, 0, h * 0.53, 0, h * 0.28);
    ctx.bezierCurveTo(0, h * 0.12, w * 0.14, 0, w * 0.31, 0);
    ctx.bezierCurveTo(w * 0.41, 0, w * 0.46, h * 0.05, w * 0.5, h * 0.12);
    ctx.bezierCurveTo(w * 0.54, h * 0.05, w * 0.59, 0, w * 0.69, 0);
    ctx.bezierCurveTo(w * 0.86, 0, w, h * 0.12, w, h * 0.28);
    ctx.bezierCurveTo(w, h * 0.53, w * 0.8, h * 0.75, w * 0.5, h * 0.93);
    ctx.closePath();
  };

  // Initialize Canvas Heart
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, w, h);

    // Clip to heart shape
    traceHeartPath(ctx, w, h);
    ctx.clip();

    // Rich Terracotta / Rust Burgundy coat matching user reference image
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#AC4B36');
    grad.addColorStop(0.5, '#923A26');
    grad.addColorStop(1, '#782A1A');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle gold flecks
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 235, 180, 0.4)' : 'rgba(212, 175, 55, 0.3)';
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 2 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Text: "SCRATCH" matching user reference image
    ctx.fillStyle = '#F5E5D3';
    ctx.font = 'bold 13px "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH', w / 2, h / 2 + 3);

    ctx.restore();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    initCanvas();
  }, [initCanvas]);

  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || scratched || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let transparentCount = 0;
      const totalSampled = data.length / 4;

      for (let i = 3; i < data.length; i += 16) {
        if (data[i] < 120) {
          transparentCount += 4;
        }
      }

      const p = Math.min(100, Math.round((transparentCount / totalSampled) * 100));

      // Auto reveal this heart at ~35%
      if (p >= 35 && !scratched) {
        setScratched(true);
        onScratched();
      }
    } catch {
      // safe fallback
    }
  }, [scratched, isRevealed, onScratched]);

  const scratchAt = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 26;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      if (lastPoint.current) {
        ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
        ctx.lineTo(x, y);
      } else {
        ctx.arc(x, y, 13, 0, Math.PI * 2);
      }
      ctx.stroke();
      ctx.restore();

      lastPoint.current = { x, y };
      checkScratchPercentage();
    },
    [checkScratchPercentage]
  );

  // Mouse handlers
  const onMouseDown = (e: React.MouseEvent) => {
    isDrawing.current = true;
    lastPoint.current = null;
    scratchAt(e.clientX, e.clientY);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing.current) return;
    scratchAt(e.clientX, e.clientY);
  };
  const onMouseUp = () => {
    isDrawing.current = false;
    lastPoint.current = null;
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDrawing.current = true;
      lastPoint.current = null;
      scratchAt(e.touches[0].clientX, e.touches[0].clientY);
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDrawing.current || e.touches.length !== 1) return;
    scratchAt(e.touches[0].clientX, e.touches[0].clientY);
  };
  const onTouchEnd = () => {
    isDrawing.current = false;
    lastPoint.current = null;
  };

  const showContent = scratched || isRevealed;

  return (
    <div
      ref={containerRef}
      className="relative w-24 h-20 sm:w-32 sm:h-28 md:w-36 md:h-32 select-none touch-none filter drop-shadow-md transition-transform duration-300 hover:scale-105"
      style={{
        clipPath: 'url(#heart-clip)',
      }}
    >
      {/* Revealed Inner Content Underneath */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E8] to-[#F3E7D3] border-2 border-[#D4AF37] text-center p-2">
        <span className="font-cinzel text-lg sm:text-2xl font-black text-[#721B29] tracking-wider leading-none">
          {label}
        </span>
        {subLabel && (
          <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#B8860B] font-semibold mt-0.5">
            {subLabel}
          </span>
        )}
      </div>

      {/* Canvas Scratch Layer */}
      {!showContent && (
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="absolute inset-0 w-full h-full cursor-pointer z-10"
        />
      )}
    </div>
  );
};

interface HeartScratchCardProps {
  onComplete: () => void;
  revealedDate: string; // e.g. "24 NOVEMBER 2026"
  className?: string;
}

export const HeartScratchCard: React.FC<HeartScratchCardProps> = ({
  onComplete,
  className = '',
}) => {
  const [revealedHearts, setRevealedHearts] = useState<{ [key: string]: boolean }>({
    day: false,
    month: false,
    year: false,
  });
  const [allRevealed, setAllRevealed] = useState(false);

  const handleHeartScratched = (key: 'day' | 'month' | 'year') => {
    setRevealedHearts((prev) => {
      const updated = { ...prev, [key]: true };
      if (updated.day && updated.month && updated.year && !allRevealed) {
        setAllRevealed(true);
        setTimeout(onComplete, 400);
      }
      return updated;
    });
  };

  const handleRevealAll = () => {
    setRevealedHearts({ day: true, month: true, year: true });
    setAllRevealed(true);
    onComplete();
  };

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* SVG ClipPath Definition for objectBoundingBox */}
      <svg width="0" height="0" className="absolute pointer-events-none opacity-0">
        <defs>
          <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5, 0.93 C 0.2, 0.75, 0, 0.53, 0, 0.28 C 0, 0.12, 0.14, 0, 0.31, 0 C 0.41, 0, 0.46, 0.05, 0.5, 0.12 C 0.54, 0.05, 0.59, 0, 0.69, 0 C 0.86, 0, 1, 0.12, 1, 0.28 C 1, 0.53, 0.8, 0.75, 0.5, 0.93 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Floating Confetti / Rose Petal Flecks Matching User Reference Screenshot */}
      <div className="relative w-full max-w-xl py-6 px-4 bg-[#FAF6F0]/90 rounded-2xl border border-[#D4AF37]/50 shadow-inner overflow-hidden">
        {/* Floating background flakes */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-4 left-8 w-2 h-3 rounded-full bg-[#8D3624] rotate-45 transform" />
          <div className="absolute top-12 right-12 w-2.5 h-1.5 rounded-full bg-[#D4AF37] -rotate-12" />
          <div className="absolute bottom-6 left-16 w-3 h-2 rounded-full bg-[#C59B27] rotate-30" />
          <div className="absolute bottom-10 right-20 w-2 h-2.5 rounded-full bg-[#8D3624] rotate-60" />
          <div className="absolute top-1/2 left-4 w-1.5 h-2 rounded-full bg-[#8D3624]" />
          <div className="absolute top-1/3 right-6 w-2 h-2 rounded-full bg-[#D4AF37]" />
        </div>

        {/* Top Header: SAVE THE DATE (Exact match to reference image) */}
        <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#B8860B] font-semibold mb-1">
          SAVE THE DATE
        </p>

        {/* Big Cursive Title: Reveal Our Big Day (Exact match to reference image) */}
        <h3 className="font-cursive text-4xl sm:text-5xl md:text-6xl text-[#8D3624] leading-tight my-1 drop-shadow-sm">
          Reveal Our <br className="sm:hidden" /> Big Day
        </h3>

        {/* Subtitle: Scratch the hearts to reveal (Exact match to reference image) */}
        <p className="font-serif italic text-xs sm:text-sm text-[#7A6150] mb-6">
          Scratch the hearts to reveal
        </p>

        {/* Three Heart Scratch Targets (Exact match to reference image) */}
        <div className="flex items-center justify-center gap-2 sm:gap-6 my-2">
          <SingleHeart
            label="24"
            subLabel="DAY"
            isRevealed={revealedHearts.day}
            onScratched={() => handleHeartScratched('day')}
          />

          <SingleHeart
            label="NOV"
            subLabel="MONTH"
            isRevealed={revealedHearts.month}
            onScratched={() => handleHeartScratched('month')}
          />

          <SingleHeart
            label="2026"
            subLabel="YEAR"
            isRevealed={revealedHearts.year}
            onScratched={() => handleHeartScratched('year')}
          />
        </div>

        {/* Quick alternative button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleRevealAll}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#8D3624] bg-[#FAF2E6] hover:bg-[#F3E5AB] border border-[#D4AF37] rounded-full transition-colors cursor-pointer shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Tap to Reveal All</span>
          </button>
        </div>
      </div>
    </div>
  );
};
