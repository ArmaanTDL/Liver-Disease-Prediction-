import React from 'react';
import { motion } from 'framer-motion';

const techData = [
  { name: 'Python', color: '#3776AB', icon: '🐍' },
  { name: 'Google Colab', color: '#F9AB00', icon: '☁️' },
  { name: 'XGBoost', color: '#2C92DF', icon: '🚀' },
  { name: 'CatBoost', color: '#FFDE00', icon: '🐈' },
  { name: 'LightGBM', color: '#FF7F00', icon: '⚡' },
  { name: 'Scikit-learn', color: '#F7931E', icon: '🛠️' },
  { name: 'SHAP', color: '#ED1229', icon: '👁️' },
  { name: 'NumPy', color: '#013243', icon: '🔢' },
  { name: 'Pandas', color: '#150458', icon: '🐼' },
  { name: 'Matplotlib', color: '#11557C', icon: '📊' },
];

const TechStack = () => {
  return (
    <section id="tech-stack" className="w-full py-24 bg-[#091a33]">
      <div className="container mx-auto px-6 max-w-6xl text-center">
        
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-16">Powered By</h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {techData.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex items-center gap-3 px-6 py-3 bg-[#112C4E] rounded-full border border-teal/20 shadow-lg cursor-pointer"
            >
              <span className="text-xl drop-shadow-md">{tech.icon}</span>
              <span className="font-heading font-medium text-white">{tech.name}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TechStack;
