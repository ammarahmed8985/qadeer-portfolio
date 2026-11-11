import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';
import { useReducedMotionPref } from './useMedia';

type ScrollApi = {
  scrollTo: (target: string | HTMLElement | number, opts?: { offset?: number; immediate?: boolean }) => void;
  lock: () => void;
  unlock: () => void;
};

const ScrollCtx = createContext<ScrollApi | null>(null);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionPref();
  const lenisRef = useRef<Lenis | null>(null);
  const locks = useRef(0);

  useEffect(() => {
    // Disable Lenis on touch/mobile devices so phones use native lag-free momentum scrolling
    const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    if (reduced || isTouch) return;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, easing: (t) => 1 - Math.pow(1 - t, 4) });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const scrollTo = useCallback<ScrollApi['scrollTo']>((target, opts = {}) => {
    const offset = opts.offset ?? -72;
    try {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: opts.immediate ? 'auto' : 'smooth' });
        return;
      }
      const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
      if (!el) return;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset, immediate: opts.immediate, duration: 1.2 });
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: opts.immediate ? 'auto' : 'smooth' });
      }
    } catch {
      window.scrollTo(0, 0);
    }
  }, []);

  const lock = useCallback(() => {
    locks.current += 1;
    lenisRef.current?.stop();
    document.documentElement.style.overflow = 'hidden';
  }, []);

  const unlock = useCallback(() => {
    locks.current = Math.max(0, locks.current - 1);
    if (locks.current === 0) {
      lenisRef.current?.start();
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }, []);

  return <ScrollCtx.Provider value={{ scrollTo, lock, unlock }}>{children}</ScrollCtx.Provider>;
}

// Crash-proof hook: Returns safe browser fallbacks instead of crashing React
export function useSmoothScroll(): ScrollApi {
  const ctx = useContext(ScrollCtx);
  if (!ctx) {
    return {
      scrollTo: (target, opts = {}) => {
        const offset = opts?.offset ?? -72;
        try {
          if (typeof target === 'number') {
            window.scrollTo({ top: target, behavior: opts?.immediate ? 'auto' : 'smooth' });
          } else {
            const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
            if (el) {
              const top = el.getBoundingClientRect().top + window.scrollY + offset;
              window.scrollTo({ top, behavior: opts?.immediate ? 'auto' : 'smooth' });
            }
          }
        } catch {
          window.scrollTo(0, 0);
        }
      },
      lock: () => {},
      unlock: () => {
        try {
          document.documentElement.style.overflow = '';
          document.body.style.overflow = '';
        } catch {}
      },
    };
  }
  return ctx;
}

/** Locks page scroll while `active` is true (used by overlays). */
export function useScrollLock(active: boolean) {
  const { lock, unlock } = useSmoothScroll();
  useEffect(() => {
    if (!active) return;
    lock();
    return unlock;
  }, [active, lock, unlock]);
}