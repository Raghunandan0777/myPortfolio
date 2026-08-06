/* ========================================
   Hero Section — Cinematic Video Landing
   Full-screen video background with typewriter effect
   Scroll-triggered video scale-down transition
   ======================================== */

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight, Sparkles, Volume2, VolumeX } from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';
import personalInfo from '../data/personal';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const contentRef = useRef(null);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [linesCompleted, setLinesCompleted] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const typewriterRef = useRef(null);

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

  const lines = personalInfo.typewriterLines;

  // Typewriter effect
  useEffect(() => {
    let timeout;
    const currentFullText = lines[currentLine];

    if (!isDeleting) {
      if (currentText.length < currentFullText.length) {
        timeout = setTimeout(() => {
          setCurrentText(currentFullText.substring(0, currentText.length + 1));
        }, 50 + Math.random() * 30);
      } else {
        // Line complete
        if (currentLine < lines.length - 1) {
          // Wait, then add to completed and move to next
          timeout = setTimeout(() => {
            setLinesCompleted(prev => [...prev, currentFullText]);
            setCurrentText('');
            setCurrentLine(prev => prev + 1);
          }, 1200);
        }
        // Last line stays displayed with cursor
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentLine, isDeleting, lines]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor(prev => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content entrance
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.2,
          delay: 0.3,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-triggered video scale-down
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(videoContainerRef.current, {
        scale: 0.85,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 z-0"
      >
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster=""
        >
          <source src="/Script_Recommended_1.mp4" type="video/mp4" />
        </video>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/60 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/50 via-transparent to-bg/50" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 section-container text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass text-sm font-medium text-primary-light">
          <Sparkles size={16} className="text-primary" />
          Available for new opportunities
        </div>

        {/* Typewriter */}
        <div className="min-h-[200px] md:min-h-[240px] flex flex-col items-center justify-center mb-8">
          {/* Completed lines */}
          {linesCompleted.map((line, i) => (
            <div
              key={i}
              className={`font-display font-bold tracking-tight leading-tight mb-2 ${
                i === 0
                  ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white'
                  : 'text-xl sm:text-2xl md:text-3xl text-text-secondary'
              }`}
            >
              {i === 0 ? line : line}
            </div>
          ))}

          {/* Current typing line */}
          <div
            className={`font-display font-bold tracking-tight leading-tight ${
              currentLine === 0
                ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white'
                : 'text-xl sm:text-2xl md:text-3xl text-text-secondary'
            }`}
          >
            {currentLine === 0 ? (
              <>
                <span>{currentText.split('Raghunandan Shah')[0]}</span>
                {currentText.includes('Raghunandan Shah') && (
                  <span className="text-gradient">Raghunandan Shah</span>
                )}
                {currentText.includes('.') && currentText.includes('Raghunandan Shah') && '.'}
              </>
            ) : (
              <span>{currentText}</span>
            )}
            <span
              className="inline-block w-[3px] h-[1em] ml-1 align-text-bottom"
              style={{
                backgroundColor: showCursor ? '#3B82F6' : 'transparent',
                transition: 'background-color 0.1s',
              }}
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton variant="primary" onClick={scrollToWork}>
            Explore My Work
            <ArrowRight size={18} />
          </MagneticButton>
          <MagneticButton variant="secondary" onClick={scrollToContact}>
            Get In Touch
          </MagneticButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-scroll-indicator">
        <span className="text-xs text-text-muted font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} className="text-text-muted" />
      </div>

      {/* Floating Audio Control Button */}
      <button
        onClick={toggleSound}
        className="absolute bottom-8 right-6 sm:right-8 z-20 glass px-3.5 py-2.5 rounded-full text-xs font-mono tracking-wider text-text-secondary hover:text-white hover:bg-glass-hover hover:border-primary/40 transition-all duration-300 flex items-center gap-2 shadow-glass group border border-glass-border"
        title={isMuted ? "Enable Audio" : "Mute Audio"}
      >
        {isMuted ? (
          <>
            <VolumeX size={14} className="text-accent" />
            <span className="hidden sm:inline">SOUND OFF</span>
          </>
        ) : (
          <>
            <Volume2 size={14} className="text-primary animate-pulse" />
            <span className="text-primary-light hidden sm:inline">SOUND ON</span>
          </>
        )}
      </button>
    </section>
  );
};

export default Hero;
