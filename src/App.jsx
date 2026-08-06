/* ========================================
   App — Root Component
   Assembles all sections with Lenis smooth scrolling
   Custom cursor, particle background, intro overlay, all sections
   ======================================== */

import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Layout
import IntroScreen from './components/layout/IntroScreen';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// UI
import CustomCursor from './components/ui/CustomCursor';
import ParticleBackground from './components/ui/ParticleBackground';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Timeline from './sections/Timeline';
import Services from './sections/Services';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef(null);
  const [showIntro, setShowIntro] = useState(() => {
    // Check if intro has already been shown in this browser session
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hasSeenIntro') !== 'true';
    }
    return true;
  });

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Stop Lenis while intro is active
    if (showIntro) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [showIntro]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    if (lenisRef.current) {
      lenisRef.current.start();
    }
    // Refresh ScrollTrigger to recalculate layout positions after intro hides
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <div className="relative min-h-screen bg-bg text-text overflow-x-hidden noise-overlay">
      {/* Intro Landing Experience */}
      {showIntro && <IntroScreen onComplete={handleIntroComplete} />}

      {/* Custom gradient cursor */}
      <CustomCursor />

      {/* Animated particle background */}
      <ParticleBackground />

      {/* Floating Glass Navigation — Only shown after intro finishes */}
      {!showIntro && <Navbar />}

      {/* Main Content */}
      <main className="relative z-10">
        <Hero isIntroActive={showIntro} />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Services />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      {!showIntro && <Footer />}
    </div>
  );
}

export default App;
