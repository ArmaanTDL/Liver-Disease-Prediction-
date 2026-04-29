import React, { useEffect, useState, useRef } from 'react';
import { Play, Pause, Settings2 } from 'lucide-react';

const AutoScrollButton = () => {
    const [isActive, setIsActive] = useState(false);
    const [speedMulti, setSpeedMulti] = useState(5000); // ms per section
    const [showOptions, setShowOptions] = useState(false);
    
    // Store active scrolling frame
    const requestRef = useRef();
    
    useEffect(() => {
        let isCancelled = false;
        if (!isActive) {
            cancelAnimationFrame(requestRef.current);
            return;
        }

        const sections = Array.from(document.querySelectorAll('section'));
        
        let startTimestamp;
        let currentSectionIdx = -1;
        
        // Find current section based on scroll pos
        for (let i = 0; i < sections.length; i++) {
            if (window.scrollY >= sections[i].offsetTop - 100) {
                currentSectionIdx = i;
            }
        }

        const step = (timestamp) => {
            if(isCancelled) return;
            
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = timestamp - startTimestamp;

            if (progress >= speedMulti) {
                // Move to next section
                currentSectionIdx++;
                if (currentSectionIdx >= sections.length) {
                    setIsActive(false); // finish
                    return;
                }
                
                window.scrollTo({
                    top: sections[currentSectionIdx].offsetTop,
                    behavior: 'smooth'
                });
                
                startTimestamp = timestamp;
            }
            requestRef.current = requestAnimationFrame(step);
        };

        requestRef.current = requestAnimationFrame(step);

        return () => {
            isCancelled = true;
            cancelAnimationFrame(requestRef.current);
        };
    }, [isActive, speedMulti]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                setIsActive(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="fixed bottom-8 right-4 sm:right-8 z-50 flex items-center justify-end">
            {/* Speed options panel — hidden on tiny screens when collapsed */}
            <div className={`overflow-hidden transition-all duration-300 flex ${
              showOptions ? 'w-40 sm:w-48 opacity-100 mr-2 sm:mr-4' : 'w-0 opacity-0 mr-0'
            }`}>
                <div className="bg-[#112C4E]/90 backdrop-blur-md rounded-full px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3 border border-teal/30 shadow-lg">
                    <button
                      onClick={() => setSpeedMulti(8000)}
                      className={`text-xs font-medium px-2 py-1 rounded transition-colors min-w-[2.5rem] ${
                        speedMulti === 8000 ? 'bg-teal text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >Slow</button>
                    <button
                      onClick={() => setSpeedMulti(5000)}
                      className={`text-xs font-medium px-2 py-1 rounded transition-colors min-w-[2.5rem] ${
                        speedMulti === 5000 ? 'bg-teal text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >Med</button>
                    <button
                      onClick={() => setSpeedMulti(3000)}
                      className={`text-xs font-medium px-2 py-1 rounded transition-colors min-w-[2.5rem] ${
                        speedMulti === 3000 ? 'bg-teal text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >Fast</button>
                </div>
            </div>

            <div className="flex gap-2">
                {/* Settings gear — hidden on mobile to save space */}
                <button
                    onClick={() => setShowOptions(!showOptions)}
                    className="hidden sm:flex p-3 rounded-full bg-[#112C4E]/80 backdrop-blur-md border border-teal/30 hover:bg-[#112C4E] hover:border-teal text-gray-300 transition-all shadow-[0_0_15px_rgba(2,128,144,0.3)] items-center justify-center"
                    style={{ minWidth: 44, minHeight: 44 }}
                >
                    <Settings2 size={20} />
                </button>

                {/* Main play/pause button */}
                <button
                    onClick={() => setIsActive(!isActive)}
                    style={{ minWidth: 44, minHeight: 44, touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                    className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-full font-medium transition-all shadow-[0_0_15px_rgba(2,195,154,0.3)] border ${
                      isActive
                        ? 'bg-mint/20 border-mint text-mint'
                        : 'bg-teal text-white border-teal/50 hover:bg-teal/80'
                    }`}
                >
                    {isActive ? <Pause size={18} /> : <Play size={18} />}
                    {/* Label: hidden on very small screens */}
                    <span className="hidden xs:inline sm:inline text-sm sm:text-base">
                      {isActive ? 'Pause' : 'Auto Scroll'}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default AutoScrollButton;
