import React from 'react';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { FamilyBlessings } from './FamilyBlessings';
import { CoupleStory } from './CoupleStory';
import { EventsTimeline } from './EventsTimeline';
import { PhotoGallery } from './PhotoGallery';
import { VenueGuide } from './VenueGuide';
import { RsvpSection } from './RsvpSection';
import { WhatsAppShare } from './WhatsAppShare';
import { FooterSection } from './FooterSection';

export const WeddingPortal: React.FC<{ onReplayEnvelope: () => void }> = ({ onReplayEnvelope }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#FAF7F2] text-[#2D241E]">
      <Navbar onReplayEnvelope={onReplayEnvelope} />

      <main className="pt-16">
        <HeroSection />

        <div id="family">
          <FamilyBlessings />
        </div>

        <div id="story">
          <CoupleStory />
        </div>

        <div id="events">
          <EventsTimeline />
        </div>

        <div id="gallery">
          <PhotoGallery />
        </div>

        <div id="venue">
          <VenueGuide />
        </div>

        <div id="rsvp">
          <RsvpSection />
        </div>

        <WhatsAppShare />
      </main>

      <FooterSection onReplayEnvelope={onReplayEnvelope} />
    </div>
  );
};
