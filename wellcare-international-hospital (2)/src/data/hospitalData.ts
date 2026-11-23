export const HOSPITAL_INFO = {
  name: 'WellCare International Hospital',
  shortName: 'WellCare Hospital',
  tagline: 'Your Health, Our Commitment!',
  alternativeTagline: 'In Pursuit of Excellence Beyond Medicine.',
  locationShort: 'New Lari Ada, Pindi Gheb, District Attock',
  address:
    'New Lari Ada, Near Attock Filling Station, Pindi Gheb, District Attock, Punjab, Pakistan.',
  phoneDisplay: '0572-350500',
  phoneHref: 'tel:0572350500',
  mobileDisplay: '0318-5588178',
  whatsappNumber: '923185588178',
  whatsappDisplay: '+92 318 5588178',
  email: 'wellcarehospitalpakistan@gmail.com',
  capacityBeds: '60 Beds',
  openingStatus: 'Open 24/7 (Emergency & Pharmacy 24/7)',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=WellCare+International+Hospital+New+Lari+Ada+Pindi+Gheb+Attock+Pakistan',
  social: {
    facebook: 'https://www.facebook.com/wellcarehospital2',
    instagram: 'https://www.instagram.com/wellcare_intl_hospital',
    youtube: 'https://youtube.com/@wellcareinternationalhospital',
  },
} as const;

export const HOSPITAL_IMAGES = {
  building: '/assets/aistudio/wc_464f8135.jfif',
  pharmacy: '/assets/aistudio/WhatsApp_Image_2026-11-23_at_6.42.41_PM_f77b332d.jpeg',
} as const;

export type DepartmentCategory =
  | 'All'
  | 'Medical & Heart'
  | 'Surgical & Specialist'
  | 'Women & Child'
  | 'Diagnostics & Rehab';

export interface Department {
  id: string;
  name: string;
  category: Exclude<DepartmentCategory, 'All'>;
  description: string;
  icon:
    | 'stethoscope'
    | 'heart'
    | 'scalpel'
    | 'baby'
    | 'child'
    | 'droplet'
    | 'bone'
    | 'wind'
    | 'sparkles'
    | 'brain'
    | 'ear'
    | 'scan'
    | 'smile'
    | 'activity'
    | 'message'
    | 'flask';
}

export const DEPARTMENTS: Department[] = [
  {
    id: 'general-medicine',
    name: 'General Medicine',
    category: 'Medical & Heart',
    description:
      'Primary medical consultations, fever and general illness evaluation, and routine adult health checkups.',
    icon: 'stethoscope',
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    category: 'Medical & Heart',
    description:
      'Heart-related specialist consultations, blood pressure evaluation, and cardiac care guidance.',
    icon: 'heart',
  },
  {
    id: 'general-surgery',
    name: 'General Surgery',
    category: 'Surgical & Specialist',
    description:
      'Surgical consultations, pre-operative assessment, and general surgical follow-up care.',
    icon: 'scalpel',
  },
  {
    id: 'gynecology-obstetrics',
    name: 'Gynecology and Obstetrics',
    category: 'Women & Child',
    description:
      'Women’s health consultations, maternity care guidance, and obstetrics follow-up services.',
    icon: 'baby',
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    category: 'Women & Child',
    description:
      'Medical consultation and general care focused on infants, children, and adolescents.',
    icon: 'child',
  },
  {
    id: 'urology',
    name: 'Urology',
    category: 'Surgical & Specialist',
    description:
      'Specialist medical assessment and consultation for urinary tract and kidney-related concerns.',
    icon: 'droplet',
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    category: 'Surgical & Specialist',
    description:
      'Consultation and care for bone, joint, muscle, and injury-related concerns.',
    icon: 'bone',
  },
  {
    id: 'pulmonology',
    name: 'Pulmonology',
    category: 'Medical & Heart',
    description:
      'Specialist evaluation and consultation for breathing, chest, and respiratory conditions.',
    icon: 'wind',
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    category: 'Medical & Heart',
    description:
      'Specialist consultation for skin, hair, and nail health concerns.',
    icon: 'sparkles',
  },
  {
    id: 'neurosurgery',
    name: 'Neurosurgery',
    category: 'Surgical & Specialist',
    description:
      'Specialist neurosurgical consultation for brain, spine, and nerve-related conditions.',
    icon: 'brain',
  },
  {
    id: 'ent',
    name: 'ENT',
    category: 'Surgical & Specialist',
    description:
      'Ear, nose, and throat specialist evaluations and routine ENT care.',
    icon: 'ear',
  },
  {
    id: 'radiology-imaging',
    name: 'Radiology and Imaging',
    category: 'Diagnostics & Rehab',
    description:
      'On-site diagnostic imaging support including digital X-ray and ultrasound services.',
    icon: 'scan',
  },
  {
    id: 'dental-services',
    name: 'Dental Services',
    category: 'Women & Child',
    description:
      'Oral health checkups, dental consultations, and routine dental care by dental surgeons.',
    icon: 'smile',
  },
  {
    id: 'physiotherapy',
    name: 'Physiotherapy',
    category: 'Diagnostics & Rehab',
    description:
      'Physical rehabilitation, mobility support, and guided recovery exercises.',
    icon: 'activity',
  },
  {
    id: 'speech-therapy',
    name: 'Speech Therapy',
    category: 'Diagnostics & Rehab',
    description:
      'Dedicated speech and communication support sessions for children and adults.',
    icon: 'message',
  },
  {
    id: 'laboratory-services',
    name: 'Laboratory Services',
    category: 'Diagnostics & Rehab',
    description:
      'Hospital medical laboratory supporting routine diagnostic testing and physician evaluations.',
    icon: 'flask',
  },
];

export interface Doctor {
  id: string;
  name: string;
  role: string;
  departmentId: string;
  specialtyGroup: 'Specialists' | 'Medical Officers & Leadership' | 'Dental & Allied Health';
  schedule?: string;
}

export const DOCTORS: Doctor[] = [
  {
    id: 'afeef-akhtar-awan',
    name: 'Dr. Afeef Akhtar Awan',
    role: 'CEO',
    departmentId: 'general-medicine',
    specialtyGroup: 'Medical Officers & Leadership',
  },
  {
    id: 'bakht-umar-khan',
    name: 'Dr. Bakht Umar Khan',
    role: 'Cardiologist',
    departmentId: 'cardiology',
    specialtyGroup: 'Specialists',
  },
  {
    id: 'javed-iqbal',
    name: 'Dr. Javed Iqbal',
    role: 'General Surgeon',
    departmentId: 'general-surgery',
    specialtyGroup: 'Specialists',
  },
  {
    id: 'salman-aslam',
    name: 'Dr. Salman Aslam',
    role: 'ENT Specialist',
    departmentId: 'ent',
    specialtyGroup: 'Specialists',
    schedule: 'Every Saturday · 10:00 AM–2:00 PM & 4:00 PM–9:00 PM',
  },
  {
    id: 'raheem-ullah',
    name: 'Dr. Raheem Ullah',
    role: 'Radiologist',
    departmentId: 'radiology-imaging',
    specialtyGroup: 'Specialists',
    schedule: 'Daily · 9:00 AM–11:00 AM & 7:00 PM–10:00 PM',
  },
  {
    id: 'afsar-ali',
    name: 'Dr. Afsar Ali',
    role: 'Pulmonologist',
    departmentId: 'pulmonology',
    specialtyGroup: 'Specialists',
    schedule: 'Every Sunday · 9:00 AM–2:00 PM',
  },
  {
    id: 'ubaid-ullah',
    name: 'Dr. Ubaid Ullah',
    role: 'Neurosurgeon',
    departmentId: 'neurosurgery',
    specialtyGroup: 'Specialists',
    schedule: 'Every Sunday · 9:00 AM–2:00 PM',
  },
  {
    id: 'inam-malkani',
    name: 'Dr. Inam Malkani',
    role: 'Urologist',
    departmentId: 'urology',
    specialtyGroup: 'Specialists',
    schedule: 'Every Sunday · 9:00 AM–2:00 PM',
  },
  {
    id: 'sk-niazi',
    name: 'Dr. SK Niazi',
    role: 'Dermatologist',
    departmentId: 'dermatology',
    specialtyGroup: 'Specialists',
    schedule: 'Every Sunday · 9:00 AM–2:00 PM',
  },
  {
    id: 'nasir-iqbal',
    name: 'Dr. Nasir Iqbal',
    role: 'Orthopedic Specialist',
    departmentId: 'orthopedics',
    specialtyGroup: 'Specialists',
  },
  {
    id: 'taskeen-zahra',
    name: 'Dr. Taskeen Zahra',
    role: 'Consultant Gynecologist',
    departmentId: 'gynecology-obstetrics',
    specialtyGroup: 'Specialists',
  },
  {
    id: 'riffat-gull',
    name: 'Dr. Riffat Gull',
    role: 'Gynecologist',
    departmentId: 'gynecology-obstetrics',
    specialtyGroup: 'Specialists',
  },
  {
    id: 'quart-ul-ain',
    name: 'Dr. Quart ul Ain',
    role: 'Gynecology and Obstetrics',
    departmentId: 'gynecology-obstetrics',
    specialtyGroup: 'Specialists',
  },
  {
    id: 'kafiyatullah',
    name: 'Dr. Kafiyatullah',
    role: 'Dental Surgeon',
    departmentId: 'dental-services',
    specialtyGroup: 'Dental & Allied Health',
    schedule: 'Daily · 9:00 AM–9:00 PM',
  },
  {
    id: 'haris-niazi',
    name: 'Dr. Haris Niazi',
    role: 'Dental Surgeon',
    departmentId: 'dental-services',
    specialtyGroup: 'Dental & Allied Health',
  },
  {
    id: 'sadia-saeed',
    name: 'Dr. Sadia Saeed',
    role: 'Women Medical Officer',
    departmentId: 'general-medicine',
    specialtyGroup: 'Medical Officers & Leadership',
  },
  {
    id: 'ab-ghani',
    name: 'Dr. Ab Ghani',
    role: 'Medical Officer',
    departmentId: 'general-medicine',
    specialtyGroup: 'Medical Officers & Leadership',
  },
  {
    id: 'mohsin-sattar',
    name: 'Dr. Mohsin Sattar',
    role: 'Medical Officer',
    departmentId: 'general-medicine',
    specialtyGroup: 'Medical Officers & Leadership',
  },
  {
    id: 'quart-ul-ain-sabir',
    name: 'Quart ul Ain Sabir',
    role: 'Pharmacist',
    departmentId: 'general-medicine',
    specialtyGroup: 'Dental & Allied Health',
  },
  {
    id: 'zoya-manzoor',
    name: 'Zoya Manzoor',
    role: 'Physiotherapist',
    departmentId: 'physiotherapy',
    specialtyGroup: 'Dental & Allied Health',
  },
  {
    id: 'samia-sharif',
    name: 'Samia Sharif',
    role: 'Speech Therapist',
    departmentId: 'speech-therapy',
    specialtyGroup: 'Dental & Allied Health',
  },
  {
    id: 'soban-asif',
    name: 'Soban Asif',
    role: 'Sonologist',
    departmentId: 'radiology-imaging',
    specialtyGroup: 'Dental & Allied Health',
  },
];

export interface DoctorScheduleItem {
  doctorName: string;
  role: string;
  days: string;
  timings: string;
  departmentId: string;
}

export const DOCTOR_SCHEDULES: DoctorScheduleItem[] = [
  {
    doctorName: 'Dr. Salman Aslam',
    role: 'ENT Specialist',
    days: 'Every Saturday',
    timings: '10:00 AM–2:00 PM and 4:00 PM–9:00 PM',
    departmentId: 'ent',
  },
  {
    doctorName: 'Dr. Raheem Ullah',
    role: 'Radiologist',
    days: 'Daily',
    timings: '9:00 AM–11:00 AM and 7:00 PM–10:00 PM',
    departmentId: 'radiology-imaging',
  },
  {
    doctorName: 'Dr. Kafiyatullah',
    role: 'Dental Surgeon',
    days: 'Daily',
    timings: '9:00 AM–9:00 PM',
    departmentId: 'dental-services',
  },
  {
    doctorName: 'Dr. Afsar Ali',
    role: 'Pulmonologist',
    days: 'Every Sunday',
    timings: '9:00 AM–2:00 PM',
    departmentId: 'pulmonology',
  },
  {
    doctorName: 'Dr. Ubaid Ullah',
    role: 'Neurosurgeon',
    days: 'Every Sunday',
    timings: '9:00 AM–2:00 PM',
    departmentId: 'neurosurgery',
  },
  {
    doctorName: 'Dr. Inam Malkani',
    role: 'Urologist',
    days: 'Every Sunday',
    timings: '9:00 AM–2:00 PM',
    departmentId: 'urology',
  },
  {
    doctorName: 'Dr. SK Niazi',
    role: 'Dermatologist',
    days: 'Every Sunday',
    timings: '9:00 AM–2:00 PM',
    departmentId: 'dermatology',
  },
];

export interface Facility {
  id: string;
  name: string;
  availability: string;
  description: string;
  image?: string;
  icon:
    | 'siren'
    | 'pill'
    | 'ambulance'
    | 'flask'
    | 'scan'
    | 'waves'
    | 'wind'
    | 'smile'
    | 'activity';
}

export const FACILITIES: Facility[] = [
  {
    id: 'emergency-24-7',
    name: '24/7 Emergency Services',
    availability: 'Open 24 Hours · 7 Days',
    description:
      'Round-the-clock emergency reception, patient triage, and immediate medical attention in Pindi Gheb.',
    icon: 'siren',
  },
  {
    id: 'pharmacy-24-7',
    name: '24/7 Pharmacy',
    availability: 'Open 24 Hours · 7 Days',
    description:
      'On-site hospital pharmacy operating day and night so prescribed medicines remain accessible at all hours.',
    image: HOSPITAL_IMAGES.pharmacy,
    icon: 'pill',
  },
  {
    id: 'ambulance-service',
    name: 'Ambulance Service',
    availability: 'On-Call Transport',
    description:
      'Hospital ambulance support for patient transport across Pindi Gheb, District Attock, and surrounding routes.',
    image: HOSPITAL_IMAGES.building,
    icon: 'ambulance',
  },
  {
    id: 'medical-laboratory',
    name: 'Medical Laboratory',
    availability: 'Hospital Diagnostics',
    description:
      'On-site medical laboratory for routine clinical sample collection and diagnostic blood and pathology tests.',
    icon: 'flask',
  },
  {
    id: 'digital-xray',
    name: 'Digital X-Ray',
    availability: 'Diagnostic Imaging',
    description:
      'Digital radiography imaging facility supporting orthopedic, chest, and general medical evaluations.',
    icon: 'scan',
  },
  {
    id: 'ultrasound',
    name: 'Ultrasound',
    availability: 'Radiology & Sonology',
    description:
      'Dedicated ultrasound imaging supported by radiology and sonology staff on schedule.',
    icon: 'waves',
  },
  {
    id: 'oxygen-facility',
    name: 'Oxygen Facility',
    availability: 'Inpatient & Emergency',
    description:
      'Clinical oxygen support available across emergency care bays and inpatient hospital wards.',
    icon: 'wind',
  },
  {
    id: 'dental-facility',
    name: 'Dental Services',
    availability: 'Daily OPD Support',
    description:
      'Clean dental operatory equipped for routine dental examinations, cleanings, and dental surgeon care.',
    icon: 'smile',
  },
  {
    id: 'physiotherapy-facility',
    name: 'Physiotherapy',
    availability: 'Rehabilitation Care',
    description:
      'Dedicated physiotherapy space supporting mobility recovery, pain management, and guided exercise.',
    icon: 'activity',
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Hospital' | 'Pharmacy & Care' | 'Brand & Posters';
  caption: string;
  type: 'photo' | 'brand-poster' | 'team-poster';
  image?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-building',
    title: 'WellCare International Hospital Exterior',
    category: 'Hospital',
    caption:
      'Main hospital building at New Lari Ada, Near Attock Filling Station, Pindi Gheb.',
    type: 'photo',
    image: HOSPITAL_IMAGES.building,
  },
  {
    id: 'gal-pharmacy',
    title: '24/7 On-Site Hospital Pharmacy',
    category: 'Pharmacy & Care',
    caption:
      'WellCare International Hospital pharmacy dispensing unit operating 24 hours a day, 7 days a week.',
    type: 'photo',
    image: HOSPITAL_IMAGES.pharmacy,
  },
  {
    id: 'gal-brand-poster',
    title: 'WellCare Official Brand Identity & Motto',
    category: 'Brand & Posters',
    caption:
      'Official WellCare International Hospital blue, red, and white emblem — "Your Health, Our Commitment!"',
    type: 'brand-poster',
  },
  {
    id: 'gal-team-poster',
    title: 'Specialists & OPD Schedule Directory Poster',
    category: 'Brand & Posters',
    caption:
      'Overview of WellCare International Hospital visiting specialists, medical officers, and weekly OPD timings.',
    type: 'team-poster',
  },
];

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${HOSPITAL_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
