import styles from './index.module.css';

interface WordmarkProps {
    /** Initials only. Used on the home page, whose heading already carries the name. */
    compact?: boolean;
    className?: string;
}

/**
 * Live text rather than an image: crisp at any size, and readable by screen
 * readers. The initials are not pronounceable, so the label carries the name.
 */
const Wordmark = ({ compact = false, className }: WordmarkProps) => (
    <span className={`${styles.wordmark} ${className ?? ''}`} aria-label="Guillem León">
        <span aria-hidden="true" className={compact ? styles.initials : styles.full}>
            {compact ? 'gl' : 'Guillem León'}
        </span>
        <span className={styles.dot} aria-hidden="true" />
    </span>
);

export default Wordmark;
