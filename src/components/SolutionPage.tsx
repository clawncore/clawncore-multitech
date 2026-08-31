import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Play } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { AtmosphericFooter } from '@/sections/AtmosphericFooter';
import { useAuth } from '@/hooks/useAuth';

type SolutionFeature = {
  title: string;
  description: string;
  metric: string;
};

type SolutionPageProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  narrative: string;
  image: string;
  accentLabel: string;
  stats: { value: string; label: string }[];
  features: SolutionFeature[];
  benefits: string[];
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function SolutionPage({
  eyebrow,
  title,
  subtitle,
  narrative,
  image,
  accentLabel,
  stats,
  features,
  benefits,
}: SolutionPageProps) {
  const [, navigate] = useLocation();
  const { openLoginModal } = useAuth();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main>
        <section className="relative min-h-screen overflow-hidden bg-[#081120] text-white">
          <div className="absolute inset-0 z-0">
            <img src={image} alt="" className="h-full w-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#081120]/80 via-[#081120]/35 to-[#081120]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(45,212,191,0.22),transparent_34%),radial-gradient(circle_at_20%_80%,rgba(62,106,225,0.25),transparent_32%)]" />
          </div>

          <div className="container relative z-10 mx-auto flex min-h-screen flex-col justify-center px-6 pb-20 pt-28">
            <motion.div
              initial="hidden"
              animate="visible"
              className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]"
            >
              <div className="max-w-4xl">
                <motion.p custom={0} variants={fadeUp} className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#2DD4BF]">
                  {eyebrow}
                </motion.p>
                <motion.h1 custom={1} variants={fadeUp} className="mb-5 text-5xl font-semibold tracking-tight md:text-7xl lg:text-[84px]">
                  {title}
                </motion.h1>
                <motion.p custom={2} variants={fadeUp} className="max-w-2xl text-xl font-medium text-white/90 md:text-2xl">
                  {subtitle}
                </motion.p>
                <motion.p custom={3} variants={fadeUp} className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                  {narrative}
                </motion.p>
                <motion.div custom={4} variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Button
                    onClick={() => navigate('/get-started')}
                    className="h-12 w-full rounded-[4px] border border-transparent bg-[#3E6AE1] px-8 text-sm font-semibold text-white hover:bg-[#345AC0] sm:w-56"
                  >
                    Explore System
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={openLoginModal}
                    className="h-12 w-full rounded-[4px] border border-white/20 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-md hover:border-white/40 hover:bg-white/20 sm:w-56"
                  >
                    <Play className="h-4 w-4" />
                    Watch Demo
                  </Button>
                </motion.div>
              </div>

              <motion.div custom={5} variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-300">{accentLabel}</span>
                  <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#2DD4BF]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF] shadow-[0_0_10px_rgba(45,212,191,0.9)]" />
                    Online
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-white/10 bg-[#081120]/55 p-4">
                      <p className="text-2xl font-semibold tracking-tight text-white">{stat.value}</p>
                      <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-slate-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="bg-white py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="mb-14 max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">Platform Architecture</p>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">Engineered as infrastructure, not software.</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_50px_rgba(62,106,225,0.12)]">
                  <p className="mb-6 text-[10px] font-mono uppercase tracking-[0.3em] text-blue-600">{feature.metric}</p>
                  <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900">{feature.title}</h3>
                  <p className="text-sm leading-6 text-slate-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#081120] py-24 text-white md:py-32">
          <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#2DD4BF]">Operational Advantage</p>
              <h2 className="mb-6 text-4xl font-semibold tracking-tight md:text-6xl">Built to scale across the ClawnCore ecosystem.</h2>
              <p className="text-base leading-7 text-slate-300">Every page now follows the same product language: cinematic Tesla-level restraint, with NVIDIA-style technical proof through metrics, systems, and infrastructure detail.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#2DD4BF]" />
                  <span className="text-sm text-slate-200">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <AtmosphericFooter />
    </div>
  );
}
