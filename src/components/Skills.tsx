import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { skillCategories, skillEvidence, type Skill } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';

// Clinical Medical Palette Hues (No Netflix red)
const HUES = ['#0ea5e9', '#14b8a6', '#10b981', '#38bdf8', '#6366f1', '#06b6d4', '#0284c7'];

export default function Skills() {
  const [cat, setCat] = useState(0);
  const category = skillCategories[cat];
  const hue = HUES[cat % HUES.length];

  return (
    <>
      <SectionHeading
        kicker="Scope of Work"
        title="Operational Competencies"
        aside={<p className="max-w-xs text-sm text-slate-400">Hover or tap any skill to see verified hospital and institutional evidence.</p>}
      />

      <div className="gutter grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
        {/* Category List */}
        <div className="rail -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0" role="tablist" aria-label="Skill categories">
          {skillCategories.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={i === cat}
              onClick={() => setCat(i)}
              className={`group relative shrink-0 rounded-xl px-4 py-3 text-left transition lg:px-5 ${i === cat ? 'text-white' : 'text-slate-400 hover:text-white'}`}
            >
              {i === cat && (
                <motion.span
                  layoutId="skill-tab"
                  className="absolute inset-0 rounded-xl bg-sky-950/40 border border-sky-500/30"
                  transition={{ duration: 0.45, ease: EASE }}
                />
              )}
              {i === cat && (
                <motion.span
                  layoutId="skill-bar"
                  className="absolute bottom-2 left-0 top-2 hidden w-[3px] rounded-r lg:block"
                  style={{ background: hue }}
                />
              )}
              <span className="relative block font-sans text-base font-bold tracking-tight lg:text-lg">{c.title}</span>
              <span className="relative hidden text-xs text-slate-400 lg:block">
                {c.skills.length} competencies · {c.subtitle}
              </span>
            </button>
          ))}
        </div>

        {/* Skill Cards */}
        <div className="min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div key={category.id} initial="hidden" animate="show" exit="exit" transition={{ staggerChildren: 0.05 }}>
              <motion.p
                className="mb-5 text-sm text-slate-300"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }}
              >
                <span className="font-semibold text-white">{category.title}</span> — {category.subtitle}
              </motion.p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {category.skills.map((s) => (
                  <SkillCard key={s.name} skill={s} hue={hue} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

function SkillCard({ skill, hue }: { skill: Skill; hue: string }) {
  const [open, setOpen] = useState(false);
  const evidence = skillEvidence[skill.name];

  return (
    <motion.button
      type="button"
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95, filter: 'blur(6px)' },
        show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: EASE } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
      }}
      whileHover={{ y: -5 }}
      className="group relative flex min-h-[148px] flex-col overflow-hidden rounded-xl border border-slate-800 bg-[#0b1222] p-4 text-left transition-all duration-300 hover:border-sky-500/40"
      style={{ boxShadow: open ? `0 18px 50px -12px ${hue}44, 0 0 0 1px ${hue}55` : undefined }}
    >
      <div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition duration-500 group-hover:opacity-40" style={{ background: hue }} />
      <motion.span
        className="relative flex h-11 w-11 items-center justify-center rounded-lg font-sans font-bold text-sm tracking-wider"
        style={{ background: `${hue}20`, color: hue, boxShadow: `inset 0 0 0 1px ${hue}55` }}
        animate={open ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 0.4 }}
        aria-hidden
      >
        {skill.mono}
      </motion.span>
      <span className="relative mt-3 flex items-center gap-2 text-sm font-bold text-white">
        {skill.name}
        {skill.note && (
          <span className="rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-slate-950" style={{ background: hue }}>
            {skill.note}
          </span>
        )}
      </span>
      <AnimatePresence initial={false}>
        {open && evidence && (
          <motion.span
            className="relative mt-2 block text-[11px] leading-snug text-slate-300"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {evidence.join(' · ')}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}