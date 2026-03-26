import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import WelcomeScreen from './components/WelcomeScreen';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import BackgroundReveal from './components/BackgroundReveal';
import About from './components/About';
import Services from './components/Services';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Navbar from './components/Navbar';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);


  return (
    <>
      <CustomCursor />
      <BackgroundReveal />
      <AnimatePresence>
        {showWelcome && (
          <WelcomeScreen onEnter={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <main className="w-full h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
          <Navbar />
          <Hero />
          <About />
          <Services />
          <Experience />
          <Projects />
          <Certificates />
          <TechStack />
          <Contact />
        </main>
      )}
    </>
  );
}

export default App;
