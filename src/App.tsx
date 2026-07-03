import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/ProjectPage";
import FloatingShapes from "./components/FloatingShapes";
import InteractiveParticles from "./components/InteractiveParticles";
import CommandPalette from "./components/CommandPalette";

function App() {
  useEffect(() => {
    // Reduced-motion users get native scrolling; sections keep their
    // scroll-mt offset so plain anchor jumps still clear the fixed navbar.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        if (href === "#") {
          lenis.scrollTo(0);
          return;
        }
        // Offset accounts for the fixed navbar height
        lenis.scrollTo(href, { offset: -80 });
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <FloatingShapes />
        <InteractiveParticles />
        <CommandPalette />
        <main className="relative z-10 text-text">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/project/:slug" element={<ProjectPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
