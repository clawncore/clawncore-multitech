import { ReactNode } from 'react';

interface ScrollSnapSectionProps {
  children: ReactNode;
  dark?: boolean;
  className?: string;
  id?: string;
}

export function ScrollSnapSection({ children, dark = false, className = '', id }: ScrollSnapSectionProps) {
  return (
    <section
      id={id}
      className={`min-h-screen snap-section relative ${dark ? 'bg-cc-dark text-white' : 'bg-background text-foreground'} ${className}`}
    >
      {children}
    </section>
  );
}
