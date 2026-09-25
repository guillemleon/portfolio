import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { languageAlternates, localisedUrl } from '@/utils/metadata';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageTransition } from '@/components/page-transition/index';
import Reveal from '@/components/reveal';
import AppStoreButton from '@/components/app-store-button';
import { childrenOf, workBySlug, workSlugs } from '@/utils/work';
import styles from './work-detail.module.css';

export function generateStaticParams() {
    return routing.locales.flatMap((locale) =>
        workSlugs().map((slug) => ({ locale, slug })),
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    const entry = workBySlug(slug);

    if (!entry) return {};

    const path = `/work/${slug}`;
    const url = localisedUrl(locale, path);

    return {
        // The layout template appends the site name, so only the page title here.
        title: entry.title,
        description: entry.summary,
        alternates: { canonical: url, languages: languageAlternates(path) },
        openGraph: {
            type: 'article',
            title: entry.title,
            description: entry.summary,
            url,
        },
    };
}

export default async function WorkDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const entry = workBySlug(slug);

    if (!entry) notFound();

    const t = await getTranslations('work');
    const children = childrenOf(entry.slug);
    const parentTitle = entry.parent ? (workBySlug(entry.parent)?.company ?? '') : '';

    return (
        <PageTransition>
            <article className={styles.page}>
                <Link
                    href={entry.parent ? `/work/${entry.parent}` : '/work'}
                    className={styles.back}
                    transitionTypes={['nav-back']}
                >
                    {entry.parent ? parentTitle : t('backToWork')}
                </Link>

                <header className={styles.header}>
                    <p className={styles.company}>{entry.company}</p>
                    <h1 className={styles.title}>{entry.title}</h1>
                    <p className={styles.headline}>{entry.headline}</p>
                    <p className={styles.intro}>{entry.intro}</p>

                    <dl className={styles.meta}>
                        <div className={styles.metaItem}>
                            <dt>{t('role')}</dt>
                            <dd>{entry.role}</dd>
                        </div>
                        <div className={styles.metaItem}>
                            <dt>{t('period')}</dt>
                            <dd data-tabular="">
                                {entry.from === entry.to ? entry.from : `${entry.from} — ${entry.to}`}
                            </dd>
                        </div>
                        <div className={styles.metaItem}>
                            <dt>{t('stack')}</dt>
                            <dd>{entry.tags.join(' · ')}</dd>
                        </div>
                    </dl>

                    <div className={styles.actions}>
                        {entry.appStore ? (
                            <AppStoreButton
                                href={entry.appStore}
                                caption={t('appStoreCaption')}
                                label={t('appStoreLabel')}
                            />
                        ) : null}

                        {entry.links.map((link) => (
                            <a
                                key={link.url}
                                className={styles.visit}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </header>

                {entry.images.length ? (
                    <section className={styles.gallery}>
                        {entry.images.map((image, index) => (
                            <Reveal key={image.src} delay={index * 60} className={styles.shotWrap}>
                                <figure className={styles.shot}>
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        width={1600}
                                        height={800}
                                        sizes="(max-width: 860px) 100vw, 860px"
                                        className={styles.shotImage}
                                        priority={index === 0}
                                    />
                                    {image.link ? (
                                        <figcaption className={styles.shotCaption}>
                                            <a href={image.link} target="_blank" rel="noreferrer noopener">
                                                {image.alt}
                                            </a>
                                        </figcaption>
                                    ) : null}
                                </figure>
                            </Reveal>
                        ))}
                    </section>
                ) : null}

                {entry.stats?.length ? (
                    <Reveal as="section" className={styles.stats}>
                        {entry.stats.map((stat) => (
                            <div key={stat.subtitle} className={styles.stat}>
                                <span className={styles.statTitle}>{stat.title}</span>
                                <span className={styles.statSubtitle}>{stat.subtitle}</span>
                            </div>
                        ))}
                    </Reveal>
                ) : null}

                <div className={styles.points}>
                    {entry.points.map((point, index) => (
                        <Reveal as="section" key={point.title} delay={index * 60} className={styles.point}>
                            <p className={styles.pointLabel}>{point.title}</p>
                            <h2 className={styles.pointName}>{point.name}</h2>
                            {point.description.split(/\\n|\n/).map((paragraph) => {
                                const text = paragraph.trim();
                                if (!text) return null;
                                return (
                                    <p key={text.slice(0, 40)} className={styles.pointText}>
                                        {text}
                                    </p>
                                );
                            })}
                        </Reveal>
                    ))}
                </div>

                {children.length ? (
                    <Reveal as="section" className={styles.children}>
                        <h2 className={styles.childrenTitle}>{t('highlights')}</h2>
                        <ul className={styles.childList} role="list">
                            {children.map((child) => (
                                <li key={child.slug}>
                                    <Link
                                        href={`/work/${child.slug}`}
                                        className={styles.child}
                                        transitionTypes={['nav-forward']}
                                    >
                                        <span className={styles.childHead}>
                                            <span className={styles.childTitle}>{child.title}</span>
                                            <span className={styles.childYears} data-tabular="">
                                                {child.from === child.to
                                                    ? child.from
                                                    : `${child.from} — ${child.to}`}
                                            </span>
                                        </span>
                                        <span className={styles.childSummary}>{child.summary}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                ) : null}

                {entry.smart_details?.length ? (
                    <Reveal as="section" className={styles.details}>
                        {entry.smart_details.map((detail) => (
                            <div key={detail.name} className={styles.detail}>
                                <span className={styles.detailName}>{detail.name}</span>
                                <span className={styles.detailText}>{detail.description}</span>
                            </div>
                        ))}
                    </Reveal>
                ) : null}
            </article>
        </PageTransition>
    );
}
