import {useEffect, useState, useCallback} from 'react';
import {MessageCircle, ArrowUp} from 'lucide-react';
import {buildWhatsAppUrl} from './data/hospitalData';
import {Navbar} from './components/Navbar';
import {HeroSection} from './components/HeroSection';
import {AboutSection} from './components/AboutSection';
import {DepartmentsSection} from './components/DepartmentsSection';
import {DoctorsSection} from './components/DoctorsSection';
import {FacilitiesSection} from './components/FacilitiesSection';
import {AppointmentSection} from './components/AppointmentSection';
import {ContactSection} from './components/ContactSection';
import {Footer} from './components/Footer';

const TRACKED_SECTIONS = [
  'home',
  'about',
  'departments',
  'doctors',
  'facilities',
  'appointment',
  'contact',
];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');

  const navigateToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
    if (TRACKED_SECTIONS.includes(sectionId)) {
      setActiveSection(sectionId);
    }
  }, []);

  const handleSelectDepartmentForBooking = useCallback(
    (departmentId: string) => {
      setSelectedDepartmentId(departmentId);
      setSelectedDoctorId('');
      navigateToSection('appointment');
    },
    [navigateToSection]
  );

  const handleSelectDoctorForBooking = useCallback(
    (doctorId: string, departmentId: string) => {
      setSelectedDepartmentId(departmentId);
      setSelectedDoctorId(doctorId);
      navigateToSection('appointment');
    },
    [navigateToSection]
  );

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 420);

      const scrollOffset = window.scrollY + 120;
      for (let i = TRACKED_SECTIONS.length - 1; i >= 0; i--) {
        const id = TRACKED_SECTIONS[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollOffset) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const floatingWhatsAppUrl = buildWhatsAppUrl(
    'Assalam-o-Alaikum, I would like to contact WellCare International Hospital, Pindi Gheb.'
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#0B4F8A] focus:text-white focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <Navbar activeSection={activeSection} onNavigate={navigateToSection} />

      <main id="main-content" className="flex-1">
        <HeroSection
          onBookAppointment={() => navigateToSection('appointment')}
          onExploreDepartments={() => navigateToSection('departments')}
        />

        <AboutSection />

        <DepartmentsSection
          onSelectDepartmentForBooking={handleSelectDepartmentForBooking}
        />

        <DoctorsSection onSelectDoctorForBooking={handleSelectDoctorForBooking} />

        <FacilitiesSection />

        <AppointmentSection
          preselectedDepartmentId={selectedDepartmentId}
          preselectedDoctorId={selectedDoctorId}
        />

        <ContactSection />
      </main>

      <Footer onNavigate={navigateToSection} />

      {/* Floating WhatsApp & Back-to-Top Controls */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5">
        {showBackToTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            aria-label="Back to top"
            className="w-11 h-11 rounded-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-md flex items-center justify-center transition-transform duration-150 hover:scale-105 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F8A]"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        <a
          href={floatingWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with WellCare International Hospital"
          title="WhatsApp WellCare International Hospital"
          className="h-12 px-4 rounded-full bg-[#0F766E] hover:bg-teal-800 text-white shadow-lg flex items-center gap-2 text-sm font-semibold transition-transform duration-150 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
        >
          <MessageCircle className="w-5 h-5 shrink-0" />
          <span className="hidden sm:inline whitespace-nowrap">WhatsApp Us</span>
        </a>
      </div>
    </div>
  );
}
