import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AlertCircle, Stethoscope, Lightbulb } from 'lucide-react';

const FlipCard = ({ title, frontIcon: Icon, frontText, backContent, delay }) => {
  return (
    <motion.div 
      className="group perspective w-full h-[300px]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-700 ease-in-out">
        {/* Front */}
        <div className="absolute backface-hidden w-full h-full bg-[#112C4E] rounded-2xl border border-teal/20 p-8 flex flex-col items-center justify-center text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center mb-6 text-mint">
            <Icon size={32} />
          </div>
          <h3 className="text-2xl font-heading font-bold mb-3">{title}</h3>
          <p className="text-gray-400 font-medium">{frontText}</p>
        </div>
        
        {/* Back */}
        <div className="absolute my-rotate-y-180 backface-hidden w-full h-full bg-gradient-to-br from-teal/90 to-[#112C4E]/90 backdrop-blur-sm rounded-2xl border border-mint/40 p-8 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(2,195,154,0.2)]">
          <p className="text-white font-body leading-relaxed text-lg">
            {backContent}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Problem = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="problem" className="relative w-full min-h-screen py-24 flex items-center bg-transparent overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(2,128,144,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(2,128,144,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 z-0"></div>

      <div className="container mx-auto px-6 md:px-12 z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div 
            ref={ref}
            className="lg:w-1/3 text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 rounded-full bg-teal/20 text-mint font-semibold uppercase tracking-wider text-sm mb-6 border border-teal/30">
              The Challenge
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Why Liver<br />Disease?
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Liver diseases cause approximately 2 million deaths globally per year. Early detection is critically hindered by the "silent" nature of the disease and a vast shortage of specialized medical professionals.
            </p>
          </motion.div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <FlipCard 
              title="Silent Disease" 
              frontIcon={AlertCircle}
              frontText="Symptoms appear late"
              backContent="The liver has immense regenerative capacity, meaning symptoms often only manifest when serious, irreversible damage (cirrhosis) has already occurred."
              delay={0.2}
            />
            <FlipCard 
              title="Specialist Gap" 
              frontIcon={Stethoscope}
              frontText="Healthcare accessibility"
              backContent="Developing regions face severe shortages of hepatologists. A delay in specialist consultation drastically reduces patient survival rates."
              delay={0.4}
            />
            <FlipCard 
              title="Our Solution" 
              frontIcon={Lightbulb}
              frontText="AI Driven Prediction"
              backContent="Using standard enzymatic blood test data, our ensemble ML framework identifies at-risk patients accurately and provides highly explainable predictions for clinicians."
              delay={0.6}
            />
          </div>

        </div>
      </div>
      
      {/* Custom CSS for 3D flip since Tailwind doesn't have it built-in */}
      <style dangerouslySetInnerHTML={{__html: `
        .perspective { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .my-rotate-y-180 { transform: rotateY(180deg); }
        .group:hover .group-hover\\:my-rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </section>
  );
};

export default Problem;
