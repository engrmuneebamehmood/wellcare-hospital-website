import {useState, useEffect} from 'react';
import {Menu, X, Phone, MessageCircle, CalendarCheck} from 'lucide-react';
import {HOSPITAL_INFO, buildWhatsAppUrl} from '../data/hospitalData';
import {WellCareLogo} from './WellCareLogo';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  {id: 'home', label: 'Home'},
  {id: 'about', label: 'About Us'},
  {id: 'departments', label: 'Departments'},
  {id: 'doctors', label: 'Our Doctors'},
  {id: 'facilities', label: 'Facilities'},
  {id: 'contact', label: 'Contact'},
];

export function Navbar({activeSection, onNavigate}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  const whatsappGeneralUrl = buildWhatsAppUrl(
    'Assalam-o-Alaikum, I would like information from WellCare International Hospital, Pindi Gheb.'
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="h-1 w-full bg-gradient-to-r from-[#0B4F8A] via-[#0F766E] to-[#0B4F8A]" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6 lg:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F8A] rounded-md"
        >
          <WellCareLogo size={36} className="shrink-0 ring-1 ring-slate-200" />
          <span className="font-display text-sm sm:text-base xl:text-lg font-bold tracking-tight text-[#072A4A] whitespace-nowrap truncate max-w-[235px] sm:max-w-none">
            WellCare International Hospital PindiGheb
          </span>
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-slate-600"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B4F8A] ${
                  isActive
                    ? 'border-[#0B4F8A] text-[#0B4F8A] font-semibold'
                    : 'border-transparent hover:text-[#072A4A] hover:border-slate-300'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('appointment')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#0B4F8A] hover:bg-[#07345C] rounded-lg shadow-xs transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F8A]"
          >
            Book Appointment
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F8A]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden bg-white border-b border-slate-200 shadow-lg"
        >
          <nav
            aria-label="Mobile Navigation"
            className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  className={`px-3 py-3 rounded-lg text-base font-medium transition-colors min-h-[44px] flex items-center ${
                    isActive
                      ? 'bg-blue-50 text-[#0B4F8A] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            <div className="pt-3 mt-2 border-t border-slate-200 grid grid-cols-1 gap-2.5">
              <button
                type="button"
                onClick={() => handleLinkClick('appointment')}
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#0B4F8A] hover:bg-[#083B68] text-white text-sm font-semibold cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book an Appointment</span>
              </button>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={HOSPITAL_INFO.phoneHref}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-red-200 bg-red-50 text-[#C81E2B] text-sm font-semibold tabular-nums"
                >
                  <Phone className="w-4 h-4" />
                  <span>{HOSPITAL_INFO.phoneDisplay}</span>
                </a>
                <a
                  href={whatsappGeneralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-teal-200 bg-teal-50 text-[#0F766E] text-sm font-semibold"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
