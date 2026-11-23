import {
  Siren,
  Pill,
  Ambulance,
  FlaskConical,
  ScanLine,
  Waves,
  Wind,
  Smile,
  Activity,
  Phone,
} from 'lucide-react';
import {FACILITIES, Facility, HOSPITAL_INFO} from '../data/hospitalData';

function FacilityIcon({icon}: {icon: Facility['icon']}) {
  const cls = 'w-5 h-5';
  switch (icon) {
    case 'siren':
      return <Siren className={cls} />;
    case 'pill':
      return <Pill className={cls} />;
    case 'ambulance':
      return <Ambulance className={cls} />;
    case 'flask':
      return <FlaskConical className={cls} />;
    case 'scan':
      return <ScanLine className={cls} />;
    case 'waves':
      return <Waves className={cls} />;
    case 'wind':
      return <Wind className={cls} />;
    case 'smile':
      return <Smile className={cls} />;
    case 'activity':
      return <Activity className={cls} />;
  }
}

export function FacilitiesSection() {
  return (
    <section
      id="facilities"
      className="py-14 lg:py-20 bg-white border-b border-slate-200"
      aria-labelledby="facilities-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-semibold text-[#0B4F8A] mb-2">Hospital Facilities</p>
            <h2
              id="facilities-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#072A4A] tracking-tight headline-balance"
            >
              Diagnostic, Emergency &amp; Support Services
            </h2>
            <p className="text-base text-slate-600 mt-2 max-w-2xl">
              Equipped to support urgent care, inpatient wards, diagnostic imaging, laboratory
              investigations, and round-the-clock pharmacy access.
            </p>
          </div>

          <a
            href={HOSPITAL_INFO.phoneHref}
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#C81E2B] hover:bg-red-800 text-white text-sm font-semibold shadow-sm transition-colors whitespace-nowrap tabular-nums self-start lg:self-auto"
          >
            <Phone className="w-4 h-4 shrink-0" />
            <span>Emergency Desk · {HOSPITAL_INFO.phoneDisplay}</span>
          </a>
        </div>

        {/* All 9 Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {FACILITIES.map((facility) => {
            const isEmergency = facility.id === 'emergency-24-7';
            const isPharmacy = facility.id === 'pharmacy-24-7';
            const iconBoxStyle = isEmergency
              ? 'bg-red-50 text-[#C81E2B] border border-red-100'
              : isPharmacy
              ? 'bg-teal-50 text-[#0F766E] border border-teal-100'
              : 'bg-white text-[#0B4F8A] border border-blue-100';

            return (
              <article
                key={facility.id}
                className="p-5 sm:p-6 rounded-2xl bg-[#F8FBFF] hover:bg-white border border-slate-200/90 hover:border-blue-200 hover:shadow-md transition-all duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${iconBoxStyle}`}
                    >
                      <FacilityIcon icon={facility.icon} />
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      {facility.availability}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#072A4A] mb-1.5">
                    {facility.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
