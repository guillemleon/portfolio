import { useTranslations } from 'next-intl';
import { PageTransition } from '@/components/page-transition/index';
import styles from './contact.module.css'

export default function ContactPage() {
    const t = useTranslations('contact');

    return (
        <PageTransition>
            <main>
                <h1>{t('title')}</h1>
            </main>
        </PageTransition>
    )
}