import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

interface ScratchCardProps {
  onComplete: () => void;
  revealedDate: string; // "24 NOVEMBER 2026"
  className?: string;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  onComplete,
  revealedDate,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Initialize Canvas with shimmering gold foil texture
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    // Rich metallic gold gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#B38728');
    grad.addColorStop(0.2, '#FBF5B7');
    grad.addColorStop(0.4, '#D4AF37');
    grad.addColorStop(0.6, '#AA771C');
    grad.addColorStop(0.85, '#FCF6BA');
    grad.addColorStop(1, '#8C6314');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Add gold fleck / stipple texture
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 2 + 0.5;
      ctx.fillStyle = Math.random() > 0.5 ? '#FFF8DC' : '#724A0E';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Border line inside canvas
    ctx.strokeStyle = '#66460B';
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    ctx.strokeStyle = '#FFF8DC';
    ctx.lineWidth = 1;
    ctx.strokeRect(9, 9, width - 18, height - 18);

    // Calligraphic instruction text on the scratch coat
    ctx.fillStyle = '#4A0E17';
    ctx.font = 'bold 15px "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ SCRATCH WITH FINGER ✨', width / 2, height / 2 - 8);

    ctx.font = '11px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#66460B';
    ctx.fillText('To unveil the auspicious wedding date', width / 2, height / 2 + 14);
  }, []);

  // Update canvas resolution to match high DPI displays
  useEffect(() => {
    const updateDimensions = () => {
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
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [initCanvas]);

  // Scratch Area Calculator (measures transparency)
  const calculateScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isCompleted) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let transparentPixels = 0;
      const totalPixels = data.length / 4;

      // Sample every 4th pixel for high performance
      for (let i = 3; i < data.length; i += 16) {
        if (data[i] < 128) {
          transparentPixels += 4;
        }
      }

      const percent = Math.min(100, Math.round((transparentPixels / totalPixels) * 100));
      setScratchPercent(percent);

      // Automatically reveal when ~45% is scratched
      if (percent >= 45 && !isCompleted) {
        setIsCompleted(true);
        onComplete();
      }
    } catch {
      // Failsafe
    }
  }, [isCompleted, onComplete]);

  // Erasing stroke on canvas
  const scratchAt = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 36;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      if (lastPointRef.current) {
        ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
        ctx.lineTo(x, y);
      } else {
        ctx.arc(x, y, 18, 0, Math.PI * 2);
      }
      ctx.stroke();

      lastPointRef.current = { x, y };
      calculateScratchPercentage();
    },
    [calculateScratchPercentage]
  );

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScratching(true);
    lastPointRef.current = null;
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScratching) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsScratching(false);
    lastPointRef.current = null;
  };

  // Touch Handlers for mobile & tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsScratching(true);
      lastPointRef.current = null;
      scratchAt(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isScratching || e.touches.length !== 1) return;
    scratchAt(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
    lastPointRef.current = null;
  };

  // Instant Alternative Button Action
  const handleInstantReveal = () => {
    if (isCompleted) return;
    setIsCompleted(true);
    setScratchPercent(100);
    onComplete();
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Scratch Box Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-sm h-36 rounded-xl overflow-hidden shadow-2xl border-2 border-[#D4AF37] select-none touch-none bg-[#FAF6F0]"
      >
        {/* Underneath Revealed Content: The Wedding Date */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#FFFDF9] via-[#FAF4EA] to-[#F5EFEB] text-center">
          <div className="flex items-center gap-2 text-[#B8860B] mb-1">
            <span className="h-[1px] w-6 bg-[#D4AF37]" />
            <span className="text-[10px] uppercase tracking-widest font-semibold">The Auspicious Date</span>
            <span className="h-[1px] w-6 bg-[#D4AF37]" />
          </div>

          <div className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wider text-[#721B29] drop-shadow-sm">
            {revealedDate}
          </div>

          <p className="text-xs text-[#684C38] mt-1 font-serif italic">
            Save The Date · Celebrations 24–26 Nov
          </p>
        </div>

        {/* Scratchable Canvas Layer */}
        {!isCompleted && (
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="absolute inset-0 w-full h-full cursor-pointer z-10"
          />
        )}
      </div>

      {/* Progress & Quick Reveal Button */}
      <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm justify-between px-2">
        <div className="flex items-center gap-2 text-xs text-[#8C6D58]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37]" />
          <span>Scratched: <strong className="text-[#721B29]">{scratchPercent}%</strong> / 45%</span>
        </div>

        <button
          type="button"
          onClick={handleInstantReveal}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#721B29] bg-[#FAF2E6] hover:bg-[#F3E5AB] border border-[#D4AF37] rounded-md transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
          <span>Tap to Reveal Date</span>
        </button>
      </div>
    </div>
  );
};
