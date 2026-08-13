import { useTranslations } from 'next-intl';
import { PageTransition } from '@/components/page-transition/index';
import styles from './work.module.css'

export default function WorkPage() {
    const t = useTranslations('work');

    return (
        <PageTransition>
            <main>
                <h1>{t('title')}</h1>
            </main>
        </PageTransition>
    )
}