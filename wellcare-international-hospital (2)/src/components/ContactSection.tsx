import {useRef, useState, FormEvent} from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  ExternalLink,
  Clock,
  Send,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import {HOSPITAL_INFO, buildWhatsAppUrl} from '../data/hospitalData';

interface EnquiryState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface EnquiryErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export function ContactSection() {
  const [enquiry, setEnquiry] = useState<EnquiryState>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [preparedUrl, setPreparedUrl] = useState<string | null>(null);
  const waAnchorRef = useRef<HTMLAnchorElement | null>(null);

  const validate = (): EnquiryErrors => {
    const next: EnquiryErrors = {};
    if (!enquiry.name.trim()) {
      next.name = 'Please enter your name.';
    }
    const digits = enquiry.phone.replace(/[\s\-()]/g, '');
    if (!digits || !/^(\+?92|0)?[0-9]{9,12}$/.test(digits)) {
      next.phone = 'Please enter a valid phone number.';
    }
    if (enquiry.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email.trim())) {
      next.email = 'Please enter a valid email address or leave it blank.';
    }
    if (!enquiry.message.trim() || enquiry.message.trim().length < 5) {
      next.message = 'Please enter your message or enquiry.';
    }
    return next;
  };

  const handleEnquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const lines = [
      'Assalam-o-Alaikum, General Enquiry for WellCare International Hospital:',
      '',
      `Name: ${enquiry.name.trim()}`,
      `Phone: ${enquiry.phone.trim()}`,
      enquiry.email.trim() ? `Email: ${enquiry.email.trim()}` : null,
      `Message: ${enquiry.message.trim()}`,
    ].filter(Boolean);
    const url = buildWhatsAppUrl(lines.join('\n'));
    setPreparedUrl(url);
    window.setTimeout(() => {
      waAnchorRef.current?.click();
    }, 60);
  };

  return (
    <section
      id="contact"
      className="py-14 lg:py-20 bg-white border-b border-slate-200"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#0B4F8A] mb-2">Contact Us</p>
          <h2
            id="contact-heading"
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#072A4A] tracking-tight headline-balance"
          >
            Visit or Contact WellCare International Hospital
          </h2>
          <p className="text-base text-slate-600 mt-2 max-w-2xl">
            Reach our reception desk by phone, WhatsApp, email, or visit us at New Lari Ada,
            Pindi Gheb, District Attock.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info + Map */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#F8FBFF] border border-slate-200/90">
                <div className="w-10 h-10 rounded-xl bg-white border border-blue-100 text-[#0B4F8A] shadow-2xs flex items-center justify-center mb-3">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-bold text-[#072A4A] mb-1">
                  Hospital Address
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  {HOSPITAL_INFO.address}
                </p>
                <a
                  href={HOSPITAL_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B4F8A] hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8FBFF] border border-slate-200/90">
                <div className="w-10 h-10 rounded-xl bg-white border border-red-100 text-[#C81E2B] shadow-2xs flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-bold text-[#072A4A] mb-1">
                  Hospital Hours
                </h3>
                <p className="text-sm font-semibold text-[#072A4A] mb-1">
                  Open 24/7
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Emergency Services and Hospital Pharmacy are open 24 hours a day, 7 days a
                  week.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8FBFF] border border-slate-200/90">
                <div className="w-10 h-10 rounded-xl bg-white border border-red-100 text-[#C81E2B] shadow-2xs flex items-center justify-center mb-3">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-bold text-[#072A4A] mb-1">
                  Phone &amp; WhatsApp
                </h3>
                <div className="space-y-1.5 text-sm tabular-nums">
                  <p>
                    <span className="text-slate-500">Phone: </span>
                    <a
                      href={HOSPITAL_INFO.phoneHref}
                      className="font-semibold text-[#0B4F8A] hover:underline"
                    >
                      {HOSPITAL_INFO.phoneDisplay}
                    </a>
                  </p>
                  <p>
                    <span className="text-slate-500">Mobile / WhatsApp: </span>
                    <a
                      href={buildWhatsAppUrl(
                        'Assalam-o-Alaikum, I would like to contact WellCare International Hospital.'
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#0F766E] hover:underline"
                    >
                      {HOSPITAL_INFO.mobileDisplay}
                    </a>
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={HOSPITAL_INFO.phoneHref}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-[#C81E2B] text-xs font-semibold hover:bg-red-100"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={buildWhatsAppUrl(
                      'Assalam-o-Alaikum, I would like to contact WellCare International Hospital.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 text-[#0F766E] text-xs font-semibold hover:bg-teal-100"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8FBFF] border border-slate-200/90">
                <div className="w-10 h-10 rounded-xl bg-white border border-blue-100 text-[#0B4F8A] shadow-2xs flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-bold text-[#072A4A] mb-1">
                  Email Address
                </h3>
                <p className="text-xs text-slate-500 mb-2">
                  For general hospital inquiries:
                </p>
                <a
                  href={`mailto:${HOSPITAL_INFO.email}`}
                  className="text-sm font-semibold text-[#0B4F8A] hover:underline break-all"
                >
                  {HOSPITAL_INFO.email}
                </a>
              </div>
            </div>

            {/* Free Keyless Embedded Map for Pindi Gheb */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
              <div className="px-5 py-3.5 border-b border-slate-200 bg-[#F8FBFF] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-sm sm:text-base font-bold text-[#072A4A]">
                    Location Map — Pindi Gheb, District Attock
                  </h3>
                  <p className="text-xs text-slate-500">
                    New Lari Ada, Near Attock Filling Station, Pindi Gheb
                  </p>
                </div>
                <a
                  href={HOSPITAL_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B4F8A] text-white text-xs font-semibold hover:bg-[#07345C]"
                >
                  <span>Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="w-full h-64 sm:h-72 bg-slate-100">
                <iframe
                  title="Map of Pindi Gheb, District Attock, Punjab, Pakistan"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=72.2350%2C33.2250%2C72.2950%2C33.2580&amp;layer=mapnik&amp;marker=33.2414%2C72.2647"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column: WhatsApp Contact Enquiry Form */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F8FBFF] border border-slate-200/90 shadow-sm">
              <h3 className="font-display text-xl font-bold text-[#072A4A] mb-1.5">
                Send an Enquiry via WhatsApp
              </h3>
              <p className="text-sm text-slate-600 mb-5">
                Your enquiry is formatted and sent directly through WhatsApp to{' '}
                <span className="tabular-nums font-medium">{HOSPITAL_INFO.mobileDisplay}</span>
                — not stored in any browser database.
              </p>

              {preparedUrl ? (
                <div className="space-y-4" role="status" aria-live="polite">
                  <a
                    ref={waAnchorRef}
                    href={preparedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sr-only"
                  >
                    Open WhatsApp Enquiry
                  </a>

                  <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                    <div className="text-sm text-slate-800">
                      <p className="font-semibold text-slate-900">Enquiry Ready for WhatsApp</p>
                      <p className="text-xs text-slate-600 mt-1">
                        If WhatsApp did not open automatically, click the button below to send
                        your message.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <a
                      href={preparedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0F766E] hover:bg-teal-800 text-white text-sm font-semibold"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Open WhatsApp &amp; Send Message</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setPreparedUrl(null);
                        setEnquiry({name: '', phone: '', email: '', message: ''});
                      }}
                      className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Send Another Enquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} noValidate className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                      Your Name <span className="text-[#C81E2B]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={enquiry.name}
                      onChange={(e) => setEnquiry((p) => ({...p, name: e.target.value}))}
                      placeholder="Enter your name"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#0B4F8A] focus:ring-2 focus:ring-blue-100"
                    />
                    {errors.name && (
                      <p className="text-xs text-[#C81E2B] mt-1 font-medium">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                      Phone / Mobile Number <span className="text-[#C81E2B]">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={enquiry.phone}
                      onChange={(e) => setEnquiry((p) => ({...p, phone: e.target.value}))}
                      placeholder="03XX-XXXXXXX"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 tabular-nums focus:outline-none focus:border-[#0B4F8A] focus:ring-2 focus:ring-blue-100"
                    />
                    {errors.phone && (
                      <p className="text-xs text-[#C81E2B] mt-1 font-medium">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                      Email <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={enquiry.email}
                      onChange={(e) => setEnquiry((p) => ({...p, email: e.target.value}))}
                      placeholder="name@example.com"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#0B4F8A] focus:ring-2 focus:ring-blue-100"
                    />
                    {errors.email && (
                      <p className="text-xs text-[#C81E2B] mt-1 font-medium">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                      Your Message <span className="text-[#C81E2B]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={enquiry.message}
                      onChange={(e) =>
                        setEnquiry((p) => ({...p, message: e.target.value}))
                      }
                      placeholder="Write your question regarding OPD timings, facilities, or general hospital information"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#0B4F8A] focus:ring-2 focus:ring-blue-100"
                    />
                    {errors.message && (
                      <p className="text-xs text-[#C81E2B] mt-1 font-medium">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#0F766E] hover:bg-teal-800 text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Enquiry via WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
