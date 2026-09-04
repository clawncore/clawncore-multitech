import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { StickySectionNav } from '@/components/StickySectionNav';
import { SectionDivider } from '@/components/SectionDivider';
import { PlatformOverview } from '@/sections/PlatformOverview';
import { DroneEcosystem } from '@/sections/DroneEcosystem';
import { VisionRoadmap } from '@/sections/VisionRoadmap';
import { About } from '@/components/About';
import { SystemsShowcase } from '@/sections/SystemsShowcase';
import { ContactInitiation } from '@/sections/ContactInitiation';

const SECTIONS = [
  { id: 'platforms', label: 'Platforms' },
  { id: 'ecosystem', label: 'Solutions' },
  { id: 'about', label: 'About' },
  { id: 'vision', label: 'Vision' },
  { id: 'systems', label: 'Systems' },
  { id: 'contact', label: 'Contact' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <Header />
      <StickySectionNav sections={SECTIONS} />
      <main>
        <Hero />
        <PlatformOverview />
        <SectionDivider />
        <DroneEcosystem />
        <SectionDivider />
        <div id="about">
          <About />
        </div>
        <SectionDivider />
        <div id="vision">
          <VisionRoadmap />
        </div>
        <SectionDivider />
        <div id="systems">
          <SystemsShowcase />
        </div>
        <SectionDivider />
        <div id="contact">
          <ContactInitiation />
        </div>
      </main>
      <Footer />
      <PersistentCTA />
    </div>
  );
}
