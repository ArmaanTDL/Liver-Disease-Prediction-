import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const StatCounter = ({ end, label, suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // ms
    const increment = end / (duration / 16); 
    
    const animate = () => {
      start += increment;
      if (start < end) {
        setCount(start);
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    const timeout = setTimeout(() => {
        requestAnimationFrame(animate);
    }, 500);

    return () => clearTimeout(timeout);
  }, [end]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-heading font-bold text-mint">
        {count.toFixed(decimals)}{suffix}
      </div>
      <div className="text-sm md:text-base text-gray-300 mt-2 uppercase tracking-wider font-medium">{label}</div>
    </div>
  );
};

const Hero = () => {
  const titleLetters = "Liver Disease Prediction".split('');

  const handleScroll = (id) => {
      const el = document.getElementById(id);
      if(el) {
          window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
      }
  }

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-transparent">
      <div className="z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 tracking-tight flex flex-wrap justify-center gap-x-4 gap-y-2">
          {"Liver Disease Prediction".split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="whitespace-nowrap inline-flex">
              {word.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (wordIndex * 6 + i) * 0.05, duration: 0.5, type: 'spring' }}
                  style={{ display: 'inline-block' }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p 
          className="text-xl md:text-2xl text-gray-300 font-body mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          A Robust & Explainable Ensemble ML Framework
        </motion.p>

        <motion.div 
          className="flex flex-wrap justify-center gap-12 md:gap-24 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <StatCounter end={93.41} label="Accuracy" suffix="%" decimals={2} />
          <StatCounter end={13} label="Models" suffix="+" />
          <StatCounter end={583} label="Records" />
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <button onClick={() => handleScroll('presentation')} className="px-8 py-4 bg-teal hover:bg-teal/80 text-white rounded-full font-medium transition-all shadow-[0_0_20px_rgba(2,128,144,0.4)] hover:shadow-[0_0_30px_rgba(2,128,144,0.6)] transform hover:-translate-y-1">
            View Presentation
          </button>
          <button onClick={() => handleScroll('problem')} className="px-8 py-4 bg-transparent border border-mint/50 hover:bg-mint/10 text-mint rounded-full font-medium transition-all transform hover:-translate-y-1">
            Explore Research
          </button>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-8 text-mint flex flex-col items-center cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        onClick={() => handleScroll('problem')}
      >
        <div className="text-sm mb-2 opacity-70 tracking-widest uppercase">Scroll</div>
        <ArrowDown size={24} className="opacity-70" />
      </motion.div>
    </section>
  );
};

export default Hero;
