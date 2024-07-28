import { MetadataRoute } from 'next';
 
export default function sitemap(): MetadataRoute.Sitemap {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.sudobot.org";
 
    return ['/', '/login'].map(route => ({
        url: `${baseURL}${route}`,
        lastModified: new Date(),
    }));
}
