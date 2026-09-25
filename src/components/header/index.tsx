'use client'
import styles from './index.module.css';
import Wordmark from '../wordmark';
import Button from "../button";
import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { links } from "@/utils/constants";
import { Link, usePathname } from "@/i18n/navigation";
import LanguagePicker from "../language-picker";

const Header = () => {
    const t = useTranslations('nav');
    const pathname = usePathname();

    const [open, setOpen] = useState(false);
    const [lastPathname, setLastPathname] = useState(pathname);

    const isActive = useCallback((path: string) => pathname === path, [pathname]);

    // Close the menu when the route changes, adjusted during render rather than
    // in an effect: https://react.dev/learn/you-might-not-need-an-effect
    if (lastPathname !== pathname) {
        setLastPathname(pathname);
        setOpen(false);
    }

    return (
        <header className={styles.header}>
            <nav className={styles.headerNav}>
                <Link href="/" className={styles.logoLink}>
                    <Wordmark compact={pathname === '/'} />
                </Link>
                <button
                    type="button"
                    className={styles.burger}
                    aria-expanded={open}
                    aria-controls="site-menu"
                    aria-label={t('menu')}
                    onClick={() => setOpen(!open)}
                >
                    <span />
                    <span />
                </button>
                <ul id="site-menu" className={`${styles.headerLinks} ${open ? styles.open : ''}`}>
                    {links.map((link) => (
                        <li key={link.path} className={`${styles.headerLink} ${isActive(link.path) ? styles.active : ''}`}>
                            <Link href={link.path} transitionTypes={['nav-forward']}>
                                {t(link.label)}
                            </Link>
                        </li>
                    ))}
                    <div className={styles.headerButtons}>
                        <Button label={t('getInTouch')} size='small' href="/contact" />
                        <LanguagePicker />
                    </div>
                </ul>
            </nav>
        </header>
    )
}

export default Header;