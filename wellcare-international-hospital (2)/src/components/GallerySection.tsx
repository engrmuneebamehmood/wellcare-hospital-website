import {useEffect, useState} from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Clock,
  Phone,
  MapPin,
} from 'lucide-react';
import {
  GALLERY_ITEMS,
  GalleryItem,
  DOCTOR_SCHEDULES,
  HOSPITAL_INFO,
} from '../data/hospitalData';
import {SafeImage} from './SafeImage';
import {WellCareLogo} from './WellCareLogo';

type GalleryCategory =
  | 'All'
  | 'Hospital'
  | 'Pharmacy & Care'
  | 'Brand & Posters';

const GALLERY_CATEGORIES: GalleryCategory[] = [
  'All',
  'Hospital',
  'Pharmacy & Care',
  'Brand & Posters',
];

function BrandPosterCard({compact = false}: {compact?: boolean}) {
  return (
    <div
      className={`w-full h-full bg-gradient-to-br from-[#0B4F8A] via-[#0E5DA2] to-[#083B68] text-white flex flex-col items-center justify-center text-center ${
        compact ? 'p-6' : 'p-8 sm:p-12'
      }`}
    >
      <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-md mb-4">
        <WellCareLogo size={compact ? 56 : 84} />
      </div>
      <h4
        className={`font-display font-extrabold tracking-tight text-white ${
          compact ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'
        }`}
      >
        WellCare International Hospital
      </h4>
      <p className="text-blue-100 text-xs sm:text-sm font-medium mt-1">
        {HOSPITAL_INFO.locationShort}
      </p>
      <div className="mt-4 pt-3 border-t border-white/20 w-full max-w-xs">
        <p className="font-display font-bold text-white text-sm sm:text-base">
          &ldquo;{HOSPITAL_INFO.tagline}&rdquo;
        </p>
        <p className="text-teal-200 text-xs mt-1">{HOSPITAL_INFO.alternativeTagline}</p>
      </div>
    </div>
  );
}

function TeamPosterCard({compact = false}: {compact?: boolean}) {
  const visibleRows = compact ? DOCTOR_SCHEDULES.slice(0, 5) : DOCTOR_SCHEDULES;
  return (
    <div
      className={`w-full h-full bg-white text-slate-900 flex flex-col justify-between ${
        compact ? 'p-4 sm:p-5' : 'p-6 sm:p-8'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <WellCareLogo size={compact ? 28 : 36} />
            <div>
              <p className="font-display font-bold text-xs sm:text-sm text-[#0B4F8A]">
                WellCare OPD &amp; Specialist Schedule
              </p>
              <p className="text-[11px] text-slate-500">Pindi Gheb, District Attock</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-[#C81E2B]">24/7 Emergency</span>
        </div>

        <ul className="divide-y divide-slate-100 mt-2">
          {visibleRows.map((item) => (
            <li
              key={item.doctorName}
              className="py-1.5 flex items-center justify-between gap-2 text-xs"
            >
              <div className="min-w-0">
                <span className="font-semibold text-slate-900 block truncate">
                  {item.doctorName}
                </span>
                <span className="text-[11px] text-[#0B4F8A]">{item.role}</span>
              </div>
              <div className="text-right shrink-0 tabular-nums">
                <span className="font-medium text-slate-800 block">{item.days}</span>
                <span className="text-[11px] text-slate-500">{item.timings}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-2.5 mt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600 tabular-nums">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-[#0F766E]" />
          <span>Confirm before visiting</span>
        </span>
        <span className="flex items-center gap-1 font-semibold text-[#0B4F8A]">
          <Phone className="w-3 h-3" />
          <span>{HOSPITAL_INFO.phoneDisplay}</span>
        </span>
      </div>
    </div>
  );
}

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    selectedCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const activeItem: GalleryItem | null =
    lightboxIndex !== null && filteredItems[lightboxIndex]
      ? filteredItems[lightboxIndex]
      : null;

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredItems.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const handleCategoryChange = (cat: GalleryCategory) => {
    setLightboxIndex(null);
    setSelectedCategory(cat);
  };

  return (
    <section
      id="gallery"
      className="py-14 lg:py-20 bg-slate-50 border-b border-slate-200"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-sm font-semibold text-[#0B4F8A] mb-2">Hospital Gallery</p>
            <h2
              id="gallery-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight headline-balance"
            >
              Inside WellCare International Hospital
            </h2>
            <p className="text-base text-slate-600 mt-2 max-w-2xl">
              Explore our hospital exterior, 24/7 pharmacy, emergency care bay, diagnostic
              imaging suite, and official hospital posters. Click any image to view larger.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter gallery items"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl border border-slate-200 self-start lg:self-auto"
          >
            {GALLERY_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F8A] ${
                    active
                      ? 'bg-white text-[#0B4F8A] shadow-sm font-semibold'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="group text-left rounded-xl overflow-hidden bg-white border border-slate-200 hover:border-blue-300 transition-colors flex flex-col cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F8A]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 border-b border-slate-200">
                {item.type === 'photo' ? (
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    fallbackTitle={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                  />
                ) : item.type === 'brand-poster' ? (
                  <BrandPosterCard compact />
                ) : (
                  <TeamPosterCard compact />
                )}

                <span className="absolute bottom-3 right-3 w-9 h-9 rounded-lg bg-slate-900/75 text-white flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-[#0B4F8A] mb-1">{item.category}</p>
                  <h3 className="font-display text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-slate-200 bg-slate-50">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#0B4F8A]">{activeItem.category}</p>
                <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 truncate">
                  {activeItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close gallery viewer"
                className="w-10 h-10 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-slate-900 flex items-center justify-center max-h-[68vh] overflow-auto">
              {activeItem.type === 'photo' ? (
                <SafeImage
                  src={activeItem.image}
                  alt={activeItem.title}
                  fallbackTitle={activeItem.title}
                  className="w-full max-h-[65vh] object-contain"
                />
              ) : activeItem.type === 'brand-poster' ? (
                <div className="w-full min-h-[360px] flex">
                  <BrandPosterCard />
                </div>
              ) : (
                <div className="w-full max-w-xl mx-auto my-6 rounded-xl overflow-hidden border border-slate-200">
                  <TeamPosterCard />
                </div>
              )}

              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
                      )
                    }
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-md flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
                    }
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-md flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="px-5 py-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-sm text-slate-700">{activeItem.caption}</p>
              <span className="text-xs text-slate-500 flex items-center gap-1 shrink-0 tabular-nums">
                <MapPin className="w-3.5 h-3.5 text-[#0B4F8A]" />
                <span>
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
