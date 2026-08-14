import { useTranslations } from 'next-intl';
import { PageTransition } from '@/components/page-transition/index';
import styles from './about.module.css'

export default function AboutPage() {
    const t = useTranslations('about');

    return (
        <PageTransition>
            <section>
                <h1>{t('title')}</h1>
            </section>
        </PageTransition>
    )
}