import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const base = 'https://makroly.com';
    const now = new Date('2026-04-14');

    return [
        {
            url: base,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 1.0,
        },
        {
            url: `${base}/app`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${base}/terms`,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${base}/privacy`,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];
}
