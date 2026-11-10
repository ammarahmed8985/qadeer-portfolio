import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { EASE } from './fx';

export default function OpeningSequence({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') onDone();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center overflow-y-auto bg-[#070b14] px-4 py-8"
      exit={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
      transition={{ duration: 0.5, ease: EASE }}
      role="dialog"
      aria-label="Institutional Verification Gateway"
    >
      {/* Background medical grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(14,165,233,0.14),transparent_75%)]"
      />

      {/* Main Verification Card */}
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center rounded-3xl border border-sky-500/20 bg-[#090e1a]/95 p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-10"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Verification Status Pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Verified Official Record • Available for Hire
        </div>

        {/* Candidate Portrait Badge */}
        <div className="relative mb-5 h-28 w-28 overflow-hidden rounded-2xl border-2 border-sky-400/40 bg-sky-950/30 shadow-xl sm:h-32 sm:w-32">
          <img
            src={profile.portrait.src}
            alt={profile.displayName}
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/70 to-transparent" />
        </div>

        {/* Candidate Name & Title */}
        <h1 className="font-sans text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {profile.fullName}
        </h1>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-sky-400 sm:text-sm">
          {profile.role}
        </p>

        {/* Accredited Institutions */}
        <div className="mt-5 flex flex-wrap justify-center gap-2 text-[11px] font-medium text-slate-300">
          <span className="rounded-md border border-slate-700 bg-slate-900/60 px-2.5 py-1">
            🏥 Shifa International Hospital
          </span>
          <span className="rounded-md border border-slate-700 bg-slate-900/60 px-2.5 py-1">
            🎓 Isra University
          </span>
          <span className="rounded-md border border-slate-700 bg-slate-900/60 px-2.5 py-1">
            🇸🇦 Saudi Arabia (KSA)
          </span>
        </div>

        {/* Direct Contact Numbers */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-emerald-400">
          <span>📞</span> 0315-5048805 · 0345-5038345
        </div>

        {/* Primary Action Button (Replaced Netflix 'Play') */}
        <div className="mt-7 w-full">
          <button
            type="button"
            onClick={onDone}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-400 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(14,165,233,0.35)] transition hover:bg-sky-300 hover:shadow-[0_0_40px_rgba(14,165,233,0.5)]"
          >
            <span>📋</span> ENTER CANDIDATE DOSSIER
          </button>
        </div>

        <button
          type="button"
          onClick={onDone}
          className="mt-4 text-[11px] font-semibold text-slate-500 hover:text-slate-300 transition-colors"
        >
          Press Enter or Esc to continue →
        </button>
      </motion.div>
    </motion.div>
  );
}