import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import ICONS from '@/utils/icons';
import type { WorkEntry } from '@/types/work';
import styles from './index.module.css';

interface WorkRowProps {
    entry: WorkEntry;
}

const WorkRow = ({ entry }: WorkRowProps) => {
    const Apple = ICONS.apple;

    return (
    <Link
        href={`/work/${entry.slug}`}
        className={styles.row}
        transitionTypes={['nav-forward']}
    >
        {entry.images[0] ? (
            <span className={styles.thumb}>
                <Image
                    src={entry.images[0].src}
                    alt=""
                    width={480}
                    height={270}
                    sizes="220px"
                    className={styles.thumbImage}
                />
            </span>
        ) : null}

        <span className={styles.body}>
        <span className={styles.head}>
            <span className={styles.company}>
                {entry.appStore ? <Apple className={styles.apple} aria-hidden="true" /> : null}
                {entry.company}
                {entry.ai ? <span className={styles.ai}>AI</span> : null}
            </span>
            <span className={styles.years} data-tabular="">
                {entry.from === entry.to ? entry.from : `${entry.from} — ${entry.to}`}
            </span>
        </span>

        <span className={styles.title}>{entry.title}</span>
        <span className={styles.role}>{entry.role}</span>
        <span className={styles.summary}>{entry.summary}</span>

        <span className={styles.tags}>
            {entry.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                    {tag}
                </span>
            ))}
        </span>
        </span>
        </Link>
    );
};

export default WorkRow;
