interface Site {
    /** Production origin, no trailing slash. Used for canonicals, sitemap and OG. */
    url: string;
    name: string;
    shortName: string;
    /** Path to the CV inside /public. Empty hides the download button. */
    cv: string;
    /** Profiles that prove this is the same person, for the Person schema. */
    sameAs: string[];
}

export const site: Site = {
    url: 'https://guillemleon.com',
    name: 'Guillem Leon Font',
    shortName: 'Guillem Leon',
    cv: '/guillem-leon-font-cv.pdf',
    sameAs: [
        'https://apps.apple.com/es/developer/guillem-leon-font/id1859444659',
    ],
};
