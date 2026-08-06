/* ========================================
   Navbar — Floating Glass Navigation
   Blur background, animated active indicator
   Mobile: iOS-style bottom dock navigation
   ======================================== */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  // Scroll detection for background + active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Find active section
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        ref={navRef}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 hidden md:flex
          ${isScrolled
            ? 'glass-strong shadow-glass rounded-2xl px-2 py-2'
            : 'bg-transparent px-4 py-4'
          }`}
        style={{ opacity: 0 }}
      >
        <div className="flex items-center gap-1">
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="mr-4 px-3 py-1.5 font-display font-bold text-lg text-gradient"
          >
            RS
          </button>

          {/* Nav Links */}
          <div className="flex items-center gap-0.5 relative">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-300 ${
                  activeSection === link.id
                    ? 'text-white'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {/* Active pill background */}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-xl bg-glass-light"
                    style={{ borderRadius: 12 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Dock Navigation */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="glass-strong rounded-2xl p-2 shadow-glass mb-2"
            >
              <div className="flex flex-wrap items-center justify-center gap-1 max-w-[320px]">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`px-3 py-2 text-xs font-medium rounded-xl transition-all duration-300 ${
                      activeSection === link.id
                        ? 'bg-glass-light text-white'
                        : 'text-text-secondary hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="glass-strong rounded-2xl p-3.5 shadow-glass mx-auto flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
        >
          {mobileOpen ? (
            <X size={22} className="text-white" />
          ) : (
            <Menu size={22} className="text-white" />
          )}
        </motion.button>
      </div>
    </>
  );
};

export default Navbar;
