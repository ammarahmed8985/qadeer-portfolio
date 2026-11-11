import { lazy, Suspense, useCallback, useEffect, useState, Component, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { viewerProfiles, type ProfileId, type Project, type SectionId } from './data/portfolio';
import { SmoothScrollProvider, useSmoothScroll } from './hooks/smoothScroll';
import OpeningSequence from './components/OpeningSequence';
import ProfileSelector from './components/ProfileSelector';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContinueWatching from './components/ContinueWatching';
import Scene from './components/Scene';
import About from './components/About';
import Seasons from './components/Seasons';
import Originals from './components/Originals';
import TopPicks from './components/TopPicks';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import ResumeSection from './components/ResumeViewer';
import FinalCTA from './components/FinalCTA';
import { EASE } from './components/fx';

const PlayIntro = lazy(() => import('./components/PlayIntro'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));
const ResumeModal = lazy(() => import('./components/ResumeModal'));

type Stage = 'opening' | 'profiles' | 'home';

const STORAGE_KEY = 'clinical-portfolio-profile';

// Safe Error Boundary to prevent black screen crashes
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: string }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: '' };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }
  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Captured React Error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#070b14] p-6 text-center text-white">
          <div className="max-w-md rounded-2xl border border-red-500/40 bg-red-950/40 p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-red-400">Component Loading Error</h2>
            <p className="mt-2 text-xs font-mono text-slate-300">{this.state.error}</p>
            <button
              onClick={() => {
                sessionStorage.clear();
                window.location.reload();
              }}
              className="mt-5 rounded-lg bg-sky-400 px-4 py-2 text-xs font-bold text-slate-950"
            >
              Reset & Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function readStoredProfile(): ProfileId | null {
  try {
    const v = sessionStorage.getItem(STORAGE_KEY);
    return viewerProfiles.some((p) => p.id === v) ? (v as ProfileId) : null;
  } catch {
    return null;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <SmoothScrollProvider>
        <Series />
      </SmoothScrollProvider>
    </ErrorBoundary>
  );
}

function Series() {
  const stored = readStoredProfile();
  const [stage, setStage] = useState<Stage>(stored ? 'home' : 'opening');
  const [profileId, setProfileId] = useState<ProfileId>(stored ?? (viewerProfiles[0]?.id || 'sushmita'));
  const [playing, setPlaying] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const { scrollTo } = useSmoothScroll();

  const activeProfile = viewerProfiles.find((p) => p.id === profileId) || viewerProfiles[0];
  const order = activeProfile.order;

  const pickProfile = useCallback(
    (id: ProfileId) => {
      setProfileId(id);
      try {
        sessionStorage.setItem(STORAGE_KEY, id);
      } catch {}

      if (stage !== 'home') {
        window.scrollTo(0, 0);
        setStage('home');
      } else {
        const p = viewerProfiles.find((v) => v.id === id);
        if (p) {
          setToast(`Reviewing as ${p.name} — ${p.blurb.toLowerCase()}`);
        }
        try {
          scrollTo(0, { offset: 0 });
        } catch {}
      }
    },
    [stage, scrollTo],
  );

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const closeIntro = useCallback(() => setPlaying(false), []);
  const closeProject = useCallback(() => setProject(null), []);
  const closeResume = useCallback(() => setResumeOpen(false), []);

  const sections: Record<SectionId, ReactNode> = {
    about: <About />,
    journey: <Seasons />,
    originals: <Originals onOpen={setProject} />,
    picks: <TopPicks />,
    skills: <Skills />,
    moments: <Achievements />,
    story: <ResumeSection onView={() => setResumeOpen(true)} />,
  };

  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-100 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {stage === 'opening' && <OpeningSequence key="opening" onDone={() => setStage('profiles')} />}
        {stage === 'profiles' && <ProfileSelector key="profiles" onPick={pickProfile} />}
      </AnimatePresence>

      {stage === 'home' && (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          <Navbar order={order} profileId={profileId} onSwitch={pickProfile} />
          <main>
            <Hero key={`hero-${profileId}`} onPlay={() => setPlaying(true)} onResume={() => setResumeOpen(true)} profileId={profileId} />
            <ContinueWatching order={order} />
            {order.map((id) => (
              <Scene key={id} id={id} className={id === 'originals' ? '!py-0 sm:!py-0' : ''}>
                {sections[id]}
              </Scene>
            ))}
            <FinalCTA onReplay={() => {
              try {
                sessionStorage.removeItem(STORAGE_KEY);
              } catch {}
              setStage('opening');
            }} />
          </main>
        </motion.div>
      )}

      <Suspense fallback={null}>
        <AnimatePresence>{playing && <PlayIntro key="intro" onClose={closeIntro} />}</AnimatePresence>
        <AnimatePresence>{project && <ProjectModal key="project" project={project} onClose={closeProject} onSwitch={setProject} />}</AnimatePresence>
        <AnimatePresence>{resumeOpen && <ResumeModal key="resume" onClose={closeResume} />}</AnimatePresence>
      </Suspense>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            className="glass fixed bottom-6 left-1/2 z-[150] w-[min(92vw,420px)] -translate-x-1/2 rounded-xl px-5 py-3 text-center text-sm text-bone shadow-lg border border-teal-500/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}