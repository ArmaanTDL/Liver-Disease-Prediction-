import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const slides = [
  { id: 1, title: 'Title', image: '/slides/1.png' },
  { id: 2, title: 'Problem', image: '/slides/2.png' },
  { id: 3, title: 'Methodology', image: '/slides/3.png' },
  { id: 4, title: 'Results', image: '/slides/4.png' },
  { id: 5, title: 'Features', image: '/slides/5.png' },
  { id: 6, title: 'Comparison', image: '/slides/6.png' },
  { id: 7, title: 'Tools', image: '/slides/7.png' },
  { id: 8, title: 'Future', image: '/slides/8.png' },
];

const SlideViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="presentation" className="w-full py-24 bg-[#0A2342] border-t border-white/5">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Slide Deck</h2>
        <p className="text-xl text-gray-400 mb-12">Interactive presentation material for the project expo.</p>

        {/* Viewer */}
        <div className="relative group bg-[#112C4E] rounded-xl border border-teal/20 p-2 md:p-4 shadow-2xl aspect-video overflow-hidden">
          
          <div className="absolute inset-0 z-10 flex items-center justify-between p-4 pointer-events-none">
            <button 
              onClick={prevSlide}
              className="pointer-events-auto p-2 md:p-3 rounded-full bg-navy/50 backdrop-blur border border-white/10 text-white hover:bg-teal hover:border-teal transition-all transform -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="pointer-events-auto p-2 md:p-3 rounded-full bg-navy/50 backdrop-blur border border-white/10 text-white hover:bg-teal hover:border-teal transition-all transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="relative w-full aspect-[4/3] md:aspect-video bg-[#f0f4f8] rounded-lg overflow-hidden flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]">
             <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={slides[currentIndex].image}
                  alt={`Slide ${currentIndex + 1}`}
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => {
                      // Fallback if image not found
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                  }}
                />
                
                {/* Fallback Placeholder telling user to add images */}
                <div className="absolute inset-0 hidden flex-col items-center justify-center bg-[#091a33] text-gray-500 border-2 border-dashed border-teal/20 m-4 rounded-lg">
                    <Maximize2 size={48} className="mb-4 opacity-50 text-teal" />
                    <p className="font-heading text-xl text-white mb-2">{slides[currentIndex].title} Slide Placeholder</p>
                    <p className="text-sm">Please add <code className="text-mint bg-navy px-2 py-1 rounded">/public{slides[currentIndex].image}</code></p>
                </div>
             </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
            {slides.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full h-2 ${idx === currentIndex ? 'w-8 bg-mint' : 'w-2 bg-white/30 hover:bg-white/60'}`}
              />
            ))}
          </div>

        </div>

        {/* Text Navigation */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-4 text-sm md:text-base">
          {slides.map((slide, idx) => (
            <React.Fragment key={slide.id}>
              <button 
                onClick={() => setCurrentIndex(idx)}
                className={`font-medium transition-colors ${idx === currentIndex ? 'text-mint' : 'text-gray-400 hover:text-white'}`}
              >
                {slide.title}
              </button>
              {idx < slides.length - 1 && <span className="text-gray-600">·</span>}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SlideViewer;
