import { useLocation } from 'wouter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Leaf, Droplets, Sprout, Wheat, Map, ShieldCheck } from 'lucide-react';

const history = [
  {
    period: 'Traditional farming',
    text: 'Farmers relied mainly on experience, seasonal knowledge, rainfall patterns, hand tools, animal power, and community practices to decide when to plant, irrigate, weed, and harvest.',
  },
  {
    period: 'Mechanized agriculture',
    text: 'Tractors, pumps, irrigation systems, and improved seed varieties helped farmers cover more land and increase productivity, but decisions were still mostly based on observation and delayed information.',
  },
  {
    period: 'Precision agriculture',
    text: 'GPS mapping, satellite imagery, soil testing, and farm management software made it possible to treat different parts of a field differently instead of applying the same inputs everywhere.',
  },
  {
    period: 'Smart agriculture today',
    text: 'Drones, sensors, mobile apps, weather data, AI models, and cloud dashboards now help farmers see crop stress earlier, save water, reduce waste, and plan every season with better information.',
  },
];

const practices = [
  {
    icon: Map,
    title: 'Drone field scouting',
    text: 'Drones can scan large fields faster than manual walking, helping farmers identify weak crop zones, pest damage, water stress, erosion, and uneven growth.',
  },
  {
    icon: Droplets,
    title: 'Smart water management',
    text: 'Moisture readings, weather data, and field maps help farmers irrigate only where water is needed, which is critical in dry seasons and drought-prone regions.',
  },
  {
    icon: Sprout,
    title: 'Soil and crop intelligence',
    text: 'Soil condition, crop color, plant density, and growth patterns can be analyzed to guide fertilizer use, pest control, planting plans, and harvest timing.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure farm records',
    text: 'Digital records help farmers track field history, inputs, yields, disease outbreaks, and seasonal performance for better planning and financing support.',
  },
];

const zimbabweNeeds = [
  'Irregular rainfall and longer dry spells make water planning more important.',
  'Smallholder farmers often lack fast access to crop health information.',
  'Input costs are high, so fertilizer, chemicals, seed, and water must be used carefully.',
  'Pests and crop diseases can spread before they are detected manually.',
  'Better yield records can help farmers, cooperatives, buyers, insurers, and institutions make stronger decisions.',
];

export default function Agriculture() {
  const [, navigate] = useLocation();
  const { openLoginModal, isAuthenticated } = useAuth();

  const handleWatchDemo = () => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <Header />

      <main>
        <section className="relative overflow-hidden bg-[#123017] px-4 sm:px-6 pb-16 sm:pb-20 pt-24 sm:pt-28 text-white md:pb-28 md:pt-36">
          <div className="absolute inset-0 opacity-25">
            <img src="/drone hero.png" alt="Agricultural drone over crops" className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#123017] via-[#1f4f24]/90 to-[#071407]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f7f8f1] to-transparent" />

          <div className="container relative z-10 mx-auto grid gap-8 sm:gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="mb-3 sm:mb-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#a7f3a0]">
                Smart Agriculture Solution
              </p>
              <h1 className="mb-4 sm:mb-6 max-w-4xl text-3xl sm:text-5xl font-black tracking-tight md:text-7xl lg:text-[82px]">
                Farming with better information.
              </h1>
              <p className="max-w-2xl text-base sm:text-xl leading-7 sm:leading-8 text-white/90 md:text-2xl">
                Smart agriculture uses real field data to help farmers decide when to plant, irrigate, fertilize, protect crops, and harvest.
              </p>
              <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base leading-6 sm:leading-7 text-lime-50/80">
                For Zimbabwe, this means practical technology for food security: drones for field scouting, crop-health maps, weather-aware planning, soil insights, and digital records that help farmers reduce waste and improve yield.
              </p>
              <div className="mt-6 sm:mt-9 flex flex-col gap-3 sm:gap-4 sm:flex-row">
                <Button
                  onClick={() => navigate('/get-started')}
                  className="h-11 sm:h-12 rounded-[4px] bg-[#2f7d32] px-6 sm:px-8 text-sm font-bold text-white hover:bg-[#256828]"
                >
                  Start Agriculture Pilot
                </Button>
                <Button
                  onClick={handleWatchDemo}
                  className="h-11 sm:h-12 rounded-[4px] border border-white/25 bg-white/10 px-6 sm:px-8 text-sm font-bold text-white backdrop-blur-md hover:bg-white/20"
                >
                  Watch Field Demo
                </Button>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
              <div className="overflow-hidden rounded-[22px] bg-black">
                <video src="https://res.cloudinary.com/cmunbztt/video/upload/v1788105943/agriculture-hero.mp4" autoPlay muted loop playsInline controls className="aspect-video w-full object-cover" />
              </div>
              <div className="grid gap-3 p-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-2xl font-black">25%</p>
                  <p className="text-xs uppercase tracking-widest text-lime-100/80">Water saving target</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-2xl font-black">Early</p>
                  <p className="text-xs uppercase tracking-widest text-lime-100/80">Crop stress alerts</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-2xl font-black">Local</p>
                  <p className="text-xs uppercase tracking-widest text-lime-100/80">Zimbabwe rollout</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 py-16 sm:py-20 md:py-28">
          <div className="container mx-auto grid gap-8 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#2f7d32]">What It Means</p>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">What is smart agriculture?</h2>
            </div>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-7 sm:leading-8 text-[#3f5139]">
              <p>
                Smart agriculture is the use of modern technology to make farming more accurate, efficient, and resilient. It does not replace the farmer. It gives the farmer better eyes, better records, and better timing.
              </p>
              <p>
                A traditional farmer may walk through a field and notice a problem after it has already spread. A smart agriculture system can use drone imagery, weather information, soil data, and crop records to detect warning signs earlier. This allows the farmer to act before the loss becomes serious.
              </p>
              <p>
                The practical goal is simple: produce more food with fewer wasted inputs, less guesswork, and better protection against drought, pests, disease, and market uncertainty.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 sm:px-6 py-16 sm:py-20 md:py-28">
          <div className="container mx-auto">
            <div className="mb-8 sm:mb-12 max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#2f7d32]">History</p>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">How agriculture became smart.</h2>
            </div>
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
              {history.map((item) => (
                <div key={item.period} className="rounded-2xl sm:rounded-3xl border border-green-100 bg-[#fbfff8] p-5 sm:p-6">
                  <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl font-black text-[#1e4d24]">{item.period}</h3>
                  <p className="text-sm leading-6 sm:leading-7 text-[#4d6046]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 py-16 sm:py-20 md:py-28">
          <div className="container mx-auto grid gap-8 sm:gap-12 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-2xl sm:rounded-[32px] shadow-2xl">
              <img src="/drone hero.png" alt="Drone agriculture system" loading="lazy" className="h-64 sm:h-full sm:min-h-[420px] w-full object-cover" />
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#2f7d32]">Zimbabwe Context</p>
              <h2 className="mb-4 sm:mb-6 text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">Why this matters for Zimbabwe.</h2>
              <p className="mb-5 sm:mb-7 text-base sm:text-lg leading-7 sm:leading-8 text-[#3f5139]">
                Zimbabwe has strong agricultural potential, but farmers face real pressure from climate variability, cost of inputs, water stress, pests, and limited access to timely field information. Smart agriculture can help turn those challenges into manageable decisions.
              </p>
              <div className="space-y-2.5 sm:space-y-3">
                {zimbabweNeeds.map((need) => (
                  <div key={need} className="flex gap-3 rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 shadow-sm">
                    <Leaf className="mt-1 h-5 w-5 flex-shrink-0 text-[#2f7d32]" />
                    <p className="text-sm leading-5 sm:leading-6 text-[#3f5139]">{need}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#123017] px-4 sm:px-6 py-16 sm:py-20 text-white md:py-28">
          <div className="container mx-auto">
            <div className="mb-8 sm:mb-12 max-w-4xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#a7f3a0]">ClawnCore Multitech Role</p>
              <h2 className="mb-4 sm:mb-6 text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">Bringing practical smart agriculture to Zimbabwe.</h2>
              <p className="text-base sm:text-lg leading-7 sm:leading-8 text-lime-50/80">
                ClawnCore Multitech's role is to package advanced tools into a solution that can work locally. That means field mapping, drone operations, crop-health analytics, secure cloud dashboards, farmer training, and partnerships with farms, cooperatives, agronomists, schools, institutions, and government-aligned agriculture programs.
              </p>
            </div>
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
              {practices.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/10 p-5 sm:p-6 backdrop-blur-md">
                  <Icon className="mb-4 sm:mb-5 h-7 w-7 sm:h-8 sm:w-8 text-[#a7f3a0]" />
                  <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-black">{title}</h3>
                  <p className="text-sm leading-6 sm:leading-7 text-lime-50/75">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#eef7e8] px-4 sm:px-6 py-16 sm:py-20 md:py-28">
          <div className="container mx-auto grid gap-8 sm:gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#2f7d32]">Real Farm Outcome</p>
              <h2 className="mb-4 sm:mb-6 text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">The result should be better harvest decisions, not just better screens.</h2>
              <p className="text-base sm:text-lg leading-7 sm:leading-8 text-[#3f5139]">
                A smart agriculture project succeeds when farmers can clearly answer practical questions: Which part of the field is stressed? Where should water go first? Is the crop ready for fertilizer? Are pests spreading? Which field performed better this season? What should change next season?
              </p>
            </div>
            <div className="rounded-2xl sm:rounded-[32px] bg-white p-6 sm:p-8 shadow-xl">
              <Wheat className="mb-4 sm:mb-6 h-8 w-8 sm:h-10 sm:w-10 text-[#2f7d32]" />
              <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-black text-[#1e4d24]">ClawnCore focus</h3>
              <p className="text-sm sm:text-base leading-6 sm:leading-7 text-[#3f5139]">
                We want smart agriculture in Zimbabwe to be useful at the farm level: affordable pilots, local training, clear dashboards, drone-supported field reports, and data that helps farmers improve season after season.
              </p>
              <Button onClick={() => navigate('/get-started')} className="mt-5 sm:mt-7 h-11 sm:h-12 rounded-[4px] bg-[#2f7d32] px-6 sm:px-8 font-bold text-white hover:bg-[#256828]">
                Start with ClawnCore
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <PersistentCTA />
    </div>
  );
}
