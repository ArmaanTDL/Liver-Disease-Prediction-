import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Filter, SlidersHorizontal, Cpu, Settings, Layers, Eye } from 'lucide-react';

const steps = [
  { id: 1, title: 'Data Collection', icon: Database, desc: '583 Indian liver patient records with 10 variables (Age, Gender, TB, DB, Alkphos, Sgpt, Sgot, TP, ALB, A/G Ratio).' },
  { id: 2, title: 'Preprocessing', icon: Filter, desc: 'Handling missing values, outlier detection using Z-score, and label encoding for categorical variables.' },
  { id: 3, title: 'Feature Engineering', icon: SlidersHorizontal, desc: 'Creating interaction terms (Age_Enzyme) and log transformations of skewed clinical enzymes.' },
  { id: 4, title: 'Model Training', icon: Cpu, desc: 'Training baseline models including Logistic Regression, Random Forest, Extra Trees, XGBoost, LightGBM, and CatBoost.' },
  { id: 5, title: 'Tuning', icon: Settings, desc: 'Extensive hyperparameter optimization using GridSearchCV / RandomizedSearchCV for tree-based models.' },
  { id: 6, title: 'Ensemble', icon: Layers, desc: 'Building a powerful Voting/Stacking ensemble (CB+LGBM+XGB+ET) to maximize accuracy and generalization.' },
  { id: 7, title: 'Explainability', icon: Eye, desc: 'Applying SHAP (SHapley Additive exPlanations) values to interepret feature importance individually and globally.' },
];

const Methodology = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section id="methodology" className="w-full py-24 bg-transparent relative" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Methodology Pipeline</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">A rigorous systematic approach from raw data to a highly accurate clinical tool.</p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line for Mobile / Desktop */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-[#112C4E] rounded-full transform md:-translate-x-1/2"></div>
          
          {/* Animated Line progressing with scroll */}
          <motion.div 
            className="absolute left-[28px] md:left-1/2 top-0 w-1 bg-mint rounded-full transform md:-translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          ></motion.div>

          <div className="flex flex-col gap-12 pt-8">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id} 
                className={`relative flex flex-col md:flex-row items-start md:items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
              >
                
                {/* Content */}
                <div className="w-full md:w-[45%] pl-20 md:pl-0 md:px-8 group">
                  <div className={`p-6 rounded-2xl bg-[#112C4E] border border-teal/20 hover:border-mint transition-all duration-300 hover:shadow-[0_0_25px_rgba(2,195,154,0.15)] hover:-translate-y-1 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <h3 className="text-2xl font-heading font-bold mb-3 text-white flex items-center gap-3 justify-start md:justify-[inherit]">
                      <span className="text-mint md:hidden">0{step.id}</span>
                      {step.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-200 transition-colors">{step.desc}</p>
                  </div>
                </div>

                {/* Node */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 mt-4 md:mt-0 w-14 h-14 rounded-full bg-[#0A2342] border-4 border-[#112C4E] shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center z-10">
                   <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-white">
                      <step.icon size={20} />
                   </div>
                </div>

                {/* Number / Empty space */}
                <div className={`hidden md:flex w-[45%] ${index % 2 === 0 ? 'justify-end pr-8' : 'justify-start pl-8'}`}>
                  <span className="text-7xl font-heading font-bold text-white/[0.05]">- 0{step.id} -</span>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Methodology;
