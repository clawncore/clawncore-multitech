import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import {
  Handshake, Building2, Globe, Zap, Shield, Users, ChevronRight,
  ArrowRight, CheckCircle, Star, TrendingUp, Code, Headphones,
  GraduationCap, Target, Mail, Phone, MapPin
} from 'lucide-react';

const partnerTiers = [
  {
    name: 'Registered',
    color: 'from-gray-500 to-slate-600',
    borderColor: 'border-gray-500/30',
    icon: Building2,
    description: 'Start your journey with ClawnCore. Access basic resources and community support.',
    benefits: [
      'Partner portal access',
      'Co-marketing materials',
      'Community forum access',
      'Basic training resources',
      'Partner directory listing',
    ],
  },
  {
    name: 'Silver',
    color: 'from-gray-400 to-gray-600',
    borderColor: 'border-gray-400/30',
    icon: Shield,
    description: 'For growing partners with proven expertise. Unlock priority support and lead referrals.',
    benefits: [
      'Everything in Registered',
      'Priority technical support',
      'Lead referrals in your region',
      'Advanced training & certification',
      'Joint webinar opportunities',
      'Dedicated partner manager',
    ],
  },
  {
    name: 'Gold',
    color: 'from-yellow-500 to-amber-600',
    borderColor: 'border-yellow-500/30',
    icon: Star,
    description: 'For high-performing partners driving significant revenue and customer success.',
    benefits: [
      'Everything in Silver',
      'Revenue share bonuses',
      'Exclusive product roadmap access',
      'Co-development opportunities',
      'Featured partner spotlight',
      'Executive business reviews',
      'Custom solution engineering',
    ],
  },
  {
    name: 'Platinum',
    color: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-500/30',
    icon: Target,
    description: 'Our most strategic partners. Deep integration, maximum rewards, and executive sponsorship.',
    benefits: [
      'Everything in Gold',
      'Maximum revenue share',
      'Strategic joint business planning',
      'Executive sponsor assignment',
      'Custom API & integration support',
      'Exclusive beta program access',
      'Annual partner summit invitations',
      'Joint IP development',
    ],
  },
];

const partnerTypes = [
  {
    icon: Code,
    title: 'Technology Partners',
    desc: 'Build integrations, plugins, and complementary solutions on the ClawnCore platform.',
  },
  {
    icon: TrendingUp,
    title: 'Reseller Partners',
    desc: 'Sell ClawnCore solutions to your customers and earn competitive margins.',
  },
  {
    icon: Users,
    title: 'Consulting Partners',
    desc: 'Help enterprises implement and optimize ClawnCore solutions for their needs.',
  },
  {
    icon: GraduationCap,
    title: 'Training Partners',
    desc: 'Deliver ClawnCore certifications and training programs to professionals.',
  },
];

const stats = [
  { value: '200+', label: 'Active Partners' },
  { value: '40+', label: 'Countries' },
  { value: '$2M+', label: 'Partner Revenue' },
  { value: '98%', label: 'Satisfaction Rate' },
];

const successStories = [
  {
    name: 'Nexus Technologies',
    type: 'Gold Partner',
    quote: "Joining ClawnCore's partner programme doubled our AI solutions revenue in just 12 months.",
    avatar: 'NT',
  },
  {
    name: 'DataForge Inc.',
    type: 'Platinum Partner',
    quote: 'The co-development opportunities and roadmap access gave us a serious competitive edge.',
    avatar: 'DF',
  },
  {
    name: 'CloudBridge Systems',
    type: 'Silver Partner',
    quote: 'Lead referrals and training resources helped us expand into 3 new markets.',
    avatar: 'CB',
  },
];

export default function Partnerships() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    partnerType: '',
    companySize: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.companyName || !formData.contactName || !formData.email || !formData.message) {
        toast({ title: 'Error', description: 'Please fill in all required fields.', variant: 'destructive' });
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase.from('contacts').insert({
        first_name: formData.contactName.split(' ')[0] || formData.contactName,
        last_name: formData.contactName.split(' ').slice(1).join(' ') || ' ',
        email: formData.email,
        company: formData.companyName,
        phone: formData.phone,
        service_interest: `Partnership: ${formData.partnerType || 'General'}`,
        message: `[PARTNERSHIP APPLICATION]\nCompany: ${formData.companyName}\nWebsite: ${formData.website}\nPartner Type: ${formData.partnerType}\nCompany Size: ${formData.companySize}\n\n${formData.message}`,
      });

      if (error) throw error;

      setSubmitted(true);
      toast({ title: 'Application Submitted!', description: "We'll review your application and get back to you within 48 hours." });
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to submit. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Handshake className="h-3 w-3 mr-1" /> Partner Programme
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Grow Together with{' '}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                ClawnCore
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join our global partner network. Build, sell, and deliver cutting-edge AI, cloud, and security solutions together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90"
                onClick={() => document.getElementById('apply-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Become a Partner
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10"
                onClick={() => document.getElementById('tiers-section')?.scrollIntoView({ behavior: 'smooth' })}>
                View Partner Tiers
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Partner Types</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the partnership model that fits your business
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {partnerTypes.map((type) => (
              <Card key={type.title} className="group hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-white/10 hover:border-blue-500/30">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                    <type.icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">{type.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Tiers */}
      <section id="tiers-section" className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Partner Tiers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unlock greater benefits as you grow your partnership with us
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {partnerTiers.map((tier) => (
              <Card key={tier.name} className={`relative overflow-hidden border ${tier.borderColor} hover:shadow-lg transition-all duration-300`}>
                <div className={`h-2 bg-gradient-to-r ${tier.color}`} />
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                    <tier.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                  <ul className="space-y-2">
                    {tier.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Partner Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from partners who have grown with our programme
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {successStories.map((story) => (
              <Card key={story.name} className="border border-gray-200 dark:border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                      {story.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{story.name}</p>
                      <Badge variant="secondary" className="text-xs">{story.type}</Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm italic">"{story.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Benefits */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Partner with ClawnCore?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: TrendingUp, title: 'Revenue Growth', desc: 'Earn competitive margins and bonuses as you scale' },
              { icon: Globe, title: 'Global Reach', desc: 'Access customers in 40+ countries worldwide' },
              { icon: Zap, title: 'Cutting-Edge Tech', desc: 'Build on our AI, cloud, and security platform' },
              { icon: Headphones, title: 'Dedicated Support', desc: 'Priority technical and business support' },
              { icon: GraduationCap, title: 'Training & Certs', desc: 'Free training and certification for your team' },
              { icon: Users, title: 'Community', desc: 'Join a network of 200+ innovative partners' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-section" className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Apply to Become a Partner</h2>
              <p className="text-muted-foreground">
                Fill out the form below and our partnerships team will review your application within 48 hours.
              </p>
            </div>

            {submitted ? (
              <Card className="border-green-500/30">
                <CardContent className="p-10 text-center">
                  <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for your interest in the ClawnCore Partner Programme.
                    Our team will review your application and contact you within 48 hours.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Submit Another Application
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="partner-company">Company Name *</Label>
                        <Input
                          id="partner-company"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="Your Company Inc."
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="partner-contact">Contact Name *</Label>
                        <Input
                          id="partner-contact"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="partner-email">Email *</Label>
                        <Input
                          id="partner-email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="partner-phone">Phone</Label>
                        <Input
                          id="partner-phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="partner-website">Company Website</Label>
                        <Input
                          id="partner-website"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder="https://yourcompany.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="partner-type">Partner Type *</Label>
                        <select
                          id="partner-type"
                          name="partnerType"
                          value={formData.partnerType}
                          onChange={handleChange}
                          className="w-full h-10 px-3 border border-gray-200 dark:border-white/10 rounded-md bg-background text-sm"
                          required
                        >
                          <option value="">Select partner type</option>
                          <option value="Technology Partner">Technology Partner</option>
                          <option value="Reseller Partner">Reseller Partner</option>
                          <option value="Consulting Partner">Consulting Partner</option>
                          <option value="Training Partner">Training Partner</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="partner-size">Company Size</Label>
                      <select
                        id="partner-size"
                        name="companySize"
                        value={formData.companySize}
                        onChange={handleChange}
                        className="w-full h-10 px-3 border border-gray-200 dark:border-white/10 rounded-md bg-background text-sm"
                      >
                        <option value="">Select company size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-1000">201-1,000 employees</option>
                        <option value="1000+">1,000+ employees</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="partner-message">Why do you want to partner with ClawnCore? *</Label>
                      <Textarea
                        id="partner-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your company, your expertise, and how you envision working together..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-600 text-white"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Questions About Partnership?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Our partnerships team is here to help. Reach out and let's discuss how we can grow together.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-white/80">
            <div className="flex items-center gap-2 justify-center">
              <Mail className="h-4 w-4" />
              <span>partners@clawncore.com</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Phone className="h-4 w-4" />
              <span>+91 8790813536</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <MapPin className="h-4 w-4" />
              <span>Andhra Pradesh, India</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
