import {useEffect, useMemo, useRef, useState, FormEvent} from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  MessageCircle,
  Phone,
  ShieldAlert,
  Loader2,
  RotateCcw,
} from 'lucide-react';
import {
  DEPARTMENTS,
  DOCTORS,
  HOSPITAL_INFO,
  buildWhatsAppUrl,
} from '../data/hospitalData';

interface AppointmentSectionProps {
  preselectedDepartmentId: string;
  preselectedDoctorId: string;
}

interface FormState {
  fullName: string;
  mobile: string;
  email: string;
  departmentId: string;
  doctorId: string;
  preferredDate: string;
  preferredTime: string;
  reason: string;
}

interface FormErrors {
  fullName?: string;
  mobile?: string;
  email?: string;
  departmentId?: string;
  preferredDate?: string;
  preferredTime?: string;
}

const TIME_SLOTS = [
  'Morning (9:00 AM – 12:00 PM)',
  'Afternoon (12:00 PM – 4:00 PM)',
  'Evening (4:00 PM – 9:00 PM)',
  'Night / Urgent Consultation',
];

function getTodayDateString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function AppointmentSection({
  preselectedDepartmentId,
  preselectedDoctorId,
}: AppointmentSectionProps) {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    mobile: '',
    email: '',
    departmentId: preselectedDepartmentId || DEPARTMENTS[0].id,
    doctorId: preselectedDoctorId || '',
    preferredDate: getTodayDateString(),
    preferredTime: TIME_SLOTS[0],
    reason: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<{
    whatsappUrl: string;
    departmentName: string;
    doctorName: string;
    summary: FormState;
  } | null>(null);

  const hiddenWaLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (preselectedDepartmentId || preselectedDoctorId) {
      setSubmittedRequest(null);
      setForm((prev) => ({
        ...prev,
        departmentId: preselectedDepartmentId || prev.departmentId,
        doctorId: preselectedDoctorId,
      }));
    }
  }, [preselectedDepartmentId, preselectedDoctorId]);

  const sortedDoctors = useMemo(() => {
    const matching = DOCTORS.filter((d) => d.departmentId === form.departmentId);
    const others = DOCTORS.filter((d) => d.departmentId !== form.departmentId);
    return {matching, others};
  }, [form.departmentId]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter the patient’s full name.';
    }

    const cleanedDigits = form.mobile.replace(/[\s\-()]/g, '');
    const phoneValid = /^(\+?92|0)?[0-9]{9,12}$/.test(cleanedDigits);
    if (!cleanedDigits || !phoneValid) {
      nextErrors.mobile =
        'Please enter a valid phone number (e.g. 0318-5588178 or 03001234567).';
    }

    if (form.email.trim()) {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
      if (!emailValid) {
        nextErrors.email = 'Please enter a valid email address or leave it blank.';
      }
    }

    if (!form.departmentId) {
      nextErrors.departmentId = 'Please select a department.';
    }

    if (!form.preferredDate) {
      nextErrors.preferredDate = 'Please choose a preferred appointment date.';
    }

    if (!form.preferredTime) {
      nextErrors.preferredTime = 'Please select a preferred time.';
    }

    return nextErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const deptObj = DEPARTMENTS.find((d) => d.id === form.departmentId);
    const docObj = DOCTORS.find((d) => d.id === form.doctorId);
    const departmentName = deptObj ? deptObj.name : 'General Consultation';
    const doctorName = docObj ? `${docObj.name} (${docObj.role})` : 'Any Available Doctor';

    const messageLines = [
      'Assalam-o-Alaikum, I would like to submit an APPOINTMENT REQUEST at WellCare International Hospital, Pindi Gheb.',
      '',
      `Patient Name: ${form.fullName.trim()}`,
      `Mobile Number: ${form.mobile.trim()}`,
      form.email.trim() ? `Email: ${form.email.trim()}` : null,
      `Department: ${departmentName}`,
      `Doctor: ${doctorName}`,
      `Preferred Date: ${form.preferredDate}`,
      `Preferred Time: ${form.preferredTime}`,
      form.reason.trim() ? `Reason for Visit: ${form.reason.trim()}` : null,
      '',
      'Note: Sent via hospital website appointment request form (awaiting hospital confirmation).',
    ].filter(Boolean);

    const whatsappUrl = buildWhatsAppUrl(messageLines.join('\n'));

    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedRequest({
        whatsappUrl,
        departmentName,
        doctorName,
        summary: {...form},
      });
      // Trigger clean anchor navigation to WhatsApp in a new tab after state mounts
      window.setTimeout(() => {
        hiddenWaLinkRef.current?.click();
      }, 60);
    }, 180);
  };

  const handleReset = () => {
    setSubmittedRequest(null);
    setErrors({});
    setForm({
      fullName: '',
      mobile: '',
      email: '',
      departmentId: DEPARTMENTS[0].id,
      doctorId: '',
      preferredDate: getTodayDateString(),
      preferredTime: TIME_SLOTS[0],
      reason: '',
    });
  };

  return (
    <section
      id="appointment"
      className="py-14 lg:py-20 bg-gradient-to-b from-[#EDF5FC] to-[#F8FAFC] border-b border-slate-200"
      aria-labelledby="appointment-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Guidance & Direct Call Option */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-[#0B4F8A] mb-2">
              Appointment Request
            </p>
            <h2
              id="appointment-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#072A4A] tracking-tight headline-balance mb-4"
            >
              Request an OPD Consultation via WhatsApp
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              Fill out this request form with your preferred department, doctor, date, and
              time. Submitting prepares a formatted message and opens WhatsApp to our reception
              desk ({HOSPITAL_INFO.mobileDisplay}).
            </p>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs mb-5 space-y-3">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-[#0B4F8A] shrink-0 mt-0.5" />
                <div className="text-sm text-slate-700 leading-relaxed">
                  <p className="font-semibold text-[#072A4A] mb-1">
                    Privacy &amp; Request Policy
                  </p>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                    <li>
                      This is an <strong>appointment request</strong>, not an automatic
                      confirmation. Our hospital desk will confirm your slot.
                    </li>
                    <li>
                      Your form details are sent directly via WhatsApp and are{' '}
                      <strong>not stored</strong> in browser local storage or an external
                      database.
                    </li>
                    <li>
                      Please do not enter sensitive medical reports or payment card details in
                      this form.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-red-200 shadow-xs">
              <p className="text-sm font-bold text-[#072A4A] mb-1">
                Need Urgent Help or Direct Phone Booking?
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                For emergency visits (open 24/7) or immediate schedule confirmation, call our
                hospital reception directly.
              </p>
              <a
                href={HOSPITAL_INFO.phoneHref}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#C81E2B] hover:bg-red-800 text-white text-sm font-semibold shadow-xs transition-colors tabular-nums"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Call Now · {HOSPITAL_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form or Confirmation Screen */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-md">
              {submittedRequest ? (
                <div className="space-y-6" role="status" aria-live="polite">
                  {/* Hidden anchor clicked cleanly on submit */}
                  <a
                    ref={hiddenWaLinkRef}
                    href={submittedRequest.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sr-only"
                  >
                    Open WhatsApp
                  </a>

                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-teal-100 text-[#0F766E] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                        Appointment Request Ready
                      </h3>
                      <p className="text-sm text-slate-700 mt-1">
                        <strong>Important:</strong> This is an appointment request,{' '}
                        <strong>not a confirmed appointment</strong>. Please send the prefilled
                        WhatsApp message to{' '}
                        <span className="tabular-nums font-semibold">
                          {HOSPITAL_INFO.whatsappDisplay}
                        </span>{' '}
                        or call our desk to confirm.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 space-y-2.5 text-sm">
                    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Patient Name</span>
                      <span className="font-semibold text-slate-900 text-right">
                        {submittedRequest.summary.fullName}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Mobile Number</span>
                      <span className="font-semibold text-slate-900 tabular-nums text-right">
                        {submittedRequest.summary.mobile}
                      </span>
                    </div>
                    {submittedRequest.summary.email && (
                      <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                        <span className="text-slate-500">Email</span>
                        <span className="font-medium text-slate-900 text-right">
                          {submittedRequest.summary.email}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Department</span>
                      <span className="font-semibold text-[#0B4F8A] text-right">
                        {submittedRequest.departmentName}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Doctor</span>
                      <span className="font-semibold text-slate-900 text-right">
                        {submittedRequest.doctorName}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Preferred Date</span>
                      <span className="font-semibold text-slate-900 tabular-nums text-right">
                        {submittedRequest.summary.preferredDate}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">Preferred Time</span>
                      <span className="font-semibold text-slate-900 text-right">
                        {submittedRequest.summary.preferredTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                    <a
                      href={submittedRequest.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#0F766E] hover:bg-teal-800 text-white text-sm font-semibold transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      <span>Send Request on WhatsApp</span>
                    </a>

                    <a
                      href={HOSPITAL_INFO.phoneHref}
                      className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-[#C81E2B] text-sm font-semibold transition-colors whitespace-nowrap tabular-nums"
                    >
                      <Phone className="w-4 h-4 shrink-0" />
                      <span>Call {HOSPITAL_INFO.phoneDisplay}</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-sm font-semibold transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4 shrink-0" />
                      <span>New Request</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="appt-name"
                        className="block text-sm font-semibold text-slate-800 mb-1.5"
                      >
                        Patient Full Name <span className="text-[#C81E2B]">*</span>
                      </label>
                      <input
                        id="appt-name"
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) =>
                          setForm((p) => ({...p, fullName: e.target.value}))
                        }
                        placeholder="Enter full name"
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#0B4F8A] focus:ring-2 focus:ring-blue-100"
                      />
                      {errors.fullName && (
                        <p className="text-xs text-[#C81E2B] mt-1 font-medium">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="appt-mobile"
                        className="block text-sm font-semibold text-slate-800 mb-1.5"
                      >
                        Mobile Number <span className="text-[#C81E2B]">*</span>
                      </label>
                      <input
                        id="appt-mobile"
                        type="tel"
                        required
                        value={form.mobile}
                        onChange={(e) => setForm((p) => ({...p, mobile: e.target.value}))}
                        placeholder="03XX-XXXXXXX"
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 tabular-nums focus:outline-none focus:border-[#0B4F8A] focus:ring-2 focus:ring-blue-100"
                      />
                      {errors.mobile && (
                        <p className="text-xs text-[#C81E2B] mt-1 font-medium">
                          {errors.mobile}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="appt-email"
                      className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="appt-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({...p, email: e.target.value}))}
                      placeholder="name@example.com"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#0B4F8A] focus:ring-2 focus:ring-blue-100"
                    />
                    {errors.email && (
                      <p className="text-xs text-[#C81E2B] mt-1 font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="appt-department"
                        className="block text-sm font-semibold text-slate-800 mb-1.5"
                      >
                        Select Department <span className="text-[#C81E2B]">*</span>
                      </label>
                      <select
                        id="appt-department"
                        required
                        value={form.departmentId}
                        onChange={(e) => {
                          const nextDept = e.target.value;
                          setForm((p) => ({
                            ...p,
                            departmentId: nextDept,
                            doctorId: '',
                          }));
                        }}
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#0B4F8A] focus:ring-2 focus:ring-blue-100"
                      >
                        {DEPARTMENTS.map((dept) => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                      {errors.departmentId && (
                        <p className="text-xs text-[#C81E2B] mt-1 font-medium">
                          {errors.departmentId}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="appt-doctor"
                        className="block text-sm font-semibold text-slate-800 mb-1.5"
                      >
                        Select Doctor
                      </label>
                      <select
                        id="appt-doctor"
                        value={form.doctorId}
                        onChange={(e) =>
                          setForm((p) => ({...p, doctorId: e.target.value}))
                        }
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#0B4F8A] focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="">Any Available Doctor / Specialist</option>
                        {sortedDoctors.matching.length > 0 && (
                          <optgroup label="Doctors in Selected Department">
                            {sortedDoctors.matching.map((doc) => (
                              <option key={doc.id} value={doc.id}>
                                {doc.name} — {doc.role}
                              </option>
                            ))}
                          </optgroup>
                        )}
                        <optgroup label="Other Hospital Doctors &amp; Specialists">
                          {sortedDoctors.others.map((doc) => (
                            <option key={doc.id} value={doc.id}>
                              {doc.name} — {doc.role}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="appt-date"
                        className="block text-sm font-semibold text-slate-800 mb-1.5"
                      >
                        Preferred Appointment Date <span className="text-[#C81E2B]">*</span>
                      </label>
                      <input
                        id="appt-date"
                        type="date"
                        required
                        min={getTodayDateString()}
                        value={form.preferredDate}
                        onChange={(e) =>
                          setForm((p) => ({...p, preferredDate: e.target.value}))
                        }
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 tabular-nums focus:outline-none focus:border-[#0B4F8A] focus:ring-2 focus:ring-blue-100"
                      />
                      {errors.preferredDate && (
                        <p className="text-xs text-[#C81E2B] mt-1 font-medium">
                          {errors.preferredDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="appt-time"
                        className="block text-sm font-semibold text-slate-800 mb-1.5"
                      >
                        Preferred Time <span className="text-[#C81E2B]">*</span>
                      </label>
                      <select
                        id="appt-time"
                        required
                        value={form.preferredTime}
                        onChange={(e) =>
                          setForm((p) => ({...p, preferredTime: e.target.value}))
                        }
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#0B4F8A] focus:ring-2 focus:ring-blue-100"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      {errors.preferredTime && (
                        <p className="text-xs text-[#C81E2B] mt-1 font-medium">
                          {errors.preferredTime}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="appt-reason"
                      className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                      Reason for Visit{' '}
                      <span className="text-slate-400 font-normal">
                        (Optional — general note only)
                      </span>
                    </label>
                    <textarea
                      id="appt-reason"
                      rows={3}
                      value={form.reason}
                      onChange={(e) => setForm((p) => ({...p, reason: e.target.value}))}
                      placeholder="Brief non-sensitive reason (e.g. routine checkup, OPD consultation)"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#0B4F8A] focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0B4F8A] hover:bg-[#083B68] disabled:opacity-70 text-white text-base font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F8A]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Preparing Request...</span>
                      </>
                    ) : (
                      <>
                        <CalendarCheck className="w-5 h-5" />
                        <span>Submit Appointment Request</span>
                      </>
                    )}
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
