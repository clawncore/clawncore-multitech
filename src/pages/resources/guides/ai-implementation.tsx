import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, FAQSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Activity,
  Zap,
  Eye,
  LineChart,
  Settings,
  FileText,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const faqData = [
  {
    question: 'How much does it cost to implement AI in a Zimbabwean business?',
    answer:
      'Costs vary widely depending on scope. A basic AI-powered chatbot or analytics tool can start from $5,000-$15,000. Enterprise-grade solutions with custom models and integrations typically range from $30,000-$100,000+. ClawnCore offers tiered packages designed specifically for African businesses, with flexible payment options including mobile money.',
  },
  {
    question: 'Do I need a large team to adopt AI technology?',
    answer:
      'No. Modern AI tools are increasingly accessible to small teams. Many solutions can be managed by one or two people with the right training. ClawnCore provides managed AI services and training programmes so your team can adopt AI without hiring a full data science department.',
  },
  {
    question: 'How long does AI implementation typically take?',
    answer:
      'A simple AI integration such as a customer service chatbot can be deployed in 2-4 weeks. A full AI transformation programme covering data infrastructure, model development, and staff training typically takes 3-6 months. We recommend starting with a pilot project to demonstrate value before scaling.',
  },
  {
    question: 'Is AI relevant for small businesses in Zimbabwe?',
    answer:
      'Absolutely. AI is not just for large corporations. Small businesses benefit from AI-powered inventory management, automated bookkeeping, customer insights from sales data, and chatbots that handle customer queries 24/7. These tools reduce costs and free up time for growth-focused activities.',
  },
  {
    question: 'What industries in Zimbabwe benefit most from AI?',
    answer:
      'Agriculture, financial services, healthcare, telecommunications, mining, retail, and logistics are the top sectors seeing AI impact in Zimbabwe. Each has unique challenges — from crop prediction in farming to fraud detection in banking — that AI is uniquely positioned to address.',
  },
  {
    question: 'How does ClawnCore handle data privacy and AI ethics?',
    answer:
      'ClawnCore follows the Zimbabwe Data Protection Act (2022) and international best practices including GDPR principles. We implement data anonymisation, consent management, and bias monitoring in every AI solution. Our responsible AI framework ensures transparency and accountability at every stage.',
  },
];

const tocSections = [
  { id: 'what-is-ai', label: 'What is AI Implementation?' },
  { id: 'why-ai-matters', label: 'Why AI Matters for Zimbabwe' },
  { id: 'use-cases', label: 'Common AI Use Cases in Africa' },
  { id: 'data-preparation', label: 'Preparing Your Data for AI' },
  { id: 'building-models', label: 'Building Your First AI Model' },
  { id: 'ethics', label: 'AI Ethics and Responsible Use' },
  { id: 'industry-applications', label: 'AI for Agriculture, Finance, and Healthcare' },
  { id: 'getting-started', label: 'Getting Started with AI' },
  { id: 'checklist', label: 'AI Implementation Checklist' },
];

export default function AIImplementationGuide() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEO
        title="AI Implementation Guide: Artificial Intelligence for Zimbabwean Businesses"
        description="A comprehensive guide to artificial intelligence and machine learning for African businesses. Learn how to implement AI solutions in Zimbabwe's agriculture, finance, and healthcare sectors."
        keywords={[
          'AI implementation Zimbabwe',
          'artificial intelligence Africa',
          'machine learning Zimbabwe',
          'AI for African businesses',
          'AI agriculture Zimbabwe',
          'fintech AI Africa',
          'digital transformation Zimbabwe',
          'AI strategy Africa',
          'data science Zimbabwe',
          'ClawnCore AI solutions',
        ]}
      />
      <FAQSchema questions={faqData} />

      <div className="min-h-screen bg-white dark:bg-[#0b0714]">
        <Header />

        <Breadcrumbs
          items={[
            { name: 'Resources', url: '/resources' },
            { name: 'Guides', url: '/resources/guides' },
            { name: 'AI Implementation Guide', url: '/resources/guides/ai-implementation' },
          ]}
          className="max-w-5xl mx-auto px-4 pt-8"
        />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0b0714] to-[#1a0f2e] py-20 px-4">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#76B900]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#76B900]/5 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#76B900]/20 border border-[#76B900]/30 rounded-full px-4 py-2 mb-6">
              <Activity className="w-4 h-4 text-[#76B900]" />
              <span className="text-sm text-[#76B900] font-medium">Comprehensive Guide</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              AI Implementation Guide:{' '}
              <span className="text-[#76B900]">
                Artificial Intelligence for Zimbabwean Businesses
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              Everything you need to know about implementing AI and machine learning solutions in
              Zimbabwe and across Africa — from strategy and data preparation to deployment and
              ethical considerations.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#76B900] hover:bg-[#5a4cdb] text-white px-8 py-6 text-lg"
                asChild
              >
                <a href="#what-is-ai">Start Reading</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#76B900]/40 text-[#76B900] hover:bg-[#76B900]/10 px-8 py-6 text-lg"
                asChild
              >
                <Link href="/contact">Talk to an AI Expert</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="bg-slate-50 dark:bg-[#110d1f] border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-5xl mx-auto px-4 py-10">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#76B900]" />
              Table of Contents
            </h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {tocSections.map((section, idx) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-[#1a0f2e] border border-slate-200 dark:border-slate-700 hover:border-[#76B900] hover:shadow-md transition-all group"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#76B900]/10 text-[#76B900] text-sm font-bold flex items-center justify-center group-hover:bg-[#76B900] group-hover:text-white transition-colors">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-[#76B900] transition-colors">
                    {section.label}
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* Section 1: What is AI Implementation? */}
        <section id="what-is-ai" className="py-16 px-4 bg-white dark:bg-[#0b0714]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#76B900]/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#76B900]" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                What is AI Implementation?
              </h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                AI implementation is the process of integrating artificial intelligence technologies
                into your business operations, workflows, and decision-making processes. It goes
                beyond simply adopting a software tool — it involves fundamentally rethinking how your
                organisation leverages data, automation, and intelligent systems to create value.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                For businesses in Zimbabwe and across Africa, AI implementation encompasses a wide
                spectrum of activities: from deploying chatbots that handle customer enquiries in
                Shona, Ndebele, and English, to building predictive models that forecast crop yields
                based on weather patterns and soil data. It includes setting up the data
                infrastructure needed to feed these systems, training teams to work alongside AI
                tools, and establishing governance frameworks to ensure responsible use.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                At its core, AI implementation follows a structured approach: identifying business
                problems that AI can solve, assessing data readiness, selecting appropriate
                technologies, building or integrating solutions, and continuously monitoring and
                improving performance. It is not a one-time project but an ongoing journey of digital
                transformation.
              </p>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#76B900] flex-shrink-0 mt-0.5" />
                  <span>Identifies high-impact business problems solvable with AI</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#76B900] flex-shrink-0 mt-0.5" />
                  <span>Builds the data infrastructure and pipelines required for AI systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#76B900] flex-shrink-0 mt-0.5" />
                  <span>Selects, trains, and deploys machine learning models tailored to local contexts</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#76B900] flex-shrink-0 mt-0.5" />
                  <span>Establishes governance, monitoring, and ethical guidelines</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Why AI Matters for Zimbabwe */}
        <section id="why-ai-matters" className="py-16 px-4 bg-slate-50 dark:bg-[#110d1f]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#76B900]/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#76B900]" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Why AI Matters for Zimbabwe
              </h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Zimbabwe stands at a pivotal moment in its economic development. With a young,
                increasingly digital population, a growing mobile penetration rate exceeding 85%, and
                a vibrant entrepreneurial culture, the conditions are ripe for AI-driven
                transformation. The country's unique challenges — from agricultural volatility to
                financial inclusion gaps — are precisely the kinds of problems that AI excels at
                solving.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                According to the African Development Bank, AI could add $1.2 trillion to Africa's
                economy by 2030. For Zimbabwe specifically, AI presents opportunities to leapfrog
                traditional development stages. Rather than building legacy systems that other nations
                are now replacing, Zimbabwean businesses can adopt AI-native solutions from the
                outset — creating more agile, efficient, and competitive enterprises.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                The Zimbabwean government's National Development Strategy 1 (NDS1) emphasises
                digitalisation and innovation as pillars of economic recovery. AI aligns directly with
                these objectives, offering tools that can improve agricultural productivity, enhance
                financial services for the unbanked, strengthen healthcare delivery in rural areas, and
                optimise supply chains across the country's logistics network.
              </p>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#76B900] flex-shrink-0 mt-0.5" />
                  <span>
                    Mobile-first AI solutions can reach Zimbabwe's 85%+ mobile penetration rate
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#76B900] flex-shrink-0 mt-0.5" />
                  <span>AI can bridge gaps in healthcare access for rural communities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#76B900] flex-shrink-0 mt-0.5" />
                  <span>Precision agriculture AI can boost yields for the 60%+ of Zimbabweans in farming</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#76B900] flex-shrink-0 mt-0.5" />
                  <span>Fintech AI can expand financial inclusion for underserved populations</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Common AI Use Cases in Africa */}
        <section id="use-cases" className="py-16 px-4 bg-white dark:bg-[#0b0714]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#76B900]/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#76B900]" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Common AI Use Cases in Africa
              </h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Across the African continent, AI is already delivering tangible results in diverse
                sectors. Understanding these use cases helps Zimbabwean businesses identify where AI
                can create the most value for their specific operations. The key is not to replicate
                Silicon Valley solutions, but to develop context-appropriate applications that address
                Africa's unique challenges and leverage its distinct advantages.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                From Nairobi to Lagos, Johannesburg to Harare, businesses and startups are deploying
                AI solutions that work within African realities — limited infrastructure, diverse
                languages, informal economies, and mobile-first user behaviour. These use cases
                demonstrate that AI is not a luxury for developed markets but a practical tool for
                African innovation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="p-6 rounded-xl bg-gradient-to-br from-[#76B900]/5 to-[#76B900]/5 border border-[#76B900]/20">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                    Agricultural Intelligence
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li>- Crop disease detection via smartphone cameras</li>
                    <li>- Weather-based irrigation and planting recommendations</li>
                    <li>- Market price prediction for smallholder farmers</li>
                    <li>- Livestock health monitoring with IoT sensors</li>
                  </ul>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-[#76B900]/5 to-[#76B900]/5 border border-[#76B900]/20">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                    Financial Services
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li>- Credit scoring for the unbanked using alternative data</li>
                    <li>- Fraud detection in mobile money transactions</li>
                    <li>- Automated loan underwriting for SMEs</li>
                    <li>- Personalised savings and investment recommendations</li>
                  </ul>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-[#76B900]/5 to-[#76B900]/5 border border-[#76B900]/20">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                    Healthcare
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li>- Diagnostic support for rural clinics</li>
                    <li>- Medical image analysis (X-rays, pathology)</li>
                    <li>- Drug interaction checking and dosage optimisation</li>
                    <li>- Epidemic prediction and outbreak monitoring</li>
                  </ul>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-[#76B900]/5 to-[#76B900]/5 border border-[#76B900]/20">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                    Retail and Logistics
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li>- Demand forecasting for inventory management</li>
                    <li>- Route optimisation for last-mile delivery</li>
                    <li>- Chatbots in local languages for customer service</li>
                    <li>- Dynamic pricing for e-commerce platforms</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Preparing Your Data for AI */}
        <section id="data-preparation" className="py-16 px-4 bg-slate-50 dark:bg-[#110d1f]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#76B900]/10 flex items-center justify-center">
                <Settings className="w-5 h-5 text-[#76B900]" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Preparing Your Data for AI
              </h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Data is the foundation of every AI system. Without clean, well-structured, and
                representative data, even the most sophisticated AI models will produce unreliable
                results. For Zimbabwean businesses, data preparation often presents unique challenges
                — from managing data across multiple currencies and pricing systems to handling
                multilingual datasets and offline-to-online data synchronisation.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                The data preparation phase typically accounts for 60-80% of the total effort in an AI
                project. This is where most organisations stumble, not because the technology is too
                complex, but because their data is not ready. Investing time in proper data
                infrastructure and governance at this stage pays dividends throughout the entire AI
                lifecycle.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                For businesses just beginning their AI journey, start by auditing what data you
                already have. Many Zimbabwean companies are sitting on valuable data in their POS
                systems, ERP platforms, customer databases, and mobile money transaction records.
                The challenge is not always data quantity — it is data quality, accessibility, and
                organisation.
              </p>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#76B900] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Data Audit:</strong> Inventory all existing data sources — POS, ERP, CRM,
                    spreadsheets, mobile money platforms, and operational logs
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#76B900] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Data Cleaning:</strong> Remove duplicates, fix errors, standardise
                    formats, and handle missing values — especially important for multilingual
                    datasets
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#76B900] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Data Integration:</strong> Build pipelines that combine data from
                    different systems into a unified view, handling currency conversions and timezone
                    differences
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#76B900] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Data Governance:</strong> Establish policies for data quality, access
                    control, privacy compliance (Zimbabwe Data Protection Act), and retention
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#76B900] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Local Context Labelling:</strong> Ensure training data reflects local
                    conditions — crops, dialects, currencies, business practices, and regulatory
                    environments
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Building Your First AI Model */}
        <section id="building-models" className="py-16 px-4 bg-white dark:bg-[#0b0714]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#76B900]/10 flex items-center justify-center">
                <LineChart className="w-5 h-5 text-[#76B900]" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Building Your First AI Model
              </h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Building your first AI model can feel daunting, but modern tools and platforms have
                dramatically lowered the barrier to entry. You do not need a PhD in machine learning
                or a supercomputer in your basement. With cloud-based platforms, pre-trained models,
                and low-code AI tools, small and medium businesses in Zimbabwe can build
                functional AI solutions within weeks.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                The key is to start small and focused. Rather than attempting a company-wide AI
                transformation, identify one specific problem — say, predicting which customers are
                likely to churn, or automating invoice processing — and build a solution for that.
                This approach delivers quick wins, builds internal expertise, and creates a
                foundation for more ambitious AI projects.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                There are three primary approaches to building AI models, each with different
                requirements and timelines. Your choice depends on your budget, technical capability,
                and the complexity of the problem you are solving. Many successful AI implementations
                in Africa combine multiple approaches — using pre-trained models for common tasks
                while developing custom models for domain-specific challenges.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="p-6 rounded-xl border-2 border-[#76B900]/20 bg-[#76B900]/5">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    No-Code / Low-Code
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                    Use platforms like Google AutoML, Microsoft Power AI, or Hugging Face to build
                    models with minimal coding. Best for quick prototypes and standard tasks.
                  </p>
                  <span className="text-xs font-semibold text-[#76B900] uppercase">
                    Timeline: 1-2 weeks
                  </span>
                </div>
                <div className="p-6 rounded-xl border-2 border-[#76B900]/40 bg-[#76B900]/10">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    Pre-Trained + Fine-Tuned
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                    Take existing models and fine-tune them on your data. This approach leverages
                    billions of parameters already learned and adapts them to your specific context.
                  </p>
                  <span className="text-xs font-semibold text-[#76B900] uppercase">
                    Timeline: 2-6 weeks
                  </span>
                </div>
                <div className="p-6 rounded-xl border-2 border-[#76B900] bg-[#76B900]/15">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    Custom Models
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                    Build models from scratch tailored to your unique data and requirements. Ideal
                    for complex, domain-specific problems where off-the-shelf solutions fall short.
                  </p>
                  <span className="text-xs font-semibold text-[#76B900] uppercase">
                    Timeline: 2-4 months
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: AI Ethics and Responsible Use */}
        <section id="ethics" className="py-16 px-4 bg-slate-50 dark:bg-[#110d1f]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#76B900]/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#76B900]" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                AI Ethics and Responsible Use
              </h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                As AI becomes more prevalent in Zimbabwean businesses, ethical considerations must
                be at the forefront of every implementation. Responsible AI is not just a compliance
                checkbox — it is a business imperative. Customers, employees, and regulators are
                increasingly aware of AI's potential for bias, privacy violations, and unintended
                consequences. Businesses that proactively address these concerns build trust and
                long-term competitive advantage.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                The Zimbabwe Data Protection Act (2022) establishes clear requirements for how
                personal data must be collected, processed, and stored. Any AI system that handles
                customer or employee data must comply with these regulations. Beyond legal compliance,
                ethical AI practices align with global standards like the EU's AI Act and the African
                Union's AI Strategy, positioning Zimbabwean businesses for regional and international
                partnerships.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Bias in AI systems is a particular concern in diverse, multilingual societies like
                Zimbabwe. If training data does not adequately represent all demographic groups, the
                resulting AI models may perform poorly for certain populations — for example, a credit
                scoring model that penalises customers from specific regions or a diagnostic AI that is
                less accurate for certain skin tones. Proactive bias testing and mitigation must be
                built into the AI development process from day one.
              </p>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#76B900] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Transparency:</strong> Make clear to users when they are interacting
                    with AI, and explain how AI-driven decisions are made
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#76B900] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Fairness:</strong> Regularly audit AI systems for bias across gender,
                    age, region, language, and socioeconomic status
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#76B900] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Privacy:</strong> Implement data minimisation, anonymisation, and consent
                    management in compliance with the Zimbabwe Data Protection Act
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#76B900] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Accountability:</strong> Assign clear ownership for AI outcomes and
                    establish human-in-the-loop processes for high-stakes decisions
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 7: AI for Agriculture, Finance, and Healthcare */}
        <section id="industry-applications" className="py-16 px-4 bg-white dark:bg-[#0b0714]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#76B900]/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#76B900]" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                AI for Agriculture, Finance, and Healthcare
              </h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Zimbabwe's economy rests on three pillars where AI is poised to deliver
                transformational impact. Agriculture employs over 60% of the population, financial
                services are rapidly digitising through mobile money, and healthcare systems face
                critical capacity constraints. In each of these sectors, AI offers solutions that are
                not just technically feasible but economically compelling and socially vital.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                Agriculture: From Subsistence to Precision
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Zimbabwe's agricultural sector faces a perfect storm of challenges: climate
                variability, limited access to modern inputs, fragmented markets, and post-harvest
                losses estimated at 30-40%. AI can address each of these challenges systematically.
                Computer vision models can identify crop diseases from smartphone photos, helping
                farmers take corrective action before losses mount. Predictive analytics can optimise
                planting schedules based on weather forecasts and soil conditions. And AI-powered
                market intelligence platforms can connect smallholder farmers directly to buyers,
                eliminating exploitative middlemen.
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                <li>- Satellite imagery analysis for crop health monitoring at scale</li>
                <li>- AI-powered advisory services delivered via SMS or WhatsApp in local languages</li>
                <li>- Automated quality grading for tobacco, cotton, and horticultural exports</li>
                <li>- Supply chain optimisation to reduce post-harvest losses</li>
              </ul>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                Finance: Intelligent Inclusion
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Zimbabwe's financial landscape is uniquely dynamic — with EcoCash processing billions
                of dollars annually and a growing fintech ecosystem. AI is the key to extending
                financial services to the estimated 70% of adults who remain underbanked. Machine
                learning models can assess creditworthiness using alternative data — mobile money
                transaction patterns, utility payment histories, and social connections — enabling
                responsible lending to individuals and SMEs who lack traditional credit histories.
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                <li>- Alternative credit scoring using mobile money and utility payment data</li>
                <li>- Real-time fraud detection across mobile money networks</li>
                <li>- AI-powered chatbots for banking services in Shona, Ndebele, and English</li>
                <li>- Automated compliance monitoring for evolving financial regulations</li>
              </ul>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                Healthcare: Augmented Care Delivery
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Zimbabwe has approximately 1.6 doctors per 10,000 people — far below the WHO
                recommended ratio. AI cannot replace healthcare workers, but it can dramatically
                extend their reach and effectiveness. AI-powered diagnostic tools can assist nurses
                and clinical officers in rural health centres, ensuring patients receive accurate
                assessments even when specialists are unavailable. Predictive models can anticipate
                disease outbreaks, enabling proactive resource allocation.
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                <li>- AI-assisted diagnostic support for under-resourced clinics</li>
                <li>- Medical image analysis for radiology and pathology</li>
                <li>- Drug interaction checking and dosage optimisation systems</li>
                <li>- Epidemic surveillance and early warning systems</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 8: Getting Started with AI */}
        <section id="getting-started" className="py-16 px-4 bg-slate-50 dark:bg-[#110d1f]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#76B900]/10 flex items-center justify-center">
                <Settings className="w-5 h-5 text-[#76B900]" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Getting Started with AI
              </h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                The most successful AI implementations share a common trait: they start with a clear
                business problem, not a technology solution. Before investing in AI infrastructure or
                hiring data scientists, take the time to map your organisation's pain points,
                inefficiencies, and opportunities. Which processes consume the most time? Where do
                human errors cause the most costly mistakes? What decisions could benefit from
                better data analysis? These questions will guide you to your highest-impact AI use
                cases.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Building internal AI capability is essential for long-term success. This does not
                mean every employee needs to learn to code — it means developing AI literacy across
                your organisation. Your marketing team should understand what AI can and cannot do
                for customer segmentation. Your operations team should know how to interpret AI-driven
                demand forecasts. Your leadership team should be able to evaluate AI investments
                critically and set realistic expectations.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Partner with experienced AI practitioners who understand the Zimbabwean and African
                context. Generic AI solutions designed for Western markets often fail in local
                conditions — different data patterns, infrastructure constraints, regulatory
                requirements, and user expectations. Working with a technology partner like
                ClawnCore, which has deep expertise in the Zimbabwean market, ensures your AI
                implementation is built on a foundation of local understanding and global best
                practices.
              </p>
              <div className="p-6 rounded-xl bg-gradient-to-r from-[#76B900]/10 to-[#76B900]/10 border border-[#76B900]/20 my-8">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  Recommended First Steps
                </h3>
                <ol className="space-y-3 text-slate-600 dark:text-slate-300 list-decimal list-inside">
                  <li>
                    <strong>Problem Discovery Workshop:</strong> Facilitate sessions to identify and
                    prioritise AI opportunities across your organisation
                  </li>
                  <li>
                    <strong>Data Readiness Assessment:</strong> Evaluate your existing data
                    infrastructure, quality, and governance practices
                  </li>
                  <li>
                    <strong>Pilot Project:</strong> Select one high-impact, low-complexity use case
                    and build a minimum viable AI solution within 6-8 weeks
                  </li>
                  <li>
                    <strong>Impact Measurement:</strong> Define clear KPIs before the pilot and
                    measure results against your baseline
                  </li>
                  <li>
                    <strong>Scale and Iterate:</strong> Use pilot learnings to refine your approach
                    and expand AI across additional use cases
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: AI Implementation Checklist */}
        <section id="checklist" className="py-16 px-4 bg-white dark:bg-[#0b0714]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#76B900]/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[#76B900]" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                AI Implementation Checklist
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              Use this checklist to track your organisation's progress through each phase of AI
              implementation. Each item represents a critical milestone that ensures your AI
              initiative is built on solid foundations and positioned for long-term success.
            </p>
            <div className="space-y-4">
              {[
                {
                  phase: 'Strategy & Planning',
                  items: [
                    'Identified 3-5 high-impact AI use cases aligned with business objectives',
                    'Secured executive sponsorship and allocated budget',
                    'Defined success metrics and ROI targets for AI initiatives',
                    'Assessed build vs. buy vs. partner decisions for each use case',
                  ],
                },
                {
                  phase: 'Data Readiness',
                  items: [
                    'Completed comprehensive data audit across all systems',
                    'Established data quality standards and cleaning processes',
                    'Implemented data governance policies compliant with Zimbabwe Data Protection Act',
                    'Built data integration pipelines connecting key data sources',
                  ],
                },
                {
                  phase: 'Technology & Infrastructure',
                  items: [
                    'Selected cloud platform(s) with appropriate pricing for Zimbabwe market',
                    'Set up development and testing environments',
                    'Established model training and deployment infrastructure',
                    'Implemented security protocols for data and model protection',
                  ],
                },
                {
                  phase: 'Development & Deployment',
                  items: [
                    'Built and validated pilot AI model with local data',
                    'Conducted bias testing across demographic groups',
                    'Developed user interfaces and integrations for end users',
                    'Established monitoring and alerting systems for production AI',
                  ],
                },
                {
                  phase: 'People & Culture',
                  items: [
                    'Provided AI literacy training to all relevant staff',
                    'Hired or contracted AI specialists with local market expertise',
                    'Established cross-functional AI governance committee',
                    'Created feedback loops between AI users and development team',
                  ],
                },
                {
                  phase: 'Scale & Optimisation',
                  items: [
                    'Measured pilot results against predefined KPIs',
                    'Documented lessons learned and best practices',
                    'Developed roadmap for expanding AI across additional use cases',
                    'Continuously monitored model performance and retrained as needed',
                  ],
                },
              ].map((phase) => (
                <div
                  key={phase.phase}
                  className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#1a0f2e]"
                >
                  <h3 className="text-lg font-bold text-[#76B900] mb-4">{phase.phase}</h3>
                  <ul className="space-y-3">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded border-2 border-[#76B900]/30 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 dark:text-slate-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-slate-50 dark:bg-[#110d1f]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-[#76B900]/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#76B900]" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a0f2e] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="text-lg font-semibold text-slate-900 dark:text-white pr-4">
                      {faq.question}
                    </span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-[#76B900] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 bg-gradient-to-br from-[#0b0714] to-[#1a0f2e]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
              ClawnCore Multitech helps Zimbabwean businesses harness the power of artificial
              intelligence. From strategy to implementation, we provide end-to-end AI solutions
              tailored to the African context.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#76B900] hover:bg-[#5a4cdb] text-white px-8 py-6 text-lg"
                asChild
              >
                <Link href="/contact">Book a Free AI Consultation</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#76B900]/40 text-[#76B900] hover:bg-[#76B900]/10 px-8 py-6 text-lg"
                asChild
              >
                <Link href="/resources/guides">Explore More Guides</Link>
              </Button>
            </div>
          </div>
        </section>

        <PersistentCTA />
        <Footer />
      </div>
    </>
  );
}
