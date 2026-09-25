import { localisedUrl } from './metadata';
import { site } from './site';

/**
 * Person schema. This is what lets Google show a knowledge panel for the name,
 * and it is the single highest-value structured data for a personal site.
 */
export const personSchema = (locale: string) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    alternateName: ['Guillem Leon Font', 'Guillem León', 'Guillem Leon'],
    url: localisedUrl(locale),
    jobTitle: 'Software Engineer',
    worksFor: {
        '@type': 'Organization',
        name: 'Filmin',
    },
    knowsAbout: [
        'Software Engineering',
        'Web Development',
        'React',
        'TypeScript',
        'Node.js',
        'Python',
        'SwiftUI',
        'iOS Development',
        'Smart TV Development',
    ],
    sameAs: site.sameAs,
});
