import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, FAQSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  ChevronUp,
  Sprout,
  Droplets,
  Map,
  BarChart3,
  FileText,
  Rocket,
  Wrench,
  BookOpen,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

const faqData = [
  {
    question: 'What is precision farming and how is it different from conventional farming?',
    answer:
      'Precision farming uses technology like drones, soil sensors, GPS mapping, and data analytics to make farming decisions at a granular level. Instead of treating an entire field uniformly, precision farming lets you apply water, fertilizer, and pest control exactly where needed. This reduces waste, lowers costs, and improves yields compared to conventional approaches that treat every part of a field the same way.',
  },
  {
    question: 'How much does it cost to start precision farming in Zimbabwe?',
    answer:
      'Starting costs vary depending on your approach. Basic smartphone-based crop recording can begin for free using ClawnCore\'s Digital Farm Records platform. Drone scouting services typically start from a few hundred dollars per session. Soil testing ranges from $50 to $200 per sample set. Most farmers see return on investment within the first season through reduced input costs and improved yields.',
  },
  {
    question: 'Do I need technical expertise to use precision farming tools?',
    answer:
      'Modern precision farming platforms are designed for ease of use. Tools like ClawnCore\'s Digital Farm Records work through simple mobile interfaces. Drone scouting services are operated by trained pilots, and the results come as clear maps and reports. You do not need an engineering background to benefit from precision farming in Zimbabwe.',
  },
  {
    question: 'What crops work best with precision farming in Zimbabwe?',
    answer:
      'All major Zimbabwean crops benefit from precision farming: maize, tobacco, wheat, soybeans, cotton, horticulture, and sugar cane. Larger field crops like maize and tobacco see the biggest gains from drone scouting and NDVI monitoring. Horticulture and irrigated crops benefit enormously from smart water management and soil analytics.',
  },
  {
    question: 'How accurate is drone-based crop monitoring?',
    answer:
      'Modern agricultural drones with multi-spectral sensors can detect crop stress 2 to 3 weeks before it becomes visible to the naked eye. NDVI accuracy for health assessment is typically above 90 percent. GPS tagging ensures observations are accurate to within a few centimeters, making targeted interventions highly precise.',
  },
  {
    question: 'Is there reliable internet connectivity in rural Zimbabwe for precision farming?',
    answer:
      'Yes. Most precision farming tools work offline and sync data when connectivity is available. ClawnCore\'s platform is designed for low-bandwidth environments common in rural Zimbabwe. Drone data can be processed locally, and farm records can be maintained on your phone without constant internet access.',
  },
  {
    question: 'How do I get started with ClawnCore\'s smart agriculture platform?',
    answer:
      'Getting started is simple. Visit clawncore.com/get-started to book a consultation. Our team will assess your farm\'s needs, recommend the right combination of tools, and provide training. Many farmers begin with Digital Farm Records (free to start), then add drone scouting and soil analytics as their operations grow.',
  },
];

const tableOfContents = [
  { id: 'what-is-precision-farming', label: 'What is Precision Farming?' },
  { id: 'why-it-matters-zimbabwe', label: 'Why It Matters for Zimbabwe' },
  { id: 'drone-field-scouting', label: 'Drone Field Scouting' },
  { id: 'crop-health-ndvi', label: 'Crop Health Monitoring with NDVI' },
  { id: 'soil-analytics', label: 'Soil Analytics for Better Yields' },
  { id: 'smart-water-management', label: 'Smart Water Management' },
  { id: 'digital-farm-records', label: 'Digital Farm Records' },
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'tools-and-resources', label: 'Tools and Resources' },
];

const sectionLinks = [
  { icon: BookOpen, label: 'What is Precision Farming?', href: '#what-is-precision-farming' },
  { icon: Map, label: 'Why It Matters for Zimbabwe', href: '#why-it-matters-zimbabwe' },
  { icon: Sprout, label: 'Drone Field Scouting', href: '#drone-field-scouting' },
  { icon: BarChart3, label: 'Crop Health with NDVI', href: '#crop-health-ndvi' },
  { icon: FileText, label: 'Soil Analytics', href: '#soil-analytics' },
  { icon: Droplets, label: 'Smart Water Management', href: '#smart-water-management' },
  { icon: FileText, label: 'Digital Farm Records', href: '#digital-farm-records' },
  { icon: Rocket, label: 'Getting Started', href: '#getting-started' },
  { icon: Wrench, label: 'Tools and Resources', href: '#tools-and-resources' },
];

export default function SmartAgricultureGuide() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Smart Agriculture Guide: Precision Farming in Zimbabwe"
        description="A comprehensive guide to precision farming in Zimbabwe. Learn about drone scouting, crop health monitoring with NDVI, soil analytics, water management, and digital farm records for Zimbabwean farms."
        keywords={[
          'precision farming Zimbabwe',
          'smart agriculture guide Africa',
          'drone scouting Zimbabwe farms',
          'NDVI crop monitoring',
          'soil analytics Zimbabwe',
          'water management agriculture',
          'digital farm records',
          'precision agriculture getting started',
          'agricultural technology Zimbabwe',
          'smart farming techniques Africa',
        ]}
        ogImage="/og-smart-agriculture-guide.png"
      />
      <FAQSchema questions={faqData} />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0f2318] to-[#1a3d25] py-24 sm:py-32 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <Breadcrumbs
              items={[
                { name: 'Home', url: '/' },
                { name: 'Resources', url: '/resources' },
                { name: 'Guides', url: '/resources/guides' },
                { name: 'Smart Agriculture Guide', url: '/resources/guides/smart-agriculture-guide' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#a7f3a0]">
                Comprehensive Guide
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                <span className="text-[#a7f3a0]">Smart Agriculture</span> &amp; Precision Farming in Zimbabwe
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-8">
                Everything you need to know about drone scouting, crop monitoring, soil analytics,
                and water management for Zimbabwean farms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started">
                  <Button className="h-12 px-8 bg-[#2f7d32] hover:bg-[#256828] text-white font-bold">
                    Start Your Journey
                  </Button>
                </Link>
                <Link href="/platforms/smart-agriculture">
                  <Button variant="outline" className="h-12 px-8 border-white/30 text-white hover:bg-white/10 font-bold">
                    Explore Our Platform
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-16 sm:py-20 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black mb-8 text-center">Table of Contents</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {sectionLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 p-4 rounded-xl bg-[#eef7e8] dark:bg-[#2f7d32]/10 hover:bg-[#ddeede] dark:hover:bg-[#2f7d32]/20 transition-colors"
                  >
                    <item.icon className="h-5 w-5 text-[#2f7d32] flex-shrink-0" />
                    <span className="text-sm font-semibold text-[#2f7d32] dark:text-[#a7f3a0]">
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: What is Precision Farming */}
        <section id="what-is-precision-farming" className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-6 text-[#2f7d32]">
                What is Precision Farming?
              </h2>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                Precision farming, also called precision agriculture, is a modern approach to crop
                production that uses technology to observe, measure, and respond to variability in
                your fields. Rather than applying the same amount of water, fertilizer, or pesticide
                across an entire farm, precision farming lets you tailor inputs to the specific needs
                of each zone within a field.
              </p>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                At its core, precision farming is about data-driven decision making. Instead of
                relying on general rules of thumb or seasonal intuition, farmers gather detailed
                information about their soil conditions, crop health, weather patterns, and water
                availability. This data is then used to make targeted interventions that maximise
                output while minimising cost and environmental impact.
              </p>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                The key technologies that power precision farming include satellite and drone
                imagery, GPS-based field mapping, soil sensors, weather monitoring stations, and
                software platforms that bring all this data together into actionable insights. For
                Zimbabwean farmers, the most accessible entry points are smartphone-based farm
                records, drone scouting services, and soil testing.
              </p>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                Precision farming is not reserved for large commercial operations. Smallholder
                farmers can benefit from simplified versions of these technologies, such as mobile
                apps for crop recording, community soil testing programmes, and shared drone
                services. The principle remains the same regardless of scale: use information to
                make better farming decisions.
              </p>
              <h3 className="text-xl font-bold mb-4 text-[#46586b] dark:text-slate-200">
                The Four Pillars of Precision Farming
              </h3>
              <ul className="space-y-3 mb-6">
                {[
                  'Observation: Collecting data through drones, sensors, soil tests, and manual field inspections.',
                  'Analysis: Processing collected data to identify patterns, problems, and opportunities in your fields.',
                  'Decision: Using analysed data to determine where and when to apply inputs like water, fertilizer, and pest control.',
                  'Action: Implementing targeted interventions at specific locations and times for maximum efficiency.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#2f7d32] mt-0.5 flex-shrink-0" />
                    <span className="text-[#46586b] dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Why Precision Farming Matters for Zimbabwe */}
        <section id="why-it-matters-zimbabwe" className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-6 text-[#2f7d32]">
                Why Precision Farming Matters for Zimbabwe
              </h2>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                Zimbabwe's agricultural sector faces a unique set of challenges that make
                precision farming particularly valuable. Climate variability, erratic rainfall
                patterns, limited access to quality inputs, and the need to produce more food on
                existing land all create a strong case for data-driven farming approaches.
              </p>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                The country's agriculture is heavily dependent on rainfall, with roughly 70 percent
                of cropland being rain-fed. This makes water management and early stress detection
                critical for protecting yields. Precision farming tools such as drought-resistant
                crop variety selection guided by soil data, and smart irrigation scheduling based on
                real-time moisture readings, can significantly improve water use efficiency.
              </p>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                Input costs represent a major financial burden for Zimbabwean farmers. Fertilizer
                prices have risen sharply, and many farmers cannot afford to waste even small
                amounts. Precision application guided by soil analytics ensures that every
                kilogram of fertilizer goes where it will produce the most return, reducing waste
                by 15 to 30 percent compared to uniform application.
              </p>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                Zimbabwe also has a growing young population with increasing access to smartphones
                and mobile internet. This creates an opportunity to deploy digital agriculture
                tools at scale. Platforms like ClawnCore's Digital Farm Records leverage existing
                mobile infrastructure to bring precision farming principles to farms of all sizes,
                from smallholder plots of one hectare to commercial operations covering thousands.
              </p>
              <h3 className="text-xl font-bold mb-4 text-[#46586b] dark:text-slate-200">
                Key Benefits for Zimbabwean Farmers
              </h3>
              <ul className="space-y-3">
                {[
                  'Reduced input costs through targeted fertilizer and pesticide application',
                  'Better water management during increasingly unpredictable rainfall seasons',
                  'Early detection of crop diseases and pest infestations before they spread',
                  'Improved record keeping for compliance, credit access, and market negotiations',
                  'Higher and more consistent yields from the same land area',
                  'Data-backed evidence for securing agricultural financing and insurance',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#2f7d32] mt-0.5 flex-shrink-0" />
                    <span className="text-[#46586b] dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Drone Field Scouting */}
        <section id="drone-field-scouting" className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-6 text-[#2f7d32]">
                Drone Field Scouting: Complete Guide
              </h2>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                Drone field scouting is one of the most impactful precision farming technologies
                available to Zimbabwean farmers today. A single drone flight can cover hundreds of
                hectares in under an hour, producing detailed maps that reveal crop health issues,
                soil variability, drainage problems, and pest damage that would take days to
                identify through walking inspections.
              </p>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                Agricultural drones are equipped with multi-spectral cameras that capture images in
                wavelengths beyond what the human eye can see. These cameras detect near-infrared
                light reflected by healthy vegetation, enabling the calculation of vegetation
                indices like NDVI (Normalized Difference Vegetation Index). This index provides a
                numerical measure of crop health that can be tracked over time.
              </p>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                For a typical Zimbabwean farm, drone scouting is most valuable at several key
                points during the growing season. Right after planting, drones can assess crop
                establishment and identify areas with poor germination. During the vegetative
                stage, they detect nutrient deficiencies and early signs of disease. Before
                harvest, they help estimate yields and plan logistics.
              </p>
              <h3 className="text-xl font-bold mb-4 text-[#46586b] dark:text-slate-200">
                What Drone Scouting Reveals
              </h3>
              <ul className="space-y-3 mb-6">
                {[
                  'Pest hotspots: Identify areas where fall armyworm, stalk borers, or other pests are concentrated before damage becomes widespread.',
                  'Disease detection: Spot fungal infections, bacterial wilts, and viral diseases through changes in leaf reflectance patterns.',
                  'Water stress zones: Map areas where crops are showing drought stress before visible wilting occurs.',
                  'Nutrient deficiencies: Distinguish between nitrogen, phosphorus, and potassium deficiencies based on spectral signatures.',
                  'Weed pressure: Map weed-infested areas for targeted herbicide application or mechanical weeding.',
                  'Drainage issues: Identify waterlogged or poorly drained zones that need attention.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#2f7d32] mt-0.5 flex-shrink-0" />
                    <span className="text-[#46586b] dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed">
                ClawnCore offers drone scouting services throughout Zimbabwe, with trained pilots
                and certified equipment. Results are delivered as clear, colour-coded maps with
                GPS-tagged observations and recommendations. Each scouting report includes an
                executive summary, detailed zone-by-zone analysis, and suggested follow-up actions.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Crop Health Monitoring with NDVI */}
        <section id="crop-health-ndvi" className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-6 text-[#2f7d32]">
                Crop Health Monitoring with NDVI
              </h2>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                NDVI (Normalized Difference Vegetation Index) is the most widely used indicator
                for assessing crop health from aerial imagery. It measures the difference between
                near-infrared light (which healthy plants strongly reflect) and red light (which
                healthy plants absorb for photosynthesis). The resulting value ranges from -1 to
                +1, with higher values indicating healthier, more vigorous vegetation.
              </p>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                For Zimbabwean crops, NDVI is particularly useful because it can detect crop stress
                2 to 3 weeks before it becomes visible to the naked eye. This early warning
                window is critical during the dry mid-season period (typically July to September)
                when every day of delayed response can mean significant yield losses. By the time
                you see yellowing leaves from your tractor cab, the underlying problem has already
                been affecting your crop for some time.
              </p>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                Regular NDVI monitoring throughout the growing season creates a health timeline
                for each field. Comparing maps from week to week shows whether your crops are
                improving, maintaining, or declining in health. This temporal data is invaluable
                for evaluating the effectiveness of interventions like fertilizer top-dressing or
                irrigation adjustments.
              </p>
              <h3 className="text-xl font-bold mb-4 text-[#46586b] dark:text-slate-200">
                Understanding NDVI Colour Maps
              </h3>
              <ul className="space-y-3 mb-6">
                {[
                  'Dark green (0.7 to 1.0): Excellent crop health. Plants are vigorous, well-nourished, and actively growing.',
                  'Light green (0.5 to 0.7): Good health with minor stress. Monitor closely and consider targeted inputs.',
                  'Yellow (0.3 to 0.5): Moderate stress detected. Investigate soil moisture, nutrient levels, or pest presence.',
                  'Orange (0.2 to 0.3): Significant stress. Immediate investigation and intervention recommended.',
                  'Red (below 0.2): Severe stress or bare soil. Crops in this zone may be beyond recovery without urgent action.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#2f7d32] mt-0.5 flex-shrink-0" />
                    <span className="text-[#46586b] dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed">
                When interpreting NDVI data, it is important to account for crop growth stage.
                Newly planted fields will naturally show lower NDVI values regardless of health.
                The most meaningful analysis comes from comparing current values against baseline
                measurements taken during peak growth for your specific crop type.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Soil Analytics */}
        <section id="soil-analytics" className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-6 text-[#2f7d32]">
                Soil Analytics for Better Yields
              </h2>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                Soil is the foundation of all farming, and understanding your soil is the first
                step toward precision agriculture. Soil analytics goes beyond the basic pH and
                organic matter tests that many farmers are familiar with. Modern soil analysis
                examines nutrient profiles, microbial activity, water-holding capacity, and
                physical structure to build a complete picture of soil health.
              </p>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                Zimbabwean soils vary enormously by region. The deep red soils of the Highveld are
                generally fertile but can be acidic and phosphorus-deficient. The sandy soils of the
                Lowveld drain quickly and struggle to retain moisture and nutrients. The medium
                rainfall areas of Mashonaland and Manicaland have their own distinct soil
                challenges. Understanding your specific soil type is essential for making informed
                decisions about crop selection, fertilization, and irrigation.
              </p>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                Precision soil mapping creates a detailed picture of how soil properties vary
                across your fields. Rather than applying a uniform fertilizer rate across 500
                hectares, you can create variable-rate application maps that deliver more
                fertilizer to zones that will benefit most and reduce application in zones where
                nutrients are already adequate.
              </p>
              <h3 className="text-xl font-bold mb-4 text-[#46586b] dark:text-slate-200">
                What to Test and Why
              </h3>
              <ul className="space-y-3 mb-6">
                {[
                  'pH levels: Determines nutrient availability. Most Zimbabwean crops perform best between pH 5.5 and 7.0.',
                  'Macronutrients (N, P, K): Nitrogen, phosphorus, and potassium are the three primary nutrients crops need in the largest quantities.',
                  'Micronutrients (Zn, Mn, Cu, B): Zinc deficiency is common in Zimbabwean soils and can reduce maize yields by up to 20 percent.',
                  'Organic matter content: Affects water retention, nutrient cycling, and soil structure. Aim for at least 2 percent organic matter.',
                  'Cation Exchange Capacity (CEC): Measures your soil\'s ability to hold and supply nutrients to plant roots.',
                  'Soil texture and structure: Influences drainage, root penetration, and water-holding capacity.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#2f7d32] mt-0.5 flex-shrink-0" />
                    <span className="text-[#46586b] dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed">
                ClawnCore works with accredited soil testing laboratories to provide Zimbabwean
                farmers with comprehensive soil analysis reports. Our digital platform stores your
                results and tracks changes over time, helping you see the long-term impact of your
                soil management practices.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Smart Water Management */}
        <section id="smart-water-management" className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-6 text-[#2f7d32]">
                Smart Water Management
              </h2>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                Water is the most critical input in Zimbabwean agriculture. With rainfall patterns
                becoming increasingly unpredictable due to climate change, smart water management
                has moved from a nice-to-have to an absolute necessity for productive farming.
                Precision water management uses real-time data to ensure crops receive exactly the
                right amount of water at the right time.
              </p>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                The foundation of smart water management is soil moisture monitoring. By placing
                sensors at different depths within the root zone, you can track how quickly soil
                is drying out and predict when irrigation is needed. This data, combined with
                weather forecasts and evapotranspiration calculations, allows for precise irrigation
                scheduling that avoids both under-watering and over-watering.
              </p>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                For Zimbabwe's growing drip irrigation sector, smart water management is
                particularly powerful. Drip systems already deliver water directly to the root zone
                with minimal waste. When paired with soil moisture sensors and automated controls,
                these systems can reduce water usage by 30 to 50 percent compared to flood or
                sprinkler irrigation while maintaining or even improving yields.
              </p>
              <h3 className="text-xl font-bold mb-4 text-[#46586b] dark:text-slate-200">
                Smart Water Management Components
              </h3>
              <ul className="space-y-3 mb-6">
                {[
                  'Soil moisture sensors: Real-time measurements at multiple depths within the root zone.',
                  'Weather stations: Local rainfall, temperature, humidity, and wind speed data for evapotranspiration calculations.',
                  'Flow meters: Track exactly how much water each zone or block is receiving.',
                  'Automated valves: Open and close irrigation zones based on sensor data and scheduling algorithms.',
                  'Mobile alerts: Receive notifications when soil moisture drops below crop-specific thresholds.',
                  'Historical analytics: Track water usage patterns across seasons to identify trends and optimise infrastructure.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#2f7d32] mt-0.5 flex-shrink-0" />
                    <span className="text-[#46586b] dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed">
                In Zimbabwe, smart water management also helps farmers comply with water use
                regulations and make a stronger case for water allocation from local authorities.
                Having documented evidence of efficient water use strengthens applications for
                irrigation permits and borehole licences.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Digital Farm Records */}
        <section id="digital-farm-records" className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-6 text-[#2f7d32]">
                Digital Farm Records
              </h2>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                Digital farm records form the backbone of any precision farming system. Without
                accurate records of what happened on your farm, when, and where, it is impossible
                to measure the impact of your decisions or make informed plans for the future.
                ClawnCore's Digital Farm Records platform provides a simple, mobile-first way to
                capture and organise all your farming data.
              </p>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                Good farm records serve multiple purposes beyond simple documentation. They provide
                the evidence needed to secure agricultural financing from banks and microfinance
                institutions. They support insurance claims when losses occur. They help you
                negotiate better prices with buyers by demonstrating consistent quality. And they
                enable you to compare performance across seasons and identify what is working.
              </p>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                The shift from paper-based to digital records offers particular advantages in the
                Zimbabwean context. Paper records are easily lost to rain, insects, or time. They
                are difficult to search and analyse. Digital records are backed up in the cloud,
                searchable, and can generate reports and charts automatically. They also make it
                easy to share information with agronomists, extension officers, and financial
                institutions.
              </p>
              <h3 className="text-xl font-bold mb-4 text-[#46586b] dark:text-slate-200">
                Essential Records to Maintain
              </h3>
              <ul className="space-y-3 mb-6">
                {[
                  'Planting records: Date, variety, seed rate, field location, and planting method for each crop.',
                  'Input application logs: Fertilizer type, rate, date, and location. Pesticide applications with product, rate, and target pest.',
                  'Irrigation logs: Water applied, duration, method, and soil moisture readings at the time of irrigation.',
                  'Weather data: Rainfall measurements, temperature, and notable weather events.',
                  'Growth observations: Regular notes on crop development stage, health issues, and field conditions.',
                  'Harvest records: Yield by field, quality grades, storage details, and sale prices.',
                  'Financial records: All farm income and expenses, linked to specific fields and crops where possible.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#2f7d32] mt-0.5 flex-shrink-0" />
                    <span className="text-[#46586b] dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed">
                ClawnCore's Digital Farm Records is designed to work on any smartphone, even with
                limited internet connectivity. Data is stored locally and synchronised when a
                connection is available, making it practical for use in remote farming areas
                throughout Zimbabwe.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8: Getting Started */}
        <section id="getting-started" className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-6 text-[#2f7d32]">
                Getting Started with Precision Farming
              </h2>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                Adopting precision farming does not require a massive upfront investment or
                dramatic changes to your existing operations. The most effective approach is to
                start small, demonstrate value, and gradually expand. Here is a practical
                roadmap for Zimbabwean farmers looking to embrace precision agriculture.
              </p>
              <h3 className="text-xl font-bold mb-4 text-[#46586b] dark:text-slate-200">
                Step 1: Start with Digital Records
              </h3>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                The lowest-cost, highest-impact first step is to begin recording your farming
                activities digitally. Register for ClawnCore's Digital Farm Records platform and
                start logging your planting dates, input applications, and harvest data. This
                alone will improve your decision making by giving you a clear picture of what
                happened and what results you achieved.
              </p>
              <h3 className="text-xl font-bold mb-4 text-[#46586b] dark:text-slate-200">
                Step 2: Conduct a Baseline Soil Test
              </h3>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                Before you can improve your soil, you need to understand its current condition.
                Take soil samples from representative zones across each field and have them
                analysed. This baseline data will guide your fertilization strategy and highlight
                any limiting factors that are holding back your yields.
              </p>
              <h3 className="text-xl font-bold mb-4 text-[#46586b] dark:text-slate-200">
                Step 3: Schedule a Drone Scout
              </h3>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                Book a drone scouting session at a critical growth stage such as four to six weeks
                after planting. This will give you your first NDVI maps and field health reports,
                revealing issues you may not have noticed during walk-through inspections. Use
                these results to guide targeted interventions.
              </p>
              <h3 className="text-xl font-bold mb-4 text-[#46586b] dark:text-slate-200">
                Step 4: Implement Targeted Interventions
              </h3>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                Use the data from your records, soil tests, and drone scouting to make targeted
                decisions. Apply extra fertilizer only where soil tests show deficiency. Irrigate
                more in zones flagged as water-stressed. Investigate and treat pest hotspots
                identified by drone imagery. The key principle is: let the data guide you.
              </p>
              <h3 className="text-xl font-bold mb-4 text-[#46586b] dark:text-slate-200">
                Step 5: Measure and Iterate
              </h3>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                At the end of each season, review your records and compare actual yields against
                your expectations. Identify which precision farming interventions had the biggest
                impact. Use these lessons to refine your approach for the next season. Over time,
                this cycle of data, action, and review will drive continuous improvement on your
                farm.
              </p>
            </div>
          </div>
        </section>

        {/* Section 9: Tools and Resources */}
        <section id="tools-and-resources" className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-6 text-[#2f7d32]">
                Tools and Resources
              </h2>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-6">
                ClawnCore offers an integrated suite of precision farming tools designed for the
                Zimbabwean agricultural context. Each tool can be used independently or combined
                for maximum impact. Here is an overview of what is available.
              </p>
              <h3 className="text-xl font-bold mb-4 text-[#46586b] dark:text-slate-200">
                ClawnCore Smart Agriculture Platform
              </h3>
              <ul className="space-y-3 mb-6">
                {[
                  'Digital Farm Records: Free mobile app for recording all farming activities, inputs, and harvest data.',
                  'Drone Field Scouting: Professional drone surveys with multi-spectral imaging and NDVI analysis.',
                  'Crop Health Monitoring: Regular monitoring programmes with automated health alerts and trend tracking.',
                  'Soil Analytics: Comprehensive soil testing with digital reports and historical tracking.',
                  'Water Management: Soil moisture monitoring, irrigation scheduling, and water use analytics.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#2f7d32] mt-0.5 flex-shrink-0" />
                    <span className="text-[#46586b] dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
              <h3 className="text-xl font-bold mb-4 text-[#46586b] dark:text-slate-200">
                Additional Resources
              </h3>
              <ul className="space-y-3 mb-6">
                {[
                  'Zimbabwe Meteorological Services: Official weather data and forecasts for agricultural planning.',
                  'Agritex Extension Officers: Government agricultural extension services available in every district.',
                  'Local soil testing laboratories: Accredited laboratories for comprehensive soil analysis.',
                  'Agricultural cooperatives: Group purchasing and shared access to precision farming tools.',
                  'International resources: FAO and CGIAR precision agriculture guidelines adapted for African contexts.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#2f7d32] mt-0.5 flex-shrink-0" />
                    <span className="text-[#46586b] dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <p className="text-[#46586b] dark:text-slate-300 text-center mb-12 max-w-2xl mx-auto">
                Common questions about precision farming in Zimbabwe and how to get started.
              </p>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <span className="font-bold text-[#46586b] dark:text-slate-200 pr-4">
                        {faq.question}
                      </span>
                      {openFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-[#2f7d32] flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-[#2f7d32] flex-shrink-0" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-[#46586b] dark:text-slate-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-[#2f7d32] to-[#256828] text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-6">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Start with a free consultation and discover which precision farming tools are right
              for your operation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started">
                <Button className="h-12 px-8 bg-white text-[#2f7d32] hover:bg-gray-100 font-bold">
                  Book a Consultation
                </Button>
              </Link>
              <Link href="/platforms/smart-agriculture">
                <Button
                  variant="outline"
                  className="h-12 px-8 border-white/30 text-white hover:bg-white/10 font-bold"
                >
                  Explore the Platform
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <PersistentCTA />
    </div>
  );
}
