'use client'
import Image from 'next/image';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { WorkImage } from '@/types/work';
import styles from './index.module.css';

interface GalleryCarouselProps {
    images: WorkImage[];
    label: string;
    previousLabel: string;
    nextLabel: string;
}

const Chevron = ({ direction }: { direction: 'left' | 'right' }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
            d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

/** How far a gesture must travel to move on: a share of a slide, capped for wide slides. */
const DRAG_SHARE = 0.18;
const DRAG_MAX_PX = 70;

/**
 * The focused image sits where a single main image would; the others wait at
 * either side, smaller and dimmed, out to the edges of the window.
 *
 * The track is moved with a transform rather than native scrolling, so every
 * step lands exactly on an image in both directions, and it never travels past
 * the first or the last one.
 */
const GalleryCarousel = ({ images, label, previousLabel, nextLabel }: GalleryCarouselProps) => {
    const root = useRef<HTMLDivElement>(null);
    const track = useRef<HTMLUListElement>(null);
    const [active, setActive] = useState(0);
    const [size, setSize] = useState<{ viewport: number; left: number; slide: number; gap: number } | null>(null);

    // Live motion is written straight to the track's style, never through React state:
    // re-rendering every slide on each pointer or wheel event is what made it stutter.
    const activeRef = useRef(0);
    const offset = useRef(0);
    const frame = useRef(0);
    const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pointer = useRef<{ x: number; y: number; id: number; moved: boolean; horizontal: boolean | null } | null>(null);
    const suppressClick = useRef(false);

    const last = images.length - 1;
    const step = size ? size.slide + size.gap : 0;

    // The frame spans the whole window, padded so the focused image lines up with
    // the column. Slides take the column's width; on phones a little less, so the
    // next one shows.
    const measure = useCallback(() => {
        const el = root.current;
        if (!el) return;
        const viewport = document.documentElement.clientWidth;
        const column = el.offsetWidth;
        setSize({
            viewport,
            left: Math.round(el.getBoundingClientRect().left + window.scrollX),
            slide: viewport <= 680 ? Math.round(column * 0.88) : column,
            gap: viewport <= 680 ? 12 : 20,
        });
    }, []);

    useEffect(() => {
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [measure]);

    /** Positions the track: the focused image, plus whatever the finger has moved it. */
    const apply = useCallback(
        (animate: boolean) => {
            const el = track.current;
            if (!el) return;
            const x = -activeRef.current * step + offset.current;
            el.style.transition = animate ? '' : 'none';
            el.style.transform = `translate3d(${x}px, 0, 0)`;
        },
        [step],
    );

    /** Keeps a gesture between the first and the last image: no travel past either end. */
    const clamp = useCallback(
        (value: number) => {
            const base = -activeRef.current * step;
            return Math.max(-last * step - base, Math.min(-base, value));
        },
        [last, step],
    );

    const schedule = useCallback(() => {
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => apply(false));
    }, [apply]);

    useLayoutEffect(() => {
        activeRef.current = active;
        offset.current = 0;
        apply(true);
    }, [active, apply]);

    const go = useCallback(
        (index: number) => {
            const next = Math.max(0, Math.min(last, index));
            offset.current = 0;
            if (next === activeRef.current) apply(true);
            else setActive(next);
        },
        [apply, last],
    );

    /** Lands on the image nearest to where the gesture left the track. */
    const settle = useCallback(() => {
        if (!step) return;
        const shift = -offset.current / step;
        const whole = Math.trunc(shift);
        const rest = shift - whole;
        const threshold = Math.min(DRAG_SHARE, DRAG_MAX_PX / step);
        const extra = Math.abs(rest) > threshold ? Math.sign(rest) : 0;
        go(activeRef.current + whole + extra);
    }, [go, step]);

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'ArrowRight') { event.preventDefault(); go(activeRef.current + 1); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); go(activeRef.current - 1); }
    };

    // Mouse drag and touch swipe: the track follows the pointer, then settles.
    const onPointerDown = (event: React.PointerEvent) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        pointer.current = { x: event.clientX, y: event.clientY, id: event.pointerId, moved: false, horizontal: null };
    };

    const onPointerMove = (event: React.PointerEvent) => {
        const p = pointer.current;
        if (!p || p.id !== event.pointerId) return;
        const dx = event.clientX - p.x;
        const dy = event.clientY - p.y;
        if (p.horizontal === null && Math.hypot(dx, dy) > 6) {
            p.horizontal = Math.abs(dx) > Math.abs(dy);
            if (p.horizontal) {
                // Keep following the pointer if it leaves the frame mid-drag. Capture can
                // fail when the pointer is already gone; the drag still works without it.
                try {
                    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
                } catch {}
            }
        }
        if (!p.horizontal) return;
        p.moved = true;
        offset.current = clamp(dx);
        schedule();
    };

    const onPointerUp = (event: React.PointerEvent) => {
        const p = pointer.current;
        if (!p || p.id !== event.pointerId) return;
        pointer.current = null;
        if (!p.moved) return;
        // The click that ends a drag must not also select the image under it.
        suppressClick.current = true;
        setTimeout(() => { suppressClick.current = false; }, 0);
        cancelAnimationFrame(frame.current);
        settle();
    };

    // Two-finger trackpad swipes: the track follows the fingers (and their momentum),
    // then settles once the gesture comes to rest.
    useEffect(() => {
        const el = root.current;
        if (!el) return;
        const onWheel = (event: WheelEvent) => {
            if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
            event.preventDefault();
            offset.current = clamp(offset.current - event.deltaX);
            schedule();
            if (settleTimer.current) clearTimeout(settleTimer.current);
            settleTimer.current = setTimeout(settle, 130);
        };
        el.addEventListener('wheel', onWheel, { passive: false });
        return () => {
            el.removeEventListener('wheel', onWheel);
            if (settleTimer.current) clearTimeout(settleTimer.current);
            cancelAnimationFrame(frame.current);
        };
    }, [clamp, schedule, settle]);

    return (
        <div
            ref={root}
            className={styles.carousel}
            style={
                size
                    ? ({
                          '--slide-px': `${size.slide}px`,
                          '--gap': `${size.gap}px`,
                          '--left': `${size.left}px`,
                          '--viewport': `${size.viewport}px`,
                      } as React.CSSProperties)
                    : undefined
            }
        >
            <div
                className={styles.frame}
                role="region"
                aria-roledescription="carousel"
                aria-label={label}
                tabIndex={0}
                onKeyDown={onKeyDown}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
            >
                <ul ref={track} className={styles.track} role="list">
                    {images.map((image, index) => (
                        <li
                            key={image.src}
                            className={`${styles.slide} ${index === active ? styles.active : ''} ${index < active ? styles.before : ''}`}
                            aria-current={index === active ? 'true' : undefined}
                            aria-hidden={index === active ? undefined : true}
                            onClick={() => {
                                if (suppressClick.current) return;
                                if (index !== active) go(index);
                            }}
                        >
                            <figure className={styles.shot}>
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={1600}
                                    height={800}
                                    sizes="(max-width: 860px) 90vw, 860px"
                                    className={styles.image}
                                    priority={index === 0}
                                    unoptimized={image.animated}
                                    draggable={false}
                                />
                                <figcaption className={styles.caption}>
                                    {image.link ? (
                                        <a
                                            href={image.link}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            tabIndex={index === active ? 0 : -1}
                                            draggable={false}
                                        >
                                            {image.alt}
                                        </a>
                                    ) : (
                                        image.alt
                                    )}
                                </figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.controls}>
                <span className={styles.count} data-tabular="" aria-live="polite">
                    {active + 1} / {images.length}
                </span>

                <span className={styles.dots}>
                    {images.map((image, index) => (
                        <button
                            key={image.src}
                            type="button"
                            className={`${styles.dot} ${index === active ? styles.dotActive : ''}`}
                            onClick={() => go(index)}
                            aria-label={`${index + 1} / ${images.length}`}
                            aria-current={index === active ? 'true' : undefined}
                        />
                    ))}
                </span>

                <span className={styles.arrows}>
                    <button
                        type="button"
                        className={styles.arrow}
                        onClick={() => go(active - 1)}
                        disabled={active === 0}
                        aria-label={previousLabel}
                    >
                        <Chevron direction="left" />
                    </button>
                    <button
                        type="button"
                        className={styles.arrow}
                        onClick={() => go(active + 1)}
                        disabled={active === last}
                        aria-label={nextLabel}
                    >
                        <Chevron direction="right" />
                    </button>
                </span>
            </div>
        </div>
    );
};

export default GalleryCarousel;
