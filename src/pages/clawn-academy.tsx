import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/components/CartProvider';
import { useToast } from '@/hooks/use-toast';
import {
  GraduationCap, Clock, Users, Star, Award, Play, BookOpen,
  Brain, Shield, Cloud, Code, BarChart3, ChevronRight, CheckCircle
} from 'lucide-react';

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

const featuredTracks = [
  {
    title: 'AI Fundamentals',
    description: 'Master the foundations of artificial intelligence and machine learning',
    icon: Brain,
    courses: 8,
    color: 'from-purple-500 to-blue-600',
  },
  {
    title: 'Cloud Architecture',
    description: 'Build scalable, resilient cloud infrastructure from scratch',
    icon: Cloud,
    courses: 6,
    color: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Cybersecurity Mastery',
    description: 'Defend systems with industry-leading security practices',
    icon: Shield,
    courses: 7,
    color: 'from-green-500 to-emerald-600',
  },
  {
    title: 'Data Science Pro',
    description: 'Turn raw data into actionable business intelligence',
    icon: BarChart3,
    courses: 5,
    color: 'from-yellow-500 to-orange-600',
  },
];

const stats = [
  { label: 'Active Learners', value: '2,500+' },
  { label: 'Expert Courses', value: '50+' },
  { label: 'Hours of Content', value: '200+' },
  { label: 'Completion Rate', value: '94%' },
];

export default function ClaudeAcademy() {
  const [, navigate] = useLocation();
  const { isAuthenticated, openLoginModal } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchCourses();
  }, [filter]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('courses')
        .select('*, vendors(shop_name), categories(name, slug)')
        .eq('status', 'active')
        .order('featured', { ascending: false })
        .order('enrolled_count', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('level', filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setCourses((data as Course[]) || []);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = (course: Course) => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }
    addToCart({
      productId: course.id,
      name: course.title,
      price: Number(course.price),
      image: course.thumbnail_url || '',
      vendorName: course.vendors?.shop_name || 'Clawn Academy',
      stock: 9999,
    });
    toast({ title: 'Added to cart', description: `"${course.title}" added to your cart` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
              <GraduationCap className="h-3 w-3 mr-1" /> Clawn Academy
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Master the Future of{' '}
              Technology
            </h1>
            <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Industry-leading courses in AI, Cloud, Cybersecurity, and Data Science.
              Learn from experts, earn certifications, advance your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => {
                document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Browse Courses
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10"
                onClick={() => navigate('/get-started')}>
                For Teams
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

      {/* Learning Tracks */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Learning Tracks</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Structured paths designed to take you from beginner to expert
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTracks.map((track) => (
              <Card key={track.title} className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${track.color}`} />
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center mb-4`}>
                    <track.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{track.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{track.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{track.courses} courses</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses-section" className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-3xl font-bold">All Courses</h2>
            <Tabs value={filter} onValueChange={setFilter}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="beginner">Beginner</TabsTrigger>
                <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
                <TabsTrigger value="expert">Expert</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg h-40 mb-4" />
                  <div className="bg-muted rounded h-4 w-3/4 mb-2" />
                  <div className="bg-muted rounded h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-16">
              <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">Courses Coming Soon</h3>
              <p className="text-muted-foreground mb-6">
                We're building world-class courses in AI, Cloud, and more.
                Check back soon or register as a vendor to create courses.
              </p>
              <Button onClick={() => navigate('/vendor/dashboard')}>
                Create a Course
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-44 bg-muted overflow-hidden">
                    {course.thumbnail_url ? (
                      <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                        <BookOpen className="h-12 w-12 text-blue-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play className="h-6 w-6 text-white ml-1" />
                      </div>
                    </div>
                    {course.featured && (
                      <Badge className="absolute top-3 left-3 bg-yellow-500 text-black">
                        <Award className="h-3 w-3 mr-1" /> Featured
                      </Badge>
                    )}
                    <Badge className={`absolute top-3 right-3 ${levelColors[course.level] || ''}`} variant="outline">
                      {course.level}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    {course.categories && (
                      <Badge variant="secondary" className="text-xs mb-2">{course.categories.name}</Badge>
                    )}
                    <h3 className="font-bold text-lg mb-1 line-clamp-1">{course.title}</h3>
                    {course.subtitle && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{course.subtitle}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {course.duration_hours}h
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" /> {course.lessons_count} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" /> {course.enrolled_count}
                      </span>
                      {course.rating > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" /> {Number(course.rating).toFixed(1)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-500">
                        {Number(course.price) === 0 ? 'Free' : `$${Number(course.price).toFixed(2)}`}
                      </span>
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white"
                        onClick={() => handleEnroll(course)}>
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Clawn Academy */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Clawn Academy?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for the next generation of tech professionals
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Brain, title: 'Expert-Led Content', desc: 'Courses designed by industry leaders and AI researchers' },
              { icon: Award, title: 'Certifications', desc: 'Earn recognized certifications to boost your career' },
              { icon: Play, title: 'Hands-On Labs', desc: 'Practice with real-world projects and interactive labs' },
              { icon: Users, title: 'Community', desc: 'Join a global community of learners and professionals' },
              { icon: Clock, title: 'Learn at Your Pace', desc: 'Self-paced courses you can complete on your schedule' },
              { icon: CheckCircle, title: 'Lifetime Access', desc: 'Once enrolled, access course materials forever' },
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

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Join thousands of professionals mastering AI, Cloud, and Cybersecurity with Clawn Academy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90"
              onClick={() => document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Courses
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10"
              onClick={() => navigate('/get-started')}>
              Enterprise Training
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
