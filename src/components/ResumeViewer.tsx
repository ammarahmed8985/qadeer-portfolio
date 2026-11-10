import { useState } from 'react';
import { motion } from 'framer-motion';
import { achievements, certifications, education, experience, profile, projects, skillCategories } from '../data/portfolio';
import { EASE, Magnetic, SectionHeading } from './fx';

export default function ResumeSection({ onView }: { onView: () => void }) {
  return (
    <>
      <SectionHeading kicker="Official Documentation" title="Verified Service Record" />
      <div className="gutter grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.0, ease: EASE }}
          style={{ transformPerspective: 1600 }}
        >
          <CollapsibleSheet />
        </motion.div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-sans text-2xl font-bold leading-tight text-white sm:text-3xl">Comprehensive Career Dossier</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Shifa International Hospital tenure, Saudi Arabia supervisory experience, Isra University commendation, and verified machinery skills.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Magnetic className="w-full">
              <button
                type="button"
                data-cursor="view"
                onClick={onView}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-sky-400 px-6 text-sm font-bold text-slate-950 shadow-[0_0_25px_rgba(14,165,233,0.35)] transition hover:bg-sky-300"
              >
                <span>📋</span> View Full Record
              </button>
            </Magnetic>
            <Magnetic className="w-full">
              <a
                href="/resume.pdf"
                download="Qadeer_Ahmed_Hospital_Certificates.pdf"
                className="glass flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-sky-400/30 px-6 text-sm font-semibold text-white transition hover:bg-sky-950/40"
              >
                <span>⤓</span> Download Certificates PDF
              </a>
            </Magnetic>
          </div>

          {/* Recruiter Quick Stats */}
          <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-slate-800 bg-slate-800 text-center">
            {[
              { v: '20+', k: 'Years Exp' },
              { v: 'Shifa', k: 'Hospital Alum' },
              { v: String(certifications.length), k: 'Credentials' },
            ].map((s) => (
              <div key={s.k} className="bg-[#0b1222] px-2 py-4">
                <dd className="font-sans text-2xl font-bold leading-none text-sky-400">{s.v}</dd>
                <dt className="mt-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">{s.k}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}

function CollapsibleSheet() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div className={`overflow-hidden transition-[max-height] duration-700 ease-[var(--ease-cine)] md:max-h-none ${open ? 'max-h-[4000px]' : 'max-h-[560px]'}`}>
        <ResumeSheet />
      </div>
      {!open && (
        <div className="absolute inset-x-0 bottom-0 flex h-48 items-end justify-center rounded-b-2xl bg-gradient-to-t from-[#070b14] via-[#070b14]/85 to-transparent pb-4 md:hidden">
          <button type="button" onClick={() => setOpen(true)} className="glass min-h-11 rounded-full border border-sky-500/30 px-5 text-xs font-bold text-sky-300">
            Read Complete Dossier ↓
          </button>
        </div>
      )}
    </div>
  );
}

function H({ children }: { children: string }) {
  return <h4 className="mb-3 mt-6 border-b border-sky-500/20 pb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-sky-400 first:mt-0">{children}</h4>;
}

export function ResumeSheet() {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-sky-500/20 bg-[#090e1a] p-6 shadow-2xl sm:p-10">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-400 uppercase">VERIFIED SERVICE RECORD</p>
          <h3 className="mt-1 font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl">{profile.fullName}</h3>
          <p className="text-xs font-semibold text-sky-300">{profile.role}</p>
        </div>
        <div className="text-xs leading-relaxed text-slate-300 sm:text-right">
          <a href="tel:03155048805" className="block font-bold text-sky-300 hover:text-white">
            📞 0315-5048805 / 0345-5038345
          </a>
          <span className="block text-[11px] text-slate-400">{profile.location}</span>
        </div>
      </header>

      <div className="grid gap-x-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <H>Work History</H>
          {experience.map((x) => (
            <div key={x.company} className="mb-4">
              <div className="flex flex-wrap justify-between gap-x-3">
                <p className="text-sm font-semibold text-white">{x.role}</p>
                <p className="text-xs text-sky-300">{x.period}</p>
              </div>
              <p className="text-xs text-slate-400 font-medium">{x.company}</p>
              <ul className="mt-2 space-y-1.5">
                {x.points.map((p) => (
                  <li key={p} className="flex gap-2 text-xs leading-relaxed text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <H>Core Institutional Service Areas</H>
          {projects.map((p) => (
            <div key={p.id} className="mb-3">
              <div className="flex flex-wrap justify-between gap-x-3">
                <p className="text-xs font-semibold text-white">{p.title}</p>
                <p className="text-xs text-sky-400">{p.year}</p>
              </div>
              <p className="text-[11px] text-slate-400">{p.stack.join(' · ')}</p>
            </div>
          ))}

          <H>Education & In-Service Training</H>
          {education.map((e) => (
            <div key={e.school} className="mb-3">
              <div className="flex flex-wrap justify-between gap-x-3">
                <p className="text-xs font-semibold text-white">{e.degree}</p>
                <p className="text-[11px] text-slate-400">{e.period}</p>
              </div>
              <p className="text-xs text-sky-300">
                {e.school}, {e.place} · <span className="text-slate-300">{e.score}</span>
              </p>
            </div>
          ))}
        </div>

        <div>
          <H>Key Competencies</H>
          <div className="space-y-2">
            {skillCategories.map((c) => (
              <p key={c.id} className="text-xs leading-relaxed text-slate-300">
                <span className="font-semibold text-white">{c.title}: </span>
                {c.skills.map((s) => s.name).join(', ')}
              </p>
            ))}
          </div>

          <H>Accreditations & Commendations</H>
          <ul className="space-y-2.5">
            {achievements.map((a) => (
              <li key={a.id} className="text-xs leading-relaxed text-slate-300">
                <span className="font-semibold text-white">{a.title}</span> — <span className="text-sky-300">{a.org}</span>. {a.detail}
              </li>
            ))}
          </ul>

          <H>Verified Certificates</H>
          <p className="text-xs leading-relaxed text-slate-300">
            {Array.from(new Set(certifications.map((c) => c.issuer)))
              .map((iss) => `${iss}: ${certifications.filter((c) => c.issuer === iss).map((c) => c.name).join(', ')}`)
              .join(' · ')}
          </p>
        </div>
      </div>
    </article>
  );
}