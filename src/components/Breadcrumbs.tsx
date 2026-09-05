import { Link } from 'wouter';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbSchema } from './SEO';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const allItems = [
    { name: 'Home', url: 'https://clawncore.com' },
    ...items,
  ];

  return (
    <>
      <BreadcrumbSchema items={allItems} />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center space-x-2 text-sm text-gray-600 dark:text-slate-400 ${className}`}
      >
        {allItems.map((item, index) => (
          <span key={item.url} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            )}
            {index === allItems.length - 1 ? (
              <span className="font-medium text-gray-900 dark:text-white">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.url}
                className="hover:text-nvidia-500 transition-colors"
              >
                {index === 0 ? (
                  <Home className="h-4 w-4" />
                ) : (
                  item.name
                )}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}

// Predefined breadcrumb patterns for common pages
export const breadcrumbPatterns = {
  home: () => [{ name: 'Home', url: '/' }],

  platform: (platform: string) => [
    { name: 'Platforms', url: '/platforms' },
    { name: platform, url: `/platforms/${platform.toLowerCase().replace(/\s+/g, '-')}` },
  ],

  feature: (platform: string, feature: string) => [
    { name: 'Platforms', url: '/platforms' },
    {
      name: platform,
      url: `/platforms/${platform.toLowerCase().replace(/\s+/g, '-')}`,
    },
    {
      name: feature,
      url: `/platforms/${platform.toLowerCase().replace(/\s+/g, '-')}/${feature.toLowerCase().replace(/\s+/g, '-')}`,
    },
  ],

  solution: (audience: string) => [
    { name: 'Solutions', url: '/solutions' },
    { name: audience, url: `/solutions/${audience.toLowerCase()}` },
  ],

  industry: (industry: string) => [
    { name: 'Industries', url: '/industries' },
    { name: industry, url: `/industries/${industry.toLowerCase()}` },
  ],

  guide: (title: string) => [
    { name: 'Resources', url: '/resources' },
    { name: 'Guides', url: '/resources/guides' },
    { name: title, url: `/resources/guides/${title.toLowerCase().replace(/\s+/g, '-')}` },
  ],

  blog: (title: string) => [
    { name: 'Blog', url: '/blog' },
    { name: title, url: `/blog/${title.toLowerCase().replace(/\s+/g, '-')}` },
  ],

  faq: (topic: string) => [
    { name: 'Resources', url: '/resources' },
    { name: 'FAQ', url: '/resources/faq' },
    { name: topic, url: `/resources/faq/${topic.toLowerCase()}` },
  ],

  comparison: (competitor: string) => [
    { name: 'Compare', url: '/compare' },
    { name: `ClawnCore vs ${competitor}`, url: `/compare/clawncore-vs-${competitor.toLowerCase().replace(/\s+/g, '-')}` },
  ],

  alternative: (competitor: string) => [
    { name: 'Alternatives', url: '/alternatives' },
    { name: `to ${competitor}`, url: `/alternatives/to-${competitor.toLowerCase().replace(/\s+/g, '-')}` },
  ],

  location: (city: string) => [
    { name: 'Locations', url: '/locations' },
    { name: city, url: `/locations/${city.toLowerCase().replace(/\s+/g, '-')}` },
  ],

  pricing: (platform?: string) => {
    const items = [{ name: 'Pricing', url: '/pricing' }];
    if (platform) {
      items.push({
        name: platform,
        url: `/pricing/${platform.toLowerCase().replace(/\s+/g, '-')}`,
      });
    }
    return items;
  },
};
