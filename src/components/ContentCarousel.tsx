import { useRef, useState, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuickLink {
  label: string;
  href: string;
}

interface ContentCarouselProps {
  title: string;
  description: string;
  quickLinks?: QuickLink[];
  children: ReactNode;
  dark?: boolean;
  className?: string;
}

export function ContentCarousel({ title, description, quickLinks = [], children, dark = true, className = '' }: ContentCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(checkScroll, 400);
  };

  return (
    <section className={`py-16 sm:py-20 md:py-28 ${dark ? 'bg-cc-dark text-white' : 'bg-white text-slate-900'} ${className}`}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-10"
        >
          <h2 className="text-display-lg mb-4">{title}</h2>
          <p className={`text-base sm:text-lg max-w-3xl leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            {description}
          </p>
        </motion.div>

        {/* Quick Links */}
        {quickLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 sm:gap-5 mb-8 sm:mb-10"
          >
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-nvidia-500 ${dark ? 'text-slate-400' : 'text-slate-500'}`}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}

        {/* Carousel */}
        <div className="relative group">
          {/* Left fade */}
          <div className={`absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r ${dark ? 'from-cc-dark' : 'from-white'} to-transparent`} />
          {/* Right fade */}
          <div className={`absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l ${dark ? 'from-cc-dark' : 'from-white'} to-transparent`} />

          {/* Left arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white rounded-full transition-all opacity-0 group-hover:opacity-100 -translate-x-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white rounded-full transition-all opacity-0 group-hover:opacity-100 translate-x-2"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 sm:gap-5 overflow-x-auto hide-scrollbar scroll-smooth pb-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
