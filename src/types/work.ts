export type WorkKind = 'job' | 'project';

export type WorkCategory = 'job' | 'work' | 'side';

export interface WorkStat {
    title: string;
    subtitle: string;
}

export interface WorkDetail {
    name: string;
    description: string;
}

export interface WorkLink {
    label: string;
    url: string;
}

export interface WorkImage {
    src: string;
    alt: string;
    /** Optional site the shot belongs to, for entries covering several sites. */
    link: string;
}

export interface WorkPoint {
    title: string;
    name: string;
    description: string;
    quotes: string[];
}

export interface WorkEntry {
    slug: string;
    kind: WorkKind;
    category: WorkCategory;
    parent: string;
    ai: boolean;
    featured: boolean;
    title: string;
    headline: string;
    company: string;
    role: string;
    from: string;
    to: string;
    appStore: string;
    summary: string;
    intro: string;
    tags: string[];
    links: WorkLink[];
    images: WorkImage[];
    stat: WorkStat;
    smart_details: WorkDetail[];
    smart_tags: WorkDetail[];
    points: WorkPoint[];
    stats: WorkStat[];
}

export interface WorkPage {
    title: string;
    intro: string;
}

/** The translatable half of an entry. Lives in work.<locale>.json. */
export interface WorkProse {
    title: string;
    headline: string;
    role: string;
    summary: string;
    intro: string;
    stat: WorkStat;
    smart_details: WorkDetail[];
    smart_tags: WorkDetail[];
    points: WorkPoint[];
    stats: WorkStat[];
}

export interface WorkData {
    page: { title: string; intro: string };
    data: WorkEntry[];
}
