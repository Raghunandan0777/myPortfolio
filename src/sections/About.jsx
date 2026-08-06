/* ========================================
   About Section — Interactive Developer Profile
   Professional image, identity tags, animated stats,
   bio with text reveal, resume download
   ======================================== */

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Download, CheckCircle } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import MagneticButton from '../components/ui/MagneticButton';
import personalInfo from '../data/personal';

gsap.registerPlugin(ScrollTrigger);

// Animated counter component
const AnimatedStat = ({ value, suffix, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * value));
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      },
    });
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl md:text-4xl font-bold text-gradient">
        {count}{suffix}
      </div>
      <div className="text-sm text-text-secondary mt-1">{label}</div>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0, x: -60 },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Content stagger
      const contentItems = contentRef.current?.querySelectorAll('.about-animate');
      if (contentItems) {
        gsap.fromTo(
          contentItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        <SectionHeading
          label="About Me"
          title="Developer. Builder. Creator."
          subtitle="I turn complex problems into elegant, scalable solutions."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Image */}
          <div ref={imageRef} className="relative group" style={{ opacity: 0 }}>
            {/* Glow frame */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden glass p-1.5">
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.name}
                className="w-full aspect-[4/5] object-cover rounded-xl"
                loading="lazy"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-bg/60 via-transparent to-transparent" />

              {/* Floating badges on image */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                <div className="glass px-3 py-1.5 rounded-lg text-xs font-medium text-white flex items-center gap-1.5">
                  <MapPin size={12} className="text-primary" />
                  {personalInfo.location}
                </div>
                <div className="glass px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle size={12} />
                  {personalInfo.availability}
                </div>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div ref={contentRef} className="space-y-6">
            {/* Identity Tags */}
            <div className="about-animate flex flex-wrap gap-2">
              {personalInfo.identityTags.map((tag, i) => (
                <span
                  key={i}
                  className="glass px-4 py-2 rounded-xl text-sm font-medium text-white hover:bg-glass-hover transition-all duration-300 hover:shadow-glow-sm cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Bio */}
            <div className="about-animate space-y-4">
              <p className="text-text-secondary leading-relaxed text-base md:text-lg">
                {personalInfo.bio}
              </p>
              <p className="text-text leading-relaxed text-base md:text-lg font-medium">
                {personalInfo.bioHighlight}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="about-animate grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
              {personalInfo.stats.map((stat, i) => (
                <div key={i} className="glass rounded-xl p-4 card-hover">
                  <AnimatedStat
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                  />
                </div>
              ))}
            </div>

            {/* Resume Button */}
            <div className="about-animate">
              <MagneticButton
                variant="primary"
                href={personalInfo.resumeUrl}
                target="_blank"
              >
                <Download size={18} />
                Download Resume
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
