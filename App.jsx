import { useEffect } from 'react';
import Background from './components/Background';
import Sprites from './components/Sprites';
import OpsBar from './components/OpsBar';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ViewSkeleton from './components/ViewSkeleton';
import Home from './components/pages/Home';
import HowItWorks from './components/pages/HowItWorks';
import Kits from './components/pages/Kits';
import Documents from './components/pages/Documents';
import Playground from './components/pages/Playground';
import Roi from './components/pages/Roi';
import Blog from './components/pages/Blog';
import Pager from './components/Pager';
import Footer from './components/Footer';
import Wizard from './components/Wizard';
import DocDialog from './components/DocDialog';
import DocTemplates from './components/DocTemplates';

/**
 * Empiric Labs: single-page app shell.
 *
 * Markup is split into React components (one per page / region). The interactive
 * behaviour (hash router, i18n, docs workspace, ROI calculator, questionnaire,
 * playground, background effects) lives in framework-agnostic modules in src/legacy
 * and is started once after the first render. Those components render once and
 * never re-render, so the modules can safely own the DOM they enhance.
 */
export default function App() {
  useEffect(() => {
    let cancelled = false;
    import('./legacy/start').then((m) => {
      if (!cancelled) m.startLegacy();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Background />
      <Sprites />

      <a href="#main" data-skip className="skip-link">
        Skip to content
      </a>
      <div id="scroll-progress" aria-hidden="true"></div>
      <p id="route-announcer" className="sr-only" role="status" aria-live="polite"></p>

      <OpsBar />
      <Header />

      <div className="mx-auto flex w-full max-w-[1600px]">
        <Sidebar />
        <main id="main" tabIndex={-1} className="min-w-0 flex-1 outline-none">
          <ViewSkeleton />
          <Home />
          <HowItWorks />
          <Kits />
          <Documents />
          <Playground />
          <Roi />
          <Blog />
          <Pager />
        </main>
      </div>

      <Footer />
      <Wizard />
      <DocDialog />
      <DocTemplates />
    </>
  );
}
