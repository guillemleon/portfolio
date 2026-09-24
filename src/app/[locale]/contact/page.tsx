import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { pageMetadata } from '@/utils/metadata';
import { PageTransition } from '@/components/page-transition/index';
import Reveal from '@/components/reveal';
import { contact, contactChannels } from '@/utils/contact';
import styles from './contact.module.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return pageMetadata({ locale, key: 'contact', path: '/contact' });
}

export default function ContactPage() {
    const t = useTranslations('contact');
    const channels = contactChannels();

    return (
        <PageTransition>
            <div className={styles.page}>
                <header className={styles.intro}>
                    <h1 className={styles.title}>{t('title')}</h1>
                    <p className={styles.lede}>{t('intro')}</p>
                </header>

                <ul className={styles.channels} role="list">
                    {channels.map((channel, index) => (
                        <Reveal as="li" key={channel.id} delay={index * 80}>
                            <a
                                className={styles.channel}
                                href={channel.href}
                                {...(channel.id === 'linkedin'
                                    ? { target: '_blank', rel: 'noreferrer noopener' }
                                    : {})}
                            >
                                <span className={styles.channelLabel}>{t(`channels.${channel.id}`)}</span>
                                <span className={styles.channelValue}>{channel.value}</span>
                            </a>
                        </Reveal>
                    ))}
                </ul>

                <Reveal className={styles.footNote} delay={120}>
                    <p className={styles.location}>{contact.location}</p>
                    <p className={styles.availability}>{t('availability')}</p>
                </Reveal>
            </div>
        </PageTransition>
    );
}
