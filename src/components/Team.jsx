import React from 'react';
import { motion } from 'framer-motion';

const members = [
  { name: 'Om Singh', initials: 'OS' },
  { name: 'Armaan', initials: 'AR' },
  { name: 'Nthabiseng Juliet Lefielo', initials: 'NL' },
];

const Team = () => {
  return (
    <section id="team" className="w-full py-24 bg-[#0A2342] border-t border-white/5 relative overflow-hidden">
      
      {/* Decorative large circle */}
      <div className="absolute top-0 right-0 -m-32 w-96 h-96 bg-teal/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">The Team</h2>
          <p className="text-xl text-gray-400">Researchers & Developers</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {members.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center p-8 bg-[#112C4E]/60 backdrop-blur rounded-3xl border border-teal/10 hover:border-mint/30 transition-colors group"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal to-[#112C4E] p-1 mb-6 group-hover:shadow-[0_0_20px_rgba(2,195,154,0.4)] transition-all">
                <div className="w-full h-full rounded-full bg-[#091a33] flex items-center justify-center text-2xl font-bold font-heading text-mint">
                  {member.initials}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1 text-center">{member.name}</h3>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto rounded-2xl bg-gradient-to-r from-[#112C4E] to-[#0A2342] border border-teal/20 p-8 flex flex-col md:flex-row items-center justify-between shadow-xl"
        >
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="text-sm text-teal uppercase tracking-widest font-bold mb-1">UNDER THE GUIDANCE OF</div>
            <div className="text-2xl font-heading font-bold">Dr. Vijay Bhardwaj</div>
          </div>
          <div className="h-12 w-px bg-teal/20 hidden md:block"></div>
          <div className="text-center md:text-right">
            <div className="text-lg font-medium">Chandigarh University</div>
            <div className="text-gray-400">Mohali, India</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Team;
