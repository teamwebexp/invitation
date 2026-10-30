import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera, Sparkles } from 'lucide-react';
import { WEDDING_DATA, GalleryPhoto } from '../../data/weddingData';
import { SectionDivider } from '../common/Ornaments';

export const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(WEDDING_DATA.gallery);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const categories = ['All', 'Royal', 'Ceremony', 'Mandap', 'Haldi'];

  const filteredPhotos = activeCategory === 'All'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedPhotoIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % filteredPhotos.length : 0));
      } else if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : 0
        );
      }
    },
    [selectedPhotoIndex, filteredPhotos.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  // Custom photo upload helper for couple & family
  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const newPhoto: GalleryPhoto = {
          id: `custom-${Date.now()}`,
          url: reader.result,
          title: file.name.replace(/\.[^/.]+$/, ''),
          caption: 'Cherished memories shared by our family',
          category: 'Royal',
        };
        setPhotos((prev) => [newPhoto, ...prev]);
        setActiveCategory('All');
      }
    };
    reader.readAsDataURL(file);
  };

  const currentPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  return (
    <section id="gallery" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionDivider
          title="Celebration Gallery"
          subtitle="Curated Moments & Royal Traditions"
        />

        {/* Filter Categories and Photo Upload CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-white rounded-xl border border-[#D4AF37]/40 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#721B29] text-white shadow-sm'
                    : 'text-[#684C38] hover:text-[#721B29] hover:bg-[#FAF2E6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Upload Custom Photo Button */}
          <label className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#721B29] bg-white hover:bg-[#FAF2E6] border border-[#D4AF37] rounded-xl shadow-sm cursor-pointer transition-colors">
            <Camera className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Add Couple Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleCustomUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Photo Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border-2 border-[#D4AF37]/50 bg-stone-900 cursor-pointer transition-all duration-300 aspect-[3/4]"
            >
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  if (photo.fallbackUrl && e.currentTarget.src !== window.location.origin + photo.fallbackUrl) {
                    e.currentTarget.src = photo.fallbackUrl;
                  }
                }}
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Zoom Affordance Icon */}
              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-[#F3E5AB]" />
              </div>

              {/* Text Info */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#F3E5AB] font-cinzel">
                  {photo.category}
                </span>
                <h4 className="font-serif text-lg font-semibold leading-snug text-white mt-0.5">
                  {photo.title}
                </h4>
                <p className="text-xs text-white/70 line-clamp-2 mt-1 font-sans">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          FULLSCREEN LIGHTBOX MODAL WITH ZOOM & NAVIGATION
          ======================================================== */}
      {currentPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md select-none"
          onClick={closeLightbox}
        >
          {/* Close Lightbox Button */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close Lightbox"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevPhoto}
            aria-label="Previous Photo"
            className="absolute left-2 sm:left-6 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-[#D4AF37]/50 transition-colors cursor-pointer z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={nextPhoto}
            aria-label="Next Photo"
            className="absolute right-2 sm:right-6 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-[#D4AF37]/50 transition-colors cursor-pointer z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image Box */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-xl overflow-hidden border-2 border-[#D4AF37] shadow-2xl bg-black">
              <img
                src={currentPhoto.url}
                alt={currentPhoto.title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
                onError={(e) => {
                  if (currentPhoto.fallbackUrl && e.currentTarget.src !== window.location.origin + currentPhoto.fallbackUrl) {
                    e.currentTarget.src = currentPhoto.fallbackUrl;
                  }
                }}
              />
            </div>

            {/* Lightbox Caption */}
            <div className="mt-4 text-center text-white max-w-lg">
              <span className="text-[11px] uppercase tracking-widest text-[#F3E5AB] font-cinzel">
                {currentPhoto.category} · Photo {(selectedPhotoIndex ?? 0) + 1} of {filteredPhotos.length}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mt-1 text-white">
                {currentPhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-serif italic mt-0.5">
                {currentPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
