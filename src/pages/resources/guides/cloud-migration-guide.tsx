import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, FAQSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Cloud, Server, Database, Lock, ArrowRight, CheckCircle, ChevronDown, ChevronUp, Wifi } from 'lucide-react';

const tocItems = [
  { id: 'what-is-cloud-migration', label: 'What is Cloud Migration?' },
  { id: 'why-cloud-zimbabwe', label: 'Why Cloud Matters for Zimbabwe' },
  { id: 'types-of-cloud-services', label: 'Types of Cloud Services' },
  { id: 'planning-migration', label: 'Planning Your Cloud Migration' },
  { id: 'choosing-provider', label: 'Choosing the Right Cloud Provider' },
  { id: 'cloud-security', label: 'Cloud Security Best Practices' },
  { id: 'cloud-cost-optimization', label: 'Cloud Cost Optimization' },
  { id: 'getting-started', label: 'Getting Started with Cloud' },
  { id: 'migration-checklist', label: 'Cloud Migration Checklist' },
  { id: 'faq', label: 'Frequently Asked Questions' },
];

const faqData = [
  {
    question: 'How long does cloud migration typically take for a Zimbabwean SME?',
    answer:
      'The timeline depends on the size of your organization and the complexity of your existing systems. A small business with basic email and file storage can migrate within 2 to 4 weeks. Larger organizations with databases, custom applications, and multiple departments may take 3 to 6 months. ClawnCore Multitech works with you to create a realistic migration timeline that minimizes disruption to your daily operations.',
  },
  {
    question: 'Is cloud migration expensive for businesses in Zimbabwe?',
    answer:
      'Cloud migration is often more affordable than maintaining on-premise servers, especially when you factor in electricity costs, hardware maintenance, IT staff, and security expenses. Most Zimbabwean SMEs spend between $50 and $500 per month on cloud services depending on their needs. The pay-as-you-go model means you only pay for what you use, and you avoid large upfront capital expenditure on server hardware.',
  },
  {
    question: 'What happens to our data during migration? Is it safe?',
    answer:
      'Data security during migration is a top priority. Your data is encrypted during transfer, and we maintain full backups of your original data until migration is verified and confirmed. No data is lost during the process. ClawnCore Multitech uses secure transfer protocols and follows international best practices for data migration. You maintain full ownership of your data at all times.',
  },
  {
    question: 'Can we migrate if our internet connection is unreliable?',
    answer:
      'Yes. We design migration plans that account for Zimbabwean internet realities. This includes using compressed data transfers, scheduling migrations during stable connectivity windows, using offline-capable cloud sync tools, and setting up local caching so your team can work even when connectivity drops. Hybrid cloud solutions are especially effective in areas with inconsistent internet.',
  },
  {
    question: 'Do we need technical staff to manage cloud systems after migration?',
    answer:
      'Not necessarily. ClawnCore Multitech provides managed cloud services where we handle updates, security patches, backups, and monitoring on your behalf. Your team can focus on their work while we ensure the infrastructure runs smoothly. We also provide training so your staff can perform basic tasks like adding users, managing files, and monitoring usage.',
  },
  {
    question: 'What cloud services are most useful for Zimbabwean organizations?',
    answer:
      'The most impactful cloud services for Zimbabwean organizations include cloud email and collaboration tools (replacing local email servers), cloud storage and backup (protecting against theft, fire, and hardware failure), cloud-hosted websites and applications (ensuring online presence stays available), database hosting (for business-critical data), and cloud-based enterprise resource planning (for managing operations, inventory, and finances).',
  },
  {
    question: 'How does cloud migration help with compliance and data protection?',
    answer:
      'Cloud platforms offer built-in compliance features including data encryption at rest and in transit, access logging and audit trails, automated backups with retention policies, role-based access controls, and data residency options. These features help organizations comply with data protection regulations and industry standards without building complex infrastructure from scratch.',
  },
];

const migrationPhases = [
  {
    phase: '1. Assessment',
    description: 'Inventory all current systems, data, applications, and infrastructure. Identify what needs to move, what can be retired, and what requires reconfiguration.',
  },
  {
    phase: '2. Planning',
    description: 'Define migration goals, choose cloud services, create a timeline, allocate budget, and identify risks. Establish success criteria and rollback procedures.',
  },
  {
    phase: '3. Pilot Migration',
    description: 'Start with a low-risk workload to test your migration process, validate connectivity, and train your team. Learn from the pilot before migrating critical systems.',
  },
  {
    phase: '4. Full Migration',
    description: 'Execute the migration plan in phases, starting with less critical systems and progressing to core business applications. Monitor performance and user experience throughout.',
  },
  {
    phase: '5. Optimization',
    description: 'After migration, optimize cloud resources for cost and performance. Fine-tune configurations, eliminate unused resources, and implement monitoring dashboards.',
  },
];

const checklistItems = [
  'Complete inventory of all current IT systems, applications, and data',
  'Document current costs including hardware, electricity, maintenance, and IT staff',
  'Identify critical applications and data that must remain available during migration',
  'Define security requirements and access control policies for cloud systems',
  'Choose a cloud provider and service tier that matches your budget and needs',
  'Establish internet redundancy or failover connectivity for cloud access',
  'Set up cloud accounts, billing, and administrative access',
  'Migrate email and collaboration tools first for quick wins and team familiarity',
  'Migrate file storage and shared drives with proper folder structure and permissions',
  'Migrate databases with full testing of application connectivity',
  'Migrate websites and web applications with DNS propagation planning',
  'Configure backup policies and disaster recovery procedures',
  'Set up monitoring, alerting, and usage tracking dashboards',
  'Train staff on new cloud tools and workflows',
  'Decommission old on-premise hardware and revoke legacy access',
  'Document all cloud configurations, credentials, and procedures',
];

const providerComparison = [
  {
    name: 'AWS (Amazon Web Services)',
    strengths: 'Largest global network, extensive service catalog, strong African presence with Cape Town region',
    bestFor: 'Organizations needing maximum flexibility, global reach, and a wide range of services',
    consideration: 'Complex pricing model, may require dedicated cloud expertise',
  },
  {
    name: 'Microsoft Azure',
    strengths: 'Deep integration with Microsoft 365 and Office tools, hybrid cloud capabilities, strong enterprise support',
    bestFor: 'Organizations already using Microsoft products (most Zimbabwean businesses and government)',
    consideration: 'Best value when bundled with Microsoft 365 licenses',
  },
  {
    name: 'Google Cloud Platform',
    strengths: 'Strong in data analytics, machine learning, and Kubernetes. Competitive pricing and generous free tier',
    bestFor: 'Data-driven organizations and those building modern cloud-native applications',
    consideration: 'Smaller African footprint compared to AWS and Azure',
  },
  {
    name: 'Africa-Focused Providers',
    strengths: 'Local support, data residency in Africa, understanding of African business needs and connectivity',
    bestFor: 'Organizations prioritizing local data sovereignty and African-based support teams',
    consideration: 'Smaller service catalog, may need to supplement with global providers for some services',
  },
];

const costOptimizationTips = [
  {
    title: 'Right-size your resources',
    description: 'Monitor actual usage and adjust server sizes accordingly. Many organizations over-provision cloud resources, paying for capacity they never use.',
  },
  {
    title: 'Use auto-scaling',
    description: 'Configure automatic scaling so resources increase during peak demand and decrease during quiet periods. This prevents paying for idle capacity.',
  },
  {
    title: 'Leverage reserved instances',
    description: 'For predictable workloads, commit to 1-year or 3-year reserved instances for significant discounts of up to 70% compared to pay-as-you-go pricing.',
  },
  {
    title: 'Implement lifecycle policies',
    description: 'Automatically move old data to cheaper storage tiers and delete data that is no longer needed. This reduces storage costs significantly over time.',
  },
  {
    title: 'Monitor and alert on spending',
    description: 'Set up budget alerts so you are notified before costs exceed expectations. Review cloud spending monthly and optimize based on actual usage patterns.',
  },
];

export default function CloudMigrationGuide() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Cloud Migration Guide: Moving Your Business to the Cloud"
        description="A comprehensive guide to cloud infrastructure, migration, and hosting for Zimbabwean and African organizations. Learn how to plan, execute, and optimize your cloud migration with practical strategies for the African context."
        keywords={[
          'cloud migration Zimbabwe',
          'cloud hosting Africa',
          'cloud infrastructure guide',
          'moving business to cloud Zimbabwe',
          'cloud migration Africa',
          'business cloud solutions Zimbabwe',
          'cloud computing guide Africa',
          'IT infrastructure modernization Zimbabwe',
          'cloud services SME Africa',
          'cloud cost optimization',
        ]}
        ogImage="/og-cloud-migration-guide.png"
      />
      <FAQSchema questions={faqData} />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#060b14] to-[#0c1929] py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <Breadcrumbs
              items={[
                { name: 'Home', url: '/' },
                { name: 'Resources', url: '/resources' },
                { name: 'Guides', url: '/resources/guides' },
                { name: 'Cloud Migration Guide', url: '/resources/guides/cloud-migration-guide' },
              ]}
              className="mb-8"
            />

            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <Cloud className="h-6 w-6 text-[#2563eb]" />
                <span className="text-sm font-semibold uppercase tracking-wider text-[#2563eb]">
                  Pillar Guide
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Cloud Migration Guide: Moving Your Business to{' '}
                <span className="text-[#93c5fd]">the Cloud</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-slate-300 leading-relaxed mb-8">
                A comprehensive guide to cloud infrastructure, migration, and hosting for
                Zimbabwean and African organizations. Practical strategies, provider comparisons,
                and step-by-step checklists for every stage of your cloud journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#what-is-cloud-migration">
                  <Button className="h-12 px-8 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold">
                    Start Reading
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <a href="#migration-checklist">
                  <Button variant="outline" className="h-12 px-8 font-bold">
                    Jump to Checklist
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-12 sm:py-16 bg-white dark:bg-cc-card border-b border-gray-200 dark:border-white/10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">Table of Contents</h2>
              <nav className="grid sm:grid-cols-2 gap-3">
                {tocItems.map((item, index) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 dark:text-slate-300 group-hover:text-[#2563eb] transition-colors font-medium">
                      {item.label}
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </section>

        {/* Section 1: What is Cloud Migration? */}
        <section id="what-is-cloud-migration" className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <Cloud className="h-8 w-8 text-[#2563eb]" />
                <span className="text-sm font-semibold uppercase tracking-wider text-[#2563eb]">
                  Section 1
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-6">What is Cloud Migration?</h2>

              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                Cloud migration is the process of moving your organization's digital assets —
                including applications, data, email, websites, and IT infrastructure — from
                on-premise servers and local computers to cloud-based platforms hosted by
                professional data center providers. Instead of buying, maintaining, and securing
                your own server hardware, you rent computing power, storage, and services from
                cloud providers who specialize in keeping systems running reliably and securely.
              </p>

              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                For Zimbabwean organizations, cloud migration represents a fundamental shift from
                the traditional model of owning and operating physical servers in the office. The
                old approach required significant upfront investment in hardware, ongoing costs for
                electricity (a major concern in Zimbabwe), dedicated IT staff for maintenance, and
                physical security for the server room. Cloud migration eliminates most of these
                burdens by shifting responsibility to the cloud provider.
              </p>

              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                Cloud migration is not a single event but a strategic process. It typically
                involves assessing your current IT landscape, planning the migration in phases,
                testing cloud services with low-risk workloads first, and then progressively
                moving more critical systems. Organizations can choose to move everything at once
                (a "lift-and-shift" approach) or take a more gradual path, modernizing applications
                as they migrate to take full advantage of cloud capabilities.
              </p>

              <div className="bg-gray-100 dark:bg-white/5 rounded-2xl p-6 sm:p-8 mt-8">
                <h3 className="text-xl font-bold mb-4">Common Cloud Migration Scenarios</h3>
                <ul className="space-y-3">
                  {[
                    'Moving email from a local Exchange server to Microsoft 365 or Google Workspace',
                    'Migrating file shares from a NAS device to cloud storage like SharePoint, OneDrive, or Google Drive',
                    'Moving a website from a local server to a cloud hosting provider',
                    'Transferring databases from on-premise SQL servers to managed cloud database services',
                    'Replacing custom-built applications with cloud-based SaaS alternatives',
                    'Moving entire server environments to Infrastructure-as-a-Service (IaaS) platforms',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-slate-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Why Cloud Matters for Zimbabwe */}
        <section id="why-cloud-zimbabwe" className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <Wifi className="h-8 w-8 text-[#2563eb]" />
                <span className="text-sm font-semibold uppercase tracking-wider text-[#2563eb]">
                  Section 2
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-6">
                Why Cloud Matters for Zimbabwe
              </h2>

              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                Zimbabwe presents unique challenges and opportunities that make cloud migration
                particularly valuable. The country's evolving power infrastructure means
                organizations face intermittent electricity supply, making it costly and
                unreliable to keep servers running 24/7 in the office. Cloud data centers,
                by contrast, operate on industrial-grade power systems with multiple generators,
                battery backups, and redundant power feeds — ensuring your systems stay online
                even when the grid does not.
              </p>

              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                The cost dynamics also strongly favor cloud for most Zimbabwean SMEs. Running an
                on-premise server involves not just the initial hardware purchase (often $3,000 to
                $15,000 for a proper setup), but also ongoing costs for electricity, cooling,
                physical security, hardware replacement every 3 to 5 years, and IT staff salaries.
                When you add these up, many organizations find that a cloud solution costing
                $100 to $500 per month delivers better reliability, security, and performance
                than their existing on-premise infrastructure.
              </p>

              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                Data loss is another critical concern. Many Zimbabwean organizations still store
                important records on a single computer, a USB drive, or an unbackuped local
                server. A hardware failure, theft, fire, or ransomware attack can wipe out years
                of business records, financial data, and customer information. Cloud storage with
                automatic backups and redundancy eliminates this risk entirely — your data is
                replicated across multiple locations and can be restored instantly from any device
                with an internet connection.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-100 dark:bg-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <Server className="h-5 w-5 text-[#2563eb]" />
                    Reliability
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                    Cloud providers guarantee 99.9% or higher uptime through redundant infrastructure,
                    automatic failover, and geographic distribution — far more reliable than any single
                    office server.
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <Lock className="h-5 w-5 text-[#2563eb]" />
                    Security
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                    Enterprise-grade encryption, access controls, and monitoring that most
                    Zimbabwean SMEs could never afford to implement on their own infrastructure.
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <Database className="h-5 w-5 text-[#2563eb]" />
                    Scalability
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                    Start small and grow as your organization grows. No need to buy expensive
                    servers "just in case" — add resources when you actually need them.
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-[#2563eb]" />
                    Accessibility
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                    Enable remote work, multi-branch operations, and field access — your team can
                    work from anywhere with an internet connection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Types of Cloud Services */}
        <section id="types-of-cloud-services" className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-8 w-8 text-[#2563eb]" />
                <span className="text-sm font-semibold uppercase tracking-wider text-[#2563eb]">
                  Section 3
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-6">
                Types of Cloud Services
              </h2>

              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                Understanding the different types of cloud services is essential for making the
                right decisions about your migration. Cloud services are generally categorized
                into three layers, each offering different levels of control, responsibility, and
                complexity. The right choice depends on your organization's technical expertise,
                budget, and specific needs.
              </p>

              <div className="space-y-6 mt-8">
                {/* IaaS */}
                <div className="border border-gray-200 dark:border-white/10 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Server className="h-6 w-6 text-[#2563eb]" />
                    <h3 className="text-xl font-bold">Infrastructure as a Service (IaaS)</h3>
                  </div>
                  <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-4">
                    IaaS provides virtual computing resources over the internet. Instead of buying
                    physical servers, you rent virtual machines, storage, and networking on a
                    pay-as-you-go basis. You have full control over the operating system, applications,
                    and data, but the cloud provider manages the underlying physical hardware,
                    networking, and data center facilities.
                  </p>
                  <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-4">
                    This model is ideal for organizations that need flexibility and control but want
                    to avoid the capital expense of buying server hardware. Common IaaS use cases
                    include hosting custom applications, running database servers, development and
                    testing environments, and handling variable workloads that need to scale up and
                    down.
                  </p>
                  <div className="bg-[#2563eb]/5 rounded-xl p-4">
                    <p className="text-sm font-semibold text-[#2563eb] mb-2">Examples:</p>
                    <p className="text-gray-600 dark:text-slate-400 text-sm">
                      AWS EC2, Microsoft Azure Virtual Machines, Google Compute Engine, DigitalOcean Droplets
                    </p>
                  </div>
                </div>

                {/* PaaS */}
                <div className="border border-gray-200 dark:border-white/10 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Cloud className="h-6 w-6 text-[#2563eb]" />
                    <h3 className="text-xl font-bold">Platform as a Service (PaaS)</h3>
                  </div>
                  <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-4">
                    PaaS provides a complete development and deployment environment in the cloud.
                    The provider manages the infrastructure (servers, storage, networking) and the
                    platform (operating systems, middleware, databases), allowing your team to focus
                    purely on building and deploying applications without worrying about
                    underlying infrastructure management.
                  </p>
                  <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-4">
                    PaaS is particularly valuable for organizations that develop custom software
                    or want to modernize their applications without investing in infrastructure
                    management. It accelerates development cycles and reduces the operational
                    burden on IT teams.
                  </p>
                  <div className="bg-[#2563eb]/5 rounded-xl p-4">
                    <p className="text-sm font-semibold text-[#2563eb] mb-2">Examples:</p>
                    <p className="text-gray-600 dark:text-slate-400 text-sm">
                      Azure App Service, Google App Engine, AWS Elastic Beanstalk, Heroku, Vercel
                    </p>
                  </div>
                </div>

                {/* SaaS */}
                <div className="border border-gray-200 dark:border-white/10 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-[#2563eb]" />
                    <h3 className="text-xl font-bold">Software as a Service (SaaS)</h3>
                  </div>
                  <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-4">
                    SaaS delivers fully functional software applications over the internet on a
                    subscription basis. Users access the software through a web browser or mobile
                    app with no installation, maintenance, or infrastructure management required.
                    The provider handles everything from server maintenance to software updates,
                    security patches, and uptime.
                  </p>
                  <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-4">
                    SaaS is the most accessible cloud model for most Zimbabwean organizations
                    because it requires no technical expertise to use and delivers immediate value.
                    This is often the starting point for cloud migration — replacing local email
                    servers with cloud email, moving from desktop office suites to cloud-based
                    collaboration tools, or adopting cloud-based business management software.
                  </p>
                  <div className="bg-[#2563eb]/5 rounded-xl p-4">
                    <p className="text-sm font-semibold text-[#2563eb] mb-2">Examples:</p>
                    <p className="text-gray-600 dark:text-slate-400 text-sm">
                      Microsoft 365, Google Workspace, Salesforce, Slack, Zoom, Xero accounting, ClawnCore platforms
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Planning Your Cloud Migration */}
        <section id="planning-migration" className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-8 w-8 text-[#2563eb]" />
                <span className="text-sm font-semibold uppercase tracking-wider text-[#2563eb]">
                  Section 4
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-6">
                Planning Your Cloud Migration
              </h2>

              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                Successful cloud migration starts with thorough planning. Rushing into migration
                without a clear strategy is the most common cause of failed or painful transitions.
                The planning phase helps you understand what you have, define what you need,
                identify potential risks, and create a roadmap that minimizes disruption to your
                daily operations. For Zimbabwean organizations, planning must also account for
                internet connectivity realities, power considerations, and budget constraints.
              </p>

              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                Start by conducting a comprehensive audit of your current IT environment. Document
                every server, application, database, website, email system, and file share your
                organization uses. For each system, record its purpose, who uses it, how critical
                it is to daily operations, what data it stores, and what it currently costs to
                maintain. This inventory becomes the foundation of your migration plan.
              </p>

              <h3 className="text-2xl font-bold mb-6">The Five Phases of Cloud Migration</h3>

              <div className="space-y-4">
                {migrationPhases.map((phase, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-5 rounded-xl bg-gray-100 dark:bg-white/5"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{phase.phase}</h4>
                      <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#2563eb]/5 border border-[#2563eb]/20 rounded-2xl p-6 sm:p-8 mt-8">
                <h3 className="text-xl font-bold mb-3">Migration Strategy Tip</h3>
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                  Adopt the "crawl, walk, run" approach. Begin with the simplest, lowest-risk
                  migration — typically email and file storage. Once your team is comfortable with
                  cloud tools, move to more complex systems like databases and custom applications.
                  This phased approach builds confidence, reduces risk, and allows you to learn
                  from each migration step before tackling the next.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Choosing the Right Cloud Provider */}
        <section id="choosing-provider" className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <Server className="h-8 w-8 text-[#2563eb]" />
                <span className="text-sm font-semibold uppercase tracking-wider text-[#2563eb]">
                  Section 5
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-6">
                Choosing the Right Cloud Provider
              </h2>

              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                Selecting the right cloud provider is one of the most important decisions in your
                migration journey. The major global providers — Amazon Web Services (AWS),
                Microsoft Azure, and Google Cloud Platform (GCP) — all offer extensive services,
                but they differ in pricing models, strengths, existing integrations, and presence
                in Africa. Additionally, Africa-focused cloud providers are emerging with localized
                services, support, and data residency options that may be attractive for certain
                organizations.
              </p>

              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                For most Zimbabwean organizations, Microsoft Azure is often the most natural fit
                because the majority of businesses already use Microsoft products — Windows
                computers, Microsoft Office, and Outlook email. Azure integrates seamlessly with
                these tools, and Microsoft 365 Business plans bundle cloud email, storage, and
                collaboration tools at competitive prices. This existing familiarity reduces
                training costs and accelerates adoption.
              </p>

              <div className="space-y-4 mt-8">
                {providerComparison.map((provider, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-white/10 rounded-2xl p-6"
                  >
                    <h3 className="text-lg font-bold mb-3">{provider.name}</h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#2563eb] mb-1">
                          Strengths
                        </p>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                          {provider.strengths}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#2563eb] mb-1">
                          Best For
                        </p>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                          {provider.bestFor}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#2563eb] mb-1">
                          Consideration
                        </p>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                          {provider.consideration}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-100 dark:bg-white/5 rounded-2xl p-6 sm:p-8 mt-8">
                <h3 className="text-xl font-bold mb-4">Key Selection Criteria</h3>
                <ul className="space-y-3">
                  {[
                    'Pricing and billing transparency — understand exactly what you will pay each month',
                    'Data residency options — can you choose where your data is stored for compliance?',
                    'Existing tool integration — does the provider work well with your current software?',
                    'Local support availability — can you get help from support staff who understand your context?',
                    'Scalability options — can the provider grow with your organization?',
                    'Free tier and trial availability — test the platform before committing',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-slate-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Cloud Security Best Practices */}
        <section id="cloud-security" className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-8 w-8 text-[#2563eb]" />
                <span className="text-sm font-semibold uppercase tracking-wider text-[#2563eb]">
                  Section 6
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-6">
                Cloud Security Best Practices
              </h2>

              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                Security is often the top concern when organizations consider moving to the cloud.
                The reality is that cloud platforms typically offer far better security than what
                most Zimbabwean SMEs can achieve with on-premise infrastructure. Major cloud
                providers invest billions of dollars in security, employ world-class security
                teams, and maintain certifications like ISO 27001, SOC 2, and GDPR compliance
                that would be prohibitively expensive for individual organizations to achieve.
              </p>

              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                However, moving to the cloud does shift some security responsibilities. The cloud
                provider secures the infrastructure, but you are responsible for configuring
                security correctly, managing user access, protecting credentials, and following
                best practices. Understanding the shared responsibility model — what the provider
                handles versus what you must manage — is essential for maintaining a secure cloud
                environment.
              </p>

              <div className="space-y-4 mt-8">
                {[
                  {
                    title: 'Enable Multi-Factor Authentication (MFA)',
                    description:
                      'Require all users to verify their identity with a second factor (typically a mobile app or SMS code) in addition to their password. MFA prevents over 99% of credential-based attacks and is the single most important security measure you can implement.',
                  },
                  {
                    title: 'Implement Role-Based Access Control (RBAC)',
                    description:
                      'Assign users the minimum level of access they need to perform their jobs. Not everyone needs administrator access. Regularly review and audit user permissions, especially when employees change roles or leave the organization.',
                  },
                  {
                    title: 'Encrypt Data at Rest and in Transit',
                    description:
                      'Ensure all sensitive data is encrypted both when stored in the cloud and when being transmitted over the network. Most cloud providers offer built-in encryption — enable it by default and manage encryption keys carefully.',
                  },
                  {
                    title: 'Set Up Automated Backups and Test Restores',
                    description:
                      'Configure automatic backups with appropriate retention policies. Crucially, test your restore procedures regularly to ensure backups actually work when you need them. A backup that has never been tested is not a reliable backup.',
                  },
                  {
                    title: 'Monitor and Audit Activity',
                    description:
                      'Enable logging and monitoring on all cloud services. Review access logs regularly to detect unusual activity, unauthorized access attempts, or configuration changes. Set up alerts for suspicious behavior.',
                  },
                  {
                    title: 'Train Your Team on Security Awareness',
                    description:
                      'The biggest security risk in any organization is human error. Train your team to recognize phishing attacks, use strong passwords, report suspicious activity, and follow security policies. Conduct regular security awareness sessions.',
                  },
                ].map((practice, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-5 rounded-xl bg-gray-100 dark:bg-white/5"
                  >
                    <Lock className="h-5 w-5 text-[#2563eb] flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">{practice.title}</h4>
                      <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm">
                        {practice.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Cloud Cost Optimization */}
        <section id="cloud-cost-optimization" className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-8 w-8 text-[#2563eb]" />
                <span className="text-sm font-semibold uppercase tracking-wider text-[#2563eb]">
                  Section 7
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-6">
                Cloud Cost Optimization
              </h2>

              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                One of the greatest advantages of cloud computing is the pay-as-you-go pricing
                model, which eliminates large upfront capital expenditures and allows you to align
                technology costs with actual usage. However, without proper management, cloud
                costs can grow unexpectedly as teams provision resources, store data, and use
                services without visibility into the financial impact. Cost optimization is an
                ongoing practice, not a one-time activity.
              </p>

              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                For Zimbabwean organizations managing tight budgets, cost optimization is
                especially important. The key is to start with a clear understanding of what you
                are spending, monitor usage continuously, and make informed decisions about where
                to invest and where to save. Many organizations discover they can reduce their
                cloud costs by 30% to 50% simply by eliminating unused resources and right-sizing
                their infrastructure.
              </p>

              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                It is also important to compare cloud costs holistically against your current IT
                spending. When you factor in server hardware, electricity, cooling, physical
                security, IT staff time, and the cost of downtime from unreliable on-premise
                infrastructure, cloud solutions often deliver significant savings even before
                accounting for the improved reliability and security.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {costOptimizationTips.map((tip, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-white/10 rounded-2xl p-5"
                  >
                    <h3 className="font-bold mb-2 text-[#2563eb]">{tip.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-100 dark:bg-white/5 rounded-2xl p-6 sm:p-8 mt-8">
                <h3 className="text-xl font-bold mb-3">Total Cost of Ownership Comparison</h3>
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                  When evaluating cloud migration, calculate your current total cost of ownership:
                  server hardware ($3,000 to $15,000), electricity ($200 to $600 per month),
                  internet for server access, IT staff time for maintenance, physical security
                  measures, backup hardware, and the cost of downtime during outages or hardware
                  failures. Compare this against cloud monthly costs ($50 to $500 per month for
                  most SMEs) to see the full financial picture.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Getting Started with Cloud */}
        <section id="getting-started" className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <ArrowRight className="h-8 w-8 text-[#2563eb]" />
                <span className="text-sm font-semibold uppercase tracking-wider text-[#2563eb]">
                  Section 8
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-6">
                Getting Started with Cloud
              </h2>

              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                Getting started with cloud migration does not require a massive upfront investment
                or a complete overhaul of your IT systems. The most successful cloud journeys
                begin with small, manageable steps that deliver quick wins and build organizational
                confidence. Start by identifying the pain points in your current IT setup — are
                you losing data, struggling with unreliable servers, paying too much for
                electricity, or unable to work remotely? These pain points point you toward the
                cloud solutions that will deliver the most immediate value.
              </p>

              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                The fastest path to cloud benefits for most Zimbabwean organizations starts with
                cloud email and collaboration. Moving from a local email server or free email
                accounts to a professional cloud email system like Microsoft 365 or Google
                Workspace immediately delivers benefits: reliable email from any device, shared
                calendars, video conferencing, cloud document collaboration, and professional
                email addresses using your own domain name. This single step can transform how
                your team communicates and collaborates.
              </p>

              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                From there, progress to cloud file storage (replacing shared network drives),
                then cloud-hosted websites and applications, and eventually cloud databases
                and business systems. Each step builds on the previous one, and your team
                gains cloud skills and confidence with each migration phase.
              </p>

              <div className="bg-[#2563eb]/5 border border-[#2563eb]/20 rounded-2xl p-6 sm:p-8 mt-8">
                <h3 className="text-xl font-bold mb-4">Quick Wins to Start Today</h3>
                <ul className="space-y-3">
                  {[
                    'Sign up for a Microsoft 365 or Google Workspace trial and migrate your team email',
                    'Move shared files to OneDrive, SharePoint, or Google Drive for anywhere access',
                    'Set up a cloud-based backup for your most critical data and documents',
                    'Migrate your website to a cloud hosting provider for better uptime',
                    'Use cloud-based project management tools like Trello, Asana, or Monday.com',
                    'Explore ClawnCore Multitech cloud services designed specifically for Zimbabwean organizations',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-slate-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 text-center">
                <Link href="/get-started">
                  <Button className="h-12 px-8 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold">
                    Talk to a Cloud Expert
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Cloud Migration Checklist */}
        <section id="migration-checklist" className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-8 w-8 text-[#2563eb]" />
                <span className="text-sm font-semibold uppercase tracking-wider text-[#2563eb]">
                  Section 9
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-6">
                Cloud Migration Checklist
              </h2>

              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                Use this comprehensive checklist to guide your cloud migration from planning
                through completion. Each item represents a critical step that should not be
                overlooked. Adapt the checklist to your organization's specific needs and
                timeline, and work through it systematically to ensure a smooth and successful
                migration.
              </p>

              <div className="space-y-3 mt-8">
                {checklistItems.map((item, index) => (
                  <label
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-[#2563eb] focus:ring-[#2563eb]"
                    />
                    <span className="text-gray-700 dark:text-slate-300 leading-relaxed">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-black mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
                  Common questions about cloud migration for Zimbabwean and African organizations.
                </p>
              </div>

              <div className="space-y-3">
                {faqData.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                    >
                      <span className="font-semibold pr-4">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="h-5 w-5 flex-shrink-0 text-[#2563eb]" />
                      ) : (
                        <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-400" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-5 pb-5 text-gray-600 dark:text-slate-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8]">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <Cloud className="h-12 w-12 text-white/80 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                Ready to Start Your Cloud Migration?
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed mb-8">
                ClawnCore Multitech helps Zimbabwean and African organizations plan and execute
                successful cloud migrations. From initial assessment to full deployment and
                ongoing management, our team guides you through every step.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started">
                  <Button className="h-12 px-8 bg-white text-[#2563eb] hover:bg-gray-100 font-bold">
                    Get a Free Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="h-12 px-8 font-bold border-white/30 text-white hover:bg-white/10"
                  >
                    Contact Our Cloud Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <PersistentCTA />
    </div>
  );
}
