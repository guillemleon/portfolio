import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { pageMetadata } from '@/utils/metadata';
import { PageTransition } from '@/components/page-transition/index';
import Reveal from '@/components/reveal';
import { jobs } from '@/utils/work';
import { stack } from '@/utils/constants';
import styles from './about.module.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return pageMetadata({ locale, key: 'about', path: '/about' });
}

export default function AboutPage() {
    const t = useTranslations('about');
    const experience = jobs();

    return (
        <PageTransition>
            <div className={styles.page}>
                <header className={styles.intro}>
                    <h1 className={styles.title}>{t('title')}</h1>
                    <p className={styles.lede}>{t('lede')}</p>
                    <p className={styles.body}>{t('body')}</p>
                </header>

                <section className={styles.section} aria-labelledby="timeline-heading">
                    <h2 id="timeline-heading" className={styles.sectionTitle}>
                        {t('timeline')}
                    </h2>
                    <ol className={styles.timeline} role="list">
                        {experience.map((job, index) => (
                            <Reveal as="li" key={job.slug} delay={index * 70} className={styles.entry}>
                                <span className={styles.entryYears} data-tabular="">
                                    {job.from} — {job.to}
                                </span>
                                <span className={styles.entryBody}>
                                    <span className={styles.entryRole}>{job.role}</span>
                                    <span className={styles.entryCompany}>{job.company}</span>
                                </span>
                            </Reveal>
                        ))}
                    </ol>
                </section>

                <section className={styles.section} aria-labelledby="stack-heading">
                    <h2 id="stack-heading" className={styles.sectionTitle}>
                        {t('stack')}
                    </h2>
                    <div className={styles.stack}>
                        {stack.map((group, index) => (
                            <Reveal key={group.id} delay={index * 70} className={styles.stackGroup}>
                                <h3 className={styles.stackLabel}>{t(`stackGroups.${group.id}`)}</h3>
                                <ul className={styles.stackList} role="list">
                                    {group.items.map((item) => (
                                        <li key={item} className={styles.stackItem}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                        ))}
                    </div>
                </section>
            </div>
        </PageTransition>
    );
}
