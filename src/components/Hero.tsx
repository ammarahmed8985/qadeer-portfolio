import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { certifications, profile, projects, type ProfileId } from '../data/portfolio';
import { useFinePointer } from '../hooks/useMedia';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { EASE, Magnetic, Particles } from './fx';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } } };
const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
};

export default function Hero({ onPlay, onResume, profileId }: { onPlay: () => void; onResume: () => void; profileId: ProfileId }) {
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer();
  const { scrollTo } = useSmoothScroll();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const blackout = useTransform(scrollYProgress, [0.35, 1], [0, 1]);

  // Pointer parallax (desktop)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 });
  const py = useSpring(my, { stiffness: 60, damping: 18 });
  const imgRotY = useTransform(px, [-1, 1], [-4, 4]);
  const imgRotX = useTransform(py, [-1, 1], [3, -3]);
  const imgShiftX = useTransform(px, [-1, 1], [-10, 10]);
  const chipX = useTransform(px, [-1, 1], [16, -16]);
  const chipY = useTransform(py, [-1, 1], [10, -10]);
  const glowX = useTransform(px, [-1, 1], ['-5%', '5%']);

  // Verified Institutional Meta Tags
  const meta = [
    '20+ Years In-Service',
    'Shifa Hospital & KSA Verified',
    `${projects.length} Service Areas`,
    `${certifications.length} Credentials`,
  ];

  // Floating Credential Chips for Qadeer Ahmed
  const floating = [
    { text: 'Certificate of Appreciation', sub: 'Isra University Islamabad', pos: 'left-[1%] top-[26%]', depth: 1 },
    { text: 'Housekeeping Aide I & II', sub: 'Shifa International Hospital', pos: 'right-[1%] top-[18%]', depth: -1 },
    { text: '0315-5048805', sub: 'Direct Call / WhatsApp', pos: 'right-[4%] bottom-[24%]', depth: 0.6 },
  ];

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-[#070b14]"
      onPointerMove={(e) => {
        if (!fine) return;
        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
      }}
    >
      {/* Medical Ambient Atmosphere (Replaced Netflix Red with Clinical Blue & Teal) */}
      <motion.div aria-hidden className="absolute inset-0 pointer-events-none" style={{ x: glowX }}>
        <div className="absolute right-[-10%] top-[-10%] h-[90vh] w-[80vw] rounded-full bg-[radial-gradient(closest-side,rgba(14,165,233,0.28),rgba(14,165,233,0.05)_55%,transparent)] blur-2xl lg:right-[-4%] lg:w-[60vw]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[70vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(15,118,110,0.22),transparent)] blur-2xl" />
      </motion.div>
      <Particles className="z-[1] opacity-40" />

      {/* Portrait Section */}
      <motion.div
        className="absolute inset-x-0 top-10 z-[2] flex h-[62svh] items-end justify-center sm:h-[68svh] lg:bottom-0 lg:left-auto lg:right-[3vw] lg:top-16 lg:h-auto lg:w-[54vw] xl:right-[6vw] xl:w-[48vw]"
        style={{ y: imgY, scale: imgScale, opacity: fade }}
      >
        <motion.div
          className="relative h-full w-full lg:h-[86vh]"
          style={{ rotateY: imgRotY, rotateX: imgRotX, x: imgShiftX, transformPerspective: 1200 }}
          initial={{ clipPath: 'inset(100% -30% -10% -30%)', opacity: 0 }}
          animate={{ clipPath: 'inset(-30% -30% -10% -30%)', opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.1 }}
        >
          {/* Clinical rim glow ring */}
          <div
            aria-hidden
            className="absolute bottom-[8%] left-1/2 h-[76%] w-[76%] -translate-x-1/2 rounded-full border border-sky-400/20 shadow-[0_0_120px_rgba(14,165,233,0.28),inset_0_0_80px_rgba(14,165,233,0.15)]"
          />
          <img
            src={profile.portrait.src}
            srcSet={profile.portrait.srcSet}
            sizes="(max-width: 1024px) 100vw, 54vw"
            alt={profile.portrait.alt}
            className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] [mask-image:linear-gradient(to_bottom,black_65%,transparent_98%)]"
          />

          {/* Subtle medical highlight on edges */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_30%,rgba(56,189,248,0.15),transparent_70%)] mix-blend-screen"
          />

          {/* Floating Credential Badges (Desktop) */}
          {floating.map((f, i) => (
            <FloatChip key={f.text} {...f} index={i} mx={chipX} my={chipY} />
          ))}
        </motion.div>
      </motion.div>

      {/* Readability Gradients */}
      <div aria-hidden className="absolute inset-x-0 top-[38svh] z-[3] h-[38svh] bg-gradient-to-b from-transparent via-[#070b14]/85 to-[#070b14] lg:hidden" />
      <div aria-hidden className="absolute inset-0 z-[3] hidden bg-[linear-gradient(90deg,#070b14_0%,rgba(7,11,20,0.8)_35%,transparent_60%)] lg:block" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-[3] h-48 bg-gradient-to-t from-[#070b14] to-transparent" />

      {/* Hero Copy (Mobile-Safe Typography) */}
      <motion.div
        className="gutter relative z-[4] flex min-h-[100svh] flex-col justify-end px-4 pb-14 pt-[52svh] sm:px-8 sm:pb-20 lg:max-w-[54vw] lg:justify-center lg:pb-0 lg:pt-20"
        style={{ y: textY, opacity: fade }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Verification Status Pill */}
        <motion.div variants={item} className="mb-3 inline-flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/40 bg-sky-950/60 px-3 py-1 font-sans text-[10px] font-semibold tracking-wider text-sky-200 uppercase backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Verified Hospital & Campus Dossier
          </span>
        </motion.div>

        {/* Candidate Name */}
        <motion.h1
          variants={item}
          className="font-display leading-[0.88] tracking-[0.02em] text-white drop-shadow-md"
          style={{ fontSize: 'clamp(3.8rem, 11vw, 10rem)' }}
        >
          <span>{profile.firstName}</span>
        </motion.h1>

        {/* Subtitle — Mobile-Safe Tracking */}
        <motion.p
          variants={item}
          className="mt-1 font-sans text-xs font-bold tracking-[0.18em] text-sky-400 sm:text-sm sm:tracking-[0.32em] uppercase"
        >
          {profile.seriesTag}
        </motion.p>

        {/* Quick Badges */}
        <motion.div variants={item} className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] font-medium text-slate-300">
          <span className="rounded border border-emerald-400/40 bg-emerald-950/40 px-2 py-0.5 text-[10px] font-bold tracking-wider text-emerald-300">
            ACTIVE FOR HIRE
          </span>
          {meta.map((m, i) => (
            <span key={m} className="flex items-center gap-3">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-slate-600" />}
              {m}
            </span>
          ))}
        </motion.div>

        {/* Specialties */}
        <motion.p variants={item} className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-100 sm:text-xs sm:tracking-[0.24em]">
          {profile.tagline.join('  •  ')}
        </motion.p>

        {/* Concise Summary */}
        <motion.p variants={item} className="mt-3 max-w-xl text-[14px] leading-relaxed text-slate-300 sm:text-[15px]">
          {profile.intro}
        </motion.p>

        {/* Action Buttons — Mobile-Friendly Flex */}
        <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-3">
          <Magnetic>
            <button
              type="button"
              data-cursor="play"
              onClick={onPlay}
              className="flex min-h-11 items-center gap-2.5 rounded-lg bg-white px-6 py-2.5 text-sm font-bold text-slate-900 shadow-[0_0_30px_rgba(14,165,233,0.35)] transition hover:bg-sky-50 sm:px-8 sm:py-3 sm:text-base"
            >
              <span>📋</span> Overview Dossier
            </button>
          </Magnetic>

          <Magnetic>
            {profileId === 'recruiter' ? (
              <button
                type="button"
                onClick={onResume}
                className="glass flex min-h-11 items-center gap-2 rounded-lg border border-sky-400/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-950/40 sm:px-7 sm:py-3"
              >
                <span>⤓</span> View Certificates
              </button>
            ) : (
              <button
                type="button"
                onClick={() => scrollTo('#originals')}
                className="glass flex min-h-11 items-center gap-2 rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800/60 sm:px-7 sm:py-3"
              >
                <span>＋</span> Service History
              </button>
            )}
          </Magnetic>

          {/* Quick Direct Call Button */}
          <a
            href="tel:03155048805"
            className="flex min-h-11 items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-950/40 px-4 py-2.5 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-900/60"
            title="Call Qadeer Ahmed"
          >
            <span>📞</span> 0315-5048805
          </a>
        </motion.div>
      </motion.div>

      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-[5] bg-[#070b14]" style={{ opacity: blackout }} />
    </section>
  );
}

type MV = ReturnType<typeof useTransform<number, number>>;

function FloatChip({ text, sub, pos, depth, index, mx, my }: { text: string; sub: string; pos: string; depth: number; index: number; mx: MV; my: MV }) {
  const x = useTransform(mx, (n: number) => n * depth);
  const y = useTransform(my, (n: number) => n * depth);
  return (
    <motion.div
      className={`glass absolute hidden rounded-xl border border-sky-400/20 bg-slate-900/85 px-4 py-2.5 shadow-xl backdrop-blur-md md:block ${pos}`}
      style={{ x, y }}
      initial={{ opacity: 0, filter: 'blur(6px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, delay: 1.2 + index * 0.18, ease: EASE }}
    >
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}>
        <p className="text-sm font-semibold text-white">{text}</p>
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-sky-300">{sub}</p>
      </motion.div>
    </motion.div>
  );
}