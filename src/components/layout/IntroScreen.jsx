/* ========================================
   IntroScreen — Full-Screen Cinematic Intro Landing
   Plays full-screen video with letter-by-letter text animation
   Blocks all scrolling until video finishes or user skips
   Only plays once per browser session (sessionStorage)
   ======================================== */

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkipForward, Sparkles, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';

const words = [
  "Raghunandan".split(""),
  "Shah".split("")
];

const IntroScreen = ({ onComplete }) => {
  const [showSkip, setShowSkip] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  // Lock scroll during intro
  useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const preventKeyScroll = (e) => {
      const keys = ['Space', 'PageUp', 'PageDown', 'End', 'Home', 'ArrowUp', 'ArrowDown'];
      if (keys.includes(e.code) || keys.includes(e.key)) {
        e.preventDefault();
        return false;
      }
    };

    // Lock body and html
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeyScroll, { passive: false });

    // Show skip button after 2 seconds
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 2000);

    // Auto finish after 7.5 seconds if video doesn't trigger ended
    const autoFinishTimer = setTimeout(() => {
      handleComplete();
    }, 7500);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeyScroll);
      clearTimeout(skipTimer);
      clearTimeout(autoFinishTimer);
    };
  }, []);

  const handleComplete = () => {
    if (isExiting) return;
    setIsExiting(true);

    // Animate out container using GSAP for buttery smooth fade & scale
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.9,
        ease: 'power3.inOut',
        onComplete: () => {
          sessionStorage.setItem('hasSeenIntro', 'true');
          // Unlock body overflow
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
          document.body.style.touchAction = '';
          if (onComplete) onComplete();
        },
      });
    } else {
      sessionStorage.setItem('hasSeenIntro', 'true');
      if (onComplete) onComplete();
    }
  };

  // Letter animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)', scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-bg flex items-center justify-center overflow-hidden select-none"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          playsInline
          onEnded={handleComplete}
          className="w-full h-full object-cover scale-105"
        >
          <source src="/Script_Recommended_1.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/50 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-bg/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,8,22,0.8)_100%)]" />

        {/* Subtle Blue Glow Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      </div>

      {/* Intro Text Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        {/* Futuristic Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 text-xs font-mono tracking-widest text-primary-light uppercase mb-8 shadow-glow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <Sparkles size={14} className="text-accent" />
          Initializing Developer OS
        </motion.div>

        {/* Letter-by-letter Animated Name grouped by words */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 flex flex-wrap justify-center items-center"
        >
          {words.map((word, wIdx) => (
            <span key={wIdx} className="inline-flex whitespace-nowrap mx-2 sm:mx-4">
              {word.map((letter, lIdx) => (
                <motion.span
                  key={lIdx}
                  variants={letterVariants}
                  className="inline-block text-gradient"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        {/* Subtitle Line 1: Role */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: 'easeOut' }}
          className="text-lg sm:text-2xl md:text-3xl font-display font-medium text-text-secondary mb-3 tracking-wide"
        >
          Full Stack MERN Developer
        </motion.div>

        {/* Subtitle Line 2: Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: 'easeOut' }}
          className="text-sm sm:text-lg text-accent font-mono tracking-wider flex items-center justify-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Building AI-Powered Products
        </motion.div>
      </div>

      {/* Bottom Controls: Sound Toggle + Skip Intro */}
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100000] flex items-center gap-3"
          >
            {/* Sound Toggle Button */}
            <button
              onClick={toggleSound}
              className="glass px-3.5 py-2.5 rounded-full text-xs font-mono tracking-wider text-text-secondary hover:text-white hover:bg-glass-hover hover:border-primary/40 transition-all duration-300 flex items-center gap-2 shadow-glass group border border-glass-border"
              title={isMuted ? "Enable Audio" : "Mute Audio"}
            >
              {isMuted ? (
                <>
                  <VolumeX size={14} className="text-accent" />
                  <span>SOUND OFF</span>
                </>
              ) : (
                <>
                  <Volume2 size={14} className="text-primary animate-pulse" />
                  <span className="text-primary-light">SOUND ON</span>
                </>
              )}
            </button>

            {/* Skip Intro Button */}
            {showSkip && (
              <button
                onClick={handleComplete}
                className="glass px-4 py-2.5 rounded-full text-xs font-mono tracking-wider text-text-secondary hover:text-white hover:bg-glass-hover hover:border-primary/40 transition-all duration-300 flex items-center gap-2 shadow-glass group border border-glass-border"
              >
                <span>SKIP INTRO</span>
                <SkipForward size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroScreen;
