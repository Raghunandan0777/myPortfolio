/* ========================================
   Contact Section — Large Glass Contact Section
   Left: heading, description, social icons
   Right: contact form with glass inputs
   ======================================== */

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Github, Linkedin, Mail, Send, MapPin,
  Download, ArrowUpRight, Phone,
} from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import MagneticButton from '../components/ui/MagneticButton';
import personalInfo from '../data/personal';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '', email: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left content
      gsap.fromTo(
        contentRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Right form
      gsap.fromTo(
        formRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construct mailto link as fallback
    const mailtoLink = `mailto:${personalInfo.social.email}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
    window.location.href = mailtoLink;

    setTimeout(() => setIsSubmitting(false), 1000);
  };

  const socialLinks = [
    {
      icon: Github,
      href: personalInfo.social.github,
      label: 'GitHub',
      handle: '@Raghunandan0777',
    },
    {
      icon: Linkedin,
      href: personalInfo.social.linkedin,
      label: 'LinkedIn',
      handle: 'raghunandanshah',
    },
    {
      icon: Mail,
      href: `mailto:${personalInfo.social.email}`,
      label: 'Email',
      handle: personalInfo.social.email,
    },
    {
      icon: Phone,
      href: `tel:${personalInfo.phone}`,
      label: 'Phone',
      handle: personalInfo.phone,
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        <SectionHeading
          label="Get In Touch"
          title="Let's Work Together"
          subtitle="Have a project in mind or just want to chat? I'd love to hear from you."
        />

        <div className="glass rounded-3xl p-6 md:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left — Info */}
            <div ref={contentRef} className="space-y-8" style={{ opacity: 0 }}>
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                  Let's create something<br />
                  <span className="text-gradient">extraordinary</span> together.
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Whether you need a full-stack web application, AI integration, or a stunning frontend — I'm here to help bring your vision to life.
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.label !== 'Email' && social.label !== 'Phone' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-glass-hover transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center group-hover:shadow-glow-sm transition-all duration-300">
                      <social.icon size={18} className="text-text-secondary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{social.label}</div>
                      <div className="text-xs text-text-muted">{social.handle}</div>
                    </div>
                    <ArrowUpRight size={16} className="ml-auto text-text-muted group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>

              {/* Resume CTA */}
              <div className="pt-4">
                <MagneticButton
                  variant="secondary"
                  href={personalInfo.resumeUrl}
                  target="_blank"
                >
                  <Download size={18} />
                  Download Resume
                </MagneticButton>
              </div>
            </div>

            {/* Right — Form */}
            <div ref={formRef} style={{ opacity: 0 }}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3.5 rounded-xl bg-glass border border-glass-border text-white placeholder-text-muted focus:outline-none focus:border-primary/50 focus:shadow-glow-sm transition-all duration-300 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-glass border border-glass-border text-white placeholder-text-muted focus:outline-none focus:border-primary/50 focus:shadow-glow-sm transition-all duration-300 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3.5 rounded-xl bg-glass border border-glass-border text-white placeholder-text-muted focus:outline-none focus:border-primary/50 focus:shadow-glow-sm transition-all duration-300 text-sm resize-none"
                  />
                </div>

                <MagneticButton
                  variant="primary"
                  onClick={handleSubmit}
                  className="w-full justify-center"
                >
                  <Send size={18} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </MagneticButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
