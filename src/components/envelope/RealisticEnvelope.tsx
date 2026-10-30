import React from 'react';
import { motion } from 'motion/react';
import { WaxSealEmbossed } from '../common/Ornaments';

interface RealisticEnvelopeProps {
  isOpen: boolean;
  onOpen: () => void;
  className?: string;
}

export const RealisticEnvelope: React.FC<RealisticEnvelopeProps> = ({
  isOpen,
  onOpen,
  className = '',
}) => {
  return (
    <div className={`relative w-full max-w-[500px] aspect-[500/330] mx-auto select-none ${className}`}>
      {/* 3D Perspective Container */}
      <div className="relative w-full h-full perspective-[1400px]">
        {/* Soft Ground Shadow */}
        <div
          className="absolute inset-x-6 -bottom-5 h-12 bg-stone-900/15 rounded-full blur-xl transform transition-transform duration-700"
          style={{ transform: isOpen ? 'translateY(16px) scale(0.95)' : 'translateY(0) scale(1)' }}
        />

          {/* Envelope Shell Box */}
          <div className="relative w-full h-full rounded-xl overflow-visible shadow-2xl bg-[#EFE6D8] border border-[#D4AF37]/60 ring-1 ring-[#D4AF37]/25">

          {/* ========================================================
              1. BACK LINER & OPEN FLAP INTERIOR (Visible behind card)
              ======================================================== */}
          {/* Inner Envelope Pocket Background */}
          <div className="absolute inset-0 rounded-xl overflow-hidden bg-gradient-to-b from-[#E6DCCF] to-[#DDD2C3]">
            {/* Subtle Damask/Paper Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
          </div>

          {/* Top Flap Backside / Gold Kraft Liner (Visible when flap flips UP 180deg) */}
          <motion.div
            className="absolute -top-[165px] inset-x-0 h-[165px] origin-bottom pointer-events-none z-0"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={
              isOpen
                ? { opacity: 1, scaleY: 1 }
                : { opacity: 0, scaleY: 0 }
            }
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <svg viewBox="0 0 500 165" className="w-full h-full filter drop-shadow-md overflow-visible">
              <defs>
                <linearGradient id="kraftGoldLiner" x1="0%" y1="100%" x2="50%" y2="0%">
                  <stop offset="0%" stopColor="#C9A461" />
                  <stop offset="50%" stopColor="#DFBF7E" />
                  <stop offset="100%" stopColor="#EAD8A7" />
                </linearGradient>
              </defs>
              {/* Triangular flap pointing UP */}
              <polygon
                points="0,165 250,5 500,165"
                fill="url(#kraftGoldLiner)"
                stroke="#B8860B"
                strokeWidth="2"
              />
              {/* Inner gold foil border */}
              <polygon
                points="18,165 250,22 482,165"
                fill="none"
                stroke="#FFF2CF"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.9"
              />
            </svg>
          </motion.div>

          {/* ========================================================
              2. CARD INSIDE POCKET (Slides out when opened)
              ======================================================== */}
          <motion.div
            className="absolute inset-x-4 top-4 bottom-4 bg-[#FFFDF9] border border-[#D4AF37] rounded-lg shadow-md p-5 flex flex-col items-center justify-center text-center z-10"
            initial={{ y: 0, opacity: 0.95 }}
            animate={
              isOpen
                ? { y: -190, opacity: 1, scale: 1.02 }
                : { y: 0, opacity: 0.95, scale: 0.98 }
            }
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-cinzel text-[11px] text-[#B8860B] tracking-widest uppercase font-semibold">
              Imperial Wedding Invitation
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#721B29] mt-1">
              Mahima &amp; Harsh
            </h3>
            <span className="font-cursive text-xl text-[#B8860B]">Together with their families</span>
            <div className="mt-2 text-[10px] uppercase tracking-wider text-[#8C6D58]">
              Kashipur · 2026
            </div>
          </motion.div>

          {/* ========================================================
              3. POCKET FRONT FLAPS (SVG with realistic folds & shadows)
              ======================================================== */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <svg viewBox="0 0 500 330" className="w-full h-full overflow-hidden rounded-xl">
              <defs>
                {/* Paper Surface Gradients with rich ivory-champagne tone */}
                <linearGradient id="leftFlapGrad" x1="0%" y1="0%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#F8F3EB" />
                  <stop offset="100%" stopColor="#E9DEC8" />
                </linearGradient>

                <linearGradient id="rightFlapGrad" x1="100%" y1="0%" x2="0%" y2="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#F8F3EB" />
                  <stop offset="100%" stopColor="#E9DEC8" />
                </linearGradient>

                <linearGradient id="bottomFlapGrad" x1="50%" y1="100%" x2="50%" y2="0%">
                  <stop offset="0%" stopColor="#FAF7F2" />
                  <stop offset="45%" stopColor="#F4EDE1" />
                  <stop offset="100%" stopColor="#E5DAC5" />
                </linearGradient>

                {/* Filter for realistic paper fold shadow */}
                <filter id="foldShadow" x="-10%" y="-15%" width="120%" height="135%">
                  <feDropShadow dx="0" dy="-4" stdDeviation="5" floodColor="#352312" floodOpacity="0.22" />
                </filter>
              </defs>

              {/* Left Side Triangular Fold */}
              <polygon
                points="0,0 250,165 0,330"
                fill="url(#leftFlapGrad)"
                stroke="#D8CFBE"
                strokeWidth="1.2"
              />
              <line
                x1="0"
                y1="0"
                x2="250"
                y2="165"
                stroke="#C5A059"
                strokeWidth="1"
                strokeOpacity="0.5"
              />

              {/* Right Side Triangular Fold */}
              <polygon
                points="500,0 250,165 500,330"
                fill="url(#rightFlapGrad)"
                stroke="#D8CFBE"
                strokeWidth="1.2"
              />
              <line
                x1="500"
                y1="0"
                x2="250"
                y2="165"
                stroke="#C5A059"
                strokeWidth="1"
                strokeOpacity="0.5"
              />

              {/* Bottom Triangular Fold (Overlaps Left & Right) */}
              <polygon
                points="0,330 250,150 500,330"
                fill="url(#bottomFlapGrad)"
                stroke="#CBBDA4"
                strokeWidth="1.5"
                filter="url(#foldShadow)"
              />

              {/* Distinct Gold Accent Border on Bottom Flap Fold */}
              <polyline
                points="0,330 250,150 500,330"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1.2"
                strokeOpacity="0.8"
              />
              <polyline
                points="12,330 250,160 488,330"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.7"
                strokeDasharray="4 3"
                strokeOpacity="0.5"
              />
            </svg>
          </div>

          {/* ========================================================
              4. TOP FOLD FLAP (Animates 180° in 3D when opening)
              ======================================================== */}
          <motion.div
            className="absolute inset-x-0 top-0 h-full origin-top z-30 pointer-events-none"
            style={{
              transformStyle: 'preserve-3d',
            }}
            animate={
              isOpen
                ? { rotateX: 180, opacity: 0 }
                : { rotateX: 0, opacity: 1 }
            }
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <svg viewBox="0 0 500 330" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="topFlapFaceGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#FAF6EF" />
                  <stop offset="100%" stopColor="#EFE3D0" />
                </linearGradient>

                <filter id="topFlapDropShadow" x="-10%" y="0%" width="120%" height="160%">
                  <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#2C1B0D" floodOpacity="0.32" />
                </filter>
              </defs>

              {/* Triangular Top Flap pointing DOWN over bottom flap */}
              <polygon
                points="0,0 250,195 500,0"
                fill="url(#topFlapFaceGrad)"
                filter="url(#topFlapDropShadow)"
                stroke="#C5A059"
                strokeWidth="1.8"
              />

              {/* Double Inset Gold Filigree Border on Top Flap */}
              <polyline
                points="16,4 250,183 484,4"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1.5"
                strokeOpacity="0.9"
              />
              <polyline
                points="24,8 250,174 476,8"
                fill="none"
                stroke="#B8860B"
                strokeWidth="0.8"
                strokeDasharray="4 3"
                strokeOpacity="0.65"
              />
            </svg>
          </motion.div>

          {/* ========================================================
              5. ANTIQUE GOLD WAX SEAL (Pins flap to center pocket)
              ======================================================== */}
          <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-auto">
            <motion.div
              style={{
                // Position seal right on the tip of the triangular flap (around 52% down)
                transform: 'translateY(18px)',
              }}
              animate={
                isOpen
                  ? { scale: 0.7, y: -80, opacity: 0 }
                  : { scale: 1, y: 18, opacity: 1 }
              }
              transition={{ duration: 0.5 }}
            >
              <WaxSealEmbossed
                monogram="M&H"
                onClick={onOpen}
                isOpening={isOpen}
                theme="gold"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
