import styles from './index.module.css';

interface AvailabilityProps {
    label: string;
    className?: string;
}

/** A steady green light and a short line saying I'm open to work. */
const Availability = ({ label, className }: AvailabilityProps) => (
    <p className={`${styles.availability} ${className ?? ''}`}>
        <span className={styles.light} aria-hidden="true" />
        {label}
    </p>
);

export default Availability;
