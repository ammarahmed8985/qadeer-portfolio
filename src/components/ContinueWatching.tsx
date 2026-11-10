import { sectionMeta, type SectionId } from '../data/portfolio';
import { useSmoothScroll } from '../hooks/smoothScroll';

export default function ContinueWatching({ order }: { order: SectionId[] }) {
  const { scrollTo } = useSmoothScroll();

  return (
    <section className="gutter relative py-8">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">Directory Navigation</span>
          <h2 className="font-sans text-xl font-bold tracking-tight text-white sm:text-2xl">Quick Sections Index</h2>
        </div>
        <p className="text-xs text-slate-400">Review verified background by operational department</p>
      </div>

      {/* Directory Cards Grid (No Netflix Episode design, No Red Scrub Bar) */}
      <div className="rail flex gap-3.5 overflow-x-auto pb-4">
        {order.map((id, index) => {
          const meta = sectionMeta[id];
          return (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(`#${id}`, { offset: -64 })}
              className="group relative flex h-[130px] w-[220px] shrink-0 flex-col justify-between rounded-xl border border-slate-800 bg-[#0b1222] p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/50 hover:bg-[#0f1a30] hover:shadow-[0_8px_25px_rgba(14,165,233,0.12)]"
            >
              {/* Top tag & clean arrow */}
              <div className="flex items-center justify-between">
                <span className="rounded bg-sky-950/70 border border-sky-400/30 px-2 py-0.5 text-[9px] font-bold tracking-wider text-sky-300 uppercase">
                  SECTION 0{index + 1}
                </span>
                <span className="text-xs text-slate-500 transition-colors group-hover:text-sky-300 group-hover:translate-x-0.5">
                  →
                </span>
              </div>

              {/* Card Title & Meta */}
              <div>
                <h3 className="font-sans text-sm font-bold text-white group-hover:text-sky-200 transition-colors">
                  {meta.card}
                </h3>
                <p className="mt-1 text-[11px] text-slate-400 line-clamp-1">{meta.meta}</p>
              </div>

              {/* Status Indicator (replaces the Netflix red progress bar) */}
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 border-t border-slate-800/80 pt-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Verified Record</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}