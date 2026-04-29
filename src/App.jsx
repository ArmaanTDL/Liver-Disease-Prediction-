import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Methodology from './components/Methodology';
import ModelResults from './components/ModelResults';
import Features from './components/Features';
import Comparison from './components/Comparison';
import SlideViewer from './components/SlideViewer';
import TechStack from './components/TechStack';
import Team from './components/Team';
import Footer from './components/Footer';
import AutoScrollButton from './components/AutoScrollButton';
import SoundEngine from './components/SoundEngine';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-navy flex-col">
        <div className="w-16 h-16 border-4 border-mint border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_15px_#02C39A]"></div>
        <h1 className="text-2xl font-heading font-medium tracking-wide animate-pulse">Initializing Data Models...</h1>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden w-full m-0 p-0 bg-gradient-to-br from-[#0A2342] via-[#041121] to-[#024b57] bg-[length:400%_400%] animate-gradient">
      <Hero />
      <Problem />
      <Methodology />
      <ModelResults />
      <Features />
      <Comparison />
      <SlideViewer />
      <TechStack />
      <Team />
      <Footer />
      <AutoScrollButton />
      <SoundEngine />
    </div>
  );
}

export default App;
