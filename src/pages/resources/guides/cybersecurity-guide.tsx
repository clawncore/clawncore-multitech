import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, FAQSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  Key,
  Database,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const faqData = [
  {
    question: 'What is the biggest cybersecurity threat facing Zimbabwean businesses?',
    answer:
      'Phishing attacks remain the most prevalent threat, accounting for over 60% of reported incidents. Attackers craft convincing emails or SMS messages impersonating banks, government agencies, or service providers to trick employees into revealing credentials or clicking malicious links.',
  },
  {
    question: 'How much does cybersecurity cost for a small business in Zimbabwe?',
    answer:
      'A basic cybersecurity posture for a Zimbabwean SME can start as low as $50-150 per month with cloud-based security solutions. Essential investments include endpoint protection, multi-factor authentication, regular backups, and staff training. The cost of a breach, however, can run into tens of thousands of dollars in lost revenue, recovery, and reputational damage.',
  },
  {
    question: 'Do I need cybersecurity if my business is small?',
    answer:
      'Absolutely. Small businesses are prime targets because they often lack dedicated security teams. Over 43% of cyberattacks target small businesses, and many do not recover within six months. Simple measures like strong passwords, MFA, and regular backups dramatically reduce your risk.',
  },
  {
    question: 'What regulations govern cybersecurity in Zimbabwe?',
    answer:
      'Zimbabwe\'s Data Protection Act (2021) is the primary legislation, administered by the Data Protection Authority. The Postal and Telecommunications Act also covers aspects of data security. Businesses handling personal data must register with the authority and implement appropriate technical and organisational safeguards.',
  },
  {
    question: 'How do I detect if my business has been breached?',
    answer:
      'Common indicators include unexplained system slowdowns, unexpected file changes, unfamiliar login locations, unusual network traffic spikes, ransomware demands, and employees reporting locked accounts. Implementing a SIEM (Security Information and Event Management) solution can automate detection across your infrastructure.',
  },
  {
    question: 'What is multi-factor authentication and should I use it?',
    answer:
      'Multi-factor authentication (MFA) requires two or more verification methods to access an account — typically a password plus a code from your phone or an authenticator app. MFA blocks over 99% of automated credential-stuffing attacks and is one of the single most effective security measures any business can adopt.',
  },
];

const tocSections = [
  { id: 'what-is-cybersecurity', label: 'What is Cybersecurity?' },
  { id: 'why-it-matters', label: 'Why Cybersecurity Matters for Zimbabwe' },
  { id: 'common-threats', label: 'Common Cyber Threats in Africa' },
  { id: 'threat-detection', label: 'Threat Detection and Monitoring' },
  { id: 'identity-access', label: 'Identity and Access Protection' },
  { id: 'data-security', label: 'Data Security and Encryption' },
  { id: 'cybersecurity-culture', label: 'Building a Cybersecurity Culture' },
  { id: 'getting-started', label: 'Getting Started with Cybersecurity' },
  { id: 'checklist', label: 'Cybersecurity Checklist' },
  { id: 'faq', label: 'Frequently Asked Questions' },
];

export default function CybersecurityGuide() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <SEO
        title="Cybersecurity Guide: Protecting Your Business in Zimbabwe"
        description="A comprehensive guide to cybersecurity for Zimbabwean businesses. Learn about threat detection, identity protection, data security, and building a resilient digital defence for your organisation in Africa."
        keywords={[
          'cybersecurity Zimbabwe',
          'African business security',
          'cyber threat protection Africa',
          'data security Zimbabwe',
          'SME cybersecurity Africa',
          'data protection act Zimbabwe',
          'cybercrime prevention',
          'business cybersecurity guide',
          'Zimbabwe technology security',
          'endpoint protection Africa',
        ]}
      />
      <FAQSchema data={faqData} />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Resources', href: '/resources' },
                { label: 'Guides', href: '/resources/guides' },
                { label: 'Cybersecurity Guide' },
              ]}
            />
            <div className="flex items-center justify-center gap-3 mb-6 mt-8">
              <Shield className="w-8 h-8 text-[#38bdf8]" />
              <span className="text-[#38bdf8] text-sm font-semibold uppercase tracking-wider">
                Comprehensive Security Guide
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Cybersecurity Guide:{' '}
              <span className="text-[#38bdf8]">Protecting Your Business</span>{' '}
              in Zimbabwe
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              A comprehensive, Africa-focused guide to cybersecurity — from understanding
              the threat landscape to building a resilient digital defence for your
              organisation.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-lg px-8 py-6 rounded-lg"
            >
              <a href="#what-is-cybersecurity">Read the Full Guide</a>
            </Button>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Eye className="w-6 h-6 text-[#0284c7]" />
              Table of Contents
            </h2>
            <nav className="grid md:grid-cols-2 gap-3">
              {tocSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 group"
                >
                  <span className="w-7 h-7 rounded-full bg-[#0284c7]/10 text-[#0284c7] flex items-center justify-center text-sm font-bold shrink-0 group-hover:bg-[#0284c7] group-hover:text-white transition-colors">
                    {tocSections.indexOf(section) + 1}
                  </span>
                  <span className="font-medium">{section.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* Section 1: What is Cybersecurity? */}
        <section id="what-is-cybersecurity" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-7 h-7 text-[#0284c7]" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                What is Cybersecurity?
              </h2>
            </div>
            <div className="text-[#46586b] dark:text-slate-300 space-y-5 leading-relaxed text-lg">
              <p>
                Cybersecurity is the practice of protecting digital systems, networks, and
                data from malicious attacks, unauthorised access, and damage. It encompasses
                a wide range of technologies, processes, and practices designed to safeguard
                everything from your email accounts and customer databases to your entire
                corporate infrastructure.
              </p>
              <p>
                For businesses in Zimbabwe, cybersecurity has evolved from a niche IT concern
                into a fundamental pillar of operational resilience. As organisations across
                Harare, Bulawayo, and beyond accelerate their digital transformation — moving
                to cloud platforms, accepting mobile payments, and processing customer data
                electronically — the attack surface expands dramatically.
              </p>
              <p>
                At its core, cybersecurity rests on three principles known as the CIA triad:
                Confidentiality ensures that sensitive information is accessible only to
                authorised parties. Integrity guarantees that data remains accurate and
                unaltered during storage and transmission. Availability ensures that systems
                and data are accessible when needed by legitimate users.
              </p>
              <p>
                Cybersecurity is not a product you buy once and forget. It is an ongoing
                discipline that requires regular assessment, continuous monitoring, and
                adaptation as threats evolve. The organisations that thrive are those that
                embed security into their culture and operations rather than treating it as
                an afterthought.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Network Security:</strong> Protecting your internal networks from
                  unauthorised access, including firewalls, intrusion detection systems, and
                  network segmentation.
                </li>
                <li>
                  <strong>Application Security:</strong> Securing software applications from
                  vulnerabilities through secure coding practices, regular patching, and
                  penetration testing.
                </li>
                <li>
                  <strong>Cloud Security:</strong> Safeguarding data and applications hosted
                  in cloud environments through identity controls, encryption, and
                  configuration management.
                </li>
                <li>
                  <strong>Endpoint Security:</strong> Protecting individual devices like
                  laptops, smartphones, and tablets from malware and unauthorised access.
                </li>
                <li>
                  <strong>Incident Response:</strong> The processes and plans for detecting,
                  containing, and recovering from security breaches when they occur.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Why Cybersecurity Matters for Zimbabwe */}
        <section
          id="why-it-matters"
          className="py-16 px-4 bg-slate-50 dark:bg-slate-900"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-7 h-7 text-[#0284c7]" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Why Cybersecurity Matters for Zimbabwe
              </h2>
            </div>
            <div className="text-[#46586b] dark:text-slate-300 space-y-5 leading-relaxed text-lg">
              <p>
                Zimbabwe is experiencing rapid digital growth. Mobile money platforms like
                EcoCash process billions of dollars in transactions annually, businesses
                are migrating to cloud-based ERP and accounting systems, and e-commerce is
                gaining traction in urban centres. This digital expansion brings tremendous
                opportunity — and significant risk.
              </p>
              <p>
                The Interpol African Cyberthreat Assessment has consistently ranked Southern
                Africa as a high-risk zone for cybercrime. Businesses in Zimbabwe face a
                convergence of factors that make cybersecurity particularly urgent:
                increasing internet penetration, a growing fintech ecosystem, limited
                cybersecurity awareness among small business owners, and the emergence of
                locally-targeted scam campaigns.
              </p>
              <p>
                The financial impact of a breach can be devastating for Zimbabwean SMEs. A
                2024 report found that the average cost of a data breach in Africa exceeds
                $3.5 million — a figure that can cripple a small or medium enterprise. Beyond
                the immediate financial loss, businesses face regulatory penalties under the
                Data Protection Act, loss of customer trust, operational downtime, and
                potential legal liability.
              </p>
              <p>
                Zimbabwe's Data Protection Act of 2021 introduced mandatory requirements for
                organisations that collect, store, or process personal data. Businesses must
                register with the Data Protection Authority, implement appropriate security
                measures, and report data breaches within 72 hours. Non-compliance carries
                significant fines and reputational consequences.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Rising Attack Volume:</strong> Cyber incidents in Southern Africa
                  increased by over 40% between 2022 and 2024, with phishing and ransomware
                  leading the surge.
                </li>
                <li>
                  <strong>Fintech Targeting:</strong> Mobile money and digital payment
                  platforms are increasingly targeted by sophisticated social engineering
                  and SIM-swap attacks.
                </li>
                <li>
                  <strong>Regulatory Pressure:</strong> The Data Protection Act mandates
                  specific security standards, and enforcement is intensifying.
                </li>
                <li>
                  <strong>Business Continuity:</strong> A cyberattack can halt operations
                  for days or weeks, costing revenue and damaging customer relationships.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Common Cyber Threats in Africa */}
        <section id="common-threats" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-7 h-7 text-[#0284c7]" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Common Cyber Threats in Africa
              </h2>
            </div>
            <div className="text-[#46586b] dark:text-slate-300 space-y-5 leading-relaxed text-lg">
              <p>
                Understanding the threat landscape is the first step in building an effective
                defence. Businesses in Zimbabwe and across Africa face a distinct set of cyber
                threats shaped by regional infrastructure, user behaviour, and the strategies
                of both local and international threat actors.
              </p>
              <p>
                <strong>Phishing and Social Engineering</strong> dominate the threat
                landscape. Attackers craft convincing emails, SMS messages, and WhatsApp
                messages impersonating banks like CBZ, Stanbic, or Ecobank, or government
                agencies such as ZIMRA. These messages typically urge recipients to click a
                link and enter their login credentials on a fake portal. Spear-phishing
                campaigns — targeted attacks against specific employees or executives — are
                becoming increasingly sophisticated.
              </p>
              <p>
                <strong>Ransomware</strong> attacks have surged across the African continent.
                Attackers encrypt a business's critical files and demand payment — usually in
                cryptocurrency — for the decryption key. Small businesses are particularly
                vulnerable because they often lack reliable backups. Ransomware groups like
                LockBit and Conti have specifically targeted African organisations, drawn by
                the perception of weaker security postures.
              </p>
              <p>
                <strong>SIM Swapping and Mobile Fraud</strong> represent a uniquely African
                threat vector. Attackers social-engineer mobile network operators to transfer
                a victim's phone number to a new SIM card, intercepting OTPs (one-time
                passwords) used for banking and payment authentication. This technique has
                enabled millions of dollars in fraudulent mobile money transactions.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Business Email Compromise (BEC):</strong> Attackers impersonate
                  executives or vendors to trick employees into wiring funds or disclosing
                  sensitive information.
                </li>
                <li>
                  <strong>Malware and Trojans:</strong> Malicious software delivered via
                  email attachments, compromised websites, or infected USB drives.
                </li>
                <li>
                  <strong>Insider Threats:</strong> Disgruntled or negligent employees who
                  misuse their access to steal data or sabotage systems.
                </li>
                <li>
                  <strong>Credential Stuffing:</strong> Automated attacks using leaked
                  username-password combinations from previous breaches to access other
                  accounts.
                </li>
                <li>
                  <strong>Supply Chain Attacks:</strong> Compromising a trusted third-party
                  vendor or software provider to gain access to multiple target organisations.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Threat Detection and Monitoring */}
        <section
          id="threat-detection"
          className="py-16 px-4 bg-slate-50 dark:bg-slate-900"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-7 h-7 text-[#0284c7]" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Threat Detection and Monitoring
              </h2>
            </div>
            <div className="text-[#46586b] dark:text-slate-300 space-y-5 leading-relaxed text-lg">
              <p>
                Threat detection is the process of identifying potential security incidents
                across your digital environment. Effective monitoring means having visibility
                into your networks, endpoints, applications, and user behaviour so that
                anomalies are flagged before they escalate into full-blown breaches.
              </p>
              <p>
                A Security Information and Event Management (SIEM) solution serves as the
                nerve centre of your detection capabilities. It aggregates log data from
                firewalls, servers, endpoints, and applications, applying correlation rules
                and machine learning to identify suspicious patterns. For Zimbabwean
                businesses, cloud-based SIEM platforms like Microsoft Sentinel or Elastic
                Security offer enterprise-grade detection without the capital expenditure of
                on-premise hardware.
              </p>
              <p>
                Endpoint Detection and Response (EDR) tools monitor individual devices for
                suspicious behaviour such as unusual process execution, file encryption
                activity, or unauthorised privilege escalation. Modern EDR solutions can
                automatically isolate an infected device from the network to contain a
                threat before it spreads.
              </p>
              <p>
                Beyond technology, effective detection requires defined processes. Your team
                needs clear procedures for reporting suspected incidents, escalation paths
                that ensure critical alerts receive immediate attention, and regular reviews
                of security dashboards and logs. An alert that nobody sees is as dangerous as
                no alert at all.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Deploy a SIEM:</strong> Start with a cloud-based solution to
                  aggregate and correlate logs across your infrastructure.
                </li>
                <li>
                  <strong>Implement EDR:</strong> Install endpoint detection on all
                  workstations and servers to catch threats at the device level.
                </li>
                <li>
                  <strong>Set Up Alerting:</strong> Configure alerts for high-severity events
                  — failed logins, unusual data transfers, privilege escalation — and route
                  them to responsible personnel.
                </li>
                <li>
                  <strong>Conduct Regular Audits:</strong> Review logs and access records
                  weekly to identify patterns that automated tools may miss.
                </li>
                <li>
                  <strong>Engage a SOC:</strong> Consider a managed Security Operations
                  Centre service if your organisation lacks the internal resources for
                  24/7 monitoring.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Identity and Access Protection */}
        <section id="identity-access" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Key className="w-7 h-7 text-[#0284c7]" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Identity and Access Protection
              </h2>
            </div>
            <div className="text-[#46586b] dark:text-slate-300 space-y-5 leading-relaxed text-lg">
              <p>
                Controlling who has access to your systems and data is one of the most
                impactful cybersecurity measures you can implement. The principle of least
                privilege dictates that every user, application, and system should have only
                the minimum access necessary to perform its function.
              </p>
              <p>
                Multi-factor authentication (MFA) is the single most effective control
                available to Zimbabwean businesses today. By requiring a second form of
                verification — typically a time-based code from an authenticator app or a
                hardware security key — MFA renders stolen passwords almost useless. Microsoft
                research confirms that MFA blocks over 99.9% of automated account
                compromise attacks.
              </p>
              <p>
                Password hygiene remains a critical foundation. Passphrases — long,
                memorable combinations of random words — are both more secure and easier to
                remember than complex passwords. A passphrase like "correct-horse-battery-
                staple" is vastly more resistant to brute-force attacks than "P@ssw0rd1!"
                while being easier for employees to recall without writing it down.
              </p>
              <p>
                Identity governance extends beyond passwords. Businesses need robust
                processes for provisioning access when employees join, modifying access as
                roles change, and promptly revoking access when someone departs. Privileged
                access management (PAM) solutions add an extra layer of control for
                administrator accounts, requiring approval workflows and session recording
                for sensitive operations.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Enable MFA Everywhere:</strong> Apply multi-factor authentication to
                  all email accounts, cloud services, VPN access, and administrative
                  consoles. Prefer authenticator apps over SMS-based codes.
                </li>
                <li>
                  <strong>Enforce Strong Password Policies:</strong> Require minimum 14-
                  character passphrases, prohibit password reuse across services, and use a
                  business password manager.
                </li>
                <li>
                  <strong>Implement Single Sign-On (SSO):</strong> Consolidate identity
                  management to reduce password fatigue while improving visibility into
                  access patterns.
                </li>
                <li>
                  <strong>Conduct Quarterly Access Reviews:</strong> Audit who has access to
                  what, remove orphaned accounts, and ensure permissions align with current
                  job roles.
                </li>
                <li>
                  <strong>Protect Admin Accounts:</strong> Use dedicated admin accounts with
                  enhanced monitoring, separate from day-to-day user accounts.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Data Security and Encryption */}
        <section
          id="data-security"
          className="py-16 px-4 bg-slate-50 dark:bg-slate-900"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-7 h-7 text-[#0284c7]" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Data Security and Encryption
              </h2>
            </div>
            <div className="text-[#46586b] dark:text-slate-300 space-y-5 leading-relaxed text-lg">
              <p>
                Data is the lifeblood of modern business — and the primary target of
                cyberattacks. Protecting your data requires a layered approach that
                classifies information by sensitivity, applies appropriate controls at rest
                and in transit, and ensures you can recover from any incident.
              </p>
              <p>
                Encryption transforms readable data into ciphertext that is meaningless
                without the correct decryption key. Data at rest — files stored on servers,
                databases, and backup media — should be encrypted using AES-256, the
                industry standard. Data in transit — information moving between systems,
                across the internet, or over your internal network — should be protected
                with TLS 1.3 or higher. For Zimbabwean businesses using cloud services like
                Microsoft 365 or Google Workspace, encryption is typically built in, but you
                must verify that encryption keys are managed according to your requirements.
              </p>
              <p>
                Backup strategy is a cornerstone of data security. The 3-2-1 rule provides a
                reliable framework: maintain at least three copies of your data, on two
                different types of media, with one copy stored offsite or in a separate cloud
                region. Critically, backups must be tested regularly — an untested backup is
                not a backup.
              </p>
              <p>
                Data classification helps you apply the right level of protection to the right
                data. Not all information requires the same security controls. Public
                marketing materials need different protections than customer financial records
                or employee personal information. A simple three-tier classification system —
                Public, Internal, and Confidential — gives your team clear guidance on how to
                handle different types of data.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Encrypt Sensitive Data:</strong> Apply AES-256 encryption to all
                  databases, file stores, and backup media containing personal or financial
                  information.
                </li>
                <li>
                  <strong>Enforce HTTPS Everywhere:</strong> Ensure all web applications and
                  APIs use TLS 1.3. Configure HTTP Strict Transport Security (HSTS) headers.
                </li>
                <li>
                  <strong>Implement the 3-2-1 Backup Rule:</strong> Maintain three backup
                  copies on two different media types with one stored offsite. Test restores
                  monthly.
                </li>
                <li>
                  <strong>Classify Your Data:</strong> Label data by sensitivity level and
                  apply corresponding access controls and encryption requirements.
                </li>
                <li>
                  <strong>Manage Data Retention:</strong> Define clear retention policies
                  that specify how long data is kept and when it is securely deleted.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 7: Building a Cybersecurity Culture */}
        <section id="cybersecurity-culture" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-7 h-7 text-[#0284c7]" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Building a Cybersecurity Culture
              </h2>
            </div>
            <div className="text-[#46586b] dark:text-slate-300 space-y-5 leading-relaxed text-lg">
              <p>
                Technology alone cannot secure your business. The most sophisticated firewall
                and the most advanced EDR solution are rendered ineffective when an employee
                willingly hands their credentials to an attacker through a phishing link.
                Building a cybersecurity-aware culture is where the greatest return on
                security investment is realised.
              </p>
              <p>
                Security awareness training should be an ongoing programme, not a once-a-year
                checkbox exercise. Effective training is contextual and relevant — it
                demonstrates real-world attack scenarios that employees might encounter in
                their specific roles. For a finance team member in Harare, this means
                recognising a fraudulent invoice email from a supposed supplier. For an HR
                administrator, it means understanding the risks of sharing employee data via
                unsecured channels.
              </p>
              <p>
                Leadership sets the tone. When business owners and senior managers visibly
                prioritise cybersecurity — using strong passwords, following security
                policies, and investing in training — it signals to the entire organisation
                that security is a core business value, not an inconvenience imposed by IT.
              </p>
              <p>
                Simulated phishing campaigns are one of the most effective training tools
                available. By sending controlled phishing emails to your team and tracking who
                clicks, you can identify vulnerable individuals and provide targeted
                additional training. Over time, you will see click rates drop and reporting
                rates rise — a clear indicator of cultural improvement.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Monthly Training Sessions:</strong> Deliver short, focused training
                  modules covering current threats, safe practices, and real-world examples
                  relevant to your industry.
                </li>
                <li>
                  <strong>Simulated Phishing:</strong> Run regular phishing simulations
                  with increasing sophistication to test and reinforce employee awareness.
                </li>
                <li>
                  <strong>Clear Policies:</strong> Document and communicate cybersecurity
                  policies covering acceptable use, password requirements, data handling,
                  and incident reporting procedures.
                </li>
                <li>
                  <strong>Incident Reporting Channels:</strong> Establish a simple, blame-
                  free process for employees to report suspected security incidents quickly.
                </li>
                <li>
                  <strong>Recognition and Incentives:</strong> Celebrate employees who
                  successfully identify and report phishing attempts or suggest security
                  improvements.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 8: Getting Started with Cybersecurity */}
        <section
          id="getting-started"
          className="py-16 px-4 bg-slate-50 dark:bg-slate-900"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-7 h-7 text-[#0284c7]" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Getting Started with Cybersecurity
              </h2>
            </div>
            <div className="text-[#46586b] dark:text-slate-300 space-y-5 leading-relaxed text-lg">
              <p>
                Starting a cybersecurity programme can feel overwhelming, particularly for
                small businesses with limited budgets and no dedicated IT security staff. The
                key is to focus on high-impact, low-cost measures first and build
                progressively over time. You do not need to implement everything at once —
                you need to start.
              </p>
              <p>
                Begin with a risk assessment. Identify your most critical assets — customer
                data, financial records, intellectual property, operational systems — and
                evaluate the threats facing each one. This assessment does not need to be
                formal or expensive. A simple spreadsheet listing your key systems, their
                importance, current protections, and known gaps is a valuable starting point.
              </p>
              <p>
                Implement the foundational controls first. Enable multi-factor authentication
                on all accounts. Install reputable endpoint protection on every device. Ensure
                your operating systems and software are regularly updated. Set up automated
                backups. These four measures alone prevent the vast majority of common
                attacks.
              </p>
              <p>
                Consider engaging a managed security service provider (MSSP) if your internal
                resources are limited. A good MSSP provides 24/7 monitoring, incident
                response capability, and expert guidance at a fraction of the cost of hiring
                an in-house security team. Several reputable providers operate across Southern
                Africa with packages designed for SMEs.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Week 1-2:</strong> Enable MFA on all accounts, install endpoint
                  protection, begin a software update schedule.
                </li>
                <li>
                  <strong>Week 3-4:</strong> Set up automated backups using the 3-2-1 rule,
                  document a basic incident response plan.
                </li>
                <li>
                  <strong>Month 2:</strong> Conduct initial security awareness training,
                  review and update access permissions, classify sensitive data.
                </li>
                <li>
                  <strong>Month 3:</strong> Implement network monitoring, run your first
                  phishing simulation, engage an MSSP or cybersecurity consultant.
                </li>
                <li>
                  <strong>Ongoing:</strong> Conduct quarterly access reviews, annual risk
                  assessments, and continuous training and awareness activities.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 9: Cybersecurity Checklist */}
        <section id="checklist" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-7 h-7 text-[#0284c7]" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Cybersecurity Checklist
              </h2>
            </div>
            <p className="text-[#46586b] dark:text-slate-300 text-lg mb-8 leading-relaxed">
              Use this checklist to evaluate and improve your organisation's cybersecurity
              posture. Each item represents a control that significantly reduces your risk.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  category: 'Identity and Access',
                  items: [
                    'Multi-factor authentication enabled on all accounts',
                    'Strong passphrase policy enforced',
                    'Password manager deployed',
                    'Privileged access management in place',
                    'Quarterly access reviews conducted',
                  ],
                },
                {
                  category: 'Data Protection',
                  items: [
                    'Sensitive data classified and labelled',
                    'Encryption at rest (AES-256) applied',
                    'TLS 1.3 enforced for data in transit',
                    '3-2-1 backup strategy implemented',
                    'Backups tested monthly',
                  ],
                },
                {
                  category: 'Network and Endpoint Security',
                  items: [
                    'Business-grade firewall deployed',
                    'EDR installed on all endpoints',
                    'Software and OS updates automated',
                    'Wi-Fi networks secured with WPA3',
                    'Network segmentation in place',
                  ],
                },
                {
                  category: 'Governance and Awareness',
                  items: [
                    'Security awareness training delivered',
                    'Phishing simulations running regularly',
                    'Incident response plan documented',
                    'Data protection authority registered',
                    'Cybersecurity policies published',
                  ],
                },
              ].map((section) => (
                <div
                  key={section.category}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
                >
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-4">
                    {section.category}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[#46586b] dark:text-slate-300"
                      >
                        <CheckCircle className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="py-16 px-4 bg-slate-50 dark:bg-slate-900"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white pr-4">
                      {faq.question}
                    </span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6 text-[#46586b] dark:text-slate-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="w-12 h-12 text-[#38bdf8] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Secure Your Business?
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              ClawnCore Multitech helps Zimbabwean businesses build robust cybersecurity
              programmes — from risk assessment and strategy to implementation and ongoing
              managed security services. Let us help you protect what matters most.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-lg px-8 py-6 rounded-lg"
              >
                <Link href="/contact">Get a Free Security Assessment</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 text-lg px-8 py-6 rounded-lg"
              >
                <Link href="/resources">Explore More Guides</Link>
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
