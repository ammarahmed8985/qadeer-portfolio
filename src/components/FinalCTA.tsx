import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '../data/portfolio';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { EASE, Magnetic, Particles } from './fx';

export default function FinalCTA({ onReplay }: { onReplay: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.2'] });
  const spacing = useTransform(scrollYProgress, [0, 1], ['0.25em', '0.03em']);
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(12px)', 'blur(0px)']);
  const opacity = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  const ctas = [
    { label: 'Call 0315-5048805', href: 'tel:03155048805', primary: true, icon: '📞' },
    { label: 'WhatsApp Direct', href: 'https://wa.me/923155048805', primary: false, icon: '💬', isExternal: true },
    { label: 'Call 0345-5038345', href: 'tel:03455038345', primary: false, icon: '📱' },
    { label: 'Email Inquiry', href: `mailto:${profile.email}`, primary: false, icon: '✉' },
  ];

  return (
    <section id="contact" ref={ref} className="relative flex min-h-[90svh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center bg-[#070b14]">
      {/* Medical Blue Glow */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_60%,rgba(14,165,233,0.18),transparent_70%)]" />
      <Particles count={28} className="opacity-30" />

      <motion.p
        className="relative mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Immediate Institutional Availability
      </motion.p>
      
      <motion.h2
        className="relative font-sans text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
        style={{ letterSpacing: spacing, filter: blur, opacity }}
      >
        READY FOR IN-SERVICE
      </motion.h2>

      <motion.div
        className="relative mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
      >
        <p className="font-sans text-xl font-bold tracking-wide text-sky-400 sm:text-2xl">{profile.displayName.toUpperCase()}</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-300 sm:text-sm">{profile.role}</p>
        <p className="mt-2 text-xs text-slate-400">Rawalpindi / Islamabad • Open to Hospital & Campus Shifts</p>
      </motion.div>

      {/* Direct Contact & WhatsApp Actions */}
      <motion.div
        className="relative mt-8 flex flex-wrap justify-center gap-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.08, delayChildren: 0.25 }}
      >
        {ctas.map((c) => (
          <motion.div key={c.label} variants={{ hidden: { opacity: 0, y: 16, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } } }}>
            <Magnetic>
              <a
                href={c.href}
                target={c.isExternal ? '_blank' : undefined}
                rel={c.isExternal ? 'noreferrer' : undefined}
                className={`flex min-h-12 items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold tracking-wider transition ${
                  c.primary
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_35px_rgba(16,185,129,0.4)] hover:bg-emerald-400'
                    : 'border border-sky-400/30 bg-sky-950/40 text-white hover:bg-sky-900/50'
                }`}
              >
                <span>{c.icon}</span>
                {c.label.toUpperCase()}
              </a>
            </Magnetic>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative mt-12 flex flex-wrap justify-center gap-6 text-xs font-semibold tracking-wider text-slate-400">
        <button type="button" onClick={() => scrollTo(0, { offset: 0 })} className="hover:text-white transition-colors">
          ↺ BACK TO TOP
        </button>
        <button type="button" onClick={onReplay} className="hover:text-sky-300 transition-colors">
          ▶ REPLAY OPENING
        </button>
      </div>

      <footer className="absolute inset-x-0 bottom-0 px-4 pb-4 text-center">
        <p className="text-[10px] text-slate-500">
          © {new Date().getFullYear()} {profile.displayName}. Official Hospital & University Facilities Dossier.
        </p>
      </footer>
    </section>
  );
}