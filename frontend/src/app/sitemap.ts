import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://japanbusinessdirectory.com'; // Adjust to your actual domain
  
  // Static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic article routes
  const articles = getAllArticles();
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => {
    const date = new Date(article.publishedAt);
    const safeDate = isNaN(date.getTime()) ? new Date() : date;
    
    return {
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: safeDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    };
  });

  return [...routes, ...articleRoutes];
}
