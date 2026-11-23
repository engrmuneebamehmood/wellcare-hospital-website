import {Phone, MessageCircle, CalendarCheck, MapPin, ShieldPlus, Pill} from 'lucide-react';
import {HOSPITAL_INFO, HOSPITAL_IMAGES, buildWhatsAppUrl} from '../data/hospitalData';
import {SafeImage} from './SafeImage';

interface HeroSectionProps {
  onBookAppointment: () => void;
  onExploreDepartments: () => void;
}

export function HeroSection({onBookAppointment, onExploreDepartments}: HeroSectionProps) {
  const whatsappHeroUrl = buildWhatsAppUrl(
    'Assalam-o-Alaikum, I would like to inquire or request an appointment at WellCare International Hospital, Pindi Gheb.'
  );

  return (
    <section
      id="home"
      className="bg-gradient-to-br from-[#EDF5FC] via-white to-[#F0FAF8] border-b border-slate-200"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-9 pb-11 lg:pt-14 lg:pb-16">
        {/* Two-column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-sm font-semibold text-[#0B4F8A] mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{HOSPITAL_INFO.locationShort} · Open 24/7</span>
            </p>

            <h1
              id="hero-heading"
              className="font-display font-extrabold tracking-tight text-[#072A4A] headline-balance leading-[1.1] mb-3"
              style={{fontSize: 'clamp(2.2rem, 4vw, 3.4rem)'}}
            >
              {HOSPITAL_INFO.tagline}
            </h1>

            <p className="text-base sm:text-lg font-semibold text-[#0F766E] mb-4">
              {HOSPITAL_INFO.alternativeTagline}
            </p>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-7">
              Quality Healthcare, Expert Doctors and Compassionate Care for Pindi Gheb and
              Surrounding Areas.
            </p>

            {/* Primary & Direct Contact Actions */}
            <div className="flex flex-wrap items-center gap-3 mb-7">
              <button
                type="button"
                onClick={onBookAppointment}
                className="min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0B4F8A] hover:bg-[#07345C] text-white text-sm sm:text-base font-semibold shadow-sm transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F8A]"
              >
                <CalendarCheck className="w-4 h-4 shrink-0" />
                <span>Book an Appointment</span>
              </button>

              <a
                href={HOSPITAL_INFO.phoneHref}
                className="min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-red-200 bg-white hover:bg-red-50 text-[#C81E2B] text-sm sm:text-base font-semibold shadow-xs transition-colors duration-150 whitespace-nowrap tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C81E2B]"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Call Now · {HOSPITAL_INFO.phoneDisplay}</span>
              </a>

              <a
                href={whatsappHeroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-teal-200 bg-white hover:bg-teal-50 text-[#0F766E] text-sm sm:text-base font-semibold shadow-xs transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* 24/7 Emergency & 24/7 Pharmacy Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-5 border-t border-slate-200/80">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-[#C81E2B] flex items-center justify-center shrink-0">
                  <ShieldPlus className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#072A4A]">24/7 Emergency Services</h2>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Emergency care and immediate medical triage open day and night.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center shrink-0">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#072A4A]">24/7 Pharmacy</h2>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    On-site hospital pharmacy serving prescriptions around the clock.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Hospital Building Visual */}
          <div className="lg:col-span-6 flex items-center">
            <div className="w-full rounded-2xl overflow-hidden border border-slate-200/90 bg-white p-2 shadow-lg">
              <div className="rounded-xl overflow-hidden bg-slate-100">
                <SafeImage
                  src={HOSPITAL_IMAGES.building}
                  alt="WellCare International Hospital building exterior in Pindi Gheb"
                  fallbackTitle="WellCare International Hospital, Pindi Gheb"
                  className="w-full h-auto object-contain block"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Unified Key Statistics Bar */}
        <div className="mt-10 rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            <div className="p-5 sm:p-6">
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B4F8A] tabular-nums">
                60 Beds
              </p>
              <p className="text-sm font-semibold text-slate-900 mt-1">Hospital Capacity</p>
              <p className="text-xs text-slate-500 mt-0.5">Inpatient &amp; emergency wards</p>
            </div>

            <div className="p-5 sm:p-6">
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B4F8A] tabular-nums">
                22+
              </p>
              <p className="text-sm font-semibold text-slate-900 mt-1">Expert Medical Team</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Specialists, MOs &amp; allied staff
              </p>
            </div>

            <button
              type="button"
              onClick={onExploreDepartments}
              className="text-left p-5 sm:p-6 hover:bg-[#F0F7FF] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0B4F8A]"
            >
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F766E] tabular-nums">
                16
              </p>
              <p className="text-sm font-semibold text-slate-900 mt-1">Multiple Specialties</p>
              <p className="text-xs text-[#0B4F8A] font-semibold mt-0.5">
                View all medical departments &rarr;
              </p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
