import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bar } from 'react-chartjs-2';
import { Target, TrendingUp, ShieldCheck } from 'lucide-react';

const ModelResults = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  // Chart Setup
  const data = {
    labels: ['Logistic Reg', 'Random Forest', 'Extra Trees', 'CatBoost*', 'CatLGBMXGB*', 'Ensemble'],
    datasets: [
      {
        label: 'Accuracy (%)',
        data: [74.0, 85.3, 87.5, 89.0, 91.2, 93.41],
        backgroundColor: [
          'rgba(17, 44, 78, 0.8)',
          'rgba(2, 128, 144, 0.4)',
          'rgba(2, 128, 144, 0.5)',
          'rgba(2, 128, 144, 0.7)',
          'rgba(2, 128, 144, 0.9)',
          'rgba(2, 195, 154, 1)' // Highlight ensemble
        ],
        borderRadius: 6,
        borderCurve: 'round'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
      delay: (context) => context.dataIndex * 200
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 60,
        max: 100,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: 'rgba(255,255,255,0.5)' }
      },
      x: {
        grid: { display: false },
        ticks: { color: 'rgba(255,255,255,0.7)', font: { size: 11 } }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(10, 35, 66, 0.9)',
        titleColor: '#fff',
        bodyColor: '#02C39A',
        borderColor: 'rgba(2,195,154,0.3)',
        borderWidth: 1,
        padding: 12,
        callbacks: { label: (ctx) => `Accuracy: ${ctx.raw}%` }
      }
    }
  };

  return (
    <section id="results" className="w-full py-24 bg-transparent relative">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
          >
            Model Performance
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Evolution of accuracy across different architectures.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12" ref={ref}>
          
          {/* Chart Section */}
          <motion.div 
            className="lg:w-2/3 h-[400px] md:h-[500px] bg-[#112C4E]/50 rounded-2xl p-6 border border-teal/20 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            {inView && <Bar data={data} options={options} />}
          </motion.div>

          {/* Stat Card */}
          <motion.div 
            className="lg:w-1/3 flex flex-col justify-center gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative group p-8 rounded-3xl bg-gradient-to-br from-[#112C4E] to-[#0A2342] border border-mint/30 shadow-[0_0_20px_rgba(2,195,154,0.15)] overflow-hidden">
              {/* Pulsing ring background */}
              <div className="absolute top-0 right-0 -m-16 w-64 h-64 bg-mint/5 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="absolute top-12 right-12 -m-8 w-32 h-32 bg-mint/10 rounded-full animate-pulse"></div>

              <div className="relative z-10 text-center py-6">
                <div className="text-sm font-semibold tracking-widest text-teal uppercase mb-2">Champion Model</div>
                <div className="text-6xl lg:text-7xl font-heading font-bold text-mint mb-2 drop-shadow-[0_0_10px_rgba(2,195,154,0.5)]">
                  93.41<span className="text-4xl text-teal">%</span>
                </div>
                <div className="text-gray-300 font-medium">Ensemble (CB+LGBM+XGB+ET)</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 rounded-xl bg-[#112C4E] border border-teal/10 flex flex-col gap-2">
                 <Target className="text-teal" size={24}/>
                 <div className="text-2xl font-bold">5-Fold</div>
                 <div className="text-xs text-gray-400 uppercase tracking-wide">Cross-Validation</div>
               </div>
               <div className="p-4 rounded-xl bg-[#112C4E] border border-teal/10 flex flex-col gap-2">
                 <ShieldCheck className="text-teal" size={24}/>
                 <div className="text-2xl font-bold">0.96</div>
                 <div className="text-xs text-gray-400 uppercase tracking-wide">AUC ROC Score</div>
               </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ModelResults;
