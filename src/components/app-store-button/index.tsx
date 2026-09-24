import ICONS from '@/utils/icons';
import styles from './index.module.css';

interface AppStoreButtonProps {
    href: string;
    label: string;
    caption: string;
}

const AppStoreButton = ({ href, label, caption }: AppStoreButtonProps) => {
    const Apple = ICONS.apple;

    return (
        <a
            className={styles.appStoreButton}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
        >
            <Apple className={styles.logo} aria-hidden="true" />
            <span className={styles.text}>
                <span className={styles.caption}>{caption}</span>
                <span className={styles.label}>{label}</span>
            </span>
        </a>
    );
};

export default AppStoreButton;
