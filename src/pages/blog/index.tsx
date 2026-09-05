import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, ArticleSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

const posts: BlogPost[] = [
  {
    slug: 'drones-transforming-agriculture-zimbabwe',
    title: 'How Drones Are Transforming Agriculture in Zimbabwe',
    excerpt: 'Drone technology is helping Zimbabwean farmers detect crop stress earlier, reduce water waste, and improve yields — all at an affordable price point.',
    category: 'Agriculture',
    date: '2026-09-05',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1508614389643-0f8e1a7b8916?auto=format&fit=crop&w=800&q=85',
  },
  {
    slug: 'cybersecurity-zimbabwean-businesses',
    title: 'Why Cybersecurity Matters for Zimbabwean Businesses',
    excerpt: 'Cyber attacks across Africa are rising. Here is why every Zimbabwean business needs proactive security — and how to start.',
    category: 'Cybersecurity',
    date: '2026-09-05',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?auto=format&fit=crop&w=800&q=85',
  },
  {
    slug: 'cloud-computing-zimbabwe-practical-guide',
    title: 'Cloud Computing in Zimbabwe: A Practical Introduction',
    excerpt: 'Moving from fragile office setups to reliable cloud infrastructure. A plain-English guide for Zimbabwean organizations.',
    category: 'Cloud',
    date: '2026-09-05',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=85',
  },
  {
    slug: 'artificial-intelligence-zimbabwe-opportunities',
    title: 'Artificial Intelligence in Zimbabwe: Opportunities and Challenges',
    excerpt: 'Practical AI applications for agriculture, finance, education, and healthcare — and how Zimbabwean organizations can get started.',
    category: 'AI & ML',
    date: '2026-09-05',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=85',
  },
];

const categories = ['All', 'Agriculture', 'Cybersecurity', 'Cloud', 'AI & ML'];

export default function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Blog"
        description="Insights, guides, and news from ClawnCore Multitech. Articles on agriculture technology, cybersecurity, cloud computing, and AI for Zimbabwe and Africa."
        keywords={['ClawnCore blog', 'technology blog Zimbabwe', 'agriculture technology articles', 'AI Africa blog']}
        ogImage="/og-blog.png"
      />

      <Header />

      <main>
        <section className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-24 sm:py-32 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <Breadcrumbs
              items={[
                { name: 'Resources', url: '/resources' },
                { name: 'Blog', url: '/blog' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                The <span className="text-nvidia-500">ClawnCore</span> Blog
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed">
                Insights, guides, and news on technology for Zimbabwe and Africa.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b border-gray-200 dark:border-white/10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    activeCategory === cat
                      ? 'bg-nvidia-500 text-white'
                      : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 gap-8">
              {filtered.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <article className="group rounded-2xl bg-white dark:bg-cc-card border border-gray-200 dark:border-white/10 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                    <div className="relative overflow-hidden aspect-[16/9]">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-nvidia-500 text-white text-xs font-bold uppercase tracking-wide">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold mb-3 group-hover:text-nvidia-500 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 dark:text-slate-400 leading-relaxed flex-1">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-nvidia-500 font-semibold text-sm mt-4">
                        Read more <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <PersistentCTA />
    </div>
  );
}
