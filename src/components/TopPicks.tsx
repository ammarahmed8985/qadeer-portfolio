import { useRef } from 'react';
import { motion } from 'framer-motion';
import { topPicks } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';
import { RailButtons } from './Rail';

export default function TopPicks() {
  const rail = useRef<HTMLDivElement>(null);

  return (
    <>
      <SectionHeading kicker="Core Qualifications" title="Institutional Highlights" />

      <div className="group/rail relative">
        {/* Clean Credential Grid (No Giant Netflix Numbers) */}
        <div ref={rail} className="rail gutter flex snap-x snap-mandatory gap-3.5 overflow-x-auto py-4">
          {topPicks.map((pick, i) => (
            <motion.div
              key={pick.title}
              className="group relative flex h-[240px] w-[210px] shrink-0 snap-start flex-col justify-between rounded-2xl border border-slate-800 bg-[#090e1a] p-5 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-500/50 hover:bg-[#0d1527] sm:w-[230px]"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px -5% 0px 0px' }}
              transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.05, ease: EASE }}
            >
              {/* Card Top: Sequential Badge & Checkmark */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-md border border-sky-400/30 bg-sky-950/60 px-2.5 py-1 text-[9px] font-bold tracking-wider text-sky-300 uppercase">
                  <span>✓</span> KEY HIGHLIGHT 0{i + 1}
                </span>
                <span className="text-xs text-emerald-400">★</span>
              </div>

              {/* Card Center: Scope Label & Bold Title */}
              <div className="my-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{pick.label}</span>
                <h3 className="mt-1 font-sans text-base font-bold leading-snug text-white group-hover:text-sky-200 transition-colors">
                  {pick.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">{pick.detail}</p>
              </div>

              {/* Card Bottom: Institutional Verification Footer */}
              <div className="border-t border-slate-800/80 pt-2 flex items-center justify-between text-[10px] text-slate-400">
                <span className="text-emerald-400 font-semibold">Official Record</span>
                <span className="text-sky-400 font-mono text-[9px]">READY</span>
              </div>
            </motion.div>
          ))}
        </div>
        <RailButtons rail={rail} />
      </div>
    </>
  );
}