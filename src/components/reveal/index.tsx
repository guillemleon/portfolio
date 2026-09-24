'use client'
import { useEffect, useRef } from 'react';
import styles from './index.module.css';

interface RevealProps {
    children: React.ReactNode;
    delay?: number;
    as?: 'div' | 'li' | 'section' | 'article';
    className?: string;
}

const Reveal = ({ children, delay = 0, as: Tag = 'div', className }: RevealProps) => {
    const host = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = host.current;
        if (!element) return;

        const show = () => element.classList.add(styles.shown);

        if (typeof IntersectionObserver === 'undefined') {
            show();
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        show();
                        observer.disconnect();
                    }
                }
            },
            { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={host as React.Ref<never>}
            className={`${styles.reveal} ${className ?? ''}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </Tag>
    );
};

export default Reveal;
