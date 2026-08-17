import styles from './index.module.css';
import ProfileRow from '../profile-row';
import { useTranslations } from 'next-intl';

const PROFILE_ROWS = ['now', 'focus', 'sideWork', 'reachMe', 'stack'] as const;

interface GlassCardProps {
    title: string;
    translations: string;
};

const GlassCard = ({ title, translations }: GlassCardProps) => {
    const t = useTranslations();

    return (
        <section className={styles.glassCardContainer}>
            <aside className={styles.glassCard}>
                <h4>{title}</h4>
                {PROFILE_ROWS.map((row) => (
                    <ProfileRow
                        key={row}
                        label={t(`${translations}.profile.${row}.label`)}
                        text={t(`${translations}.profile.${row}.text`)}
                    />
                ))}
            </aside>
        </section>
    )
}

export default GlassCard;