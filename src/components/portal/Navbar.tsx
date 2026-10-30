import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { WEDDING_DATA } from '../../data/weddingData';

export const Navbar: React.FC<{ onReplayEnvelope: () => void }> = ({ onReplayEnvelope }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Events', href: '#events' },
    { label: 'Family', href: '#family' },
    { label: 'Our Story', href: '#story' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Venue', href: '#venue' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-md border-b border-[#D4AF37]/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Single element brand wordmark */}
        <a
          href="#"
          className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-[#721B29] whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
        >
          Mahima &amp; Harsh
        </a>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-[#4A3828]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#721B29] transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onReplayEnvelope}
            className="text-[11px] uppercase tracking-wider text-[#B8860B] hover:text-[#721B29] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Open Envelope
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#rsvp"
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#721B29] hover:bg-[#8E2333] rounded-full transition-colors whitespace-nowrap shrink-0 shadow-sm border border-[#D4AF37]"
          >
            RSVP
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-[#721B29] hover:bg-[#FAF2E6] rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#D4AF37]/40 px-4 py-4 shadow-xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#4A3828] hover:text-[#721B29] py-1 border-b border-stone-100"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onReplayEnvelope();
              }}
              className="text-left text-xs uppercase tracking-wider text-[#B8860B] hover:text-[#721B29] py-1"
            >
              Replay Envelope Opening
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
