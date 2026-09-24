import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { site } from './site';

type SeoKey = 'home' | 'work' | 'about' | 'contact';

/** Path for a locale under localePrefix: 'as-needed' (default locale has no prefix). */
export const localisedUrl = (locale: string, path = ''): string => {
    const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
    return `${site.url}${prefix}${path}`;
};

/** hreflang map for every locale, plus x-default pointing at the default locale. */
export const languageAlternates = (path = ''): Record<string, string> => {
    const languages: Record<string, string> = {};

    for (const locale of routing.locales) {
        languages[locale] = localisedUrl(locale, path);
    }

    languages['x-default'] = localisedUrl(routing.defaultLocale, path);
    return languages;
};

interface PageMetadataOptions {
    locale: string;
    key: SeoKey;
    path?: string;
}

export const pageMetadata = async ({
    locale,
    key,
    path = '',
}: PageMetadataOptions): Promise<Metadata> => {
    const t = await getTranslations({ locale, namespace: 'seo' });
    const title = t(`${key}.title`);
    const description = t(`${key}.description`);
    const url = localisedUrl(locale, path);

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: languageAlternates(path),
        },
        openGraph: {
            type: 'website',
            siteName: site.name,
            locale,
            title,
            description,
            url,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
};
