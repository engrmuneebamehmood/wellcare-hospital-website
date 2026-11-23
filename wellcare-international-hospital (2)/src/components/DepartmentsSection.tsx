import {useState} from 'react';
import {
  Stethoscope,
  HeartPulse,
  Scissors,
  Baby,
  Smile,
  Droplets,
  Bone,
  Wind,
  Sparkles,
  Brain,
  Ear,
  ScanLine,
  Activity,
  MessageSquareHeart,
  FlaskConical,
  CalendarPlus,
} from 'lucide-react';
import {
  DEPARTMENTS,
  Department,
  DepartmentCategory,
} from '../data/hospitalData';

interface DepartmentsSectionProps {
  onSelectDepartmentForBooking: (departmentId: string) => void;
}

const CATEGORIES: DepartmentCategory[] = [
  'All',
  'Medical & Heart',
  'Surgical & Specialist',
  'Women & Child',
  'Diagnostics & Rehab',
];

function DepartmentIcon({icon}: {icon: Department['icon']}) {
  const cls = 'w-5 h-5';
  switch (icon) {
    case 'stethoscope':
      return <Stethoscope className={cls} />;
    case 'heart':
      return <HeartPulse className={cls} />;
    case 'scalpel':
      return <Scissors className={cls} />;
    case 'baby':
    case 'child':
      return <Baby className={cls} />;
    case 'droplet':
      return <Droplets className={cls} />;
    case 'bone':
      return <Bone className={cls} />;
    case 'wind':
      return <Wind className={cls} />;
    case 'sparkles':
      return <Sparkles className={cls} />;
    case 'brain':
      return <Brain className={cls} />;
    case 'ear':
      return <Ear className={cls} />;
    case 'scan':
      return <ScanLine className={cls} />;
    case 'smile':
      return <Smile className={cls} />;
    case 'activity':
      return <Activity className={cls} />;
    case 'message':
      return <MessageSquareHeart className={cls} />;
    case 'flask':
      return <FlaskConical className={cls} />;
  }
}

export function DepartmentsSection({onSelectDepartmentForBooking}: DepartmentsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<DepartmentCategory>('All');

  const filteredDepartments =
    selectedCategory === 'All'
      ? DEPARTMENTS
      : DEPARTMENTS.filter((dept) => dept.category === selectedCategory);

  return (
    <section
      id="departments"
      className="py-14 lg:py-20 bg-white border-b border-slate-200"
      aria-labelledby="departments-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-9">
          <div>
            <p className="text-sm font-semibold text-[#0B4F8A] mb-2">Medical Departments</p>
            <h2
              id="departments-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#072A4A] tracking-tight headline-balance"
            >
              16 Specialized Clinical &amp; Diagnostic Departments
            </h2>
            <p className="text-base text-slate-600 mt-2 max-w-2xl">
              Explore our outpatient, surgical, women &amp; child, dental, diagnostic, and
              rehabilitation departments. Select any department to request an appointment.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter medical departments by category"
            className="flex flex-wrap items-center gap-1 p-1.5 bg-[#EFF5FB] rounded-xl border border-blue-100 self-start lg:self-auto"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F8A] ${
                    active
                      ? 'bg-[#0B4F8A] text-white shadow-xs font-semibold'
                      : 'text-slate-700 hover:text-[#072A4A] hover:bg-white/70'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredDepartments.map((dept) => (
            <article
              key={dept.id}
              className="flex flex-col justify-between p-5 rounded-2xl bg-[#F8FBFF] hover:bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all duration-150"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-white border border-blue-100 text-[#0B4F8A] shadow-2xs flex items-center justify-center shrink-0">
                    <DepartmentIcon icon={dept.icon} />
                  </div>
                  <span className="text-xs font-medium text-slate-500">{dept.category}</span>
                </div>

                <h3 className="font-display text-lg font-bold text-[#072A4A] mb-2">
                  {dept.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {dept.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectDepartmentForBooking(dept.id)}
                className="w-full min-h-[42px] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-[#0B4F8A] hover:text-white hover:border-[#0B4F8A] text-[#072A4A] text-sm font-semibold transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F8A]"
              >
                <CalendarPlus className="w-4 h-4 shrink-0" />
                <span>Request Appointment</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
