'use client'
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { languages } from '@/utils/constants';
import ICONS from '@/utils/icons';
import styles from './index.module.css';

const LanguagePicker = () => {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const host = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const ChevronDown = ICONS.chevronDown;

    const close = useCallback(() => setOpen(false), []);

    useEffect(() => {
        if (!open) return;

        const onPointerDown = (event: PointerEvent) => {
            if (!host.current?.contains(event.target as Node)) close();
        };

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') close();
        };

        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [open, close]);

    const select = (code: string) => {
        close();
        router.replace(pathname, { locale: code });
    };

    return (
        <div className={styles.picker} ref={host}>
            <button
                type="button"
                className={`${styles.trigger} ${open ? styles.triggerOpen : ''}`}
                onClick={() => setOpen(!open)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label="Language"
            >
                <span className={styles.code}>{locale.toUpperCase()}</span>
                <ChevronDown className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} />
            </button>

            {open ? (
                <div className={styles.dropdown} role="listbox">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            type="button"
                            role="option"
                            aria-selected={language.code === locale}
                            className={`${styles.option} ${language.code === locale ? styles.optionActive : ''}`}
                            onClick={() => select(language.code)}
                        >
                            <span>{language.label}</span>
                            <span className={styles.optionCode}>{language.code.toUpperCase()}</span>
                        </button>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default LanguagePicker;
