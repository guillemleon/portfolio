import structure from '@/data/work.json';
import en from '@/data/work.en.json';
import es from '@/data/work.es.json';
import ca from '@/data/work.ca.json';
import type { WorkEntry, WorkCategory, WorkPage, WorkProse } from '@/types/work';

interface Structure {
    data: Omit<WorkEntry, keyof WorkProse>[];
}

interface Locale {
    page: WorkPage;
    entries: Record<string, WorkProse>;
}

const locales: Record<string, Locale> = {
    en: en as Locale,
    es: es as Locale,
    ca: ca as Locale,
};

const fallback = 'en';

/** Ongoing entries store "Present" in the shared structure; shown in the page's language. */
const present: Record<string, string> = { en: 'Present', es: 'Actualidad', ca: 'Actualitat' };

const localeFor = (locale: string): Locale => locales[locale] ?? locales[fallback]!;

/** Structure and prose are stored apart so a translation cannot drift from the data. */
const merge = (locale: string): WorkEntry[] => {
    const pack = localeFor(locale);

    return (structure as Structure).data.map((entry) => {
        const prose = pack.entries[entry.slug] ?? locales[fallback]!.entries[entry.slug];
        const to = entry.to === 'Present' ? (present[locale] ?? present[fallback]!) : entry.to;
        return { ...entry, ...prose, to } as WorkEntry;
    });
};

export const workPage = (locale: string): WorkPage => localeFor(locale).page;

export const allWork = (locale: string): WorkEntry[] => merge(locale);

export const workByCategory = (locale: string, category: WorkCategory): WorkEntry[] =>
    merge(locale).filter((entry) => entry.category === category);

export const jobs = (locale: string): WorkEntry[] => workByCategory(locale, 'job');

export const sideProjects = (locale: string): WorkEntry[] => workByCategory(locale, 'side');

export const childrenOf = (locale: string, slug: string): WorkEntry[] =>
    merge(locale).filter((entry) => entry.parent === slug);

export const workBySlug = (locale: string, slug: string): WorkEntry | undefined =>
    merge(locale).find((entry) => entry.slug === slug);

export const workSlugs = (): string[] => (structure as Structure).data.map((e) => e.slug);
