import {useMemo, useState} from 'react';
import {
  Search,
  Clock,
  Phone,
  CalendarPlus,
  UserRound,
  AlertCircle,
  X,
} from 'lucide-react';
import {
  DOCTORS,
  DOCTOR_SCHEDULES,
  DEPARTMENTS,
  HOSPITAL_INFO,
  Doctor,
} from '../data/hospitalData';

interface DoctorsSectionProps {
  onSelectDoctorForBooking: (doctorId: string, departmentId: string) => void;
}

type GroupFilter =
  | 'All'
  | 'Specialists'
  | 'Medical Officers & Leadership'
  | 'Dental & Allied Health';

const GROUPS: GroupFilter[] = [
  'All',
  'Specialists',
  'Medical Officers & Leadership',
  'Dental & Allied Health',
];

function getInitials(name: string): string {
  const cleaned = name.replace(/^Dr\.\s*/i, '').trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function DoctorsSection({onSelectDoctorForBooking}: DoctorsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<GroupFilter>('All');

  const departmentNameMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const d of DEPARTMENTS) {
      map[d.id] = d.name;
    }
    return map;
  }, []);

  const filteredDoctors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return DOCTORS.filter((doc) => {
      const matchesGroup =
        selectedGroup === 'All' || doc.specialtyGroup === selectedGroup;
      if (!matchesGroup) return false;
      if (!q) return true;
      const deptName = (departmentNameMap[doc.departmentId] || '').toLowerCase();
      return (
        doc.name.toLowerCase().includes(q) ||
        doc.role.toLowerCase().includes(q) ||
        deptName.includes(q)
      );
    });
  }, [searchQuery, selectedGroup, departmentNameMap]);

  return (
    <section
      id="doctors"
      className="py-14 lg:py-20 bg-[#F4F8FC] border-b border-slate-200"
      aria-labelledby="doctors-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-sm font-semibold text-[#0B4F8A] mb-2">
              Our Doctors &amp; Healthcare Team
            </p>
            <h2
              id="doctors-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#072A4A] tracking-tight headline-balance"
            >
              Experienced Specialists &amp; Care Professionals
            </h2>
            <p className="text-base text-slate-600 mt-2 max-w-2xl">
              Search by doctor name or specialty. Only verified hospital-provided names, roles,
              and OPD schedules are displayed.
            </p>
          </div>

          <a
            href="#doctor-timings"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-[#0B4F8A] text-sm font-semibold transition-colors whitespace-nowrap self-start lg:self-auto"
          >
            <Clock className="w-4 h-4 shrink-0" />
            <span>Jump to Doctor Timings</span>
          </a>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">
          <div className="relative w-full md:max-w-sm">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doctor or specialty (e.g. Cardiologist)"
              aria-label="Search doctors by name or specialty"
              className="w-full min-h-[44px] pl-10 pr-9 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B4F8A] focus:ring-2 focus:ring-blue-100"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div
            role="tablist"
            aria-label="Filter team by role group"
            className="flex flex-wrap items-center gap-1 p-1.5 bg-white rounded-xl border border-slate-200 shadow-2xs"
          >
            {GROUPS.map((group) => {
              const active = selectedGroup === group;
              return (
                <button
                  key={group}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F8A] ${
                    active
                      ? 'bg-[#0B4F8A] text-white shadow-xs font-semibold'
                      : 'text-slate-700 hover:text-[#072A4A] hover:bg-slate-50'
                  }`}
                >
                  {group}
                </button>
              );
            })}
          </div>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="p-8 rounded-xl bg-white border border-slate-200 text-center">
            <UserRound className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-base font-semibold text-slate-900">No matching doctors found</p>
            <p className="text-sm text-slate-600 mt-1 mb-4">
              Try clearing your search or selecting &ldquo;All&rdquo; to view the full medical team.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedGroup('All');
              }}
              className="px-4 py-2 rounded-lg bg-[#0B4F8A] text-white text-sm font-semibold cursor-pointer"
            >
              Show All Doctors
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredDoctors.map((doctor: Doctor) => (
              <article
                key={doctor.id}
                className="flex flex-col justify-between p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 shadow-xs hover:shadow-md transition-all duration-150"
              >
                <div>
                  <div className="flex items-start gap-3.5 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4F8A] to-[#1565C0] text-white font-display font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs"
                      aria-hidden="true"
                    >
                      {getInitials(doctor.name)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-base sm:text-lg font-bold text-[#072A4A] leading-snug">
                        {doctor.name}
                      </h3>
                      <p className="text-sm font-semibold text-[#0B4F8A] mt-0.5">
                        {doctor.role}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-3">
                    <span>{departmentNameMap[doctor.departmentId] || 'Hospital Care'}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{doctor.specialtyGroup}</span>
                  </div>

                  {doctor.schedule ? (
                    <div className="p-3 rounded-xl bg-[#F0FAF8] border border-teal-200/70 text-xs text-slate-800 mb-4 tabular-nums">
                      <span className="font-semibold text-[#0F766E] block mb-0.5">
                        OPD Timing
                      </span>
                      {doctor.schedule}
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 mb-4">
                      Call {HOSPITAL_INFO.phoneDisplay} to confirm consultation timing.
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectDoctorForBooking(doctor.id, doctor.departmentId)}
                  className="w-full min-h-[42px] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#072A4A] hover:bg-[#0B4F8A] text-white text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F8A]"
                >
                  <CalendarPlus className="w-4 h-4 shrink-0" />
                  <span>Request Appointment</span>
                </button>
              </article>
            ))}
          </div>
        )}

        {/* Doctor Timings Section */}
        <div
          id="doctor-timings"
          className="mt-14 pt-12 border-t border-slate-200"
          aria-labelledby="timings-heading"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-semibold text-[#0F766E] mb-1">OPD Consultation Hours</p>
              <h3
                id="timings-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-[#072A4A] tracking-tight"
              >
                Doctor Timings &amp; Weekly Schedule
              </h3>
            </div>
            <a
              href={HOSPITAL_INFO.phoneHref}
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 bg-white hover:bg-red-50 text-[#C81E2B] text-sm font-semibold shadow-2xs transition-colors whitespace-nowrap tabular-nums self-start md:self-auto"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>Confirm by Calling {HOSPITAL_INFO.phoneDisplay}</span>
            </a>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0B4F8A] text-white text-xs font-semibold">
                  <th className="py-4 px-5">Doctor Name</th>
                  <th className="py-4 px-5">Specialty</th>
                  <th className="py-4 px-5">Consultation Day</th>
                  <th className="py-4 px-5">OPD Timings</th>
                  <th className="py-4 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {DOCTOR_SCHEDULES.map((item) => {
                  const matchedDoc = DOCTORS.find((d) => d.name === item.doctorName);
                  return (
                    <tr key={item.doctorName} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-5 font-semibold text-slate-900">
                        {item.doctorName}
                      </td>
                      <td className="py-4 px-5 text-[#0B4F8A] font-medium">{item.role}</td>
                      <td className="py-4 px-5 text-slate-700 font-medium">{item.days}</td>
                      <td className="py-4 px-5 text-slate-700 tabular-nums">{item.timings}</td>
                      <td className="py-4 px-5 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            onSelectDoctorForBooking(
                              matchedDoc ? matchedDoc.id : '',
                              item.departmentId
                            )
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:border-[#0B4F8A] hover:bg-[#0B4F8A] hover:text-white text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <span>Book</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Schedule Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
            {DOCTOR_SCHEDULES.map((item) => {
              const matchedDoc = DOCTORS.find((d) => d.name === item.doctorName);
              return (
                <div
                  key={item.doctorName}
                  className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-between gap-3"
                >
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-base">
                      {item.doctorName}
                    </h4>
                    <p className="text-xs font-semibold text-[#0B4F8A] mt-0.5">{item.role}</p>
                    <div className="mt-2.5 text-sm text-slate-700 tabular-nums">
                      <p className="font-semibold text-slate-900">{item.days}</p>
                      <p>{item.timings}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onSelectDoctorForBooking(
                        matchedDoc ? matchedDoc.id : '',
                        item.departmentId
                      )
                    }
                    className="w-full min-h-[40px] px-3 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold cursor-pointer"
                  >
                    Request Appointment
                  </button>
                </div>
              );
            })}
          </div>

          {/* Mandatory Schedule Disclaimer */}
          <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm text-amber-950">
              <strong>Important Notice:</strong> Doctor schedules may change. Please call the
              hospital at{' '}
              <a
                href={HOSPITAL_INFO.phoneHref}
                className="font-semibold underline hover:text-[#0B4F8A] tabular-nums"
              >
                {HOSPITAL_INFO.phoneDisplay}
              </a>{' '}
              to confirm before visiting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
