import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/components/CartProvider';
import { useToast } from '@/hooks/use-toast';
import {
  GraduationCap, Clock, Users, Star, Award, Play, BookOpen,
  Shield, Cloud, BarChart3, ChevronRight, CheckCircle,
  Brain, Cpu, Target, Globe, Zap, Layers, Rocket, ArrowRight
} from 'lucide-react';
import { Link } from 'wouter';

interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  thumbnail_url: string;
  level: string;
  duration_hours: number;
  lessons_count: number;
  enrolled_count: number;
  rating: number;
  tags: string[];
  featured: boolean;
  vendors: { shop_name: string } | null;
  categories: { name: string; slug: string } | null;
}

const levelColors: Record<string, string> = {
  beginner: 'bg-green-500/10 text-green-500 border-green-500/20',
  intermediate: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  advanced: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  expert: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const whatsNew = [
  { title: 'New: AI Fundamentals Course', desc: 'Start learning AI from scratch — no coding experience required. Covers neural networks, LLMs, and practical applications.', date: 'Just launched', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80' },
  { title: 'Cloud Migration Workshop', desc: 'Hands-on workshop covering assessment, planning, and execution of cloud migrations for African businesses.', date: 'New workshop', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80' },
  { title: 'Cybersecurity Certification', desc: 'Earn your Clawn Academy Cybersecurity Professional certification. 8 courses, 3 labs, 1 exam.', date: 'Now available', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?auto=format&fit=crop&w=600&q=80' },
];

const featuredPaths = [
  {
    title: 'AI & Machine Learning Path',
    description: 'Elevate your skills in artificial intelligence and machine learning. From neural networks to LLMs, computer vision to NLP — complete the path and earn a Clawn Academy AI certification.',
    cta: 'AI & ML Path Details',
    color: '#6d5dfc',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Cloud & DevOps Path',
    description: 'Master cloud architecture, deployment, and operations. Learn to build scalable infrastructure with Docker, Kubernetes, and infrastructure-as-code — certified by Clawn Academy.',
    cta: 'Cloud Path Details',
    color: '#2563eb',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
  },
];

const benefits = [
  { icon: Target, title: 'Access to Technical Expertise', desc: 'Learn from industry experts on the latest technology trends and best practices.' },
  { icon: Clock, title: 'Flexible Training Solutions', desc: 'Online courses you can take on your own schedule, at your own pace.' },
  { icon: Layers, title: 'Industry-Standard Tools', desc: 'Hands-on experience with widely used frameworks, platforms, and development tools.' },
  { icon: Globe, title: 'Application Across Industries', desc: 'Courses applicable to agriculture, finance, healthcare, education, mining, and more.' },
  { icon: Award, title: 'Get Certified', desc: 'Validate your skills with Clawn Academy certifications recognized across Africa.' },
  { icon: BookOpen, title: 'Real-World Examples', desc: 'Content built by industry practitioners with real project experience.' },
  { icon: Cpu, title: 'Cloud Lab Environments', desc: 'Access pre-configured cloud environments for hands-on exercises and projects.' },
  { icon: Rocket, title: 'Reduce Time to Production', desc: 'Best practices and patterns to deploy what you learn immediately at work.' },
];

const stats = [
  { label: 'Active Learners', value: '2,500+' },
  { label: 'Expert Courses', value: '50+' },
  { label: 'Hours of Content', value: '200+' },
  { label: 'Completion Rate', value: '94%' },
];

const anchorLinks = [
  { label: "What's New", href: '#whats-new' },
  { label: 'Featured Learning Paths', href: '#learning-paths' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Contact Us', href: '#contact' },
];

export default function ClaudeAcademy() {
  const [, navigate] = useLocation();
  const { isAuthenticated, openLoginModal } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*, vendors(shop_name), categories(name, slug)')
        .eq('status', 'active')
        .order('featured', { ascending: false })
        .order('enrolled_count', { ascending: false });
      if (error) throw error;
      setCourses((data as Course[]) || []);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = (course: Course) => {
    if (!isAuthenticated) { openLoginModal(); return; }
    addToCart({
      productId: course.id, name: course.title, price: Number(course.price),
      image: course.thumbnail_url || '', vendorName: course.vendors?.shop_name || 'Clawn Academy', stock: 9999,
    });
    toast({ title: 'Added to cart', description: `"${course.title}" added to your cart` });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Clawn Academy - Technology Training & Certifications"
        description="Industry-leading courses in AI, Cloud, Cybersecurity, and Data Science. Learn from experts, earn certifications, and advance your career with Clawn Academy."
        keywords={['technology training Africa', 'AI courses Zimbabwe', 'cybersecurity certification', 'cloud computing training']}
      />

      <Header />

      {/* ===== 1. HERO ===== */}
      <section className="relative bg-gradient-to-br from-[#0a0a1a] via-[#111128] to-[#0d0d20] py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2200&q=85" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a1a]/50 to-[#0a0a1a]" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <Breadcrumbs items={[{ name: 'Clawn Academy', url: '/clawn-academy' }]} className="text-white/50 mb-8" />
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-nvidia-500 mb-4">Clawn Academy</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              Training for Technology{' '}
              <span className="text-nvidia-500">Professionals</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/60 mb-8 max-w-xl leading-relaxed">
              Learn to deploy, manage, and optimize AI, cloud, cybersecurity, and data infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-nvidia-500 hover:bg-nvidia-600 text-black font-bold h-12 px-8" onClick={() => document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Browse Courses <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/get-started">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-12 px-8 font-bold">
                  For Teams
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 pt-8 border-t border-white/10">
              {anchorLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-sm text-white/40 hover:text-white transition-colors">{link.label}</a>
              ))}
            </div>
          </div>
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-black text-nvidia-500">{stat.value}</p>
                <p className="text-sm text-white/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 2. INTRO with image ===== */}
      <section className="py-20 sm:py-28 bg-white dark:bg-cc-darker">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=85" alt="Team learning together" className="w-full aspect-[4/3] object-cover" />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-black mb-6">Start Your Training Journey</h2>
              <p className="text-lg text-[#46586b] dark:text-slate-300 leading-relaxed mb-4">
                Gain hands-on skills in AI, cloud infrastructure, cybersecurity, and data analytics.
                Our courses are built for African professionals and businesses — practical,
                affordable, and immediately applicable to your work.
              </p>
              <p className="text-lg text-[#46586b] dark:text-slate-300 leading-relaxed">
                Whether you are a developer, system administrator, data analyst, or business leader,
                Clawn Academy has a learning path designed for your career goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. WHAT'S NEW with images ===== */}
      <section id="whats-new" className="py-20 sm:py-28 bg-gray-50 dark:bg-cc-card">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">What's New in Training</h2>
            <p className="text-[#46586b] dark:text-slate-300 max-w-2xl mx-auto">The latest courses, workshops, and certifications from Clawn Academy.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whatsNew.map((item) => (
              <div key={item.title} className="group rounded-2xl overflow-hidden bg-white dark:bg-cc-darker border border-gray-200 dark:border-white/10 hover:border-nvidia-500/30 transition-colors">
                <div className="relative h-44 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-nvidia-500 text-black border-0 text-xs">{item.date}</Badge>
                </div>
                <div className="p-6">
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-[#46586b] dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. FEATURED LEARNING PATHS with images ===== */}
      <section id="learning-paths" className="py-20 sm:py-28 bg-white dark:bg-cc-darker">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Featured Learning Paths</h2>
            <p className="text-[#46586b] dark:text-slate-300">
              Structured paths from beginner to certification. Each path includes multiple courses,
              hands-on labs, and a final certification exam.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {featuredPaths.map((path) => (
              <div key={path.title} className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-nvidia-500/30 transition-colors">
                <div className="relative h-52 overflow-hidden">
                  <img src={path.image} alt={path.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-black text-white">{path.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-[#46586b] dark:text-slate-300 leading-relaxed mb-4">{path.description}</p>
                  <a href="#" className="inline-flex items-center gap-1 text-nvidia-500 font-bold text-sm hover:gap-2 transition-all">
                    {path.cta} <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. WORKSHOP with image ===== */}
      <section className="py-20 sm:py-28 bg-gray-50 dark:bg-cc-card">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black mb-6">Hands-On Workshops & Training Labs</h2>
              <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-4">
                Join our upcoming hands-on workshops, training labs, and certification exams.
                Build real-world AI, cloud, and cybersecurity skills with expert instructors.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-cc-darker border border-gray-200 dark:border-white/10">
                  <Cloud className="h-5 w-5 text-nvidia-500 flex-shrink-0" />
                  <span className="text-sm text-[#46586b] dark:text-slate-300"><strong>Workshops:</strong> Practical sessions on AI, Cloud, and Security</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-cc-darker border border-gray-200 dark:border-white/10">
                  <Cpu className="h-5 w-5 text-nvidia-500 flex-shrink-0" />
                  <span className="text-sm text-[#46586b] dark:text-slate-300"><strong>Training Labs:</strong> Guided hands-on exercises in cloud environments</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-cc-darker border border-gray-200 dark:border-white/10">
                  <Award className="h-5 w-5 text-nvidia-500 flex-shrink-0" />
                  <span className="text-sm text-[#46586b] dark:text-slate-300"><strong>Certification:</strong> Free exams for on-site attendees</span>
                </div>
              </div>
              <a href="#" className="inline-flex items-center gap-1 text-nvidia-500 font-bold text-sm hover:gap-2 transition-all">
                Explore Upcoming Workshops <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=85" alt="Workshop training session" className="w-full aspect-[4/3] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. ALL COURSES ===== */}
      <section id="courses-section" className="py-20 sm:py-28 bg-white dark:bg-cc-darker">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">All Courses</h2>
            <p className="text-[#46586b] dark:text-slate-300 max-w-2xl mx-auto">Browse our full catalog of expert-led courses.</p>
          </div>
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10">
                  <div className="bg-gray-200 dark:bg-white/5 h-44" />
                  <div className="p-5 space-y-3">
                    <div className="bg-gray-200 dark:bg-white/5 rounded h-4 w-3/4" />
                    <div className="bg-gray-200 dark:bg-white/5 rounded h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-gray-200 dark:border-white/10 max-w-3xl mx-auto">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80" alt="" className="w-32 h-32 mx-auto rounded-2xl object-cover mb-6 opacity-60" />
              <h3 className="text-xl font-black mb-2">Courses Coming Soon</h3>
              <p className="text-[#46586b] dark:text-slate-400 mb-6 max-w-md mx-auto">
                We're building world-class courses. Check back soon or register as a vendor.
              </p>
              <Link href="/vendor/dashboard">
                <Button className="bg-nvidia-500 hover:bg-nvidia-600 text-black font-bold">Create a Course</Button>
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {courses.map((course) => (
                <div key={course.id} className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-nvidia-500/30 transition-colors bg-white dark:bg-cc-card">
                  <div className="relative h-44 overflow-hidden">
                    {course.thumbnail_url ? (
                      <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-nvidia-500/10 to-blue-500/10">
                        <BookOpen className="h-12 w-12 text-nvidia-500/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play className="h-6 w-6 text-white ml-1" />
                      </div>
                    </div>
                    {course.featured && <Badge className="absolute top-3 left-3 bg-nvidia-500 text-black border-0 text-xs"><Award className="h-3 w-3 mr-1" /> Featured</Badge>}
                    <Badge className={`absolute top-3 right-3 ${levelColors[course.level] || ''}`} variant="outline">{course.level}</Badge>
                  </div>
                  <div className="p-5">
                    {course.categories && <Badge variant="secondary" className="text-xs mb-2">{course.categories.name}</Badge>}
                    <h3 className="font-bold mb-1 line-clamp-1">{course.title}</h3>
                    {course.subtitle && <p className="text-sm text-[#46586b] dark:text-slate-400 mb-3 line-clamp-1">{course.subtitle}</p>}
                    <div className="flex items-center gap-3 text-xs text-[#46586b] dark:text-slate-400 mb-4">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration_hours}h</span>
                      <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {course.lessons_count}</span>
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {course.enrolled_count}</span>
                      {course.rating > 0 && <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-yellow-500 text-yellow-500" /> {Number(course.rating).toFixed(1)}</span>}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/5">
                      <span className="text-xl font-black text-nvidia-500">{Number(course.price) === 0 ? 'Free' : `$${Number(course.price).toFixed(2)}`}</span>
                      <Button size="sm" className="bg-nvidia-500 hover:bg-nvidia-600 text-black font-bold" onClick={() => handleEnroll(course)}>Enroll Now</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== 7. BENEFITS with image ===== */}
      <section id="benefits" className="py-20 sm:py-28 bg-gray-50 dark:bg-cc-card">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black mb-4">Benefits of Clawn Academy Training</h2>
              <p className="text-[#46586b] dark:text-slate-300 mb-8">Everything you need to build real skills and advance your career.</p>
              <div className="grid sm:grid-cols-2 gap-6">
                {benefits.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-nvidia-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="h-5 w-5 text-nvidia-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-[#46586b] dark:text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl hidden lg:block">
              <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=85" alt="Professional learning" className="w-full aspect-[3/4] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 8. RESOURCES ===== */}
      <section id="contact" className="py-20 sm:py-28 bg-white dark:bg-cc-darker">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black mb-10">Resources</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-10">
              <div>
                <h3 className="text-lg font-black mb-3">Contact Us</h3>
                <p className="text-sm text-[#46586b] dark:text-slate-300 leading-relaxed mb-4">
                  Questions about Clawn Academy training and certification programs?
                  Our team is ready to help you find the right learning path.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-1 text-nvidia-500 font-bold text-sm hover:gap-2 transition-all">
                  Contact Us <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div>
                <h3 className="text-lg font-black mb-3">Team Training</h3>
                <p className="text-sm text-[#46586b] dark:text-slate-300 leading-relaxed mb-4">
                  Equip your team with the skills they need. Custom training programs,
                  group discounts, and enterprise solutions available.
                </p>
                <Link href="/get-started" className="inline-flex items-center gap-1 text-nvidia-500 font-bold text-sm hover:gap-2 transition-all">
                  Request More Information <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-black mb-3">Stay Informed</h3>
              <p className="text-sm text-[#46586b] dark:text-slate-300 leading-relaxed mb-4">
                Get the latest on new courses, learning paths, workshops, and technology
                training opportunities delivered to your inbox.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-1 text-nvidia-500 font-bold text-sm hover:gap-2 transition-all">
                Subscribe <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 9. CTA ===== */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-nvidia-500 to-nvidia-600 text-black">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-black/70 max-w-2xl mx-auto mb-10">Join thousands of professionals mastering AI, Cloud, and Cybersecurity.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-black text-white hover:bg-gray-900 h-14 px-10 font-bold text-lg" onClick={() => document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Courses
            </Button>
            <Link href="/get-started">
              <Button size="lg" variant="outline" className="border-black/20 text-black hover:bg-black/10 h-14 px-10 font-bold text-lg">
                Enterprise Training
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <PersistentCTA />
    </div>
  );
}
