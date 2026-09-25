import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/utils/metadata";
import { personSchema } from "@/utils/schema";
import { site } from "@/utils/site";
import { ReactComponent as Logo } from '@/assets/brand/logo.svg'
import Header from "@/components/header";
import styles from '../layout.module.css';
import "../globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const base = await pageMetadata({ locale, key: 'home' });

  return {
    ...base,
    metadataBase: new URL(site.url),
    title: {
      default: base.title as string,
      template: `%s - ${site.name}`,
    },
    authors: [{ name: site.name, url: site.url }],
    // Served from /public with stable paths. Google requires the favicon URL to
    // stay constant; files under app/ get a build hash that changes every deploy.
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
        { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      ],
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    creator: site.name,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Required for static rendering: without it next-intl reads headers and
  // every page falls back to dynamic (DYNAMIC_SERVER_USAGE on prerender).
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} data-theme="green">
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className={styles.glowContainer}>
            <Logo className={styles.logo} />
            <div className={styles.glow} />
          </div>
          <Header />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(locale)) }}
          />
          <main className={styles.main}>
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
