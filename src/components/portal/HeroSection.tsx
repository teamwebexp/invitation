import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';
import { WEDDING_DATA } from '../../data/weddingData';
import { MandapArch, LotusEmblem } from '../common/Ornaments';

export const HeroSection: React.FC = () => {
  // Live Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const target = new Date(WEDDING_DATA.dates.targetTimestampIso).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F6F0E5] to-[#FAF7F2]">
      {/* Decorative Mandap Arch at Top */}
      <div className="max-w-4xl mx-auto mb-6">
        <MandapArch className="w-full h-8 text-[#D4AF37]" />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Subtitle / Auspicious Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FAF0DE] border border-[#D4AF37]/50 text-[#721B29] text-xs uppercase tracking-widest font-cinzel font-semibold mb-4">
          <LotusEmblem className="w-4 h-4 text-[#721B29]" />
          <span>The Auspicious Wedding Celebration</span>
        </div>

        {/* Couple Names Hero */}
        <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#721B29]">
          Mahima <span className="font-cursive text-4xl sm:text-6xl text-[#B8860B] font-normal mx-2">&amp;</span> Harsh
        </h1>

        <p className="mt-3 text-sm sm:text-base font-serif italic text-[#8C6D58] max-w-xl">
          Two souls, two families, united under the sacred vows of eternal companionship and unconditional love.
        </p>

        {/* Date & Location Pill Strip */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-[#4A3828]">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-[#D4AF37]/40 shadow-sm">
            <Calendar className="w-4 h-4 text-[#B8860B]" />
            <span className="font-semibold">{WEDDING_DATA.dates.celebrationRange}</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-[#D4AF37]/40 shadow-sm">
            <MapPin className="w-4 h-4 text-[#721B29]" />
            <span>{WEDDING_DATA.location.summary}</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-[#D4AF37]/40 shadow-sm">
            <Heart className="w-4 h-4 text-[#721B29] fill-[#721B29]" />
            <span className="font-serif italic">{WEDDING_DATA.couple.hashtag}</span>
          </div>
        </div>

        {/* Featured Editorial Portrait Card */}
        <div className="mt-10 relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border-4 border-[#D4AF37]/70 bg-[#1A0B0E]">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
            <img
              src={WEDDING_DATA.gallery[0]?.url || '/assets/aistudio/IMG_8359_95b6c3f3.jpg'}
              alt="Mahima Arora & Harsh Bajaj at Ananya Residency, Kashipur"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000"
              loading="eager"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('IMG_8359_95b6c3f3.jpg')) {
                  target.src = '/assets/aistudio/IMG_8359_95b6c3f3.jpg';
                }
              }}
            />
            {/* Cinematic Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Bottom Inscription on Hero Card */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-left text-white">
              <span className="text-[11px] uppercase tracking-widest text-[#F5E5A4] font-cinzel">
                A Royal Union
              </span>
              <h2 className="text-xl sm:text-3xl font-serif font-semibold text-white mt-0.5">
                Stepping into Forever Together
              </h2>
              <p className="text-xs text-white/80 font-sans mt-1">
                Kashipur, India · 24 to 26 November 2026
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            LIVE COUNTDOWN (VISIBLE ONLY AFTER REVEAL)
            ======================================================== */}
        <div className="mt-12 w-full max-w-2xl bg-white/90 backdrop-blur-sm border-2 border-[#D4AF37] rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-center gap-2 text-[#721B29] mb-4">
            <Clock className="w-4 h-4 text-[#B8860B]" />
            <h3 className="font-cinzel text-sm sm:text-base font-bold uppercase tracking-wider text-[#721B29]">
              Countdown to the Auspicious Day
            </h3>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#FAF4EA] to-[#F5ECE0] border border-[#D4AF37]/40 shadow-inner"
              >
                <span className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#721B29] tabular-nums">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#8C6D58] font-medium mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#8C6D58] font-serif italic text-center mt-4">
            Ticking towards 24 November 2026 · We eagerly await your warm presence
          </p>
        </div>
      </div>
    </section>
  );
};
