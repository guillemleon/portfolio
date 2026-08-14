'use client'
import ICONS from '@/utils/icons';
import styles from './index.module.css';

type ButtonType = 'primary' | 'secondary';
type ButtonSize = 'small' | 'large';

interface ButtonProps {
    label: string;
    iconName?: keyof typeof ICONS;
    onClick?: () => void;
    type?: ButtonType;
    size?: ButtonSize;
}

const Button = ({ label, iconName, onClick, type = 'primary', size = 'large' }: ButtonProps) => {
    const Icon = iconName ? ICONS[iconName] : undefined;

    return (
        <button
            type="button"
            onClick={onClick}
            className={`${styles.button} ${styles[type]} ${styles[size]}`}>
            {Icon && <Icon className={styles.icon} />}
            <span className={styles.label}>{label}</span>
        </button>
    )
}

export default Button;