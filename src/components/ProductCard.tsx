import { motion } from 'framer-motion';
import { CategoryPill } from './CategoryPill';

interface ProductCardProps {
  image: string;
  category: string;
  categoryColor?: string;
  title: string;
  summary: string;
  href?: string;
  index?: number;
  dark?: boolean;
}

export function ProductCard({ image, category, categoryColor = '#76B900', title, summary, href, index = 0, dark = true }: ProductCardProps) {
  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href ? { href } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px]"
      style={{ scrollSnapAlign: 'start' }}
    >
      <Wrapper
        {...wrapperProps}
        className={`block group cursor-pointer rounded-2xl overflow-hidden card-hover-lift ${dark ? 'bg-cc-card border border-white/5' : 'bg-white border border-slate-100 shadow-sm'}`}
      >
        {/* Image */}
        <div className="relative h-44 sm:h-52 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <CategoryPill label={category} color={categoryColor} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <h3 className={`text-lg sm:text-xl font-bold mb-2 leading-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
            {title}
          </h3>
          <p className={`text-sm leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            {summary}
          </p>
          {href && (
            <div className="mt-4 flex items-center gap-1 text-nvidia-500 text-sm font-semibold group-hover:gap-2 transition-all duration-300">
              Learn more
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </div>
      </Wrapper>
    </motion.div>
  );
}
