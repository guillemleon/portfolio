import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { site } from '@/utils/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = site.name;

export default async function OpengraphImage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'home' });

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '80px',
                    background: '#0A0C0B',
                    backgroundImage:
                        'radial-gradient(circle at 20% 0%, rgba(75,216,106,0.22) 0%, transparent 55%)',
                }}
            >
                <div
                    style={{
                        fontSize: 26,
                        letterSpacing: 4,
                        textTransform: 'uppercase',
                        color: '#9DEEAB',
                        marginBottom: 28,
                    }}
                >
                    {t('subtitle')}
                </div>
                <div
                    style={{
                        fontSize: 104,
                        fontWeight: 600,
                        letterSpacing: -3,
                        color: '#E9EFEB',
                        lineHeight: 1.05,
                    }}
                >
                    {site.name}
                </div>
                <div
                    style={{
                        marginTop: 40,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                    }}
                >
                    <div style={{ width: 54, height: 3, background: '#4BD86A' }} />
                    <div style={{ fontSize: 30, color: '#C4CBC7' }}>
                        {site.url.replace('https://', '')}
                    </div>
                </div>
            </div>
        ),
        size,
    );
}
