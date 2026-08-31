import { motion } from 'framer-motion';

interface SectionDividerProps {
  color?: string;
  className?: string;
}

export function SectionDivider({ color = '#76B900', className = '' }: SectionDividerProps) {
  return (
    <div className={`relative w-full py-1 ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}40, ${color}80, ${color}40, transparent)`,
        }}
      />
    </div>
  );
}
