'use client'
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.module.css';

interface ScreenCarouselProps {
    screens: { src: string; alt: string }[];
    label: string;
    previousLabel: string;
    nextLabel: string;
}

/**
 * A row of phone screenshots that always shows whole phones: the track is
 * exactly as wide as the column, and the arrows move it a page at a time.
 */
const ScreenCarousel = ({ screens, label, previousLabel, nextLabel }: ScreenCarouselProps) => {
    const track = useRef<HTMLUListElement>(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const update = useCallback(() => {
        const el = track.current;
        if (!el) return;
        setAtStart(el.scrollLeft <= 2);
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    }, []);

    useEffect(() => {
        const el = track.current;
        if (!el) return;
        update();
        el.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            el.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [update]);

    // One page is the phones that are fully in view; the peeking one leads the next page.
    const move = (direction: 1 | -1) => {
        const el = track.current;
        const slide = el?.firstElementChild as HTMLElement | null;
        if (!el || !slide) return;
        const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
        const step = slide.offsetWidth + gap;
        const whole = Math.max(1, Math.floor((el.clientWidth + gap) / step));
        el.scrollBy({ left: direction * whole * step, behavior: 'smooth' });
    };

    const scrollable = !(atStart && atEnd);

    return (
        <div className={styles.carousel}>
            <ul ref={track} className={styles.track} role="list" aria-label={label} tabIndex={0}>
                {screens.map((screen, index) => (
                    <li key={screen.src} className={styles.slide}>
                        <Image
                            src={screen.src}
                            alt={screen.alt}
                            width={600}
                            height={1300}
                            sizes="(max-width: 560px) 85vw, 200px"
                            className={styles.image}
                            priority={index < 4}
                        />
                    </li>
                ))}
            </ul>

            {scrollable ? (
                <div className={styles.controls}>
                    <button
                        type="button"
                        className={styles.arrow}
                        onClick={() => move(-1)}
                        disabled={atStart}
                        aria-label={previousLabel}
                    >
                        ←
                    </button>
                    <button
                        type="button"
                        className={styles.arrow}
                        onClick={() => move(1)}
                        disabled={atEnd}
                        aria-label={nextLabel}
                    >
                        →
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default ScreenCarousel;
