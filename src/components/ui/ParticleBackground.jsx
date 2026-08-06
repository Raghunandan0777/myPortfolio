/* ========================================
   Particle Background — Canvas-based animated particles
   Gradient mesh + floating orbs + connecting lines
   Subtle parallax response to mouse movement
   Performance-optimized with requestAnimationFrame
   ======================================== */

import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let mouseX = 0;
    let mouseY = 0;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking for parallax
    const handleMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouse);

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? '59, 130, 246' : '6, 182, 212';
      }

      update() {
        this.x += this.speedX + mouseX * 0.5;
        this.y += this.speedY + mouseY * 0.5;

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create particles
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    const particles = Array.from({ length: particleCount }, () => new Particle());

    // Floating orb class — larger, blurry gradient orbs
    class Orb {
      constructor(color, size, speed) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = size;
        this.color = color;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = speed;
        this.amplitude = Math.random() * 100 + 50;
        this.baseX = this.x;
        this.baseY = this.y;
      }

      update(time) {
        this.x = this.baseX + Math.cos(this.angle + time * this.speed) * this.amplitude + mouseX * 20;
        this.y = this.baseY + Math.sin(this.angle + time * this.speed * 0.7) * this.amplitude + mouseY * 20;
      }

      draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    const orbs = [
      new Orb('rgba(59, 130, 246, 0.06)', 200, 0.0003),
      new Orb('rgba(6, 182, 212, 0.05)', 180, 0.0004),
      new Orb('rgba(59, 130, 246, 0.04)', 250, 0.0002),
    ];

    // Draw connecting lines between nearby particles
    const drawConnections = () => {
      const maxDist = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    let time = 0;
    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw orbs first (background)
      orbs.forEach(orb => {
        orb.update(time);
        orb.draw();
      });

      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw connections
      drawConnections();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleBackground;
