import React from 'react';

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="w-full bg-[#061224] py-8 border-t-[3px] border-teal">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-mint shadow-[0_0_10px_rgba(2,195,154,0.8)]"></div>
            <span className="font-heading font-bold text-lg">Project Expo 2025</span>
        </div>

        <div className="text-gray-400 text-sm text-center">
          Built for Project Expo · Chandigarh University · 2025
        </div>

        <button 
          onClick={scrollToTop}
          className="text-teal hover:text-mint transition-colors text-sm font-medium uppercase tracking-wider"
        >
          Back to Top
        </button>

      </div>
    </footer>
  );
};

export default Footer;
