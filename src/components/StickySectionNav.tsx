import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Section {
  id: string;
  label: string;
}

interface StickySectionNavProps {
  sections: Section[];
}

export function StickySectionNav({ sections }: StickySectionNavProps) {
  const [active, setActive] = useState(sections[0]?.id || '');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight);

      // Find active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setActive(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end gap-3"
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => {
            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group flex items-center gap-3"
        >
          <span className={`text-[10px] font-mono uppercase tracking-wider transition-all duration-300 ${
            active === section.id ? 'text-nvidia-500 opacity-100' : 'text-gray-400 dark:text-slate-500 opacity-0 group-hover:opacity-100'
          }`}>
            {section.label}
          </span>
          <div className={`rounded-full transition-all duration-300 ${
            active === section.id
              ? 'w-2.5 h-2.5 bg-nvidia-500 shadow-[0_0_10px_rgba(118,185,0,0.6)]'
              : 'w-1.5 h-1.5 bg-gray-300 dark:bg-slate-600 group-hover:bg-gray-500 dark:group-hover:bg-slate-400 group-hover:scale-125'
          }`} />
        </button>
      ))}
    </motion.div>
  );
}
