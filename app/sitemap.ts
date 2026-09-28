import type { MetadataRoute } from 'next';
import { serviceCities } from '@/lib/serviceCities';
import { siteConfig } from '@/lib/site';

const staticRoutes: { path: string; priority: number }[] = [
  { path: '', priority: 1 },
  { path: '/skill-games', priority: 0.95 },
  { path: '/host-a-machine', priority: 0.9 },
  { path: '/machines', priority: 0.8 },
  { path: '/find-a-machine', priority: 0.7 },
  { path: '/service-area', priority: 0.7 },
  { path: '/authenticity', priority: 0.6 },
  { path: '/about', priority: 0.5 },
  { path: '/contact', priority: 0.5 },
  { path: '/support', priority: 0.3 },
  { path: '/privacy-policy', priority: 0.2 },
  { path: '/brand-disclaimer', priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route.path}`,
      lastModified: now,
      priority: route.priority,
    })),
    ...serviceCities.map((city) => ({
      url: `${siteConfig.url}/service-area/${city.slug}`,
      lastModified: now,
      priority: 0.6,
    })),
  ];
}
