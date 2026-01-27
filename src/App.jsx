/* ========================================
   Main App Component
   Assembles all sections with smooth scrolling
   Includes Navbar and Footer layout
   ======================================== */

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

/**
 * Main App Component
 * 
 * This is the root component that assembles the entire portfolio.
 * The portfolio consists of:
 * - Fixed Navbar for navigation
 * - Hero section with 3D liquid background
 * - About section with bio and tech stack
 * - Projects section with filterable cards
 * - Skills section with animated progress bars
 * - Experience timeline section
 * - Contact section with form
 * - Footer with social links
 */
function App() {
  return (
    <div className="relative min-h-screen bg-dark-900 text-white overflow-x-hidden">
      {/* 
        Navigation Bar
        Fixed position, glassmorphism effect on scroll
        Includes smooth scrolling to sections
      */}
      <Navbar />

      {/* 
        Main Content
        All portfolio sections stacked vertically
        Each section has its own scroll animations
      */}
      <main>
        {/* Hero - Full screen with 3D liquid animation */}
        <Hero />

        {/* About Me - Bio, tech stack, stats */}
        <About />

        {/* Projects - Filterable project cards with 3D effects */}
        <Projects />

        {/* Skills - Animated progress bars by category */}
        <Skills />

        {/* Experience - Animated vertical timeline */}
        <Experience />

        {/* Contact - Form and social links */}
        <Contact />
      </main>

      {/* 
        Footer
        Social links and copyright
      */}
      <Footer />
    </div>
  );
}

export default App;
