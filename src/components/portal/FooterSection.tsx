import React from 'react';
import { Heart, ChevronUp, Mail } from 'lucide-react';
import { WEDDING_DATA } from '../../data/weddingData';
import { LotusEmblem } from '../common/Ornaments';

export const FooterSection: React.FC<{ onReplayEnvelope: () => void }> = ({ onReplayEnvelope }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#1F0A0E] text-[#F5EFEB] py-16 px-4 sm:px-6 lg:px-8 border-t-2 border-[#D4AF37]/50">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Monogram Ring */}
        <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mb-4 bg-[#2C0F14] shadow-lg">
          <span className="font-cinzel text-xl font-bold tracking-wider gold-foil-text">
            {WEDDING_DATA.couple.monogram}
          </span>
        </div>

        <LotusEmblem className="w-6 h-6 text-[#D4AF37] mb-2" />

        <h3 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wider text-white">
          Mahima &amp; Harsh
        </h3>

        <p className="font-serif italic text-sm text-[#E0D2C3] mt-2 max-w-md">
          Thank you for being an indispensable part of our journey, our love, and our celebration.
        </p>

        <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-semibold mt-3">
          24–26 November 2026 · Kashipur, Uttarakhand, India
        </p>

        {/* Buttons: Re-Open Envelope & Scroll to Top */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onReplayEnvelope}
            className="px-5 py-2 rounded-full border border-[#D4AF37]/60 text-xs font-semibold text-[#F3E5AB] hover:bg-[#D4AF37]/10 transition-colors cursor-pointer"
          >
            Re-open Envelope &amp; Card
          </button>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-[11px] text-[#A8988B] flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>Arora &amp; Bajaj Family Celebrations</span>
          <span className="hidden sm:inline">·</span>
          <span>{WEDDING_DATA.couple.hashtag}</span>
          <span className="hidden sm:inline">·</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" /> for Mahima &amp; Harsh
          </span>
        </div>
      </div>
    </footer>
  );
};
