import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { profile, viewerProfiles, type ProfileId } from '../data/portfolio';
import { EASE } from './fx';

// Clean institutional icons for all department badges (No old photo)
export function ProfileAvatar({ id, size = 'lg' }: { id: ProfileId; size?: 'sm' | 'lg' }) {
  const p = viewerProfiles.find((v) => v.id === id)!;
  const box = size === 'lg' ? 'h-14 w-14 sm:h-16 sm:w-16 rounded-xl' : 'h-8 w-8 rounded-lg';

  // Department Icons: Hospital, University, Facilities, Fleet
  const icons: Record<ProfileId, string> = {
    sushmita: '🏥', // Hospital Administration
    recruiter: '🎓', // Campus & HR
    developer: '⚙️', // Facilities & Operations
    creative: '🚐', // Transport & Logistics
  };

  return (
    <span
      className={`relative flex items-center justify-center overflow-hidden border border-slate-700/80 shadow-md ${box}`}
      style={{ background: `linear-gradient(135deg, ${p.color}35, #070b14)` }}
    >
      <span className={size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-sm'}>{icons[id]}</span>
    </span>
  );
}

export default function ProfileSelector({ onPick }: { onPick: (id: ProfileId) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onPick('sushmita');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onPick]);

  // Department labels mapped to profiles
  const departmentTags: Record<ProfileId, { badge: string; tagColor: string }> = {
    sushmita: { badge: 'TERTIARY HEALTHCARE', tagColor: 'border-sky-500/40 text-sky-400 bg-sky-950/40' },
    recruiter: { badge: 'CAMPUS & HR', tagColor: 'border-teal-500/40 text-teal-400 bg-teal-950/40' },
    developer: { badge: 'FACILITIES & EVS', tagColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40' },
    creative: { badge: 'FLEET & TRANSPORT', tagColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/40' },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center overflow-y-auto bg-[#060911] px-4 py-8 sm:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
      transition={{ duration: 0.6, ease: EASE }}
      role="dialog"
      aria-label="Institutional Review Portal"
    >
      {/* Background Grid Pattern (Medical Portal Aesthetic) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(14,165,233,0.15),transparent_75%)]"
      />

      {/* Institutional Header */}
      <div className="relative z-10 mb-6 text-center sm:mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-950/50 px-3.5 py-1 text-[10px] font-semibold tracking-wider text-sky-300 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Verified Dossier Access
        </div>
        <motion.h2
          className="mt-3 font-sans text-xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          Select Institutional Lens
        </motion.h2>
        <p className="mt-1.5 text-xs text-slate-400 sm:text-sm">
          Review credentials for <span className="font-semibold text-slate-200">{profile.displayName}</span> according to department focus.
        </p>
      </div>

      {/* Credential Cards Grid — Clean 2-column on mobile, 4-column on desktop */}
      <motion.div
        className="relative z-10 grid w-full max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.07, delayChildren: 0.15 }}
      >
        {viewerProfiles.map((p) => {
          const dep = departmentTags[p.id];
          return (
            <motion.div
              key={p.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
              }}
            >
              <button
                type="button"
                onClick={() => onPick(p.id)}
                className="group relative flex h-full w-full flex-col justify-between rounded-xl border border-slate-800/90 bg-slate-900/60 p-4 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/50 hover:bg-slate-800/80 hover:shadow-[0_8px_30px_rgba(14,165,233,0.12)] focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`rounded px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase border ${dep.tagColor}`}>
                    {dep.badge}
                  </span>
                  <span className="text-[10px] text-slate-500 group-hover:text-sky-300 transition-colors">
                    Access →
                  </span>
                </div>

                {/* Middle Identity */}
                <div className="my-3 flex items-center gap-3">
                  <ProfileAvatar id={p.id} size="sm" />
                  <div>
                    <h3 className="font-sans text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-[11px] leading-snug text-slate-400 line-clamp-2 mt-0.5">
                      {p.blurb}
                    </p>
                  </div>
                </div>

                {/* Bottom Quick Indicator */}
                <div className="mt-2 border-t border-slate-800/80 pt-2.5 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Verified Records
                  </span>
                  <span className="font-mono text-slate-500 text-[9px]">DOCS READY</span>
                </div>
              </button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recruiter Trust Note & Contacts */}
      <div className="relative z-10 mt-8 flex flex-col items-center gap-2 text-center text-xs text-slate-400">
        <p className="max-w-md">
          Immediate hospital and campus availability. Direct contact: <span className="font-semibold text-sky-300">0315-5048805</span> / <span className="font-semibold text-sky-300">0345-5038345</span>
        </p>
      </div>
    </motion.div>
  );
}