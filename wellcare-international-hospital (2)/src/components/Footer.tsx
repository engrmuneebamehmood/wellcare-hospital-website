import {Phone, Mail, MapPin, MessageCircle} from 'lucide-react';
import {HOSPITAL_INFO, buildWhatsAppUrl} from '../data/hospitalData';
import {WellCareLogo} from './WellCareLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({onNavigate}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#072A4A] text-slate-200" aria-label="Hospital Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/15">
          {/* Brand Summary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <WellCareLogo size={40} className="shrink-0 ring-2 ring-white/20" />
              <div>
                <p className="font-display text-lg font-bold text-white leading-tight">
                  {HOSPITAL_INFO.name}
                </p>
                <p className="text-xs text-blue-200">{HOSPITAL_INFO.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {HOSPITAL_INFO.alternativeTagline} Serving Pindi Gheb, District Attock, and
              surrounding communities with 24/7 Emergency and 24/7 Pharmacy services.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={HOSPITAL_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
              >
                Facebook
              </a>
              <a
                href={HOSPITAL_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href={HOSPITAL_INFO.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                {id: 'home', label: 'Home'},
                {id: 'about', label: 'About Us'},
                {id: 'departments', label: 'Medical Departments'},
                {id: 'doctors', label: 'Our Doctors'},
                {id: 'doctor-timings', label: 'Doctor Timings'},
                {id: 'facilities', label: 'Facilities'},
                {id: 'appointment', label: 'Book an Appointment'},
              ].map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.id);
                    }}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-display text-sm font-bold text-white mb-4">
              Contact &amp; Location
            </h3>
            <p className="text-sm text-slate-400 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
              <span>{HOSPITAL_INFO.address}</span>
            </p>
            <p className="text-sm text-slate-400 flex items-center gap-2.5 tabular-nums">
              <Phone className="w-4 h-4 text-red-400 shrink-0" />
              <a href={HOSPITAL_INFO.phoneHref} className="hover:text-white">
                Phone: {HOSPITAL_INFO.phoneDisplay}
              </a>
            </p>
            <p className="text-sm text-slate-400 flex items-center gap-2.5 tabular-nums">
              <MessageCircle className="w-4 h-4 text-teal-400 shrink-0" />
              <a
                href={buildWhatsAppUrl(
                  'Assalam-o-Alaikum, I would like information from WellCare International Hospital.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Mobile / WhatsApp: {HOSPITAL_INFO.mobileDisplay}
              </a>
            </p>
            <p className="text-sm text-slate-400 flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <a href={`mailto:${HOSPITAL_INFO.email}`} className="hover:text-white break-all">
                {HOSPITAL_INFO.email}
              </a>
            </p>
          </div>
        </div>

        {/* Privacy & Medical Disclaimer */}
        <div className="pt-8 space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            <strong className="text-white">Privacy Notice:</strong> Appointment and contact
            requests submitted on this website are transmitted directly through WhatsApp to{' '}
            <span className="tabular-nums">{HOSPITAL_INFO.whatsappDisplay}</span> and are not
            stored in browser local storage or an automated medical database. Submission is an
            appointment request, not a confirmed appointment.
          </p>
          <p>
            <strong className="text-white">Medical Disclaimer:</strong> Information on this
            website is provided for general hospital guidance only and does not replace
            professional medical consultation, diagnosis, or emergency treatment. In a medical
            emergency, please visit our 24/7 Emergency department immediately or call{' '}
            <a href={HOSPITAL_INFO.phoneHref} className="underline text-white tabular-nums">
              {HOSPITAL_INFO.phoneDisplay}
            </a>
            .
          </p>
          <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-300">
            <p>
              &copy; {currentYear} {HOSPITAL_INFO.name}. All rights reserved.
            </p>
            <p>Pindi Gheb, District Attock, Punjab, Pakistan</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
