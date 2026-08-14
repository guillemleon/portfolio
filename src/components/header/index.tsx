'use client'
import styles from './index.module.css';
import { ReactComponent as Logo } from '@/assets/brand/logo.svg'
import Button from "../button";
import { useCallback, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { languages, links } from "@/utils/constants";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import SimpleButton from "../simple-button";

const Header = () => {
    const t = useTranslations('nav');
    const pathname = usePathname();
    const router = useRouter();
    const locale = useLocale();

    const [open, setOpen] = useState(false);

    const isActive = useCallback((path: string) => pathname === path, [pathname]);

    useEffect(() => setOpen(false), [pathname]);

    return (
        <header className={styles.header}>
            <nav className={styles.headerNav}>
                <Link href="/" className={styles.logoLink}>
                    <Logo className={styles.logo} />
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
                        <Button label={t('getInTouch')} size='small' onClick={() => { }} />
                        {languages.map((language) => (
                            <SimpleButton
                                key={language.code}
                                label={language.code}
                                active={locale === language.code}
                                onClick={() => router.replace(pathname, { locale: language.code })}
                            />
                        ))}
                    </div>
                </ul>
            </nav>
        </header>
    )
}

export default Header;