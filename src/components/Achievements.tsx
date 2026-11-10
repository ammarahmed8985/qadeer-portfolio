import { useRef } from 'react';
import { motion } from 'framer-motion';
import { achievements, certifications } from '../data/portfolio';
import { EASE, SectionHeading, Tilt } from './fx';
import { RailButtons } from './Rail';

function Laurel({ side }: { side: 'l' | 'r' }) {
  return (
    <svg viewBox="0 0 30 64" className={`h-14 w-auto text-[#d9b46a] ${side === 'r' ? '-scale-x-100' : ''}`} aria-hidden>
      <path d="M26 62C10 52 4 36 8 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {[10, 18, 26, 34, 42, 50].map((y, i) => (
        <ellipse key={y} cx={i < 2 ? 9 : 8 + i * 1.6} cy={y} rx="5" ry="2.2" fill="currentColor" opacity="0.85" transform={`rotate(-40 ${8 + i * 1.6} ${y})`} />
      ))}
    </svg>
  );
}

export default function Achievements() {
  const rail = useRef<HTMLDivElement>(null);
  const issuers = Array.from(new Set(certifications.map((c) => c.issuer)));

  return (
    <>
      <SectionHeading kicker="Verified Accolades" title="Institutional Commendations" />

      {/* Main Commendation Cards */}
      <div className="gutter grid gap-4 sm:grid-cols-2 lg:grid-cols-4 [perspective:1400px]">
        {achievements.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 40, rotateX: 14 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
          >
            <Tilt max={8} className="group h-full rounded-2xl">
              <article className="relative flex h-full min-h-[340px] flex-col items-center overflow-hidden rounded-2xl bg-[radial-gradient(120%_80%_at_50%_0%,#1e293b,#0b1222_60%,#070b14)] px-5 pb-6 pt-8 text-center border border-[#d9b46a]/30 transition duration-500 group-hover:border-[#d9b46a]/70 shadow-xl">
                <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9b46a]/70 to-transparent" />
                <div aria-hidden className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#d9b46a]/10 blur-3xl transition duration-700 group-hover:bg-[#d9b46a]/20" />
                
                <div className="relative flex items-center gap-1">
                  <Laurel side="l" />
                  <div className="px-1">
                    <p className="text-[9px] font-bold uppercase leading-tight tracking-[0.2em] text-[#d9b46a]">{a.laurel}</p>
                  </div>
                  <Laurel side="r" />
                </div>
                
                <h3 className="relative mt-5 font-sans text-xl font-bold tracking-tight text-white">{a.title}</h3>
                <p className="relative mt-1.5 text-xs font-semibold uppercase tracking-wider text-sky-300">{a.org}</p>
                <p className="relative mt-4 text-[13px] leading-relaxed text-slate-300">{a.detail}</p>
                
                <div className="mt-auto pt-4 flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                  <span>✓</span> Verified Official Document
                </div>
              </article>
            </Tilt>
          </motion.div>
        ))}
      </div>

      {/* Verified Certificates Rail */}
      <div className="mt-16">
        <div className="gutter mb-3 flex flex-wrap items-end justify-between gap-2">
          <h3 className="font-sans text-lg font-bold text-white sm:text-2xl">
            Official Credentials <span className="text-sky-400 font-normal">· {certifications.length} verified documents</span>
          </h3>
          <p className="text-xs text-slate-400 font-medium">{issuers.join('  •  ')}</p>
        </div>
        
        <div className="group/rail relative">
          <div ref={rail} className="rail gutter flex snap-x gap-3 overflow-x-auto py-4">
            {certifications.map((c, i) => (
              <motion.a
                key={c.name}
                href={c.link}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="group relative flex w-[240px] shrink-0 snap-start flex-col justify-between rounded-xl border border-slate-800 bg-[#0b1222] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.04, ease: EASE }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">{c.issuer}</span>
                  <span className="text-xs text-slate-500 transition group-hover:text-white">↗</span>
                </div>
                <p className="mt-5 text-xs font-semibold leading-snug text-white group-hover:text-sky-300 transition-colors">
                  {c.name}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Official Record Ready
                </div>
              </motion.a>
            ))}
          </div>
          <RailButtons rail={rail} />
        </div>
      </div>
    </>
  );
}