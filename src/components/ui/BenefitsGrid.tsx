import { Heart, Globe, BookOpen, TrendingUp, Clock, Users } from 'lucide-react';
import { BENEFITS } from '@/services/careersData';

const ICON_MAP: Record<string, typeof Heart> = {
  heart: Heart,
  globe: Globe,
  book: BookOpen,
  chart: TrendingUp,
  clock: Clock,
  users: Users,
};

export function BenefitsGrid() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-cc-darker">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-nvidia-500 mb-3">Why ClawnCore</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
            Benefits & Culture
          </h2>
          <p className="text-gray-500 dark:text-white/50 max-w-2xl mx-auto">
            We invest in our people with comprehensive benefits, flexible work, and a culture that values impact over hours.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BENEFITS.map((benefit) => {
            const Icon = ICON_MAP[benefit.icon] || Heart;
            return (
              <div
                key={benefit.title}
                className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/8 rounded-2xl p-6 hover:border-nvidia-500/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-nvidia-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-nvidia-500" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-xs text-gray-500 dark:text-white/50 leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
