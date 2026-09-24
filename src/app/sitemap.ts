import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { workSlugs } from '@/utils/work';
import { languageAlternates, localisedUrl } from '@/utils/metadata';

const paths = ['', '/work', '/about', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];

    for (const path of paths) {
        for (const locale of routing.locales) {
            entries.push({
                url: localisedUrl(locale, path),
                lastModified: new Date(),
                changeFrequency: path === '' ? 'monthly' : 'yearly',
                priority: path === '' ? 1 : 0.8,
                alternates: { languages: languageAlternates(path) },
            });
        }
    }

    for (const slug of workSlugs()) {
        const path = `/work/${slug}`;

        for (const locale of routing.locales) {
            entries.push({
                url: localisedUrl(locale, path),
                lastModified: new Date(),
                changeFrequency: 'yearly',
                priority: 0.6,
                alternates: { languages: languageAlternates(path) },
            });
        }
    }

    return entries;
}
