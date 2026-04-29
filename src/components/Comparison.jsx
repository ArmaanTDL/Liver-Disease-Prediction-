import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const ComparisonRow = ({ label, oldDesc, newDesc, good, delay }) => {
  return (
    <motion.div 
      className="grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[1.5fr_1fr_1fr] border-b border-teal/10 hover:bg-[#112C4E]/50 transition-colors"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="py-6 px-4 md:px-8 text-white font-medium flex items-center">{label}</div>
      <div className="py-6 px-4 border-l border-teal/10 text-gray-400 flex items-center justify-between text-sm md:text-base">
        {oldDesc} <X size={18} className="text-red-400/50 hidden md:block flex-shrink-0" />
      </div>
      <div className={`py-6 px-4 border-l border-teal/30 flex items-center justify-between text-sm md:text-base font-medium ${good ? 'text-mint' : 'text-teal'}`}>
        {newDesc} <Check size={18} className="text-mint flex-shrink-0 hidden md:block" />
      </div>
    </motion.div>
  );
};

const Comparison = () => {
  const rows = [
    { label: "Models Used", old: "Basic Random Forest / SVM", new: "Voting Ensemble (CB+LGB+XGB)", good: true },
    { label: "Explainability", old: "None (Black Box)", new: "Full SHAP Integration", good: true },
    { label: "Preprocessing", old: "Standard Scaler", new: "Z-Score Outliers + Log Transforms", good: true },
    { label: "Accuracy Average", old: "~ 70 - 75%", new: "93.41%", good: true },
    { label: "Class Imbalance", old: "Ignored (Bias towards Majority)", new: "SMOTE + Class Weights", good: true },
    { label: "Feature Engineering", old: "Raw Data Only", new: "Interaction Terms (e.g. Age_Enzyme)", good: true },
  ];

  return (
    <section id="comparison" className="w-full py-24 bg-transparent relative">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Past vs Ours</h2>
          <p className="text-xl text-gray-400">Why this framework represents a leap forward.</p>
        </div>

        <div className="rounded-2xl border border-teal/20 overflow-hidden bg-[#0A2342] shadow-2xl">
          
          {/* Header */}
          <div className="grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[1.5fr_1fr_1fr] border-b border-teal/30 bg-[#112C4E]">
            <div className="py-5 px-4 md:px-8 text-gray-400 uppercase tracking-widest text-xs font-bold">Comparison Area</div>
            <div className="py-5 px-4 border-l border-teal/10 text-gray-500 uppercase tracking-widest text-xs font-bold bg-[#0A2342]/50">Existing Systems</div>
            <div className="py-5 px-4 border-l border-teal/30 text-mint uppercase tracking-widest text-xs font-bold shadow-[inset_0_-2px_0_rgba(2,195,154,1)]">Our System</div>
          </div>

          {/* Rows */}
          <div className="relative">
            {/* The glowing border overlay for 'Our System' column */}
            <div className="absolute top-0 right-0 bottom-0 w-[33.33%] border-l-2 border-r-2 border-mint/20 shadow-[0_0_30px_rgba(2,195,154,0.05)] pointer-events-none hidden md:block"></div>
            
            {rows.map((row, i) => (
              <ComparisonRow 
                key={i} 
                label={row.label} 
                oldDesc={row.old} 
                newDesc={row.new} 
                good={row.good}
                delay={i * 0.15} 
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Comparison;
