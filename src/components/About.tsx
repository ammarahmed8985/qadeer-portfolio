import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { EASE, SectionHeading, Tilt } from './fx';

export default function About() {
  const facts = [
    { k: 'Hospital Tenure', v: 'Shifa International Hospital Ltd.', s: '4+ Years · Inpatient Wards & Infection Control' },
    { k: 'International Experience', v: 'Housekeeping Supervisor (Makkah)', s: 'Al-Olayan Hotel, Saudi Arabia · 4.5 Years' },
    { k: 'University Commendation', v: 'Isra University Islamabad Campus', s: 'Awarded Certificate of Appreciation' },
    { k: 'Machinery & Mobility', v: 'Machine Floor Polish & Licensed Driver', s: 'Industrial scrubbers, buffers & supply transit' },
  ];

  return (
    <>
      <SectionHeading kicker="Executive Summary" title="About Qadeer Ahmed" />
      <div className="gutter grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <motion.div
          className="mx-auto w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <Tilt max={5} className="rounded-2xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-sky-500/20 shadow-2xl">
              {/* Clinical Blue Radial Light */}
              <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_30%,#0369a1,#07152b_60%,#070b14)]" />
              <div className="absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_28px)]" />
              <img
                src="/assets/portrait-720.webp"
                srcSet={profile.portrait.srcSet}
                sizes="(max-width: 1024px) 90vw, 40vw"
                alt={profile.portrait.alt}
                loading="lazy"
                className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#070b14]/95 to-transparent" />
              
              {/* Badge Overlay */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.25em] text-sky-400 uppercase">VERIFIED SUPERVISOR</p>
                  <p className="font-sans text-2xl font-bold leading-none text-white">{profile.displayName}</p>
                </div>
                <span className="rounded-md border border-emerald-400/40 bg-emerald-950/60 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                  20+ YRS EXP
                </span>
              </div>
            </div>
          </Tilt>
        </motion.div>

        <div>
          <motion.p
            className="font-serif text-[clamp(1.4rem,2.8vw,2.2rem)] italic leading-[1.25] text-slate-100"
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            “{profile.intro}”
          </motion.p>
          <p className="mt-3 text-sm font-semibold text-sky-400">— {profile.fullName}</p>

          {/* Institutional Highlights Grid */}
          <motion.dl
            className="mt-8 grid gap-px overflow-hidden rounded-xl border border-slate-800 bg-slate-800 sm:grid-cols-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.08 }}
          >
            {facts.map((f) => (
              <motion.div
                key={f.k}
                className="bg-[#0b1222] p-4.5"
                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
              >
                <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300">{f.k}</dt>
                <dd className="mt-1 text-sm font-semibold text-white">{f.v}</dd>
                <dd className="mt-0.5 text-xs text-slate-400">{f.s}</dd>
              </motion.div>
            ))}
          </motion.dl>

          {/* Operational Competencies */}
          <div className="mt-7">
            <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Core Operational Scope</p>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((i) => (
                <span key={i} className="rounded-full border border-sky-500/20 bg-sky-950/40 px-3 py-1 text-xs font-medium text-sky-200">
                  ✓ {i}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}