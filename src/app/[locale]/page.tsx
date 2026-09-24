import { useTranslations } from "next-intl";
import Button from "@/components/button";
import styles from "./page.module.css";
import GlassCard from "@/components/glass-card";
import { logos } from "@/utils/constants";
import { site } from "@/utils/site";
import Image from "next/image";

const TITLE = "Guillem León";

export default function Home() {
  const t = useTranslations('home');

  return (
    <div className={styles.container}>
      <section className={styles.personalInfo}>
        <h1 className={styles.title}>
          {TITLE.split('').map((letter, index) => {
            if (letter === " ") {
              return <span key={index}>&nbsp;</span>
            }

            return (
              <span key={index} className={styles.titleLetter}>
                <span className={styles.titleLetterInner}>{letter}</span>
              </span>
            )
          })}
        </h1>

        <span className={styles.subtitle}>
          {t('subtitle')}
        </span>

        <p className={styles.description}>
          {t('description')}
        </p>

        <div className={styles.buttons}>
          <Button label={t('selectedWork')} href="/work" />
          {site.cv ? (
            <Button label={t('downloadCV')} type='secondary' href={site.cv} download />
          ) : null}
        </div>

        <div className={styles.logosRow}>
          <h4 className={styles.logoRowTitle}>Built for</h4>
          {logos.map(logo => (
            <Image
              src={logo.logo}
              alt={logo.id}
              key={logo.id}
              className={styles.logo}
            ></Image>
          ))}
        </div>
      </section>
      <GlassCard title={t('profile.title')} translations={'home'} />
    </div>
  );
}
