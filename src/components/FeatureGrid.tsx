import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FeatureItem {
  icon?: ReactNode;
  title: string;
  description: string;
  value?: string;
}

interface FeatureGridProps {
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  dark?: boolean;
  className?: string;
}

export function FeatureGrid({ items, columns = 3, dark = true, className = '' }: FeatureGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 sm:gap-5 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`group rounded-2xl p-6 sm:p-7 transition-all duration-300 card-hover-lift ${
            dark
              ? 'bg-white/[0.03] border border-white/5 hover:border-nvidia-500/30 hover:bg-white/[0.06]'
              : 'bg-white border border-slate-100 hover:border-nvidia-500/30 shadow-sm hover:shadow-md'
          }`}
        >
          {item.icon && (
            <div className="mb-5 text-nvidia-500">
              {item.icon}
            </div>
          )}
          {item.value && (
            <p className="text-3xl sm:text-4xl font-black mb-2 tracking-tight">{item.value}</p>
          )}
          <h3 className={`text-lg font-bold mb-2 ${dark ? 'text-white' : 'text-slate-900'}`}>
            {item.title}
          </h3>
          <p className={`text-sm leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
