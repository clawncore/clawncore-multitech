interface CategoryPillProps {
  label: string;
  color?: string;
  variant?: 'filled' | 'outlined';
  className?: string;
}

export function CategoryPill({ label, color = '#76B900', variant = 'filled', className = '' }: CategoryPillProps) {
  if (variant === 'outlined') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-mono font-semibold uppercase tracking-[0.2em] rounded-full border ${className}`}
        style={{ borderColor: `${color}40`, color }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
        {label}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-mono font-semibold uppercase tracking-[0.2em] rounded-full ${className}`}
      style={{ backgroundColor: `${color}18`, color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
