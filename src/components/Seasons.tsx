import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { seasons } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';
import EpisodeCard from './EpisodeCard';
import { RailButtons } from './Rail';

export default function Seasons() {
  const [active, setActive] = useState(0); // Starts on Shifa Hospital milestone
  const season = seasons[active];
  const rail = useRef<HTMLDivElement>(null);

  return (
    <>
      <SectionHeading
        kicker={`${seasons.length} Career Milestones`}
        title="Verified Work History"
        aside={
          <p className="max-w-xs text-sm text-slate-400">
            Chronological documentation covering Shifa International Hospital, Makkah Hotels, and Isra University.
          </p>
        }
      />

      {/* Phase Selector Tabs */}
      <div className="rail gutter mb-8 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Career Milestones">
        {seasons.map((s, i) => (
          <button
            key={s.number}
            role="tab"
            aria-selected={i === active}
            type="button"
            onClick={() => {
              setActive(i);
              rail.current?.scrollTo({ left: 0, behavior: 'smooth' });
            }}
            className={`relative shrink-0 rounded-xl px-4 py-2.5 text-left transition ${
              i === active ? 'text-slate-950' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            {i === active && (
              <motion.span
                layoutId="season-pill"
                className="absolute inset-0 rounded-xl bg-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.4)]"
                transition={{ duration: 0.45, ease: EASE }}
              />
            )}
            <span className="relative block text-[9px] font-bold tracking-[0.2em] uppercase">PHASE 0{s.number}</span>
            <span className="relative block whitespace-nowrap text-xs font-bold sm:text-sm">{s.title}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={season.number}
          initial={{ opacity: 0, x: 25, filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: -25, filter: 'blur(6px)' }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="gutter mb-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="font-sans text-2xl font-bold tracking-tight text-white sm:text-4xl">
              <span className="mr-3 text-sky-400 font-mono text-xl sm:text-2xl">PHASE 0{season.number}</span>
              {season.title}
            </h3>
            <span className="text-xs font-semibold text-slate-400">
              {season.period} · {season.episodes.length} {season.episodes.length === 1 ? 'Accredited Record' : 'Accredited Records'}
            </span>
          </div>
          <p className="gutter max-w-3xl text-[14px] leading-relaxed text-slate-300 sm:text-[15px]">{season.synopsis}</p>

          <div className="group/rail relative">
            <div ref={rail} className="rail gutter flex snap-x snap-mandatory gap-4 overflow-x-auto py-6 [perspective:1200px]">
              {season.episodes.map((e, i) => (
                <EpisodeCard key={e.code} episode={e} index={i} />
              ))}
            </div>
            <RailButtons rail={rail} />
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}