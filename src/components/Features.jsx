import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FeatureCard = ({ title, score, fullName, desc, delay }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div 
      className="bg-[#112C4E] rounded-2xl border border-teal/20 overflow-hidden hover:border-teal/50 hover:shadow-[0_10px_30px_rgba(2,128,144,0.2)] transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="p-6">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-2xl font-heading font-bold text-white">{title}</h3>
          <div className="text-mint font-mono font-bold">SHAP: {score}</div>
        </div>
        
        {/* Progress Bar styled as SHAP indicator */}
        <div className="w-full bg-navy h-2 rounded-full mb-6 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-teal to-mint rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${(score / 0.6) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
          />
        </div>

        <button 
          onClick={() => setExpanded(!expanded)}
          className="w-full py-2 flex items-center justify-between text-gray-300 hover:text-white transition-colors"
        >
          <span className="text-sm font-medium uppercase tracking-wide">What is this?</span>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={18} />
          </motion.div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div 
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-teal/20">
                <p className="text-teal text-sm font-bold mb-2">{fullName}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="w-full py-24 bg-transparent relative border-y border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="mb-16 md:flex justify-between items-end">
          <div className="md:w-2/3 border-l-4 border-mint pl-6">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Key Diagnostic Features</h2>
            <p className="text-xl text-gray-400">
              Opening the black box: SHAP values explain *why* the model makes its decisions.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            title="AG_ratio_calc" 
            score={0.52} 
            fullName="Albumin-Globulin Ratio"
            desc="Calculated by dividing Albumin by Globulin. A low ratio is a strong indicator of chronic liver disease, cirrhosis, or kidney syndrome. The model heavily relies on this synthesized feature over raw individual protein counts."
            delay={0.1}
          />
           <FeatureCard 
            title="ALK_log" 
            score={0.44} 
            fullName="Log of Alkaline Phosphatase"
            desc="Alkaline Phosphatase is an enzyme related to the bile ducts. It was highly right-skewed in the raw data. Taking the log transformation stabilized the variance, making it the second most critical predictive feature."
            delay={0.3}
          />
           <FeatureCard 
            title="Age_Enzyme" 
            score={0.36} 
            fullName="Age × Enzyme Interaction"
            desc="A custom engineered feature multiplying the patient's age by their liver enzyme levels. This captures the clinical reality that elevated liver enzymes pose a exponentially higher risk in older demographics."
            delay={0.5}
          />
        </div>

      </div>
    </section>
  );
};

export default Features;
