import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Sparkles } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

interface ComingSoonProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export function ComingSoon({ title, subtitle, icon }: ComingSoonProps) {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-lg"
        >
          {/* Icon */}
          <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
            {icon || <Clock className="w-10 h-10 text-blue-400" />}
          </div>

          {/* Coming Soon badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-mono tracking-widest uppercase mb-6">
            <Sparkles className="w-3 h-3" />
            Coming Soon
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-500 dark:text-slate-400 mb-10 leading-relaxed">
            {subtitle || "We're working hard to bring this to you. Stay tuned for something extraordinary."}
          </p>

          {/* Back button */}
          <Button
            onClick={() => navigate('/')}
            className="bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/20 px-8 h-12 rounded-xl font-semibold transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
