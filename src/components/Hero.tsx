import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CategoryPill } from './CategoryPill';

const SLIDES = [
  {
    id: 1,
    type: 'video',
    src: 'https://res.cloudinary.com/cmunbztt/video/upload/v1788105943/agriculture-hero.mp4',
    category: 'Smart Agriculture',
    categoryColor: '#34d399',
    title: 'Smart Agriculture',
    subtitle: 'Precision Drone Systems',
    story: 'Precision agriculture powered by data-driven technology. From field mapping to crop-health analytics — tools that help you grow smarter every season.',
  },
  {
    id: 2,
    type: 'video',
    src: 'https://res.cloudinary.com/cmunbztt/video/upload/v1788105809/cyber_security.mp4',
    category: 'Cybersecurity',
    categoryColor: '#2563eb',
    title: 'Cyber Defense',
    subtitle: 'Quantum-Secure Infrastructure',
    story: 'Zero-trust architecture built for enterprise networks. Quantum-resistant threat intelligence with real-time behavioral analysis.',
  },
  {
    id: 3,
    type: 'video',
    src: 'https://res.cloudinary.com/cmunbztt/video/upload/v1788105923/smart_intelligent_systems.mp4',
    category: 'Data Analytics',
    categoryColor: '#76B900',
    title: 'Predictive Analytics',
    subtitle: 'Real-Time Data Processing',
    story: 'Advanced analytics that learn from every data point — continuously refining decisions, predictions, and operational actions.',
  },
];

function BackgroundVideo({ src, isActive, onEnded }: { src: string; isActive: boolean; onEnded: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasTriggeredNext, setHasTriggeredNext] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        setHasTriggeredNext(false);
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      } else {
        const timer = setTimeout(() => {
          if (videoRef.current) videoRef.current.pause();
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [isActive]);

  const handleTimeUpdate = () => {
    if (videoRef.current && isActive && !hasTriggeredNext) {
      const { currentTime, duration } = videoRef.current;
      if (duration && currentTime >= duration - 1.2) {
        setHasTriggeredNext(true);
        onEnded();
      }
    }
  };

  return (
    <video
      ref={videoRef}
      src={isActive ? src : undefined}
      muted
      playsInline
      preload={isActive ? "auto" : "none"}
      onTimeUpdate={handleTimeUpdate}
      onEnded={() => {
        if (!hasTriggeredNext && isActive) {
          setHasTriggeredNext(true);
          onEnded();
        }
      }}
      className="w-full h-full object-cover bg-black"
    />
  );
}

export function Hero() {
  const [, navigate] = useLocation();
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  };

  // Progress bar for current slide
  useEffect(() => {
    if (SLIDES[current].type === 'video') return; // Videos use onEnded
    setProgress(0);
    const duration = 8000;
    const interval = 50;
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (interval / duration) * 100;
      });
    }, interval);
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [current, nextSlide]);

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-gray-900 dark:bg-cc-darker">
      {/* Slides */}
      {SLIDES.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            className="absolute inset-0 z-0 transition-opacity duration-[1500ms] ease-in-out"
            style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none' }}
          >
            {slide.type === 'video' ? (
              <BackgroundVideo src={slide.src} isActive={isActive} onEnded={nextSlide} />
            ) : (
              <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${slide.src})` }} />
            )}
            {/* Dark gradient overlays for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-cc-darker via-cc-darker/50 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-cc-darker/70 to-transparent pointer-events-none" />
          </div>
        );
      })}

      {/* Content Overlay — Tesla style: left-aligned, large text, dual CTAs */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-24 sm:pb-28 md:pb-32 px-4 sm:px-6 lg:px-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <CategoryPill
              label={SLIDES[current].category}
              color={SLIDES[current].categoryColor}
              className="mb-4 sm:mb-5"
            />
            <h1 className="text-display-xl text-white mb-3 sm:mb-4">
              {SLIDES[current].title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-white/90 mb-3 sm:mb-4">
              {SLIDES[current].subtitle}
            </p>
            <p className="text-sm sm:text-base text-white/60 mb-8 sm:mb-10 max-w-xl leading-relaxed">
              {SLIDES[current].story}
            </p>

            {/* Tesla-style dual CTA */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                className="bg-nvidia-500 hover:bg-nvidia-600 text-black font-bold w-full sm:w-auto h-12 sm:h-13 px-8 text-sm rounded-lg transition-all"
                onClick={() => navigate('/get-started')}
              >
                Get Started
              </Button>
              <Button
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 text-white w-full sm:w-auto h-12 sm:h-13 px-8 text-sm font-semibold rounded-lg transition-all"
                onClick={() => navigate('/login')}
              >
                Explore Systems
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left navigation arrows — subtle */}
      <div className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        <button
          onClick={prevSlide}
          className="p-2 sm:p-2.5 bg-white/5 hover:bg-white/15 backdrop-blur-sm text-white/50 hover:text-white rounded-full transition-all border border-white/5"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 sm:p-2.5 bg-white/5 hover:bg-white/15 backdrop-blur-sm text-white/50 hover:text-white rounded-full transition-all border border-white/5"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      {/* Bottom indicators — NVIDIA style: category labels + progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Progress bar */}
        <div className="h-0.5 bg-white/10 w-full">
          <motion.div
            className="h-full bg-nvidia-500"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>

        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-24 py-3 sm:py-4 bg-cc-darker/60 backdrop-blur-sm">
          {/* Slide indicators */}
          <div className="flex items-center gap-3 sm:gap-4">
            {SLIDES.map((slide, index) => (
              <button
                key={index}
                onClick={() => { setCurrent(index); setProgress(0); }}
                className="group flex items-center gap-2"
              >
                <div className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? 'bg-nvidia-500 scale-125'
                    : 'bg-white/20 group-hover:bg-white/40'
                }`} />
                <span className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-wider transition-all duration-300 hidden sm:inline ${
                  index === current ? 'text-nvidia-500' : 'text-white/30 group-hover:text-white/60'
                }`}>
                  {slide.category}
                </span>
              </button>
            ))}
          </div>

          {/* Slide counter */}
          <span className="text-[10px] font-mono text-white/30">
            {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute right-4 sm:right-6 bottom-20 sm:bottom-24 z-30 cursor-pointer flex flex-col items-center gap-1 group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => document.getElementById('platforms')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30 group-hover:text-nvidia-500 transition-colors duration-300 writing-vertical">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>
          <ChevronDown className="h-4 w-4 text-nvidia-500/50 group-hover:text-nvidia-500 transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
}
