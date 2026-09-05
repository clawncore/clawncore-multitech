import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import {
  Briefcase, MapPin, Clock, DollarSign, ChevronRight, Search,
  Users, Globe, Zap, Heart, GraduationCap, Coffee, ArrowRight,
  Code, Activity, Shield, Cloud, BarChart3, Megaphone, CheckCircle
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
}

const departments = [
  { name: 'All', icon: Briefcase },
  { name: 'Engineering', icon: Code },
  { name: 'AI & Research', icon: Activity },
  { name: 'Security', icon: Shield },
  { name: 'Cloud', icon: Cloud },
  { name: 'Data', icon: BarChart3 },
  { name: 'Marketing', icon: Megaphone },
];

const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Full-Stack Engineer',
    department: 'Engineering',
    location: 'Remote / Andhra Pradesh, India',
    type: 'Full-time',
    salary: '$80K - $130K',
    description: 'Build and scale our core platform services. Work with React, Node.js, and Supabase to deliver enterprise-grade solutions.',
    requirements: ['5+ years full-stack experience', 'React & TypeScript', 'PostgreSQL & API design', 'Experience with cloud platforms'],
  },
  {
    id: '2',
    title: 'ML Engineer — Computer Vision',
    department: 'AI & Research',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100K - $160K',
    description: 'Develop and deploy computer vision models for our drone and agriculture platforms. Work with PyTorch and edge deployment.',
    requirements: ['3+ years ML engineering', 'PyTorch & computer vision', 'Edge deployment experience', 'Python & C++'],
  },
  {
    id: '3',
    title: 'Cybersecurity Analyst',
    department: 'Security',
    location: 'Andhra Pradesh, India',
    type: 'Full-time',
    salary: '$70K - $110K',
    description: 'Protect our infrastructure and customer data. Monitor threats, conduct audits, and implement zero-trust security practices.',
    requirements: ['3+ years in cybersecurity', 'SOC experience', 'Network security', 'CISSP or equivalent preferred'],
  },
  {
    id: '4',
    title: 'Cloud Infrastructure Engineer',
    department: 'Cloud',
    location: 'Remote',
    type: 'Full-time',
    salary: '$90K - $140K',
    description: 'Design and manage our cloud infrastructure across AWS and GCP. Build scalable, resilient systems for global deployment.',
    requirements: ['4+ years cloud engineering', 'AWS/GCP expertise', 'Kubernetes & Terraform', 'CI/CD pipeline design'],
  },
  {
    id: '5',
    title: 'Data Engineer',
    department: 'Data',
    location: 'Remote / Andhra Pradesh, India',
    type: 'Full-time',
    salary: '$85K - $125K',
    description: 'Build data pipelines and analytics infrastructure. Work with real-time streaming, data warehousing, and BI tools.',
    requirements: ['3+ years data engineering', 'Python & SQL', 'Spark or Flink', 'Data warehouse design'],
  },
  {
    id: '6',
    title: 'Growth Marketing Manager',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    salary: '$70K - $100K',
    description: 'Drive user acquisition and brand awareness across digital channels. Own the marketing funnel from awareness to conversion.',
    requirements: ['4+ years growth marketing', 'SEO & paid acquisition', 'Analytics & A/B testing', 'B2B tech experience'],
  },
  {
    id: '7',
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$85K - $130K',
    description: 'Build and maintain CI/CD pipelines, monitoring, and deployment infrastructure. Ensure 99.99% uptime for our platform.',
    requirements: ['3+ years DevOps', 'Docker & Kubernetes', 'Monitoring & alerting', 'Linux system administration'],
  },
  {
    id: '8',
    title: 'NLP Research Scientist',
    department: 'AI & Research',
    location: 'Remote',
    type: 'Full-time',
    salary: '$110K - $170K',
    description: 'Push the boundaries of natural language processing. Develop and fine-tune LLMs for our ClawnAI platform.',
    requirements: ['PhD or equivalent in NLP/ML', 'Published research', 'LLM fine-tuning experience', 'Python & PyTorch'],
  },
];

const benefits = [
  { icon: DollarSign, title: 'Competitive Salary', desc: 'Top-of-market compensation packages' },
  { icon: Globe, title: 'Remote-First', desc: 'Work from anywhere in the world' },
  { icon: Heart, title: 'Health & Wellness', desc: 'Full medical, dental, and vision coverage' },
  { icon: GraduationCap, title: 'Learning Budget', desc: '$2,000/year for courses and conferences' },
  { icon: Coffee, title: 'Flexible Hours', desc: 'Work when you are most productive' },
  { icon: Zap, title: 'Stock Options', desc: 'Equity stake in ClawnCore\'s growth' },
];

const cultureValues = [
  { title: 'Innovation First', desc: 'We challenge the status quo and build what others think is impossible.' },
  { title: 'Ship Fast', desc: 'We move quickly, iterate often, and deliver real value to customers.' },
  { title: 'Radical Transparency', desc: 'Open communication, honest feedback, no hidden agendas.' },
  { title: 'Own Your Impact', desc: 'Every team member drives real outcomes — no spectators here.' },
];

export default function CareersPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [showApply, setShowApply] = useState(false);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredJobs = jobs.filter((job) => {
    const matchSearch = !search || job.title.toLowerCase().includes(search.toLowerCase()) || job.department.toLowerCase().includes(search.toLowerCase());
    const matchDept = selectedDept === 'All' || job.department === selectedDept;
    return matchSearch && matchDept;
  });

  const handleApply = (job: Job) => {
    setApplyJob(job);
    setShowApply(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contacts').insert({
        first_name: formData.name.split(' ')[0] || formData.name,
        last_name: formData.name.split(' ').slice(1).join(' ') || ' ',
        email: formData.email,
        message: `[CAREER APPLICATION]\nPosition: ${applyJob?.title}\nDepartment: ${applyJob?.department}\n\n${formData.message}`,
        service_interest: `Careers: ${applyJob?.title}`,
      });
      if (error) throw error;
      toast({ title: 'Application Sent!', description: 'We\'ll review your application and get back to you soon.' });
      setShowApply(false);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to submit. Please try again.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-cc-darker via-gray-900 to-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-nvidia-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-nvidia-500 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Briefcase className="h-3 w-3 mr-1" /> Careers
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Build the Future{' '}
              With Us
            </h1>
            <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join a team of engineers, researchers, and dreamers pushing the boundaries of AI, cloud, and security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90"
                onClick={() => document.getElementById('openings-section')?.scrollIntoView({ behavior: 'smooth' })}>
                View Open Positions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10"
                onClick={() => document.getElementById('culture-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Our Culture
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
            {[
              { value: '50+', label: 'Team Members' },
              { value: '12', label: 'Countries' },
              { value: '4.8', label: 'Glassdoor Rating' },
              { value: '95%', label: 'Retention Rate' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section id="culture-section" className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Culture</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">What it is like to work at ClawnCore</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {cultureValues.map((v) => (
              <Card key={v.title} className="border border-gray-200 dark:border-white/10 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Benefits & Perks</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We take care of our people</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((b) => (
              <div key={b.title} className="flex gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <b.icon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings-section" className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Find the role that fits your passion</p>
          </div>

          {/* Search & Filters */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search positions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {departments.map((dept) => (
                <Button
                  key={dept.name}
                  variant={selectedDept === dept.name ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedDept(dept.name)}
                  className="whitespace-nowrap"
                >
                  <dept.icon className="h-3.5 w-3.5 mr-1.5" />
                  {dept.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Job Cards */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="border border-gray-200 dark:border-white/10 hover:border-blue-500/30 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {job.department}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {job.type}</span>
                        <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" /> {job.salary}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}>
                        {expandedJob === job.id ? 'Less' : 'Details'}
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => handleApply(job)}>
                        Apply Now
                      </Button>
                    </div>
                  </div>
                  {expandedJob === job.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
                      <p className="text-muted-foreground mb-3">{job.description}</p>
                      <p className="font-semibold text-sm mb-2">Requirements:</p>
                      <ul className="space-y-1">
                        {job.requirements.map((r) => (
                          <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            {filteredJobs.length === 0 && (
              <div className="text-center py-16">
                <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No positions match your search. Try different keywords.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {showApply && applyJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowApply(false)}>
          <div className="bg-white dark:bg-[#0a0a0f] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-white/10" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-1">Apply for {applyJob.title}</h2>
            <p className="text-sm text-muted-foreground mb-6">{applyJob.department} · {applyJob.location}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="apply-name">Full Name *</Label>
                <Input id="apply-name" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="John Doe" required />
              </div>
              <div>
                <Label htmlFor="apply-email">Email *</Label>
                <Input id="apply-email" type="email" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} placeholder="john@example.com" required />
              </div>
              <div>
                <Label htmlFor="apply-message">Cover Note *</Label>
                <Textarea id="apply-message" rows={4} value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} placeholder="Tell us why you are a great fit..." required />
              </div>
              <div className="flex gap-3 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowApply(false)}>Cancel</Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
