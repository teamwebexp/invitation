import React from 'react';
import { Calendar, Clock, MapPin, Navigation, Sparkles } from 'lucide-react';
import { WEDDING_DATA, WeddingEvent } from '../../data/weddingData';
import { SectionDivider } from '../common/Ornaments';

export const EventsTimeline: React.FC = () => {
  // Generate Google Calendar Link for an event
  const getGoogleCalendarUrl = (event: WeddingEvent) => {
    // Mapping event times to rough 2026 dates (IST +05:30)
    let startIso = '20261124T190000';
    let endIso = '20261124T230000';

    if (event.id === 'ring-soiree') {
      startIso = '20261125T190000';
      endIso = '20261125T235900';
    } else if (event.id === 'haldi-carnival') {
      startIso = '20261126T220000';
      endIso = '20261127T020000';
    } else if (event.id === 'wedding') {
      startIso = '20261126T190000';
      endIso = '20261127T040000';
    }

    const title = encodeURIComponent(`${event.name} - Mahima & Harsh Wedding`);
    const details = encodeURIComponent(
      `${event.description}\nDress Code: ${event.dressCode}\nVenue: ${event.venueName}, ${event.address}`
    );
    const location = encodeURIComponent(`${event.venueName}, ${event.address}`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  };

  return (
    <section id="events" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#FAF7F2]">
      <div className="max-w-5xl mx-auto">
        <SectionDivider
          title="Celebration Itinerary"
          subtitle="Four Enchanting Ceremonies Across 24–26 November 2026"
        />

        <div className="mt-12 space-y-8">
          {WEDDING_DATA.events.map((event, index) => {
            return (
              <div
                key={event.id}
                className="relative bg-white/95 rounded-2xl border border-[#D4AF37]/50 shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 overflow-hidden group"
              >
                {/* Top Subtle Gold Accent Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: event.themeColor }}
                />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left: Date & Sequence */}
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="flex flex-col items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-b from-[#FAF4EA] to-[#F5ECE0] border border-[#D4AF37]/60 text-center shrink-0 shadow-inner">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#B8860B]">
                        {event.dayStr}
                      </span>
                      <span className="font-cinzel text-2xl font-black text-[#721B29] leading-none mt-0.5">
                        {event.dateStr.split(' ')[0]}
                      </span>
                      <span className="text-[10px] uppercase font-medium text-[#8C6D58]">
                        NOV 2026
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-widest text-[#B8860B] font-semibold">
                          Ceremony 0{index + 1}
                        </span>
                        <span className="text-stone-300">·</span>
                        <div className="flex items-center gap-1 text-xs font-semibold text-[#721B29]">
                          <Clock className="w-3.5 h-3.5 text-[#B8860B]" />
                          <span>{event.time}</span>
                        </div>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#721B29] mt-1 group-hover:text-[#8E2333] transition-colors">
                        {event.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#684C38] mt-1.5 font-serif italic max-w-xl">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Venue & Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-stone-200">
                    <div className="text-left lg:text-right">
                      <div className="flex items-center lg:justify-end gap-1.5 text-xs font-semibold text-[#4A3828]">
                        <MapPin className="w-3.5 h-3.5 text-[#721B29]" />
                        <span>{event.venueName}</span>
                      </div>
                      <p className="text-xs text-[#8C6D58] mt-0.5 max-w-xs">
                        {event.address}
                      </p>
                      <p className="text-[11px] text-[#B8860B] font-medium mt-1">
                        Dress Code: <span className="text-[#4A3828] font-normal">{event.dressCode}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={event.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#721B29] bg-[#FAF2E6] hover:bg-[#F3E5AB] border border-[#D4AF37] rounded-lg transition-colors cursor-pointer"
                      >
                        <Navigation className="w-3.5 h-3.5 text-[#B8860B]" />
                        <span>Google Maps</span>
                      </a>

                      <a
                        href={getGoogleCalendarUrl(event)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#4A3828] bg-white hover:bg-stone-50 border border-stone-300 rounded-lg transition-colors cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#8C6D58]" />
                        <span>Add to Calendar</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on timings */}
        <div className="mt-8 p-4 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-center">
          <p className="text-xs text-[#8C6D58] font-serif italic">
            Note: All functions will commence strictly on auspicious muhurat timings. Kashipur local transfers are available for visiting family and guests.
          </p>
        </div>
      </div>
    </section>
  );
};
