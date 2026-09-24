'use client'
import ICONS from '@/utils/icons';
import { Link } from '@/i18n/navigation';
import styles from './index.module.css';

type ButtonType = 'primary' | 'secondary';
type ButtonSize = 'small' | 'large';

interface ButtonProps {
    label: string;
    iconName?: keyof typeof ICONS;
    onClick?: () => void;
    /** Internal route ("/work"), or an absolute URL for an external target. */
    href?: string;
    /** Serve the href as a file download rather than a navigation. */
    download?: boolean;
    type?: ButtonType;
    size?: ButtonSize;
}

const Button = ({
    label,
    iconName,
    onClick,
    href,
    download = false,
    type = 'primary',
    size = 'large',
}: ButtonProps) => {
    const Icon = iconName ? ICONS[iconName] : undefined;
    const className = `${styles.button} ${styles[type]} ${styles[size]}`;

    const content = (
        <>
            {Icon && <Icon className={styles.icon} />}
            <span className={styles.label}>{label}</span>
        </>
    );

    if (href) {
        const isExternal = /^https?:\/\//.test(href);

        if (isExternal || download) {
            return (
                <a
                    className={className}
                    href={href}
                    {...(download ? { download: '' } : { target: '_blank', rel: 'noreferrer noopener' })}
                >
                    {content}
                </a>
            );
        }

        return (
            <Link className={className} href={href} transitionTypes={['nav-forward']}>
                {content}
            </Link>
        );
    }

    return (
        <button type="button" onClick={onClick} className={className}>
            {content}
        </button>
    );
};

export default Button;
