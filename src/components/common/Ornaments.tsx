import React from 'react';

export const FloralCorner: React.FC<{
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}> = ({ className = 'w-16 h-16 text-[#D4AF37]', position = 'top-left' }) => {
  const rotationClass = {
    'top-left': '',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }[position];

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${rotationClass} transition-transform duration-300`}
    >
      {/* Corner filigree line art */}
      <path
        d="M5 5 H45 C45 25, 25 45, 5 45 V5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.06"
      />
      <path
        d="M8 8 C18 8, 26 16, 26 26 C26 36, 18 44, 8 44"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      {/* Rose & leaves motif */}
      <circle cx="18" cy="18" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M18 12 C20 8, 26 10, 24 16 C28 14, 30 20, 24 22 C28 26, 22 28, 18 24 C14 28, 8 26, 12 22 C6 20, 8 14, 12 16 C10 10, 16 8, 18 12Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.12"
      />
      {/* Delicate trailing swirls */}
      <path
        d="M26 12 Q38 12 42 22 Q46 32 38 40 Q28 48 18 48"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="42" cy="22" r="2" fill="currentColor" />
      <circle cx="22" cy="42" r="2" fill="currentColor" />
      <path
        d="M12 26 Q12 38 22 42"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const MandapArch: React.FC<{ className?: string }> = ({ className = 'w-full h-8 text-[#D4AF37]' }) => (
  <svg
    viewBox="0 0 600 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <path
      d="M0 38 Q150 38 240 18 Q270 12 300 2 Q330 12 360 18 Q450 38 600 38"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M0 35 Q150 35 245 16 Q272 10 300 0 Q328 10 355 16 Q450 35 600 35"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeDasharray="3 3"
    />
    <circle cx="300" cy="5" r="4" fill="currentColor" />
    <circle cx="270" cy="14" r="2.5" fill="currentColor" />
    <circle cx="330" cy="14" r="2.5" fill="currentColor" />
    <circle cx="230" cy="22" r="2" fill="currentColor" />
    <circle cx="370" cy="22" r="2" fill="currentColor" />
  </svg>
);

export const LotusEmblem: React.FC<{ className?: string }> = ({ className = 'w-10 h-10 text-[#721B29]' }) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Center petal */}
    <path
      d="M50 8 C42 28, 44 48, 50 68 C56 48, 58 28, 50 8 Z"
      fill="currentColor"
      fillOpacity="0.25"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Inner side petals */}
    <path
      d="M50 68 C35 52, 28 32, 38 18 C46 32, 48 48, 50 68 Z"
      fill="currentColor"
      fillOpacity="0.18"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M50 68 C65 52, 72 32, 62 18 C54 32, 52 48, 50 68 Z"
      fill="currentColor"
      fillOpacity="0.18"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    {/* Outer side petals */}
    <path
      d="M50 68 C22 58, 12 40, 24 28 C34 42, 42 56, 50 68 Z"
      fill="currentColor"
      fillOpacity="0.12"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M50 68 C78 58, 88 40, 76 28 C66 42, 58 56, 50 68 Z"
      fill="currentColor"
      fillOpacity="0.12"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    {/* Lotus Base */}
    <path
      d="M20 70 Q50 78 80 70 Q50 73 20 70 Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export const GaneshaSymbol: React.FC<{ className?: string }> = ({ className = 'w-12 h-12 text-[#721B29]' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Traditional Stylized Ganesha */}
    <path
      d="M50 15 Q68 15 68 32 Q68 50 50 56 Q42 58 38 66 Q35 74 42 82 Q48 88 56 86 Q62 84 62 76"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="56" cy="28" r="3.5" fill="currentColor" />
    <path
      d="M36 28 Q44 24 50 24"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Tilak / Trishul mark */}
    <path
      d="M44 38 Q48 35 52 38 M48 32 V44"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Modak symbol */}
    <circle cx="68" cy="74" r="5" fill="#D4AF37" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const WaxSealEmbossed: React.FC<{
  monogram?: string;
  onClick?: () => void;
  className?: string;
  isOpening?: boolean;
  theme?: 'gold' | 'burgundy';
}> = ({ monogram = 'M&H', onClick, className = '', isOpening = false, theme = 'gold' }) => {
  const isGold = theme === 'gold';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open wedding invitation"
      className={`group relative flex items-center justify-center cursor-pointer transition-transform duration-500 hover:scale-105 active:scale-95 ${className} ${
        isOpening ? 'scale-110 opacity-80' : ''
      }`}
    >
      {/* Ambient shadow and glow */}
      <div className={`absolute inset-0 rounded-full blur-md transition-all duration-300 ${
        isGold ? 'bg-[#D4AF37]/40 group-hover:bg-[#F3E5AB]/60' : 'bg-[#B8860B]/30 group-hover:bg-[#D4AF37]/50'
      }`} />

      {/* Realistic Wax Body with organic stamped rim */}
      <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-xl">
        <defs>
          {isGold ? (
            <radialGradient id="waxGradGold" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#F5E4A8" />
              <stop offset="35%" stopColor="#D4AF37" />
              <stop offset="70%" stopColor="#AA7A1E" />
              <stop offset="100%" stopColor="#7A520B" />
            </radialGradient>
          ) : (
            <radialGradient id="waxGradBurgundy" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#8E2333" />
              <stop offset="45%" stopColor="#681522" />
              <stop offset="85%" stopColor="#430B13" />
              <stop offset="100%" stopColor="#28050A" />
            </radialGradient>
          )}
          <linearGradient id="goldRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2BF" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8A6314" />
          </linearGradient>
        </defs>

        {/* Irregular Wax Rim */}
        <path
          d="M50 4 C64 3, 76 9, 87 19 C98 30, 99 44, 96 58 C93 72, 85 84, 72 92 C58 99, 43 97, 29 93 C16 88, 7 77, 4 63 C1 48, 5 34, 14 22 C24 10, 36 4, 50 4 Z"
          fill={isGold ? 'url(#waxGradGold)' : 'url(#waxGradBurgundy)'}
          stroke="url(#goldRimGrad)"
          strokeWidth="1.5"
        />

        {/* Inner Indented Ring */}
        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke={isGold ? '#6B4705' : '#430B13'}
          strokeWidth="2.5"
          strokeOpacity="0.8"
        />
        <circle
          cx="50"
          cy="50"
          r="34"
          fill="none"
          stroke="url(#goldRimGrad)"
          strokeWidth="1.2"
          strokeDasharray="2 2"
        />

        {/* Stamped dots */}
        <circle cx="50" cy="18" r="2" fill={isGold ? '#FFF2BF' : '#D4AF37'} />
        <circle cx="50" cy="82" r="2" fill={isGold ? '#FFF2BF' : '#D4AF37'} />
        <circle cx="18" cy="50" r="2" fill={isGold ? '#FFF2BF' : '#D4AF37'} />
        <circle cx="82" cy="50" r="2" fill={isGold ? '#FFF2BF' : '#D4AF37'} />
      </svg>

      {/* Embossed Gold Monogram Text - Only M&H */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className={`font-cinzel text-lg sm:text-xl font-black tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] ${
          isGold ? 'text-[#3E2703]' : 'gold-foil-text'
        }`}>
          {monogram}
        </span>
      </div>
    </button>
  );
};

export const SectionDivider: React.FC<{ title?: string; subtitle?: string; className?: string }> = ({
  title,
  subtitle,
  className = 'my-12 text-center',
}) => (
  <div className={`relative ${className}`}>
    <div className="flex items-center justify-center gap-4">
      <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      <LotusEmblem className="w-6 h-6 text-[#721B29]" />
      <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
    </div>
    {title && (
      <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-serif text-[#721B29] tracking-wide">
        {title}
      </h2>
    )}
    {subtitle && (
      <p className="mt-1 text-xs sm:text-sm uppercase tracking-widest text-[#B8860B] font-medium">
        {subtitle}
      </p>
    )}
  </div>
);
