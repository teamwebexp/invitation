import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../../data/weddingData';
import { SectionDivider, LotusEmblem } from '../common/Ornaments';

export const CoupleStory: React.FC = () => {
  return (
    <section id="story" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <SectionDivider
          title="Our Journey of Love"
          subtitle="How Two Hearts Found Their Forever Home"
        />

        <div className="mt-12 relative">
          {/* Center Vertical Gold Line */}
          <div className="hidden sm:block absolute left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent transform -translate-x-1/2" />

          <div className="space-y-12">
            {WEDDING_DATA.story.map((chapter, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-center gap-6 ${
                    isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Badge Center */}
                  <div className="z-10 w-12 h-12 rounded-full bg-[#FAF2E6] border-2 border-[#D4AF37] shadow-md flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 text-[#721B29] fill-[#721B29]/20" />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full sm:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white border border-[#D4AF37]/50 shadow-md hover:shadow-xl transition-all duration-300 ${
                      isEven ? 'sm:text-right' : 'sm:text-left'
                    }`}
                  >
                    <span className="text-[11px] uppercase tracking-widest font-semibold text-[#B8860B] font-cinzel">
                      {chapter.year}
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#721B29] mt-1">
                      {chapter.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#684C38] font-serif italic mt-2 leading-relaxed">
                      {chapter.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Romantic Quote */}
        <div className="mt-16 text-center max-w-lg mx-auto p-6 rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF4EA] border border-[#D4AF37]/40 shadow-sm">
          <LotusEmblem className="w-8 h-8 text-[#721B29] mx-auto mb-2" />
          <p className="font-serif italic text-base sm:text-lg text-[#721B29]">
            &ldquo;In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.&rdquo;
          </p>
          <span className="block mt-2 font-cursive text-xl text-[#B8860B]">
            — Mahima &amp; Harsh
          </span>
        </div>
      </div>
    </section>
  );
};
