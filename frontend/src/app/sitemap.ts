import { MetadataRoute } from 'next';
import { getProjects } from '@/lib/strapi';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://portfolio.yulianguinand.com';
  const now = new Date();

  const staticRoutes = [
    { route: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { route: '/work', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/projects', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/photos', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/documents', priority: 0.8, changeFrequency: 'monthly' as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: now,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  const projects = await getProjects();
  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticEntries, ...projectEntries];
}
