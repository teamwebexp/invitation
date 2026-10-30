import React from 'react';
import { Heart, Home, Star } from 'lucide-react';
import { WEDDING_DATA } from '../../data/weddingData';
import { SectionDivider, LotusEmblem, GaneshaSymbol } from '../common/Ornaments';

export const FamilyBlessings: React.FC = () => {
  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0] overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <SectionDivider
          title="Family Blessings & Lineage"
          subtitle="Honoring Our Roots & Beloved Elders"
        />

        <div className="mt-8 bg-white/90 backdrop-blur-sm border border-[#D4AF37]/60 rounded-2xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          {/* Subtle Corner Ornament */}
          <div className="absolute top-0 right-0 p-4 opacity-15">
            <GaneshaSymbol className="w-24 h-24 text-[#721B29]" />
          </div>

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <p className="font-serif italic text-base sm:text-lg text-[#684C38] leading-relaxed">
              {WEDDING_DATA.family.blessingQuote}
            </p>

            <div className="my-8 h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {/* Grandparents Honor Card */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-[#FFFDF9] to-[#FAF3E8] border border-[#D4AF37]/40 shadow-sm">
                <div className="flex items-center gap-2 text-[#B8860B] mb-2">
                  <Star className="w-4 h-4 fill-[#B8860B]" />
                  <span className="text-xs uppercase tracking-widest font-semibold">Heavenly Blessings</span>
                </div>
                <h4 className="font-serif text-xl font-bold text-[#721B29]">
                  {WEDDING_DATA.family.grandparents}
                </h4>
                <p className="text-xs text-[#8C6D58] mt-1 leading-relaxed">
                  Whose timeless values, eternal love, and sacred blessings guide our new beginning every single day.
                </p>
              </div>

              {/* Parents of the Bride Card */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-[#FFFDF9] to-[#FAF3E8] border border-[#D4AF37]/40 shadow-sm">
                <div className="flex items-center gap-2 text-[#721B29] mb-2">
                  <Heart className="w-4 h-4 fill-[#721B29]" />
                  <span className="text-xs uppercase tracking-widest font-semibold">Bride&apos;s Parents</span>
                </div>
                <h4 className="font-serif text-xl font-bold text-[#721B29]">
                  {WEDDING_DATA.family.brideMother}
                </h4>
                <p className="text-xs text-[#8C6D58] font-medium">&amp; {WEDDING_DATA.family.brideFather} (In Everlasting Memory)</p>
                <p className="text-xs text-[#8C6D58] mt-1 leading-relaxed">
                  Holding our hands with unconditional love and blessing the bond of Mahima &amp; Harsh.
                </p>
              </div>
            </div>

            {/* Family Residence Address Banner */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm text-[#721B29] bg-[#FAF2E6] py-3 px-6 rounded-xl border border-[#D4AF37]/40">
              <Home className="w-4 h-4 text-[#B8860B] shrink-0" />
              <span className="font-semibold uppercase tracking-wider">Family Residence:</span>
              <span className="font-serif text-[#4A3828]">{WEDDING_DATA.family.familyAddress}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
