import ICONS from '@/utils/icons';
import styles from './index.module.css';

interface ButtonProps {
    label: string;
    iconName?: keyof typeof ICONS;
    onClick: () => void;
}

const Button = ({ label, iconName, onClick }: ButtonProps) => {
    const Icon = iconName ? ICONS[iconName] : undefined;

    return (
        <button
            type="button"
            onClick={onClick}
            className={styles.button}>
            {Icon && <Icon className={styles.icon} />}
            <span className={styles.label}>{label}</span>
        </button>
    )
}

export default Button;