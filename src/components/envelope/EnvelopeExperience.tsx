import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import { WEDDING_DATA } from '../../data/weddingData';
import { MandapArch, LotusEmblem, GaneshaSymbol } from '../common/Ornaments';
import { HeartScratchCard } from './HeartScratchCard';
import { RealisticEnvelope } from './RealisticEnvelope';
import { weddingAudio } from '../../utils/audioPlayer';
import floralBouquetImg from '../../assets/images/image_b1ad3aa7.png';

interface EnvelopeExperienceProps {
  onUnlockCelebration: () => void;
}

export const EnvelopeExperience: React.FC<EnvelopeExperienceProps> = ({
  onUnlockCelebration,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCardEmerged, setIsCardEmerged] = useState(false);
  const [isDateRevealed, setIsDateRevealed] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);

  // Trigger envelope opening
  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    // Start licensed Kesariya background music upon user interaction
    weddingAudio.startOnUserOpen();

    // After flap finishes opening, slide the card forward
    setTimeout(() => {
      setIsCardEmerged(true);
    }, 950);
  };

  const handleDateRevealed = () => {
    setIsDateRevealed(true);
    setShowCelebrationModal(true);
  };

  const handleEnterPortal = () => {
    setShowCelebrationModal(false);
    onUnlockCelebration();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 overflow-hidden bg-[#FAF7F2]">
      {/* Background Linen Texture & Soft Warm Vignette */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(#E8DEC8_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
      </div>

      {/* Top Banner Before Envelope Opening */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 z-20"
        >
          <div className="flex items-center justify-center gap-2 text-[#721B29] mb-1">
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
            <LotusEmblem className="w-5 h-5 text-[#721B29]" />
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
          </div>
          <p className="font-cinzel text-xs tracking-widest text-[#B8860B] uppercase">
            Wedding Invitation
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#721B29] mt-1 font-semibold">
            Mahima &amp; Harsh
          </h1>
          <p className="text-xs text-[#8C6D58] mt-1">
            Tap the golden wax seal or button to open
          </p>
        </motion.div>
      )}

      {/* ========================================================
          STAGE: REALISTIC PHYSICAL ENVELOPE WITH 3D FOLDS
          ======================================================== */}
      {!isCardEmerged && (
        <div className="relative w-full max-w-4xl flex flex-col items-center justify-center py-6 z-10">
          {/* Floral Bouquets Framing (Matching reference image) */}
          <div className="absolute inset-0 pointer-events-none hidden lg:flex items-center justify-between overflow-hidden opacity-90">
            {/* Left Floral Bouquet */}
            <div className="w-64 h-full relative -left-8 flex items-center">
              <img
                src={floralBouquetImg}
                alt="White Roses & Floral Flat Lay"
                className="w-[140%] max-w-none h-auto object-cover object-left filter drop-shadow-lg"
                style={{ clipPath: 'inset(0 68% 0 0)' }}
                onError={(e) => {
                  e.currentTarget.src = '/assets/aistudio/image_b1ad3aa7.png';
                }}
              />
            </div>
            {/* Right Floral Bouquet */}
            <div className="w-64 h-full relative -right-8 flex items-center justify-end">
              <img
                src={floralBouquetImg}
                alt="Garden Roses & Peonies Flat Lay"
                className="w-[140%] max-w-none h-auto object-cover object-right filter drop-shadow-lg"
                style={{ clipPath: 'inset(0 0 0 68%)' }}
                onError={(e) => {
                  e.currentTarget.src = '/assets/aistudio/image_b1ad3aa7.png';
                }}
              />
            </div>
          </div>

          {/* Unmistakable Physical Envelope */}
          <RealisticEnvelope
            isOpen={isOpen}
            onOpen={handleOpenEnvelope}
          />

          {/* Tap to Open CTA Button Below Envelope */}
          {!isOpen && (
            <motion.button
              type="button"
              onClick={handleOpenEnvelope}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#721B29] via-[#8E2333] to-[#721B29] text-[#FAF7F2] font-cinzel text-xs sm:text-sm tracking-wider uppercase font-semibold shadow-xl hover:shadow-2xl transition-all cursor-pointer animate-pulse-gold border border-[#D4AF37] z-30"
            >
              <Sparkles className="w-4 h-4 text-[#F3E5AB]" />
              <span>Tap to Open Invitation</span>
            </motion.button>
          )}
        </div>
      )}

      {/* ========================================================
          EMERGED INVITATION CARD WITH 3-HEART SCRATCH REVEAL
          ======================================================== */}
      <AnimatePresence>
        {isCardEmerged && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl z-20"
          >
            <div
              className="w-full bg-[#FFFDF9] border-2 border-[#D4AF37] rounded-2xl shadow-2xl p-6 sm:p-10 relative overflow-hidden"
              style={{
                boxShadow: '0 25px 50px -12px rgba(114, 27, 41, 0.25)',
              }}
            >
              {/* Mandap Arch Header */}
              <MandapArch className="w-full h-8 text-[#D4AF37] mb-2" />

              {/* Sanskrit Inscription & Blessings */}
              <div className="text-center relative z-10">
                <div className="flex justify-center mb-2">
                  <GaneshaSymbol className="w-12 h-12 text-[#721B29]" />
                </div>

                <p className="font-serif text-xs sm:text-sm text-[#721B29] font-medium tracking-wide">
                  {WEDDING_DATA.family.sanskritShloka}
                </p>

                {/* Family Blessings */}
                <div className="my-4 py-2 border-y border-[#D4AF37]/30">
                  <p className="text-[11px] uppercase tracking-widest text-[#B8860B]">
                    With Heavenly Blessings of
                  </p>
                  <p className="font-serif text-base sm:text-lg text-[#721B29] font-semibold">
                    {WEDDING_DATA.family.grandparents}
                  </p>
                  <p className="text-xs text-[#684C38] mt-1">
                    {WEDDING_DATA.family.brideMother} &amp; {WEDDING_DATA.family.brideFather}
                  </p>
                  <p className="text-[11px] text-[#8C6D58] italic">
                    Family Residence: {WEDDING_DATA.family.familyAddress}
                  </p>
                </div>

                <p className="font-cursive text-2xl sm:text-3xl text-[#B8860B]">
                  Solicit your gracious presence &amp; blessings for the wedding of
                </p>

                {/* Couple Names */}
                <div className="my-3">
                  <h3 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#721B29]">
                    Mahima Arora
                  </h3>
                  <p className="text-xs text-[#8C6D58]">Daughter of Mrs. Sushma Arora &amp; Late Mr. Surender Arora</p>
                  <div className="my-2 flex items-center justify-center gap-3">
                    <span className="h-[1px] w-10 bg-[#D4AF37]" />
                    <Heart className="w-4 h-4 text-[#721B29] fill-[#721B29]" />
                    <span className="h-[1px] w-10 bg-[#D4AF37]" />
                  </div>
                  <h3 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#721B29]">
                    Harsh Bajaj
                  </h3>
                  <p className="text-xs text-[#8C6D58]">Son of Bajaj Family</p>
                </div>

                <p className="text-xs uppercase tracking-widest font-semibold text-[#B8860B] mt-3">
                  Kashipur, Uttarakhand, India
                </p>

                {/* ========================================================
                    ATTACHED REFERENCE SCRATCH CARD:
                    "SAVE THE DATE"
                    "Reveal Our Big Day"
                    "Scratch the hearts to reveal"
                    with 3 Scratch Hearts (DAY, MONTH, YEAR)
                    ======================================================== */}
                <div className="mt-8 pt-6 border-t border-[#D4AF37]/40">
                  <HeartScratchCard
                    onComplete={handleDateRevealed}
                    revealedDate={WEDDING_DATA.dates.weddingDate}
                  />
                </div>

                {/* Unlocked Website Button after reveal */}
                {isDateRevealed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 pt-4 border-t border-[#D4AF37]/30"
                  >
                    <button
                      type="button"
                      onClick={handleEnterPortal}
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#721B29] to-[#8E2333] text-white font-cinzel text-sm uppercase tracking-wider font-semibold shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-[#D4AF37]"
                    >
                      <Sparkles className="w-4 h-4 text-[#F3E5AB]" />
                      <span>Explore Wedding Website &amp; Events</span>
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          CELEBRATION REVEAL MODAL (DATE REVEAL POPUP)
          ======================================================== */}
      <AnimatePresence>
        {showCelebrationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#FCFBF8] border-2 border-[#D4AF37] rounded-2xl p-6 sm:p-8 text-center shadow-2xl overflow-hidden"
            >
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#FAF2E6] border border-[#D4AF37] flex items-center justify-center mb-3">
                  <Sparkles className="w-8 h-8 text-[#B8860B] animate-spin" style={{ animationDuration: '8s' }} />
                </div>

                <p className="font-cursive text-2xl text-[#B8860B]">
                  Subh Vivaah · Save The Date
                </p>

                <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#721B29] tracking-wider my-2">
                  24 NOVEMBER 2026
                </h2>

                <p className="text-sm font-serif text-[#684C38] max-w-sm mx-auto">
                  Mahima &amp; Harsh invite you to celebrate 3 days of eternal joyous festivities from 24 to 26 November 2026 in Kashipur.
                </p>

                <div className="my-4 py-2 px-4 rounded-lg bg-[#FAF6F0] border border-[#D4AF37]/40 w-full max-w-xs text-xs text-[#721B29] font-medium">
                  ✨ The Complete Wedding Portal is Now Unlocked ✨
                </div>

                <button
                  type="button"
                  onClick={handleEnterPortal}
                  className="w-full max-w-xs py-3 px-6 rounded-full bg-gradient-to-r from-[#721B29] via-[#8E2333] to-[#721B29] text-white font-cinzel text-sm uppercase tracking-wider font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer border border-[#D4AF37]"
                >
                  Enter Celebration Website
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
