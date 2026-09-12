import React, { useState, useEffect } from 'react';
import { Flame, ChevronRight, X, ChevronLeft, Store } from 'lucide-react';
import { motion } from 'motion/react';
import { NOTICE_ALERTS } from '../data/servicesData';

interface NoticeTickerProps {
  onQuickApply: (noticeTitle: string) => void;
}

export const NoticeTicker: React.FC<NoticeTickerProps> = ({ onQuickApply }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [closed, setClosed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (closed || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % NOTICE_ALERTS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [closed, isPaused]);

  if (closed) return null;

  const currentNotice = NOTICE_ALERTS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % NOTICE_ALERTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + NOTICE_ALERTS.length) % NOTICE_ALERTS.length);
  };

  return (
    <div
      id="urgent-notice-ticker"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-[#FFFDF0] border-b border-[#FDE68A] text-[#78350F] py-2 px-3 sm:px-6 transition-colors relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Urgent tag & Animated Notice Text */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <motion.span
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#FF4500] text-white tracking-wide uppercase shrink-0 shadow-xs"
          >
            <Flame className="w-3.5 h-3.5 fill-white" />
            <span>LATEST NOTICE</span>
          </motion.span>

          {/* Animated Notice Text */}
          <div className="flex-1 min-w-0 h-6 flex items-center overflow-hidden">
            <motion.div
              key={currentNotice.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2 truncate"
            >
              <span className="font-extrabold text-[#0F172A] text-xs sm:text-sm truncate">
                {currentNotice.title}
              </span>
              <span className="hidden md:inline-block text-[11px] font-black text-[#C2410C] bg-[#FFEDD5] px-2 py-0.5 rounded shrink-0">
                {currentNotice.date}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Action button & ticker controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => onQuickApply(currentNotice.title)}
            className="inline-flex items-center gap-1 font-extrabold text-xs text-rose-700 bg-white hover:bg-rose-50 px-3 py-1 rounded-lg border border-rose-300 shadow-2xs cursor-pointer transition-colors"
            title="Visit our shop counter in Belda"
          >
            <Store className="w-3.5 h-3.5 text-rose-600" />
            <span>Visit Shop</span>
            <ChevronRight className="w-3.5 h-3.5 text-rose-400" />
          </button>

          <div className="flex items-center gap-1.5 text-xs font-bold text-[#78350F]">
            <button
              type="button"
              onClick={handlePrev}
              title="Previous Notice"
              className="p-1 text-[#78350F] hover:text-black rounded hover:bg-amber-100/60 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-extrabold tracking-tight px-0.5">
              {currentIndex + 1}/{NOTICE_ALERTS.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              title="Next Notice"
              className="p-1 text-[#78350F] hover:text-black rounded hover:bg-amber-100/60 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setClosed(true)}
            className="p-1 text-[#B45309] hover:text-red-700 rounded cursor-pointer ml-1"
            aria-label="Dismiss notice bar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
