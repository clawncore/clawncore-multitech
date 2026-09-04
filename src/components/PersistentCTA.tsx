import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PAGE_CTA: Record<string, { primary: string; secondary: string; primaryHref: string }> = {
  '/': { primary: 'Get Started', secondary: 'Contact Sales', primaryHref: '/get-started' },
  '/agriculture': { primary: 'Start Agriculture Pilot', secondary: 'View Case Study', primaryHref: '/get-started' },
  '/cloud': { primary: 'Deploy Infrastructure', secondary: 'Talk to Expert', primaryHref: '/get-started' },
  '/cybersecurity': { primary: 'Request Security Audit', secondary: 'View Solutions', primaryHref: '/get-started' },
  '/ml': { primary: 'Plan AI Use Case', secondary: 'See Demos', primaryHref: '/get-started' },
  '/data-analytics': { primary: 'Build Dashboard', secondary: 'View Pricing', primaryHref: '/get-started' },
};

export function PersistentCTA() {
  const [location] = useLocation();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const cta = PAGE_CTA[location] || PAGE_CTA['/'];

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setDismissed(false);
    setVisible(false);
  }, [location]);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 inset-x-0 z-40 pointer-events-none"
        >
          <div className="container mx-auto px-4 pb-4 sm:pb-6">
            <div className="pointer-events-auto mx-auto max-w-2xl bg-white/95 dark:bg-cc-dark/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-3 sm:p-4 shadow-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-2 h-2 rounded-full bg-nvidia-500 hidden sm:block flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 truncate hidden sm:block">Ready to transform?</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                <a href={cta.primaryHref}>
                  <Button className="bg-nvidia-500 hover:bg-nvidia-600 text-black font-bold text-xs sm:text-sm h-9 sm:h-10 px-4 sm:px-6 rounded-lg transition-all">
                    {cta.primary}
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </a>
                <a href="/get-started">
                  <Button variant="outline" className="border-gray-300 dark:border-white/15 hover:border-gray-400 dark:hover:border-white/30 text-gray-700 dark:text-white text-xs sm:text-sm h-9 sm:h-10 px-3 sm:px-5 rounded-lg bg-transparent">
                    {cta.secondary}
                  </Button>
                </a>
                <button
                  onClick={() => setDismissed(true)}
                  className="p-1.5 text-gray-400 dark:text-slate-500 hover:text-gray-900 dark:hover:text-white transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
