/**
 * Central Portfolio Data — Generated from Mr. Qadeer Ahmed's Official Credentials
 * Specialized for Hospital & University Housekeeping / Facilities Supervision.
 */

export type Palette = { from: string; via: string; to: string; accent: string };

// Professional Hospital & Institutional Color Palettes
const hospitalBlue: Palette = { from: '#02182b', via: '#0369a1', to: '#010c17', accent: '#38bdf8' };
const institutionalTeal: Palette = { from: '#021c1b', via: '#0f766e', to: '#010e0e', accent: '#2dd4bf' };
const executiveNavy: Palette = { from: '#071630', via: '#1d4ed8', to: '#020914', accent: '#60a5fa' };
const cleanEmerald: Palette = { from: '#021c10', via: '#047857', to: '#010b06', accent: '#34d399' };
const facilitySlate: Palette = { from: '#090e17', via: '#334155', to: '#03070d', accent: '#94a3b8' };

export const profile = {
  fullName: 'Qadeer Ahmed (Satti)',
  displayName: 'Qadeer Ahmed',
  firstName: 'QADEER',
  seriesTag: 'HOSPITAL & FACILITY SUPERVISOR',
  /** Certificate recognition banner */
  originalLabel: 'VERIFIED SHIFA HOSPITAL & ISRA UNIVERSITY COMMENDED',
  role: 'Hospital Housekeeping & Facilities Supervisor',
  tagline: ['Hospital Housekeeping Supervisor', 'Infection Control & EVS', 'Shifa Hospital Alum'],
  intro:
    'Experienced Housekeeping & Environmental Services (EVS) Supervisor with 20+ years of proven operational excellence across tertiary care hospitals (Shifa International Hospital), international hotels in Makkah (Al-Olayan Hotel), and university campuses (Isra University). Expert in chemical dilution, floor polishing, team supervision, and bio-sanitation.',
  location: 'Rawalpindi / Islamabad • Available for Immediate Hospital / University Placement',
  email: 'qadeer.ahmed.services@gmail.com',
  links: {
    linkedin: 'tel:03155048805', // Direct contact number from business card
    github: 'tel:03455038345',
  },
  resumePdf: '/assets/resume.pdf',
  portrait: {
    src: '/assets/avatar.svg',
    srcSet: '/assets/avatar.svg 420w, /assets/avatar.svg 720w',
    alt: 'Verified Record of Qadeer Ahmed',
  },
  interests: ['Hospital Waste Management', 'Deep Disinfection Protocols', 'Fleet & Transport Logistics'],
};

export const education = [
  {
    school: 'Govt Model Secondary School',
    place: 'Rawalpindi',
    degree: 'Secondary School Certificate',
    period: 'Completed May 1996',
    score: 'Registered Matriculation Board',
  },
  {
    school: 'Shifa International Hospitals In-Service Training',
    place: 'Islamabad',
    degree: 'Hospital Housekeeping, Clinical Hygiene & Safety Course',
    period: '1996 – 2000',
    score: 'Annual Appraisal: Very Good',
  },
];

export const experience = [
  {
    company: 'MLS AND CO — House Keeping Experts',
    role: 'General Manager / Operations & Driver Lead',
    place: 'Rawalpindi / Islamabad',
    period: 'January 2010 – Present',
    points: [
      'Managed commercial housekeeping operations across institutions, corporate offices, and educational campuses.',
      'Supervised industrial floor washing, mechanical scrubbing, machine buffing/polishing, carpet shampooing, and glass care.',
      'Awarded Certificate of Appreciation from Isra University Islamabad Campus for outstanding campus cleanliness standards.',
      'Managed transport logistics and site teams to ensure on-time service delivery with 100% client satisfaction.',
    ],
  },
  {
    company: 'Al-Olayan Makkah Hotel (Olayan Hotels Group)',
    role: 'House Keeping Supervisor',
    place: 'Makkah Al-Mukarramah, Saudi Arabia',
    period: 'February 2007 – August 2011',
    points: [
      'Supervised housekeeping staff across high-occupancy guest floors and VIP housing units near the Holy Mosque.',
      'Enforced strict international hygiene and chemical sanitation protocols during peak Umrah and Hajj seasons.',
      'Recognized by General Management as a dedicated, disciplined, and hard-working supervisor.',
    ],
  },
  {
    company: 'Shifa International Hospitals Ltd. / KASCO',
    role: 'Housekeeping Aide I & Aide II',
    place: 'H-8/4, Islamabad',
    period: 'February 1996 – April 2000',
    points: [
      'Worked over 4 continuous years across emergency wards, inpatient rooms, OT areas, and general corridors.',
      'Trained in hospital disinfectant application, medical waste disposal, and cross-contamination prevention.',
      'Awarded "Very Good" in consecutive annual performance appraisals under Housekeeping Department Management.',
    ],
  },
];

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  github?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants';
};

export const projects: Project[] = [
  {
    id: 'hospital-infection-control',
    title: 'Hospital Clinical Ward Sanitation & Disinfection',
    year: 'Shifa Hospital Alum',
    genre: 'Hospital EVS • Clinical Infection Control',
    logline: 'Direct healthcare housekeeping protocol designed for inpatient rooms, OT zones, and patient wards.',
    stack: ['Hospital Disinfectants', 'Color-Coded Mops', 'Biohazard Disposal', 'PPE Protocol'],
    build: [
      'Maintained strict sanitary barriers across patient wards and emergency departments at Shifa International Hospitals Ltd.',
      'Complied with high-level disinfectant protocols preventing hospital-acquired infections (HAIs).',
    ],
    features: [
      'Clinical waste and sharp disposal handling',
      'Blood spill cleaning protocols',
      'Daily terminal cleaning of discharged rooms',
      'Corridor and emergency entrance sterilization',
    ],
    metrics: [
      { value: '4+ Yrs', label: 'Shifa Hospital tenure' },
      { value: 'Very Good', label: 'official appraisal grade' },
      { value: '100%', label: 'adherence to infection control' },
      { value: '24/7', label: 'shift availability' },
    ],
    palette: hospitalBlue,
    motif: 'shield',
  },
  {
    id: 'university-campus-maintenance',
    title: 'University Campus & Nursing College Sanitation',
    year: 'Isra University Award',
    genre: 'Higher Education • Facilities • Large Campus',
    logline: 'Award-winning facilities and janitorial management for university campus and allied medical colleges.',
    stack: ['Isra University', 'Al-Nafees Hospital', 'Auditoriums', 'Laboratories'],
    build: [
      'Led comprehensive facility maintenance across lecture halls, laboratory floors, nursing college, and administrative blocks.',
      'Honored by university leadership with an official Certificate of Appreciation for outstanding performance.',
    ],
    features: [
      'Campus-wide deep sanitization routines',
      'Examination hall & lab cleanliness',
      'Restroom deep scrubbing & odour control',
      'Executive office upkeep',
    ],
    metrics: [
      { value: 'Awarded', label: 'Certificate of Appreciation' },
      { value: '1,000+', label: 'daily campus footfall managed' },
      { value: 'Zero', label: 'cleanliness complaints' },
      { value: 'Daily', label: 'supervisor inspection logs' },
    ],
    palette: institutionalTeal,
    motif: 'flow',
  },
  {
    id: 'hotel-supervision-makkah',
    title: 'High-Occupancy Floor Supervision & Team Leadership',
    year: 'Saudi Arabia (GCC)',
    genre: 'International Hospitality • Supervisory • 4.5 Yrs',
    logline: 'Supervised 20+ housekeeping attendants in Makkah Al-Mukarramah during peak international seasons.',
    stack: ['Team Leadership', 'Floor Inspection', 'Roster Management', 'Inventory Control'],
    build: [
      'Maintained 5-star room turnaround times across multiple wings of Al-Olayan Makkah Hotel and Al-Maqam Housing Center.',
      'Trained multinational staff in fast room turnover, linen management, and chemical safety standards.',
    ],
    features: [
      'Shift roster allocation and supervision',
      'Linen closet and chemical inventory logs',
      'VIP guest floor preparation',
      'Rapid luggage and floor support',
    ],
    metrics: [
      { value: '4.5 Yrs', label: 'supervisory tenure in KSA' },
      { value: '20+', label: 'housekeeping staff supervised' },
      { value: '300+ Rooms', label: 'floor capacity managed' },
      { value: 'Official', label: 'recommendation certificate' },
    ],
    palette: executiveNavy,
    motif: 'tenants',
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    id: 'isra-award',
    title: 'Certificate of Appreciation',
    org: 'Isra University Islamabad Campus',
    detail: 'Awarded for outstanding performance in campus housekeeping, covering university faculties, nursing college, and medical campus.',
    laurel: 'University Commendation',
  },
  {
    id: 'shifa-appraisal',
    title: 'Official Merit Certification (4 Years)',
    org: 'Shifa International Hospitals Ltd.',
    detail: 'Certified as loyal, obedient, and hardworking employee with consecutive "Very Good" annual performance appraisals.',
    laurel: 'Hospital Certified',
  },
  {
    id: 'makkah-tenure',
    title: 'Housekeeping Supervisor Certification',
    org: 'Al-Olayan Makkah Hotel (Saudi Arabia)',
    detail: 'Recognized for 4+ years of dedicated supervisory service across high-traffic hospitality floors in Makkah.',
    laurel: 'International Experience',
  },
  {
    id: 'mls-leadership',
    title: '14+ Years Operational Management',
    org: 'MLS AND CO (House Keeping Experts)',
    detail: 'Proven track record leading commercial floor polishing, carpet care, and facility maintenance contracts.',
    laurel: 'Operations Lead',
  },
];

export type Certification = { issuer: string; name: string; link: string };

export const certifications: Certification[] = [
  { issuer: 'Isra University Islamabad', name: 'Certificate of Appreciation (Campus Facilities & Sanitation)', link: '#' },
  { issuer: 'Shifa International Hospitals', name: 'Certificate of Service — Housekeeping Aide I & II', link: '#' },
  { issuer: 'Al-Olayan Makkah Hotel (KSA)', name: 'House Keeping Supervisor Experience Certificate', link: '#' },
  { issuer: 'MLS AND CO', name: 'Commercial Housekeeping, Driver & Operations Lead Certificate', link: '#' },
  { issuer: 'Govt Secondary School', name: 'Secondary School Leaving Certificate (Rawalpindi)', link: '#' },
  { issuer: 'Traffic Licensing Authority', name: 'Valid Professional Driving License (Staff & Goods Transport)', link: '#' },
];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'hospital-sanitation',
    title: 'Hospital Sanitation & EVS',
    subtitle: 'Clinical standards & disinfection',
    skills: [
      { name: 'Hospital Disinfection', mono: 'HD', note: 'Shifa Alum' },
      { name: 'Ward & OT Cleanliness', mono: 'OT' },
      { name: 'Biohazard Waste Control', mono: 'BW' },
      { name: 'Infection Prevention', mono: 'IP' },
    ],
  },
  {
    id: 'floor-equipment',
    title: 'Industrial Machines & Floor Care',
    subtitle: 'MLS & Co. specialized expertise',
    skills: [
      { name: 'Floor Washing & Polish', mono: 'FP', note: 'Expert' },
      { name: 'Lift & Glass Cleaning', mono: 'LG' },
      { name: 'Carpet & Sofa Wash', mono: 'CS' },
      { name: 'Blind & Window Clean', mono: 'BC' },
    ],
  },
  {
    id: 'supervision-management',
    title: 'Supervision & Operations',
    subtitle: 'Al-Olayan Hotel & University Lead',
    skills: [
      { name: 'Shift Supervision', mono: 'SS', note: 'KSA Alum' },
      { name: 'Staff Roster & Training', mono: 'ST' },
      { name: 'Chemical Inventory', mono: 'CI' },
      { name: 'Quality Inspection', mono: 'QI' },
    ],
  },
  {
    id: 'transport-logistics',
    title: 'Transport & Support Services',
    subtitle: 'Driving and supply coordination',
    skills: [
      { name: 'Professional Driving', mono: 'PD', note: 'Licensed' },
      { name: 'Patient / Staff Transport', mono: 'PT' },
      { name: 'Supply Delivery', mono: 'SD' },
      { name: 'Vehicle Maintenance', mono: 'VM' },
    ],
  },
];

export const skillEvidence: Record<string, string[]> = {
  'Hospital Disinfection': ['Shifa International Hospitals Ltd. Experience (1996-2000)'],
  'Ward & OT Cleanliness': ['Shifa International Hospital Aide I & II Appraisals'],
  'Shift Supervision': ['Al-Olayan Makkah Hotel (Saudi Arabia, 2007-2011)'],
  'Floor Washing & Polish': ['MLS AND CO - Floor Wash & Polish Lead Specialist'],
  'Carpet & Sofa Wash': ['MLS AND CO Commercial Contract Lead'],
  'Professional Driving': ['MLS AND CO Driver Marketing & Operations (10+ Years)'],
  'Quality Inspection': ['Isra University Certificate of Appreciation'],
};

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

export const seasons: Season[] = [
  {
    number: 1,
    title: 'Shifa International Hospital Foundation',
    period: '1996 – 2000',
    synopsis: 'Began professional career at one of Pakistan’s premier tertiary teaching hospitals.',
    episodes: [
      {
        code: 'EXP 01',
        title: 'Housekeeping Aide I — Shifa Hospital',
        description: 'Trained in hospital-grade cleaning, patient room sanitization, and team discipline.',
        tags: ['Shifa Hospital', 'Infection Control', 'Aide I'],
        runtime: '1996 – 1997',
        palette: hospitalBlue,
      },
      {
        code: 'EXP 02',
        title: 'Housekeeping Aide II — KASCO at Shifa',
        description: 'Promoted to Aide II with consecutive "Very Good" annual performance appraisals.',
        tags: ['KASCO', 'Clinical Sanitation', 'Aide II'],
        runtime: '1997 – 2000',
        palette: institutionalTeal,
      },
    ],
  },
  {
    number: 2,
    title: 'International Hospitality Supervision (Saudi Arabia)',
    period: '2007 – 2011',
    synopsis: 'Supervisory role at Al-Olayan Makkah Hotel managing multi-story guest floors during international pilgrimages.',
    episodes: [
      {
        code: 'EXP 03',
        title: 'House Keeping Supervisor — Makkah Hotel',
        description: 'Led housekeeping staff, conducted room checkouts, and maintained spotless guest facilities.',
        tags: ['Makkah Al-Mukarramah', 'Supervisor', 'Hotel Operations'],
        runtime: '2007 – 2011',
        palette: executiveNavy,
      },
    ],
  },
  {
    number: 3,
    title: 'MLS & Co. & University Commendation',
    period: '2010 – Present',
    synopsis: 'General Manager of housekeeping operations and recipient of Isra University appreciation award.',
    episodes: [
      {
        code: 'EXP 04',
        title: 'Operations & General Manager — MLS & Co.',
        description: 'Spearheaded specialized machine polishing, deep chemical cleaning, and driver logistics.',
        tags: ['MLS & CO', 'General Manager', 'Floor Care'],
        runtime: '2010 – Present',
        palette: cleanEmerald,
      },
      {
        code: 'EXP 05',
        title: 'Isra University Campus Commendation',
        description: 'Earned official Certificate of Appreciation for outstanding performance at Islamabad Campus.',
        tags: ['Isra University', 'Al-Nafees Hospital', 'Appreciation Award'],
        runtime: 'Award Winner',
        palette: facilitySlate,
      },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'Hospital Proven', title: 'Shifa International Alum', detail: '4+ years inpatient hospital housekeeping', palette: hospitalBlue },
  { label: 'University Award', title: 'Isra University Commended', detail: 'Official Certificate of Appreciation for excellence', palette: institutionalTeal },
  { label: 'GCC Supervisory', title: 'Saudi Arabia Experience', detail: '4.5 years Housekeeping Supervisor in Makkah', palette: executiveNavy },
  { label: 'Specialized Machinery', title: 'Machine Floor Polish', detail: 'Industrial floor buffer, carpet & lift specialist', palette: cleanEmerald },
  { label: 'Dual Capability', title: 'Licensed Professional Driver', detail: '10+ years safe driving & supply transit', palette: facilitySlate },
  { label: 'Availability', title: 'Immediate Joining Ready', detail: 'Ready for full-time day/night shifts', palette: hospitalBlue },
];

export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Hospital Background',
    title: 'Shifa International Hospital',
    lines: ['4+ years in Housekeeping Department (Aide I & II)', 'Official "Very Good" performance appraisal record'],
    chips: ['Shifa Alum', 'Hospital EVS'],
  },
  {
    kicker: 'Institutional Recognition',
    title: 'Isra University Islamabad',
    lines: ['Awarded Certificate of Appreciation for outstanding campus cleanliness', 'Serving university faculty, labs, and nursing college'],
    chips: ['Award Winner', 'Campus Sanitation'],
  },
  {
    kicker: 'International Experience',
    title: 'Al-Olayan Makkah Hotel (KSA)',
    lines: ['House Keeping Supervisor (2007 – 2011)', 'High-occupancy guest floor oversight and team leadership'],
    chips: ['Saudi Arabia', 'Supervisor'],
  },
  {
    kicker: 'Machinery & Driver',
    title: 'MLS & Co. Operations',
    lines: ['Industrial floor washing, polishing, carpet & sofa deep clean', 'Valid professional driver with clean record'],
  },
];

export type ProfileId = 'sushmita' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'sushmita',
    name: 'Hospital Administration',
    blurb: 'Shifa Hospital tenure, certifications & infection control first',
    color: '#0ea5e9', // Medical sky blue
    order: ['story', 'skills', 'originals', 'moments', 'about', 'journey', 'picks'],
  },
  {
    id: 'recruiter',
    name: 'University / HR Recruiter',
    blurb: 'Isra University commendation, resume & verification certificates',
    color: '#14b8a6', // Medical teal
    order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Facility & Operations Manager',
    blurb: 'Floor polishing, machine operation & supervisory track record',
    color: '#10b981', // Clean green
    order: ['skills', 'originals', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'Transport & Logistics Head',
    blurb: 'Driver licensing, fleet assistance & emergency response',
    color: '#38bdf8', // Light blue
    order: ['picks', 'journey', 'story', 'skills', 'moments', 'originals', 'about'],
  },
];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'Background & Profile', meta: '20+ Years Track Record • Shifa & Makkah', palette: facilitySlate },
  journey: { nav: 'Career Arc', card: 'Work History', meta: `${seasons.length} Key Roles • Shifa, KSA & MLS`, palette: institutionalTeal },
  originals: { nav: 'Core Services', card: 'Sanitation Focus', meta: `${projects.length} Service Areas • Hospital & Campus`, palette: hospitalBlue },
  picks: { nav: 'Fast Highlights', card: 'Key Qualifications', meta: 'Certificates & Machine Skills', palette: cleanEmerald },
  skills: { nav: 'Expertise', card: 'Specialized Skills', meta: `${skillCategories.length} Categories • Machinery & EVS`, palette: executiveNavy },
  moments: { nav: 'Certificates', card: 'Verified Documents', meta: `${achievements.length} Certificates • Isra, Shifa & KSA`, palette: hospitalBlue },
  story: { nav: 'Contact & CV', card: 'Contact & Documents', meta: 'Direct Numbers: 0315-5048805 / 0345-5038345', palette: institutionalTeal },
};