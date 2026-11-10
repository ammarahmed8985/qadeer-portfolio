import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { sectionMeta, viewerProfiles, type ProfileId, type SectionId } from '../data/portfolio';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { ProfileAvatar } from './ProfileSelector';
import { EASE } from './fx';

export default function Navbar({ order, profileId, onSwitch }: { order: SectionId[]; profileId: ProfileId; onSwitch: (id: ProfileId) => void }) {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [active, setActive] = useState<string>('top');
  const { scrollTo } = useSmoothScroll();
  const menuRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > 400 && y > prev && !menu && !mobileNav);
  });

  useEffect(() => {
    const ids = ['top', ...order];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [order]);

  useEffect(() => {
    if (!menu) return;
    const close = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenu(false);
    };
    window.addEventListener('pointerdown', close);
    return () => window.removeEventListener('pointerdown', close);
  }, [menu]);

  const go = (id: string) => {
    setMobileNav(false);
    scrollTo(`#${id}`, { offset: id === 'top' ? 0 : -64 });
  };

  const current = viewerProfiles.find((p) => p.id === profileId)!;

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-[60]"
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <div
        className={`gutter flex h-16 items-center justify-between gap-6 transition-[background,backdrop-filter] duration-500 md:h-[72px] ${
          solid || mobileNav ? 'bg-[#070b14]/90 backdrop-blur-xl border-b border-sky-500/10' : 'bg-gradient-to-b from-[#070b14]/90 to-transparent'
        }`}
      >
        <div className="flex items-center gap-8 lg:gap-10">
          <button type="button" onClick={() => go('top')} className="text-[20px] font-bold tracking-tight text-white flex items-center gap-2" aria-label="Back to top">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-display tracking-wider text-sky-400">QADEER AHMED</span>
          </button>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Sections">
            <NavLink label="Home" active={active === 'top'} onClick={() => go('top')} />
            {order.map((id) => (
              <NavLink key={id} label={sectionMeta[id].nav} active={active === id} onClick={() => go(id)} />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Direct Call Button for Hospital / University Recruiters */}
          <a
            href="tel:03155048805"
            className="hidden rounded-full border border-sky-400/40 bg-sky-950/40 px-4 py-1.5 text-xs font-semibold tracking-wider text-sky-300 transition hover:bg-sky-900/60 hover:text-white sm:flex items-center gap-1.5"
          >
            <span>📞</span> 0315-5048805
          </a>

          {/* Department View Switcher */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenu((m) => !m)}
              aria-haspopup="menu"
              aria-expanded={menu}
              aria-label={`Viewing as ${current.name}. Switch mode`}
              className="flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-900/60 p-1 px-2 transition hover:border-sky-500/40"
            >
              <ProfileAvatar id={profileId} size="sm" />
              <span className="hidden text-xs font-medium text-slate-300 md:inline">{current.name}</span>
              <motion.span animate={{ rotate: menu ? 180 : 0 }} className="text-[10px] text-sky-400">
                ▼
              </motion.span>
            </button>
            <AnimatePresence>
              {menu && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="absolute right-0 top-12 w-64 origin-top-right rounded-xl border border-sky-500/20 bg-[#090e1a]/95 p-2 shadow-2xl backdrop-blur-2xl"
                >
                  <p className="px-3 pb-2 pt-1 text-[10px] font-semibold tracking-[0.2em] text-sky-300 uppercase">INSTITUTIONAL LENS</p>
                  {viewerProfiles.map((p) => (
                    <button
                      key={p.id}
                      role="menuitem"
                      type="button"
                      onClick={() => {
                        onSwitch(p.id);
                        setMenu(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-sky-950/50 ${p.id === profileId ? 'bg-sky-900/30 border border-sky-500/30' : ''}`}
                    >
                      <ProfileAvatar id={p.id} size="sm" />
                      <span>
                        <span className="block text-xs font-semibold text-white">{p.name}</span>
                        <span className="block text-[10px] text-slate-400 leading-tight">{p.blurb}</span>
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={mobileNav ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileNav}
            onClick={() => setMobileNav((v) => !v)}
          >
            <motion.span className="block h-0.5 w-5 bg-sky-300" animate={{ rotate: mobileNav ? 45 : 0, y: mobileNav ? 4 : 0 }} />
            <motion.span className="block h-0.5 w-5 bg-sky-300" animate={{ rotate: mobileNav ? -45 : 0, y: mobileNav ? -4 : 0 }} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileNav && (
          <motion.nav
            aria-label="Sections"
            className="gutter border-b border-sky-500/20 bg-[#070b14]/98 pb-6 pt-3 backdrop-blur-2xl lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {[{ id: 'top', label: 'Overview' }, ...order.map((id) => ({ id, label: sectionMeta[id].nav }))].map((l, i) => (
              <motion.button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
                className={`block w-full py-2.5 text-left font-sans text-xl font-bold tracking-wide ${active === l.id ? 'text-sky-400' : 'text-slate-200'}`}
              >
                {l.label}
              </motion.button>
            ))}

            {/* Mobile Contact Quick Button */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <a
                href="tel:03155048805"
                className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-lg"
              >
                <span>📞</span> Call Qadeer Ahmed (0315-5048805)
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavLink({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`relative text-[13px] font-medium transition ${active ? 'text-white font-semibold' : 'text-slate-400 hover:text-sky-300'}`}>
      {label}
      {active && <motion.span layoutId="nav-underline" className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded bg-sky-400" />}
    </button>
  );
}