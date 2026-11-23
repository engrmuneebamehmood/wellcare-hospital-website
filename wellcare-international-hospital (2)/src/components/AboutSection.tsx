import {HOSPITAL_IMAGES} from '../data/hospitalData';
import {SafeImage} from './SafeImage';

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-14 lg:py-20 bg-[#F4F8FC] border-b border-slate-200"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-sm font-semibold text-[#0B4F8A] mb-2">About Us</p>
            <h2
              id="about-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#072A4A] tracking-tight headline-balance mb-5"
            >
              Dedicated Multi-Specialty Care for Pindi Gheb &amp; District Attock
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
              WellCare International Hospital aims to provide high-quality medical care to all
              patients. We are a multi-specialty healthcare facility serving Pindi Gheb, Attock and
              surrounding communities. Our aim is to provide accessible healthcare, experienced
              medical professionals, modern diagnostic facilities and compassionate patient care.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="w-full rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-sm flex flex-col">
              <div className="relative aspect-[4/3] w-full bg-slate-100">
                <SafeImage
                  src={HOSPITAL_IMAGES.pharmacy}
                  alt="WellCare International Hospital 24/7 on-site pharmacy interior"
                  fallbackTitle="24/7 Hospital Pharmacy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 sm:p-6 border-t border-slate-200 bg-white">
                <p className="text-xs font-semibold text-[#0F766E] mb-1">
                  24/7 Pharmacy &amp; Diagnostics
                </p>
                <h3 className="font-display text-lg font-bold text-[#072A4A]">
                  Accessible Care Under One Roof
                </h3>
                <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                  From specialist OPD consultations and inpatient wards to laboratory testing,
                  digital X-ray, ultrasound, and our 24/7 pharmacy, patients receive coordinated care
                  without leaving Pindi Gheb.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
