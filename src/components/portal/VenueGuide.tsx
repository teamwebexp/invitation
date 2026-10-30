import React from 'react';
import { MapPin, Navigation, Plane, Train, Hotel, PhoneCall, ExternalLink } from 'lucide-react';
import { WEDDING_DATA } from '../../data/weddingData';
import { SectionDivider } from '../common/Ornaments';

export const VenueGuide: React.FC = () => {
  return (
    <section id="venue" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#FAF7F2]">
      <div className="max-w-5xl mx-auto">
        <SectionDivider
          title="Venue & Travel Guide"
          subtitle="Joining Us In The Historic City of Kashipur"
        />

        {/* Venues Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ananya Residency */}
          <div className="bg-white rounded-2xl border-2 border-[#D4AF37]/50 p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#B8860B] bg-[#FAF2E6] px-3 py-1 rounded-full border border-[#D4AF37]/40">
                  Main Celebration Resort
                </span>
                <Hotel className="w-5 h-5 text-[#721B29]" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#721B29] mt-3">
                Ananya Residency
              </h3>

              <div className="flex items-start gap-2 text-xs text-[#684C38] mt-2">
                <MapPin className="w-4 h-4 text-[#721B29] shrink-0 mt-0.5" />
                <span>Ananya Residency, Kashipur, Uttarakhand</span>
              </div>

              <p className="text-xs sm:text-sm text-[#8C6D58] font-serif italic mt-3 leading-relaxed">
                Hosting The Royal Ring Soirée, Haldi Carnival, and the Grand Wedding Ceremony. Luxury accommodations arranged for out-of-town guests.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-[#B8860B] font-semibold">25 &amp; 26 November 2026</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Ananya+Residency+Kashipur"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#721B29] hover:bg-[#8E2333] rounded-lg transition-colors cursor-pointer shadow-md"
              >
                <Navigation className="w-3.5 h-3.5 text-[#F3E5AB]" />
                <span>Directions on Maps</span>
              </a>
            </div>
          </div>

          {/* Residence at Kavi Nagar Colony */}
          <div className="bg-white rounded-2xl border-2 border-[#D4AF37]/50 p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#B8860B] bg-[#FAF2E6] px-3 py-1 rounded-full border border-[#D4AF37]/40">
                  Arora Family Residence
                </span>
                <MapPin className="w-5 h-5 text-[#721B29]" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#721B29] mt-3">
                Our Residence
              </h3>

              <div className="flex items-start gap-2 text-xs text-[#684C38] mt-2">
                <MapPin className="w-4 h-4 text-[#721B29] shrink-0 mt-0.5" />
                <span>Kavi Nagar Colony, Near Sood Hospital, Kashipur</span>
              </div>

              <p className="text-xs sm:text-sm text-[#8C6D58] font-serif italic mt-3 leading-relaxed">
                Hosting the joyous Mehendi celebration, high-tea sweets, sangeet folk songs, and traditional family rituals on 24 November.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-[#B8860B] font-semibold">24 November 2026</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Kavi+Nagar+Colony+Near+Sood+Hospital+Kashipur"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#721B29] hover:bg-[#8E2333] rounded-lg transition-colors cursor-pointer shadow-md"
              >
                <Navigation className="w-3.5 h-3.5 text-[#F3E5AB]" />
                <span>Directions on Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Travel Information Banner */}
        <div className="mt-12 bg-white/80 rounded-2xl border border-[#D4AF37]/40 p-6 sm:p-8 shadow-md">
          <h4 className="font-cinzel text-lg font-bold text-[#721B29] text-center mb-6">
            Transit &amp; Getting to Kashipur
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* By Air */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF6F0] border border-stone-200">
              <Plane className="w-5 h-5 text-[#B8860B] shrink-0 mt-1" />
              <div>
                <h5 className="font-semibold text-xs uppercase tracking-wider text-[#721B29]">
                  Nearest Airports
                </h5>
                <ul className="mt-2 space-y-1.5 text-xs text-[#684C38]">
                  {WEDDING_DATA.travelGuide.nearestAirports.map((airport, idx) => (
                    <li key={idx} className="flex flex-col">
                      <strong className="text-[#4A3828]">{airport.name}</strong>
                      <span className="text-[11px] text-[#8C6D58]">{airport.distance}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* By Rail & Road */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF6F0] border border-stone-200">
              <Train className="w-5 h-5 text-[#721B29] shrink-0 mt-1" />
              <div>
                <h5 className="font-semibold text-xs uppercase tracking-wider text-[#721B29]">
                  Nearest Railway Station
                </h5>
                <p className="mt-2 text-xs text-[#684C38] leading-relaxed">
                  {WEDDING_DATA.travelGuide.nearestRailwayStation}
                </p>
                <div className="mt-4 pt-3 border-t border-stone-200">
                  <span className="text-[11px] font-semibold text-[#B8860B] uppercase tracking-wide">
                    Guest Accommodations:
                  </span>
                  <p className="text-xs text-[#8C6D58] mt-0.5">
                    {WEDDING_DATA.travelGuide.venueAccommodations}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
