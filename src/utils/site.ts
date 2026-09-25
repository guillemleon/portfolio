interface Site {
    /** Production origin, no trailing slash. Used for canonicals, sitemap and OG. */
    url: string;
    name: string;
    shortName: string;
    /** Path to the CV inside /public. Empty hides the download button. */
    cv: string;
    /** Shows the green "open to new projects" light in the header. */
    available: boolean;
    /** Profiles that prove this is the same person, for the Person schema. */
    linkedin: string;
    sameAs: string[];
}

export const site: Site = {
    url: 'https://guillemleon.com',
    name: 'Guillem León Font',
    shortName: 'Guillem León',
    cv: '/guillem-leon-font-cv.pdf',
    available: true,
    linkedin: 'https://es.linkedin.com/in/guillem-le%C3%B3n-font-904ba7105',
    sameAs: [
        'https://es.linkedin.com/in/guillem-le%C3%B3n-font-904ba7105',
        'https://apps.apple.com/es/developer/guillem-leon-font/id1859444659',
    ],
};
