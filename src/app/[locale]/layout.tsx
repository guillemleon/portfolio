import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ReactComponent as Logo } from '@/assets/brand/logo.svg'
import Header from "@/components/header";
import styles from '../layout.module.css';
import "../globals.css";

export const metadata: Metadata = {
  title: "Guillem Leon Font",
  description: "Guillem Leon Font Software Engineer",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

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
          <main className={styles.main}>
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
