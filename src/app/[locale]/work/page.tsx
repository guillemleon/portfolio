import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/utils/metadata';
import { PageTransition } from '@/components/page-transition/index';
import Reveal from '@/components/reveal';
import WorkRow from '@/components/work-row';
import { jobs, sideProjects } from '@/utils/work';
import styles from './work.module.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return pageMetadata({ locale, key: 'work', path: '/work' });
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('work');
    const experience = jobs(locale);
    const side = sideProjects(locale);

    return (
        <PageTransition>
            <div className={styles.page}>
                <header className={styles.intro}>
                    <h1 className={styles.title}>{t('title')}</h1>
                    <p className={styles.lede}>{t('intro')}</p>
                </header>

                <section className={styles.group} aria-labelledby="jobs-heading">
                    <h2 id="jobs-heading" className={styles.groupTitle}>
                        {t('jobs')}
                    </h2>
                    <ul className={styles.list} role="list">
                        {experience.map((entry, index) => (
                            <Reveal as="li" key={entry.slug} delay={index * 70}>
                                <WorkRow entry={entry} />
                            </Reveal>
                        ))}
                    </ul>
                </section>

                <section className={styles.group} aria-labelledby="projects-heading">
                    <h2 id="projects-heading" className={styles.groupTitle}>
                        {t('sideProjects')}
                    </h2>
                    <ul className={styles.list} role="list">
                        {side.map((entry, index) => (
                            <Reveal as="li" key={entry.slug} delay={index * 70}>
                                <WorkRow entry={entry} />
                            </Reveal>
                        ))}
                    </ul>
                </section>
            </div>
        </PageTransition>
    );
}
