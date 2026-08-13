import { notFound } from 'next/navigation';
import { PageTransition } from '@/components/page-transition/index';
import styles from './work-detail.module.css';

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    if (!slug) notFound();

    return (
        <PageTransition>
            <article>
                <h1>Work {slug}</h1>
            </article>
        </PageTransition>
    )
}