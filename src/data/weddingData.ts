/**
 * Central Wedding Data File for Mahima Arora & Harsh Bajaj
 * All details are editable from this single source of truth.
 */

import img8359 from '../assets/images/IMG_8359_95b6c3f3.jpg';
import img8380 from '../assets/images/IMG_8380_ebb794f9.jpg';
import img8395 from '../assets/images/IMG_8395_18cf06d8.jpg';
import img7794 from '../assets/images/IMG_7794_0bfa9a01.jpg';
import img7568 from '../assets/images/IMG_7568_c9942e7f.PNG';
import img7429 from '../assets/images/IMG_7429.JPG_529e63c1.jpeg';
import img9115 from '../assets/images/IMG_9115.JPG_c4a24840.jpeg';
import img9186 from '../assets/images/IMG_9186.JPG_68a4245e.jpeg';

export interface WeddingEvent {
  id: string;
  name: string;
  dateStr: string; // e.g. "24 November 2026"
  dayStr: string; // e.g. "Tuesday"
  time: string; // e.g. "7:00 PM"
  venueName: string;
  address: string;
  description: string;
  dressCode: string;
  themeColor: string;
  mapQuery: string;
  mapLink: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  fallbackUrl?: string;
  title: string;
  caption: string;
  category: 'Royal' | 'Ceremony' | 'Mandap' | 'Haldi';
}

export const WEDDING_DATA = {
  couple: {
    bride: {
      firstName: 'Mahima',
      fullName: 'Mahima Arora',
      bio: 'Daughter of Late Mr. Surender Arora & Mrs. Sushma Arora',
    },
    groom: {
      firstName: 'Harsh',
      fullName: 'Harsh Bajaj',
      bio: 'Son of Bajaj Family',
    },
    hashtag: '#MahimaFoundHerHarsh',
    monogram: 'M&H',
  },
  dates: {
    weddingDate: '24 November 2026',
    celebrationRange: '24–26 November 2026',
    // Exact ISO target for countdown: 24 Nov 2026 19:00:00 IST (+05:30)
    targetTimestampIso: '2026-11-24T19:00:00+05:30',
  },
  location: {
    city: 'Kashipur',
    state: 'Uttarakhand',
    country: 'India',
    summary: 'Kashipur, Uttarakhand, India',
  },
  family: {
    grandparents: 'Late Smt. & Shri Mohan Lal',
    brideFather: 'Late Mr. Surender Arora',
    brideMother: 'Mrs. Sushma Arora',
    familyAddress: 'Kashmiri Colony, Doiwala, Dehradun',
    blessingQuote: '“With the divine blessings of our beloved elders in heavenly abode, we invite you to grace the auspicious wedding celebrations.”',
    sanskritShloka: '॥ श्री गणेशाय नमः ॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
  },
  events: [
    {
      id: 'mehendi',
      name: 'Mehendi',
      dateStr: '24 November 2026',
      dayStr: 'Tuesday',
      time: '7:00 PM',
      venueName: 'At Our Residence',
      address: 'Kavi Nagar Colony, Near Sood Hospital, Kashipur',
      description: 'An evening of henna fragrance, folk melodies, dhol beats, and colorful celebratory laughter.',
      dressCode: 'Vibrant Greens & Floral Prints',
      themeColor: '#2E7D32',
      mapQuery: 'Kavi Nagar Colony Near Sood Hospital Kashipur',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=Kavi+Nagar+Colony+Near+Sood+Hospital+Kashipur',
    },
    {
      id: 'ring-soiree',
      name: 'The Royal Ring Soirée',
      dateStr: '25 November 2026',
      dayStr: 'Wednesday',
      time: '7:00 PM',
      venueName: 'Ananya Residency',
      address: 'Ananya Residency, Kashipur',
      description: 'A starlit soiree celebrating the exchange of rings, soulful acoustic music, toasts, and dance.',
      dressCode: 'Cocktail Glamour & Royal Tuxedos/Gowns',
      themeColor: '#721B29',
      mapQuery: 'Ananya Residency Kashipur Uttarakhand',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=Ananya+Residency+Kashipur',
    },
    {
      id: 'haldi-carnival',
      name: 'Haldi Carnival',
      dateStr: '26 November 2026',
      dayStr: 'Thursday',
      time: '10:00 PM',
      venueName: 'Ananya Residency',
      address: 'Ananya Residency, Kashipur',
      description: 'Sun-drenched turmeric paste, shower of marigold petals, splash of water, and upbeat festive carnival.',
      dressCode: 'Bright Yellows & Festive Sunshine Silks',
      themeColor: '#F59E0B',
      mapQuery: 'Ananya Residency Kashipur Uttarakhand',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=Ananya+Residency+Kashipur',
    },
    {
      id: 'wedding',
      name: 'Wedding',
      dateStr: '26 November 2026',
      dayStr: 'Thursday',
      time: '7:00 PM',
      venueName: 'Ananya Residency',
      address: 'Ananya Residency, Kashipur',
      description: 'The sacred Saat Phere around the sacred holy fire, Anand Karaj blessings, and the royal union under the illuminated Mandap.',
      dressCode: 'Traditional Royal Indian Finery',
      themeColor: '#B8860B',
      mapQuery: 'Ananya Residency Kashipur Uttarakhand',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=Ananya+Residency+Kashipur',
    },
  ] as WeddingEvent[],
  gallery: [
    {
      id: 'main-8359',
      url: img8359,
      fallbackUrl: '/assets/aistudio/IMG_8359_95b6c3f3.jpg',
      title: 'Moments at Ananya Residency',
      caption: 'Mahima & Harsh outside the wedding celebration venue in Kashipur, looking into each other’s eyes.',
      category: 'Royal',
    },
    {
      id: 'lobby-8380',
      url: img8380,
      fallbackUrl: '/assets/aistudio/IMG_8380_ebb794f9.jpg',
      title: 'The Royal Soirée Finery',
      caption: 'Dressed in handcrafted champagne & ivory embroidered silk at Ananya Residency.',
      category: 'Ceremony',
    },
    {
      id: 'hall-8395',
      url: img8395,
      fallbackUrl: '/assets/aistudio/IMG_8395_18cf06d8.jpg',
      title: 'Regal Elegance',
      caption: 'Walking together down the grand illuminated gallery.',
      category: 'Royal',
    },
    {
      id: 'blessing-7794',
      url: img7794,
      fallbackUrl: '/assets/aistudio/IMG_7794_0bfa9a01.jpg',
      title: 'Warmth of Family & Home',
      caption: 'Heartfelt smiles, eternal love, and sacred family blessings.',
      category: 'Mandap',
    },
    {
      id: 'smile-7568',
      url: img7568,
      fallbackUrl: '/assets/aistudio/IMG_7568_c9942e7f.PNG',
      title: 'Cherished Laughter',
      caption: 'Sweet candid smiles and endless joyful conversations.',
      category: 'Haldi',
    },
    {
      id: 'roses-7429',
      url: img7429,
      fallbackUrl: '/assets/aistudio/IMG_7429.JPG_529e63c1.jpeg',
      title: 'Roses & Promises',
      caption: 'A fresh bouquet of tender roses and everlasting companionship.',
      category: 'Ceremony',
    },
    {
      id: 'evening-9115',
      url: img9115,
      fallbackUrl: '/assets/aistudio/IMG_9115.JPG_c4a24840.jpeg',
      title: 'Starlit Evening',
      caption: 'Quiet moments under the twilight sky.',
      category: 'Haldi',
    },
    {
      id: 'adventures-9186',
      url: img9186,
      fallbackUrl: '/assets/aistudio/IMG_9186.JPG_68a4245e.jpeg',
      title: 'Our Journey of Adventures',
      caption: 'Stepping boldly into our next beautiful chapter together.',
      category: 'Royal',
    },
  ] as GalleryPhoto[],
  story: [
    {
      year: 'The First Spark',
      title: 'When Two Souls Crossed Paths',
      description: 'What began with a shared conversation blossomed into a connection that felt destined from the very beginning.',
    },
    {
      year: 'The Journey of Friendship',
      title: 'Countless Memories & Shared Dreams',
      description: 'Through chai conversations, long drives, and mutual respect for family values, they realized their hearts had found home in each other.',
    },
    {
      year: 'The Forever Promise',
      title: 'Two Families Becoming One',
      description: 'With joyful tears, blessings from our elders, and heartfelt affirmations, Harsh asked Mahima to be his forever partner.',
    },
  ],
  travelGuide: {
    nearestAirports: [
      { name: 'Pantnagar Airport (PGH)', distance: 'Approx. 58 km (1.5 hours drive)' },
      { name: 'Indira Gandhi International Airport, New Delhi (DEL)', distance: 'Approx. 225 km (4.5 hours drive)' },
      { name: 'Dehradun Jolly Grant Airport (DED)', distance: 'Approx. 195 km (4 hours drive)' },
    ],
    nearestRailwayStation: 'Kashipur Junction (KPV) - well connected to Delhi, Lucknow, and Dehradun.',
    venueAccommodations: 'Special guest stays arranged at Ananya Residency & partner suites for family and friends.',
  },
};
