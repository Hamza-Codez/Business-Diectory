import { MetadataRoute } from 'next';
import { getAllBlogs } from '@/lib/blogs';

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
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic blog routes
  const blogs = getAllBlogs();
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => {
    const date = new Date(blog.publishedAt);
    const safeDate = isNaN(date.getTime()) ? new Date() : date;
    
    return {
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: safeDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    };
  });

  return [...routes, ...blogRoutes];
}
