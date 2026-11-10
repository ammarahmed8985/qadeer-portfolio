import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollLock } from '../hooks/smoothScroll';
import { useMedia } from '../hooks/useMedia';
import { EASE } from './fx';
import { ResumeSheet } from './ResumeViewer';

export default function ResumeModal({ onClose }: { onClose: () => void }) {
  useScrollLock(true);
  const small = useMedia('(max-width: 767px)');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[140] flex flex-col bg-[#070b14]/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Official Certificates and Resume"
    >
      <div className="gutter flex h-16 shrink-0 items-center justify-between gap-3 border-b border-slate-800 pt-[env(safe-area-inset-top)]">
        <div>
          <p className="truncate font-sans text-sm font-bold text-white sm:text-base">Official Service Dossier</p>
          <p className="text-[11px] text-sky-400">Qadeer Ahmed (Satti) — Verified Documents</p>
        </div>
        
        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            download="Qadeer_Ahmed_Hospital_Certificates.pdf"
            className="rounded-md bg-sky-400 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-sky-300 transition"
          >
            ⤓ Download PDF
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close record"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-white hover:bg-slate-700"
          >
            ✕
          </button>
        </div>
      </div>

      <motion.div
        className="gutter flex-1 pb-6 pt-4"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {small ? (
          <div data-lenis-prevent className="h-full overflow-y-auto">
            <ResumeSheet />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex min-h-12 items-center justify-center rounded-lg border border-sky-400/40 bg-sky-950/40 text-xs font-bold text-sky-200"
            >
              Open Original Certificates PDF ↗
            </a>
          </div>
        ) : (
          <iframe
            title="Qadeer Ahmed Service Certificates (PDF)"
            src="/resume.pdf#view=FitH"
            className="h-full w-full rounded-xl border border-slate-800 bg-white"
          />
        )}
      </motion.div>
    </motion.div>
  );
}