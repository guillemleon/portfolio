import workData from '@/data/work.json';
import type { WorkCategory, WorkData, WorkEntry } from '@/types/work';

const { page, data } = workData as WorkData;

export const workPage = page;

export const allWork: WorkEntry[] = data;

export const workByCategory = (category: WorkCategory): WorkEntry[] =>
    data.filter((entry) => entry.category === category);

export const jobs = (): WorkEntry[] => data.filter((entry) => entry.category === 'job');

export const sideProjects = (): WorkEntry[] => data.filter((entry) => entry.category === 'side');

export const childrenOf = (slug: string): WorkEntry[] =>
    data.filter((entry) => entry.parent === slug);

export const featuredWork = (): WorkEntry[] => data.filter((entry) => entry.featured);

export const workBySlug = (slug: string): WorkEntry | undefined =>
    data.find((entry) => entry.slug === slug);

export const workSlugs = (): string[] => data.map((entry) => entry.slug);
