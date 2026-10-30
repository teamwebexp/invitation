# Luxury Indian Wedding Invitation: Mahima Arora & Harsh Bajaj

A mobile-responsive digital wedding invitation web application crafted with an aesthetic of ivory, champagne, antique gold, and deep royal burgundy accents. The experience guides guests through a physical-feeling envelope opening ritual, an interactive scratch card to unveil the wedding date, and unlocks a full wedding portal with event itineraries, family blessings, editorial photo gallery, RSVP system, and ambient classical raga music.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following directions have been confirmed and will guide the build:
> - **Gallery & Visuals**: Curated romantic Indian wedding editorial portraits with full-screen lightbox navigation, preserving high-fashion traditional attire aesthetics.
> - **Musical Ambience**: Romantic flute and acoustic sitar melody (synthesized via Web Audio API harmonics with zero external CDN audio dependencies) initiated on user interaction with floating play/pause and mute controls.
> - **Color & Visual Theme**: Royal ivory canvas (`#FAF7F2`), warm antique gold foil trims (`#D4AF37`, `#B8860B`), and deep burgundy accents (`#721B29`, `#58111A`) with delicate botanical and mandap motifs.
> - **Date Protection**: The date "24 NOVEMBER 2026" remains strictly hidden from DOM text, countdown engines, and meta tags until the scratch card reaches 45% cleared or the user triggers the reveal button.

---

## 1. Overview & Core Concept

- **What It Does**: Transmutes traditional Indian wedding card customs into a digital medium. Guests tap an ivory envelope sealed with an embossed gold "M&H" wax seal, watch it unfold, scratch away a gold-foil card to uncover the wedding date, and celebrate as the full celebration hub unlocks with event schedules, directions, blessings, gallery, and RSVPs.
- **Target Audience**: Family, close relatives, and wedding guests accessing the invitation across smartphones, tablets, and desktop browsers.
- **Key Value**: Delivers the tactile surprise of a luxury physical wedding invitation while offering digital perks: 1-click Google Maps navigation, calendar reminders, instant WhatsApp forwarding, and interactive RSVPs.

---

## 2. User Experience & Visual Design

### Step-by-Step Experience Flow

```
┌────────────────────────────────────────────────────────┐
│  Phase 1: Closed Royal Envelope                        │
│  • Ivory textured paper with gold corner filigree      │
│  • Embossed "M&H" burgundy wax seal with shimmer       │
│  • "Tap to Open Invitation" pulsating gold button      │
└──────────────────────────┬─────────────────────────────┘
                           │ User Tap / Click
                           ▼
┌────────────────────────────────────────────────────────┐
│  Phase 2: Unfolding & Sliding Card                     │
│  • Envelope top flap flips open with 3D perspective   │
│  • Inner floral lining revealed                        │
│  • Gilded invitation card slides forward & scales up   │
│  • Couple's names revealed: "Mahima Arora & Harsh Bajaj"│
│  • Background sitar & bansuri music gently starts      │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│  Phase 3: Interactive Scratch-to-Reveal                │
│  • HTML5 Canvas overlay with sparkling gold-dust coat  │
│  • Touch / drag scratching physics with trail sparks   │
│  • Progress tracking; auto-completes at 45% scratched  │
│  • Accessible "Reveal Date" instant button fallback   │
└──────────────────────────┬─────────────────────────────┘
                           │ Scratched >= 45% or Tap
                           ▼
┌────────────────────────────────────────────────────────┐
│  Phase 4: Celebration Burst & Date Unveiling           │
│  • Golden marigold and sparkle particle celebration    │
│  • Date unveiled: "24 NOVEMBER 2026"                   │
│  • Smooth morph into complete wedding website          │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│  Phase 5: Full Wedding Hub Unlocked                    │
│  • Live Countdown to Nov 24, 2026 7:00 PM IST          │
│  • Family Lineage & Blessings                          │
│  • 4 Detailed Itinerary Events with Google Maps Links  │
│  • Curated Editorial Portrait Gallery with Lightbox    │
│  • Working RSVP Form (guest count, diet, wishes)       │
│  • 1-Click WhatsApp Invite Sharing                     │
│  • Ambient Music Floating Controller                   │
└────────────────────────────────────────────────────────┘
```

### Visual Identity & Theme
- **Dominant Canvas (60%)**: Warm ivory & soft alabaster (`#FBF9F5` / `#FAF6F0`) with subtle sub-surface paper texture.
- **Structural Surfaces (30%)**: Antique gold hairline borders (`#C5A059`), champagne card fills (`#F5EFEB`), and rich parchment panels.
- **Accent Budget (10%)**: Royal imperial burgundy (`#721B29`, `#4A0E17`) for typography highlights, wax seals, and primary interactive buttons.
- **Typography**:
  - *Headings & Couple Names*: High-contrast editorial luxury serif (`Cormorant Garamond` / `Playfair Display`).
  - *Body Prose & Itineraries*: Refined contemporary sans (`Plus Jakarta Sans` / `Outfit`).
  - *Event Timings & Countdown*: Tabular numerals with tracking.
- **Ornaments**: Bespoke SVG mandap arches, paisley (ambi) filigree corners, marigold garlands, and lotus emblems.

---

## 3. Key Product Decisions & Trade-Offs

- **Date Obfuscation Security**: The reveal date is initialized inside React state only upon completing the scratch gesture or pressing the reveal button. It will not appear in the initial HTML or meta tags, ensuring genuine suspense.
- **Scratch Card Engine**: Built with a zero-dependency HTML5 `<canvas>` using `globalCompositeOperation = 'destination-out'` to ensure fluid 60fps touch and pointer scratching across mobile devices.
- **Audio Architecture**: Synthesizes a soothing Indian acoustic sitar-and-flute ambient raga using Web Audio API harmonic oscillators and convolution reverb. This avoids external audio CDN failures, audio licensing blockers, or broken media links.
- **Central Data Architecture**: All names, dates, addresses, family details, and event times are strictly decoupled in `src/data/weddingData.ts` for clean maintainability.

---

## 4. Technical Architecture & Component Mapping

```
┌──────────────────────────────────────────────────────────────────┐
│                         App.tsx (Root)                           │
│   • Manages global stage: [envelope -> card -> reveal -> portal] │
│   • Audio controller state (playing / muted / volume)            │
└───────┬──────────────────────────────────────────────────┬───────┘
        │                                                  │
   [Stage < portal]                                  [Stage = portal]
        │                                                  │
        ▼                                                  ▼
┌──────────────────────────────┐        ┌──────────────────────────────────┐
│ EnvelopeExperience.tsx       │        │ WeddingPortal.tsx                │
│ • Envelope3D.tsx             │        │ • HeroSection.tsx (Countdown)    │
│   - Flap animation           │        │ • FamilyBlessings.tsx            │
│   - Wax seal button          │        │ • CoupleStory.tsx                │
│ • InvitationCard.tsx         │        │ • EventsTimeline.tsx             │
│ • ScratchCard.tsx            │        │ • VenueGuide.tsx (Google Maps)   │
│ • CelebrationModal.tsx       │        │ • PhotoGallery.tsx (Lightbox)    │
└──────────────────────────────┘        │ • RsvpSection.tsx (LocalStorage) │
                                        │ • WhatsAppShare.tsx              │
                                        │ • MusicPlayerFloating.tsx        │
                                        │ • FooterSection.tsx              │
                                        └──────────────────────────────────┘
```

### Wedding Events Specification
All 4 wedding events will be rendered with exact details, icons, and direct Google Maps directions:
1. **Mehendi**: 24 November, 7:00 PM at Residence, Kavi Nagar Colony, Near Sood Hospital, Kashipur.
2. **The Royal Ring Soirée**: 25 November, 7:00 PM at Ananya Residency, Kashipur.
3. **Haldi Carnival**: 26 November, 10:00 PM at Ananya Residency, Kashipur.
4. **Wedding**: 26 November, 7:00 PM at Ananya Residency, Kashipur.

### Family Blessings & Lineage Details
- **Paternal Grandparents**: Late Smt. & Shri Mohan Lal
- **Bride's Parents**: Late Mr. Surender Arora & Mrs. Sushma Arora
- **Family Residence**: Kashmiri Colony, Doiwala, Dehradun

---

## 5. Verification & Testing Plan

1. **Envelope Interaction**: Verify 3D flap opening, wax seal click responsiveness, and card translation across mobile touch and desktop.
2. **Scratch Mechanics**: Verify scratch gesture on touch screens and mouse pointers, checking that threshold (45%) triggers the celebration burst automatically. Verify alternate tap-to-reveal button.
3. **Date Confidentiality**: Ensure "24 NOVEMBER 2026" is completely absent from DOM until scratched.
4. **Countdown Timer**: Test countdown mathematics against target timestamp `2026-11-24T19:00:00+05:30`.
5. **RSVP & Local Storage**: Submit sample RSVPs and verify saved state persists across page refreshes.
6. **WhatsApp Invite Link**: Verify generated `whatsapp://send` and `https://api.whatsapp.com/send` links with prefilled text containing event details without hardcoding invalid phone numbers.
7. **Compilation & Responsiveness**: Run `compile_applet` and test layout across mobile (375px), tablet (768px), and desktop (1440px).
