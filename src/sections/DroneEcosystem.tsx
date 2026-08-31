import React, { useRef, useState, useEffect } from 'react';

function LazyVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShouldLoad(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {shouldLoad && (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}

interface SectorData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  stats: { label: string; value: string }[];
  unsplashImage: string;
  videoSrc?: string;
  displayTitle: React.ReactNode;
  displayWriting: string;
}

export const SECTORS: SectorData[] = [
  {
    id: 'scanner',
    title: 'Smart Agricultural Grid',
    subtitle: 'PRECISION CROPPING & FORECASTING',
    description: 'Autonomous drone networks execute real-time multispectral scanning while robotic systems precision-harvest crops. We analyze soil nitrogen, detect anomalies, and empower farmers with data to maximize yield and eliminate waste.',
    color: '#ffffff',
    stats: [
      { label: 'Coverage Area', value: '2,450 Acres' },
      { label: 'Nitrogen Accuracy', value: '94%' },
      { label: 'Water Savings', value: '25%' },
      { label: 'Live Monitoring', value: 'ONLINE' },
    ],
    unsplashImage: '/drone hero.png',
    videoSrc: 'https://res.cloudinary.com/cmunbztt/video/upload/v1788105719/agricvulture_small_panel.mp4',
    displayTitle: <>Autonomous Intelligence<br />for Modern Agriculture</>,
    displayWriting: 'Smart Farming is not just an upgrade; it is a vital revolution for our future. We are building the technological foundation to secure the global food supply. Our ecosystem empowers communities with accessible, cutting-edge tools. By shifting to an autonomous infrastructure, we pave the way for unprecedented sustainability.',
  },
  {
    id: 'camera',
    title: 'Artificial Intelligence Engine',
    subtitle: 'PREDICTIVE MODELING & ROBOTIC CARE',
    description: 'Our advanced AI brain doesn\'t just analyze data—it acts on it. By combining predictive machine learning with precision robotics, ClawnCore systems can autonomously identify crop deficiencies and physically nurture individual plants with sub-millimeter accuracy.',
    color: '#3b82f6',
    stats: [
      { label: 'AI Decisions/sec', value: '10,000+' },
      { label: 'Robotic Precision', value: '< 1mm' },
    ],
    unsplashImage: '/optic hand naturing .png',
    videoSrc: 'https://res.cloudinary.com/cmunbztt/video/upload/v1788105822/artificial_intelligent_small_panel.mp4',
    displayTitle: <>Predictive AI<br />Engine</>,
    displayWriting: 'We aim to double the incomes of small farms, fishermen, and beekeepers globally. Reliance on volatile crops and erratic climates leaves most without a buffer. ClawnCore introduces affordable, high-precision technology directly to the fields. We put people at the center of our design, ensuring life-changing outcomes.',
  },
  {
    id: 'core',
    title: 'Quantum Cybersecurity',
    subtitle: 'HARDWARE-LEVEL SECURITY MESH',
    description: 'Drones communicate over a zero-trust mesh encrypted using post-quantum cryptography. If any node is compromised, it is isolated from the ecosystem within 2 milliseconds.',
    color: '#2563eb',
    stats: [
      { label: 'Isolation Time', value: '<2ms' },
      { label: 'Encryption', value: 'Q-AES' },
    ],
    unsplashImage: '/cyber security heropng',
    videoSrc: 'https://res.cloudinary.com/cmunbztt/video/upload/v1788106607/cyber_security_small_panel.mp4',
    displayTitle: <>Zero-Trust<br />Architecture</>,
    displayWriting: 'In a hyper-connected world, true security requires zero-trust architecture at the hardware level. Our Quantum Cybersecurity mesh protects your most critical assets against tomorrow\'s threats. We provide ultra-low latency telemetry and unbreakable encryption to scale operations with absolute confidence.',
  },
  {
    id: 'antenna',
    title: 'Distributed Cloud Nexus',
    subtitle: 'ULTRA-LOW LATENCY TELEMETRY',
    description: 'A cloud-native telemetry layer that orchestrates terabytes of concurrent stream data across decentralized edge nodes. Guaranteed 99.999% communications uptime.',
    color: '#06b6d4',
    stats: [
      { label: 'Edge Nodes', value: '450+' },
      { label: 'Bandwidth', value: '1.2 Tbps' },
    ],
    unsplashImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=600&q=80',
    videoSrc: 'https://res.cloudinary.com/cmunbztt/video/upload/v1788105834/cloud_system_small_panel.mp4',
    displayTitle: <>Global Cloud<br />Nexus</>,
    displayWriting: 'A cloud-native telemetry layer that orchestrates terabytes of concurrent stream data across decentralized edge nodes. Combined with our Distributed Cloud Nexus, we provide ultra-low latency telemetry and unbreakable encryption to scale your autonomous operations with absolute confidence.',
  },
];

export function DroneEcosystem() {
  return (
    <div className="w-full bg-gray-50 dark:bg-[#081120] text-gray-900 dark:text-white">
      {SECTORS.map((sector) => (
        <section 
          key={sector.id} 
          className="relative w-full min-h-screen lg:h-screen flex flex-col justify-between overflow-hidden py-16 lg:py-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={sector.unsplashImage} 
              alt={sector.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/70 dark:from-[#081120]/40 dark:via-[#0F172A]/20 dark:to-[#081120]/70" />
            <div className="absolute inset-0 bg-black/10 dark:bg-black/40" />
          </div>

          {/* Main Content Layout */}
          <div className="relative z-10 w-full lg:h-full flex flex-col-reverse lg:flex-row items-center lg:items-end justify-between px-4 sm:px-6 lg:px-24 pb-10 sm:pb-12 lg:pb-24 pt-16 sm:pt-20 lg:pt-24 gap-6 sm:gap-8 lg:gap-12">

            {/* Left Info Card (The small cards with the videos) */}
            <div className="w-full max-w-md pointer-events-auto shrink-0">
              <div className="relative overflow-hidden border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-cc-card/90 backdrop-blur-md p-4 sm:p-5 md:p-7 shadow-2xl hover:border-nvidia-500/30 hover:shadow-[0_0_20px_rgba(118,185,0,0.1)] transition-all duration-500 rounded-lg">
                <div>
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] font-mono text-blue-400">
                      {sector.subtitle}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 leading-snug tracking-tight">
                    {sector.title}
                  </h3>

                  <p className="text-gray-500 dark:text-slate-400 text-xs leading-relaxed mb-4 sm:mb-6">
                    {sector.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 border-t border-gray-200 dark:border-white/10 pt-3 sm:pt-4 mb-4 sm:mb-6">
                    {sector.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-[7px] sm:text-[8px] uppercase tracking-widest text-gray-400 dark:text-slate-500 font-mono mb-0.5 sm:mb-1 font-semibold">
                          {stat.label}
                        </p>
                        <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                          {stat.value === 'ONLINE' ? (
                            <span className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                              <span className="text-blue-400">{stat.value}</span>
                            </span>
                          ) : (
                            stat.value
                          )}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Imagery reveal (The small video cards!) */}
                  {sector.videoSrc ? (
                    <LazyVideo
                      src={sector.videoSrc}
                      className="relative h-24 sm:h-28 md:h-32 overflow-hidden border border-gray-200 dark:border-white/10 shadow-inner rounded group-hover:border-[#3E6AE1]/30 transition-colors duration-500"
                    />
                  ) : (
                    <div className="relative h-24 sm:h-28 md:h-32 overflow-hidden border border-gray-200 dark:border-white/10 shadow-inner rounded group-hover:border-[#3E6AE1]/30 transition-colors duration-500">
                      <img
                        src={sector.unsplashImage}
                        alt={sector.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side: Big Title and CTAs */}
            <div className="flex flex-col items-center lg:items-end text-center lg:text-right max-w-2xl w-full">
              <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-3 sm:mb-4 text-gray-500 dark:text-slate-300 drop-shadow-md">
                ClawnCore Drone Platform
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight drop-shadow-xl text-gray-900 dark:text-white mb-4 sm:mb-6">
                {sector.displayTitle}
              </h2>
              <p className="text-[11px] sm:text-sm md:text-base text-gray-600 dark:text-gray-200 font-medium drop-shadow-md mb-6 sm:mb-8 max-w-lg">
                {sector.displayWriting}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4 justify-end w-full sm:w-auto items-center">
                <button className="px-8 sm:px-10 py-2.5 sm:py-3 bg-[#3E6AE1] text-white font-semibold rounded-[4px] text-sm transition-all hover:bg-[#345AC0] hover:shadow-[0_0_20px_rgba(62,106,225,0.4)] w-full sm:w-56 border border-transparent">
                  Explore Platform
                </button>
                <button className="px-8 sm:px-10 py-2.5 sm:py-3 bg-gray-100/40 dark:bg-[#0B1220]/40 backdrop-blur-md border border-gray-300 dark:border-slate-500/50 text-gray-900 dark:text-white font-semibold rounded-[4px] text-sm transition-all hover:bg-[#2DD4BF]/5 hover:border-[#2DD4BF]/50 w-full sm:w-56">
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center gap-2 opacity-60 justify-center lg:justify-end w-full">
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-gray-600 dark:text-white">Trusted Across 18,000+ Acres</span>
              </div>
            </div>

          </div>
        </section>
      ))}
    </div>
  );
}
