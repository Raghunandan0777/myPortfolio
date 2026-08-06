/* ========================================
   Footer — Minimal, Elegant
   Name + copyright, social icons, back to top
   ======================================== */

import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react';
import personalInfo from '../../data/personal';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: personalInfo.social.github, label: 'GitHub' },
    { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${personalInfo.social.email}`, label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-glass-border">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="section-container py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left — Name + Copyright */}
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-lg text-gradient mb-1">
              {personalInfo.name}
            </p>
            <p className="text-text-muted text-sm flex items-center gap-1 justify-center md:justify-start">
              Made with <Heart size={14} className="text-red-500 fill-red-500" /> © {new Date().getFullYear()}
            </p>
          </div>

          {/* Center — Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-text-secondary hover:text-white hover:bg-glass-hover transition-all duration-300 hover:shadow-glow-sm"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          {/* Right — Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors duration-300"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-lg glass flex items-center justify-center group-hover:bg-glass-hover transition-all duration-300">
              <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
